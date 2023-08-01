using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace startup.Models
{
    public partial class User
    {
        public User()
        {
            Reservations = new HashSet<Reservation>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string? Name { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        public int? CompanyId { get; set; }

        public string? AuthId { get; set; }

        public virtual Company? Company { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
