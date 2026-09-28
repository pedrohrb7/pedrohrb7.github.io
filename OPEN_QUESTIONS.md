# Questões em aberto - Portfolio Pedro Borges

## Em aberto

### A graduação em Análise e Desenvolvimento de Sistemas já foi concluída?

- **Status:** open
- **Owner:** Pedro
- **Context:** O `resume.md` indica "Jan 2025 - Jun 2026 (em andamento)", mas junho de 2026 já passou. O site hoje mostra apenas "Jan 2025 - Jun 2026", sem status.
- **Options:**
  - Marcar como concluída
  - Manter "em andamento" com nova previsão
- **Leaning:** -

### O telefone deve aparecer no site?

- **Status:** open
- **Owner:** Pedro
- **Context:** O `resume.md` tem telefone, mas um site público é indexado e coletado por bots. Hoje o site mostra só e-mail, GitHub e LinkedIn.
- **Options:**
  - Não publicar (atual)
  - Publicar só no PDF do currículo
- **Leaning:** Não publicar

### Oferecer download do currículo em PDF?

- **Status:** open
- **Owner:** Pedro
- **Context:** Recrutadores costumam pedir o PDF. Exige manter um PDF por idioma sincronizado com o conteúdo do site.
- **Options:**
  - PDF estático em `public/` (manual)
  - Gerar o PDF a partir do conteúdo no build (ex.: Playwright `page.pdf()`)
  - Não oferecer
- **Leaning:** Gerar no build, para nunca divergir do site

### Quais projetos pessoais/open source entram na seção de Projetos?

- **Status:** open
- **Owner:** Pedro
- **Context:** Hoje só existe o AutoSim (freelance, código fechado). Projetos com repositório público e demo aumentam muito o valor do portfolio para quem avalia código.
- **Options:**
  - Selecionar repositórios existentes do GitHub
  - Construir 1-2 projetos-vitrine novos
- **Leaning:** -

### Usar domínio próprio?

- **Status:** open
- **Owner:** Pedro
- **Context:** `pedrohrb7.github.io` funciona sem custo; um domínio próprio é mais memorável. GitHub Pages suporta via arquivo `CNAME`.
- **Options:**
  - Manter `pedrohrb7.github.io`
  - Registrar domínio próprio
- **Leaning:** -

## Resolvidas

### Stack e hospedagem

- **Decision:** Next.js + TypeScript + Tailwind, export estático, GitHub Pages no repositório `pedrohrb7.github.io`, npm, Vitest + Playwright.
- **Date:** 2026-09-28
- **Rationale:** Alinhado à stack do currículo; custo zero; deploy automático via GitHub Actions.
- **Promoted to:** `CONSTRAINTS.md`

### Idiomas

- **Decision:** PT e EN com seletor no header; `/` detecta o idioma do navegador e usa `pt` como padrão.
- **Date:** 2026-09-28
- **Rationale:** Amplia o alcance para vagas remotas internacionais.
- **Promoted to:** `CONSTRAINTS.md`
