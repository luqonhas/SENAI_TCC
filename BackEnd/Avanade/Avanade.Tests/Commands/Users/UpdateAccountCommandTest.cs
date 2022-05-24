using Avanade.Domain.Commands.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Avanade.Tests.Commands.Users
{
    public class UpdateAccountCommandTest
    {
        [Fact]
        public void MustReturnIfDataIsValid()
        {
            UpdateAccountCommand command = new UpdateAccountCommand();
            command.Id = Guid.NewGuid();
            command.Name = "Updated Name";

            command.Validate();

            Assert.True(command.IsValid, "Validated data");
        }

        [Fact]
        public void MustReturnIfDataIsValidWithoutId()
        {
            UpdateAccountCommand command = new UpdateAccountCommand();
            command.Id = Guid.Empty;
            command.Name = "Updated Name";

            command.Validate();

            Assert.True(!command.IsValid, "Validated data");
        }

        [Fact]
        public void MustReturnIfDataIsValidWithoutName()
        {
            UpdateAccountCommand command = new UpdateAccountCommand();
            command.Id = Guid.NewGuid();
            command.Name = "";

            command.Validate();

            Assert.True(!command.IsValid, "Validated data");
        }

        [Fact]
        public void MustReturnIfDataIsValidWithoutIdAndName()
        {
            UpdateAccountCommand command = new UpdateAccountCommand();
            command.Id = Guid.Empty;
            command.Name = "";

            command.Validate();

            Assert.True(!command.IsValid, "Validated data");
        }
    }
}
