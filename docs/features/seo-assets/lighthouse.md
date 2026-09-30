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
- A meta é atingida na mediana, mas sem folga, e uma rodada de `/pt/` ficou em 94. Veja o refactor `docs/backlog/refactor/2026-09-28-reduzir-js-primeira-carga.md` (descartado).
- Para comparar com versões futuras, rode cada página mobile 3 vezes e use a mediana.

## 2026-09-28 - container local, após copy-email e projects-carousel

- `copy-email`: 3 rodadas mobile em `/pt/`: 95, 95, 97 (mediana 95), CLS 0.
- `projects-carousel` (código do site de ~2,3 para ~3,9 KiB gzip): 6 rodadas mobile em `/pt/`: 96, 94, 94, 95, 98, 97 (mediana 95,5), TBT 160-200 ms, CLS 0. Mesma faixa das medições anteriores; Accessibility, Best Practices e SEO 100.

## 2026-09-28 - container local, com o segundo projeto (Accountability)

- 6 rodadas mobile em `/pt/`: 91, 95, 98, 94, 95, 94 (mediana 94,5), TBT 150-270 ms, LCP 2,6-2,7 s, CLS 0.
- Primeira mediana abaixo da meta (por meio ponto). A página ficou maior com o segundo projeto e a variação continua vindo do TBT. O refactor `docs/backlog/refactor/2026-09-28-reduzir-js-primeira-carga.md` mediu o teto sem o JS do Next (100, LCP 1,2 s, TBT 0), mas a mudança de arquitetura foi descartada: a nota segue oscilando em torno de 95.

## 2026-09-29 - container local, com a estrutura do project-details

- Código do drawer entra no chunk do site mesmo sem projeto com detalhes: de ~3,9 para ~4,9 KiB gzip. Nenhum drawer é renderizado ainda (o conteúdo entra depois).
- 6 rodadas mobile em `/pt/`: 94, 98, 96, 96, 97, 99 (mediana 96,5), TBT 89-175 ms, LCP 1,9-2,7 s, CLS 0. Accessibility, Best Practices e SEO 100. Mesma faixa das medições anteriores.
- Medir de novo quando os estudos de caso entrarem: o texto dos drawers vai no HTML da home e aumenta a hidratação.

## 2026-09-29 - container local, com o primeiro estudo de caso (Plataforma Financeira)

- Terceiro projeto no carrossel, com o drawer de detalhes. HTML de `/pt/` de ~17 para ~21,5 KB gzip.
- 6 rodadas mobile em `/pt/`: 96, 95, 98, 96, 95, 96 (mediana 96), TBT 97-148 ms, LCP 2,3-2,7 s, CLS 0. Accessibility, Best Practices e SEO 100. Mesma faixa das medições anteriores.

## 2026-09-29 - transição na troca de idioma (ui-transitions, fase 1)

- Container, 6 rodadas mobile em `/pt/`: 93, 94, 97, 96, 94, 94 (mediana 94), TBT 168-214 ms, CLS 0. Abaixo da mediana de 96 da medição anterior do mesmo dia, então foi feita uma comparação direta.
- Comparação alternada (A com a regra `@view-transition`, B sem, mesmo build e mesmo servidor `serve`, 5 rodadas cada, intercaladas): A 95, 96, 97, 95, 93 (mediana 95, TBT mediano 173 ms); B 98, 92, 96, 97, 96 (mediana 96, TBT mediano 198 ms). Faixas sobrepostas e TBT melhor em A: a regra não tem efeito mensurável na carga (ela só age numa navegação entre páginas). A diferença é a variação de sempre do TBT nesta máquina.

## 2026-09-29 - transição na troca de tema (ui-transitions, fase 3)

- Poucas linhas a mais no `ThemeSelect` e em `src/lib/theme.ts`; a transição só roda numa escolha do usuário, não na carga.
- Container, 6 rodadas mobile em `/pt/`: 95, 95, 94, 97, 98, 96 (mediana 95,5), TBT 129-182 ms, LCP 1,9-2,7 s, CLS 0. Accessibility, Best Practices e SEO 100.

## 2026-09-29 - microinterações (ui-transitions, fase 2)

- Só CSS e um estado a mais no `CopyField`.
- Container, 6 rodadas mobile em `/pt/`: 96, 99, 99, 97, 97, 94 (mediana 97), TBT 81-187 ms, LCP 1,8-2,7 s, CLS 0. Accessibility, Best Practices e SEO 100.

## 2026-09-29 - entrada das seções ao rolar (ui-transitions, fase 4)

- Só CSS (animação ligada à rolagem nos filhos das seções). O elemento de LCP (parágrafo do Sobre) fica dentro de uma seção animada, então foi feita uma comparação direta.
- Container, 6 rodadas mobile em `/pt/`: 95, 93, 95, 95, 94, 93 (mediana 94,5), TBT 140-217 ms, LCP 2,6-2,8 s, CLS 0. Accessibility, Best Practices e SEO 100.
- Comparação alternada (A com a entrada, B sem, mesmo servidor `serve`, 5 rodadas cada, intercaladas): A 95, 98, 96, 96, 96 (mediana 96, TBT 131-153 ms); B 97, 96, 98, 96, 96 (mediana 96, TBT 143-158 ms). LCP entre 1,9 e 2,6 s nos dois lados, com a mesma oscilação. Sem efeito mensurável; a mediana mais baixa no container é a variação de sempre desta máquina.

## Como rodar

```
cd services && docker compose up -d --build
CHROME_PATH=$(cd frontend && node -e 'import("@playwright/test").then(m=>console.log(m.chromium.executablePath()))') \
  npx lighthouse@13 http://localhost:8080/pt/ --chrome-flags="--headless=new" --view
```

Para desktop, acrescente `--preset=desktop`. Para o site publicado, troque a URL por `https://pedrohrb7.github.io/pt/`.

No WSL, o `chrome-launcher` do Lighthouse supõe um Chrome do Windows e cria, a cada rodada, uma pasta chamada `C:\Users\<usuário>\AppData\Local\lighthouse.<número>` no diretório atual (o Chrome do Playwright é Linux e toma o caminho como relativo). Rode o comando a partir de uma pasta temporária (ex.: `cd /tmp`), não de dentro do repositório, ou apague essas pastas depois.
