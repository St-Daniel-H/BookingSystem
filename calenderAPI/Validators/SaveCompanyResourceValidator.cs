using calenderAPI.Resources;
using FluentValidation;

namespace calenderAPI.Validators
{
    public class SaveCompanyResourceValidator : AbstractValidator<SaveCompanyResource>
    {
        public SaveCompanyResourceValidator()
        {
            RuleFor(a => a.Name)
                .NotEmpty()
                .MaximumLength(50);
        }
    }
}
