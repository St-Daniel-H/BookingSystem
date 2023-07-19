using startup.Interfaces;
using startup.Models;
using startup.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookingSystem.core.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly BookingSystemContext _context;
        private CompanyRepository _companyRepository;
        private UserRepository _userRepository;
        private RoomRepository? _roomRepository;
        private ReservationRepository? _reservationRepository;

        public UnitOfWork(BookingSystemContext context)
        {
            this._context = context;
        }

        public ICompanyRepository Companies => _companyRepository = _companyRepository ?? new CompanyRepository(_context);
        public IUserRepository Users => _userRepository = _userRepository ?? new UserRepository(_context);

        public IReservationRepository Reservations => _reservationRepository = _reservationRepository ?? new ReservationRepository(_context);
        public IRoomRepository Rooms => _roomRepository = _roomRepository ?? new RoomRepository(_context);


        public async Task<int> CommitAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
