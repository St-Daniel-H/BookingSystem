namespace calenderAPI.Resources
{
    public class SaveUserResource
    {
        public string Name { get; set; }
        public string Email { get; set; }

        public string Role { get; set; }
        public string Password { get; set; }
        public string AuthId { get; set; }

        public int CompanyId { get; set; }
    }
}
