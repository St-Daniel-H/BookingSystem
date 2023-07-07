using calenderAPI.Resources;
using FluentValidation;

namespace calenderAPI.Validators
{
    public class SaveUserResourceValidator : AbstractValidator<SaveUserResource>
    {
        public SaveUserResourceValidator()
        {
            RuleFor(a => a.Name)
                .NotEmpty()
                .MaximumLength(50);
        }
    }
}
