# Projeto: ERP Multi-segmento (Zapotech)

ERP em nuvem + app para pequenos negócios, começando por oficinas mecânicas
(carros e caminhões) e depois comércio/PDV, restaurante, ótica, pet shop e
prestadores de serviço. Objetivo: ser melhor que o HyperSistemas.

Documentos de referência (anexos): `analise-hyper.md` e `plano-de-acao.md`.
Em caso de dúvida, eles são a fonte da verdade.

## Idioma
- Código, nomes de tabelas e variáveis: português sem acento (ex.: `ordem_servico`, `cliente`).
- Comentários, commits e respostas: português do Brasil.

## Stack obrigatória
- Backend: ASP.NET Core (.NET 8+), C#, EF Core + Dapper (relatórios), FluentValidation, SignalR, Hangfire + Redis, Serilog, OpenTelemetry.
- Banco: PostgreSQL 16+ com Row Level Security e pg_trgm.
- Web: React + TypeScript + Vite, TanStack Query, TanStack Table + Virtual, React Hook Form + Zod, Tailwind + shadcn/ui, Zustand, Dexie (IndexedDB), vite-plugin-pwa.
- App: React Native com Expo, expo-sqlite, react-native-mmkv, FlashList, Reanimated.
- Testes: xUnit + Testcontainers, Vitest + Playwright, Maestro, k6.
- Infra: Docker, GitHub Actions, Sentry.

## Estrutura do repositório (monorepo)
```
/backend      API ASP.NET Core (solução .sln, projetos Api, Dominio, Infra, Testes)
/web          Painel React
/mobile       App Expo
/agente-local Agente .NET para impressora, gaveta e balança
/infra        docker-compose, scripts, k6
/docs         Documentos do projeto
```

## Regras de dados
- Multi-tenant: toda tabela (exceto `empresa`) tem `empresa_id`, `criado_em`, `atualizado_em`, `excluido_em`.
- RLS no PostgreSQL como segunda trava; teste automático de isolamento entre empresas.
- Dinheiro sempre em centavos (inteiro/long). Nunca float/double.
- Exclusão lógica; nunca apagar registro de negócio.
- Preço e custo copiados para o item no momento da venda/OS.
- Numeração de OS, venda e nota por empresa, sem buracos, com trava na transação.

## Regras de fluidez (não negociáveis)
- Interface otimista: a tela responde na hora; o servidor confirma depois.
- Dados locais primeiro (IndexedDB/SQLite) para cadastros, busca e PDV.
- Nota fiscal, WhatsApp, PDF, importação e relatórios pesados sempre em fila (Hangfire), com status ao vivo via SignalR.
- Listas sempre virtualizadas; paginação por cursor; toda busca com índice.
- Code splitting por módulo; pacote inicial do web até 250 KB compactado.
- Metas: INP < 200 ms, LCP < 2,5 s no 4G, API p95 < 300 ms, busca < 150 ms com 100 mil cadastros.

## Integrações externas
- Fiscal: API terceirizada (Focus NFe, PlugNotas, NFE.io ou Nuvem Fiscal) atrás de uma interface `IProvedorFiscal`, para poder trocar.
- Pix/boleto: atrás de `IProvedorPagamento`.
- WhatsApp: só API oficial (WhatsApp Cloud API), atrás de `IProvedorMensagem`.
- Dados públicos: BrasilAPI (CNPJ, CEP), tabela FIPE.
- Segredos sempre em variáveis de ambiente; nunca no código.

## Forma de trabalhar
- Trabalhar sprint por sprint conforme `plano-de-acao.md`, seção 3 em diante.
- Antes de codar uma sprint, listar as tarefas e confirmar comigo.
- Cada funcionalidade com testes. Não marcar como pronto com teste falhando.
- Commits pequenos e descritivos em português.
- Ao terminar uma sprint, resumir o que foi feito, o que falta e como testar.
