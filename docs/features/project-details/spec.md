# Spec - Detalhes do projeto em drawer

## O que faz

Cada card da seção Projetos pode ganhar um botão "Ver detalhes", que abre um drawer por cima da página com o estudo de caso do projeto (contexto, decisões técnicas, resultados, aprendizados) e a stack separada por camada. Decidido em 2026-09-29 (veja "Como mostrar os detalhes de cada projeto?" no `OPEN_QUESTIONS.md`). Serve ao público "engenheiros avaliando o candidato" do `PRD.md`, que querem entender o problema e as decisões, não só a lista de destaques.

O drawer é opcional por projeto: o botão só aparece em projetos que tiverem conteúdo de detalhe. A primeira entrega é só a estrutura; o texto de AutoSim e Accountability entra depois, então o site no ar não muda até lá.

## Interface

- Botão "Ver detalhes" no rodapé do card (`ProjectCard`), ao lado das tags, com seta `->`; texto em `text-accent`, altura mínima de 44px.
- Desktop (a partir de `md`): drawer preso à direita, altura da tela, largura de até 560px (`max-w` com a tela inteira no limite), borda à esquerda `border-border`, fundo `bg-surface`.
- Mobile: bottom sheet, preso embaixo, largura inteira, altura de até ~90% da tela, raio `radius.lg` nos cantos de cima.
- Fundo da página escurecido por trás (`::backdrop`, token novo de overlay).
- Cabeçalho fixo no topo do drawer: índice `[01]` e nome do projeto, papel em mono, botão de fechar (x) de 44x44px. O conteúdo rola por baixo do cabeçalho; a página atrás não rola enquanto o drawer estiver aberto.
- Corpo: descrição do projeto; estudo de caso em blocos com título (`h3`) e parágrafos; stack por camada (rótulo + `TagList`, mesmo padrão da seção Habilidades).
- Animação de entrada: desliza da direita (desktop) ou de baixo (mobile) em ~200-300 ms; sem animação com `prefers-reduced-motion`.
- Fecha pelo x, pela tecla Esc, por clique fora do drawer e pelo botão Voltar do navegador (quando foi aberto pelo botão do card).

## Link direto (hash)

- Cada projeto com detalhes tem um `slug` (ex.: `autosim`), igual nos dois idiomas.
- Abrir o drawer põe `#projeto-<slug>` (PT) / `#project-<slug>` (EN) na URL; fechar remove.
- Acessar a página já com o hash (ex.: `https://pedrohrb7.github.io/pt/#projeto-autosim`) abre o drawer daquele projeto. Hash desconhecido é ignorado.
- Abrir pelo botão entra no histórico (`pushState`), então o Voltar fecha o drawer em vez de sair da página, o comportamento esperado num bottom sheet no celular. Fechar pelo x/Esc/clique fora volta essa entrada.

## Sem JavaScript

O drawer precisa de JavaScript para abrir. O botão "Ver detalhes" leva `data-requires-js` e some sem JS, como o botão de copiar e as setas do carrossel; o card aparece como hoje.

## Acessibilidade

- `<dialog>` nativo aberto com `showModal()`: foco preso no drawer, resto da página inerte, Esc fecha, e o foco volta ao botão que abriu.
- Nome acessível do diálogo pelo título do projeto (`aria-labelledby`).
- Botão de abrir com nome acessível "Ver detalhes do projeto AutoSim" / "View AutoSim project details"; botão de fechar "Fechar detalhes" / "Close details".
- Foco visível em todos os controles; alvos >= 44x44px.

## Conteúdo

- `Project` (`services/frontend/src/types/content.ts`) ganha campos opcionais:
  - `slug` - identificador do hash, igual em `pt.ts` e `en.ts`.
  - `details` - `{ caseStudy: { heading: string; body: string[] }[]; stackByLayer: SkillGroup[] }`. Os títulos do estudo de caso são livres por projeto (o wireframe sugere: contexto e desafio, arquitetura e decisões, impacto e resultados, aprendizados).
- Um projeto só tem botão se tiver `slug` e `details`; o TypeScript exige os dois juntos.
- Rótulos novos em `Content.ui` (`pt.ts` e `en.ts`): ver detalhes, nome acessível do botão (template com `{name}`), fechar, prefixo do hash, rótulo da stack por camada.
- Toda alteração em `pt.ts` e `en.ts` juntos, sem travessão.

## Critérios de aceite

- Teste em navegador real (Chromium, `*.browser.test.tsx`) com projetos de exemplo: abre pelo botão, fecha por x, Esc, clique fora e Voltar; foco volta ao botão; hash entra e sai; hash na carga abre o projeto certo; hash desconhecido não abre nada; projeto sem `details` não tem botão; página atrás não rola; drawer à direita no desktop e embaixo no mobile; sem overflow em 360px.
- Teste unitário da lógica de hash (`src/lib/`).
- E2E da página real: sem JS o botão não aparece; enquanto nenhum projeto tiver `details`, nenhum botão aparece. Quando o conteúdo entrar, o e2e passa a abrir e fechar o drawer de verdade.
- Lighthouse (mediana de 3 rodadas mobile em `/pt/`) continua >= 95, CLS 0.

## Fora de escopo

- Texto dos estudos de caso de AutoSim e Accountability (entra depois, nos dois idiomas).
- Imagens, links de repositório e demo (continuam em `docs/features/projects-showcase/`).
- Página própria por projeto (`wireframe/dark-nexus-project.html`), que segue fora da v1.
- Detalhes no currículo em PDF.
