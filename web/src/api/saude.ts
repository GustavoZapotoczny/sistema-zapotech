import { config } from '@/config'

export type InfoSaude = {
  status: string
  servico: string
  versao: string
  ambiente: string
  horario: string
}

/** Consulta GET /saude da API. Desiste depois de 5 segundos para nunca prender a tela. */
export async function buscarSaude(sinal?: AbortSignal): Promise<InfoSaude> {
  const tempoLimite = AbortSignal.timeout(5000)
  const resposta = await fetch(`${config.apiUrl}/saude`, {
    signal: sinal ? AbortSignal.any([sinal, tempoLimite]) : tempoLimite,
  })
  if (!resposta.ok) {
    throw new Error(`API respondeu ${resposta.status}`)
  }
  return (await resposta.json()) as InfoSaude
}
