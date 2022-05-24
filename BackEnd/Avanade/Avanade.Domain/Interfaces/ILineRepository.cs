using Avanade.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Interfaces
{
    public interface ILineRepository
    {
        IEnumerable<Line> Read();

        Line SearchById(Guid id);

        void Create(Line line);

        void Update(Line line);

        void Delete(Guid id);
    }
}
