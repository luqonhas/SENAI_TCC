using Avanade.Domain.Commands.Alerts;
using Avanade.Domain.Handlers.Alerts;
using Avanade.Domain.Queries.Alerts;
using Avanade.Shared.Commands;
using Avanade.Shared.Queries;
using Avanade.Shared.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nancy.Json;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Net;
using System.Text;

namespace Avanade.Api.Controllers
{
    [Produces("application/json")]
    [Route("v1/alert")]
    [ApiController]
    public class AlertsController : ControllerBase
    {

        [Route("register")]
        [HttpPost]
        public GenericCommandResult Register([FromForm]CreateAlertCommand command, [FromServices] CreateAlertHandle handle)
        {
            return (GenericCommandResult)handle.Handler(command);
        }

        [Route("read")]
        [HttpGet]
        public GenericQueryResult GetAll([FromServices] ListAlertHandle handle)
        {
            ListAlertQuery query = new ListAlertQuery();            

            return (GenericQueryResult)handle.Handler(query);
        }

        [HttpGet("read/{order}")]
        public GenericQueryResult GetByOrder(string order, [FromServices] ListByOrderHandle handle)
        {
            ListByOrderQuery query = new ListByOrderQuery(order);

            return (GenericQueryResult)handle.Handler(query);
        }

        // medidas enviadas para o python
        [HttpGet("teste")]
        [Authorize(Roles = "Administrator")]
        public GenericCommandResult Teste()
        {
            object objeto = new
            {
                posL_linha1 = 550,
                posL_linha2 = 140,
                largura_linha1 = 450,
                largura_linha2 = 450,
                margin_linha1 = 1,
                margin_linha2 = 1
            };

            GenericCommandResult result = new GenericCommandResult(true, "teste", objeto);

            return result;
        }

    }
}
