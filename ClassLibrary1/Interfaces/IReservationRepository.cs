using startup.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace startup.Interfaces
{
    public interface IReservationRepository : IRepository<Reservation>
    {
        Task<IEnumerable<Reservation>> GetAllReservations();
        Task<Reservation> GetReservationById(int id);
        Task<IEnumerable<Reservation>> GetReservationsByCompanyId(int companyId);

        Task<IEnumerable<Reservation>> GetReservationsByRoomId(int roomId);


    }
}
