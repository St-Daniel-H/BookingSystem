using Microsoft.AspNetCore.Identity;
using startup.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookingSystem.core.Models.Auth
{
    public class AUser : IdentityUser<Guid>
    {
        public AUser()
        {
            Reservations = new HashSet<Reservation>();
        }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Role { get; set; }
        public virtual Company? Company { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
