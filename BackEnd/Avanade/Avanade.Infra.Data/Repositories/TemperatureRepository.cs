using Avanade.Domain.Entities;
using Avanade.Domain.Interfaces;
using Avanade.Infra.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Infra.Data.Repositories
{
    public class TemperatureRepository : ITemperatureRepository
    {
        private readonly AvanadeContext _context;

        public TemperatureRepository(AvanadeContext context)
        {
            _context = context;
        }

        public void Create(Temperature temperature)
        {
            _context.Temperatures.Add(temperature);

            _context.SaveChanges();
        }

        public void Deletar(Guid id)
        {
            _context.Temperatures.Remove(SearchById(id));

            _context.SaveChanges();
        }

        public IEnumerable<Temperature> Read()
        {
            return _context.Temperatures
                .AsNoTracking()
                .OrderBy(t => t.CreatedDate);
        }

        public Temperature SearchById(Guid id)
        {
            return _context.Temperatures
                .AsNoTracking()
                .FirstOrDefault(t => t.Id == id);
        }

        public void Update(Temperature temperature)
        {
            _context.Entry(temperature).State = EntityState.Modified;

            _context.SaveChanges();
        }
    }
}
