using Avanade.Domain.Commands.Lines;
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

namespace Avanade.Domain.Handlers.Lines
{
    public class EditLinePositionHandle : Notifiable<Notification>, IHandlerCommand<EditLinePositionCommand>
    {
        private readonly ILineRepository _lineRepository;

        public EditLinePositionHandle(ILineRepository lineRepository)
        {
            _lineRepository = lineRepository;
        }

        public ICommandResult Handler(EditLinePositionCommand command)
        {
            command.Validate();

            if (!command.IsValid)
                return new GenericCommandResult(false, "Correctly enter alert data", command.Notifications);

            Line line = _lineRepository.SearchById(command.Id);

            if (line == null)
                return new GenericCommandResult(false, "Line not found", "");

            line.AdicionarDados(
                command.Width,
                command.MarginTop,
                command.MarginLeft
            );

            _lineRepository.Update(line);

            return new GenericCommandResult(true, "Line has been edited", line);
        }
    }
}
