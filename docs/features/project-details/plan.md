# Plano - Detalhes do projeto em drawer

Status: **Concluída** (2026-09-29, falta publicar). Primeiro projeto com detalhes: Plataforma Financeira (DMK3). AutoSim e Accountability seguem sem drawer por enquanto.

## Fase 1 - Modelo e lógica (concluída em 2026-09-29)

- [x] Campos opcionais `slug` e `details` no tipo `Project` (exigidos juntos pelo tipo) e rótulos em `Content.ui.projectDetails` (`pt.ts` e `en.ts`).
- [x] `src/lib/project-details.ts`: `projectHash` e `closeAction` (o que fazer com a URL ao fechar: voltar, limpar o hash ou nada), com teste unitário.
- [x] Tokens `color.overlay` e `container.drawer` no `DESIGN_SYSTEM.md` e no `tokens.css` (e `overlay` no `tokens.ts`).
- [x] `SkillGroups` virou `TagGroups` em `src/ui/`, reaproveitado pela stack por camada.

## Fase 2 - Componente (concluída em 2026-09-29)

- [x] `ProjectDetails` (cliente) em `src/components/projects/`: botão "Ver detalhes" (`data-requires-js`) + `<dialog>` com `showModal()`; o conteúdo vem como `children` renderizados no servidor pelo `ProjectCard`.
- [x] Drawer à direita a partir de `md`, bottom sheet no mobile; cabeçalho fixo, corpo com rolagem própria, página atrás sem rolagem (`html:has(dialog:modal)`).
- [x] Fecha por x, Esc, clique fora e Voltar; hash com `pushState` ao abrir, e hash na carga ou digitado abre o drawer.
- [x] Animação de entrada com `@starting-style` (painel e fundo), desligada com `prefers-reduced-motion`.
- [x] `ProjectCard` mostra o botão só quando o projeto tem `details`, na linha das tags, alinhado ao conteúdo do card tanto à direita quanto quebrado para a linha de baixo.

## Fase 3 - Testes e conferência (concluída em 2026-09-29)

- [x] `ProjectDetails.browser.test.tsx` (Chromium) com projetos de exemplo: 15 casos cobrindo os critérios de aceite da spec. Estável em 3 rodadas seguidas.
- [x] `src/content/content.test.ts`: mesmos `slug` em PT e EN, slugs únicos e seguros para URL, estudo de caso e stack não vazios.
- [x] E2E existente continua valendo: sem JS nenhum botão aparece na seção Projetos.
- [x] Conferência no build estático com conteúdo temporário no AutoSim (descartado depois): Voltar fecha sem recarregar a página, fechar pelo x e depois Voltar sai da página sem reabrir o drawer, link `/en/#project-autosim` abre o drawer, foco volta ao botão, nenhum erro no console.
- [x] Capturas: claro e escuro, desktop e 360px. Corrigidos o alinhamento vertical do botão com as tags, o recuo de 12px quando o botão quebra de linha e a linha das tags crescendo com o botão de 44px.
- [x] Lighthouse no container (6 rodadas mobile em `/pt/`): mediana 96,5, CLS 0 (`docs/features/seo-assets/lighthouse.md`).

## Fase 4 - Fechamento da estrutura (concluída em 2026-09-29)

- [x] Padrão do drawer no `DESIGN_SYSTEM.md` e pegadinhas (histórico do Next, `display` no `<dialog>`, `scrollbar-gutter`) no `services/frontend/CLAUDE.md`.
- [x] Índice em `docs/features/README.md` e escopo do `PRD.md`.

## Fase 5 - Conteúdo (concluída em 2026-09-29)

- [x] Projetos com detalhes: por ora só a Plataforma Financeira (nem todos terão).
- [x] Plataforma Financeira (SISFIN da DMK3, sem citar o órgão): card e drawer em PT e EN, a partir de um documento do Pedro (`PROJECT_.md`, escrito do ponto de vista de PO/Scrum Master/QA e removido do repositório depois de usado) reescrito para o perfil de dev. Os papéis de produto entram como apoio ao desenvolvimento, sem os títulos. Fatos técnicos (stack, arquitetura, autoria da integração com a API de logs e da redução da imagem Docker) conferidos no repositório `itesp.sisfin`; o módulo de exportação, feito principalmente por outros colegas, aparece como parte da arquitetura, não como trabalho do Pedro. Entrou como primeiro projeto do carrossel.
- [x] E2E na página real (`test/e2e/project-details.spec.ts`): abre pelo card, fecha pelo x, Esc e Voltar sem recarregar a página, foco volta ao botão, link com hash nos dois idiomas, só um botão de detalhes, sem overflow com o drawer aberto. `projects.spec.ts` atualizado para 3 projetos.
- [x] Ajustes vistos nas capturas com o texto real: `TagGroups` passou a usar container query (no drawer a stack empilha mesmo no desktop); papel do card encurtado para "DMK3 · Full-Stack" (quebrava em "front-/end" no celular); o foco vai para o drawer ao abrir, e não para o x (que mostrava o contorno de foco ao abrir por link).
- [x] Lighthouse no container (6 rodadas mobile em `/pt/`): mediana 96, CLS 0; HTML de `/pt/` de ~17 para ~21,5 KB gzip.
- [x] PDF do currículo: o projeto entra no topo da página 2, que continua com 2 páginas (o drawer não vai para o PDF).
- [ ] Conferir no site publicado depois do deploy.
