using Avanade.Shared.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Queries.Alerts
{
    public class ListByOrderQuery : IQuery
    {
        public string Order { get; set; }

        public ListByOrderQuery()
        {

        }

        public ListByOrderQuery(string order)
        {
            Order = order;
        }

        public void Validate()
        {
            
        }
    }
}
