using BookingSystem.core.Interfaces;
using BookingSystem.core.Models.Auth;
using Microsoft.EntityFrameworkCore;
using startup.Interfaces;
using startup.Models;
using startup.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookingSystem.core.Repository
{
    public class AUserRepository : Repository<AUser>, IAUserRepository
    {
        public AUserRepository(BookingSystemContext context)
        : base(context)
        { }
        public async Task<IEnumerable<AUser>> GetUsersByCompanyId(int companyId)
        {
            // Assuming Rooms is a DbSet<Room> in your DbContext
            return await BookingSystemContext.AUsers
                .Where(user => user.CompanyId == companyId)
                .ToListAsync();
        }

        private BookingSystemContext BookingSystemContext
        {
            get { return Context as BookingSystemContext; }
        }
    }
}
