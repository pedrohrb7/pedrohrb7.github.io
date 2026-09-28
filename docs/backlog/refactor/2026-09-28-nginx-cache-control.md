# Alinhar o Cache-Control do container com o GitHub Pages

- **Status:** Proposed
- **Opened:** 2026-09-28
- **Scope:** `services/frontend/nginx.conf`, `services/frontend/CLAUDE.md` (pegadinha do container)

## Motivation

O container existe para reproduzir o GitHub Pages localmente (redirects, `404.html`, gzip). No cache ele diverge: o nginx declara os arquivos de `/_next/static/` como imutáveis por um ano, e o GitHub Pages manda `max-age=600` para tudo. Uma medição local de cache ou de visita repetida (Lighthouse, testes manuais) não representa a produção.

## Current state

Medido em 2026-09-28 no mesmo chunk de `/_next/static/chunks/`:

| Ambiente | `Cache-Control` |
|---|---|
| GitHub Pages (`https://pedrohrb7.github.io`) | `max-age=600` (também em `/pt/`), com `ETag` e `Last-Modified` |
| Container (`nginx.conf`) | `public, max-age=31536000, immutable` |

O GitHub Pages não permite configurar cabeçalhos, então a produção não vai mudar.

## Proposed change

Remover o bloco `location /_next/static/` com o `add_header Cache-Control` do `nginx.conf` e deixar `expires 10m` (que gera `max-age=600`) para todas as respostas, como o GitHub Pages. Conferir com `curl -sI` que HTML, chunks, PDFs e imagens saem com `max-age=600` e `ETag`, e atualizar a lista do que o container imita no `services/frontend/CLAUDE.md`.

Alternativa descartável: manter o `immutable` por ser a configuração "ideal" para arquivos com hash. Não serve ao propósito do container, que é imitar a produção, não otimizá-la.

## Risks

- Nenhum para a produção (o `nginx.conf` só é usado localmente).
- Localmente, visitas repetidas passam a revalidar os chunks a cada 10 min, igual à produção; é o comportamento desejado.

## Out of scope

- Hospedagem com controle de cabeçalhos (sair do GitHub Pages).
