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

        public Task UpdateReservation(Reservation reservationToBeUpdated, Reservation reservation)
        {
            throw new NotImplementedException();
        }

        //public async Task UpdateReservation(Reservation ReservationToBeUpdated, Reservation Reservation)
        //{
        //    ReservationToBeUpdated.Name = Reservation.Name;
        //    await _unitOfWork.CommitAsync();
        //}
    }
}

