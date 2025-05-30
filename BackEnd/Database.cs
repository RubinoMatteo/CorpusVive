using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;

namespace Database.Models
{
    public class Esercizio
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Muscle { get; set; }
        public int Serie { get; set; }
        public int? Reps { get; set; }
        public string? Description{get; set;}

    }

    public class Account
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? PasswordHash { get; set; }
        public string? Role { get; set; }
        public string? Workout { get; set;}
    }

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Esercizio> Esercizi { get; set; } = null!;
        public DbSet<Account> Accounts { get; set; } = null!;
    }
}
