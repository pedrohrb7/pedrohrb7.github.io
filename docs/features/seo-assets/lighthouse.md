# Lighthouse - resultados

Meta (`PRD.md`): >= 95 em Performance, Accessibility, Best Practices e SEO nas duas versões.

## 2026-09-28 - container local

- Lighthouse 13.5.0, Chromium headless do Playwright, throttling simulado padrão (mobile) e `--preset=desktop`.
- Alvo: container nginx (`cd services && docker compose up`) em `http://localhost:8080`, com o build que já inclui favicon, Open Graph, sitemap e robots.

| Página | Dispositivo | Performance | Accessibility | Best Practices | SEO | LCP | TBT |
|---|---|---|---|---|---|---|---|
| `/pt/` | mobile | 96 | 100 | 100 | 100 | 2,3 s | 180 ms |
| `/pt/` | desktop | 100 | 100 | 100 | 100 | 0,5 s | 0 ms |
| `/en/` | mobile | 97 | 100 | 100 | 100 | 2,3 s | 130 ms |
| `/en/` | desktop | 100 | 100 | 100 | 100 | 0,5 s | 0 ms |

Notas:

- A primeira rodada deu Performance 83/84 no mobile porque o `nginx.conf` não comprimia nada, ao contrário do GitHub Pages (que serve com gzip). Com `gzip` ligado no container, o resultado acima passou a ser comparável ao de produção.
- O elemento LCP é o primeiro parágrafo do "Sobre". O que ainda pesa no mobile é o JavaScript do Next, não o conteúdo. (O "~190 KiB não usados" registrado aqui antes foi medido sem gzip; no site publicado são ~135 KiB transferidos e ~55 KiB não usados, veja `docs/backlog/refactor/2026-09-28-reduzir-js-primeira-carga.md`.)

## 2026-09-28 - container local, após ux-enhancements

Mesmo ambiente, com o controle de tema e o destaque do menu (JavaScript novo no header).

| Página | Dispositivo | Performance | Accessibility | Best Practices | SEO | LCP | TBT |
|---|---|---|---|---|---|---|---|
| `/pt/` | mobile | 98 | 100 | 100 | 100 | 1,7 s | 150 ms |
| `/pt/` | desktop | 100 | 100 | 100 | 100 | 0,5 s | 0 ms |
| `/en/` | mobile | 95 | 100 | 100 | 100 | 1,7 s | 240 ms |
| `/en/` | desktop | 100 | 100 | 100 | 100 | 0,5 s | 0 ms |

O TBT no mobile varia entre rodadas (130-240 ms), e é o que separa 95 de 98; `/en/` está no limite da meta.

## 2026-09-28 - site publicado (https://pedrohrb7.github.io)

Mesma versão do Lighthouse e do Chromium, contra o GitHub Pages, com o build que já inclui PDF, SEO, tema e a largura de 1024px (commit `4582f57`).

| Página | Dispositivo | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|---|
| `/pt/` | mobile | 94, 94, 96, 96 (mediana 96 nas 3 últimas) | 100 | 100 | 100 |
| `/pt/` | desktop | 100 | 100 | 100 | 100 |
| `/en/` | mobile | 95, 95, 95, 97 (mediana 95 nas 3 últimas) | 100 | 100 | 100 |
| `/en/` | desktop | 100 | 100 | 100 | 100 |

- Mobile: LCP 2,0-2,3 s, TBT 130-220 ms, FCP 0,9-1,3 s. A variação de Performance vem quase toda do TBT (JavaScript do Next e do header).
- A meta é atingida na mediana, mas sem folga, e uma rodada de `/pt/` ficou em 94. A folga depende do refactor `docs/backlog/refactor/2026-09-28-reduzir-js-primeira-carga.md`.
- Para comparar com versões futuras, rode cada página mobile 3 vezes e use a mediana.

## Como rodar

```
cd services && docker compose up -d --build
CHROME_PATH=$(cd frontend && node -e 'import("@playwright/test").then(m=>console.log(m.chromium.executablePath()))') \
  npx lighthouse@13 http://localhost:8080/pt/ --chrome-flags="--headless=new" --view
```

Para desktop, acrescente `--preset=desktop`. Para o site publicado, troque a URL por `https://pedrohrb7.github.io/pt/`.
