# Plano de Ação: ERP Multi-segmento sem Travamentos

21/10/2026 · Gustavo

Plano para construir cada sistema citado na análise do HyperSistemas, na ordem certa, com as ferramentas de cada etapa e metas de velocidade medidas a cada entrega.

## 1. Regras de fluidez (valem para todos os sistemas)

Nenhum software garante zero travamento em 100% dos casos, mas dá para chegar perto: o usuário nunca espera a rede, metas de velocidade são medidas em toda entrega e nada vai para produção acima delas.

### Metas de velocidade

| O que medir | Meta | Como medir |
| --- | --- | --- |
| Resposta a clique ou digitação (INP) | Abaixo de 200 ms | Sentry e Web Vitals no navegador real |
| Primeira tela útil (LCP) | Abaixo de 2,5 s no 4G | Lighthouse no CI, Sentry |
| Adicionar item no PDV ou na OS | Abaixo de 100 ms | Teste automatizado com cronômetro |
| Resposta da API (95% das chamadas) | Abaixo de 300 ms | OpenTelemetry + painel Grafana |
| Busca de produto ou cliente | Abaixo de 150 ms com 100 mil cadastros | Teste de carga com k6 |
| Abertura do app no celular | Abaixo de 2 s | Sentry Mobile |
| Rolagem de listas longas | 60 quadros por segundo | Perfilador do React Native e do Chrome |
| Emissão de nota percebida pelo usuário | Instantânea (segue em segundo plano) | Fila com status ao vivo |

### Técnicas obrigatórias

1. **Interface otimista:** o botão responde na hora (item aparece, status muda) e a confirmação do servidor chega depois. Se falhar, desfaz com aviso claro.
2. **Dados locais primeiro:** produtos, clientes, serviços e preços ficam guardados no aparelho (IndexedDB no navegador, SQLite no app) e sincronizam em segundo plano. Busca e PDV funcionam sem internet.
3. **Nada lento na tela:** nota fiscal, WhatsApp, PDF, relatório pesado e importação de planilha vão para fila (Hangfire). A tela mostra "processando" e atualiza sozinha via SignalR.
4. **Listas virtualizadas:** só desenha as linhas visíveis (TanStack Virtual no web, FlashList no app). Mil itens rolam igual a dez.
5. **Paginação por cursor** e índices no banco para toda busca e filtro. Nenhuma consulta sem índice passa no review.
6. **Carregamento por partes:** cada módulo baixa só quando é aberto (code splitting); o PDV não carrega o código do financeiro.
7. **Cache em camadas:** Redis para leituras repetidas (tabela de preços, permissões), CDN para arquivos estáticos e fotos.
8. **Dispositivos lentos no teste:** todo teste de desempenho roda simulando celular Android de entrada e 4G fraco, que é o aparelho real de muita oficina.
9. **Orçamento de tamanho:** o pacote inicial do painel web não passa de 250 KB compactado; o CI bloqueia se passar.
10. **Monitoramento contínuo:** alerta automático quando qualquer meta piora 20% em produção.

## 2. Ferramentas (stack completa)

Todas as ferramentas abaixo são maduras e amplamente usadas; as marcadas "cotar" têm alternativas equivalentes e devem ser escolhidas por preço e suporte.

