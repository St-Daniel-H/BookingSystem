namespace calenderAPI.Resources
{
    public class UserResource
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public CompanyResource Company { get; set; }
    }
}
