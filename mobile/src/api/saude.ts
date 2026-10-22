import { config } from '../config'

export type InfoSaude = {
  status: string
  servico: string
  versao: string
  ambiente: string
  horario: string
}

/** Consulta GET /saude da API. Desiste depois de 5 segundos para nunca prender a tela. */
export async function buscarSaude(): Promise<InfoSaude> {
  const controle = new AbortController()
  const tempo = setTimeout(() => controle.abort(), 5000)
  try {
    const resposta = await fetch(`${config.apiUrl}/saude`, { signal: controle.signal })
    if (!resposta.ok) {
      throw new Error(`API respondeu ${resposta.status}`)
    }
    return (await resposta.json()) as InfoSaude
  } finally {
    clearTimeout(tempo)
  }
}
