# Design System - Portfolio Pedro Borges

<!-- Fonte da verdade para UI. Espelhado em services/frontend/src/styles/tokens.css - altere os dois juntos. As cores do tema claro também são copiadas em services/frontend/src/styles/tokens.ts (para o PDF e as imagens geradas no build); o teste tokens.test.ts acusa divergência com tokens.css. -->

## Princípios

Editorial e sóbrio: coluna única de leitura, muito espaço em branco, tipografia fazendo a hierarquia em vez de cor ou decoração. Um único acento (verde-azulado) para ações e rótulos de seção. Fonte mono para metadados técnicos (datas, stack), reforçando a identidade de desenvolvedor. Tema claro e escuro: segue o sistema por padrão, e o visitante pode fixar um pelo controle de tema no header.

## Cor

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `color.background` (`--color-background`) | `#fafaf9` | `#0c0a09` | Fundo da página |
| `color.surface` (`--color-surface`) | `#ffffff` | `#1c1917` | Cards, tags, botões secundários |
| `color.text.primary` (`--color-fg`) | `#1c1917` | `#f5f5f4` | Texto padrão, títulos |
| `color.text.secondary` (`--color-muted`) | `#57534e` | `#a8a29e` | Parágrafos longos, metadados |
| `color.border` (`--color-border`) | `#e7e5e4` | `#292524` | Divisores, bordas |
| `color.accent` (`--color-accent`) | `#0f766e` | `#2dd4bf` | Ação primária, rótulos de seção, foco |
| `color.accent.fg` (`--color-accent-fg`) | `#ffffff` | `#042f2e` | Texto sobre o acento |
| `color.success` | - | - | Não usado ainda |
| `color.warning` | - | - | Não usado ainda |
| `color.danger` | - | - | Não usado ainda |

Contraste mínimo: texto 4.5:1, texto grande/ícones 3:1 (WCAG AA) contra o token de fundo.

Em `tokens.css` cada cor é `light-dark(<Claro>, <Escuro>)`, e o `color-scheme` do `<html>` escolhe a coluna: segue o sistema por padrão e é fixado por `<html data-theme="light|dark">`. Um tema novo entra como mais uma opção em `src/lib/theme.ts` e um bloco `[data-theme="..."]` em `tokens.css`, e ganha uma coluna nesta tabela.

## Escala tipográfica

| Token | Tamanho | Altura de linha | Peso | Uso |
|---|---|---|---|---|
| `text.display` | 36px / 60px (`text-4xl` / `sm:text-6xl`) | 1.1 | 600 | Nome no hero |
| `text.h1` | - | - | - | Reservado (o display faz o papel de h1) |
| `text.h2` | 14px (`text-sm`, mono, caixa alta) | 1.43 | 500 | Rótulo de seção |
| `text.h3` | 18px (`text-lg`) | 1.56 | 600 | Cargo, nome de projeto |
| `text.body` | 16px (`text-base`); 18px no "Sobre" | 1.625 (`leading-relaxed`) | 400 | Texto corrido |
| `text.small` | 14px (`text-sm`) | 1.43 | 400-500 | Navegação, botões |
| `text.caption` | 12px (`text-xs`, mono) | 1.33 | 400 | Datas, tags de stack |

Família: Geist (`--font-sans`) e Geist Mono (`--font-mono`), com fallback `ui-sans-serif, system-ui` / `ui-monospace`.

## Escala de espaçamento

Grade de 4px (escala padrão do Tailwind). Valores usados:

| Token | Valor |
|---|---|
| `space.xs` | 8px (`2`) |
| `space.sm` | 16px (`4`) |
| `space.md` | 24px (`6`) |
| `space.lg` | 32px (`8`) |
| `space.xl` | 48px / 64px (`12` / `16`) - espaçamento entre seções |

