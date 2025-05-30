using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.OpenApi.Models;
using Database.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=database.db"));

builder.Services.AddControllers();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Fitness",
        Description = "Your fitness",
    });
    c.SwaggerDoc("v2", new OpenApiInfo
    {
        Title = "Gestione Account",
    });
});

string MyAllowSpecificOrigins = "AllowFrontend";

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Fitness");
        c.SwaggerEndpoint("/swagger/v2/swagger.json", "Gestione Account");
    });
}


app.UseCors(MyAllowSpecificOrigins);

app.UseCors("AllowFrontend");

// Endpoint Esercizi (fitness)
app.MapGet("/Esercizi", async (AppDbContext db) => await db.Esercizi.ToListAsync())
    .WithTags("Fitness");

app.MapGet("/Esercizio/{id}", async (AppDbContext db, int id) => await db.Esercizi.FindAsync(id))
    .WithTags("Fitness");

app.MapPost("/Esercizio/post", async (AppDbContext db, Esercizio esercizio) =>
{
    await db.Esercizi.AddAsync(esercizio);
    await db.SaveChangesAsync();
    return Results.Created($"/api/fitness/Esercizio/{esercizio.Id}", esercizio);
}).WithTags("Fitness");


app.MapPut("/Esercizio/put/{id}", async (AppDbContext db, Esercizio update, int id) =>

{
    var change = await db.Esercizi.FindAsync(id);
    if (change is null) return Results.NotFound();
    change.Name = update.Name;
    change.Muscle = update.Muscle;
    change.Serie = update.Serie;
    change.Reps = update.Reps;
    change.Description = update.Description;
    await db.SaveChangesAsync();
    return Results.NoContent();
}).WithTags("Fitness");

app.MapDelete("/Esercizio/delete/{id}", async (AppDbContext db, int id) =>
{
    var trash = await db.Esercizi.FindAsync(id);
    if (trash is null) return Results.NotFound();
    db.Esercizi.Remove(trash);
    await db.SaveChangesAsync();
    return Results.Ok();
}).WithTags("Fitness");



// Endpoint Account
app.MapGet("/Accounts", async (AppDbContext db) => await db.Accounts.ToListAsync())
    .WithTags("Account");

app.MapGet("/Account/{id}", async (AppDbContext db, int id) => await db.Accounts.FindAsync(id))
    .WithTags("Account");

app.MapGet("/Account/username/{username}", async (AppDbContext db, string username) =>
{
    var account = await db.Accounts.FirstOrDefaultAsync(a => a.Username == username);
    return account is not null ? Results.Ok(account) : Results.NotFound();
}).WithTags("Account");

app.MapPost("/Account/post", async (AppDbContext db, Account account) =>
{
    await db.Accounts.AddAsync(account);
    await db.SaveChangesAsync();
    return Results.Created($"/api/account/{account.Id}", account);
}).WithTags("Account");

app.MapPut("/Account/put/{id}", async (AppDbContext db, Account update, int id) =>
{
    var account = await db.Accounts.FindAsync(id);
    if (account is null) return Results.NotFound();
    account.Username = update.Username;
    account.PasswordHash = update.PasswordHash;
    account.Role = update.Role;
    account.Workout = update.Workout;
    await db.SaveChangesAsync();
    return Results.NoContent();
}).WithTags("Account");

app.MapPut("/Account/put/Workout/{id}", async (AppDbContext db, Account update, int id) =>
{
    var account = await db.Accounts.FindAsync(id);
    if (account is null) return Results.NotFound();
    account.Workout = update.Workout;
    await db.SaveChangesAsync();
    return Results.NoContent();
}).WithTags("Account");

app.MapDelete("/Account/delete/{id}", async (AppDbContext db, int id) =>

{
    var trash = await db.Accounts.FindAsync(id);
    if (trash is null) return Results.NotFound();
    db.Accounts.Remove(trash);
    await db.SaveChangesAsync();
    return Results.Ok();
}).WithTags("Account");

app.MapControllers();

app.Run();