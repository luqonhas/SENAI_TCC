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
    public class LineRepository : ILineRepository
    {
        private readonly AvanadeContext _context;

        public LineRepository(AvanadeContext context)
        {
            _context = context;
        }

        public void Create(Line line)
        {
            _context.Lines.Add(line);

            _context.SaveChanges();
        }

        public void Delete(Guid id)
        {
            _context.Remove(SearchById(id));

            _context.SaveChanges();
        }

        public IEnumerable<Line> Read()
        {
            return _context.Lines
                .AsNoTracking()
                .OrderBy(l => l.CreatedDate);
        }

        public Line SearchById(Guid id)
        {
            return _context.Lines
                .AsNoTracking()
                .FirstOrDefault(l => l.Id == id);
        }

        public void Update(Line line)
        {
            _context.Entry(line).State = EntityState.Modified;

            _context.SaveChanges();
        }
    }
}
