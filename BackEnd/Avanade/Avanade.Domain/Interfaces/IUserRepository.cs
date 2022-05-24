using Avanade.Domain.Entities;
using System;
using System.Collections.Generic;

namespace Avanade.Domain.Interfaces
{
    public interface IUserRepository
    {
        // Commands:

        /// <summary>
        /// register a new user 
        /// </summary>
        /// <param name="user"> user data </param>
        void Add(User user);

        /// <summary>
        /// change user data
        /// </summary>
        /// <param name="user"> user data </param>
        void Update(User user);

        /// <summary>
        /// delete user by id
        /// </summary>
        /// <param name="id"> user id that will be deleted </param>
        void Delete(Guid id);



        // Queries:

        /// <summary>
        /// list all users
        /// </summary>
        /// <returns> users who have already been registered </returns>
        IEnumerable<User> List();

        /// <summary>
        /// search for a user by their id
        /// </summary>
        /// <param name="id"> user id </param>
        /// <returns> a corresponding user </returns>
        User SearchById(Guid id);

        /// <summary>
        /// search for a user by their email
        /// </summary>
        /// <param name="email"> user email </param>
        /// <returns> a corresponding user </returns>
        User SearchByEmail(string email);
    }
}
