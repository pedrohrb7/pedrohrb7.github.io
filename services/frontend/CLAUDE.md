# CLAUDE.md - frontend (Frontend)

## Estrutura

- `src/app/[locale]/` - layout raiz e página de cada idioma (gerados via `generateStaticParams`). `src/app/(root)/` - layout raiz separado só para `/`, que redireciona para um idioma no navegador. Não existe `src/app/layout.tsx`: são dois layouts raiz de propósito, para cada página ter o `<html lang>` correto.
- `src/app/global-not-found.tsx` - 404 bilíngue (vira `out/404.html`). Exige `experimental.globalNotFound` no `next.config.ts`, porque com dois layouts raiz não há layout único para envolver um `not-found.tsx`. É um documento completo: importa estilos e fontes por conta própria.
- `src/content/` - todo o texto do site. `pt.ts` e `en.ts` seguem o tipo `Content` (`src/types/content.ts`); `profile.ts` guarda dados que não mudam por idioma (nome, e-mail, links).
- `src/ui/` - primitivos genéricos. `src/components/<feature>/` - uma pasta por seção da página.
- `src/lib/i18n.ts` - locales, detecção de idioma e caminhos. `src/lib/fonts.ts` - fontes via `next/font`.
- `src/styles/tokens.css` - tokens de design (espelho do `DESIGN_SYSTEM.md` da raiz). `src/styles/tokens.ts` copia as cores do tema claro para o que roda no build e não lê CSS (PDF, imagens geradas); `tokens.test.ts` acusa divergência.
- `src/pdf/` - currículo em PDF (`@react-pdf/renderer`): `ResumeDocument.tsx` lê o mesmo `Content`/`profile` do site, `fonts.ts` registra a Geist em TTF. Nunca é importado pelo site (só roda em Node). `src/lib/resume-pdf.ts` guarda os nomes dos arquivos, que o site pode importar.
- `scripts/generate-resume-pdf.ts` - roda no `postbuild` (via `tsx`) e grava um PDF por idioma em `out/`.
- Tema: `src/lib/theme.ts` (lista de temas, `localStorage`, script anti-flash), `src/components/theme/` (`ThemeScript` no `<head>` dos três layouts raiz, `ThemeSelect` no header, `ThemeIcon`). As cores de cada tema estão em `tokens.css` via `light-dark()`.
- `src/lib/active-section.ts` - regra de qual seção está em leitura, usada pelo `SectionNav` (componente cliente) para o `aria-current`.
- `src/lib/geist-fonts.ts` - caminhos da Geist em TTF (pacote `geist`) para o PDF e para `next/og`, que não aceitam o woff2 do `next/font`.
- `src/components/projects/` - `ProjectsSection` (seção), `ProjectCard` e `ProjectCarousel` (carrossel em partes com contexto: trilho, controles no cabeçalho, indicadores); lógica pura em `src/lib/carousel.ts`. Com um projeto, vira card simples. `ProjectDetails` (cliente) é o botão "Ver detalhes" com o drawer (`<dialog>` modal) de um projeto com `slug` e `details`; o conteúdo do drawer é renderizado no servidor pelo `ProjectCard` e entra como `children`. Hash e histórico em `src/lib/project-details.ts`.
- `src/ui/icons.tsx` - ícones SVG inline compartilhados. `src/ui/CopyField.tsx` - valor com botão de copiar (e-mail no hero e no Contato). `src/ui/TagGroups.tsx` - listas de tags com rótulo (Habilidades e stack por camada no drawer).
- `src/content/content.test.ts` - consistência do conteúdo entre idiomas (hoje: `slug` e `details` dos projetos).
- SEO: `public/icon.svg` (favicon), `src/app/apple-touch-icon.png/route.tsx` e `src/app/[locale]/og-image.png/route.tsx` (imagens geradas no build com `next/og`), `src/app/sitemap.ts` e `src/app/robots.ts`. `src/lib/site-metadata.ts` guarda `siteIcons` (usado pelos três layouts raiz) e o caminho da imagem OG (usado no `generateMetadata` de `[locale]`).

## Convenções

