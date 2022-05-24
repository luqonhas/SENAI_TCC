using Avanade.Domain.Entities;
using Avanade.Domain.Interfaces;
using Avanade.Infra.Data.Contexts;
using Avanade.Shared.Models;
using Avanade.Shared.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Avanade.Infra.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AvanadeContext _ctx;

        public UserRepository(AvanadeContext ctx)
        {
            _ctx = ctx;
        }


        // Commands:

        public void Add(User user)
        {
            _ctx.Users.Add(user);
            _ctx.SaveChanges();
        }

        public void Update(User user)
        {
            _ctx.Entry(user).State = EntityState.Modified;
            _ctx.SaveChanges();
        }

        public void Delete(Guid id)
        {
            _ctx.Users.Remove(SearchById(id));
            _ctx.SaveChanges();
        }



        // Queries:

        public IEnumerable<User> List()
        {
            return _ctx.Users
                .AsNoTracking()
                .ToList();
        }

        public User SearchById(Guid id)
        {
            return _ctx.Users.FirstOrDefault(x => x.Id == id);
        }

        public User SearchByEmail(string email)
        {
            return _ctx.Users.FirstOrDefault(x => x.Email == email);
        }

    }
}
