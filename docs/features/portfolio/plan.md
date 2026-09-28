# Plano - Página do portfolio

Status: **Em andamento** (site no ar; falta sincronizar a fonte do conteúdo, fase 4. Os demais próximos passos viraram features próprias, veja `docs/features/README.md`)

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

## Fase 4 - Sincronizar a fonte do conteúdo (próxima)

O conteúdo do site foi derivado do `resume.md` do repositório de perfil `pedrohrb7/pedrohrb7`, mas as mudanças da fase 3 foram feitas só em `src/content/`.

- [ ] Atualizar o `resume.md` do repositório `pedrohrb7/pedrohrb7`: formação concluída, título "Desenvolvedor Full-Stack", Java/Spring Boot no resumo, habilidades reorganizadas.
