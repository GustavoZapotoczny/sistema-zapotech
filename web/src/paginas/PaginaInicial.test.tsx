import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import PaginaInicial from './PaginaInicial'

function renderizar() {
  const cliente = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={cliente}>
      <PaginaInicial />
    </QueryClientProvider>,
  )
}

describe('PaginaInicial', () => {
  it('mostra "API no ar" com versão e ambiente quando /saude responde', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({ status: 'ok', servico: 'zapotech-api', versao: '0.1.0', ambiente: 'Development', horario: '' }),
        { status: 200 },
      ),
    )

    renderizar()

    expect(await screen.findByText(/API no ar · versão 0\.1\.0 · Development/)).toBeInTheDocument()
  })

  it('mostra "API fora do ar" quando a chamada falha', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'))

    renderizar()

    expect(await screen.findByText('API fora do ar')).toBeInTheDocument()
  })
})
