using Avanade.Domain.Commands.Temperatures;
using Avanade.Domain.Handlers.Temperatures;
using Avanade.Domain.Queries.Temperaturas;
using Avanade.Shared.Commands;
using Avanade.Shared.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Avanade.Api.Controllers
{
    [Produces("application/json")]

    [Route("v1/temperature")]
    [ApiController]
    public class TemperaturesController : ControllerBase
    {
        [HttpPost("Create")]
        public GenericCommandResult Create(CreateTemperatureCommand command, [FromServices] CreateTemperatureHandle handle)
        {
            return (GenericCommandResult)handle.Handler(command);
        }

        [Route("readAll")]
        [HttpGet]
        public GenericQueryResult GetAll([FromServices] ReadTemperaturesHandle handle)
        {
            ReadTemperaturesQuery query = new ReadTemperaturesQuery();

            return (GenericQueryResult)handle.Handler(query);
        }

    }
}
