# Features - Portfolio Pedro Borges

Mapa das funcionalidades do site: o que já existe e os próximos passos. Cada feature tem uma pasta com dois arquivos:

- `spec.md` - o quê: comportamento, conteúdo, critérios de aceite e o que fica fora.
- `plan.md` - como e quando: fases, status de cada passo e decisões pendentes.

## Índice

| Feature                                        | Status               | Resumo                                                                         | Depende de                                 |
| ---------------------------------------------- | -------------------- | ------------------------------------------------------------------------------ | ------------------------------------------ |
| [portfolio](portfolio/spec.md)                 | Concluída (no ar)    | Página única por idioma com as seções do currículo e seletor PT/EN             | -                                          |
| [resume-pdf](resume-pdf/spec.md)               | Concluída (no ar)    | Currículo em PDF por idioma gerado no build a partir de `src/content/`         | -                                          |
| [seo-assets](seo-assets/spec.md)               | Concluída (no ar)    | Favicon, imagem Open Graph, `sitemap.xml`, `robots.txt` e auditoria Lighthouse | -                                          |
| [projects-showcase](projects-showcase/spec.md) | Bloqueada            | Seção de projetos com imagem, repositório e demo                               | Questão de projetos em `OPEN_QUESTIONS.md` |
| [ux-enhancements](ux-enhancements/spec.md)     | Concluída (no ar)    | Escolha manual de tema e destaque da seção atual no menu                       | -                                          |
| [structured-data](structured-data/spec.md)     | Backlog              | Dados estruturados JSON-LD (`ProfilePage`/`Person`) nas páginas de idioma      | -                                          |
| [projects-carousel](projects-carousel/spec.md) | Concluída (no ar)    | Seção Projetos como carrossel (scroll-snap, setas, indicadores, sem biblioteca) | -                                          |
| [copy-email](copy-email/spec.md)               | Concluída (no ar)    | E-mail em campo com botão de copiar no hero e no Contato, sem `mailto:`        | -                                          |
| [project-details](project-details/spec.md)     | Concluída (no ar)    | Drawer com estudo de caso e stack por camada, aberto pelo card do projeto       | -                                          |
| [ui-transitions](ui-transitions/spec.md)       | Em andamento (no ar) | Transições na troca de idioma e de tema, entrada das seções, microinterações, modal e drawer; falta validar no Safari | -                                          |

## Status

- **Backlog** - mapeada, sem prioridade definida.
- **Próxima** - priorizada; é a próxima a entrar em andamento.
- **Em andamento** - tem passo aberto no `plan.md` sendo trabalhado.
- **Bloqueada** - depende de uma decisão ou de outra feature (coluna "Depende de").
- **Concluída** - todos os passos do `plan.md` feitos e testados.

## Convenções

- Nome da pasta em inglês e kebab-case; conteúdo em português.
- Nova feature: crie a pasta com `spec.md` e `plan.md`, adicione uma linha no índice acima e uma linha no escopo do `PRD.md`.
- Ao mudar de status, atualize o índice e o `plan.md` juntos. Este índice é o painel do trabalho em features; bugs e refactors ficam em `docs/backlog/`.
- Decisões em aberto de uma feature vão para o `OPEN_QUESTIONS.md` da raiz; o `plan.md` só aponta para elas.
- Tudo que uma feature fizer precisa respeitar o `CONSTRAINTS.md` (site 100% estático, paridade PT/EN, sem telefone).
