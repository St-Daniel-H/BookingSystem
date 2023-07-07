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
    public class CompanyRepository : Repository<Company>, ICompanyRepository
    {
        public CompanyRepository(BookingSystemContext context)
           : base(context)
        { }
        public async Task<IEnumerable<Company>> GetAllCompanies()
        {
            return await BookingSystemContext.Companies
                .ToListAsync();
        }
        
        public Task<Company> GetCompanyById(int id)
        {
            return  BookingSystemContext.Companies
               .SingleOrDefaultAsync(a => a.CompanyId == id);
        }

        private BookingSystemContext BookingSystemContext
        {
            get { return Context as BookingSystemContext; }
        }
    }
}

