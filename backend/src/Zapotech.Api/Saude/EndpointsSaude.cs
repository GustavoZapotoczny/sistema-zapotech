using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Zapotech.Api.Observabilidade;
using Zapotech.Dominio.Sistema;
using Zapotech.Infra;

namespace Zapotech.Api.Saude;

public static class EndpointsSaude
{
    /// <summary>
    /// /saude        → a API está no ar (não toca banco; usado por load balancer e monitor de uptime).
    /// /saude/pronto → a API consegue falar com PostgreSQL e Redis (503 se algum falhar).
    /// </summary>
    public static IEndpointRouteBuilder MapearSaude(this IEndpointRouteBuilder app)
    {
        app.MapGet("/saude", (IHostEnvironment ambiente, IConfiguration config) =>
            Results.Ok(new InfoSaude(
                Status: "ok",
                Servico: config["OTEL_SERVICE_NAME"] ?? ConfiguracaoObservabilidade.NomeServicoPadrao,
                Versao: typeof(EndpointsSaude).Assembly.GetName().Version?.ToString(3) ?? "0.0.0",
                Ambiente: ambiente.EnvironmentName,
                Horario: DateTimeOffset.UtcNow)))
            .WithName("Saude");

        app.MapHealthChecks("/saude/pronto", new HealthCheckOptions
        {
            Predicate = check => check.Tags.Contains(DependenciasInfra.TagPronto),
            ResponseWriter = EscreverRespostaPronto,
        });

        return app;
    }

    private static Task EscreverRespostaPronto(HttpContext contexto, HealthReport relatorio)
    {
        contexto.Response.ContentType = "application/json; charset=utf-8";
        var corpo = new
        {
            status = relatorio.Status == HealthStatus.Healthy ? "ok" : "falha",
            duracaoMs = (int)relatorio.TotalDuration.TotalMilliseconds,
            dependencias = relatorio.Entries.ToDictionary(
                e => e.Key,
                e => new { status = e.Value.Status == HealthStatus.Healthy ? "ok" : "falha", duracaoMs = (int)e.Value.Duration.TotalMilliseconds }),
        };
        return contexto.Response.WriteAsync(JsonSerializer.Serialize(corpo, JsonSerializerOptions.Web));
    }
}
