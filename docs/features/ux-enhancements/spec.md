# Spec - Melhorias de UX

## O que faz

Duas melhorias independentes de navegação e leitura.

## 1. Alternância manual de tema

Hoje o tema segue só `prefers-color-scheme`.

- Controle no header com três opções: Sistema, Claro, Escuro. Padrão: Sistema.
- A escolha persiste no `localStorage` e vale para os dois idiomas e a 404.
- Sem flash de tema errado: um script inline no `<head>` aplica `data-theme` no `<html>` antes da primeira pintura.
- Sem JS, o site continua seguindo o sistema (comportamento atual).
- `tokens.css` passa a aplicar o tema escuro por `[data-theme="dark"]` e por `prefers-color-scheme: dark` quando não houver escolha manual. `DESIGN_SYSTEM.md` atualizado junto.
- Rótulos e nome acessível em `Content.ui`; operável por teclado, alvo de toque >= 44x44px.

## 2. Destaque da seção atual no menu

Hoje o `SectionNav` não indica onde o visitante está.

- Ao rolar, o item do menu da seção visível fica destacado (cor de acento) e recebe `aria-current="location"`.
- Implementado com `IntersectionObserver` em um componente cliente pequeno; o restante do header continua renderizado no servidor.
- Sem JS, o menu funciona como hoje, só sem destaque.

## Critérios de aceite

- E2E: a escolha de tema sobrevive a recarregar a página e a trocar de idioma; nenhum flash de tema errado ao carregar.
- E2E: ao rolar até cada seção do menu, o item correspondente fica com `aria-current`.
- Contraste AA mantido nos dois temas.
- Lighthouse continua >= 95.

## Fora de escopo

- Temas além de claro e escuro.
- Animações de rolagem.
