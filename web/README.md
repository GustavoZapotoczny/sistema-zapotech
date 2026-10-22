# Painel web (React + Vite)

```bash
npm install
npm run dev          # http://localhost:5173
npm test             # Vitest
npm run build        # gera dist/
npm run orcamento    # pacote inicial <= 250 KB gzip (precisa do build)
npm run lighthouse   # Lighthouse CI no dist/ (precisa do Chrome)
```

Variáveis (arquivo `web/.env.local`): `VITE_API_URL`, `VITE_SENTRY_DSN`, `VITE_AMBIENTE`.
Componentes do shadcn/ui: `npx shadcn@latest add <componente>`.
