# frontend (Frontend)

Site do portfolio: uma página por idioma (`/pt/`, `/en/`) gerada como HTML estático. Contexto do produto: `PRD.md` na raiz.

## Stack

React 19 + TypeScript, Next.js 16 (App Router, `output: "export"`), Tailwind CSS 4. Sem biblioteca de estado ou data fetching: o conteúdo é importado em tempo de build de `src/content/`.

## Pré-requisitos

- Node >= 24.15
- npm >= 11

## Setup

```
npm install
```

Não há `.env`.

## Rodando localmente

```
npm run dev
```

Serve em `http://localhost:3000` (acesse `/pt/` ou `/en/`). Ou, pela raiz do projeto, o build de produção via nginx: `cd services && docker-compose up frontend` (em `http://localhost:8080`).

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
npm run build     # gera out/
npm run preview   # serve out/ em http://localhost:3000, igual ao GitHub Pages
```

## Variáveis de ambiente

| Var | Propósito | Obrigatória |
|---|---|---|
| - | Nenhuma | - |

## Estrutura de pastas e convenções

Veja o `CLAUDE.md` deste serviço.
