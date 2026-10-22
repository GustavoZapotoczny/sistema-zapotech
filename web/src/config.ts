// Configuração lida das variáveis VITE_* no momento do build.
// Tudo aqui vai para o navegador: nunca coloque segredos.
export const config = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:5080',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN ?? '',
  ambiente: import.meta.env.VITE_AMBIENTE ?? 'desenvolvimento',
  versao: import.meta.env.VITE_VERSAO ?? '0.1.0',
}
