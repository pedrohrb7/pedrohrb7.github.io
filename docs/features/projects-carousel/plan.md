# Plano - Carrossel de projetos

Status: **Próxima**

## Fase 1 - Lógica e rótulos

- [ ] Funções puras em `src/lib/` (índice atual pelo `scrollLeft` e largura do card, formatação do contador) com teste unitário.
- [ ] Rótulos em `Content.ui` (`pt.ts` e `en.ts`): região, anterior, próximo, "N de M", "Ir para o projeto N", dica de deslize.

## Fase 2 - Componente

- [ ] `ProjectCarousel` (cliente): trilho com scroll-snap, botões, contador e indicadores; controles só com 2+ projetos e só com JS.
- [ ] Card com índice, papel à direita, descrição, destaques, tags; espaço para links e imagem de `projects-showcase`.
- [ ] Substituir `ProjectList` na página de `[locale]`.
- [ ] Ícones anterior/próximo como SVG inline, junto dos outros ícones.

## Fase 3 - Testes e conferência

- [ ] Unitário do componente com 1 e 3 projetos de exemplo: controles, pontas, contador, indicadores, `aria-*`.
- [ ] E2E (desktop e mobile): botões, indicadores, deslize, teclado, sem JS, sem overflow em 360px. Como o conteúdo real tem 1 projeto, o e2e do carrossel com vários projetos roda numa página de teste ou com o conteúdo de exemplo injetado; decidir na implementação sem publicar página de teste no site.
- [ ] Capturas de tela: claro e escuro, desktop e 360px.
- [ ] Lighthouse (mediana de 3 rodadas mobile) e registro em `docs/features/seo-assets/lighthouse.md`.

## Fase 4 - Fechamento

- [ ] Atualizar `DESIGN_SYSTEM.md` (padrão do carrossel), o índice em `docs/features/README.md` e o escopo do `PRD.md`.
