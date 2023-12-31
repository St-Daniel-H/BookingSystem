﻿using AutoMapper;
using BookingSystem.core.Models.Auth;
using calenderAPI.Resources;
using calenderAPI.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using startup.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using System.Data.SqlTypes;
using Microsoft.EntityFrameworkCore;
using BookingSystem.Services.Interfaces;
using BookingSystem.Services.Repository;
using calenderAPI.Validators;
using FluentValidation;

namespace calenderAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AUser> _userManager;
        private readonly IMapper _mapper;
        private readonly RoleManager<Role> _roleManager;
        private readonly JwtSettings _jwtSettings;

        public AuthController(IMapper mapper, UserManager<AUser> userManager, IAUserService AUserService, RoleManager<Role> roleManager,
            IOptionsSnapshot<JwtSettings> jwtSettings)
        {
            _mapper = mapper;
            _userManager = userManager;
            _auserService = AUserService;
            _roleManager = roleManager;
            _jwtSettings = jwtSettings.Value;

        }
        private readonly IAUserService _auserService;
        [HttpPost("signup")]

        public async Task<IActionResult> SignUp(UserSignUpResource userSignUpResource)
        {
            var user = _mapper.Map<UserSignUpResource, AUser>(userSignUpResource);
            try
            {
                var userCreateResult = await _userManager.CreateAsync(user, userSignUpResource.Password);
                if (userCreateResult.Succeeded)
                {
                    // Return the ID in the response
                    return Created(string.Empty, string.Empty);
                }

                // User creation failed, return the error description
                return Problem(userCreateResult.Errors.First().Description, null, 500);

            }
            catch (Exception ex)
            {
                if (ex.Message == "Data is Null. This method or property cannot be called on Null values.")
                    return BadRequest(new { detail = "Email already exists" });

                else return BadRequest(ex.Message);
            }


        }

        //}
        //[HttpPost("signup")]
        //public async Task<IActionResult> SignUp(UserSignUpResource userSignUpResource)
        //{
        //    var user = _mapper.Map<UserSignUpResource, AUser>(userSignUpResource);

        //var userCreateResult = await _userManager.CreateAsync(user, userSignUpResource.Password);

        //    if (userCreateResult.Succeeded)
        //    { 

        //        return Created(string.Empty, string.Empty);
        //    }

        //    // User creation failed, return the error description
        //    return Problem(userCreateResult.Errors.First().Description, null, 500);
        //}

        //1-  //[HttpPost("signup")]
        //public async Task<IActionResult> SignUp(UserSignUpResource userSignUpResource)
        //{
        //    var user = _mapper.Map<UserSignUpResource, AUser>(userSignUpResource);

        //    var userCreateResult = await _userManager.CreateAsync(user, userSignUpResource.Password);

        //    if (userCreateResult.Succeeded)
        //    {
        //        return Created(string.Empty, string.Empty);
        //    }

        //    return Problem(userCreateResult.Errors.First().Description, null, 500);
        //}


        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(UserLoginResource userLoginResource)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Email == userLoginResource.Email);
            if (user is null)
            {
                return NotFound("User not found");
            }

            var userSigninResult = await _userManager.CheckPasswordAsync(user, userLoginResource.Password);

            if (userSigninResult)
            {
                var roles = await _userManager.GetRolesAsync(user);
                return Ok(GenerateJwt(user, roles));
            }

            return BadRequest("Email or password incorrect.");
        }

        [HttpGet("users/{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Optionally, you can remove sensitive information from the user object before returning it.
            // For example, you may not want to include the user's password hash.
            // user.PasswordHash = null;

            return Ok(user);
        }
        [HttpPost("Roles")]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            if (string.IsNullOrWhiteSpace(roleName))
            {
                return BadRequest("Role name should be provided.");
            }

            var newRole = new Role
            {
                Name = roleName
            };

            var roleResult = await _roleManager.CreateAsync(newRole);

            if (roleResult.Succeeded)
            {
                return Ok();
            }

            return Problem(roleResult.Errors.First().Description, null, 500);
        }
        //get user by companyId
        [HttpGet("/auth/company/{companyId}")]
        public async Task<ActionResult<IEnumerable<Room>>> GetUsersByCompanyId(int companyId)
        {
            var users = await _auserService.GetUsersByCompanyId(companyId);
            return Ok(users);
        }
        //delete User request.
        [HttpDelete("/auth/User/{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            if (id == null)
                return BadRequest();

            var User = await _userManager.FindByIdAsync(id.ToString());

            if (User == null)
                return NotFound();

            await _auserService.DeleteUser(User);

            return NoContent();
        }
        //update
        [HttpPut("/auth/user/{id}")]
        public async Task<ActionResult<UpdateAUserResource>> UpdateUser(Guid id, [FromBody] UpdateAUserResource updateUseresource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userToBeUpdated = await _userManager.FindByIdAsync(id.ToString());
            if (userToBeUpdated == null)
            {
                return NotFound("User not found");
            }

            var user = _mapper.Map<UpdateAUserResource, AUser>(updateUseresource);
            var exist = await _auserService.getUserByEmail(user.Email);
            if(exist != null && id != exist.Id)
            {
                return Problem("User already exist");
            }
            await _auserService.UpdateUser(userToBeUpdated, user);

            return NoContent();
        }
        [HttpPost("User/{userEmail}/Role")]
        public async Task<IActionResult> AddUserToRole(string userEmail, [FromBody] string roleName)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Email == userEmail);

            var result = await _userManager.AddToRoleAsync(user, roleName);

            if (result.Succeeded)
            {
                return Ok();
            }

            return Problem(result.Errors.First().Description, null, 500);
        }
        private string GenerateJwt(AUser user, IList<string> roles)
        {
            var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
    };

            var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r));
            claims.AddRange(roleClaims);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_jwtSettings.ExpirationInDays));

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        //transfer ownership
        [HttpPost("transfer-owner")]
        public async Task<IActionResult> TransferOwner([FromBody] TransferOwnershipResource request)
        {
            try
            {
                var fromUser = await _userManager.FindByIdAsync(request.FromUserId.ToString());
                var toUser = await _userManager.FindByIdAsync(request.ToUserId.ToString());

                if (fromUser == null || toUser == null)
                {
                    return BadRequest(new { Message = "Invalid user IDs." });
                }

                await _auserService.TransferOwner(fromUser, toUser);

                return Ok(new { Message = "Owner transferred successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while transferring owner.", Error = ex.Message });
            }
        }


    }
    
}
