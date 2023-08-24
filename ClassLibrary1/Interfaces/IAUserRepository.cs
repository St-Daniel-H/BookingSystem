using BookingSystem.core.Models.Auth;
using startup.Interfaces;
using startup.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookingSystem.core.Interfaces
{
    public  interface IAUserRepository : IRepository<AUser>
    {
        Task<IEnumerable<AUser>> GetUsersByCompanyId(int companyId);
        Task<AUser> GetUserByEmail(String email);


    }
}
