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
    public class CompanyService : ICompanyService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CompanyService(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Company>> GetAllCompanies()
        {
            return await _unitOfWork.Companies
                .GetAllCompanies();
        }
        public async Task<Company> GetCompanyById(int id)
        {
            return await _unitOfWork.Companies
               .GetCompanyById(id);
        }
        public async Task<Company> CreateCompany(Company newCompany)
        {
            await _unitOfWork.Companies.AddAsync(newCompany);
            await _unitOfWork.CommitAsync();
            return newCompany;
        }

        public async Task DeleteCompany(Company music)
        {
            _unitOfWork.Companies.Remove(music);
            await _unitOfWork.CommitAsync();
        }
    
        public async Task UpdateCompany(Company companyToBeUpdated, Company company)
        {
            companyToBeUpdated.Name = company.Name;
            companyToBeUpdated.Email = company.Email;
            companyToBeUpdated.Logo = company.Logo;


            await _unitOfWork.CommitAsync();
        }
    }
}

