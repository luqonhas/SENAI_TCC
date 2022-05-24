using Avanade.Domain.Interfaces;
using Avanade.Domain.Queries.Alerts;
using Avanade.Shared.Handlers.Contracts;
using Avanade.Shared.Queries;
using Flunt.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Handlers.Alerts
{
    public class ListByOrderHandle : Notifiable<Notification>, IHandlerQuery<ListByOrderQuery>
    {
        private readonly IAlertRepository _alertRepository;

        public ListByOrderHandle(IAlertRepository alertRepository)
        {
            _alertRepository = alertRepository;
        }

        public IQueryResult Handler(ListByOrderQuery query)
        {
            var lista = _alertRepository.ReadByOrder(query.Order);

            if (lista == null)
                return new GenericQueryResult(false, "No alerts found", "");

            return new GenericQueryResult(true, "Alerts found", lista);
        }
    }
}
