using Avanade.Shared.Commands;
using Avanade.Shared.Enums;
using Flunt.Notifications;
using Flunt.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Commands.Users
{
    public class CreateAccountCommand : Notifiable<Notification>, ICommand
    {
        public CreateAccountCommand() { }

        public CreateAccountCommand(string name, string email, string password, EnUserType userType)
        {
            Name = name;
            Email = email;
            Password = password;
            UserType = userType;
        }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public EnUserType UserType { get; set; }

        public void Validate()
        {
            AddNotifications(
            new Contract<Notification>()
                .Requires()
                .IsNotEmpty(Name, "name", "The 'name' field cannot be empty")
                .IsEmail(Email, "email", "Enter a valid email address")
                .IsGreaterThan(Password, 6, "The 'password' field must have at least 6 characters")
            );
        }
    }
}
