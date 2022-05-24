using Avanade.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Avanade.Tests.Entities
{
    public class LineTests
    {
        [Fact]
        public void MustReturnIfLineIsValid()
        {
            Line line = new Line(
                "New Line",
                Convert.ToDecimal(100.5),
                400,
                Convert.ToDecimal(79.7)
            );

            Assert.True(line.IsValid, "Validated line");
        }

        [Fact]
        public void MustReturnIfLineIsValidWithoutName()
        {
            Line line = new Line(
                "",
                Convert.ToDecimal(100.5),
                400,
                Convert.ToDecimal(79.7)
            );

            Assert.True(!line.IsValid, "Validated line without name");
        }

        [Fact]
        public void MustReturnIfLineIsValidWithWidthEqualToZero()
        {
            Line line = new Line(
                "New Line",
                0,
                400,
                Convert.ToDecimal(79.7)
            );

            Assert.True(!line.IsValid, "Validated line with Width 0");
        }

      
    }
}
