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

     
    public class CompanyController : ControllerBase
   {
        public CompanyController(ICompanyService companyService, IMapper mapper)
        {
            this._mapper = mapper;
            this._companyService = companyService;
        }

        private readonly IMapper _mapper;
        private readonly ICompanyService _companyService;
        [HttpGet("")]
       public async Task<ActionResult<IEnumerable<Company>>> GetAllCompanies()
       {
            var companies = await _companyService.GetAllCompanies();
          //  var companyResources = _mapper.Map<IEnumerable<Company>, IEnumerable<CompanyResource>>((IEnumerable<Company>)companies);
            var companyResources = _mapper.Map<IEnumerable<Company>, IEnumerable<CompanyResource>>(companies);

            return Ok(companyResources);

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyResource>> GetCompanyById(int id)
        {
            var company = await _companyService.GetCompanyById(id);
            var companyResource = _mapper.Map<Company, CompanyResource>(company);

            return Ok(companyResource);
        }

        //create
        [HttpPost("")]
        public async Task<ActionResult<CompanyResource>> CreateCompany([FromForm] SaveCompanyResource saveCompanyResource)
        {
            var validator = new SaveCompanyResourceValidator();
            var validationResult = await validator.ValidateAsync(saveCompanyResource);
            var uploadsFolderPath = "../calenderAPI/Pages/MeetingRooms/public/Uploads/";
            if (!validationResult.IsValid)
                return BadRequest(validationResult.Errors); // this needs refining, but for demo it is ok

            var companyToCreate = _mapper.Map<SaveCompanyResource, Company>(saveCompanyResource);
            if (saveCompanyResource.Logo != null && saveCompanyResource.Logo.Length > 0)
            {
                // Generate the filename using the CompanyId or any other unique identifier
                var guidFileName = Guid.NewGuid().ToString() + Path.GetExtension(saveCompanyResource.Logo.FileName);
                var filePath = Path.Combine(uploadsFolderPath, guidFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await saveCompanyResource.Logo.CopyToAsync(stream);
                }

                // Set the file path in the companyToCreate object to be "Uploads/companyId.jpg"
                companyToCreate.Logo = guidFileName;
            }
            var newCompany = await _companyService.CreateCompany(companyToCreate);

            var company = await _companyService.GetCompanyById(newCompany.CompanyId);

            var companyResource = _mapper.Map<Company, CompanyResource>(company);

            return Ok(companyResource);
        }
        //update
        [HttpPut("{id}")]
        public async Task<ActionResult<CompanyResource>> UpdateCompany(int id, [FromForm] SaveCompanyResource saveCompanyResource)
        {

            var uploadsFolderPath = "../calenderAPI/Pages/MeetingRooms/public/Uploads/";
            var validator = new SaveCompanyResourceValidator();
            var validationResult = await validator.ValidateAsync(saveCompanyResource);
            if (!validationResult.IsValid)
                return BadRequest(validationResult.Errors);
            var CompanyToBeUpdate = await _companyService.GetCompanyById(id);

            if (CompanyToBeUpdate == null)
                return NotFound();

            CompanyToBeUpdate = _mapper.Map<SaveCompanyResource, Company>(saveCompanyResource);
            if (saveCompanyResource.Logo != null && saveCompanyResource.Logo.Length > 0)
            {
                // Generate the filename using the CompanyId or any other unique identifier
                var guidFileName = Guid.NewGuid().ToString() + Path.GetExtension(saveCompanyResource.Logo.FileName);
                var filePath = Path.Combine(uploadsFolderPath, guidFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await saveCompanyResource.Logo.CopyToAsync(stream);
                }

                // Set the file path in the companyToCreate object to be "Uploads/companyId.jpg"
                CompanyToBeUpdate.Logo = guidFileName;
            }

            var Company =  await _companyService.GetCompanyById(id); 

            await _companyService.UpdateCompany(Company, CompanyToBeUpdate);

            var updatedCompany = await _companyService.GetCompanyById(id);
            var updatedCompanyResource = _mapper.Map<Company, CompanyResource>(updatedCompany);

            return Ok(updatedCompanyResource);
        }


        //delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            if (id == 0)
                return BadRequest();

            var company = await _companyService.GetCompanyById(id);

            if (company == null)
                return NotFound();

            await _companyService.DeleteCompany(company);

            return NoContent();
        }
    }
}
