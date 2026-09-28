# Tarefas - Portfolio Pedro Borges

## Em andamento

- [ ] Currículo em PDF por idioma gerado no build a partir de `src/content/` com `@react-pdf/renderer`, com link de download no site (sem telefone) - `docs/features/resume-pdf/`. Geração (fase 1) e botão de download no hero (fase 2) concluídos; falta publicar e conferir no CI e no GitHub Pages (fase 3)
- [ ] SEO e assets - `docs/features/seo-assets/`. Favicon, apple-touch-icon, imagem Open Graph por idioma, `sitemap.xml` e `robots.txt` feitos; Lighthouse local >= 95 em tudo (`lighthouse.md`). Falta conferir no GitHub Pages e rodar o Lighthouse no site publicado

## Próximas

- [ ] Atualizar o `resume.md` do repositório `pedrohrb7/pedrohrb7`: formação concluída, título "Desenvolvedor Full-Stack", Java/Spring Boot no resumo, habilidades reorganizadas

## Backlog

- [ ] Seção de projetos com imagens, links de repositório e demo - `docs/features/projects-showcase/`
- [ ] Dados estruturados JSON-LD (`Person`) nas páginas de idioma (fora do escopo de `docs/features/seo-assets/`)
- [ ] Reduzir o JavaScript da primeira carga (~190 KiB não usados segundo o Lighthouse mobile; veja `docs/features/seo-assets/lighthouse.md`). Prioridade subiu: depois do controle de tema, `/en/` no mobile ficou em 95, no limite da meta
- [ ] `nginx.conf` manda `Cache-Control: immutable` de 1 ano em `/_next/static/`, e o GitHub Pages manda `max-age=600`; decidir se o container deve imitar isso também
- [ ] Escolher projetos públicos para a seção de Projetos (questão em aberto em `OPEN_QUESTIONS.md`) - bloqueia `docs/features/projects-showcase/`
- [ ] Migrar para ESLint 10 e TypeScript 7 quando `eslint-plugin-react` e `typescript-eslint` suportarem (veja `CONSTRAINTS.md`)
- [ ] Resolver o aviso do npm sobre os scripts de instalação do `unrs-resolver` e do `esbuild` (dependência do `tsx`) (aprovar ou confirmar que não são necessários; o `tsx` funciona hoje sem o script do `esbuild`)

## Concluídas

- [x] Largura do conteúdo de 768px para 1024px, como token do design system (`--container-content` / `max-w-content`), mais espaço entre os itens do menu e parágrafos do "Sobre" na largura inteira, alinhados com as outras seções - `docs/features/ux-enhancements/` (2026-09-28)
- [x] Lista de opções do seletor de tema ilegível no tema escuro (texto claro sobre o fundo branco nativo): cores explícitas no `<select>` e nas opções, com e2e - `docs/features/ux-enhancements/` (2026-09-28)
- [x] Melhorias de UX: escolha manual de tema (Sistema/Claro/Escuro, `<select>` pronto para mais temas, sem flash) e destaque da seção atual no menu - `docs/features/ux-enhancements/` (2026-09-28)
- [x] Container: `nginx.conf` com gzip, como o GitHub Pages (sem isso o Lighthouse local dava Performance 83 no mobile) (2026-09-28)
- [x] Geração do PDF decidida: `@react-pdf/renderer` em Node no pós-build, sem Chromium; Playwright descartado (veja `OPEN_QUESTIONS.md`) (2026-09-28)
- [x] Estrutura de features em `docs/features/` (índice com status, `spec.md` + `plan.md` por feature); `docs/modules/` migrado e referências atualizadas (2026-09-28)
- [x] Versão do Node fixada pelo `.nvmrc` (24.21.0) em local (`engine-strict`), Docker e CI, com teste que impede divergência (2026-09-28)
- [x] Questões respondidas: formação concluída em jun/2026, telefone não publicado, PDF gerado no build, manter `pedrohrb7.github.io`; projetos seguem em aberto (2026-09-28)
- [x] Página 404 bilíngue com o layout do site e links para `/pt/` e `/en/` (2026-09-28)
- [x] Habilidades reorganizadas: grupo "Outras tecnologias" removido; Java, Kotlin e PHP em Linguagens, Spring Boot em Back-end, Vue.js em Front-end (2026-09-28)
- [x] Java e Spring Boot mencionados no "Sobre" (2026-09-28)
- [x] Título alterado de "Desenvolvedor Full-Stack JavaScript" para "Desenvolvedor Full-Stack" / "Full-Stack Developer" (2026-09-28)
- [x] Container validado: `nginx.conf` reproduz o GitHub Pages (redirect sem perder a porta e `404.html`) (2026-09-28)
- [x] Primeira publicação: repositório `pedrohrb7/pedrohrb7.github.io` criado, `package-lock.json` commitado, GitHub Pages via Actions no ar em https://pedrohrb7.github.io (2026-09-28)
- [x] Estrutura do projeto, conteúdo PT/EN a partir do `resume.md`, testes unitários e e2e, workflow de deploy (2026-09-28)
