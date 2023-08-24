namespace calenderAPI.Resources
{
    public class RoomResource
    {
        public int roomId { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public int Capacity { get; set; }
        public string Description { get; set; }

        public int companyId { get; set; }
        public List<ReservationResource> Reservations { get; set; }

    }
}
