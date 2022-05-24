using Avanade.Domain.Commands.Users;
using Avanade.Domain.Entities;
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
    public class UpdateAccountHandle : Notifiable<Notification>, IHandlerCommand<UpdateAccountCommand>
    {
        private readonly IUserRepository _userRepository;

        public UpdateAccountHandle(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public ICommandResult Handler(UpdateAccountCommand command)
        {
            command.Validate();

            if (!command.IsValid)
            {
                return new GenericCommandResult(false, "Enter the data correctly", command.Notifications);
            }

            User oldUser = _userRepository.SearchById(command.Id);

            if (oldUser == null)
            {
                return new GenericCommandResult(false, "There is no user with this id", command.Notifications);
            }

            oldUser.UpdateUser(command.Name);

            _userRepository.Update(oldUser);

            return new GenericCommandResult(true, "Username changed successfully!", oldUser);
        }
    }
}
