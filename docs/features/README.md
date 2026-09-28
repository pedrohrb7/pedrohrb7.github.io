# Features - Portfolio Pedro Borges

Mapa das funcionalidades do site: o que já existe e os próximos passos. Cada feature tem uma pasta com dois arquivos:

- `spec.md` - o quê: comportamento, conteúdo, critérios de aceite e o que fica fora.
- `plan.md` - como e quando: fases, status de cada passo e decisões pendentes.

## Índice

| Feature | Status | Resumo | Depende de |
|---|---|---|---|
| [portfolio](portfolio/spec.md) | Concluída (v1 no ar) | Página única por idioma com as seções do currículo e seletor PT/EN | - |
| [resume-pdf](resume-pdf/spec.md) | Próxima | Currículo em PDF por idioma gerado no build a partir de `src/content/` | - |
| [seo-assets](seo-assets/spec.md) | Próxima | Favicon, imagem Open Graph, `sitemap.xml`, `robots.txt` e auditoria Lighthouse | - |
| [projects-showcase](projects-showcase/spec.md) | Bloqueada | Seção de projetos com imagem, repositório e demo | Questão de projetos em `OPEN_QUESTIONS.md` |
| [ux-enhancements](ux-enhancements/spec.md) | Backlog | Alternância manual de tema e destaque da seção atual no menu | - |

## Status

- **Backlog** - mapeada, sem prioridade definida.
- **Próxima** - priorizada; é a próxima a entrar em andamento.
- **Em andamento** - tem passo aberto no `plan.md` e item em "Em andamento" no `TASKS.md`.
- **Bloqueada** - depende de uma decisão ou de outra feature (coluna "Depende de").
- **Concluída** - todos os passos do `plan.md` feitos e testados.

## Convenções

- Nome da pasta em inglês e kebab-case; conteúdo em português.
- Nova feature: crie a pasta com `spec.md` e `plan.md`, adicione uma linha no índice acima, uma linha no escopo do `PRD.md` e os itens no `TASKS.md` apontando para a pasta.
- Ao mudar de status, atualize o índice, o `plan.md` e o `TASKS.md` juntos.
- Decisões em aberto de uma feature vão para o `OPEN_QUESTIONS.md` da raiz; o `plan.md` só aponta para elas.
- Tudo que uma feature fizer precisa respeitar o `CONSTRAINTS.md` (site 100% estático, paridade PT/EN, sem telefone).
