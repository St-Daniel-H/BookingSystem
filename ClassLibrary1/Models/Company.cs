using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace startup.Models
{
    public partial class Company
    {
        public Company()
        {
            Rooms = new HashSet<Room>();
            Users = new HashSet<User>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CompanyId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public byte[]? Logo { get; set; }
        public bool? Active { get; set; }

        public virtual ICollection<Room> Rooms { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
