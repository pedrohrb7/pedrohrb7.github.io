# Spec - Transições de interface

## O que faz

Acrescenta transições que deixam as mudanças de estado do site mais fluidas: troca de idioma, troca de tema, entrada das seções ao rolar, microinterações nos controles, e abertura e fechamento do drawer e de modais. Pedido do Pedro em 2026-09-29, registrado para implementar depois.

Hoje o site só anima a cor de links e botões no hover (`transition-colors`) e a entrada do drawer de detalhes do projeto (`docs/features/project-details/`). Tema, idioma, seções e listas mudam de uma vez.

## Princípios (valem para todas)

- **Aprimoramento progressivo:** navegador sem suporte mostra o site como hoje, sem animação e sem erro. Nada fica escondido esperando uma animação que não roda.
- **Sem JS novo quando der:** a Performance mobile oscila em torno da meta de 95 (`OPEN_QUESTIONS.md`, "Mudar a arquitetura para recuperar folga de Performance?"). Três das quatro transições são só CSS; a de tema acrescenta poucas linhas a um componente cliente que já existe.
- **`prefers-reduced-motion`:** com a preferência ligada, nenhuma dessas animações roda (troca instantânea, como hoje).
- **Sem layout shift:** só `opacity` e `transform`, nunca propriedades que mudam o layout. CLS continua 0.
- **Sem atrasar o primeiro conteúdo:** nada acima da dobra (header, hero) anima na carga, para não piorar o LCP.
- **Duração curta:** 150-300 ms, curva `ease-out`. Exceções pedidas pelo Pedro, porque mudam a tela inteira ou quase: troca de tema (700 ms) e abertura do drawer (700 ms).

## 1. Troca de idioma

- Ao trocar PT/EN no header, a página antiga some e a nova entra com um fade, em vez de piscar.
- Como: View Transitions entre documentos, só CSS: `@view-transition { navigation: auto; }` no CSS global. O seletor de idioma usa `<a>` com navegação completa (convenção do `services/frontend/CLAUDE.md`), e `/pt/` e `/en/` são da mesma origem, que é o que a API exige.
- Fade em sequência (antiga some em 100 ms, nova entra em 180 ms a partir dos 80 ms), não cruzado: as duas páginas diferem muito (a nova abre no topo, todos os textos mudam de idioma) e o fade cruzado mostrava as duas sobrepostas no meio. O header participa do fade junto com a página (um `view-transition-name` próprio foi avaliado e não trouxe ganho).
- Suporte: Chrome/Edge 126+ e Safari 18.2+. No Firefox a troca continua instantânea.
- Vale também para a 404 e para o redirecionamento de `/`, que são navegações na mesma origem; conferir que não fica estranho.

## 2. Troca de tema

- Ao escolher claro, escuro ou sistema, o tema novo varre a tela na diagonal, da esquerda para a direita, em 700 ms (curva `linear`), atrás de uma borda em degradê, em vez de trocar de uma vez. Primeiro foi um fade cruzado (250 ms, depois 500 ms, porque com 250 ms soava como um piscar); a varredura foi escolhida pelo Pedro entre oito variantes comparadas num protótipo (fade, círculo a partir do botão, círculo com direção, cortina, varredura diagonal, fade com desfoque, fade com profundidade e transição de cores em CSS).
- Como: `transitionTheme` (`src/lib/theme.ts`) roda a troca dentro de `document.startViewTransition()`. A troca de `data-theme` precisa ser síncrona dentro do callback (`applyTheme` no próprio `choose` do `ThemeSelect`, não no `useEffect`), senão o navegador captura o estado antigo duas vezes e não há fade. A lista do seletor fecha antes (`flushSync`), para não aparecer no fade.
- Só CSS sobre a transição: a captura nova (`::view-transition-new(root)`) recebe uma máscara `linear-gradient(115deg, opaco 40%, transparente 60%)` com 250% da largura, e a animação leva `mask-position` de `100% 0` (toda transparente) a `0 0` (toda opaca). A captura antiga fica parada embaixo (`animation: none`). As duas usam `mix-blend-mode: normal`: o padrão `plus-lighter` clarearia a faixa onde as duas aparecem. As regras ficam escopadas por `html[data-theme-transition]`, marca que o `transitionTheme` põe enquanto a transição roda, para não afetar a troca de idioma.
- Anima `mask-position`, não só `opacity`/`transform`: exceção registrada no `DESIGN_SYSTEM.md`. Não muda layout (é uma captura), então CLS continua 0.
- Sem suporte à API (Firefox antigo) ou com `prefers-reduced-motion`, a troca é imediata, como antes.
- Não afeta o script anti-flash (`ThemeScript`): a transição só roda numa escolha do usuário, nunca na carga nem numa troca vinda de outra aba.
- Revelação circular a partir do botão foi considerada e descartada (decisão do Pedro): mais chamativa que o resto do site.

