# Plano - Melhorias de UX

Status: **Backlog**

As duas partes são independentes e podem ser entregues separadamente.

## Fase 1 - Alternância de tema

- [ ] Reestruturar `tokens.css` para `[data-theme]` + `prefers-color-scheme`, espelhando no `DESIGN_SYSTEM.md`.
- [ ] Script inline anti-flash nos layouts `[locale]`, `(root)` e na `global-not-found`.
- [ ] Controle de tema no header, com rótulos em `Content.ui`.
- [ ] Testes: unitário do controle e e2e de persistência e ausência de flash (desktop e mobile).

## Fase 2 - Seção atual no menu

- [ ] Componente cliente com `IntersectionObserver` aplicado ao `SectionNav`.
- [ ] E2E de `aria-current` ao rolar.

## Fase 3 - Fechamento

- [ ] Conferir contraste e Lighthouse nos dois temas.
- [ ] Atualizar `TASKS.md` e o índice em `docs/features/README.md`.
