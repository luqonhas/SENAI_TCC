using Avanade.Domain.Commands.Users;
using Avanade.Domain.Interfaces;
using Avanade.Shared.Commands;
using Avanade.Shared.Handlers.Contracts;
using Flunt.Notifications;
using Avanade.Domain.Entities;
using Avanade.Shared.Utils;
using Avanade.Shared.Services;

namespace Avanade.Domain.Handlers.Users
{
    public class CreateAccountHandle : Notifiable<Flunt.Notifications.Notification>, IHandlerCommand<CreateAccountCommand>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMailService _mailService;

        public CreateAccountHandle(IUserRepository userRepository, IMailService mailService)
        {
            _userRepository = userRepository;
            _mailService = mailService;
        }

        public ICommandResult Handler(CreateAccountCommand command)
        {
            command.Validate();

            if (!command.IsValid)
            {
                return new GenericCommandResult(false, "Correctly enter user data", command.Notifications);
            }

            var emailExists = _userRepository.SearchByEmail(command.Email);

            if (emailExists != null)
            {
                return new GenericCommandResult(false, "Existing e-mail", "Enter another e-mail");
            }

            command.Password = Password.Encrypt(command.Password);

            //_mailService.SendAlertEmail(command.Email);

            User newUser = new User(command.Name, command.Email, command.Password, command.UserType);

            if (!newUser.IsValid)
            {
                return new GenericCommandResult(false, "Invalid user data", newUser.Notifications);
            }

            _userRepository.Add(newUser);

            return new GenericCommandResult(true, "User created successfully!", "user-token");
        }
    }
}
