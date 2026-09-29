# CLAUDE.md - Portfolio Pedro Borges

## Visão geral

Portfolio pessoal de Pedro Borges (Desenvolvedor Full-Stack), bilíngue (PT/EN), exportado como site estático e publicado no GitHub Pages em https://pedrohrb7.github.io.

Veja `PRD.md` para o contexto completo do produto.

## Serviços

| Serviço | Stack | Caminho | Convenções |
|---|---|---|---|
| frontend | Next.js 16 (App Router, `output: "export"`) + TypeScript + Tailwind CSS 4 | `services/frontend/` | `services/frontend/CLAUDE.md` |

## Rodando localmente

```
cd services && docker-compose up
```

Sobe o build estático servido por nginx em `http://localhost:8080`. Para desenvolvimento com hot reload, use `npm run dev` dentro de `services/frontend/` (veja o README do serviço). Não há `.env`, banco de dados nem seed.

## Idioma da documentação

- Docs: Portuguese

## Convenções entre serviços

- O conteúdo do currículo (textos, experiências, habilidades) vive em `services/frontend/src/content/` e é a fonte da verdade do site. Toda alteração de conteúdo precisa ser feita em `pt.ts` e `en.ts` juntos.
- Nenhum texto de conteúdo usa travessão (em dash); use hífen simples.
- Nada de runtime de servidor: tudo precisa funcionar como arquivo estático (veja `CONSTRAINTS.md`).

## Testes

- Não há entrypoint de testes na raiz. O CI (`.github/workflows/deploy.yml`) roda lint, typecheck, testes unitários e e2e do `services/frontend` antes de cada deploy.

## Referência

`PRD.md` - o quê e por quê · `docs/features/` - spec e plano de cada feature, com índice e status em `docs/features/README.md` · `docs/backlog/` - bugs (`bugs/`) e refactors (`refactor/`) em aberto, um arquivo datado por item a partir do `TEMPLATE.md` · `wireframe/` - propostas de layout em HTML (referência visual de estrutura; conteúdo fictício, e tokens, fontes e ícones que não valem: a fonte da verdade é o `DESIGN_SYSTEM.md`) · `CONSTRAINTS.md` - limites rígidos · `DESIGN_SYSTEM.md` - tokens/convenções de UI · `OPEN_QUESTIONS.md` - decisões (abertas e resolvidas, cada uma com status) · `DEPLOY.md` - como publicar
