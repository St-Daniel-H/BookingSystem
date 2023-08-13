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

namespace calenderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class ReservationController : ControllerBase
    {
        public ReservationController(IReservationService ReservationService, IMapper mapper)
        {
            this._mapper = mapper;
            this._ReservationService = ReservationService;

        }

        private readonly IMapper _mapper;
        private readonly IReservationService _ReservationService;
        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetAllReservations()
        {
            var Reservations = await _ReservationService.GetAllReservations();
            //  var ReservationResources = _mapper.Map<IEnumerable<Reservation>, IEnumerable<ReservationResource>>((IEnumerable<Reservation>)Reservations);
            var ReservationResources = _mapper.Map<IEnumerable<Reservation>, IEnumerable<ReservationResource>>(Reservations);

            return Ok(ReservationResources);

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ReservationResource>> GetReservationById(int id)
        {
            var Reservation = await _ReservationService.GetReservationById(id);
            var ReservationResource = _mapper.Map<Reservation, ReservationResource>(Reservation);

            return Ok(ReservationResource);
        }

        //create
        [HttpPost("")]
        public async Task<ActionResult<ReservationResource>> CreateReservation([FromBody] SaveReservationResource saveReservationResource)
        {
            var validator = new SaveReservationResourceValidator();
            var validationResult = await validator.ValidateAsync(saveReservationResource);

            if (!validationResult.IsValid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            var ReservationToCreate = _mapper.Map<SaveReservationResource, Reservation>(saveReservationResource);

            var newReservation = await _ReservationService.CreateReservation(ReservationToCreate);

            var Reservation = await _ReservationService.GetReservationById(newReservation.ReservationId);

            var ReservationResource = _mapper.Map<Reservation, ReservationResource>(Reservation);

            return Ok(ReservationResource);
        }
        //update
        [HttpPut("{id}")]
        public async Task<ActionResult<ReservationResource>> UpdateMusic(int id, [FromBody] SaveReservationResource saveReservationResource)
        {
            var validator = new SaveReservationResourceValidator();
            var validationResult = await validator.ValidateAsync(saveReservationResource);

            var requestIsInvalid = id == 0 || !validationResult.IsValid;

            if (requestIsInvalid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            var ReservationToBeUpdate = await _ReservationService.GetReservationById(id);

            if (ReservationToBeUpdate == null)
                return NotFound();

            var Reservation = _mapper.Map<SaveReservationResource, Reservation>(saveReservationResource);

            await _ReservationService.UpdateReservation(ReservationToBeUpdate, Reservation);

            var updatedReservation = await _ReservationService.GetReservationById(id);
            var updatedReservationResource = _mapper.Map<Reservation, ReservationResource>(updatedReservation);

            return Ok(updatedReservationResource);
        }
        //delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            if (id == 0)
                return BadRequest();

            var Reservation = await _ReservationService.GetReservationById(id);

            if (Reservation == null)
                return NotFound();

            await _ReservationService.DeleteReservation(Reservation);

            return NoContent();
        }
        [HttpGet("/reservation/{companyId}")]//get rooms related to a company
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationsByCompanyId(int companyId)
        {
            
            var reservations = await _ReservationService.GetReservationsByCompanyId(companyId);
            return Ok(reservations);


        }
    }
}
