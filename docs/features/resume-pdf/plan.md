# Plano - Currículo em PDF

Status: **Próxima**

## Decisão técnica

`@react-pdf/renderer` em Node, no pós-build (veja "Como gerar o PDF do currículo no build?" em `OPEN_QUESTIONS.md`).

## Fase 1 - Geração

- [x] Decidir a abordagem (2026-09-28).
- [ ] Adicionar `@react-pdf/renderer` e um executor de TSX para o script (ex.: `tsx`, que também resolve o alias `@/` do `tsconfig`).
- [ ] Obter a Geist e a Geist Mono em TTF (o `next/font` não serve para o react-pdf) e registrá-las com `Font.register`.
- [ ] Documento do currículo (`Document`/`Page` A4) lendo `getContent(locale)` e `profile`, com cores e espaçamentos derivados dos tokens do `DESIGN_SYSTEM.md`.
- [ ] Script de geração ligado ao `npm run build` (`postbuild`), escrevendo os dois arquivos em `out/`.
- [ ] Teste que extrai o texto dos PDFs e confere nome, título, empresas e ausência de telefone.

## Fase 2 - Link no site

- [ ] Rótulo novo em `Content.ui` (`pt.ts` e `en.ts`).
- [ ] Botão de download no hero.
- [ ] E2E: link presente nas duas páginas e arquivo respondendo como PDF.

## Fase 3 - Publicação

- [ ] Garantir que o CI (`.github/workflows/deploy.yml`) e o `Dockerfile` tenham o necessário para gerar o PDF.
- [ ] Conferir os PDFs publicados em https://pedrohrb7.github.io.
- [ ] Atualizar `PRD.md`, `TASKS.md` e o índice em `docs/features/README.md`.
