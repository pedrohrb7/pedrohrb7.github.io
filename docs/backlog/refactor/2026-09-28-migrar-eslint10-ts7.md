# Migrar para ESLint 10 e TypeScript 7

- **Status:** Proposed
- **Opened:** 2026-09-28
- **Scope:** `services/frontend/package.json`, `package-lock.json`, `eslint.config.mjs`, `CONSTRAINTS.md`, `services/frontend/CLAUDE.md`

## Motivation

O projeto está fixado em TypeScript 6.x e ESLint 9.x (veja `CONSTRAINTS.md`) enquanto o ecossistema de lint não suporta as versões novas. Ficar para trás aumenta o salto de uma migração futura e impede usar melhorias das versões novas.

## Current state

Versões em 2026-09-28:

| Pacote | Usado | Última | Bloqueio |
|---|---|---|---|
| `typescript` | 6.0.3 | 7.0.2 | `typescript-eslint` 8.71.0 exige `typescript >=4.8.4 <6.1.0` |
| `eslint` | 9.39.5 | 10.11.0 | `eslint-plugin-react` 7.37.5 aceita só até `eslint ^9.7` (o `typescript-eslint` já aceita `^10.0.0`) |

Os dois vêm via `eslint-config-next` 16.3.6.

## Proposed change

1. Acompanhar os lançamentos de `typescript-eslint` (suporte a TS 7) e `eslint-plugin-react` (suporte a ESLint 10), e a versão do `eslint-config-next` que os adotar.
2. Quando os dois suportarem, atualizar `typescript`, `eslint` e `eslint-config-next` juntos, rodar `npm run lint`, `npm run typecheck`, `npm test` e `npm run test:e2e`, e corrigir o que mudar.
3. Tirar a restrição de versão do `CONSTRAINTS.md` e a pegadinha correspondente do `services/frontend/CLAUDE.md`.

TS 7 e ESLint 10 podem ser migrados em momentos diferentes, cada um quando o seu bloqueio sair.

## Risks

- TS 7 pode endurecer checagens e gerar erros de tipo novos; o `typecheck` do CI pega.
- ESLint 10 pode mudar regras padrão ou o formato da config; conferir o `eslint.config.mjs`.
- Forçar a migração antes do suporte (com `overrides` ou `--legacy-peer-deps`) quebra o lint de forma silenciosa ou instável; não fazer.

## Out of scope

- Mudar o conjunto de regras de lint do projeto.
- Atualizar o Next ou o React.
