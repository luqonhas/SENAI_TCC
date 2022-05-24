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
    public class AlertRepository : IAlertRepository
    {
        private readonly AvanadeContext _ctx;

        public AlertRepository(AvanadeContext ctx)
        {
            _ctx = ctx;
        }

        /// <summary>
        /// Create a new Alert
        /// </summary>
        /// <param name="alert">Alert object with the data to be created</param>
        public void Create(Alert alert)
        {
            _ctx.Alerts.Add(alert);

            _ctx.SaveChanges();
        }

        /// <summary>
        /// List all alerts
        /// </summary>
        /// <returns>An alert list</returns>
        public IEnumerable<Alert> Read()
        {
            return _ctx.Alerts
                .OrderBy(a => a.CreatedDate)
                .AsNoTracking()
                .ToList();
        }

        public IEnumerable<Alert> ReadByOrder(string order)
        {
            IEnumerable<Alert> lista;

            switch (order)
            {
                case "recentes":
                    lista = _ctx.Alerts
                            .AsNoTracking()
                            .OrderByDescending(a => a.CreatedDate);
                    break;

                case "antigos":
                    lista = _ctx.Alerts
                            .AsNoTracking()
                            .OrderBy(a => a.CreatedDate);
                    break;

                default:
                    lista = _ctx.Alerts
                               .AsNoTracking()
                               .Where(a => a.CreatedDate.Date.ToString() == order);
                    break;
            }

            return lista;
        }
    }
}
