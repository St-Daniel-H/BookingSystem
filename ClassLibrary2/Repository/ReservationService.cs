﻿using BookingSystem.core.Repository;
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
    public class ReservationService : IReservationService
    {
        private readonly IUnitOfWork _unitOfWork;
        public ReservationService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Reservation>> GetAllReservations()
        {
            return await _unitOfWork.Reservations
                .GetAllReservations();
        }
        public async Task<Reservation> GetReservationById(int id)
        {
            return await _unitOfWork.Reservations
               .GetReservationById(id);
        }
        public async Task<Reservation> CreateReservation(Reservation newReservation)
        {
            await _unitOfWork.Reservations.AddAsync(newReservation);
            await _unitOfWork.CommitAsync();
            return newReservation;
        }

        public async Task DeleteReservation(Reservation music)
        {
            _unitOfWork.Reservations.Remove(music);
            await _unitOfWork.CommitAsync();
        }

        public async Task UpdateReservation(Reservation ReservationToBeUpdated, Reservation Reservation)
        {
            ReservationToBeUpdated.StartTime = Reservation.StartTime;
            ReservationToBeUpdated.EndTime = Reservation.EndTime;
            ReservationToBeUpdated.Title = Reservation.Title;
            ReservationToBeUpdated.Description = Reservation.Description;
            ReservationToBeUpdated.NumberOfAttendees = Reservation.NumberOfAttendees;
            ReservationToBeUpdated.Room = Reservation.Room;
            ReservationToBeUpdated.RoomId = Reservation.RoomId;
            await _unitOfWork.CommitAsync();
        }
        public async Task<IEnumerable<Reservation>> GetReservationsByCompanyId(int companyId)
        {
            return await _unitOfWork.Reservations.GetReservationsByCompanyId(companyId);
        }
        public async Task<IEnumerable<Reservation>> GetReservationsByRoomId(int roomId)
        {
            return await _unitOfWork.Reservations.GetReservationsByRoomId(roomId);
        }
    }
}

