# Plano - Transições de interface

Status: **Em andamento** (as cinco fases concluídas e publicadas; conferidas no site publicado e validadas no Firefox; falta validar no Safari)

Cada fase é independente e pode ser entregue sozinha. A ordem sugerida vai do menor risco e custo para o maior.

## Fase 1 - Troca de idioma (só CSS) (concluída em 2026-09-29)

- [x] `@view-transition { navigation: auto; }` no `globals.css`, dentro de `@media (prefers-reduced-motion: no-preference)`. Como os três layouts raiz importam o `globals.css`, a regra vale para `/pt/`, `/en/`, a 404 e o redirecionamento de `/`. O build (Lightning CSS) mantém a regra.
- [x] Fade em sequência, não cruzado: a página antiga some em 100 ms e a nova entra em 180 ms, começando aos 80 ms. Com o fade cruzado padrão, as capturas no meio da transição (animação desacelerada 20x pelo protocolo do Chrome) mostravam as duas páginas sobrepostas: a nova abre no topo e a antiga podia estar rolada, e todos os textos mudam de idioma.
- [x] `view-transition-name` no header avaliado e descartado: com o fade cruzado, os textos do menu em PT e EN apareciam um sobre o outro; com o fade em sequência, o nome próprio não muda nada, então saiu para simplificar.
- [x] E2E (`test/e2e/transitions.spec.ts`, desktop e mobile): a troca PT -> EN revela a página com transição (evento `pagereveal`), a primeira carga não anima, a animação termina e, com `reducedMotion: "reduce"`, a troca não tem transição. Suíte completa passando.
- [x] Lighthouse: sem efeito mensurável (comparação alternada com e sem a regra, 5 rodadas cada: medianas 95 e 96, faixas sobrepostas). Detalhes em `docs/features/seo-assets/lighthouse.md`.
- [x] Conferido no site publicado (2026-09-29, validado pelo Pedro).
- [x] Validado no Firefox pelo Pedro (2026-09-30).
- [ ] Conferir no Safari (só o Chromium está instalado aqui).

## Fase 2 - Microinterações (só CSS) (concluída em 2026-09-29)

- [x] Lista do seletor de tema: entra com fade e deslize de 4px em 150 ms (`starting:` do Tailwind, que gera `@starting-style`), mantendo o atributo `hidden`. Só a entrada anima; o fechamento continua imediato (não foi preciso `allow-discrete`).
- [x] Seta do "Ver detalhes" anda 4px para a direita no hover (150 ms); "Copiado!"/"Não foi possível copiar" e o ícone entram com fade de 150 ms (token novo `animate-fade-in`), só depois do primeiro clique, nunca na carga; setas do carrossel reduzem para 95% enquanto pressionadas.
- [x] Movimento reduzido: os efeitos de movimento usam `motion-safe:` (só existem quando o movimento é permitido). Um override `motion-reduce:` perdia para a regra normal pela ordem do CSS gerado e deixava as setas encolhendo.
- [x] Nenhum teste de componente dependia da lista aparecer na hora (Playwright e Testing Library consideram visível um elemento com opacidade baixa).
- [x] E2E (`test/e2e/transitions.spec.ts`, "microinteractions"): cada efeito roda no navegador (animações desaceleradas 10x pelo protocolo do Chrome, para não correr contra 150 ms) e nenhum roda com movimento reduzido. Estável em 3 rodadas seguidas; suíte completa passando. Capturas conferidas (lista no meio da entrada, seta no hover, "Copiado!").
- [x] Lighthouse no container (6 rodadas mobile em `/pt/`): mediana 97, CLS 0.
- [x] Conferido no site publicado (2026-09-29, validado pelo Pedro).
- [x] Validado no Firefox pelo Pedro (2026-09-30).
- [ ] Conferir no Safari.

## Fase 3 - Troca de tema (poucas linhas de JS) (concluída em 2026-09-29)

