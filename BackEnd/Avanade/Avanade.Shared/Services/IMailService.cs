using Avanade.Shared.Models;
using System.Threading.Tasks;

namespace Avanade.Shared.Services
{
    public interface IMailService
    {
        // to send an email manually 
        Task SendEmailAsync(MailRequest mailRequest);

        // to send an email automatically with template
        Task SendAlertEmail(string emailUser, int amountOfPeople);
    }
}
