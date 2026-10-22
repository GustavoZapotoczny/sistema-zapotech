using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Zapotech.Testes.Infra;

/// <summary>
/// Sobe a API em memória no ambiente "Testes", com as connection strings informadas.
/// String vazia = dependência não configurada (o health check dela não é registrado).
/// </summary>
public sealed class FabricaApi(string postgres = "", string redis = "") : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testes");
        builder.UseSetting("ConnectionStrings:Postgres", postgres);
        builder.UseSetting("ConnectionStrings:Redis", redis);
        builder.UseSetting("SENTRY_DSN", "");
        builder.UseSetting("OTEL_EXPORTER_OTLP_ENDPOINT", "");
    }
}
