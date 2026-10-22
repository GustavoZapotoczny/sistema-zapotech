import { render, screen } from '@testing-library/react-native'
import TelaInicial from './TelaInicial'

describe('TelaInicial', () => {
  afterEach(() => jest.restoreAllMocks())

  it('mostra "API no ar" quando /saude responde', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'ok', servico: 'zapotech-api', versao: '0.1.0', ambiente: 'Development', horario: '' }),
    } as Response)

    await render(<TelaInicial />)

    expect(await screen.findByText('API no ar · versão 0.1.0 · Development')).toBeOnTheScreen()
  })

  it('mostra "API fora do ar" quando a chamada falha', async () => {
    jest.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Network request failed'))

    await render(<TelaInicial />)

    expect(await screen.findByText('API fora do ar')).toBeOnTheScreen()
  })
})
