using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Zapotech.Infra;

public static class DependenciasInfra
{
    /// <summary>Etiqueta dos health checks que dizem se a API está pronta para receber tráfego.</summary>
    public const string TagPronto = "pronto";

    /// <summary>
    /// Registra os serviços de infraestrutura. Por enquanto, só os health checks de PostgreSQL e Redis;
    /// cada um só entra se a connection string estiver configurada.
    /// </summary>
    public static IServiceCollection AdicionarInfra(this IServiceCollection servicos, IConfiguration configuracao)
    {
        var healthChecks = servicos.AddHealthChecks();

        var postgres = configuracao.GetConnectionString("Postgres");
        if (!string.IsNullOrWhiteSpace(postgres))
        {
            healthChecks.AddNpgSql(postgres, name: "postgres", tags: [TagPronto], timeout: TimeSpan.FromSeconds(3));
        }

        var redis = configuracao.GetConnectionString("Redis");
        if (!string.IsNullOrWhiteSpace(redis))
        {
            healthChecks.AddRedis(redis, name: "redis", tags: [TagPronto], timeout: TimeSpan.FromSeconds(3));
        }

        return servicos;
    }
}
