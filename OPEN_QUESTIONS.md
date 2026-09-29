# Questões em aberto - Portfolio Pedro Borges

<!-- Uma entrada por decisão. Toda entrada tem Status: "aberta" (ainda sem decisão) ou "resolvida" (com Decisão, Data e Motivo). Não apague entradas resolvidas: o histórico do porquê fica aqui. -->

### Stack e hospedagem

- **Status:** resolvida
- **Decisão:** Next.js + TypeScript + Tailwind, export estático, GitHub Pages no repositório `pedrohrb7.github.io`, npm, Vitest + Playwright.
- **Data:** 2026-09-28
- **Motivo:** Alinhado à stack do currículo; custo zero; deploy automático via GitHub Actions.
- **Levado para:** `CONSTRAINTS.md`

### Idiomas

- **Status:** resolvida
- **Decisão:** PT e EN com seletor no header; `/` detecta o idioma do navegador e usa `pt` como padrão.
- **Data:** 2026-09-28
- **Motivo:** Amplia o alcance para vagas remotas internacionais.
- **Levado para:** `CONSTRAINTS.md`

### A graduação em Análise e Desenvolvimento de Sistemas já foi concluída?

- **Status:** resolvida
- **Decisão:** Sim, concluída em jun/2026. O site mostra "Jan 2025 - Jun 2026" sem indicação de andamento.
- **Data:** 2026-09-28
- **Motivo:** Confirmado pelo Pedro.

### O telefone deve aparecer no site?

- **Status:** resolvida
- **Decisão:** Não publicar no site nem no PDF. Contato por e-mail, GitHub e LinkedIn.
- **Data:** 2026-09-28
- **Motivo:** Site público é indexado e coletado por bots.
- **Levado para:** `CONSTRAINTS.md` (Conformidade e segurança)

### Oferecer download do currículo em PDF?

- **Status:** resolvida
- **Decisão:** Sim, um PDF por idioma gerado no build a partir do mesmo conteúdo do site (`src/content/`).
- **Data:** 2026-09-28
- **Motivo:** Recrutadores pedem PDF; gerar no build garante que nunca diverge do site.
- **Levado para:** `docs/features/resume-pdf/`, `PRD.md` (Escopo)

### Como gerar o PDF do currículo no build?

- **Status:** resolvida
- **Decisão:** `@react-pdf/renderer`, rodando em Node no pós-build, com um documento próprio que lê `getContent(locale)` e `profile`.
- **Data:** 2026-09-28
- **Motivo:** Não exige Chromium no build (o `Dockerfile` continua leve), é mais rápido e usa menos memória, e não publica uma rota de impressão extra no site. Custo aceito: layout do PDF separado dos componentes do site (primitivas `Document`/`Page`/`View`/`Text`, sem Tailwind) e fontes Geist registradas como TTF.
- **Alternativa descartada:** página de impressão `/pt/cv/` e `/en/cv/` convertida com `page.pdf()` do Playwright.
- **Levado para:** `docs/features/resume-pdf/`

### Usar domínio próprio?

- **Status:** resolvida
- **Decisão:** Não. Manter `https://pedrohrb7.github.io`.
- **Data:** 2026-09-28
- **Motivo:** Custo zero e sem manutenção de DNS.

### Adotar shadcn/ui no frontend?

