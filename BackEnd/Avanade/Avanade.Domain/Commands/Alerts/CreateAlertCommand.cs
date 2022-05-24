using Avanade.Shared.Commands;
using Avanade.Shared.Enums;
using Flunt.Notifications;
using Flunt.Validations;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Avanade.Domain.Commands.Alerts
{
    public class CreateAlertCommand : Notifiable<Notification>, ICommand
    {
        public CreateAlertCommand()
        {

        }

        public CreateAlertCommand(string description, int amountOfPeople)
        {
            Description = description;
            AmountOfPeople = amountOfPeople;
        }

        private string Description { get; set; }
        private EnAlertStatus Status { get; set; }

        [Required(ErrorMessage = "Informe a quantidade de pessoas")]
        public int AmountOfPeople  { get; set; }

        [NotMapped]
        public IFormFile Imagem { get; set; }

        public void Validate()
        {
            AddNotifications(
            new Contract<Notification>()
                .Requires()
                .IsNotEmpty(Description, "description", "The 'description' field cannot be empty")
                .IsNotNull(Status, "status", "The 'status' field cannot be null")
                .IsGreaterThan(AmountOfPeople, 0, "Amount of people", "number of people cannot be less than 0")
            );
        }

        public void UpdateStatus(EnAlertStatus status)
        {
            Status = status;
        }

        public EnAlertStatus ReturnStatus()
        {
            return Status;
        }

        public void UpdateDescription(string description)
        {
            Description = description;
        }

        public string ReturnDescription()
        {
            return Description;
        }
    }
}
