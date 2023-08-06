using AutoMapper;
using BookingSystem.core.Models.Auth;
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
            CreateMap<Room, RoomResource>();
            CreateMap<Reservation, ReservationResource>();


            //resource to domain
            CreateMap<CompanyResource, Company>();
            CreateMap<UserResource, User>();
            CreateMap<RoomResource, Room>();
            CreateMap<ReservationResource, Reservation>();

            CreateMap<SaveCompanyResource, Company>();
            CreateMap<SaveUserResource, User>();
            CreateMap<SaveRoomResource, Room>();
            CreateMap<SaveReservationResource, Reservation>();

            CreateMap<UpdateAUserResource, AUser>();
            CreateMap<UserSignUpResource, AUser>()
    .ForMember(u => u.UserName, opt => opt.MapFrom(ur => ur.Email));

        }
    }
}
