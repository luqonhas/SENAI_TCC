using Avanade.Shared.Entities;
using Avanade.Shared.Enums;
using Flunt.Notifications;
using Flunt.Validations;

namespace Avanade.Domain.Entities
{
    public class Alert : Base
    {
        public Alert(string description, EnAlertStatus status, int amountOfPeople, string urlImage)
        {
            AddNotifications(
            new Contract<Notification>()
                .Requires()
                .IsNotEmpty(description, "description", "The 'description' field cannot be empty")
                .IsNotNull(status, "status", "The 'status' field cannot be null")
                .IsGreaterThan(amountOfPeople, 0, "Amount of people", "number of people cannot be less than 0")
            );

            if (IsValid)
            {
                Description = description;
                Status = status;
                AmountOfPeople = amountOfPeople;
                UrlImage = urlImage;
            }
        }

        public string Description { get; private set; }
        public EnAlertStatus Status { get; private set; }
        public int AmountOfPeople { get; private set; }
        public string UrlImage { get; private set; }
    }
}
