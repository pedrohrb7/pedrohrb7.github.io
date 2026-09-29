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

Serve em `http://localhost:3000` (acesse `/pt/` ou `/en/`), com hot reload. No modo dev o botão "Baixar currículo (PDF)" dá 404, porque os PDFs só são gerados no `npm run build`; para testá-lo use `npm run build && npm run preview` ou o container de produção.

Pelo Docker, a partir de `services/`:

```
docker compose up frontend-dev       # dev com hot reload em http://localhost:3000 (código montado, sem Node no host)
docker compose up -d --build         # build de produção via nginx em http://localhost:8080 (igual ao GitHub Pages)
```

O `frontend-dev` usa o estágio `dev` do `Dockerfile`, com `node_modules` e `.next` em volumes do container (binários do Alpine, não os do host), e roda como o usuário `node` (uid 1000). Se `package.json` mudar, reconstrua com `docker compose build frontend-dev`. O de produção só muda com `--build`, porque o texto entra no HTML durante o build.

Pare o servidor de dev (`npm run dev` ou `frontend-dev`) antes de `npm run test:e2e`: o e2e usa a porta 3000 e, fora do CI, reaproveita o que já estiver nela, testando o modo dev em vez do build estático.

## Testes

```
npx playwright install chromium   # uma vez, baixa o navegador (usado pelo npm test e pelo e2e)
npm test                          # Vitest: unitários em jsdom + componentes no Chromium (*.browser.test.tsx)
npx vitest run --project unit     # só os unitários, sem navegador
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
