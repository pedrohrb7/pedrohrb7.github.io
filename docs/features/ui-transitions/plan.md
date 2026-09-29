# Plano - Transições de interface

Status: **Em andamento** (fase 1 concluída em 2026-09-29, falta publicar; fases 2 a 5 em backlog)

Cada fase é independente e pode ser entregue sozinha. A ordem sugerida vai do menor risco e custo para o maior.

## Fase 1 - Troca de idioma (só CSS) (concluída em 2026-09-29)

- [x] `@view-transition { navigation: auto; }` no `globals.css`, dentro de `@media (prefers-reduced-motion: no-preference)`. Como os três layouts raiz importam o `globals.css`, a regra vale para `/pt/`, `/en/`, a 404 e o redirecionamento de `/`. O build (Lightning CSS) mantém a regra.
- [x] Fade em sequência, não cruzado: a página antiga some em 100 ms e a nova entra em 180 ms, começando aos 80 ms. Com o fade cruzado padrão, as capturas no meio da transição (animação desacelerada 20x pelo protocolo do Chrome) mostravam as duas páginas sobrepostas: a nova abre no topo e a antiga podia estar rolada, e todos os textos mudam de idioma.
- [x] `view-transition-name` no header avaliado e descartado: com o fade cruzado, os textos do menu em PT e EN apareciam um sobre o outro; com o fade em sequência, o nome próprio não muda nada, então saiu para simplificar.
- [x] E2E (`test/e2e/transitions.spec.ts`, desktop e mobile): a troca PT -> EN revela a página com transição (evento `pagereveal`), a primeira carga não anima, a animação termina e, com `reducedMotion: "reduce"`, a troca não tem transição. Suíte completa passando.
- [x] Lighthouse: sem efeito mensurável (comparação alternada com e sem a regra, 5 rodadas cada: medianas 95 e 96, faixas sobrepostas). Detalhes em `docs/features/seo-assets/lighthouse.md`.
- [ ] Conferir no Safari e no Firefox (só o Chromium está instalado aqui) e no site publicado depois do deploy.

## Fase 2 - Microinterações (só CSS)

- [ ] Lista do seletor de tema com entrada animada (`@starting-style` + `allow-discrete`), mantendo o atributo `hidden`.
- [ ] Seta do "Ver detalhes" no hover, "Copiado!" com fade, `active:scale-95` nas setas do carrossel.
- [ ] Atualizar os testes de componente que dependem de a lista estar visível imediatamente (esperar o fim da transição ou rodar com movimento reduzido).

## Fase 3 - Troca de tema (poucas linhas de JS)

- [ ] `document.startViewTransition` no `choose` do `ThemeSelect`, com `applyTheme` síncrono dentro do callback; queda para a troca direta sem suporte ou com `prefers-reduced-motion`.
- [ ] Decidir entre fade simples e revelação circular a partir do botão.
- [ ] Garantir que a carga da página (script anti-flash) nunca dispara a transição; e2e de tema existentes continuam passando.

## Fase 4 - Entrada das seções (só CSS)

- [ ] Animação com `animation-timeline: view()` nas seções abaixo do hero, dentro de `@supports`, sem nada acima da dobra.
- [ ] Conferir o salto pelo menu (seção não pode ficar transparente parada), o destaque do `SectionNav` e a leitura sem JS.

## Fase 5 - Modal e drawer (só CSS)

- [ ] Saída do drawer: painel desliza de volta (direita no desktop, baixo no celular) e o fundo clareia em ~200 ms, com `transition-behavior: allow-discrete` em `display` e `overlay`; entrada continua como está (300 ms).
- [ ] Avaliar o fade do corpo do drawer logo depois do painel; manter só se melhorar a leitura.
- [ ] `active:scale-95` no botão de fechar.
- [ ] Conferir que foco, hash e Voltar continuam certos (o `close()` acontece antes do fim da animação), que a página não pula ao sair a trava de rolagem e que reabrir durante a saída funciona. Estender `ProjectDetails.browser.test.tsx` e `test/e2e/project-details.spec.ts`, incluindo movimento reduzido.
- [ ] Padrão de modal centralizado (fade + escala 0,96 -> 1, 200 ms na entrada e 150 ms na saída) registrado no `DESIGN_SYSTEM.md`, para o primeiro modal que surgir.

## Fechamento

- [ ] E2E com `reducedMotion: "reduce"` para cada transição e sem erro no console nos navegadores sem suporte.
- [ ] Lighthouse no container (mediana de 3 rodadas mobile em `/pt/`) e registro em `docs/features/seo-assets/lighthouse.md`.
- [ ] Padrões de movimento no `DESIGN_SYSTEM.md` (durações, curva, regra do `prefers-reduced-motion`), índice em `docs/features/README.md` e escopo do `PRD.md`.
