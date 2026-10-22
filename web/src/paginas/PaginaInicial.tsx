import { useQuery } from '@tanstack/react-query'
import { buscarSaude } from '@/api/saude'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PaginaInicial() {
  const saude = useQuery({
    queryKey: ['saude'],
    queryFn: ({ signal }) => buscarSaude(signal),
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Status do sistema</CardTitle>
        <CardDescription>Conexão do painel com a API</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-2" role="status" aria-live="polite">
          <span
            aria-hidden
            className={
              'size-2.5 rounded-full ' +
              (saude.isPending ? 'bg-muted-foreground animate-pulse' : saude.isSuccess ? 'bg-sucesso' : 'bg-destructive')
            }
          />
          {saude.isPending && <span>Verificando a API…</span>}
          {saude.isSuccess && (
            <span>
              API no ar · versão {saude.data.versao} · {saude.data.ambiente}
            </span>
          )}
          {saude.isError && <span>API fora do ar</span>}
        </div>
        <Button variant="outline" onClick={() => void saude.refetch()} disabled={saude.isFetching}>
          Verificar de novo
        </Button>
      </CardContent>
    </Card>
  )
}
