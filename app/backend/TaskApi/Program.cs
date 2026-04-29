using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Models;

var builder = WebApplication.CreateBuilder(args);

// --- Configuración DB (SQLite)
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    var cs = builder.Configuration.GetConnectionString("Default") ?? "Data Source=task.db";
    opt.UseSqlite(cs);
});

// --- Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --- Health checks
builder.Services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>("db");

// --- CORS (para Angular en dev)
const string CorsPolicy = "frontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins(
                "http://localhost:4200",
                "http://127.0.0.1:4200"
            );
    });
});

var app = builder.Build();

// --- Migraciones automáticas (MVP rápido)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseCors(CorsPolicy);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapHealthChecks("/health");

// --- Endpoints CRUD

// GET /api/tasks
app.MapGet("/api/tasks", async (AppDbContext db) =>
{
    var items = await db.Tasks
        .OrderByDescending(t => t.CreatedAtUtc)
        .ToListAsync();

    return Results.Ok(items);
});

// GET /api/tasks/{id}
app.MapGet("/api/tasks/{id:guid}", async (Guid id, AppDbContext db) =>
{
    var item = await db.Tasks.FindAsync(id);
    return item is null ? Results.NotFound() : Results.Ok(item);
});

// POST /api/tasks
app.MapPost("/api/tasks", async ([FromBody] CreateTaskRequest req, AppDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(req.Title))
        return Results.BadRequest("Title is required.");

    var task = new TaskItem
    {
        Title = req.Title.Trim(),
        Priority = req.Priority is >= 1 and <= 3 ? req.Priority.Value : 2
    };

    db.Tasks.Add(task);
    await db.SaveChangesAsync();

    return Results.Created($"/api/tasks/{task.Id}", task);
});

// PUT /api/tasks/{id}
app.MapPut("/api/tasks/{id:guid}", async (Guid id, [FromBody] UpdateTaskRequest req, AppDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();

    if (req.Title is not null)
    {
        var t = req.Title.Trim();
        if (string.IsNullOrWhiteSpace(t)) return Results.BadRequest("Title cannot be empty.");
        task.Title = t;
    }

    if (req.IsDone is not null) task.IsDone = req.IsDone.Value;
    if (req.Priority is >= 1 and <= 3) task.Priority = req.Priority.Value;

    await db.SaveChangesAsync();
    return Results.Ok(task);
});

// DELETE /api/tasks/{id}
app.MapDelete("/api/tasks/{id:guid}", async (Guid id, AppDbContext db) =>
{
    var task = await db.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();

    db.Tasks.Remove(task);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();

// --- DTOs minimalistas (AL FINAL)
record CreateTaskRequest(string Title, int? Priority);
record UpdateTaskRequest(string? Title, bool? IsDone, int? Priority);
