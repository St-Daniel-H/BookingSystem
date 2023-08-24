using BookingSystem.core.Models.Auth;
using BookingSystem.core.Repository;
using BookingSystem.Services.Interfaces;
using startup.Interfaces;
using startup.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
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
  
        public async Task TransferOwner(AUser from,AUser to)
        {
            from.Role = "Admin";
            to.Role = "Owner";
            await _unitOfWork.CommitAsync();
        }

        public  async Task<AUser>  getUserByEmail(string Email)
        {
            return await _unitOfWork.AUsers.GetUserByEmail(Email);
        }
    }
}
