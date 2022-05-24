using Avanade.Shared.Entities;
using Avanade.Shared.Enums;
using Flunt.Notifications;
using Flunt.Validations;

namespace Avanade.Domain.Entities
{
    public class User : Base
    {
        public User(string name, string email, string password, EnUserType userType)
        {
            AddNotifications(
            new Contract<Notification>()
                .Requires()
                .IsNotEmpty(name, "name", "The 'name' field cannot be empty")
                .IsEmail(email, "email", "Enter a valid email address")
                .IsGreaterThan(password, 6, "The 'password' field must have at least 6 characters")
            );

            if (IsValid)
            {
                Name = name;
                Email = email;
                Password = password;
                UserType = userType;
            }
        }

        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }
        public EnUserType UserType { get; private set; }


        public void UpdateUser(string name)
        {
            AddNotifications(
            new Contract<Notification>()
                .Requires()
                .IsNotEmpty(name, "name", "The 'name' field cannot be empty")
            );

            if (IsValid)
            {
                Name = name;
            }
        }
    }
}
