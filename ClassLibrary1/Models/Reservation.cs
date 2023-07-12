using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

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
        public int? UserId { get; set; }

        public virtual Room? Room { get; set; }
        public virtual User? User { get; set; }
    }
}
