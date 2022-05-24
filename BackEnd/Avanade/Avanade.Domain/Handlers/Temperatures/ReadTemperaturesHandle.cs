using Avanade.Domain.Entities;
using Avanade.Domain.Interfaces;
using Avanade.Domain.Queries.Temperaturas;
using Avanade.Shared.Handlers.Contracts;
using Avanade.Shared.Queries;
using Flunt.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Handlers.Temperatures
{
    public class ReadTemperaturesHandle : Notifiable<Notification>, IHandlerQuery<ReadTemperaturesQuery>
    {
        private readonly ITemperatureRepository _temperatureRepository;

        public ReadTemperaturesHandle(ITemperatureRepository temperatureRepository)
        {
            _temperatureRepository = temperatureRepository;
        }

        public IQueryResult Handler(ReadTemperaturesQuery query)
        {
            IEnumerable<Temperature> list = _temperatureRepository.Read();

            return new GenericQueryResult(true, "Temperatures found!", list);
        }
    }
}
