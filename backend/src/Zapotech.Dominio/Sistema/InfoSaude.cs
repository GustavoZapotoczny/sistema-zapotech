namespace Zapotech.Dominio.Sistema;

/// <summary>
/// Resposta do endpoint de saúde: diz se a API está no ar, qual versão e em qual ambiente.
/// </summary>
public sealed record InfoSaude(
    string Status,
    string Servico,
    string Versao,
    string Ambiente,
    DateTimeOffset Horario);
