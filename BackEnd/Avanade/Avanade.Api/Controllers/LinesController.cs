using Avanade.Domain.Commands.Lines;
using Avanade.Domain.Handlers.Lines;
using Avanade.Domain.Queries.Lines;
using Avanade.Shared.Commands;
using Avanade.Shared.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Avanade.Api.Controllers
{
    [Produces("application/json")]

    [Route("v1/lines")]
    [ApiController]
    public class LinesController : ControllerBase
    {
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public GenericQueryResult GetAll([FromServices] ReadLinesHandle handle)
        {
            ReadLinesQuery query = new ReadLinesQuery();
                
            return (GenericQueryResult)handle.Handler(query);
        }


        [HttpPatch("update/{id}")]
        public GenericCommandResult Update(Guid id, EditLinePositionCommand command, [FromServices] EditLinePositionHandle handle)
        {
            command.AdicionarId(id);

            return (GenericCommandResult)handle.Handler(command);
        }
    }
}