- `ui/` = primitivos genéricos, sem regra de negócio. `components/<feature>/` = específicos de uma seção. Um componente só vai para `ui/` se uma segunda seção o reutilizaria como está.
- Páginas ficam finas: compõem componentes e passam conteúdo; lógica vai para `lib/`.
- Tokens de design vivem no `DESIGN_SYSTEM.md` da raiz, espelhados em `src/styles/tokens.css`. Nunca use valor avulso de cor/espaçamento/tipografia; estenda os tokens nos dois lugares.
- Não há `stores/`: o site não tem estado global.
- Sem biblioteca de componentes (shadcn/ui, Radix, MUI...): componentes próprios sobre os tokens. Se uma feature precisar de um componente interativo complexo, adicione só ele pela CLI do shadcn, adaptado aos nossos tokens (veja "Adotar shadcn/ui no frontend?" no `OPEN_QUESTIONS.md` da raiz).
- Texto visível nunca fica hardcoded em componente: vai em `Content` (campo `ui` para rótulos de interface) e é preenchido em `pt.ts` e `en.ts`. O TypeScript acusa se um idioma ficar sem o campo.
- Links internos de troca de idioma usam `<a>` e não `next/link`: mudar de idioma troca o `<html lang>` e deve ser uma navegação de documento completa. É essa navegação completa que ganha o fade da View Transition entre documentos (`@view-transition` no `globals.css`); a regra precisa estar no CSS da página de origem e da de destino, por isso vale para todo layout raiz que importa o `globals.css`.

## Testes

- Testes unitários/componentes ficam ao lado do código (`*.test.ts(x)`), rodando em jsdom (projeto `unit` do Vitest).
- Componentes que dependem de layout ou rolagem reais (ex.: carrossel) têm testes `*.browser.test.tsx`, rodando no Chromium com o CSS do site (projeto `browser`, `@vitest/browser-playwright`). Use `page`/`userEvent` de `vitest/browser` e `expect.poll` para esperar rolagens suaves. `npm test` roda os dois projetos e precisa do Chromium do Playwright instalado. Arquivos gerados vão para `.vitest/` (ignorada); o Vite só deixa gravar dentro do projeto.
- `test/e2e/` (Playwright, projetos desktop e mobile) roda contra o build estático servido por `serve`, o mesmo artefato do GitHub Pages. Rode antes de considerar pronta qualquer mudança de layout ou interação.

## Pegadinhas

