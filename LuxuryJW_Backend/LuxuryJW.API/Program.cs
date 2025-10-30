using System.Text;
using AutoMapper;
using FluentValidation;
using LuxuryJW.API.Middlewares;
using LuxuryJW.Application.Helpers;
using LuxuryJW.Application.Mapping;
using LuxuryJW.Application.Services;
using LuxuryJW.Core.Interfaces;
using LuxuryJW.Core.Settings;
using LuxuryJW.Infrastructure.Data;
using LuxuryJW.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Serilog
builder.Host.UseSerilog((context, config) =>
{
    config.ReadFrom.Configuration(context.Configuration);
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS for React
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactCors", p =>
        p.AllowAnyOrigin()
         .AllowAnyHeader()
         .AllowAnyMethod());
});

// Options & Mongo
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<IMongoClient>(_ => new MongoClient(builder.Configuration["MongoDB:ConnectionString"]));
builder.Services.AddSingleton<MongoDBContext>();

// Repos & Services
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IBidRepository, BidRepository>();
builder.Services.AddScoped<IBidService, BidService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddSingleton<JwtTokenGenerator>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<MappingProfile>();

// JWT
var key = builder.Configuration["Jwt:Key"]!;
var issuer = builder.Configuration["Jwt:Issuer"];
var audience = builder.Configuration["Jwt:Audience"];
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
    };
});

// Middleware
builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.UseCors("ReactCors");
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<ExceptionMiddleware>();

app.MapControllers();

// Ensure email unique index and create admin user
using (var scope = app.Services.CreateScope())
{
    var repo = scope.ServiceProvider.GetRequiredService<IUserRepository>();
    var userService = scope.ServiceProvider.GetRequiredService<IUserService>();
    var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();
    
    await repo.CreateEmailUniqueIndexAsync();
    
    // Create admin user if it doesn't exist
    var adminEmail = "admin@luxuryjewelry.com";
    var adminPassword = "LuxuryAdmin2024!";
    
    try
    {
        var existingAdmin = await repo.GetByEmailAsync(adminEmail);
        if (existingAdmin == null)
        {
            var adminUser = new LuxuryJW.Core.Models.User
            {
                FullName = "System Administrator",
                Email = adminEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(adminPassword),
                Role = "Admin",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            await repo.CreateAsync(adminUser);
            Console.WriteLine($"✅ Admin user created successfully!");
            Console.WriteLine($"📧 Email: {adminEmail}");
            Console.WriteLine($"🔑 Password: {adminPassword}");
        }
        else
        {
            Console.WriteLine($"✅ Admin user already exists!");
            Console.WriteLine($"📧 Email: {adminEmail}");
            Console.WriteLine($"🔑 Password: {adminPassword}");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ Failed to create admin user: {ex.Message}");
    }
}

app.Run();
