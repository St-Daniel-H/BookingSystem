using Microsoft.EntityFrameworkCore;
using startup.Interfaces;
using startup.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace startup.Repository
{
    public class ReservationRepository : Repository<Reservation>, IReservationRepository
    {
        public ReservationRepository(BookingSystemContext context)
           : base(context)
        { }
        public async Task<IEnumerable<Reservation>> GetAllReservations()
        {
            return await BookingSystemContext.Reservations
                .ToListAsync();
        }

        public Task<Reservation> GetReservationById(int id)
        {
            return BookingSystemContext.Reservations
               .SingleOrDefaultAsync(a => a.ReservationId == id);
        }

        private BookingSystemContext BookingSystemContext
        {
            get { return Context as BookingSystemContext; }
        }
        public async Task<IEnumerable<Reservation>> GetReservationsByCompanyId(int companyId)
        {
            return await BookingSystemContext.Reservations
            .Where(r => r.AUser.CompanyId == companyId)
            .ToListAsync();
        }
        public async Task<IEnumerable<Reservation>> GetReservationsByRoomId(int roomId)
        {
            return await BookingSystemContext.Reservations
            .Where(r => r.Room.RoomId == roomId)
            .ToListAsync();
        }
    }
}

