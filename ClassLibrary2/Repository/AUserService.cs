using BookingSystem.core.Models.Auth;
using BookingSystem.Services.Interfaces;
using startup.Interfaces;
using startup.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookingSystem.Services.Repository
{
    public class AUserService : IAUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        public AUserService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<AUser>> GetUsersByCompanyId(int companyId)
        {
            return await _unitOfWork.AUsers.GetUsersByCompanyId(companyId);
        }
        public async Task DeleteUser(AUser user)
        {
            _unitOfWork.AUsers.Remove(user);
            await _unitOfWork.CommitAsync();
        }
        public async Task UpdateUser(AUser userToBeUpdated, AUser user)
        {
            userToBeUpdated.FirstName = user.FirstName;
            userToBeUpdated.LastName = user.LastName;
            userToBeUpdated.Email = user.Email;
            userToBeUpdated.Role = user.Role;
            await _unitOfWork.CommitAsync();
        }
    }
}
