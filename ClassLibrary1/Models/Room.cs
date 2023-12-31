﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace startup.Models
{
    public partial class Room
    {
        public Room()
        {
            Reservations = new HashSet<Reservation>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoomId { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        public int? Capacity { get; set; }
        public string? Description { get; set; }
        public int? CompanyId { get; set; }

        public virtual Company? Company { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
