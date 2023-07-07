using AutoMapper;
using calenderAPI.Resources;
using startup.Models;
using System.Net;

namespace calenderAPI.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Domain to Resource
            CreateMap<Company, CompanyResource>();
            CreateMap<User, UserResource>();


            //resource to domain
            CreateMap<CompanyResource, Company>();
            CreateMap<UserResource, User>();

            CreateMap<SaveCompanyResource, Company>();
            CreateMap<SaveUserResource, User>();

        }
    }
}