- [x] `transitionTheme` em `src/lib/theme.ts`: roda a troca dentro de `document.startViewTransition` e marca o `<html>` com `data-theme-transition` enquanto ela dura (só a última transição tira a marca, se o usuário trocar de novo no meio); sem a API ou com `prefers-reduced-motion`, só aplica o tema. Teste unitário com documento falso.
- [x] `ThemeSelect.choose`: fecha a lista com `flushSync` antes de a transição capturar o estado antigo (senão a lista some junto com o fade) e chama `applyTheme` direto no callback (o `useEffect` continua cuidando das mudanças vindas de outras abas, sem transição).
- [x] Decidido o fade simples (decisão do Pedro), não a revelação circular. Fade cruzado de 500 ms (`ease-in-out`) nos dois lados, escopado por `html[data-theme-transition]` no `globals.css`: o fade em sequência da troca de idioma, aplicado ao tema, mostraria a tela vazia no meio.
- [x] A carga da página não dispara a transição (só uma escolha do usuário chama `transitionTheme`); e2e de tema existentes passando.
- [x] E2E (`test/e2e/transitions.spec.ts`): escolher Escuro roda o fade de 500 ms (animações dos pseudo-elementos `::view-transition-old/new(root)`), a lista já está fechada, a marca sai no fim e o tema fica aplicado; com movimento reduzido, troca imediata. Conferido também pelo teclado e em capturas no meio do fade (animação desacelerada), desktop claro -> escuro e 360px escuro -> claro, sem erro no console.
- [x] Lighthouse no container (6 rodadas mobile em `/pt/`): mediana 95,5, CLS 0.
- [x] Duração ajustada de 250 para 500 ms (`ease-in-out`) a pedido do Pedro, que achou a troca instantânea demais. Conferido no servidor de dev e no e2e que a transição roda com a nova duração.
- [x] Trocado o fade pela varredura diagonal (decisão do Pedro depois de comparar oito variantes num protótipo): 700 ms, `linear`, só CSS no `globals.css` (máscara em degradê na captura nova, captura antiga parada, `mix-blend-mode: normal`). Nenhuma mudança no `transitionTheme` além dos comentários. E2E ajustado: só a captura nova anima, por 700 ms (o navegador ainda anima o `::view-transition-group(root)` por padrão, sem efeito visível). Capturas no meio da varredura (animação desacelerada 20x) conferidas em desktop claro -> escuro e mobile escuro -> claro: faixa suave, sem clarão. Lint, typecheck, unitários e e2e de transições passando.
- [x] E2E da troca de tema estabilizado: lia as animações uma única vez logo depois do clique e, com a máquina carregada, às vezes antes de a transição (assíncrona) começar, recebendo lista vazia (1 falha em ~360 execuções). Agora desacelera as animações 10x e espera com `expect.poll`; 510 execuções seguidas sem falha.
- [x] Lighthouse depois da varredura: as medições da fase 4 (2026-09-29) já rodaram com a varredura no build, com mediana 96 na comparação A/B e CLS 0 (`docs/features/seo-assets/lighthouse.md`).
- [x] Conferido no site publicado (2026-09-29): o CSS no ar tem a varredura (`theme-sweep`), validado pelo Pedro.
- [x] Validado no Firefox pelo Pedro (2026-09-30).
- [ ] Conferir no Safari.

## Fase 4 - Entrada das seções (só CSS) (concluída em 2026-09-29)

- [x] Utilitário `reveal-on-scroll` no `globals.css` (`@keyframes section-enter`: de `opacity: 0` e 16px abaixo), com `animation-timeline: view()` e `animation-range: entry 0 entry 120px`, dentro de `@supports (animation-timeline: view())` e de `prefers-reduced-motion: no-preference`. O `Section` aplica nos filhos diretos (`*:reveal-on-scroll`); o hero não usa `Section`.
- [x] Filhos, não a seção: a caixa da `<section>` não se move, então o destaque do `SectionNav` (que lê a posição da seção) e os saltos do menu ficam como antes; o e2e do destaque continua passando.
- [x] Faixa em pixels, não em porcentagem: numa lista alta a porcentagem deixaria o texto esmaecido durante a leitura.
- [x] Conferido no navegador, desktop e mobile: nenhum filho de seção esmaecido acima dos últimos 120px da tela na carga, depois de cada salto do menu (as seis seções) e no fim da página; captura no meio da entrada da Experiência. Sem JS funciona igual (é só CSS).
- [x] E2E (`test/e2e/transitions.spec.ts`, "section entrance"): filhos das seções com a animação e hero sem, conteúdo abaixo da dobra esmaecido, nada esmaecido onde o leitor para (carga, saltos, fim da página), e nada animado com movimento reduzido. O e2e da troca de idioma esperava zero animações na página no fim do fade; agora espera só o fim da View Transition (as animações ligadas à rolagem existem sempre).
- [x] Lighthouse: 6 rodadas no container (mediana 94,5) e comparação A/B alternada com e sem a entrada (medianas 96 e 96, mesmo TBT, LCP oscilando igual nos dois). Sem efeito mensurável. Detalhes em `docs/features/seo-assets/lighthouse.md`.
- [x] No ar (conferido em 2026-09-30): o CSS publicado tem a entrada das seções (`section-enter`) e o HTML de `/pt/` aplica `reveal-on-scroll`.
- [x] Conferido no site publicado pelo Pedro (2026-09-30).
- [x] Validado no Firefox pelo Pedro (2026-09-30).
- [ ] Conferir no Safari (26+).

