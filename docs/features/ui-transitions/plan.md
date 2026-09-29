# Plano - Transições de interface

Status: **Em andamento** (fases 1, 2 e 3 concluídas em 2026-09-29, falta publicar; fases 4 e 5 em backlog)

Cada fase é independente e pode ser entregue sozinha. A ordem sugerida vai do menor risco e custo para o maior.

## Fase 1 - Troca de idioma (só CSS) (concluída em 2026-09-29)

- [x] `@view-transition { navigation: auto; }` no `globals.css`, dentro de `@media (prefers-reduced-motion: no-preference)`. Como os três layouts raiz importam o `globals.css`, a regra vale para `/pt/`, `/en/`, a 404 e o redirecionamento de `/`. O build (Lightning CSS) mantém a regra.
- [x] Fade em sequência, não cruzado: a página antiga some em 100 ms e a nova entra em 180 ms, começando aos 80 ms. Com o fade cruzado padrão, as capturas no meio da transição (animação desacelerada 20x pelo protocolo do Chrome) mostravam as duas páginas sobrepostas: a nova abre no topo e a antiga podia estar rolada, e todos os textos mudam de idioma.
- [x] `view-transition-name` no header avaliado e descartado: com o fade cruzado, os textos do menu em PT e EN apareciam um sobre o outro; com o fade em sequência, o nome próprio não muda nada, então saiu para simplificar.
- [x] E2E (`test/e2e/transitions.spec.ts`, desktop e mobile): a troca PT -> EN revela a página com transição (evento `pagereveal`), a primeira carga não anima, a animação termina e, com `reducedMotion: "reduce"`, a troca não tem transição. Suíte completa passando.
- [x] Lighthouse: sem efeito mensurável (comparação alternada com e sem a regra, 5 rodadas cada: medianas 95 e 96, faixas sobrepostas). Detalhes em `docs/features/seo-assets/lighthouse.md`.
- [ ] Conferir no Safari e no Firefox (só o Chromium está instalado aqui) e no site publicado depois do deploy.

## Fase 2 - Microinterações (só CSS) (concluída em 2026-09-29)

- [x] Lista do seletor de tema: entra com fade e deslize de 4px em 150 ms (`starting:` do Tailwind, que gera `@starting-style`), mantendo o atributo `hidden`. Só a entrada anima; o fechamento continua imediato (não foi preciso `allow-discrete`).
- [x] Seta do "Ver detalhes" anda 4px para a direita no hover (150 ms); "Copiado!"/"Não foi possível copiar" e o ícone entram com fade de 150 ms (token novo `animate-fade-in`), só depois do primeiro clique, nunca na carga; setas do carrossel reduzem para 95% enquanto pressionadas.
- [x] Movimento reduzido: os efeitos de movimento usam `motion-safe:` (só existem quando o movimento é permitido). Um override `motion-reduce:` perdia para a regra normal pela ordem do CSS gerado e deixava as setas encolhendo.
- [x] Nenhum teste de componente dependia da lista aparecer na hora (Playwright e Testing Library consideram visível um elemento com opacidade baixa).
- [x] E2E (`test/e2e/transitions.spec.ts`, "microinteractions"): cada efeito roda no navegador (animações desaceleradas 10x pelo protocolo do Chrome, para não correr contra 150 ms) e nenhum roda com movimento reduzido. Estável em 3 rodadas seguidas; suíte completa passando. Capturas conferidas (lista no meio da entrada, seta no hover, "Copiado!").
- [x] Lighthouse no container (6 rodadas mobile em `/pt/`): mediana 97, CLS 0.
- [ ] Conferir no Safari e no Firefox e no site publicado depois do deploy.

## Fase 3 - Troca de tema (poucas linhas de JS) (concluída em 2026-09-29)

- [x] `transitionTheme` em `src/lib/theme.ts`: roda a troca dentro de `document.startViewTransition` e marca o `<html>` com `data-theme-transition` enquanto ela dura (só a última transição tira a marca, se o usuário trocar de novo no meio); sem a API ou com `prefers-reduced-motion`, só aplica o tema. Teste unitário com documento falso.
- [x] `ThemeSelect.choose`: fecha a lista com `flushSync` antes de a transição capturar o estado antigo (senão a lista some junto com o fade) e chama `applyTheme` direto no callback (o `useEffect` continua cuidando das mudanças vindas de outras abas, sem transição).
- [x] Decidido o fade simples (decisão do Pedro), não a revelação circular. Fade cruzado de 500 ms (`ease-in-out`) nos dois lados, escopado por `html[data-theme-transition]` no `globals.css`: o fade em sequência da troca de idioma, aplicado ao tema, mostraria a tela vazia no meio.
- [x] A carga da página não dispara a transição (só uma escolha do usuário chama `transitionTheme`); e2e de tema existentes passando.
- [x] E2E (`test/e2e/transitions.spec.ts`): escolher Escuro roda o fade de 500 ms (animações dos pseudo-elementos `::view-transition-old/new(root)`), a lista já está fechada, a marca sai no fim e o tema fica aplicado; com movimento reduzido, troca imediata. Conferido também pelo teclado e em capturas no meio do fade (animação desacelerada), desktop claro -> escuro e 360px escuro -> claro, sem erro no console.
- [x] Lighthouse no container (6 rodadas mobile em `/pt/`): mediana 95,5, CLS 0.
- [x] Duração ajustada de 250 para 500 ms (`ease-in-out`) a pedido do Pedro, que achou a troca instantânea demais. Conferido no servidor de dev e no e2e que a transição roda com a nova duração.
- [ ] Conferir no Safari e no Firefox e no site publicado depois do deploy.

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
