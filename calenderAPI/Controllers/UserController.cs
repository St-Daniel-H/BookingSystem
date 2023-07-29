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
using Microsoft.AspNetCore.Authorization;

namespace calenderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    //[Authorize]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        public UserController(IUserService userService, IMapper mapper)
        {
            this._mapper = mapper;
            this._userService = userService;
        }
        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            var userResources = _mapper.Map<IEnumerable<User>, IEnumerable<UserResource>>(users);
            return Ok(userResources);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<UserResource>> GetUserById(int id)
        {
            var user = await _userService.GetUserById(id);
            var userResource = _mapper.Map<User, UserResource>(user);

            return Ok(userResource);
        }

        //create
        [HttpPost("")]
        public async Task<ActionResult<UserResource>> CreateUser([FromBody] SaveUserResource saveUserResource)
        {
            var validator = new SaveUserResourceValidator();
            var validationResult = await validator.ValidateAsync(saveUserResource);

            if (!validationResult.IsValid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            var UserToCreate = _mapper.Map<SaveUserResource, User>(saveUserResource);

            var newUser = await _userService.CreateUser(UserToCreate);

            var User = await _userService.GetUserById(newUser.UserId);

            var UserResource = _mapper.Map<User, UserResource>(User);

            return Ok(UserResource);
        }
        //update
        [HttpPut("{id}")]
        public async Task<ActionResult<UserResource>> UpdateUser(int id, [FromBody] SaveUserResource saveUserResource)
        {
            var validator = new SaveUserResourceValidator();
            var validationResult = await validator.ValidateAsync(saveUserResource);

            var requestIsInvalid = id == 0 || !validationResult.IsValid;

            if (requestIsInvalid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            var UserToBeUpdate = await _userService.GetUserById(id);

            if (UserToBeUpdate == null)
                return NotFound();

            var User = _mapper.Map<SaveUserResource, User>(saveUserResource);

            await _userService.UpdateUser(UserToBeUpdate, User);

            var updatedUser = await _userService.GetUserById(id);
            var updatedUserResource = _mapper.Map<User, UserResource>(updatedUser);

            return Ok(updatedUserResource);
        }
        //delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (id == 0)
                return BadRequest();

            var User = await _userService.GetUserById(id);

            if (User == null)
                return NotFound();

            await _userService.DeleteUser(User);

            return NoContent();
        }
    }
}
