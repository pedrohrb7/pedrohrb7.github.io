# Plano - Dados estruturados (JSON-LD)

Status: **Backlog**

## Fase 1 - Implementação

- [ ] Função em `src/lib/` que monta o `ProfilePage`/`Person` a partir de `getContent(locale)` e `profile`, com teste unitário.
- [ ] Renderizar o `<script type="application/ld+json">` na página de `[locale]` (conteúdo serializado com `JSON.stringify`, escapando `<` para não fechar a tag).
- [ ] E2E: um bloco por página de idioma, JSON válido, `@type` e nome corretos.

## Fase 2 - Validação e publicação

- [ ] Validar o HTML exportado no Rich Results Test e no validador do schema.org (PT e EN).
- [ ] Conferir no site publicado e rodar o Lighthouse (SEO 100).
- [ ] Atualizar o índice em `docs/features/README.md` e o escopo do `PRD.md`.
