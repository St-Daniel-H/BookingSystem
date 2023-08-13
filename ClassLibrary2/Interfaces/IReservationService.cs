using startup.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace BookingSystem.Services.Interfaces
{
    public interface IReservationService
    {
        //   Task<IEnumerable<Company>> GetAllCompanies();
        Task<Reservation> CreateReservation(Reservation newReservation);
        Task UpdateReservation(Reservation reservationToBeUpdated, Reservation reservation);
        Task DeleteReservation(Reservation reservation);
        Task<Reservation> GetReservationById(int id);
        Task<IEnumerable<Reservation>> GetAllReservations();

        Task<IEnumerable<Reservation>> GetReservationsByCompanyId(int companyId);

    }
}
