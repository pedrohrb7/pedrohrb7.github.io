# Tarefas - Portfolio Pedro Borges

## Em andamento

- [ ] Nenhuma

## Próximas

- [ ] Currículo em PDF por idioma gerado no build a partir de `src/content/`, com link de download no site (sem telefone) - spec em `docs/modules/resume-pdf/`
- [ ] Atualizar o `resume.md` do repositório `pedrohrb7/pedrohrb7`: formação concluída, título "Desenvolvedor Full-Stack", Java/Spring Boot no resumo, habilidades reorganizadas
- [ ] Adicionar favicon e imagem Open Graph (1200x630) por idioma
- [ ] Rodar Lighthouse nas duas versões e registrar o resultado

## Backlog

- [ ] Alternância manual de tema claro/escuro (hoje segue o sistema)
- [ ] Seção de projetos com imagens, links de repositório e demo
- [ ] `sitemap.xml` e `robots.txt` gerados no build
- [ ] Escolher projetos públicos para a seção de Projetos (questão em aberto em `OPEN_QUESTIONS.md`)
- [ ] Destacar a seção atual no menu durante a rolagem
- [ ] Migrar para ESLint 10 e TypeScript 7 quando `eslint-plugin-react` e `typescript-eslint` suportarem (veja `CONSTRAINTS.md`)
- [ ] Resolver o aviso do npm sobre o script de instalação do `unrs-resolver` (aprovar ou confirmar que não é necessário)

## Concluídas

- [x] Versão do Node fixada pelo `.nvmrc` (24.21.0) em local (`engine-strict`), Docker e CI, com teste que impede divergência (2026-09-28)
- [x] Questões respondidas: formação concluída em jun/2026, telefone não publicado, PDF gerado no build, manter `pedrohrb7.github.io`; projetos seguem em aberto (2026-09-28)
- [x] Página 404 bilíngue com o layout do site e links para `/pt/` e `/en/` (2026-09-28)
- [x] Habilidades reorganizadas: grupo "Outras tecnologias" removido; Java, Kotlin e PHP em Linguagens, Spring Boot em Back-end, Vue.js em Front-end (2026-09-28)
- [x] Java e Spring Boot mencionados no "Sobre" (2026-09-28)
- [x] Título alterado de "Desenvolvedor Full-Stack JavaScript" para "Desenvolvedor Full-Stack" / "Full-Stack Developer" (2026-09-28)
- [x] Container validado: `nginx.conf` reproduz o GitHub Pages (redirect sem perder a porta e `404.html`) (2026-09-28)
- [x] Primeira publicação: repositório `pedrohrb7/pedrohrb7.github.io` criado, `package-lock.json` commitado, GitHub Pages via Actions no ar em https://pedrohrb7.github.io (2026-09-28)
- [x] Estrutura do projeto, conteúdo PT/EN a partir do `resume.md`, testes unitários e e2e, workflow de deploy (2026-09-28)
