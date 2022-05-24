using Avanade.Domain.Commands.Temperatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Avanade.Tests.Commands.Temperature
{
    public class CreateTemperatureCommandTest
    {
        [Fact]
        public void MustReturnSuccessIfDataIsValid()
        {
            CreateTemperatureCommand command = new CreateTemperatureCommand();
            command.Degrees = 20.5M;
            command.AdicionarStatus(Shared.Enums.EnTemperatureStatus.Safe);

            command.Validate();

            Assert.True(command.IsValid, "The data was filled in correctly");
        }
    }
}
