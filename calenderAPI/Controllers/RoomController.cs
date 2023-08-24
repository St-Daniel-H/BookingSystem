using AutoMapper;
using BookingSystem.Services.Interfaces;
using BookingSystem.Services.Repository;
using calenderAPI.Controllers;
using calenderAPI.Resources;
using calenderAPI.Validators;
using Microsoft.AspNetCore.Mvc;
using startup.Models;
using FluentValidation;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Runtime.CompilerServices;

namespace calenderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class RoomController : ControllerBase
    {
        public RoomController(IRoomService RoomService,IReservationService ReservationService, IMapper mapper)
        {
            this._mapper = mapper;
            this._RoomService = RoomService;
            this._ReservationService = ReservationService;
        }

        private readonly IMapper _mapper;
        private readonly IRoomService _RoomService;
        private readonly IReservationService _ReservationService;
        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Room>>> GetAllrooms()
        {
            var rooms = await _RoomService.GetAllRooms();
            //  var RoomResources = _mapper.Map<IEnumerable<Room>, IEnumerable<RoomResource>>((IEnumerable<Room>)rooms);
            var RoomResources = _mapper.Map<IEnumerable<Room>, IEnumerable<RoomResource>>(rooms);

            return Ok(RoomResources);

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<RoomResource>> GetRoomById(int id)
        {
            var Room = await _RoomService.GetRoomById(id);
            var RoomResource = _mapper.Map<Room, RoomResource>(Room);

            return Ok(RoomResource);
        }

        //create
        [HttpPost("")]
        public async Task<ActionResult<RoomResource>> CreateRoom([FromBody] SaveRoomResource saveRoomResource)
        {
            var validator = new SaveRoomResourceValidator();
            var validationResult = await validator.ValidateAsync(saveRoomResource);

            if (!validationResult.IsValid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            var RoomToCreate = _mapper.Map<SaveRoomResource, Room>(saveRoomResource);

            var newRoom = await _RoomService.CreateRoom(RoomToCreate);

            var Room = await _RoomService.GetRoomById(newRoom.RoomId);

            var RoomResource = _mapper.Map<Room, RoomResource>(Room);

            return Ok(RoomResource);
        }
        //update
        [HttpPut("{id}")]
        public async Task<ActionResult<RoomResource>> UpdateRoom(int id, [FromBody] SaveRoomResource saveRoomResource)
        {
            var validator = new SaveRoomResourceValidator();
            var validationResult = await validator.ValidateAsync(saveRoomResource);

            var requestIsInvalid = id == 0 || !validationResult.IsValid;

            if (requestIsInvalid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            var RoomToBeUpdate = await _RoomService.GetRoomById(id);

            if (RoomToBeUpdate == null)
                return NotFound();

            var Room = _mapper.Map<SaveRoomResource, Room>(saveRoomResource);

            await _RoomService.UpdateRoom(RoomToBeUpdate, Room);

            var updatedRoom = await _RoomService.GetRoomById(id);
            var updatedRoomResource = _mapper.Map<Room, RoomResource>(updatedRoom);

            return Ok(updatedRoomResource);
        }
        //delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            if (id == 0)
                return BadRequest();

            try
            {
                var reservations = await _ReservationService.GetReservationsByRoomId(id);

                // Delete each reservation
                foreach (var reservation in reservations)
                {
                    await _ReservationService.DeleteReservation(reservation);
                }

                var room = await _RoomService.GetRoomById(id);

                if (room == null)
                    return NotFound();

                await _RoomService.DeleteRoom(room);

                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                // Handle the case where related data prevents deletion
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                // For other exceptions, return a generic error message
                return Problem("An error occurred while deleting the room. Please try again later.", null, 500);
            }
        }

        [HttpGet("/company/{companyId}")]//get rooms related to a company
        public async Task<ActionResult<IEnumerable<Room>>> GetRoomsByCompanyId(int companyId)
        {
            var rooms = await _RoomService.GetRoomsByCompanyId(companyId);
            return Ok(rooms);


        }
    }
}
