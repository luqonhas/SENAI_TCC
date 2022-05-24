using Avanade.Domain.Interfaces;
using Avanade.Domain.Queries.Lines;
using Avanade.Shared.Handlers.Contracts;
using Avanade.Shared.Queries;
using Flunt.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Handlers.Lines
{
    public class ReadLinesHandle : Notifiable<Notification>, IHandlerQuery<ReadLinesQuery>
    {
        private readonly ILineRepository _lineRepository;

        public ReadLinesHandle(ILineRepository lineRepository)
        {
            _lineRepository = lineRepository;
        }

        public IQueryResult Handler(ReadLinesQuery query)
        {
            var lines = _lineRepository.Read();

            return new GenericQueryResult(true, "Lines found!", lines);
        }
    }
}
