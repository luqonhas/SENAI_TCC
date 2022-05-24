using Avanade.Domain.Interfaces;
using Avanade.Domain.Queries.Users;
using Avanade.Shared.Handlers.Contracts;
using Avanade.Shared.Queries;
using Flunt.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Handlers.Users
{
    public class ListAccountHandle : Notifiable<Notification>, IHandlerQuery<ListAccountQuery>
    {
        private readonly IUserRepository _userRepository;

        public ListAccountHandle(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public IQueryResult Handler(ListAccountQuery query)
        {
            var list = _userRepository.List();

            return new GenericQueryResult(true, "Users found!", list);
        }

    }
}
