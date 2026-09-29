# Spec - Carrossel de projetos

## O que faz

Apresenta a seção Projetos como carrossel: um projeto por vez, navegável por setas, indicadores, deslize (touch/trackpad) e teclado. Decidido em 2026-09-28. Referência visual: bloco "02 / Projetos selecionados" de `wireframe/dark-layout.html` e `wireframe/light-layout.html` (só a estrutura; tokens, fontes e ícones continuam os do `DESIGN_SYSTEM.md`).

## Relação com outras features

- O conteúdo dos projetos (quais entram, links de repositório/demo, imagens) é de `docs/features/projects-showcase/`. Este carrossel funciona com o tipo `Project` atual e mostra links e imagem quando `projects-showcase` os adicionar.
- Com um projeto, o carrossel vira um card simples (sem controles). Desde 2026-09-28 o conteúdo tem dois projetos (AutoSim e Accountability), então o carrossel aparece no site.

## Interface

- Cabeçalho da seção: rótulo à esquerda; à direita, contador `01 / 03` (mono, `text-muted`) e botões anterior/próximo com ícones SVG inline, no estilo dos controles do header (borda, `radius.md`, alvo >= 44x44px), `disabled` nas pontas.
- Trilho: rolagem horizontal nativa com CSS scroll-snap, um card por vez. No mobile, o card ocupa ~85% da largura para o próximo aparecer na borda e indicar que dá para deslizar; a partir de `md`, o card ocupa a largura toda. Barra de rolagem escondida, sem perder a rolagem.
- Card: índice `[01]` em mono no acento, nome (h3), papel/período em mono à direita, descrição, destaques e tags de stack (`TagList`) logo depois dos destaques; links de repositório/demo com `↗` e imagem no topo quando existirem. Sem borda de hover no card inteiro (ele não é clicável) e com texto selecionável. Cada card tem a altura do próprio conteúdo.
- Altura adaptativa: o trilho acompanha a altura do card atual (transição de 300 ms, desligada com `prefers-reduced-motion`), para um card curto não deixar o vão do mais alto antes dos indicadores. Sem JS, o trilho fica com a altura do card mais alto.
- Rodapé do carrossel: indicadores (barras) clicáveis, o atual no acento; à direita, a dica "Deslize ou use as setas".
- Nada de autoplay.

## Comportamento

- Botões, indicadores e contador leem a posição real do scroll (o deslize manual atualiza tudo).
- `scroll-behavior: smooth`, exceto com `prefers-reduced-motion: reduce`.
- Sem JavaScript: os cards continuam acessíveis por rolagem horizontal; os controles que dependem de JS ficam ocultos.
- Com 1 projeto: sem contador, botões, indicadores nem dica.
- Contador com zero à esquerda correto para qualquer quantidade (`01 / 12`, não `010`).

## Acessibilidade (WAI-ARIA Carousel)

- Região com `aria-roledescription="carousel"` e rótulo.
- Cada card: `role="group"`, `aria-roledescription="slide"`, `aria-label` "1 de 3" (traduzido).
- Botões com nome acessível ("Projeto anterior"/"Próximo projeto"); indicadores com nome ("Ir para o projeto 2") e `aria-current` no atual.
- Contador em `aria-live="polite"`.
- Trilho focável (`tabIndex=0`) e rolável pelas setas do teclado.
- Todos os textos em `Content.ui` (`pt.ts` e `en.ts`).

## Técnica

- `ProjectCarousel` em `src/components/projects/` como componente cliente pequeno, sem biblioteca (Embla, Swiper, Radix): o JavaScript novo precisa ser mínimo por causa de `docs/backlog/refactor/2026-09-28-reduzir-js-primeira-carga.md`. O HTML dos cards continua renderizado no build.
- Lógica pura (índice a partir do `scrollLeft`, formatação do contador) em `src/lib/`, com teste unitário.

## Critérios de aceite

- Botões, indicadores, deslize e teclado levam ao card certo; contador e indicadores acompanham; botões desabilitados nas pontas.
- Com 1 projeto, sem controles; sem JS, cards roláveis.
- Nenhum overflow horizontal da página em 360px; card seguinte visível na borda no mobile.
- Testes unitários (1 e 3 projetos de exemplo) e e2e (desktop e mobile, claro e escuro).
- Lighthouse continua >= 95 (mediana de 3 rodadas mobile).

## Fora de escopo

- Página de detalhe por projeto (`wireframe/dark-nexus-project.html`): fora da v1 no `PRD.md`.
- Escolha dos projetos e seus conteúdos (`docs/features/projects-showcase/`).
- Autoplay, loop infinito e animações além do scroll suave.
