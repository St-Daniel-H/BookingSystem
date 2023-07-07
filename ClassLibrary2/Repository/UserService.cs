using BookingSystem.core.Repository;
using BookingSystem.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using startup.Models;
using startup.Interfaces;

namespace BookingSystem.Services.Repository
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _unitOfWork.Users
                .GetAllUsers();
        }
        public async Task<User> GetUserById(int id)
        {
            return await _unitOfWork.Users
               .GetUserById(id);
        }
        public async Task<User> CreateUser(User newUser)
        {
            await _unitOfWork.Users.AddAsync(newUser);
            await _unitOfWork.CommitAsync();
            return newUser;
        }

        public async Task DeleteUser(User user)
        {
            _unitOfWork.Users.Remove(user);
            await _unitOfWork.CommitAsync();
        }

        public async Task UpdateUser(User UserToBeUpdated, User User)
        {
            UserToBeUpdated.Name = User.Name;
            await _unitOfWork.CommitAsync();
        }
    }
}

