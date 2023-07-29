namespace calenderAPI.Resources
{
    public class ReservationResource
    {
        public int reservationId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int roomId { get; set; }
        public int userId { get; set; }
        public int NumberOfAttendees { get; set; }

    }
}