## 3. Entrada das seções ao rolar

- Cada seção abaixo do hero (Sobre, Experiência, Projetos, Habilidades, Formação, Contato) aparece com fade e um deslize curto (cerca de 16px para cima) ao entrar na tela.
- Como: animação ligada à rolagem, só CSS: `animation-timeline: view()` com `animation-range` no começo da entrada, dentro de `@supports (animation-timeline: view())`. Sem `IntersectionObserver` e sem JS.
- Sem suporte (Firefox hoje), as seções só aparecem, sem animação. Sem JS, funciona igual (é CSS).
- Cuidados:
  - O hero e tudo que estiver visível na carga não anima (LCP).
  - Pular para uma seção pelo menu (`#projetos` etc.) não pode deixar a seção meio transparente parada na tela: a animação é atrelada à posição, então precisa terminar quando a seção já está bem visível.
  - O `SectionNav` decide a seção atual pela posição na tela (`src/lib/active-section.ts`); conferir que o `transform` da entrada não muda o destaque do menu.
  - O conteúdo continua no HTML e acessível o tempo todo; a animação só mexe em `opacity`/`transform`.
- Implementado em 2026-09-29 (utilitário `reveal-on-scroll` no `globals.css`, aplicado pelo `Section` com `*:reveal-on-scroll`):
  - Animam os filhos diretos de cada seção (a linha do rótulo e o conteúdo), não a `<section>`: a caixa da seção, que o `SectionNav` e os saltos do menu (`scroll-mt-20`) leem, nunca se move. O hero não usa `Section` e não anima.
  - Faixa fixa em pixels (`animation-range: entry 0 entry 120px`), não em porcentagem do elemento: numa lista alta (Experiência) a porcentagem deixaria o texto esmaecido enquanto é lido. Com isso, tudo que está 120px ou mais acima da borda de baixo da tela está sempre inteiro, venha a página de onde vier (carga, salto do menu, Voltar, fim da página).
  - Na carga nada se move (a animação é ligada à rolagem, não ao tempo); o que estiver nos últimos 120px da tela aparece parcialmente, como se estivesse entrando. O parágrafo do Sobre, elemento de LCP, está acima disso nas telas medidas e o Lighthouse não mudou (comparação A/B em `docs/features/seo-assets/lighthouse.md`).
  - O `@supports` é obrigatório, não só cuidado: sem ele o shorthand `animation` rodaria como animação por tempo na carga nos navegadores sem `animation-timeline`.

## 4. Microinterações

- **Seletor de tema:** a lista abre com fade e um deslize de 4px a partir do botão, em 150 ms (`@starting-style`, mantendo o atributo `hidden`). O fechamento continua imediato.
- **"Ver detalhes":** a seta anda 4px para a direita no hover, em 150 ms.
- **Botão de copiar e-mail:** o "Copiado!" (ou "Não foi possível copiar") e o ícone entram com fade de 150 ms (token `animate-fade-in`), só depois do primeiro clique; na carga da página o botão só aparece.
- **Setas do carrossel:** reduzem para 95% enquanto pressionadas.
- Tudo CSS, dentro dos componentes que já existem. Os efeitos de movimento usam `motion-safe:`, então nem existem com `prefers-reduced-motion`.

