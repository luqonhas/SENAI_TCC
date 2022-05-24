using Avanade.Domain.Commands.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Avanade.Tests.Commands.Users
{
    public class DeleteAccountCommandTest
    {
        [Fact]
        public void MustReturnSuccessIfDataIsValid()
        {
            DeleteAccountCommand command = new DeleteAccountCommand();
            command.Id = Guid.NewGuid();

            command.Validate();

            Assert.True(command.IsValid, "Valid data");
        }

        [Fact]
        public void MustReturnSuccessIfDataIsInvalidWithIdEmpty()
        {
            DeleteAccountCommand command = new DeleteAccountCommand();
            command.Id = Guid.Empty;

            command.Validate();

            Assert.True(!command.IsValid, "Valid data");
        }
    }
}
