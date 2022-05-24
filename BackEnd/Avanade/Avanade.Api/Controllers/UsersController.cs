using Avanade.Domain.Commands.Users;
using Avanade.Domain.Handlers.Users;
using Avanade.Domain.Queries.Users;
using Avanade.Shared.Commands;
using Avanade.Shared.Queries;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Avanade.Api.Controllers
{
    [Produces("application/json")]
    [Route("v1/account")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        // Commands:

        // register a new user
        [Route("signup")]
        [HttpPost]
        public GenericCommandResult SignUp(CreateAccountCommand command, [FromServices] CreateAccountHandle handle)
        {
            return (GenericCommandResult)handle.Handler(command);
        }

        // update a user
        [Route("update")]
        [HttpPatch]
        public GenericCommandResult Update(UpdateAccountCommand command, [FromServices] UpdateAccountHandle handle)
        {
            return (GenericCommandResult)handle.Handler(command);
        }

        // delete a user
        [Route("delete")]
        [HttpDelete]
        public GenericCommandResult Delete(DeleteAccountCommand command, [FromServices] DeleteAccountHandle handle)
        {
            return (GenericCommandResult)handle.Handler(command);
        }



        // Queries:

        // list all users
        [Route("list")]
        [HttpGet]
        public GenericQueryResult List([FromServices] ListAccountHandle handle)
        {
            ListAccountQuery query = new ListAccountQuery();

            return (GenericQueryResult)handle.Handler(query);
        }

        // search user by email
        [Route("searchEmail/{email}")]
        [HttpGet]
        public GenericQueryResult SearchByEmail(string email, [FromServices] SearchByEmailHandle handle)
        {

            var query = new SearchByEmailQuery
            {
                Email = email
            };

            return (GenericQueryResult)handle.Handler(query);
        }

        // search user by id
        [Route("searchId/{id}")]
        [HttpGet]
        public GenericQueryResult SearchById(Guid id, [FromServices] SearchByIdHandle handle)
        {
            var query = new SearchByIdQuery
            {
                Id = id
            };

            return (GenericQueryResult)handle.Handler(query);
        }

    }
}
