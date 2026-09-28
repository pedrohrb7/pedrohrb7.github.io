# Reduzir o JavaScript da primeira carga

- **Status:** Proposed
- **Opened:** 2026-09-28
- **Scope:** `services/frontend` (build do Next, componentes cliente `ThemeSelect`, `SectionNav` e `LocaleRedirect`, possivelmente `package.json`/`next.config.ts`)

## Motivation

A Performance mobile do Lighthouse no site publicado fica entre 94 e 97 (mediana 96 em `/pt/`, 95 em `/en/`), no limite da meta de 95 do `PRD.md`; uma rodada de `/pt/` já ficou abaixo (94). Accessibility, Best Practices e SEO estão em 100 e o desktop em 100, então o que falta é folga no mobile. A variação vem quase toda do Total Blocking Time (130-220 ms), ou seja, de JavaScript executado na carga. Qualquer JavaScript novo (ex.: um componente interativo em `projects-showcase`) derruba a nota abaixo da meta.

Medições de referência: `docs/features/seo-assets/lighthouse.md` (seção "site publicado").

## Current state

Medido em https://pedrohrb7.github.io/pt/ (mobile, Lighthouse 13.5.0, 2026-09-28):

| Chunk | Conteúdo | Transferido (gzip) | Não usado na carga |
|---|---|---|---|
| `0bma92pht_c97.js` | React DOM | ~69-71 KiB | ~29 KiB |
| `2m912stn0vfa6.js` | Runtime e router do App Router do Next | ~47-48 KiB | ~26 KiB |
| 4 chunks menores | Runtime do Turbopack e código compartilhado | ~15 KiB | - |
| `2p295btb741kd.js` | Código do site: `ThemeSelect`, `SectionNav`, `LocaleRedirect` | ~1 KiB | - |
| **Total** | | **~135 KiB** | **~55 KiB** |

- O chunk do React DOM sozinho gasta ~284 ms de execução no mobile simulado.
- O Lighthouse também aponta ~14 KiB de JavaScript legado (polyfills/transpilação para navegadores antigos).
- Todo o conteúdo é HTML estático; o JavaScript existe para hidratar três componentes pequenos (tema, destaque do menu e redirecionamento de `/`). O código deles é menos de 1% do total.
- O App Router do Next sempre envia o React e o runtime do router, mesmo com poucos componentes cliente; não há opção oficial para páginas sem JavaScript (o `unstable_runtimeJS: false` era do Pages Router).

Correção de registro: o "~190 KiB não usados" citado antes no antigo `TASKS.md` (substituído por `docs/backlog/`) e na primeira rodada do `lighthouse.md` foi medido no container local ainda sem gzip. O número publicado é o da tabela acima.

## Proposed change

Em etapas, medindo (mediana de 3 rodadas mobile por página, no site publicado) depois de cada uma:

1. **Ganhos baratos dentro do Next** (baixo risco):
   - `browserslist` só com navegadores modernos, para cortar os ~14 KiB de JavaScript legado. Conferir antes o que o Next 16 já usa por padrão.
   - Conferir se algum componente cliente puxa dependência desnecessária para o bundle.
2. **Decisão estrutural**, se a etapa 1 não der folga suficiente (meta sugerida: mediana >= 98 no mobile). Opções:
   - **a. Manter o Next e aceitar o custo do framework**, protegendo a meta com um orçamento (ex.: Lighthouse CI no workflow, falhando abaixo de 95). Menor esforço; não ganha folga.
   - **b. Tirar o React do navegador**: trocar os três componentes cliente por scripts pequenos sem framework (o tema já tem o script inline; menu e redirecionamento cabem em poucas linhas) e não carregar o runtime do Next no HTML exportado. O App Router não oferece isso oficialmente, então exigiria pós-processar o `out/` para remover os scripts do Next: frágil a cada atualização do Next.
   - **c. Migrar para um gerador estático sem runtime** (ex.: Astro), mantendo `src/content/`, Tailwind, tokens e testes e2e. Resultado previsível (~5 KiB de JavaScript no total), mas é uma troca de stack: o `CONSTRAINTS.md` registra que o Next não é obrigatório por necessidade técnica, mas foi escolhido por alinhamento com o currículo. Precisa de decisão do Pedro.

   A escolha da etapa 2 vira uma entrada no `OPEN_QUESTIONS.md` (e uma feature em `docs/features/` se for a opção c) antes de qualquer código.

## Risks

- Etapa 1: um `browserslist` muito restrito quebra navegadores ainda comuns (Safari de iPhones antigos). Mitigação: usar a faixa "baseline" atual e testar o e2e em WebKit além do Chromium.
- Opção b: o HTML exportado depende da hidratação para os componentes cliente; remover o runtime sem trocar esses componentes deixa tema e menu sem funcionar. Cada atualização do Next pode mudar o formato do HTML e quebrar o pós-processamento.
- Opção c: reescrever layouts, metadados, geração de imagens OG, sitemap e PDF (o PDF já é independente do Next e se reaproveita). Risco de regressão visual; mitigação pelas capturas e e2e existentes.
- Em todas: a nota do Lighthouse varia entre rodadas; comparar sempre medianas, nunca uma rodada só.

## Out of scope

- Mudanças de conteúdo ou de design.
- Otimização de imagens e fontes (já não pesam: LCP é texto e as fontes são pré-carregadas).
- Performance do desktop (já em 100).
