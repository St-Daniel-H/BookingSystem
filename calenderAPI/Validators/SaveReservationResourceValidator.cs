using calenderAPI.Resources;
using FluentValidation;

namespace calenderAPI.Validators
{
    public class SaveReservationResourceValidator : AbstractValidator<SaveReservationResource>
    {
        public SaveReservationResourceValidator()
        {
            RuleFor(a => a.NumberOfAttendees > 0)
                ;
        }
    }
}
