using Avanade.Domain.Entities;
using System.Collections.Generic;

namespace Avanade.Domain.Interfaces
{
    public interface IAlertRepository
    {
        /// <summary>
        /// Create a new Alert
        /// </summary>
        /// <param name="alert">Alert object with the data to be created</param>
        void Create(Alert alert);

        /// <summary>
        /// List all alerts
        /// </summary>
        /// <returns>An alert list</returns>
        IEnumerable<Alert> Read();

        IEnumerable<Alert> ReadByOrder(string order);
    }
}
