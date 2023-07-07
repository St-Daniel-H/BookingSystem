using startup.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace BookingSystem.Services.Interfaces
{
    public interface ICompanyService
    {
     //   Task<IEnumerable<Company>> GetAllCompanies();
        Task<Company> CreateCompany(Company newCompany);
        Task UpdateCompany(Company companyToBeUpdated, Company company);
        Task DeleteCompany(Company company);
        Task<Company> GetCompanyById(int id);
        Task<Company> GetAllCompanies();
    }
}