| Categoria | Ferramenta | Para quê |
| --- | --- | --- |
| Backend | ASP.NET Core (.NET 8 ou superior), C# | API principal |
| Acesso a dados | Entity Framework Core + Dapper | EF no dia a dia, Dapper em relatórios pesados |
| Validação | FluentValidation | Regras de cadastro e de negócio |
| Tempo real | SignalR | Quadro de OS, tela da cozinha, status de nota |
| Filas e agendamento | Hangfire + Redis | Notas, WhatsApp, PDFs, lembretes |
| Banco | PostgreSQL 16+ gerenciado | Dados, com Row Level Security |
| Busca rápida | Índices trigram (pg_trgm) do PostgreSQL | Busca por pedaço de nome, placa, código |
| Painel web | React + TypeScript + Vite | Interface |
| Dados no web | TanStack Query | Cache, atualização em segundo plano, interface otimista |
| Tabelas e listas | TanStack Table + TanStack Virtual | Listas grandes sem travar |
| Formulários | React Hook Form + Zod | Formulários rápidos com validação |
| Visual | Tailwind CSS + shadcn/ui | Componentes acessíveis e consistentes |
| Estado local | Zustand | Carrinho do PDV, preferências |
| Offline no web | Dexie (IndexedDB) + vite-plugin-pwa (Workbox) | PDV e busca sem internet; instala como app |
| App celular | React Native com Expo | Android e iOS com um código |
| Banco no celular | expo-sqlite ou WatermelonDB | Dados locais e sincronização |
| Armazenamento rápido no app | react-native-mmkv | Sessão e preferências |
| Listas no app | FlashList | Rolagem fluida |
| Animações | Reanimated | Animações sem travar a tela |
| Câmera e assinatura | expo-camera, expo-image-picker, tela de assinatura | Checklist, placa, fotos |
| Atualização do app | EAS Build + EAS Update | Correções sem esperar a loja |
| Impressora, gaveta, balança | Agente local em .NET (app pequeno no PC da loja) | Impressão térmica ESC/POS, balança serial |
| Arquivos | Armazenamento compatível com S3 + CDN | Fotos, XML, PDF |
| Fiscal | API fiscal: Focus NFe, PlugNotas, NFE.io ou Nuvem Fiscal (cotar) | NF-e, NFC-e, NFS-e Nacional |
| Pagamentos | Pix e boleto: Asaas, Efí, Mercado Pago ou banco com API (cotar) | Cobrança com baixa automática |
| Maquininha | Integração Stone, Cielo, PagSeguro ou Mercado Pago Point (cotar) | Valor enviado à maquininha sem digitar |
| WhatsApp | WhatsApp Cloud API da Meta ou provedor oficial (cotar) | Mensagens e atendimento |
| Dados públicos | BrasilAPI (CNPJ, CEP), tabela FIPE | Preencher cadastros sozinho |
| IA | API de modelo de linguagem (ex.: Claude) + transcrição de voz | Atendente, orçamento por voz, leitura de nota |
| Testes backend | xUnit + Testcontainers | Testes com PostgreSQL real |
| Testes web | Vitest + Playwright | Unidade e ponta a ponta |
| Testes app | Maestro | Fluxos no celular |
| Carga | k6 | Simular centenas de oficinas ao mesmo tempo |
| Erros e desempenho | Sentry (web, app, API) | Erros e lentidão reais |
| Métricas e logs | OpenTelemetry + Grafana | Painéis e alertas |
| Disponibilidade | Monitor externo de uptime | Alerta se o sistema cair |
| Código e entregas | GitHub + GitHub Actions + Docker | CI/CD automático |
| Liberação gradual | Feature flags (ex.: Unleash) | Ligar recurso para poucos clientes primeiro |
| Hospedagem | Nuvem com região em São Paulo (AWS, Azure ou Google) | Latência baixa |
| Design | Figma | Telas antes do código |
| Gestão | Linear ou GitHub Projects | Tarefas e sprints |
| Suporte | Central de ajuda + chat no WhatsApp | Atendimento ao cliente |

## 3. Fundação: o núcleo comum (meses 2 a 4)

Tudo que os sete sistemas compartilham é construído uma vez só, já com as regras de fluidez embutidas; cada segmento depois só pluga telas e regras.

### Passo a passo (sprints de 2 semanas)

1. **Sprint 1 – Esqueleto e entregas automáticas**
    - Repositório, Docker, GitHub Actions rodando testes, Lighthouse e limite de tamanho do pacote a cada commit.
    - Ambientes separados: desenvolvimento, homologação e produção.
    - Sentry e OpenTelemetry ligados desde o primeiro dia.
