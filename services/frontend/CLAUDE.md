# CLAUDE.md - frontend (Frontend)

## Estrutura

- `src/app/[locale]/` - layout raiz e página de cada idioma (gerados via `generateStaticParams`). `src/app/(root)/` - layout raiz separado só para `/`, que redireciona para um idioma no navegador. Não existe `src/app/layout.tsx`: são dois layouts raiz de propósito, para cada página ter o `<html lang>` correto.
- `src/app/global-not-found.tsx` - 404 bilíngue (vira `out/404.html`). Exige `experimental.globalNotFound` no `next.config.ts`, porque com dois layouts raiz não há layout único para envolver um `not-found.tsx`. É um documento completo: importa estilos e fontes por conta própria.
- `src/content/` - todo o texto do site. `pt.ts` e `en.ts` seguem o tipo `Content` (`src/types/content.ts`); `profile.ts` guarda dados que não mudam por idioma (nome, e-mail, links).
- `src/ui/` - primitivos genéricos. `src/components/<feature>/` - uma pasta por seção da página.
- `src/lib/i18n.ts` - locales, detecção de idioma e caminhos. `src/lib/fonts.ts` - fontes via `next/font`.
- `src/styles/tokens.css` - tokens de design (espelho do `DESIGN_SYSTEM.md` da raiz).

## Convenções

- `ui/` = primitivos genéricos, sem regra de negócio. `components/<feature>/` = específicos de uma seção. Um componente só vai para `ui/` se uma segunda seção o reutilizaria como está.
- Páginas ficam finas: compõem componentes e passam conteúdo; lógica vai para `lib/`.
- Tokens de design vivem no `DESIGN_SYSTEM.md` da raiz, espelhados em `src/styles/tokens.css`. Nunca use valor avulso de cor/espaçamento/tipografia; estenda os tokens nos dois lugares.
- Não há `stores/`: o site não tem estado global.
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
- `globalNotFound` ainda é experimental no Next 16. Ao atualizar o Next, confira se a flag mudou de nome ou saiu do `experimental` (o teste e2e "not found page" acusa se a 404 quebrar).
- O container (`Dockerfile` + `nginx.conf`) imita o GitHub Pages: redirect `/pt` -> `/pt/` relativo (`absolute_redirect off`, senão perde a porta 8080) e `404.html` para rotas inexistentes. Mudou o comportamento de um, confira o outro.

## Referência

`DESIGN_SYSTEM.md` da raiz para tokens · `PRD.md` da raiz para contexto do produto · skill `frontend-design` para direção estética de UI nova · skill `design-system` para consistência, tokens e acessibilidade
