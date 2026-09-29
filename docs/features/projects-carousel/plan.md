# Plano - Carrossel de projetos

Status: **Concluída** (2026-09-28, publicada). Ativo no site desde a entrada do Accountability (segundo projeto).

## Fase 1 - Lógica e rótulos (concluída em 2026-09-28)

- [x] `src/lib/carousel.ts`: `currentSlide` (projeto mais próximo da posição do scroll; o último no fim do trilho), `formatPosition`/`formatCounter` (`01 / 03`, largura do total) e `fillTemplate`, com teste unitário.
- [x] Rótulos em `Content.ui.projectsCarousel` (`pt.ts` e `en.ts`), com templates `{n}`/`{total}`.

## Fase 2 - Componente (concluída em 2026-09-28)

- [x] `ProjectCarousel` (cliente) em partes com contexto compartilhado: `ProjectCarousel` (estado), `ProjectCarouselTrack` (trilho scroll-snap, focável, slides com `role="group"`), `ProjectCarouselControls` (contador `aria-live` e setas, no cabeçalho da seção) e `ProjectCarouselIndicators` (barras com área de toque de 24px e dica). Controles só com 2+ projetos e marcados com `data-requires-js`.
- [x] `ProjectCard` (servidor) com índice `[01]`, papel à direita, descrição, destaques e tags no rodapé do card; cards com a mesma altura.
- [x] `ProjectsSection` compõe tudo; `Section` ganhou `aside` (controles à direita do rótulo) e `roleDescription`. `ProjectList` removido.
- [x] Ícones de seta em `src/ui/icons.tsx`.

## Fase 3 - Testes e conferência (concluída em 2026-09-28)

- [x] Decidido testar em navegador real: Vitest browser mode com `@vitest/browser-playwright` (Chromium), projeto `browser` no `vitest.config.ts` para arquivos `*.browser.test.tsx`. O CI instala o Chromium antes do `npm test`.
- [x] `ProjectsSection.browser.test.tsx` com projetos de exemplo: semântica ARIA, botões e indicadores (com a rolagem suave de verdade), pontas desabilitadas, rolagem manual, seta do teclado no trilho, um card por vez no desktop, card seguinte aparecendo no mobile, sem overflow em 360px, e um projeto só sem controles. Estável em 3 rodadas seguidas.
- [x] E2E da página real (`test/e2e/projects.spec.ts`): card do AutoSim sem controles nem `aria-roledescription`, sem overflow.
- [x] Capturas com 3 projetos de exemplo (claro e escuro, desktop e 360px) e da página real.
- [x] Lighthouse no container (6 rodadas mobile em `/pt/`): 94-98, mediana 95,5; mesma faixa de antes (o código do site passou de ~2,3 para ~3,9 KiB gzip). Registrado em `docs/features/seo-assets/lighthouse.md`.

## Ajustes com o segundo projeto (2026-09-28)

- [x] Com o Accountability, os cards de alturas diferentes esticavam até o mais alto e as tags presas no rodapé deixavam um vão de ~300px no card do AutoSim no mobile. Agora cada card tem a própria altura e o trilho tem altura adaptativa (acompanha o card atual). Teste em Chromium novo para a altura; CLS 0 no Lighthouse.
- [x] E2E da página real reescrito para o carrossel com 2 projetos: semântica, contador, botões, indicadores, tradução, sem JS e sem overflow. A posição é conferida na horizontal dentro do trilho (no mobile o card é mais alto que a tela).
- [x] Lighthouse (6 rodadas mobile em `/pt/`): 91-98, mediana 94,5, CLS 0. Meio ponto abaixo da meta: a página ficou maior com o segundo projeto (LCP 2,6-2,7 s) e a variação continua vindo do TBT. Depende do refactor de JavaScript.

## Fase 4 - Fechamento (concluída em 2026-09-28)

- [x] `DESIGN_SYSTEM.md` (padrão do carrossel), índice em `docs/features/README.md` e escopo do `PRD.md`.
- [x] Conferir no site publicado depois do deploy (2026-09-29, funcionando em produção).
