using System.Diagnostics;
using System.Net;
using System.Net.Http.Json;
using Zapotech.Dominio.Sistema;
using Zapotech.Testes.Infra;

namespace Zapotech.Testes.Saude;

public class SaudeTestes
{
    [Fact]
    public async Task Saude_responde_ok_com_versao_e_ambiente()
    {
        using var fabrica = new FabricaApi();
        using var cliente = fabrica.CreateClient();

        var resposta = await cliente.GetAsync("/saude");

        Assert.Equal(HttpStatusCode.OK, resposta.StatusCode);
        var corpo = await resposta.Content.ReadFromJsonAsync<InfoSaude>();
        Assert.NotNull(corpo);
        Assert.Equal("ok", corpo.Status);
        Assert.Equal("Testes", corpo.Ambiente);
        Assert.Equal("zapotech-api", corpo.Servico);
        Assert.Matches(@"^\d+\.\d+\.\d+$", corpo.Versao);
    }

    [Fact]
    public async Task Saude_responde_abaixo_de_300ms()
    {
        using var fabrica = new FabricaApi();
        using var cliente = fabrica.CreateClient();
        await cliente.GetAsync("/saude"); // aquecimento

        var cronometro = Stopwatch.StartNew();
        var resposta = await cliente.GetAsync("/saude");
        cronometro.Stop();

        Assert.Equal(HttpStatusCode.OK, resposta.StatusCode);
        Assert.True(cronometro.ElapsedMilliseconds < 300, $"Levou {cronometro.ElapsedMilliseconds} ms");
    }

    [Fact]
    public async Task Pronto_retorna_503_quando_postgres_esta_fora()
    {
        // Porta 1 não tem ninguém escutando: simula banco fora do ar.
        using var fabrica = new FabricaApi(postgres: "Host=127.0.0.1;Port=1;Database=x;Username=x;Password=x;Timeout=1");
        using var cliente = fabrica.CreateClient();

        var resposta = await cliente.GetAsync("/saude/pronto");

        Assert.Equal(HttpStatusCode.ServiceUnavailable, resposta.StatusCode);
        Assert.Contains("\"postgres\"", await resposta.Content.ReadAsStringAsync());
    }
}
