import { config } from './config'

/**
 * Liga Sentry e Web Vitals sem pesar no carregamento inicial:
 * os dois pacotes só são baixados depois que a tela já apareceu.
 * Sem VITE_SENTRY_DSN, o Sentry nem é baixado.
 */
export function iniciarObservabilidade() {
  const iniciar = () => {
    if (config.sentryDsn) {
      void import('@sentry/react').then((Sentry) => {
        Sentry.init({
          dsn: config.sentryDsn,
          environment: config.ambiente,
          release: `zapotech-web@${config.versao}`,
          // browserTracing mede LCP, INP e CLS reais de cada usuário.
          integrations: [Sentry.browserTracingIntegration()],
          tracesSampleRate: 0.1,
          tracePropagationTargets: [config.apiUrl],
        })
      })
    }

    if (import.meta.env.DEV) {
      void import('web-vitals').then(({ onLCP, onINP, onCLS }) => {
        const registrar = (m: { name: string; value: number; rating: string }) =>
          console.info(`[web-vitals] ${m.name}: ${Math.round(m.value)} (${m.rating})`)
        onLCP(registrar)
        onINP(registrar)
        onCLS(registrar)
      })
    }
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(iniciar, { timeout: 3000 })
  } else {
    setTimeout(iniciar, 1)
  }
}
