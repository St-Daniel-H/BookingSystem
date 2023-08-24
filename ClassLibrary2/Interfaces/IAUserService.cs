using BookingSystem.core.Models.Auth;
using startup.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookingSystem.Services.Interfaces
{
    public interface IAUserService
    {
        Task<IEnumerable<AUser>> GetUsersByCompanyId(int companyId);
        Task DeleteUser(AUser user);
        Task UpdateUser(AUser userToBeUpdated, AUser user);
        Task TransferOwner(AUser from, AUser to);


    }
}
