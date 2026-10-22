using OpenTelemetry;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Serilog;
using Serilog.Formatting.Compact;

namespace Zapotech.Api.Observabilidade;

/// <summary>
/// Liga Serilog, OpenTelemetry e Sentry. Tudo é controlado por variável de ambiente:
/// sem SENTRY_DSN o Sentry fica desligado; sem OTEL_EXPORTER_OTLP_ENDPOINT nada é exportado.
/// </summary>
public static class ConfiguracaoObservabilidade
{
    public const string NomeServicoPadrao = "zapotech-api";

    public static WebApplicationBuilder AdicionarObservabilidade(this WebApplicationBuilder builder)
    {
        var config = builder.Configuration;
        var nomeServico = config["OTEL_SERVICE_NAME"] ?? NomeServicoPadrao;
        var versao = typeof(ConfiguracaoObservabilidade).Assembly.GetName().Version?.ToString(3) ?? "0.0.0";

        // Serilog: log estruturado em JSON no console (fácil de coletar em qualquer nuvem).
        builder.Services.AddSerilog((servicos, log) => log
            .ReadFrom.Configuration(config)
            .ReadFrom.Services(servicos)
            .Enrich.FromLogContext()
            .Enrich.WithProperty("servico", nomeServico)
            .Enrich.WithProperty("ambiente", builder.Environment.EnvironmentName)
            .WriteTo.Console(new RenderedCompactJsonFormatter()));

        // OpenTelemetry: traces e métricas da API, HTTP de saída e runtime .NET.
        var otel = builder.Services.AddOpenTelemetry()
            .ConfigureResource(r => r
                .AddService(nomeServico, serviceVersion: versao)
                .AddAttributes([new("deployment.environment", builder.Environment.EnvironmentName)]))
            .WithTracing(t => t
                .AddAspNetCoreInstrumentation(o => o.Filter = ctx => !ctx.Request.Path.StartsWithSegments("/saude"))
                .AddHttpClientInstrumentation())
            .WithMetrics(m => m
                .AddAspNetCoreInstrumentation()
                .AddHttpClientInstrumentation()
                .AddRuntimeInstrumentation());

        if (!string.IsNullOrWhiteSpace(config["OTEL_EXPORTER_OTLP_ENDPOINT"]))
        {
            // O exportador lê endpoint, protocolo e cabeçalhos das variáveis OTEL_EXPORTER_OTLP_*.
            otel.UseOtlpExporter();
        }

        // Sentry: erros e desempenho reais. Só liga com DSN.
        var sentryDsn = config["SENTRY_DSN"];
        if (!string.IsNullOrWhiteSpace(sentryDsn))
        {
            builder.WebHost.UseSentry(o =>
            {
                o.Dsn = sentryDsn;
                o.Environment = builder.Environment.EnvironmentName;
                o.Release = $"{nomeServico}@{versao}";
                o.TracesSampleRate = double.TryParse(config["SENTRY_TRACES_SAMPLE_RATE"],
                    System.Globalization.CultureInfo.InvariantCulture, out var taxa) ? taxa : 0.1;
                o.SendDefaultPii = false;
            });
        }

        return builder;
    }
}
