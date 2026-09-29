# Plano - E-mail com botão de copiar

Status: **Concluída** (2026-09-28, falta publicar)

## Fase 1 - Implementação (concluída em 2026-09-28)

- [x] `CopyField` em `src/ui/` (cliente), com ícones de copiar e ✓ inline (`src/ui/icons.tsx`, compartilhado com o seletor de tema).
- [x] Rótulos em `Content.ui.copyEmail`; `emailCta` removido.
- [x] Hero e `ContactBlock` usando o campo; nenhum `mailto:` no site (o PDF mantém o link).
- [x] Sem JavaScript: mecanismo `data-requires-js` (um `<noscript><style>` no `<head>` de `[locale]`) esconde o botão; o botão vem no HTML para não causar layout shift na hidratação.
- [x] Teste unitário do `CopyField` (valor selecionável, sucesso com volta ao rótulo inicial, falha, marcação `data-requires-js`).
- [x] E2E (desktop e mobile, `test/e2e/contact.spec.ts`): cópia real para a área de transferência no hero e no Contato, nenhum `mailto:`, sem JS o endereço aparece e o botão some.

## Fase 2 - Conferência (concluída em 2026-09-28)

- [x] Capturas de tela: hero e Contato, claro e escuro, desktop e 360px, sem overflow. Corrigido um desalinhamento de 2px (campo com 46px contra 44px dos botões).
- [x] Lighthouse no container (mediana de 3 rodadas mobile em `/pt/`): Performance 95, CLS 0, o resto 100.
- [x] `DESIGN_SYSTEM.md`, índice em `docs/features/README.md` e escopo do `PRD.md` atualizados.
- [ ] Conferir no site publicado depois do deploy.
