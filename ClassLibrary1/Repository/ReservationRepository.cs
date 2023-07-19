using Microsoft.EntityFrameworkCore;
using startup.Interfaces;
using startup.Models;
using System;
using System.Collections.Generic;
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
    }
}

