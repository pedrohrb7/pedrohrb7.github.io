# Plano - Melhorias de UX

Status: **Concluída** (2026-09-28)

As duas partes são independentes.

## Fase 1 - Escolha de tema (concluída em 2026-09-28)

- [x] Decidir o controle: botão compacto com ícone sobre um `<select>` nativo, para caber no header em 360px e suportar mais temas no futuro.
- [x] `tokens.css` com `light-dark()` e `color-scheme` (`:root` segue o sistema, `[data-theme]` fixa); `DESIGN_SYSTEM.md` atualizado. `tokens.test.ts` passou a ler o lado claro de cada `light-dark()`.
- [x] `src/lib/theme.ts`: lista de temas, leitura/gravação no `localStorage` (tolerante a erro), aplicação no `<html>` e o script anti-flash.
- [x] `ThemeScript` no `<head>` dos layouts `[locale]`, `(root)` e `global-not-found`, com `suppressHydrationWarning` no `<html>`.
- [x] `ThemeSelect` no header, com rótulos em `Content.ui.theme`.
- [x] Testes: unitário do `ThemeSelect` (opções, aplicar e salvar, valor salvo, outra aba, valor inválido) e e2e (sistema, persistência entre recarga, idioma e 404, sem flash, sem JS).

## Fase 2 - Seção atual no menu (concluída em 2026-09-28)

- [x] `findActiveSection` em `src/lib/active-section.ts`, com teste unitário.
- [x] `SectionNav` como componente cliente, recalculando no scroll e no resize.
- [x] E2E de `aria-current` ao navegar pelo menu e no fim da página (só desktop: o menu aparece a partir de `md`).

## Ajustes pós-revisão (concluídos em 2026-09-28)

- [x] Lista de opções do tema ilegível no escuro (texto claro sobre o fundo branco nativo): cores explícitas no `<select>` e nas `<option>`, com e2e.
- [x] Container de 768px para 1024px (token `--container-content`; 896px numa primeira rodada, aumentado depois) e mais espaço entre os itens do menu; conferido em 768, 1024, 1280 e 1440px, sem overflow.

- [x] Seletor de tema refeito a pedido: o `<select>` nativo virou um listbox próprio estilizado com os tokens (ícone por opção, ✓ na selecionada, destaque no acento), e o botão passou a mostrar o esquema em vigor (sol/lua, via variante CSS `dark:`) com uma seta. Testes unitários de teclado, clique fora e seleção; e2e de teclado, visual (fundo, raio, dentro da tela em 360px) e ícone certo mesmo com os scripts bloqueados. Conferido em captura de tela, claro e escuro, desktop e 360px.

## Fase 3 - Fechamento (concluída em 2026-09-28)

- [x] Conferido em captura de tela: header claro e escuro, tema salvo contra o sistema oposto, desktop e 360px, item do menu destacado.
- [x] Lighthouse no container: mobile 98 (PT) e 95 (EN), desktop 100; Accessibility, Best Practices e SEO 100 (registrado em `docs/features/seo-assets/lighthouse.md`).
- [x] Atualizar o índice em `docs/features/README.md`.
