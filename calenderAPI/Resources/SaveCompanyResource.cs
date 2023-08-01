namespace calenderAPI.Resources
{
    public class SaveCompanyResource
    {
        public string Name { get; set; }

       public string Email { get; set; }

        public IFormFile? Logo { get; set; }
    }
}
