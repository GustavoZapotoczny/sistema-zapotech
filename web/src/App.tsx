import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Cada módulo é baixado só quando aberto (code splitting). A página inicial já segue o padrão.
const PaginaInicial = lazy(() => import('./paginas/PaginaInicial'))

const clienteQuery = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1, refetchOnWindowFocus: false } },
})

export default function App() {
  return (
    <QueryClientProvider client={clienteQuery}>
      <main className="min-h-dvh flex flex-col items-center justify-center gap-8 p-6">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Zapotech</h1>
          <p className="text-muted-foreground mt-2">Gestão para oficinas e pequenos negócios</p>
        </header>
        <Suspense fallback={<div className="h-48 w-full max-w-md rounded-xl border animate-pulse" />}>
          <PaginaInicial />
        </Suspense>
      </main>
    </QueryClientProvider>
  )
}
