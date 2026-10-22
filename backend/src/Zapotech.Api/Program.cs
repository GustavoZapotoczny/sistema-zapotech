using Serilog;
using Zapotech.Api.Observabilidade;
using Zapotech.Api.Saude;
using Zapotech.Infra;

// Logger provisório: registra erros que aconteçam antes do host subir.
Log.Logger = new LoggerConfiguration().WriteTo.Console().CreateLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.AdicionarObservabilidade();
    builder.Services.AdicionarInfra(builder.Configuration);

    // CORS: origens liberadas vêm da configuração (Cors:Origens), por ambiente.
    var origens = builder.Configuration.GetSection("Cors:Origens").Get<string[]>() ?? [];
    builder.Services.AddCors(o => o.AddDefaultPolicy(p => p.WithOrigins(origens).AllowAnyHeader().AllowAnyMethod()));

    var app = builder.Build();

    app.UseSerilogRequestLogging();
    app.UseCors();
    app.MapearSaude();

    app.Run();
}
catch (Exception ex) when (ex is not HostAbortedException)
{
    Log.Fatal(ex, "A API parou de forma inesperada");
    throw;
}
finally
{
    Log.CloseAndFlush();
}

// Necessário para os testes de integração (WebApplicationFactory<Program>).
public partial class Program;
