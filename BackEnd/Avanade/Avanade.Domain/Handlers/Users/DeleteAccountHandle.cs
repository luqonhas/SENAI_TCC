using Avanade.Domain.Commands.Users;
using Avanade.Domain.Interfaces;
using Avanade.Shared.Commands;
using Avanade.Shared.Handlers.Contracts;
using Flunt.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Handlers.Users
{
    public class DeleteAccountHandle : Notifiable<Notification>, IHandlerCommand<DeleteAccountCommand>
    {
        private readonly IUserRepository _userRepository;

        public DeleteAccountHandle(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public ICommandResult Handler(DeleteAccountCommand command)
        {
            command.Validate();

            if (!command.IsValid)
            {
                return new GenericCommandResult(false, "Correctly inform the user you want to delete", command.Notifications);
            }

            var searchedUser = _userRepository.SearchById(command.Id);

            if (searchedUser == null)
            {
                return new GenericCommandResult(false, "User not found", command.Notifications);
            }

            _userRepository.Delete(searchedUser.Id);

            return new GenericCommandResult(false, "User deleted successfully!", "");
        }
    }
}
