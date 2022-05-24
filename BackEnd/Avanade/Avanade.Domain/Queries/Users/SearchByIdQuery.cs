using Avanade.Shared.Enums;
using Avanade.Shared.Queries;
using Flunt.Notifications;
using Flunt.Validations;
using System;

namespace Avanade.Domain.Queries.Users
{
    public class SearchByIdQuery : Notifiable<Notification>, IQuery
    {
        public Guid Id { get; set; }

        public void Validate()
        {
            AddNotifications(
                new Contract<Notification>()
                    .Requires()
                    .IsNotEmpty(Id, "id", "The 'id' field cannot be empty")
                );
        }

        public class SearchByIdResult
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public EnUserType UserType { get; set; }
            public DateTime CreatedDate { get; set; }
        }
    }
}
