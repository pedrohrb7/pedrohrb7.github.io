# Plano - Seção de projetos rica

Status: **Bloqueada** (aguarda a questão de projetos em `OPEN_QUESTIONS.md`). A apresentação em carrossel é a feature `docs/features/projects-carousel/`, que não depende desta.

## Fase 0 - Seleção

- [ ] Resolver a questão de projetos em `OPEN_QUESTIONS.md` (repositórios existentes ou projetos-vitrine novos).
- [ ] Para cada projeto escolhido: README, demo publicada e screenshot.
- [x] Accountability adicionado ao conteúdo nos dois idiomas, depois do AutoSim (2026-09-28). Repositório privado e sem demo, então sem links; screenshot sugerido (Perfil > Cadastros, 2560x1440) e texto alternativo guardados abaixo para quando a imagem for implementada.
  - Alt (PT): "Tela de cadastros do Accountability com a lista de contas bancárias e a renda mensal do usuário."
  - Alt (EN): "Accountability registrations screen showing the user's bank accounts and monthly income."
  - Destaque alternativo, fora por ora para manter quatro: "Implementei a exclusão de conta com exportação dos dados do usuário em PDF e confirmação por código, executada automaticamente em segundo plano após 2 horas." / "Implemented account deletion with a PDF export of the user's data and code confirmation, with automatic background execution after 2 hours."

## Fase 1 - Modelo de conteúdo

- [ ] Campos opcionais `repoUrl`, `demoUrl` e `image` no tipo `Project`.
- [ ] Rótulos novos em `Content.ui` (`pt.ts` e `en.ts`).
- [ ] Conteúdo dos projetos escolhidos nos dois idiomas.

## Fase 2 - Interface

- [ ] Links de repositório/demo e imagem no card do carrossel (`docs/features/projects-carousel/`).
- [ ] Teste de componente com e sem links/imagem; e2e sem overflow em 360px.
- [ ] Revisar tokens no `DESIGN_SYSTEM.md` se surgir algo novo (ex.: proporção de imagem).

## Fase 3 - Fechamento

- [ ] Rodar Lighthouse de novo e atualizar `docs/features/seo-assets/lighthouse.md`.
- [ ] Atualizar o índice em `docs/features/README.md` e o escopo do `PRD.md`.
