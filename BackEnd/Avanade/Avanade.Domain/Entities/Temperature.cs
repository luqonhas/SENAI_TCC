using Avanade.Shared.Entities;
using Avanade.Shared.Enums;
using Flunt.Notifications;
using Flunt.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Entities
{
    public class Temperature : Base
    {
        public Temperature(decimal degrees, EnTemperatureStatus status)
        {
            AddNotifications(
            new Contract<Notification>()
                .Requires()
                .IsNotNull(degrees, "Degrees", "The 'Degrees' field cannot be null")
                .IsNotNull(status, "Status", "The 'Status' field cannot be null")
            );

            if (IsValid)
            {
                Degrees = degrees;
                Status = status;
            }
        }

        public decimal Degrees { get; private set; }
        public EnTemperatureStatus Status { get; private set; }
    }
}
