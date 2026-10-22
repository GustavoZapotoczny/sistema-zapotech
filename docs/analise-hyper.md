# Análise do HyperSistemas e Projeto de um ERP Superior

21/10/2026 · Gustavo

## Resumo executivo

Dá para construir um ERP melhor que o HyperSistemas se ele for 100% nuvem com app, tiver fiscal 2026 pronto (NFS-e Nacional, IBS/CBS), WhatsApp integrado à operação e não só ao atendimento, e preço público com teste grátis.

O Hyper é um ERP multi-segmento com mais de 15 anos de mercado, módulos para sete segmentos e um produto de WhatsApp separado (HyperBot). O site não mostra preço, telas, plataforma nem integrações: tudo passa por "solicitar demonstração".

**Limite desta análise:** não houve acesso ao sistema por dentro. A parte "o que se sabe" vem do site público. A parte "como provavelmente funciona" é inferência baseada no padrão dos ERPs de pequeno comércio no Brasil e está marcada como tal. Com prints ou uma demonstração, a seção 1 pode ser refeita com dados reais.

A estratégia recomendada: lançar primeiro o segmento **oficina mecânica** (onde o Hyper tem clientes que você já conhece), com núcleo reaproveitável para os outros segmentos depois.

## 1. O HyperSistemas hoje