- **Status:** resolvida
- **Decisão:** Não adotar agora. Os componentes continuam próprios (`src/ui/`, `src/components/`) sobre os tokens do `DESIGN_SYSTEM.md`. Quando uma feature precisar de um componente interativo complexo (dialog, popover, dropdown estilizado, tooltip, galeria), adicionar só aquele componente pela CLI do shadcn, com as cores trocadas pelos nossos tokens, sem adotar a biblioteca inteira nem renomear o design system.
- **Data:** 2026-09-28
- **Motivo:** O site quase não tem componentes interativos (botões-link, tags, seletor de idioma por links, seletor de tema, menu de âncoras), que é onde o shadcn/Radix ajuda. O JavaScript é o ponto fraco atual (Lighthouse mobile de `/en/` em 95, no limite da meta), e Radix + `lucide-react` + `class-variance-authority` + `tailwind-merge` + `clsx` aumentariam o bundle. As convenções de token do shadcn (`background`/`foreground`, `primary`, `muted` como fundo) conflitam com as nossas (`muted` é cor de texto), e o visual padrão teria de ser reestilizado para o design editorial de qualquer jeito.
- **Único ganho hoje:** controle total do visual da lista do seletor de tema (a lista nativa não aceita estilização completa). Não compensa o JS extra para três opções.
- **Revisitar quando:** `docs/features/projects-showcase/` (ou outra feature) precisar de modal, galeria ou outro componente interativo complexo.
- **Atualização (2026-09-28):** o primeiro caso apareceu (lista do seletor de tema estilizada). Em vez do Select do shadcn/Radix (~25 KiB gzip), foi feito um listbox próprio (~2,3 KiB gzip), por causa do refactor de JavaScript em aberto (`docs/backlog/refactor/2026-09-28-reduzir-js-primeira-carga.md`). Para componentes simples, o componente próprio segue preferível enquanto a meta de Performance estiver apertada.
- **Levado para:** `services/frontend/CLAUDE.md` (Convenções)

### Mudar a arquitetura para recuperar folga de Performance?

- **Status:** resolvida
- **Decisão:** Não. Manter o Next.js com o App Router como está: sem migrar para outro gerador (ex.: Astro), sem remover o runtime do HTML no pós-build e sem orçamento de Lighthouse no CI.
- **Data:** 2026-09-28
- **Motivo:** Decisão do Pedro depois da medição do refactor `docs/backlog/refactor/2026-09-28-reduzir-js-primeira-carga.md`: não há ganho barato dentro do Next (o peso é React DOM + runtime + hidratação), e o ganho real (Performance 100, LCP 1,2 s, TBT 0) exigiria mudar a arquitetura.
- **Consequência aceita:** Performance mobile oscila em torno da meta de 95 do `PRD.md` (91-98 nas medições). Novas seções ou componentes cliente tendem a derrubar a nota; medir antes de entregar (mediana de 3 rodadas).

### Como mostrar os detalhes de cada projeto?

- **Status:** resolvida
- **Decisão:** Drawer por cima da home, aberto por um botão "Ver detalhes" no card: à direita no desktop, bottom sheet no mobile, com link direto por hash (`#projeto-<slug>`). Conteúdo: estudo de caso em texto e stack por camada. Sem JavaScript, o botão some. Feito com `<dialog>` nativo e componente próprio, sem o Drawer do shadcn (Radix/vaul).
- **Data:** 2026-09-29
- **Motivo:** Decisão do Pedro, entre página própria por projeto, detalhes expandidos no card, modal e drawer. O `<dialog>` nativo já dá foco preso, Esc, fundo inerte e volta do foco sem biblioteca; a Performance mobile está no limite da meta (veja a questão acima), então vale a mesma regra do seletor de tema: componente próprio para o que é simples.
- **Levado para:** `docs/features/project-details/`

### Quais projetos pessoais/open source entram na seção de Projetos?

- **Status:** aberta
- **Responsável:** Pedro
- **Contexto:** Hoje só existe o AutoSim (freelance, código fechado). Projetos com repositório público e demo aumentam muito o valor do portfolio para quem avalia código. Em 2026-09-28 decidimos não incluir nenhum por enquanto.
- **Opções:**
  - Selecionar repositórios existentes do GitHub. Candidatos: `java-ecommerce` / `backommerce-api` (Java/Spring Boot), `patas-conectadas-api` + `patas-conectadas-front` (full-stack TypeScript), `authentication-api-template` (NestJS + JWT), `kanban-dashboard`, `rust_webapp`, `smoothvim`
  - Construir 1-2 projetos-vitrine novos
- **Tendência:** Revisitar quando algum repositório tiver README, demo e código que represente bem o nível atual
- **Atualização (2026-09-28):** entrou o Accountability (projeto pessoal em andamento, repositório privado, sem demo), com as informações geradas a partir do próprio repositório. Segue aberta a escolha de projetos com repositório público e demo.