2. **Sprint 2 – Contas, empresas e permissões**
    - Cadastro da empresa com CNPJ preenchido pela BrasilAPI.
    - Login, convite de usuários, perfis e permissões por ação.
    - Row Level Security no PostgreSQL e teste automático que tenta ler dado de outra empresa (tem que falhar).
3. **Sprint 3 – Cadastros com sincronização local**
    - Clientes, produtos, serviços, fornecedores.
    - Busca com pg_trgm no servidor e cópia local no aparelho para busca instantânea.
    - Importação de planilha em fila, com barra de progresso ao vivo.
4. **Sprint 4 – Estoque, financeiro e caixa**
    - Entrada por XML do fornecedor, movimentações, contas a pagar e receber, caixa.
    - Pix e boleto com baixa automática via webhook.
5. **Sprint 5 – Fiscal**
    - Integração com a API fiscal escolhida, upload do certificado A1, emissão em fila com status ao vivo.
    - Testes em homologação da SEFAZ e da NFS-e Nacional.
6. **Sprint 6 – Painel, auditoria e onboarding**
    - Painel do dia, auditoria, assistente de primeiro uso em 5 passos.
    - Teste de carga k6: 200 empresas simuladas usando ao mesmo tempo, todas as metas da seção 1 cumpridas.

**Pronto quando:** uma empresa nova se cadastra, importa produtos, vende, recebe por Pix e emite nota sem ajuda, e todas as metas de velocidade passam no CI.

## 4. Oficina mecânica (MVP meses 3 a 5; completo até o mês 12)

A oficina é o primeiro sistema vendido. As telas começam no mês 3 em paralelo com o fim do núcleo: um desenvolvedor fecha o núcleo, o outro já constrói a OS.

### Etapa A – MVP (meses 3 a 5)

1. **Veículos:** cadastro pela placa, marca/modelo/ano pela tabela FIPE, histórico por placa.
2. **Ordem de serviço:** abrir, lançar peças e serviços, orçamento em PDF, status.
3. **Checklist de entrada:** fotos pelo celular (navegador), avarias, km, assinatura na tela.
4. **Link de aprovação:** página leve (abre em menos de 1 segundo no 4G) onde o cliente vê fotos e aprova item por item.
5. **Quadro de OS (kanban):** arrastar entre etapas, atualizado ao vivo para todos via SignalR.
6. **Entrega:** recebimento, NF-e/NFC-e das peças e NFS-e da mão de obra na mesma ação, em fila.

**Fluidez específica:** fotos são comprimidas no aparelho antes do envio (de cerca de 4 MB para cerca de 300 KB) e sobem em segundo plano; o mecânico continua usando a tela enquanto envia.

### Etapa B – Profissional (meses 6 a 8)

1. **App do mecânico** (Expo): minhas OS, checklist offline, apontamento de horas com um toque, peças usadas, áudio do defeito.
2. **Aviso automático no WhatsApp:** orçamento pronto, aprovado, veículo pronto.
3. **Agenda por box e mecânico**, produtividade e comissão.
4. **Garantia por item** com alerta de prazo; **lembrete de revisão** por data ou km estimado.
5. **Catálogo de equivalências** de peças.

### Etapa C – Frota e caminhões (meses 9 a 12)

1. Horímetro, implementos (carreta, baú), vários veículos por cliente frotista.
2. Plano de preventiva por modelo com alerta.
3. Gestão de pneus por posição e número de fogo.
4. Portal da transportadora: OS, gastos por placa, aprovação em lote.
5. Faturamento mensal agrupando OS.
6. Indicadores MTTR, MTBF e custo por km.

**Pronto quando:** 5 oficinas usam todo dia por 30 dias (etapa A) e uma transportadora aprova orçamentos pelo portal (etapa C).

## 5. Comércio e PDV (meses 13 a 15)

