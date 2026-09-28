# Plano - Currículo em PDF

Status: **Em andamento** (fases 1 e 2 concluídas; falta publicar)

## Decisão técnica

`@react-pdf/renderer` em Node, no pós-build (veja "Como gerar o PDF do currículo no build?" em `OPEN_QUESTIONS.md`).

## Fase 1 - Geração (concluída em 2026-09-28)

- [x] Decidir a abordagem (2026-09-28).
- [x] `@react-pdf/renderer` e `tsx` (executa o script em TSX e resolve o alias `@/`) como dependências de desenvolvimento.
- [x] Geist e Geist Mono em TTF vindas do pacote `geist` (versionado no `package.json`, sem binário no repositório), registradas em `src/pdf/fonts.ts`.
- [x] Documento A4 em `src/pdf/ResumeDocument.tsx` lendo `getContent(locale)` e `profile`; cores do tema claro vindas de `src/styles/tokens.ts` (o teste `tokens.test.ts` compara com `tokens.css`). Rodapé com nome, site e número de página.
- [x] `scripts/generate-resume-pdf.ts` no `postbuild`, escrevendo `out/pedro-borges-curriculo.pdf` e `out/pedro-borges-resume.pdf` (nomes em `src/lib/resume-pdf.ts`). Cada PDF tem 2 páginas e ~48 KB.
- [x] `src/pdf/render.test.ts` extrai o texto (`unpdf`) e confere nome, título, contatos, seções, entradas, ausência de telefone e no máximo 2 páginas.
- [x] Validado no build local, no e2e (que roda o build) e no container nginx (`application/pdf`, 200).

## Fase 2 - Link no site (concluída em 2026-09-28)

- [x] Rótulo `resumeCta` em `Content.ui`: "Baixar currículo (PDF)" / "Download resume (PDF)".
- [x] `ButtonLink` ganhou a prop `download`.
- [x] Botão no hero apontando para `resumePdfPath(locale)`. A partir de `md`, os links de contato (e-mail, GitHub, LinkedIn) ficam à esquerda e o PDF à direita; abaixo de `md`, o PDF desce para a linha de baixo, alinhado à esquerda.
- [x] E2E (desktop e mobile): link com o `href` do idioma, clique dispara o download com o nome certo e o arquivo responde 200 com `application/pdf` e começa com `%PDF-`.
- [x] Conferido em captura de tela a 1280, 768, 767 e 360px, e no container nginx.

## Fase 3 - Publicação

- [x] `Dockerfile` gera os PDFs sem mudança (o `npm run build` dispara o `postbuild`); validado em 2026-09-28.
- [ ] Confirmar a geração no CI (`.github/workflows/deploy.yml`) no primeiro push; o workflow já roda `npm run build` via e2e, sem mudança prevista.
- [ ] Conferir os PDFs publicados em https://pedrohrb7.github.io.
- [ ] Atualizar `PRD.md`, `TASKS.md` e o índice em `docs/features/README.md`.
