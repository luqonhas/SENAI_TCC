using Avanade.Domain.Commands.Temperatures;
using Avanade.Domain.Entities;
using Avanade.Domain.Interfaces;
using Avanade.Shared.Commands;
using Avanade.Shared.Enums;
using Avanade.Shared.Handlers.Contracts;
using Flunt.Notifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Handlers.Temperatures
{
    public class CreateTemperatureHandle : Notifiable<Notification>, IHandlerCommand<CreateTemperatureCommand>
    {
        private readonly ITemperatureRepository _temperatureRepository;

        public CreateTemperatureHandle(ITemperatureRepository temperatureRepository)
        {
            _temperatureRepository = temperatureRepository;
        }

        public ICommandResult Handler(CreateTemperatureCommand command)
        {
            command.Validate();

            if (!command.IsValid)
                return new GenericCommandResult(false, "Correctly enter temperature data", command.Notifications);

            switch (command.Degrees)
            {
                case <= 0 or <= 26:
                    command.AddStatus(EnTemperatureStatus.Safe);
                    break;

                case > 26 and <= 35:
                    command.AddStatus(EnTemperatureStatus.Caution);
                    break;

                case > 35:
                    command.AddStatus(EnTemperatureStatus.Danger);
                    break;
            }

            Temperature temperature = new Temperature(
                command.Degrees,
                command.ReturnStatus()
            );

            if (!temperature.IsValid)
                return new GenericCommandResult(false, "Correctly enter temperature data", temperature.Notifications);

            _temperatureRepository.Create(temperature);

            return new GenericCommandResult(true, "Temperature created successfully", temperature);
        }
    }
}
