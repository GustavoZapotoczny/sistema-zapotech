using System.Net;
using System.Text.Json;
using Testcontainers.PostgreSql;
using Testcontainers.Redis;
using Zapotech.Testes.Infra;

namespace Zapotech.Testes.Saude;

/// <summary>
/// Sobe PostgreSQL 16 e Redis reais com Testcontainers (precisa do Docker rodando).
/// </summary>
public class ProntoComBancoRealTestes : IAsyncLifetime
{
    private readonly PostgreSqlContainer _postgres = new PostgreSqlBuilder("postgres:16-alpine").Build();
    private readonly RedisContainer _redis = new RedisBuilder("redis:7-alpine").Build();

    public Task InitializeAsync() => Task.WhenAll(_postgres.StartAsync(), _redis.StartAsync());

    public async Task DisposeAsync()
    {
        await _postgres.DisposeAsync();
        await _redis.DisposeAsync();
    }

    [Fact]
    public async Task Pronto_responde_ok_com_postgres_e_redis_no_ar()
    {
        using var fabrica = new FabricaApi(_postgres.GetConnectionString(), _redis.GetConnectionString());
        using var cliente = fabrica.CreateClient();

        var resposta = await cliente.GetAsync("/saude/pronto");

        Assert.Equal(HttpStatusCode.OK, resposta.StatusCode);
        using var json = JsonDocument.Parse(await resposta.Content.ReadAsStringAsync());
        Assert.Equal("ok", json.RootElement.GetProperty("status").GetString());
        var dependencias = json.RootElement.GetProperty("dependencias");
        Assert.Equal("ok", dependencias.GetProperty("postgres").GetProperty("status").GetString());
        Assert.Equal("ok", dependencias.GetProperty("redis").GetProperty("status").GetString());
    }
}
