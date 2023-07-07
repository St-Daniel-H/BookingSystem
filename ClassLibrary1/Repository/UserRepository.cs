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
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(BookingSystemContext context)
           : base(context)
        { }
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await BookingSystemContext.Users
                .ToListAsync();
        }

        public Task<User> GetUserById(int id)
        {
            return BookingSystemContext.Users
               .SingleOrDefaultAsync(a => a.UserId == id);
        }

        private BookingSystemContext BookingSystemContext
        {
            get { return Context as BookingSystemContext; }
        }
    }
}

