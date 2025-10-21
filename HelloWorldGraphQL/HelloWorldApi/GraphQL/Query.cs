using HelloWorldApi.Data;
using HelloWorldApi.Models;
using HotChocolate.Data;

namespace HelloWorldApi
{
    public class Query
    {
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<User> GetUsers([Service] ApplicationDbContext context)
        {
            return context.Users;
        }

        public User? GetUserById([Service] ApplicationDbContext context, int id)
        {
            return context.Users.FirstOrDefault(u => u.Id == id);
        }
    }
}