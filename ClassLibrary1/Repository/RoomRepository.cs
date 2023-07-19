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
    public class RoomRepository : Repository<Room>, IRoomRepository
    {
        public RoomRepository(BookingSystemContext context)
           : base(context)
        { }
        public async Task<IEnumerable<Room>> GetAllRooms()
        {
            return await BookingSystemContext.Rooms
                .ToListAsync();
        }

        public Task<Room> GetRoomById(int id)
        {
            return BookingSystemContext.Rooms
               .SingleOrDefaultAsync(a => a.RoomId == id);
        }

        private BookingSystemContext BookingSystemContext
        {
            get { return Context as BookingSystemContext; }
        }
    }
}

