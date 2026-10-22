# Zapotech: ERP em nuvem + app

ERP para pequenos negócios, começando por oficinas mecânicas (carros e caminhões).
Regras do projeto em [`CLAUDE.md`](CLAUDE.md); análise e plano em [`docs/`](docs/).

| Pasta | O que é |
| --- | --- |
| `backend/` | API ASP.NET Core (.NET 10): projetos `Api`, `Dominio`, `Infra` e `Testes` |
| `web/` | Painel React + Vite + TypeScript + Tailwind + shadcn/ui |
| `mobile/` | App React Native com Expo |
| `agente-local/` | Agente .NET para impressora, gaveta e balança (futuro) |
| `infra/` | docker-compose (PostgreSQL 16 + Redis 7), scripts, k6 |
| `docs/` | Documentos do projeto |

---

## Como rodar tudo no Windows

### 1. Instalar as ferramentas (uma vez só)

Abra o **PowerShell** e rode:

```powershell
winget install Microsoft.DotNet.SDK.10
winget install OpenJS.NodeJS.LTS
winget install Docker.DockerDesktop
winget install Git.Git
```

Depois:

1. **Reinicie o computador** (o Docker Desktop precisa do WSL 2; se ele pedir, aceite instalar).
2. Abra o **Docker Desktop** e espere aparecer "Engine running".
3. Abra um PowerShell novo e confira:

```powershell
dotnet --version   # 10.x
node --version     # v22 ou mais novo
docker --version
```

Editor recomendado: **Visual Studio 2022 (17.14+)** ou **VS Code** com a extensão C# Dev Kit.
A solução usa o formato novo `Zapotech.slnx`.

### 2. Baixar o código

```powershell
git clone https://github.com/GustavoZapotoczny/sistema-zapotech.git
cd sistema-zapotech
```

### 3. Subir o banco e o Redis

```powershell
docker compose -f infra/docker-compose.yml up -d --wait
```

Isso cria PostgreSQL 16 em `localhost:5432` (banco, usuário e senha: `zapotech`) e Redis em `localhost:6379`.
Os dados ficam guardados entre reinícios. Para apagar tudo e começar do zero:
`docker compose -f infra/docker-compose.yml down -v`.

### 4. Rodar a API (terminal 1)

```powershell
cd backend
dotnet run --project src/Zapotech.Api
```

Teste no navegador:

- http://localhost:5080/saude → `{"status":"ok", ...}` (API no ar)
- http://localhost:5080/saude/pronto → status do PostgreSQL e do Redis (503 se algum estiver fora)

### 5. Rodar o painel web (terminal 2)

```powershell
cd web
npm install
npm run dev
```

Abra http://localhost:5173. Com a API rodando aparece **"API no ar"** com bolinha verde.

### 6. Rodar o app no celular (terminal 3)

1. Instale o app **Expo Go** no celular (Play Store / App Store).
2. Descubra o IP do PC: `ipconfig` → "Endereço IPv4" (ex.: `192.168.0.10`).
3. Crie o arquivo `mobile\.env.local` com:
   ```
   EXPO_PUBLIC_API_URL=http://192.168.0.10:5080
   ```
4. Rode a API aceitando conexões da rede (no lugar do passo 4):
   ```powershell
   cd backend
   dotnet run --project src/Zapotech.Api --urls http://0.0.0.0:5080
   ```
   Se o Windows perguntar, **permita** o acesso no Firewall para redes privadas.
5. Rode o app:
   ```powershell
   cd mobile
   npm install
   npx expo start
   ```
6. Leia o QR Code com o Expo Go (Android) ou com a câmera (iPhone). PC e celular precisam estar no mesmo Wi-Fi.

---

## Testes

| Onde | Comando | Observação |
| --- | --- | --- |
| Backend | `cd backend; dotnet test` | O teste com banco real usa Testcontainers: precisa do Docker Desktop aberto |
| Web | `cd web; npm test` | Vitest |
| Web | `npm run build; npm run orcamento` | Falha se o pacote inicial passar de 250 KB gzip |
| Web | `npm run lighthouse` | Lighthouse simulando celular em 4G lento (precisa do Chrome instalado e do build) |
| Mobile | `cd mobile; npm test` | jest-expo |

O GitHub Actions (`.github/workflows/ci.yml`) roda tudo isso a cada commit e bloqueia se algo falhar.

---

## Variáveis de ambiente

Lista completa em [`.env.example`](.env.example). **Segredos nunca vão para o código.**

| Variável | Para quê | Vazia = |
| --- | --- | --- |
| `ASPNETCORE_ENVIRONMENT` | `Development`, `Homologacao` ou `Producao` | `Production` |
| `ConnectionStrings__Postgres` / `ConnectionStrings__Redis` | Conexões (em dev já vêm do `appsettings.Development.json`) | checagem desligada |
| `SENTRY_DSN` | Erros e desempenho da API no Sentry | Sentry desligado |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Envia traces e métricas para o coletor OpenTelemetry (ex.: Grafana) | não exporta |
| `VITE_API_URL` | Endereço da API para o painel web | `http://localhost:5080` |
| `VITE_SENTRY_DSN` | Sentry do painel web (mede INP e LCP reais) | desligado |
| `EXPO_PUBLIC_API_URL` | Endereço da API para o app | `http://localhost:5080` |

No PowerShell, para definir uma variável só no terminal atual:

```powershell
$env:SENTRY_DSN = "https://...ingest.sentry.io/..."
dotnet run --project src/Zapotech.Api
```

Para o web, crie `web\.env.local` (já ignorado pelo git) com as variáveis `VITE_*`.

---

## Ambientes

| Ambiente | `ASPNETCORE_ENVIRONMENT` | Configuração |
| --- | --- | --- |
| Desenvolvimento | `Development` | `appsettings.Development.json` + docker-compose |
| Homologação | `Homologacao` | `appsettings.Homologacao.json` + variáveis do servidor |
| Produção | `Producao` | `appsettings.Producao.json` + variáveis do servidor |

O deploy de homologação e produção entra quando a nuvem for escolhida (plano-de-acao.md, seção 2).
A imagem Docker da API (`backend/Dockerfile`) já sobe como `Producao` por padrão.

---

## Problemas comuns no Windows

- **`docker: error during connect`**: o Docker Desktop não está aberto.
- **Porta 5432 ocupada**: já existe um PostgreSQL instalado no Windows. Pare o serviço
  (`services.msc` → postgresql → Parar) ou troque a porta no `docker-compose.yml` para `"5433:5432"`
  e na connection string.
- **`npm` bloqueado por política de execução no PowerShell**:
  `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- **App no celular mostra "API fora do ar"**: confira o IP no `.env.local`, se a API foi iniciada com
  `--urls http://0.0.0.0:5080` e se o Firewall do Windows liberou a porta 5080.
