# frontend (Frontend)

Site do portfolio: uma página por idioma (`/pt/`, `/en/`) gerada como HTML estático. Contexto do produto: `PRD.md` na raiz.

## Stack

React 19 + TypeScript, Next.js 16 (App Router, `output: "export"`), Tailwind CSS 4. Sem biblioteca de estado ou data fetching: o conteúdo é importado em tempo de build de `src/content/`.

## Pré-requisitos

- Node na versão do `.nvmrc` da raiz do repositório (hoje 24.21.0), via nvm
- npm >= 11

## Setup

```
nvm use          # na raiz do repositório: ativa a versão do .nvmrc
npm install
```

O `npm install` falha com `EBADENGINE` se o Node ativo não for compatível com o `.nvmrc` (`engine-strict` no `.npmrc`).

Não há `.env`.

## Rodando localmente

```
npm run dev
```

Serve em `http://localhost:3000` (acesse `/pt/` ou `/en/`). No modo dev o botão "Baixar currículo (PDF)" dá 404, porque os PDFs só são gerados no `npm run build`; para testá-lo use `npm run build && npm run preview` ou o container. Ou, pela raiz do projeto, o build de produção via nginx: `cd services && docker-compose up frontend` (em `http://localhost:8080`).

## Testes

```
npm test                          # unitários/componentes (Vitest + Testing Library)
npx playwright install chromium   # uma vez, baixa o navegador
npm run test:e2e                  # Playwright contra o build estático (faz build e sobe o servidor sozinho)
npm run lint
npm run typecheck
```

## Build

```
npm run build     # gera out/, incluindo os currículos em PDF (postbuild)
npm run preview   # serve out/ em http://localhost:3000, igual ao GitHub Pages
```

O `postbuild` grava `out/pedro-borges-curriculo.pdf` (PT) e `out/pedro-borges-resume.pdf` (EN) a partir de `src/content/`. Para regerar só os PDFs depois de um build: `npx tsx scripts/generate-resume-pdf.ts`.

## Variáveis de ambiente

| Var | Propósito | Obrigatória |
|---|---|---|
| - | Nenhuma | - |

## Estrutura de pastas e convenções

Veja o `CLAUDE.md` deste serviço.
