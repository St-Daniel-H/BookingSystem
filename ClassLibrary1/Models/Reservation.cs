using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using BookingSystem.core.Models.Auth;

namespace startup.Models
{
    public partial class Reservation
    {
  
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReservationId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int? RoomId { get; set; }
        public int NumberOfAttendees { get; set; }
        public bool? MeetingStatus { get; set; }
        public Guid AUserId { get; set; }

        public String Description { get; set; }
        public String Title { get; set; }   

        public virtual Room? Room { get; set; }
        public virtual AUser? AUser { get; set; }
    }
}
