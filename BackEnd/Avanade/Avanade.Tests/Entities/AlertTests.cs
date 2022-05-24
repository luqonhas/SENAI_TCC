using Avanade.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Avanade.Tests.Entities
{
    public class AlertTests
    {
        [Fact]
        public void MustReturnIfAlertIsValid()
        {
            Alert alert = new Alert(
                "Há 2 pessoas na área de risco",
                Shared.Enums.EnAlertStatus.Safe,
                2,
                "https://localhost:5001/image"
            );

            Assert.True(alert.IsValid, "Validated alert");
        }

        [Fact]
        public void MustReturnIfAlertIsValidWithoutDescription()
        {
            Alert alert = new Alert(
                "",
                Shared.Enums.EnAlertStatus.Safe,
                2,
                "https://localhost:5001/image"

            );

            Assert.True(!alert.IsValid, "Validated alert without description");
        }

        [Fact]
        public void MustReturnIfAlertIsValidWithAmountOfPeopleEqualToZero()
        {
            Alert alert = new Alert(
                "Há 2 pessoas na área de risco",
                Shared.Enums.EnAlertStatus.Safe,
                0,
                "https://localhost:5001/image"

            );

            Assert.True(!alert.IsValid, "Validated alert without description");
        }
    }
}
