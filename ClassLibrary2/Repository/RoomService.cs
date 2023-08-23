using BookingSystem.core.Repository;
using BookingSystem.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using startup.Models;
using startup.Interfaces;

namespace BookingSystem.Services.Repository
{
    public class RoomService : IRoomService
    {
        private readonly IUnitOfWork _unitOfWork;
        public RoomService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Room>> GetAllRooms()
        {
            return await _unitOfWork.Rooms
                .GetAllRooms();
        }
        public async Task<Room> GetRoomById(int id)
        {
            return await _unitOfWork.Rooms
               .GetRoomById(id);
        }
        public async Task<Room> CreateRoom(Room newRoom)
        {
            await _unitOfWork.Rooms.AddAsync(newRoom);
            await _unitOfWork.CommitAsync();
            return newRoom;
        }

        public async Task DeleteRoom(Room music)
        {
            if (music.Reservations.Any())
            {
                throw new InvalidOperationException("Cannot delete the room because it has reservations.");
            }
            _unitOfWork.Rooms.Remove(music);
            await _unitOfWork.CommitAsync();
        }

        public async Task UpdateRoom(Room RoomToBeUpdated, Room Room)
        {
            RoomToBeUpdated.Name = Room.Name;
            RoomToBeUpdated.Location = Room.Location;
            RoomToBeUpdated.Capacity = Room.Capacity;
            RoomToBeUpdated.Description = Room.Description;
            await _unitOfWork.CommitAsync();
        }
        public async Task<IEnumerable<Room>> GetRoomsByCompanyId(int companyId)
        {
            return await _unitOfWork.Rooms.GetRoomsByCompanyId(companyId);
        }
    }
}