Largura de conteúdo: token `container.content` (`--container-content`, 1024px / `64rem`), usado como `max-w-content` no header, no `main` e no footer. Todas as seções usam a largura inteira do container, inclusive os parágrafos do "Sobre", para alinharem pela mesma borda. Margem lateral: 16px no mobile, 24px a partir de `sm`. Menu de seções: 24px entre itens, 32px a partir de `lg`.

## Breakpoints

| Token | Largura | Alvo |
|---|---|---|
| `bp.sm` | 640px | Celular grande / layout em linha de cabeçalhos |
| `bp.md` | 768px | Tablet / exibe menu de seções |
| `bp.lg` | 1024px | Desktop (sem mudanças de layout hoje) |

## Raio e elevação

| Token | Valor | Uso |
|---|---|---|
| `radius.sm` | 4px (`rounded`) | Itens do seletor de idioma |
| `radius.md` | 6px (`rounded-md`) | Botões, tags |
| `radius.lg` | 8px (`rounded-lg`) | Cards de projeto |
| `shadow.sm` | nenhuma | Elevação por borda, não por sombra |
| `shadow.md` | nenhuma | - |

## Convenções de componentes

- `src/ui/` guarda primitivos genéricos (`Section`, `TagList`, `ButtonLink`); `src/components/<feature>/` guarda composições de uma seção.
- Nenhuma cor, tamanho ou espaçamento avulso: use os tokens acima; se faltar um, adicione aqui e em `tokens.css`.
- Links externos usam `ButtonLink` com `external`, que aplica `target="_blank"` e `rel="noopener noreferrer"`.
- Campo com cópia (`CopyField`, ex.: e-mail no hero e no Contato): mesma altura dos botões (`min-h-11`), `bg-surface`, borda, raio `radius.md`; valor em mono `text-sm` selecionável; botão interno "Copiar" em `text-accent` com ícone, fundo `accent/10` no hover, "Copiado!" com ✓ por 2 s.
- Controles que só funcionam com JavaScript levam `data-requires-js`: vêm no HTML (sem layout shift na hidratação) e somem quando o JS está desligado.
- Ícones: SVG inline em `src/ui/icons.tsx` (traço 2, `currentColor`, 12-16px), nunca fonte de ícones.
- Carrossel (seção Projetos): controles à direita do rótulo da seção (contador mono `text-xs text-muted` `01 / 03` e setas 44x44px com borda, acento no hover, `opacity-40` quando desabilitadas); trilho com scroll-snap e `gap-4`, um card por vez a partir de `md` e 5/6 da largura no mobile (o próximo aparece na borda); cada card com a altura do próprio conteúdo e o trilho acompanhando a altura do card atual (transição de 300 ms); indicadores em barras de 32x4px (`bg-border`, atual `bg-accent`) com área de toque de 24px e a dica em mono `text-xs` à direita. Sem autoplay; rolagem suave desligada com `prefers-reduced-motion`.
- Listas suspensas (ex.: seletor de tema): `bg-surface`, borda `border-border`, raio `radius.md`, `p-1`, sem sombra; opções com `min-h-9`, `px-3`, ícone de 16px à esquerda; opção ativa (teclado ou ponteiro) com fundo `accent/10`, selecionada em `text-accent` com ✓ à direita; sem transição de cor nas opções. Botão de abrir com seta de 12px que gira ao abrir.
- O que depende do esquema em vigor (claro/escuro) usa a variante `dark:`, que segue a escolha manual e, sem ela, o sistema.

## Acessibilidade

- Estado de foco visível em todo elemento interativo (outline no token de acento, definido globalmente).
- Alvos de toque de pelo menos 44x44px no mobile.
- Todo elemento interativo alcançável e operável só pelo teclado; link "Pular para o conteúdo" no topo.
- HTML semântico (`header`, `nav`, `main`, `section` com `aria-labelledby`, `article`, `dl`) em vez de `div` com handlers.
- `lang` do `<html>` corresponde ao idioma da página; links de idioma têm `hrefLang` e `lang`.
