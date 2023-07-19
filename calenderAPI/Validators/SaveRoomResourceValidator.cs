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
                .MaximumLength(50);
        }
    }
}
