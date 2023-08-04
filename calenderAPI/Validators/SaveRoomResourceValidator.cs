using calenderAPI.Resources;
using FluentValidation;

namespace calenderAPI.Validators
{
    public class SaveRoomResourceValidator : AbstractValidator<SaveRoomResource>
    {
        public SaveRoomResourceValidator()
        {
            RuleFor(a => a.Name)
                .NotEmpty()
                .MaximumLength(255);

            RuleFor(a => a.Description)
                .NotEmpty()
                .MaximumLength(255);  
            RuleFor(a => a.Location)
                .NotEmpty()
                .MaximumLength(255);
            RuleFor(a => a.Capacity)
               .NotEmpty()
               .GreaterThan(0);
        }
    }
}