## Fase 5 - Modal e drawer (só CSS) (concluída em 2026-09-29)

- [x] Saída do drawer: o estado fechado do `<dialog>` agora é fora da tela (`translate-y-full`, `md:translate-x-full`) com o fundo transparente, então a mesma transição roda nos dois sentidos: entra em 300 ms `ease-out` (`starting:`), sai em 200 ms `ease-in`. `transition-discrete` em `display` e `overlay` mantém o dialog fechado na tela e no top layer até o fim. Classes agrupadas com comentário numa constante (`drawerClassName`) em `ProjectDetails.tsx`, sem JS novo.
- [x] Movimento reduzido: toda classe de transição em `motion-safe:`, durações incluídas. Na primeira versão o `duration-*` estava sem prefixo e fazia a `transition-property` padrão (`all`) animar o painel mesmo com movimento reduzido; um probe no navegador pegou antes de fechar a fase, e agora há e2e para isso.
- [x] Fade do corpo do drawer avaliado em captura no meio da entrada (animação desacelerada 20x) e descartado: o conteúdo chega junto com o painel e lê como uma folha só; um fade atrasado mostraria o painel vazio deslizando e só adiaria a leitura.
- [x] Botão de fechar vai a 95% enquanto pressionado (`motion-safe:active:scale-95`, `transition-[color,scale]`).
- [x] Conferido no navegador: o `close()` continua imediato, então foco (volta ao botão) e hash/Voltar não esperam a animação; a página não pula quando a trava de rolagem sai (posição e largura iguais antes, durante e depois, desktop e mobile); reabrir durante a saída funciona. Durante os 200 ms da saída o fundo ainda cobre a página, então um clique no botão só acerta depois; com o teclado (Esc devolve o foco ao botão, Enter reabre) reabre no meio da saída.
- [x] Testes: `ProjectDetails.browser.test.tsx` checa o fechamento imediato (`open` falso) e o sumiço depois da saída, a saída em 200 ms com o painel terminando fora da tela, e a reabertura pelo teclado com a saída congelada no meio. `test/e2e/transitions.spec.ts` ("project details drawer"): painel e fundo animam na saída, botão de fechar encolhe, e com movimento reduzido nada anima. Suíte completa passando 3 vezes seguidas.
- [x] Padrão de modal centralizado (fade + escala 0,96 -> 1, 200 ms na entrada e 150 ms na saída) registrado no `DESIGN_SYSTEM.md`, para o primeiro modal que surgir.
- [x] No ar (conferido em 2026-09-30): o CSS publicado tem a saída animada, o botão de fechar a 95% e a entrada de 700 ms com `ease-sheet`.
- [x] Conferido no site publicado pelo Pedro (2026-09-30).
- [x] Validado no Firefox pelo Pedro (2026-09-30).
- [ ] Conferir no Safari.

## Ajuste - Abertura do drawer mais lenta (2026-09-29)

- [x] A pedido do Pedro, que achou a abertura rápida e direta: entrada do drawer (painel e fundo) de 300 ms `ease-out` para 700 ms com a curva `ease-sheet` (`cubic-bezier(0.32, 0.72, 0, 1)`, token novo em `tokens.css`): sai rápido e assenta devagar. A saída continua em 200 ms `ease-in`. Conferido no navegador (duração e curva calculadas no painel e no `::backdrop`, desktop e mobile); e2e do drawer passando.

## Fechamento

- [x] E2E com `reducedMotion: "reduce"` para cada transição (`test/e2e/transitions.spec.ts`): troca de idioma, troca de tema, microinterações, drawer e entrada das seções.
- [x] Sem erro no console nos navegadores sem suporte: validado no Firefox pelo Pedro (2026-09-30).
- [x] Lighthouse no container registrado em `docs/features/seo-assets/lighthouse.md` a cada fase; a última medição (fase 4, com todas as transições no build) teve mediana 96 na comparação A/B, CLS 0.
- [x] Padrões de movimento no `DESIGN_SYSTEM.md` (durações, curvas, exceções, regra do `prefers-reduced-motion`), índice em `docs/features/README.md` e escopo do `PRD.md` atualizados (2026-09-30).
