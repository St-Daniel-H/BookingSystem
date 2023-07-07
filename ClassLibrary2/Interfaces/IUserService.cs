using startup.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace BookingSystem.Services.Interfaces
{
    public interface IUserService
    {
        //   Task<IEnumerable<User>> GetAllCompanies();
        Task<User> CreateUser(User newUser);
        Task UpdateUser(User userToBeUpdated, User user);
        Task DeleteUser(User user);
        Task<User> GetUserById(int id);
        Task<User> GetAllUsers();
    }
}
