using Avanade.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Domain.Interfaces
{
    public interface ITemperatureRepository
    {
        IEnumerable<Temperature> Read();

        Temperature SearchById(Guid id);

        void Create(Temperature temperature);

        void Update(Temperature temperature);

        void Deletar(Guid id);
    }
}
