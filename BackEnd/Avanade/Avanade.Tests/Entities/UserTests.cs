using Avanade.Domain.Entities;
using Avanade.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Avanade.Tests.Entities
{
    public class UserTests
    {
        [Fact]
        public void MustReturnIfUserIsValid()
        {
            User user = new User(
                "New User", 
                "usertest123@gmail.com",
                "test12345",
                EnUserType.Administrator    
            );

            Assert.True(user.IsValid, "Validated user");
        }

        [Fact]
        public void MustReturnIfUserIsValidWithoutEmail()
        {
            User user = new User(
                "New User",
                "usertest123",
                "test12345",
                EnUserType.Administrator
            );

            Assert.True(!user.IsValid, "Validated user without email");
        }

        [Fact]
        public void MustReturnIfUserIsValidWithoutName()
        {
            User user = new User(
                "",
                "usertest123@gmail.com",
                "test12345",
                EnUserType.Administrator
            );

            Assert.True(!user.IsValid, "Validated user without name");
        }

        [Fact]
        public void MustReturnIfUserIsValidWithWeakPassword()
        {
            User user = new User(
                "New User",
                "usertest123@gmail.com",
                "test1",
                EnUserType.Administrator
            );

            Assert.True(!user.IsValid, "Validated user with weak password");
        }
    }
}
