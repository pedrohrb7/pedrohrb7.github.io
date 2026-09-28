# Plano - Seção de projetos rica

Status: **Bloqueada** (aguarda a questão de projetos em `OPEN_QUESTIONS.md`)

## Fase 0 - Seleção

- [ ] Resolver a questão de projetos em `OPEN_QUESTIONS.md` (repositórios existentes ou projetos-vitrine novos).
- [ ] Para cada projeto escolhido: README, demo publicada e screenshot.

## Fase 1 - Modelo de conteúdo

- [ ] Campos opcionais `repoUrl`, `demoUrl` e `image` no tipo `Project`.
- [ ] Rótulos novos em `Content.ui` (`pt.ts` e `en.ts`).
- [ ] Conteúdo dos projetos escolhidos nos dois idiomas.

## Fase 2 - Interface

- [ ] Imagem e links no card de `ProjectList`.
- [ ] Teste de componente e e2e (desktop e mobile, sem overflow).
- [ ] Revisar tokens no `DESIGN_SYSTEM.md` se surgir algo novo (ex.: proporção de imagem).

## Fase 3 - Fechamento

- [ ] Rodar Lighthouse de novo e atualizar `docs/features/seo-assets/lighthouse.md`.
- [ ] Atualizar o índice em `docs/features/README.md` e o escopo do `PRD.md`.
