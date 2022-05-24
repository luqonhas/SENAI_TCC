using Avanade.Domain.Entities;
using Avanade.Domain.Interfaces;
using Avanade.Domain.Queries.Alerts;
using Avanade.Shared.Handlers.Contracts;
using Avanade.Shared.Queries;
using Flunt.Notifications;
using System.Collections.Generic;

namespace Avanade.Domain.Handlers.Alerts
{
    public class ListAlertHandle : Notifiable<Notification>, IHandlerQuery<ListAlertQuery>
    {
        private readonly IAlertRepository _alertRepository;

        public ListAlertHandle(IAlertRepository alertRepository)
        {
            _alertRepository = alertRepository;
        }

        public IQueryResult Handler(ListAlertQuery query)
        {
            IEnumerable<Alert> list = _alertRepository.Read();

            return new GenericQueryResult(true, "Alerts found!", list);
        }

    }
}
