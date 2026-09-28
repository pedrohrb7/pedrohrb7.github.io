# Plano - SEO e assets

Status: **Próxima**

## Fase 1 - Ícones e Open Graph

- [ ] Desenhar o favicon (SVG) com o token de acento, legível em 16x16 e nos temas claro e escuro.
- [ ] Publicar favicon, fallback PNG e `apple-touch-icon` em `/`, `/pt/`, `/en/` e na 404.
- [ ] Gerar a imagem Open Graph por idioma no build e referenciá-la no `generateMetadata` de `src/app/[locale]/layout.tsx`.
- [ ] E2E cobrindo ícone e `og:image`.

## Fase 2 - Sitemap e robots

- [ ] `sitemap.xml` com hreflang e `robots.txt`, gerados no build a partir de `locales` e `profile.siteUrl`.
- [ ] Conferir no container nginx e no GitHub Pages.

## Fase 3 - Auditoria

- [ ] Rodar Lighthouse (mobile e desktop) em `/pt/` e `/en/` no site publicado.
- [ ] Corrigir o que ficar abaixo de 95.
- [ ] Registrar o resultado em `lighthouse.md` nesta pasta.
- [ ] Atualizar `TASKS.md` e o índice em `docs/features/README.md`.
