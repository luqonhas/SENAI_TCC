using Avanade.Shared.Commands;
using Flunt.Notifications;
using Flunt.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Commands.Users
{
    public class DeleteAccountCommand : Notifiable<Notification>, ICommand
    {
        public DeleteAccountCommand() { }

        public Guid Id { get; set; }

        public void Validate()
        {
            AddNotifications(
            new Contract<Notification>()
                   .Requires()
                   .IsNotEmpty(Id, "id", "The 'id' field cannot be empty")
            );
        }
    }
}