O Hyper vende uma plataforma única com três frentes: gestão (financeiro, estoque, vendas, compras, relatórios), atendimento (WhatsApp) e módulos por segmento. Fonte: [hypersistemas.com.br](https://hypersistemas.com.br/), consultado em 21/10/2026.

### O que o site confirma

| Item | O que diz o site |
| --- | --- |
| Tempo de mercado | Mais de 15 anos |
| Segmentos | Comércio em geral, óticas, restaurantes e delivery, oficinas mecânicas, pet shop e veterinária, prestadores de serviço, funerárias |
| Oficina mecânica | Ordens de serviço, peças, clientes e histórico de veículos |
| Gestão geral | Financeiro, estoque, vendas, compras e relatórios |
| HyperBot | WhatsApp com vários atendentes, departamentos, histórico de conversas |
| Contato | WhatsApp (17) 99642-9795, contato@hypersistemas.com.br |
| Preço | Não divulgado |
| Plataforma (web/desktop) | Não divulgado |
| Teste grátis | Não oferecido no site |
| Integrações (bancos, marketplaces, contabilidade) | Não divulgadas |
| App de celular | Não divulgado |

### Como provavelmente funciona (inferência)

Estas conclusões vêm do que o site mostra e do padrão de ERPs regionais com esse perfil. Precisam ser confirmadas com uma demonstração.

- **Plataforma:** a imagem principal do site mostra uma comanda e o discurso é de "evolução contínua". ERPs regionais com 15+ anos costumam ter origem desktop (Delphi ou similar, banco Firebird ou SQL Server local) e migração parcial para web. Vale perguntar na demo.
- **Implantação:** sem preço público, a venda é consultiva: vendedor, demonstração, taxa de implantação e mensalidade. Isso costuma significar contrato e suporte por telefone/WhatsApp.
- **Um núcleo, vários segmentos:** o mesmo cadastro de clientes, produtos, financeiro e caixa serve a todos. Cada segmento liga telas extras (OS na oficina, receita na ótica, mesas no restaurante).
- **Ordem de serviço da oficina:** o fluxo típico é cadastrar cliente e veículo (placa), abrir OS, lançar peças (baixa no estoque) e serviços (mão de obra), aprovar orçamento, finalizar, receber e emitir nota.
- **Fiscal:** quase certamente emite NF-e e NFC-e para peças. NFS-e de mão de obra depende do município; com a NFS-e Nacional obrigatória em 2026, todo ERP teve que se adaptar.
- **HyperBot separado:** o WhatsApp é vendido como produto à parte. Provavelmente não abre OS, não manda orçamento para aprovação nem avisa "carro pronto" automaticamente a partir do ERP.
- **Região:** o DDD 17 indica a região de São José do Rio Preto (SP). A base de clientes deve ser forte no interior paulista.

### Perguntas para fazer numa demonstração

1. Roda no navegador, instalado no PC, ou os dois? Funciona sem internet?
2. Tem app para o mecânico ou só para o dono?
3. O cliente aprova o orçamento pelo celular, com link?
4. Controla quilometragem, horímetro e manutenção preventiva por veículo e por frota?
5. Emite NFS-e no padrão nacional e NF-e com IBS/CBS?
6. Quanto custa implantação, mensalidade e cada usuário extra?
7. Integra com Pix automático, boleto, maquininha e contador?
8. Exporta os dados se o cliente quiser sair?

## 2. Onde dá para ser melhor

As maiores brechas são transparência comercial, mobilidade e WhatsApp ligado à operação. Algumas são fatos do site; outras são hipóteses que a demo confirma ou derruba.

| Lacuna | Tipo | Como o seu sistema resolve |
| --- | --- | --- |
| Sem preço público nem teste grátis | Fato (site) | Planos com preço no site e 14 dias grátis sem cartão |
| Plataforma não informada | Fato (site) | 100% web + app Android/iOS, sem instalação |
| WhatsApp como produto separado | Fato (site) | WhatsApp dentro da OS: orçamento, aprovação, fotos, aviso de pronto, cobrança |
| Nenhuma integração divulgada | Fato (site) | Pix automático, boleto, maquininha, contador, marketplaces de peças |
| Venda consultiva e implantação lenta | Hipótese | Onboarding sozinho em 30 minutos, importação de planilha |
| Mecânico sem app próprio | Hipótese | App do mecânico: checklist com fotos, apontamento de horas, peças usadas |
| Pouco foco em frota de caminhões | Hipótese | Km e horímetro, plano de preventiva por frota, portal da transportadora |
| Relatórios estáticos | Hipótese | Painel em tempo real com margem por OS, por mecânico e por cliente |
| Dados presos no sistema | Hipótese | Exportação completa a qualquer momento, sem multa |

### O que o mercado de oficinas pede e quase ninguém faz bem

- **Orçamento aprovado pelo celular**, com fotos do defeito: aumenta conversão e evita discussão de "eu não autorizei".
- **Histórico do veículo pela placa**, mesmo trocando de dono: o próximo cliente vê o que já foi feito.
- **Lembrete de revisão automático** por km estimado ou data: gera retorno sem esforço.
- **Controle de garantia** de peça e serviço, com prazo e alerta.
- **Gestão de pneus e preventiva para frotas**: transportadoras pagam por isso, como mostram sistemas de frota como o [Sofit](https://www.b2bstack.com.br/product/sofit-view), que oferece indicadores de MTTR e MTBF.

## 3. Visão do produto

Um ERP em nuvem, com app, que o dono de pequeno negócio começa a usar sozinho no mesmo dia e que conversa com o cliente final pelo WhatsApp.

**Nome provisório:** pode sair da marca Zapotech, que você já tem registrada (por exemplo "Zapotech Gestão"). Antes de fechar, pesquisar o nome no INPI e o domínio .com.br.

### Para quem

| Público | Tamanho típico | Dor principal |
| --- | --- | --- |
| Oficina de carros | 1 a 10 pessoas | Orçamento no papel, cliente some, não sabe a margem |
| Oficina de caminhões e diesel | 3 a 30 pessoas | Frota parada custa caro, peça cara, garantia e preventiva |
| Comércio em geral | 1 a 15 pessoas | Estoque, caixa, nota fiscal |
| Restaurante e delivery | 2 a 20 pessoas | Pedidos de vários canais, cozinha, comanda |
| Ótica, pet shop, serviços | 1 a 10 pessoas | Agenda, histórico do cliente, retorno |

### Princípios de produto

1. **Começa sozinho:** cadastro, importação de planilha e primeira venda em menos de 30 minutos, sem consultor.
2. **Celular primeiro:** toda ação do dia a dia (abrir OS, vender, receber) funciona no app.
3. **WhatsApp é parte do processo:** cada documento (orçamento, OS, recibo, cobrança) tem botão "enviar no WhatsApp" com link.
4. **Preço aberto:** plano no site, sem fidelidade, sem taxa de implantação no plano básico.
5. **Um núcleo, módulos por segmento:** o cliente liga só o que usa; a tela não fica poluída.
6. **Dados do cliente são do cliente:** exportação completa em Excel/CSV a qualquer momento.

### Diferenciais para usar na venda

- Orçamento com fotos aprovado pelo cliente no celular.
- Aviso automático de "veículo pronto" e lembrete de revisão.
- Fiscal 2026 pronto: NFS-e Nacional e NF-e com IBS/CBS.
- App do mecânico e app do dono.
- Teste grátis de 14 dias e migração de dados assistida.

## 4. Módulos do núcleo (todos os segmentos)

O núcleo tem nove módulos que todo cliente usa; os segmentos só acrescentam telas e regras em cima deles.

### 4.1 Cadastros

- **Clientes:** pessoa física/jurídica, CPF/CNPJ com consulta automática (BrasilAPI), CEP com preenchimento de endereço, vários telefones, WhatsApp, observações, limite de crédito, tags.
- **Produtos:** código interno, código de barras (GTIN), código do fabricante e códigos equivalentes, NCM, CEST, cClassTrib, unidade, custo, margem, preço, preço promocional, fotos, estoque mínimo, localização na prateleira.
- **Serviços:** código, descrição, tempo padrão, valor por hora ou fixo, código de serviço da NFS-e Nacional.
- **Fornecedores, funcionários, formas de pagamento, centros de custo.**

### 4.2 Vendas e PDV

- PDV no navegador e no app, com leitor de código de barras e balança.
- Orçamento, pedido, venda, devolução e troca.
- Desconto com limite por usuário e senha do gerente acima do limite.
- Venda a prazo (crediário) com parcelas e controle de inadimplência.
- Emissão de NFC-e na hora ou NF-e para CNPJ.

### 4.3 Estoque

- Entrada por XML da nota do fornecedor (importa itens, custo e impostos automaticamente).
- Saída por venda, OS, perda, consumo interno.
- Inventário pelo celular com câmera lendo código de barras.
- Curva ABC, giro, produtos parados há 90 dias, sugestão de compra pelo estoque mínimo.
- Vários depósitos e transferência entre filiais.

### 4.4 Compras

- Pedido de compra, cotação com vários fornecedores, recebimento parcial.
- Manifestação do destinatário: o sistema baixa da SEFAZ as notas emitidas contra o CNPJ.

### 4.5 Financeiro

- Contas a pagar e a receber, fluxo de caixa projetado, DRE simples.
- Pix com QR Code dinâmico e baixa automática (via API do banco ou gateway).
- Boleto com registro e baixa automática.
- Conciliação com extrato (arquivo OFX ou Open Finance).
- Caixa: abertura, sangria, suprimento, fechamento cego.
- Comissão por vendedor ou mecânico.

### 4.6 Fiscal

Detalhado na seção 6.

### 4.7 Relatórios e painel

- Painel do dia: vendas, ticket médio, contas vencendo, OS abertas.
- Margem real por venda e por OS (preço menos custo menos impostos menos comissão).
- Exportação de qualquer relatório em Excel e PDF.

### 4.8 Usuários e permissões

- Perfis prontos (dono, gerente, caixa, mecânico, vendedor) e personalizáveis.
- Permissão por ação: ver custo, dar desconto, cancelar venda, excluir.
- Registro de auditoria: quem fez o quê e quando.

### 4.9 Multiempresa

- Um login acessa várias empresas ou filiais, com estoque e caixa separados e relatório consolidado.

## 5. Módulos por segmento

A oficina mecânica é o segmento de lançamento e recebe o detalhamento completo; os outros entram depois reaproveitando o núcleo.

### 5.1 Oficina mecânica (carros e caminhões)

**Fluxo da ordem de serviço**

1. **Recepção:** busca pela placa. Se o veículo já existe, puxa cliente, modelo e histórico. Se não, cadastra pela placa (marca, modelo, ano, motor, chassi).
2. **Checklist de entrada no app:** km ou horímetro, nível de combustível, avarias marcadas num desenho do veículo, fotos, objetos deixados, assinatura do cliente na tela.
3. **Diagnóstico:** mecânico registra defeitos com fotos e áudio no app.
4. **Orçamento:** peças (do estoque ou a comprar) e serviços (tempo padrão × valor hora). Itens podem ser marcados como "recomendado" ou "urgente".
5. **Aprovação pelo cliente:** link no WhatsApp; o cliente vê fotos, aprova item por item e assina. Fica registrado data, hora e IP.
6. **Execução:** OS vai para o quadro (kanban) com etapas: aguardando peça, em execução, teste, pronto. Mecânico aponta início e fim de cada serviço.
7. **Peças:** baixa do estoque ao aplicar; se faltar, gera pedido de compra ao fornecedor.
8. **Entrega:** aviso automático "veículo pronto", checklist de saída, recebimento (Pix, cartão, boleto, parcelado), NF-e das peças e NFS-e da mão de obra.
9. **Pós-venda:** garantia registrada por item com prazo, pesquisa de satisfação e lembrete da próxima revisão.

**Recursos específicos para caminhões e frotas**

- Controle por km e horímetro; vários implementos por cavalo (carreta, baú, guincho).
- Plano de manutenção preventiva por modelo: troca de óleo a cada X km, filtros, freios, embreagem. O sistema avisa quando está perto.
- **Gestão de pneus:** posição por eixo, número de fogo, sulco medido, recapagens, rodízio, custo por km.
- **Portal da transportadora:** o cliente frotista entra e vê todas as OS, gastos por placa, preventivas vencendo e aprova orçamentos de vários veículos.
- Faturamento mensal para frotas: junta as OS do mês numa cobrança só.
- Indicadores: tempo médio de reparo (MTTR), tempo entre falhas (MTBF), custo por km por veículo.

**Gestão da oficina**

- Agenda de serviços por box/elevador e por mecânico.
- Produtividade: horas vendidas × horas trabalhadas por mecânico.
- Comissão do mecânico por serviço ou por percentual.
- Serviço terceirizado (retífica, torno, elétrica): envia, controla prazo e repassa custo.
- Catálogo de peças com equivalências (mesmo filtro em várias marcas).

### 5.2 Comércio em geral

- PDV rápido, etiquetas com código de barras, grade de tamanho e cor, promoções por período, programa de pontos.
- Integração com marketplaces (Mercado Livre, Shopee) numa fase posterior.

### 5.3 Restaurante e delivery

- Mesas e comandas no app do garçom, tela da cozinha (KDS) e impressão por setor.
- Cardápio digital com pedido pelo QR Code da mesa e link de delivery próprio.
- Ficha técnica: cada prato baixa os ingredientes do estoque.
- Taxa de entrega por bairro ou distância, controle de entregadores.

### 5.4 Ótica

- Receita do oftalmologista (grau, DNP, altura) no cadastro do cliente.
- OS de montagem de óculos enviada ao laboratório, com prazo e status.

### 5.5 Pet shop e veterinária

- Cadastro do pet (espécie, raça, peso), vacinas com lembrete, prontuário, agenda de banho e tosa, pacotes mensais.

### 5.6 Prestadores de serviço

- Agenda, contrato recorrente com cobrança automática, OS em campo com geolocalização e assinatura.

## 6. Fiscal em 2026

O sistema precisa nascer emitindo NF-e, NFC-e e NFS-e no padrão nacional, com os campos de IBS e CBS da reforma tributária. Isso é o que mais derruba ERPs pequenos, e por isso é um argumento de venda forte.

| Documento | Uso na oficina/comércio | Regra atual |
| --- | --- | --- |
| NF-e (modelo 55) | Venda de peças para CNPJ, devolução, remessa | Campos de IBS e CBS obrigatórios para Lucro Presumido e Real desde 3/8/2026 ([Jornal Contábil](https://jornalcontabil.com.br/noticia/reforma-tributaria-e-notas-fiscais-mudancas-a-partir-de-agosto/amp/)) |
| NFC-e (modelo 65) | Venda no balcão para consumidor | Mesma regra de IBS/CBS da NF-e |
| NFS-e Nacional | Mão de obra, serviços | Padrão nacional obrigatório desde janeiro de 2026 pela LC 214/2025 ([Contábeis](https://www.contabeis.com.br/noticias/71679/nfs-e-nacional-sera-obrigatoria-para-municipios-a-partir-de-2026/)) |
| Nota de débito e de crédito | Ajustes de valor | Novas finalidades da NF-e criadas pela reforma ([Senior](https://www.senior.com.br/blog/reforma-tributaria-faturamento)) |

**Pontos da reforma que o sistema tem que tratar:**

- Em 2026 as alíquotas de teste são 0,9% de CBS e 0,1% de IBS, destacadas na nota ([Jornal Contábil](https://jornalcontabil.com.br/noticia/nota-fiscal-comum-deixa-de-existir-com-as-novas-mudancas-para-2026/amp/)).
- Entra o código de classificação tributária (cClassTrib), que complementa o CST. Cada produto e serviço precisa dele no cadastro.
- Para Simples Nacional e MEI, a mesma fonte indica obrigatoriedade a partir de 2027. Como a maioria das oficinas pequenas é do Simples, o sistema deve deixar os campos prontos e ativar por regime.
- Um levantamento citado pelo Jornal Contábil achou inconsistência tributária em 93% dos produtos de 4,5 mil empresas. Um **validador de cadastro fiscal** (NCM descontinuado, GTIN inválido, cClassTrib vazio) é um diferencial vendável.

### Como implementar

Não construa a comunicação com a SEFAZ e a prefeitura do zero. Use uma API fiscal terceirizada que já mantém os layouts atualizados e cobra por nota ou mensalidade. Opções a cotar: Focus NFe, PlugNotas (TecnoSpeed), NFE.io, Nuvem Fiscal. Critérios:

1. Emite NF-e, NFC-e e NFS-e Nacional com IBS/CBS.
2. Guarda o certificado digital A1 do cliente com segurança.
3. Tem webhooks de autorização, rejeição e cancelamento.
4. Preço por nota que caiba na margem do plano Essencial.

O sistema fica responsável por: cadastro fiscal correto, regras de tributação por regime (Simples, Presumido, Real), CFOP automático por operação, armazenar XML por 5 anos e enviar XML mensal ao contador.

## 7. WhatsApp e IA

O HyperBot organiza conversas; o seu sistema deve fazer as conversas gerarem e moverem documentos do ERP.

### WhatsApp integrado à operação

- **Caixa de entrada compartilhada** com vários atendentes e departamentos (o básico que o HyperBot já tem).
- **Ficha do cliente ao lado da conversa:** veículos, OS abertas, débitos, última visita.
- **Mensagens automáticas por evento:** orçamento pronto, aprovado, peça chegou, veículo pronto, boleto vencendo, revisão chegando, aniversário.
- **Ações dentro da conversa:** abrir OS, mandar orçamento, gerar Pix, agendar.
- **Campanhas segmentadas:** ex.: todos os clientes com troca de óleo há mais de 6 meses.

**Decisão técnica importante:** usar a API oficial do WhatsApp (WhatsApp Business Platform da Meta, direto ou por um provedor oficial). Bibliotecas não oficiais que simulam o WhatsApp Web são mais baratas, mas o número do cliente pode ser banido, e isso destrói a confiança no seu produto. A API oficial cobra por conversa iniciada pela empresa; repasse esse custo no plano ou como pacote de mensagens.

### IA aplicada (diferencial de 2026)

- **Atendente virtual** que responde horário, endereço, status da OS ("seu carro está em teste") e faz pré-agendamento, passando para humano quando precisa.
- **Orçamento por voz:** o mecânico fala "troca de pastilha dianteira e disco" e a IA monta o orçamento com peças do estoque e serviço padrão.
- **Leitura de foto:** foto da placa preenche o veículo; foto da nota do fornecedor lança a entrada no estoque.
- **Resumo do dia para o dono** no WhatsApp: faturamento, OS paradas, contas a vencer, alerta de margem baixa.
- **Busca em linguagem natural:** "quanto gastei com a placa ABC1D23 este ano?"

A IA deve ser opcional e cobrada como adicional, porque tem custo por uso.

## 8. Arquitetura técnica

Uma API única em C# (linguagem que você já domina), banco PostgreSQL compartilhado entre clientes e workers que fazem as tarefas lentas, como emitir nota e mandar WhatsApp.

```
[Painel web React] [App do dono RN] [App do mecânico RN] [Portal e links]
        \                 |                  |                 /
         +----------- API ASP.NET Core (C#) ------------------+
              (login, separação por empresa, regras de cada módulo)
            /                   |                     \
     [PostgreSQL]        [Redis + fila]         [Armazenamento S3]
                               |
                          [Workers]
            /           |              |              \
     [API fiscal] [WhatsApp oficial] [Pix e boleto]   [IA]
```

O usuário nunca espera a SEFAZ ou o WhatsApp responderem: a API grava o pedido, a fila entrega ao worker e o app recebe o resultado quando sai.

### Stack recomendada

| Camada | Tecnologia | Por quê |
| --- | --- | --- |
| Backend | ASP.NET Core 8+ (C#) | Você já tem base em C#; rápido e estável |
| Banco | PostgreSQL | Gratuito, robusto, suporta separação por linha (RLS) |
| Fila e cache | Redis + Hangfire | Tarefas agendadas e reprocessamento de falhas |
| Painel web | React + TypeScript (Vite) | Mesmo ecossistema do app |
| App | React Native com Expo | Um código para Android e iOS, câmera e assinatura |
| Arquivos | Armazenamento compatível com S3 | Fotos, XML e PDF baratos |
| Hospedagem | Nuvem com data center no Brasil | Latência baixa e LGPD |
| Monitoramento | Sentry + logs centralizados | Ver erro antes do cliente reclamar |

### Multi-tenant (várias empresas no mesmo sistema)

- Um banco único, toda tabela com `empresa_id`.
- Row Level Security no PostgreSQL como segunda trava: mesmo com bug no código, uma empresa não vê dado de outra.
- Cliente grande pode ganhar banco próprio depois, sem mudar o código.

### Segurança e LGPD

- Senha com hash forte, login com código no WhatsApp ou e-mail (2 fatores) opcional.
- Certificado digital A1 criptografado; nunca exposto ao navegador.
- Backup automático diário com retenção de 30 dias e teste de restauração mensal.
- Termo de uso e política de privacidade; registro de consentimento do cliente final para mensagens de WhatsApp.

### Funcionamento com internet ruim

- O app guarda checklist, fotos e vendas em fila local e sincroniza quando a conexão volta.
- NFC-e em contingência offline quando a SEFAZ estiver fora.

## 9. Modelo de dados principal

São cerca de 20 tabelas no MVP; todas, exceto `empresa`, carregam `empresa_id`, `criado_em`, `atualizado_em` e `excluido_em` (exclusão lógica, nunca apaga de verdade).

| Tabela | Campos principais | Liga com |
| --- | --- | --- |
| empresa | razão social, CNPJ, regime tributário, certificado A1, plano, segmentos ativos | tudo |
| usuario | nome, e-mail, telefone, perfil, comissão % | empresa |
| cliente | tipo (PF/PJ), CPF/CNPJ, nome, WhatsApp, endereço, limite de crédito, e_frota | veiculo, os, venda |
| veiculo | placa, marca, modelo, ano, motor, chassi, km_atual, horimetro, tipo (carro/caminhão/implemento) | cliente, os, pneu |
| produto | código, GTIN, cód. fabricante, NCM, CEST, cClassTrib, unidade, custo, preço, estoque mínimo, local | estoque_mov, item |
| produto_equivalente | produto_id, produto_equivalente_id | produto |
| servico | código, descrição, tempo padrão (min), valor, cód. NFS-e | item |
| ordem_servico | número, cliente, veículo, km entrada, status, datas, técnico responsável, total peças, total serviços, desconto | itens, checklist, aprovação |
| os_item | tipo (peça/serviço), produto ou serviço, quantidade, valor, mecânico, garantia (dias), aprovado (sim/não) | ordem_servico |
| os_checklist | itens marcados, fotos, avarias, assinatura, tipo (entrada/saída) | ordem_servico |
| os_aprovacao | link único, data/hora, IP, itens aprovados, assinatura | ordem_servico |
| apontamento | mecânico, os_item, início, fim | ordem_servico |
| plano_preventiva | modelo, item, intervalo km, intervalo dias | veiculo |
| pneu | número de fogo, marca, medida, posição, sulco, recapagens, km rodado | veiculo |
| venda | número, cliente, vendedor, total, status, canal | itens, financeiro, nota |
| estoque_mov | produto, tipo (entrada/saída/ajuste), quantidade, custo, origem | produto |
| financeiro_titulo | tipo (pagar/receber), pessoa, valor, vencimento, pago em, forma, origem (venda/OS/compra) | caixa |
| caixa | abertura, fechamento, valores por forma de pagamento, usuário | financeiro_titulo |
| nota_fiscal | modelo (55/65/NFS-e), número, série, chave, status, XML, PDF, origem | venda, ordem_servico |
| mensagem | canal, cliente, direção, conteúdo, status, documento ligado | cliente, os |
| auditoria | usuário, ação, tabela, registro, antes, depois, data | tudo |

**Regras de ouro do banco:**

- Valores em centavos (inteiro), nunca em ponto flutuante.
- Numeração de OS, venda e nota por empresa, sem buracos, com trava na transação.
- Preço e custo copiados para o item no momento da venda: mudar o cadastro não altera vendas antigas.
- Status como lista fechada (enum), com histórico de mudanças.

## 10. Modelo de negócio e vendas

Assinatura mensal com preço público, três planos e adicionais. Os valores abaixo são uma proposta inicial para validar com 10 oficinas antes de publicar; não encontrei preços públicos do Hyper para comparar.

| Plano | Para quem | Inclui | Preço sugerido/mês |
| --- | --- | --- | --- |
| Essencial | Oficina ou loja pequena | 2 usuários, OS ou PDV, estoque, financeiro, NFC-e/NFS-e, link de aprovação | R$ 99 |
| Profissional | Oficina média | 5 usuários, app do mecânico, NF-e, Pix/boleto automáticos, WhatsApp integrado, relatórios de margem | R$ 199 |
| Frota | Oficina de caminhões e diesel | 10 usuários, preventiva, pneus, portal da transportadora, faturamento mensal | R$ 349 |

**Adicionais:** usuário extra (R$ 19), pacote de IA, pacote de mensagens de WhatsApp, filial extra, migração de dados assistida (cobrança única).

**Desconto anual:** 2 meses grátis no pagamento anual, para reduzir cancelamento.

### Como vender

1. **Primeiros clientes:** oficinas que você já conhece e que usam o Hyper. Ofereça migração gratuita e 3 meses pela metade em troca de feedback semanal.
2. **Conteúdo:** vídeos curtos mostrando o orçamento aprovado no WhatsApp; é o recurso mais fácil de entender em 15 segundos.
3. **Indicação:** um mês grátis para quem indicar uma oficina que assine.
4. **Parcerias:** contadores (recebem XML automático e indicam), distribuidoras de autopeças, escolas de mecânica.
5. **Revendedores regionais:** comissão recorrente de 20% a 30% da mensalidade, como fazem ERPs de implantação local.

### Números para acompanhar

- Custo de aquisição por cliente (CAC) e tempo para recuperá-lo.
- Cancelamento mensal (churn): meta abaixo de 3%.
- Receita recorrente mensal (MRR) e ticket médio.
- Ativação: % de testes que emitem a primeira OS ou venda em 7 dias.

## 11. Roteiro, equipe e custos

O MVP de oficina fica pronto em cerca de 5 meses com 1 a 2 desenvolvedores; os outros segmentos só entram depois que a oficina paga a operação.

| Fase | Prazo | Entregas | Portão para a próxima fase |
| --- | --- | --- | --- |
| 0. Validação | Mês 1 | Entrevistar 10 oficinas, assistir uma demo do Hyper; protótipo clicável do fluxo de OS e aprovação | 10 oficinas confirmam a dor e o preço |
| 1. MVP Oficina | Meses 2 a 5 | Cadastros, OS com checklist e aprovação, estoque; financeiro e caixa, NFS-e e NFC-e via API fiscal | 5 oficinas usando todo dia por 30 dias |
| 2. Profissional | Meses 6 a 8 | App do mecânico, NF-e, Pix e boleto automáticos; WhatsApp oficial integrado, painel de margem | 50 clientes pagantes, cancelamento abaixo de 3% ao mês |
| 3. Frota e IA | Meses 9 a 12 | Preventiva, pneus, portal da transportadora; orçamento por voz, atendente virtual no WhatsApp | Receita recorrente cobre a operação |
| 4. Outros segmentos | Mês 13 em diante | Comércio e PDV, depois restaurante e delivery; ótica, pet shop e prestadores de serviço | — |

Cada portão é um critério de negócio, não de código: se não for cumprido, ajuste o produto antes de construir a fase seguinte.

### Fora do MVP (de propósito)

- App do mecânico (no MVP o mecânico usa o painel web no celular).
- IA, portal da frota, gestão de pneus, marketplaces.
- Outros segmentos.

### Equipe mínima

| Papel | Quem | Dedicação |
| --- | --- | --- |
| Produto e backend C# | Você | Integral |
| Frontend React/React Native | 1 dev (freelancer ou sócio) | Integral a partir do mês 2 |
| Suporte e implantação | 1 pessoa | A partir de 20 clientes |
| Contador consultor | Escritório parceiro | Por hora, para validar regras fiscais |

### Custos mensais de operação (estimativa a cotar)

- Hospedagem, banco e armazenamento em nuvem.
- API fiscal (por nota ou plano).
- WhatsApp oficial (por conversa iniciada pela empresa).
- IA (por uso, só quando o adicional for vendido).
- Contas de loja de apps (Apple anual, Google taxa única), domínio, e-mail e monitoramento.

Cotar cada item antes da fase 1 e garantir que o plano Essencial cubra o custo variável de um cliente com folga.

## 12. Riscos e próximos passos

O maior risco não é técnico: é construir muito antes de ter 5 oficinas usando todo dia.

| Risco | Impacto | Como reduzir |
| --- | --- | --- |
| Construir tudo antes de vender | Alto | Seguir os portões do roteiro; MVP só de oficina |
| Erro fiscal (nota rejeitada ou imposto errado) | Alto | API fiscal terceirizada, contador consultor, testes em homologação |
| Clientes presos ao Hyper por contrato ou medo de perder dados | Médio | Migração assistida, rodar os dois sistemas em paralelo por 30 dias |
| Suporte consome todo o seu tempo | Médio | Onboarding guiado, central de ajuda em vídeo, atendimento por WhatsApp com horário |
| Banimento do número de WhatsApp | Alto | Só API oficial |
| Vazamento de dados entre empresas | Alto | Row Level Security, testes automáticos de isolamento |
| Concorrência nacional bem financiada | Médio | Nicho de oficina de caminhões e atendimento regional próximo |

### Próximos passos (próximas 4 semanas)

- [ ] Pedir uma demonstração do Hyper como interessado e anotar as respostas da seção 1.
- [ ] Entrevistar 10 oficinas: o que mais irrita no sistema atual, quanto pagam, o que fariam trocar.
- [ ] Registrar nome e domínio; checar INPI.
- [ ] Cotar API fiscal, WhatsApp oficial e hospedagem.
- [ ] Desenhar protótipo clicável do fluxo de OS com aprovação pelo WhatsApp e mostrar às oficinas.
- [ ] Decidir sócio ou freelancer para o frontend.

## Fontes

- [HyperSistemas – site oficial](https://hypersistemas.com.br/)
- [Jornal Contábil – notas fiscais com IBS/CBS a partir de agosto de 2026](https://jornalcontabil.com.br/noticia/reforma-tributaria-e-notas-fiscais-mudancas-a-partir-de-agosto/amp/)
- [Jornal Contábil – alíquotas de teste e cClassTrib](https://jornalcontabil.com.br/noticia/nota-fiscal-comum-deixa-de-existir-com-as-novas-mudancas-para-2026/amp/)
- [Contábeis – NFS-e Nacional obrigatória a partir de 2026](https://www.contabeis.com.br/noticias/71679/nfs-e-nacional-sera-obrigatoria-para-municipios-a-partir-de-2026/)
- [Senior – notas de débito e crédito na reforma](https://www.senior.com.br/blog/reforma-tributaria-faturamento)
- [B2B Stack – Sofit View (gestão de frotas)](https://www.b2bstack.com.br/product/sofit-view)
