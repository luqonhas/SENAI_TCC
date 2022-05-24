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
    public class SearchByEmailHandle : Notifiable<Notification>, IHandlerQuery<SearchByEmailQuery>
    {
        private readonly IUserRepository _userRepository;

        public SearchByEmailHandle(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public IQueryResult Handler(SearchByEmailQuery query)
        {
            query.Validate();

            if (!query.IsValid)
            {
                return new GenericQueryResult(false, "Correctly enter user data", query.Notifications);
            }

            var searchedUser = _userRepository.SearchByEmail(query.Email);

            if (searchedUser == null)
            {
                return new GenericQueryResult(false, "User not found", query.Notifications);
            }

            return new GenericQueryResult(true, "Users found!", searchedUser);
        }

    }
}
