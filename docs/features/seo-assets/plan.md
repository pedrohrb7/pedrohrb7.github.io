# Plano - SEO e assets

Status: **Em andamento** (implementado e validado localmente; falta conferir no site publicado)

## Fase 1 - Ícones e Open Graph (concluída em 2026-09-28)

- [x] Favicon `public/icon.svg`: monograma "PB" em Geist SemiBold convertido em traçados vetoriais (não depende de fonte instalada), branco sobre o acento, cantos arredondados. Conferido em 16, 32 e 64px sobre fundo claro e escuro.
- [x] `apple-touch-icon.png` (180x180) gerado no build com o mesmo monograma, sem cantos (o iOS aplica a máscara).
- [x] Favicon e apple-touch-icon declarados em `siteIcons` (`src/lib/site-metadata.ts`) e usados nos três layouts raiz: `/`, `/pt/`, `/en/` e a 404. Sem PNG de fallback separado: todos os navegadores atuais aceitam SVG e o Safari antigo usa o apple-touch-icon.
- [x] Imagem Open Graph 1200x630 por idioma (`/pt/og-image.png`, `/en/og-image.png`) gerada no build com `next/og`: título, nome, localização, site e monograma, nas fontes e cores do site. Usada em `og:image` e `twitter:image` (card `summary_large_image`), com texto alternativo no idioma da página.
- [x] E2E (`test/e2e/seo.spec.ts`): ícones nas quatro páginas e servidos como imagem; `og:image`, `og:image:alt`, `twitter:card` e `twitter:image` por idioma, com o PNG respondendo em 1200x630.

Decisão: as imagens são route handlers com `.png` no nome em vez das convenções `icon`/`apple-icon`/`opengraph-image` do Next. No export estático as convenções geram arquivos sem extensão (`out/pt/opengraph-image`), que o GitHub Pages e o nginx servem sem `Content-Type` de imagem.

## Fase 2 - Sitemap e robots (concluída em 2026-09-28)

- [x] `sitemap.xml` com `/pt/` e `/en/` e alternates hreflang, gerado de `locales` e `profile.siteUrl` (`src/app/sitemap.ts`). Não lista `/` nem a 404.
- [x] `robots.txt` permitindo tudo e apontando para o sitemap (`src/app/robots.ts`).
- [x] Conferido no build, no e2e e no container nginx (`text/xml`, `text/plain`).
- [ ] Conferir no GitHub Pages depois do deploy.

## Fase 3 - Auditoria

- [x] Lighthouse mobile e desktop em `/pt/` e `/en/` no container local: tudo >= 95 (veja `lighthouse.md`).
- [x] Corrigido o que ficou abaixo de 95: o `nginx.conf` não comprimia os arquivos, ao contrário do GitHub Pages; `gzip` ligado.
- [ ] Rodar de novo no site publicado e registrar em `lighthouse.md`.
- [x] Atualizar `TASKS.md` e o índice em `docs/features/README.md`.
