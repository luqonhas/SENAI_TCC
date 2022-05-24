using Avanade.Domain.Commands.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Avanade.Tests.Commands.Users
{
    public class CreateAccountCommandTest
    {
        [Fact]
        public void MustReturnSuccessIfDataIsValid()
        {
            CreateAccountCommand commad = new CreateAccountCommand(
                "Test Name",
                "test@gmail.com",
                "test12345",
                Shared.Enums.EnUserType.Guest
            );

            commad.Validate();

            Assert.True(commad.IsValid, "The data was filled in correctly");
        }

        [Fact]
        public void MustReturnSuccessIfDataIsValidWithoutName()
        {
            CreateAccountCommand commad = new CreateAccountCommand(
                "",
                "test@gmail.com",
                "test12345",
                Shared.Enums.EnUserType.Guest
            );

            commad.Validate();

            Assert.True(!commad.IsValid, "Validated user without name");
        }

        [Fact]
        public void MustReturnSuccessIfDataIsValidWithoutEmail()
        {
            CreateAccountCommand commad = new CreateAccountCommand(
                "Test Name",
                "test@",
                "test12345",
                Shared.Enums.EnUserType.Guest
            );

            commad.Validate();

            Assert.True(!commad.IsValid, "Validated user without email");
        }

        [Fact]
        public void MustReturnSuccessIfDataIsValidWithWeakPassword()
        {
            CreateAccountCommand commad = new CreateAccountCommand(
                "Test Name",
                "test@gmail.com",
                "123",
                Shared.Enums.EnUserType.Guest
            );

            commad.Validate();

            Assert.True(!commad.IsValid, "Validated user with weak password");
        }
    }
}
