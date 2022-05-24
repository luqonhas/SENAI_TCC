using Avanade.Shared.Commands;
using Avanade.Shared.Enums;
using Flunt.Notifications;
using Flunt.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Commands.Temperatures
{
    public class CreateTemperatureCommand : Notifiable<Notification>, ICommand
    {
        public CreateTemperatureCommand()
        {

        }

        public CreateTemperatureCommand(decimal degrees)
        {
            Degrees = degrees;
        }

        public decimal Degrees { get; set; }
        private EnTemperatureStatus Status { get; set; }

        public void Validate()
        {
            AddNotifications(
               new Contract<Notification>()
                   .Requires()
                   .IsNotNull(Degrees, "Degrees", "The 'Degrees' field cannot be null")
                   .IsNotNull(Status, "Status", "The 'Status' field cannot be null")
               );
        }

        public void AddStatus(EnTemperatureStatus status)
        {
            Status = status;
        }

        public EnTemperatureStatus ReturnStatus()
        {
            return Status;
        }
    }
}
