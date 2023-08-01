using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using BookingSystem.core.Models.Auth;

namespace startup.Models
{
    public partial class Company
    {
        public Company()
        {
            Rooms = new HashSet<Room>();
            AUsers = new HashSet<AUser>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CompanyId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Logo { get; set; }
        public bool? Active { get; set; }

        public virtual ICollection<Room> Rooms { get; set; }
        public virtual ICollection<AUser> AUsers { get; set; }
    }
}
