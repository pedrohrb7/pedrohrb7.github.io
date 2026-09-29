# Plano - Detalhes do projeto em drawer

Status: **Próxima**

## Fase 1 - Modelo e lógica

- [ ] Campos opcionais `slug` e `details` no tipo `Project` (exigidos juntos) e rótulos novos em `Content.ui` (`pt.ts` e `en.ts`).
- [ ] `src/lib/project-hash.ts`: montar o hash de um projeto e achar o projeto a partir do hash da URL, com teste unitário.
- [ ] Token de overlay (fundo do `::backdrop`) no `DESIGN_SYSTEM.md` e no `tokens.css`, claro e escuro.

## Fase 2 - Componente

- [ ] `ProjectDetails` (cliente) em `src/components/projects/`: botão "Ver detalhes" (`data-requires-js`) + `<dialog>` com `showModal()`; o conteúdo do drawer vem como `children` renderizados no servidor.
- [ ] Drawer à direita a partir de `md`, bottom sheet no mobile; cabeçalho fixo, corpo com rolagem própria, página atrás sem rolagem.
- [ ] Fechar por x, Esc, clique fora e Voltar; hash com `pushState` ao abrir e na carga da página.
- [ ] Animação de entrada com `@starting-style`, desligada com `prefers-reduced-motion`.
- [ ] `ProjectCard` mostra o botão só quando o projeto tem `details`.

## Fase 3 - Testes e conferência

- [ ] `ProjectDetails.browser.test.tsx` com projetos de exemplo (critérios de aceite da spec).
- [ ] E2E da página real: sem JS o botão não aparece; sem `details` nenhum botão.
- [ ] Capturas de tela com um projeto de exemplo: claro e escuro, desktop e 360px.
- [ ] Lighthouse no container (mediana de 3 rodadas mobile em `/pt/`) e registro em `docs/features/seo-assets/lighthouse.md`.

## Fase 4 - Fechamento

- [ ] Padrão do drawer no `DESIGN_SYSTEM.md` (Convenções de componentes) e pegadinhas no `services/frontend/CLAUDE.md`, se aparecerem.
- [ ] Índice em `docs/features/README.md` e escopo do `PRD.md`.

## Depois (conteúdo)

- [ ] Estudo de caso e stack por camada de AutoSim e Accountability, em PT e EN, a partir dos fatos passados pelo Pedro.
- [ ] Estender o e2e para abrir e fechar o drawer na página real e medir o Lighthouse de novo (o conteúdo aumenta o HTML da home).
