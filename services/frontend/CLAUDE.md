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
- SEO: `public/icon.svg` (favicon), `src/app/apple-touch-icon.png/route.tsx` e `src/app/[locale]/og-image.png/route.tsx` (imagens geradas no build com `next/og`), `src/app/sitemap.ts` e `src/app/robots.ts`. `src/lib/site-metadata.ts` guarda `siteIcons` (usado pelos três layouts raiz) e o caminho da imagem OG (usado no `generateMetadata` de `[locale]`).

## Convenções

- `ui/` = primitivos genéricos, sem regra de negócio. `components/<feature>/` = específicos de uma seção. Um componente só vai para `ui/` se uma segunda seção o reutilizaria como está.
- Páginas ficam finas: compõem componentes e passam conteúdo; lógica vai para `lib/`.
- Tokens de design vivem no `DESIGN_SYSTEM.md` da raiz, espelhados em `src/styles/tokens.css`. Nunca use valor avulso de cor/espaçamento/tipografia; estenda os tokens nos dois lugares.
- Não há `stores/`: o site não tem estado global.
- Sem biblioteca de componentes (shadcn/ui, Radix, MUI...): componentes próprios sobre os tokens. Se uma feature precisar de um componente interativo complexo, adicione só ele pela CLI do shadcn, adaptado aos nossos tokens (veja "Adotar shadcn/ui no frontend?" no `OPEN_QUESTIONS.md` da raiz).
- Texto visível nunca fica hardcoded em componente: vai em `Content` (campo `ui` para rótulos de interface) e é preenchido em `pt.ts` e `en.ts`. O TypeScript acusa se um idioma ficar sem o campo.
- Links internos de troca de idioma usam `<a>` e não `next/link`: mudar de idioma troca o `<html lang>` e deve ser uma navegação de documento completa.

## Testes

- Testes unitários/componentes ficam ao lado do código (`*.test.ts(x)`), rodando em jsdom.
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
- `ThemeSelect` é um `<select>` invisível (`opacity-0`) sobre o ícone: hover e foco ficam no contêiner (`group-hover`, `has-focus-visible`), porque o ponteiro e o foco estão no `<select>`.
- Um novo layout raiz ou a `global-not-found` precisam de `icons: siteIcons` nos metadados; sem `app/layout.tsx` não há onde declarar os ícones uma vez só.
- Turbopack não suporta `import.meta.resolve`. Arquivos lidos no build (fontes, `public/icon.svg`) são localizados a partir de `process.cwd()`, que é `services/frontend` no `next build`, nos scripts do npm e no Vitest.
- O container (`Dockerfile` + `nginx.conf`) imita o GitHub Pages: redirect `/pt` -> `/pt/` relativo (`absolute_redirect off`, senão perde a porta 8080), `404.html` para rotas inexistentes e gzip nos arquivos de texto (sem ele o Lighthouse local não é comparável ao de produção). Mudou o comportamento de um, confira o outro.

## Referência

`DESIGN_SYSTEM.md` da raiz para tokens · `PRD.md` da raiz para contexto do produto · skill `frontend-design` para direção estética de UI nova · skill `design-system` para consistência, tokens e acessibilidade
