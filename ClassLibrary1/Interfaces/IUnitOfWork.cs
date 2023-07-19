﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace startup.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ICompanyRepository Companies { get; }
        IUserRepository Users { get; }

        IRoomRepository Rooms { get; }
        IReservationRepository Reservations { get; }
        Task<int> CommitAsync();
    }
}
