using startup.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace BookingSystem.Services.Interfaces
{
    public interface IRoomService
    {
        //   Task<IEnumerable<Company>> GetAllCompanies();
        Task<Room> CreateRoom(Room newRoom);
        Task UpdateRoom(Room roomToBeUpdated, Room room);
        Task DeleteRoom(Room room);
        Task<Room> GetRoomById(int id);
        Task<IEnumerable<Room>> GetAllRooms();
    }
}