O PDV é onde travamento custa mais caro, porque a fila do caixa está olhando; por isso ele roda inteiro no aparelho e só sincroniza com o servidor.

### Passo a passo

1. **PDV local-first:** catálogo, preços e clientes no IndexedDB (Dexie). Ler o código de barras e mostrar o item não toca a rede.
2. **Atalhos de teclado** para tudo (F2 busca, F4 desconto, F10 finalizar) e foco automático no campo de leitura.
3. **Agente local** (.NET, instalado no PC do caixa): impressora térmica, gaveta e balança. O navegador fala com ele pela rede local, sem depender da internet.
4. **Maquininha integrada:** o valor vai direto para a maquininha; sem digitar duas vezes.
5. **NFC-e com contingência offline:** se a SEFAZ ou a internet cair, a venda sai e a nota é transmitida depois, dentro do prazo legal.
6. **Grade de tamanho e cor, etiquetas, promoções por período, programa de pontos.**
7. **Fechamento de caixa** com conferência cega e relatório por forma de pagamento.
8. **Integração com marketplaces** (Mercado Livre, Shopee) numa etapa posterior, aproveitando o estoque único.

**Fluidez específica:** venda de 30 itens do primeiro bip até o cupom impresso em menos de 60 segundos, testada com leitor real e internet desligada.

**Pronto quando:** 3 lojas usam o PDV por 30 dias sem nenhuma venda perdida por queda de internet.

## 6. Restaurante e delivery (meses 15 a 18)

No restaurante o pedido tem que chegar à cozinha em menos de 1 segundo, mesmo no horário de pico; tudo que é pedido trafega por SignalR e é impresso pelo agente local.

### Passo a passo

1. **Mesas e comandas:** mapa de mesas, abrir, transferir, juntar e dividir conta.
2. **App do garçom** (Expo, funciona no Wi-Fi do salão mesmo com internet fora, enviando ao agente local).
3. **Tela da cozinha (KDS):** pedidos por setor (cozinha, bar, pizza), tempo de preparo com cor de alerta, toque para "pronto".
4. **Impressão por setor** pelo agente local, como reserva da tela.
5. **Cardápio digital** com pedido pelo QR Code da mesa, página leve e cacheada em CDN.
6. **Delivery próprio:** link de pedido, taxa por bairro ou distância (API de mapas), controle de entregador.
7. **Ficha técnica:** cada prato baixa ingredientes do estoque; alerta de insumo acabando.
8. **Integração com iFood** pela API para parceiros (exige homologação) para receber pedidos no mesmo painel.

**Fluidez específica:** teste de carga simulando sexta-feira à noite (200 pedidos por hora em uma casa) sem atraso perceptível no KDS.

**Pronto quando:** 3 restaurantes operam um fim de semana inteiro só com o sistema.

## 7. Ótica, pet shop e prestadores de serviço (meses 18 a 21)

Os três reaproveitam quase tudo da oficina (OS, agenda, histórico, lembrete por WhatsApp); cada um leva cerca de um mês e meio.

### Ótica (meses 18 e 19)

1. Receita no cadastro do cliente: grau de cada olho, adição, DNP, altura, validade.
2. Venda de armação + lentes com cálculo do preço da lente pela receita.
3. OS de montagem enviada ao laboratório, com prazo e status; aviso "óculos pronto" no WhatsApp.
4. Lembrete de nova consulta 12 meses depois.

### Pet shop e veterinária (meses 19 e 20)

1. Cadastro do pet ligado ao tutor: espécie, raça, peso, foto, alergias informadas.
2. Agenda de banho e tosa por profissional, com aviso "pode buscar".
3. Carteira de vacinas com lembrete automático da próxima dose.
4. Prontuário veterinário com anexos; pacotes mensais com cobrança recorrente.

### Prestadores de serviço (meses 20 e 21)