## 5. Modal e drawer

Pedido do Pedro em 2026-09-29. Hoje o único `<dialog>` do site é o drawer de detalhes do projeto (`docs/features/project-details/`). Ele já anima a entrada (desliza da direita no desktop e de baixo no celular em 300 ms, depois ajustada para 700 ms, com o fundo escurecendo junto, via `@starting-style`), mas **fecha de uma vez**: o painel e o fundo somem sem transição.

- **Saída do drawer:** ao fechar (x, Esc, clique fora, Voltar), o painel desliza de volta para a direita (desktop) ou para baixo (celular) e o fundo clareia, em cerca de 200 ms (a saída é mais curta que a entrada, `ease-in`). Como: transição de `transform`/`opacity` com `transition-behavior: allow-discrete` em `display` e `overlay`, para o `<dialog>` continuar no top layer até a animação terminar. Sem JS novo: o fechamento continua sendo o `close()` nativo.
- **Conteúdo do drawer:** o corpo entra com um fade curto logo depois do painel (cerca de 100 ms de atraso), para o texto não "deslizar" junto com o painel. Avaliar na implementação se melhora a leitura ou só atrasa; se atrasar, fica de fora.
- **Botão de fechar:** mesma resposta ao clique das microinterações (`active:scale-95`).
- **Padrão para modais futuros** (centralizados, ex.: galeria de imagens em `docs/features/projects-showcase/`): `<dialog>` com entrada em fade + escala de 0,96 para 1 (200 ms, `ease-out`) e saída inversa mais curta (150 ms, `ease-in`), com o mesmo fundo `bg-overlay/50` e a mesma técnica de `@starting-style` + `allow-discrete`. Fica registrado no `DESIGN_SYSTEM.md` para quem criar o primeiro modal.
- Suporte: `@starting-style` e `allow-discrete` estão no Chrome/Edge 117+, Safari 17.5+ e Firefox 129+. Sem suporte à saída animada, o drawer fecha de uma vez, como hoje. O Firefox não tem a propriedade `overlay`: lá o dialog sai do top layer no `close()` e o fundo some na hora.
- Implementado em 2026-09-29: saída em 200 ms `ease-in` e botão de fechar a 95% pressionado. O fade do corpo foi avaliado e descartado (o conteúdo já chega junto com o painel; o fade só adiava a leitura). Detalhes e verificação em `plan.md`, fase 5.
- Cuidados:
  - O foco volta ao botão de abrir e o hash sai da URL no `close()`, não no fim da animação; conferir que a animação não atrasa isso nem quebra o Voltar (`src/lib/project-details.ts`).
  - A trava de rolagem da página (`html:has(dialog:modal)`) sai no `close()`; conferir que a página não "pula" enquanto o painel ainda está saindo.
  - Abrir de novo durante a saída precisa funcionar sem estado quebrado.

## Critérios de aceite

- Cada transição roda nos navegadores com suporte e, nos outros, o site fica exatamente como hoje, sem erro no console.
- Com `prefers-reduced-motion: reduce`, nenhuma transição nova roda (e2e com `reducedMotion: "reduce"`).
- Lighthouse (mediana de 3 rodadas mobile em `/pt/`) continua >= 95, CLS 0, LCP sem piora.
- Sem JS: seções visíveis e site utilizável como hoje.
- Capturas e gravação curta de cada transição, claro e escuro, desktop e 360px.

## Fora de escopo

- Transições entre slides do carrossel além da rolagem suave que já existe.
- Animações decorativas contínuas (parallax, loops, cursores customizados).
- Bibliotecas de animação (Framer Motion/Motion, GSAP): aumentariam o JavaScript e a Performance está no limite.
