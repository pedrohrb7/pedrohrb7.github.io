# Plano - Currículo em PDF

Status: **Concluída** (2026-09-28, publicada)

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
- [x] Download testado manualmente pelo Pedro em PT e EN: funcionando (2026-09-28).

## Fase 3 - Publicação (concluída em 2026-09-28)

- [x] `Dockerfile` gera os PDFs sem mudança (o `npm run build` dispara o `postbuild`); validado em 2026-09-28.
- [x] Geração no CI (`.github/workflows/deploy.yml`) confirmada: o deploy só publica o `out/` depois do job de verificação, que roda o build; os PDFs estão no ar.
- [x] PDFs publicados em https://pedrohrb7.github.io/pedro-borges-curriculo.pdf e `/pedro-borges-resume.pdf` (200, `application/pdf`), botão presente em `/pt/` e `/en/`; download testado pelo Pedro no site publicado.
- [x] Atualizar `PRD.md` e o índice em `docs/features/README.md`.

## Ajuste - Nome do arquivo (2026-09-29)

- [x] A pedido do Pedro, os dois PDFs passam a se chamar `pedro-borges-fullstack-developer.pdf`, cada um na pasta do idioma: `/pt/pedro-borges-fullstack-developer.pdf` e `/en/pedro-borges-fullstack-developer.pdf` (`resumePdfFileName` e `resumePdfPath` em `src/lib/resume-pdf.ts`; o script grava em `out/<idioma>/`). Nomes antigos removidos, sem cópia.
- [x] E2E atualizado (`href` por idioma, nome do download e resposta `application/pdf`); build, lint, typecheck, unitários e e2e completos passando. Conferido que o PDF de `/pt/` é o PT (`pt-BR`) e o de `/en/` é o EN.
- [ ] Conferir no site publicado depois do deploy.
