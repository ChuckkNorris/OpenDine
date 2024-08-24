using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Logging;
using OpenDine.Api.Application.Authorization;
using OpenDine.Api.Modules.Common.Entities;
using OpenDine.Api.Modules.Common.Services;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddMicrosoftIdentityWebApi(options =>
        {
            options.RequireHttpsMetadata = true;
            options.UseSecurityTokenValidators = true;
            builder.Configuration.Bind("AzureAd", options);
            options.TokenValidationParameters.NameClaimType = "name";
            options.TokenValidationParameters.ValidateIssuerSigningKey = true;

        }, options => builder.Configuration.Bind("AzureAd", options));
// builder.Services.AddAuthorization();
builder.Services.AddAuthorization(config =>
{
    config.AddPolicy(OpenDineRoles.RestaurantOwner, policyBuilder =>
        policyBuilder.Requirements.Add(new ScopeAuthorizationRequirement(["RestaurantOwner"]))); // { RequiredScopesConfigurationKey = $"AzureAd:Scopes" }));
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
    {
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddControllers();
builder.Services.AddApplicationServices();
builder.Services.AddSqlServer<OpenDineContext>(builder.Configuration.GetConnectionString("OpendineDb"));
builder.Services.AddHttpContextAccessor();
var app = builder.Build();

// TODO: Define explicit list of allowed origins
app.UseCors(opts => opts.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
app.UseSwaggerUI();
// }
// app.UseAuthentication();

// app.UseHttpsRedirection();
app.MapControllers();
app.UseAuthorization();
//var summaries = new[]
//{
//    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
//};

//app.MapGet("/weatherforecast", () =>
//{
//    var forecast =  Enumerable.Range(1, 5).Select(index =>
//        new WeatherForecast
//        (
//            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//            Random.Shared.Next(-20, 55),
//            summaries[Random.Shared.Next(summaries.Length)]
//        ))
//        .ToArray();
//    return forecast;
//})
//.WithName("GetWeatherForecast")
//.WithOpenApi();

app.Run();

public record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
