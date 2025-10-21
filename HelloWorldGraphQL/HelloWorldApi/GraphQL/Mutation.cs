using HelloWorldApi.Data;
using HelloWorldApi.Models;

namespace HelloWorldApi
{
    public class Mutation
    {
        public async Task<User> AddUser([Service] ApplicationDbContext context, string firstName, string lastName, string email)
        {
            var user = new User
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                CreatedAt = DateTime.UtcNow
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return user;
        }

        public async Task<User?> UpdateUser([Service] ApplicationDbContext context, int id, string? firstName, string? lastName, string? email)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null) return null;

            if (!string.IsNullOrEmpty(firstName)) user.FirstName = firstName;
            if (!string.IsNullOrEmpty(lastName)) user.LastName = lastName;
            if (!string.IsNullOrEmpty(email)) user.Email = email;

            await context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteUser([Service] ApplicationDbContext context, int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null) return false;

            context.Users.Remove(user);
            await context.SaveChangesAsync();
            return true;
        }
    }
}