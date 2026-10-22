// Lighthouse CI: roda no build de produção (dist/) simulando celular com 4G lento,
// que é o padrão do Lighthouse para mobile. Metas do plano-de-acao.md, seção 1.
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 3,
      settings: {
        formFactor: 'mobile',
        throttlingMethod: 'simulate',
        chromeFlags: '--no-sandbox --headless=new',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        // INP só existe com usuário real; no laboratório o substituto é o Total Blocking Time.
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
    // Relatórios ficam em arquivo (viram artefato no GitHub Actions), sem publicar na internet.
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci/relatorios',
    },
  },
}
