# Spec - Melhorias de UX

## O que faz

Duas melhorias independentes de navegação e leitura.

## 1. Escolha manual de tema

Antes o tema seguia só `prefers-color-scheme`.

- Controle no header (`ThemeSelect`), ao lado do seletor de idioma, em todas as larguras: um botão compacto com o ícone do esquema em vigor (sol ou lua, inclusive em "Sistema") e uma seta, que abre uma lista com Sistema, Claro e Escuro. Padrão: Sistema.
- O ícone do botão é decidido só por CSS, com a variante `dark:` (que segue `data-theme` e, sem ele, `prefers-color-scheme`), então está certo desde a primeira pintura, sem piscar.
- A lista é um listbox próprio (padrão WAI-ARIA "select-only combobox"): botão com `role="combobox"`, `aria-expanded` e `aria-activedescendant`; lista com `role="listbox"` e opções com `aria-selected`. Teclado: setas, Home/End, Enter/Espaço, Esc, Tab e digitar a inicial. Fecha ao clicar fora. Cada opção tem seu ícone (monitor, sol, lua); a selecionada fica no acento com ✓, a ativa com fundo `accent/10`; lista com `bg-surface`, borda e raio `md`, alinhada à direita do botão.
- Suporta mais temas no futuro: a lista vem de `themes` em `src/lib/theme.ts`, e um tema novo é mais uma opção.
- Histórico: a primeira versão usava um `<select>` nativo invisível sobre o ícone. A lista nativa não aceita estilização (espaçamento, cantos, destaque) e ficou crua, então foi trocada pelo listbox próprio (~2,3 KiB com gzip de código nosso, em vez dos ~25 KiB do Select do shadcn/Radix; veja o `OPEN_QUESTIONS.md`).
- A escolha persiste no `localStorage` (chave `theme`; "Sistema" apaga a chave) e vale para os dois idiomas, `/` e a 404. Mudanças em outra aba são aplicadas na hora.
- Sem flash de tema errado: um script inline no `<head>` dos três layouts raiz aplica `data-theme` no `<html>` antes da primeira pintura.
- Sem JS, o site segue o sistema.
- Cores: cada token em `tokens.css` é `light-dark(<claro>, <escuro>)`. O `color-scheme` do `<html>` escolhe o lado: `light dark` por padrão (segue o sistema) e fixo quando há `data-theme`. Um tema futuro que não seja só claro/escuro ganha um bloco `[data-theme="..."]` sobrescrevendo as variáveis.
- Rótulo e opções em `Content.ui.theme`; nome acessível "Tema"/"Theme"; foco visível no botão só pelo teclado; mesma altura e borda do seletor de idioma.

## 2. Destaque da seção atual no menu

Antes o `SectionNav` não indicava onde o visitante estava.

- Ao rolar, o item do menu da seção em leitura fica na cor de acento e recebe `aria-current="location"`.
- A seção em leitura é a última cujo topo passou de 30% da altura da janela; no fim da página é sempre a última (Contato), que é curta demais para chegar a essa linha. Lendo uma seção que não está no menu (Formação), nenhum item fica destacado.
- Calculado no evento de `scroll` (passivo, no máximo uma vez por frame) com `getBoundingClientRect`, em vez de `IntersectionObserver`: o caso do fim da página precisa do scroll de qualquer jeito, e a regra fica numa função pura testável (`src/lib/active-section.ts`).
- Sem JS, o menu funciona como antes, só sem destaque.

## 3. Largura do conteúdo

- O container da página (header, conteúdo e footer) passou de 768px para 1024px (token `--container-content`, classe `max-w-content`; 896px numa primeira rodada, aumentado depois a pedido), e o menu de seções ganhou mais espaço entre itens (24px, 32px a partir de `lg`), para os itens não ficarem espremidos entre o nome e os controles.
- Os parágrafos do "Sobre" deixaram de usar `max-w-prose` e ocupam a largura inteira, alinhados com as outras seções (antes terminavam ~200px antes da borda com o container em 1024px).

## Critérios de aceite

- E2E: a escolha de tema sobrevive a recarregar, trocar de idioma e abrir a 404; voltar para "Sistema" volta a seguir o sistema.
- E2E: com os scripts do Next bloqueados, o tema salvo já está aplicado (prova que não há flash); sem JS, segue o sistema.
- E2E: ao navegar até cada seção do menu, só o item correspondente fica com `aria-current`; no fim da página, Contato.
- Contraste AA mantido nos dois temas (tokens não mudaram).
- Lighthouse continua >= 95.

## Fora de escopo

- Temas além de claro e escuro (o controle já está pronto para eles).
- Animações de rolagem.
