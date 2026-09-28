# Spec - SEO e assets

## O que faz

Completa o que buscadores, redes sociais e navegadores esperam de um site publicado, e mede a qualidade contra o critério de sucesso do `PRD.md` (Lighthouse >= 95).

## Itens

| Item | Resultado esperado |
|---|---|
| Favicon | Ícone em SVG (com fallback PNG e `apple-touch-icon` 180x180) em todas as páginas, incluindo `/` e a 404. Usa o token de acento. |
| Imagem Open Graph | Uma imagem 1200x630 por idioma (nome, título e URL), referenciada em `og:image` e `twitter:image` de `/pt/` e `/en/`. Gerada no build, sem arquivo editado à mão por idioma. |
| `sitemap.xml` | Lista `/pt/` e `/en/` com `xhtml:link` hreflang entre elas. Não lista `/` (é `noindex`) nem a 404. |
| `robots.txt` | Permite tudo e aponta para o `sitemap.xml`. |
| Lighthouse | Performance, Accessibility, Best Practices e SEO >= 95 em `/pt/` e `/en/`, mobile e desktop. |

## Restrições

- Tudo gerado como arquivo estático no `out/` (`output: "export"`); rotas de metadados do Next (`icon`, `opengraph-image`, `sitemap`, `robots`) só se funcionarem no export estático.
- Com dois layouts raiz (`[locale]` e `(root)`) e a `global-not-found`, confirmar que o favicon aparece nas três.
- Texto da imagem OG vem de `Content` e `profile.ts`, nunca hardcoded.

## Critérios de aceite

- E2E: as duas páginas têm `link[rel=icon]`, `og:image` com URL absoluta e imagem respondendo 200.
- `out/sitemap.xml` e `out/robots.txt` existem e são válidos.
- Resultado do Lighthouse registrado em `docs/features/seo-assets/lighthouse.md` (data, versão, notas por página e dispositivo).

## Fora de escopo

- Dados estruturados (JSON-LD `Person`) - candidato a uma fase futura.
- Monitoramento contínuo de Lighthouse no CI.
