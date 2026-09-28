# Plano - Página do portfolio

## Fase 1 - Base (concluída em 2026-09-28)

- Estrutura do projeto, Next.js com export estático, Tailwind com tokens.
- Conteúdo PT/EN a partir do `resume.md`.
- Seções, header com seletor de idioma, redirecionamento em `/`.
- Testes: Vitest (i18n, seletor de idioma) e Playwright (roteamento de idioma, seções, overflow horizontal) em desktop e mobile.
- Workflow do GitHub Actions para verificar e publicar no GitHub Pages.

## Fase 2 - Publicação (em andamento)

- Feito (2026-09-28): repositório criado, `package-lock.json` commitado, Pages configurado e site no ar em https://pedrohrb7.github.io.
- Feito (2026-09-28): container local com `nginx.conf` equivalente ao GitHub Pages; página 404 bilíngue com o layout do site.
- Pendente: favicon, imagem Open Graph, Lighthouse.

## Fase 3 - Conteúdo e refinamento

- Feito (2026-09-28): título "Desenvolvedor Full-Stack", Java/Spring Boot no "Sobre", habilidades reorganizadas.
- Feito (2026-09-28): questões de formação, telefone, PDF e domínio resolvidas (veja `OPEN_QUESTIONS.md`). Projetos seguem em aberto.
- Currículo em PDF gerado no build (módulo próprio: `docs/modules/resume-pdf/`).
- Itens do backlog em `TASKS.md` (tema manual, sitemap, seção de projetos rica).
