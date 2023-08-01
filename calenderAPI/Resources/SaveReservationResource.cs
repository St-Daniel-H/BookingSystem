namespace calenderAPI.Resources
{
    public class SaveReservationResource
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int roomId { get; set; }

        public Guid AUserId { get; set; }
        public int NumberOfAttendees { get; set; }
    }
}
