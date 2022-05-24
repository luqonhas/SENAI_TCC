using Avanade.Shared.Entities;
using Flunt.Notifications;
using Flunt.Validations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Entities
{
    public class Line : Base
    {
        public Line(string lineName, decimal width, decimal marginTop, decimal marginLeft)
        {
            AddNotifications(
            new Contract<Notification>()
                .IsNotEmpty(lineName, "LineName", "The 'LineName' field cannot be empty")
                .IsGreaterThan(width, 0, "Width", "The 'Width' field cannot be null")
                .IsNotNull(marginTop, "MarginTop", "The 'MarginTop' field cannot be null")
                .IsNotNull(marginLeft, "MarginLeft", "The 'MarginLeft' field cannot be null")
            );

            if (IsValid)
            {
                LineName = lineName;
                Width = width;
                MarginTop = marginTop;
                MarginLeft = marginLeft;
            }
        }

        public string LineName { get; private set; }
        public decimal Width { get; private set; }
        public decimal MarginTop { get; private set; }
        public decimal MarginLeft { get; private set; }


        public void AdicionarDados(decimal width, decimal marginTop, decimal marginLeft)
        {
            Width = width;
            MarginTop = marginTop;
            MarginLeft = marginLeft;
        }
    }
}
