// Verifica o orçamento de tamanho do pacote inicial do painel web.
// Soma, compactado em gzip, tudo que o navegador baixa ao abrir o index.html
// (scripts de entrada, modulepreload e CSS). Módulos carregados sob demanda não entram.
// Uso: node scripts/verificar-orcamento.mjs [limiteKB]   (padrão: 250)
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const LIMITE_KB = Number(process.argv[2] ?? 250)
const pastaDist = join(import.meta.dirname, '..', 'dist')
const caminhoIndex = join(pastaDist, 'index.html')

if (!existsSync(caminhoIndex)) {
  console.error('dist/index.html não encontrado. Rode "npm run build" antes.')
  process.exit(1)
}

const html = readFileSync(caminhoIndex, 'utf8')
const padrao = /<(?:script[^>]+src|link[^>]+href)="([^"]+\.(?:js|css))"/g
const arquivos = [...new Set([...html.matchAll(padrao)].map((m) => m[1]))]

let totalBytes = 0
for (const arquivo of arquivos) {
  const conteudo = readFileSync(join(pastaDist, arquivo.replace(/^\//, '')))
  const gzip = gzipSync(conteudo, { level: 9 }).length
  totalBytes += gzip
  console.log(`  ${arquivo.padEnd(50)} ${(gzip / 1024).toFixed(1).padStart(7)} KB`)
}

const totalKB = totalBytes / 1024
console.log(`\nPacote inicial: ${totalKB.toFixed(1)} KB gzip (limite: ${LIMITE_KB} KB)`)

if (totalKB > LIMITE_KB) {
  console.error(`ERRO: o pacote inicial passou do limite em ${(totalKB - LIMITE_KB).toFixed(1)} KB.`)
  process.exit(1)
}
console.log('OK: dentro do orçamento.')
