# Plano - Página do portfolio

Status: **Concluída** (site no ar; os próximos passos viraram features próprias, veja `docs/features/README.md`)

## Fase 1 - Base (concluída em 2026-09-28)

- Estrutura do projeto, Next.js com export estático, Tailwind com tokens.
- Conteúdo PT/EN a partir do `resume.md`.
- Seções, header com seletor de idioma, redirecionamento em `/`.
- Testes: Vitest (i18n, seletor de idioma) e Playwright (roteamento de idioma, seções, overflow horizontal) em desktop e mobile.
- Workflow do GitHub Actions para verificar e publicar no GitHub Pages.

## Fase 2 - Publicação (concluída em 2026-09-28)

- Feito (2026-09-28): repositório criado, `package-lock.json` commitado, Pages configurado e site no ar em https://pedrohrb7.github.io.
- Feito (2026-09-28): container local com `nginx.conf` equivalente ao GitHub Pages; página 404 bilíngue com o layout do site.
- Movido para `docs/features/seo-assets/`: favicon, imagem Open Graph, Lighthouse.

## Fase 3 - Conteúdo e refinamento (concluída em 2026-09-28)

- Feito (2026-09-28): título "Desenvolvedor Full-Stack", Java/Spring Boot no "Sobre", habilidades reorganizadas.
- Feito (2026-09-28): questões de formação, telefone, PDF e domínio resolvidas (veja `OPEN_QUESTIONS.md`). Projetos seguem em aberto.
- Movido para features próprias: currículo em PDF (`docs/features/resume-pdf/`), sitemap (`docs/features/seo-assets/`), seção de projetos rica (`docs/features/projects-showcase/`), tema manual (`docs/features/ux-enhancements/`).

## Fonte do conteúdo

O `resume.md` do repositório de perfil `pedrohrb7/pedrohrb7` foi só o ponto de partida da fase 1. Desde então a fonte da verdade é `services/frontend/src/content/`, e o `resume.md` não é sincronizado: decidido em 2026-09-28 que este projeto não altera arquivos fora dele.
