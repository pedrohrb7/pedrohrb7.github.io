# Decidir os scripts de instalação do npm (unrs-resolver e esbuild)

- **Status:** Proposed
- **Opened:** 2026-09-28
- **Scope:** `services/frontend/package.json` (campo `allowScripts`) ou `.npmrc`, CI e `Dockerfile` (confirmar que nada muda)

## Motivation

Todo `npm install`/`npm ci` avisa que há scripts de instalação sem decisão, o que polui a saída e esconde avisos que importam. Hoje eles simplesmente não rodam, e não está registrado se isso é seguro.

## Current state

`npm install-scripts ls` em 2026-09-28:

```
2 packages have install scripts not yet covered by allowScripts:
  esbuild@0.28.2 (postinstall: node install.js)
  unrs-resolver@1.12.2 (postinstall: node postinstall.js)
```

- `esbuild` vem do `tsx` (usado no `postbuild` que gera os PDFs). O `tsx` funciona sem o script: o binário vem do pacote opcional da plataforma (`@esbuild/linux-x64`), e o `postinstall` só otimiza/valida esse binário. Build local, CI e Docker (Alpine) geram os PDFs normalmente.
- `unrs-resolver` vem do `eslint-config-next` (resolvedor de imports do lint). O lint passa sem o script.

## Proposed change

1. Ler o que cada script faz na versão instalada (`node_modules/esbuild/install.js`, `node_modules/unrs-resolver/postinstall.js`).
2. Para cada um, `npm install-scripts approve <pkg>` se o script for necessário ou inofensivo e útil, ou `npm install-scripts deny <pkg>` se não for necessário. Sugestão inicial: `deny` nos dois, já que tudo funciona sem eles em local, CI e Docker.
3. Commitar a decisão (o npm grava no `package.json`) e confirmar que `npm ci` fica sem aviso em local, CI e `docker compose build`.

## Risks

- `deny` num script que um dia passe a ser necessário (ex.: nova versão do `esbuild` sem o binário no pacote opcional) quebra o `postbuild`. Mitigação: o CI roda o build e o e2e, então falharia no PR da atualização.
- `approve` executa código de terceiros na instalação; só aprovar depois de ler o script.

## Out of scope

- Trocar o `tsx` ou o `eslint-config-next` por alternativas sem scripts de instalação.