1. Agenda da equipe com rota do dia no mapa.
2. OS em campo no app: check-in com localização, fotos, assinatura do cliente, funciona offline.
3. Contratos recorrentes com cobrança automática (Pix recorrente ou boleto).
4. NFS-e Nacional emitida ao finalizar a OS.

**Fluidez específica:** a agenda carrega a semana inteira localmente; arrastar um horário responde na hora e sincroniza depois.

**Pronto quando:** cada segmento tem 3 clientes usando por 30 dias.

## 8. Atendimento WhatsApp e IA (meses 6 a 12)

O WhatsApp entra junto com o plano Profissional da oficina e vira um módulo comum a todos os segmentos; a IA vem depois, como adicional pago.

### WhatsApp (meses 6 a 8)

1. Conta na WhatsApp Cloud API (direto na Meta ou via provedor oficial), verificação da empresa e aprovação dos modelos de mensagem.
2. Mensagens automáticas por evento do sistema, enviadas pela fila com nova tentativa automática.
3. Caixa de entrada compartilhada no painel: atendentes, departamentos, transferência, etiquetas.
4. Ficha do cliente ao lado da conversa e botões de ação (abrir OS, mandar orçamento, gerar Pix).
5. Campanhas segmentadas com limite de envio e opção de descadastro.

### IA (meses 9 a 12)

1. **Atendente virtual:** responde horário, endereço e status da OS consultando o sistema; passa para humano quando não sabe.
2. **Orçamento por voz:** transcrição do áudio do mecânico + IA que monta itens a partir do catálogo, sempre revisados antes de enviar.
3. **Leitura de imagem:** placa do veículo e nota do fornecedor.
4. **Resumo diário** para o dono no WhatsApp.
5. **Controle de custo:** limite mensal de uso por empresa e painel de consumo.

**Fluidez específica:** a conversa aparece na tela em menos de 1 segundo após chegar (webhook direto para SignalR); respostas da IA aparecem em streaming, palavra por palavra, em vez de uma espera longa.

**Pronto quando:** 80% dos avisos de OS saem sem ninguém digitar, e a taxa de falha de envio fica abaixo de 1%.

## 9. Cronograma geral

Seguindo esta ordem, os sete sistemas ficam prontos em cerca de 21 meses, com a oficina gerando receita desde o mês 6.

| Frente | Meses |
| --- | --- |
| Validação | 1 |
| Núcleo comum | 2 a 4 |
| Oficina: MVP | 3 a 5 |
| Oficina: Profissional | 6 a 8 |
| WhatsApp | 6 a 8 |
| Oficina: frota | 9 a 12 |
| IA | 9 a 12 |
| Comércio e PDV | 13 a 15 |
| Restaurante e delivery | 15 a 18 |
| Ótica | 18 a 19 |
| Pet shop | 19 a 20 |
| Prestadores de serviço | 20 a 21 |

O fim do MVP da oficina (mês 5) é o marco principal: dali em diante cada novo sistema é financiado pelas mensalidades dos anteriores. Os prazos são estimativas e dependem de cumprir os portões de cada etapa.

## 10. Checklist antes de cada lançamento

Nenhum sistema vai para clientes sem todos os itens marcados.

- [ ] Todas as metas de velocidade da seção 1 passaram no CI e no teste de carga k6.
- [ ] Teste em celular Android de entrada com 4G simulado fraco.
- [ ] Teste com internet desligada no meio de uma venda ou OS: nada se perde.
- [ ] Teste de isolamento entre empresas passou.
- [ ] Notas emitidas em homologação para cada regime (Simples, Presumido, Real).
- [ ] Backup restaurado com sucesso em ambiente separado.
- [ ] Sentry sem erro novo nas últimas 48 horas em homologação.
- [ ] Recurso liberado primeiro para 10% dos clientes por feature flag, depois para todos.
- [ ] Vídeo curto de ajuda gravado para cada tela nova.
- [ ] Plano de volta (rollback) testado: dá para desfazer a versão em menos de 5 minutos.