- `next/link` fora do Next (ex.: Vitest) ignora `trailingSlash` e gera `/pt` em vez de `/pt/`.
- Nada que dependa de servidor funciona no export estático: API routes, middleware, `redirect()` em runtime, `next/image` otimizado, cookies/headers.
- `typescript` fica em 6.x e `eslint` em 9.x: `typescript-eslint` ainda não suporta TS 7 e `eslint-plugin-react` quebra com ESLint 10.
- `next/font/google` baixa as fontes no build; builds offline falham.
- Para trocar a versão do Node, altere o `.nvmrc` da raiz, o `ARG NODE_VERSION` do `Dockerfile` e o `engines` do `package.json` juntos, e rode `npm install --package-lock-only` com o Node novo. O teste `test/config/node-version.test.ts` falha se algum ficar para trás.
- `globalNotFound` ainda é experimental no Next 16. Ao atualizar o Next, confira se a flag mudou de nome ou saiu do `experimental` (o teste e2e "not found page" acusa se a 404 quebrar).
- react-pdf (`src/pdf/`): um elemento `fixed` com `render` (o número da página no rodapé) some inteiro se herdar qualquer `lineHeight`, por isso o `lineHeight` fica num `View` de conteúdo e não na `Page`. `lineHeight` sem unidade num `View` é calculado sobre o `fontSize` do próprio `View` (18pt por padrão), então repita o `fontSize` junto. `minPresenceAhead` só funciona em elemento que tem irmãos antes dele e que não está sendo dividido; para manter um título junto do conteúdo, use `wrap={false}` num bloco com os dois. Confira qualquer mudança de layout renderizando o PDF (`pdftoppm -png out/pedro-borges-curriculo.pdf /tmp/cv`).
- Testes que usam `node:fs` com `import.meta.url` ou geram PDF precisam de `// @vitest-environment node` no topo: no jsdom o `import.meta.url` não é `file://`.
- Imagens geradas (`next/og`) no export estático: não use as convenções `icon.tsx`/`apple-icon.tsx`/`opengraph-image.tsx`, que geram arquivos sem extensão (`out/pt/opengraph-image`), servidos sem `Content-Type` de imagem pelo GitHub Pages. Use um route handler com a extensão no nome da pasta (`og-image.png/route.tsx`) e aponte para ele nos metadados. Todo route handler precisa de `export const dynamic = "force-static"` declarado no próprio arquivo (não pode ser reexportado) e, sob `[locale]`, do seu próprio `generateStaticParams`: route handlers não herdam o do layout.
- Tema: o script anti-flash é um `<script>` inline no `<head>` (via `ThemeScript`), não `next/script`: o `beforeInteractive` não garante rodar antes da primeira pintura. Todo layout raiz precisa do `ThemeScript` e de `suppressHydrationWarning` no `<html>`, porque o script muda `data-theme` antes da hidratação. O Lightning CSS do Tailwind converte `light-dark()` em variáveis `--lightningcss-light/dark`; o `color-scheme` continua sendo o que troca o tema.
- Tailwind 4: `translate-*` e `scale-*` usam as propriedades CSS `translate` e `scale`, não `transform` (em teste, leia `getComputedStyle(el).translate`). Para desligar movimento com `prefers-reduced-motion`, ponha o efeito em `motion-safe:` em vez de anulá-lo com `motion-reduce:`: as duas regras têm a mesma especificidade e a ordem do CSS gerado pode fazer o override perder.
- A variante `dark:` do Tailwind é customizada em `tokens.css`: segue `data-theme` e, sem ele, `prefers-color-scheme`, igual às cores. Use-a para o que depende do esquema em vigor (ex.: ícone sol/lua do `ThemeSelect`) em vez de estado React, que só estaria certo depois da hidratação.
- `ThemeSelect` é um listbox próprio (WAI-ARIA "select-only combobox"), não um `<select>`: a lista nativa não aceita estilização. O foco fica sempre no botão, e a opção ativa é indicada por `aria-activedescendant`. Nos testes com Testing Library, a lista fechada (`hidden`) tem nome acessível vazio: busque-a por `getByRole("listbox", { hidden: true })`, sem `name`.
- Histórico no App Router: o Next remenda `history.pushState`/`replaceState` para copiar o estado do router para a entrada nova, e recarrega a página num `popstate` cuja entrada não tem esse estado. Chame sempre `window.history.pushState(null, "", url)` (a versão remendada), nunca guarde uma referência ao `pushState` original. O drawer de projetos depende disso para o Voltar fechar o drawer sem recarregar (conferido no build estático; o teste em Chromium não passa pelo Next).
- `<dialog>`: não ponha classe de `display` (`flex`, `grid`) direto no elemento, porque ela vence o `display: none` do dialog fechado e ele aparece na página; use `open:flex`. A trava de rolagem da página é CSS (`html:has(dialog:modal)` no `globals.css`), sem `scrollbar-gutter`: com barra de rolagem clássica o espaço reservado deixaria uma faixa entre o drawer e a borda da tela.
- Controles que só funcionam com JS (botão de copiar, controles do carrossel, "Ver detalhes" do projeto) levam o atributo `data-requires-js`: um `<noscript><style>` no `<head>` de `[locale]` os esconde sem JavaScript. Não os renderize só depois da hidratação (ex.: com estado `mounted`), porque isso muda o layout e gera CLS.
- Um novo layout raiz ou a `global-not-found` precisam de `icons: siteIcons` nos metadados; sem `app/layout.tsx` não há onde declarar os ícones uma vez só.
- Turbopack não suporta `import.meta.resolve`. Arquivos lidos no build (fontes, `public/icon.svg`) são localizados a partir de `process.cwd()`, que é `services/frontend` no `next build`, nos scripts do npm e no Vitest.
- `next dev` rodado por um agente (Claude Code) acrescenta um bloco `nextjs-agent-rules` a este `CLAUDE.md` (`node_modules/next/dist/server/lib/generate-agent-files.js`, só quando detecta agente). Se aparecer como efeito de um teste seu, restaure o arquivo com `git restore`; não edite o bloco à mão. O serviço `frontend-dev` não dispara isso (o container não tem as variáveis de agente).
- Servidor de dev ligado (`npm run dev` ou `frontend-dev`) ocupa a porta 3000, a mesma que o e2e usa; fora do CI o Playwright reaproveita o servidor existente e testaria o modo dev. Pare o dev antes do e2e.
- O container (`Dockerfile` + `nginx.conf`) imita o GitHub Pages: redirect `/pt` -> `/pt/` relativo (`absolute_redirect off`, senão perde a porta 8080), `404.html` para rotas inexistentes e gzip nos arquivos de texto (sem ele o Lighthouse local não é comparável ao de produção). Mudou o comportamento de um, confira o outro.

## Referência

`DESIGN_SYSTEM.md` da raiz para tokens · `PRD.md` da raiz para contexto do produto · skill `frontend-design` para direção estética de UI nova · skill `design-system` para consistência, tokens e acessibilidade
