/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_AMBIENTE?: string
  readonly VITE_VERSAO?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
