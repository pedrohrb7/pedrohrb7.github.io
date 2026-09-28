# Restrições - Portfolio Pedro Borges

## Técnicas

- Hospedagem no GitHub Pages: o site precisa ser 100% estático (`output: "export"`). Sem API routes, middleware, SSR sob demanda, redirects de servidor ou otimização de imagens do Next.
- O repositório precisa se chamar `pedrohrb7.github.io` para o site ser servido na raiz do domínio (sem `basePath`).
- Toda rota termina com barra (`trailingSlash: true`) para gerar `pasta/index.html`, formato que o GitHub Pages serve corretamente.
- Stack: Next.js + TypeScript + Tailwind CSS.
- Versão do Node definida só no `.nvmrc` da raiz (hoje 24.21.0; mínimo 24.15 por dependências do jsdom/Playwright). O CI lê o `.nvmrc`; o `Dockerfile` (`ARG NODE_VERSION`) e o `engines` do `package.json` (`^<versão>`) repetem o valor, e o teste `test/config/node-version.test.ts` falha se divergirem. O `.npmrc` tem `engine-strict=true`.
- TypeScript fixado na linha 6.x e ESLint na 9.x enquanto `typescript-eslint` e `eslint-plugin-react` não suportam TS 7 / ESLint 10.

## Negócio

- Custo zero de hospedagem.
- Conteúdo em português e inglês com paridade: nenhuma seção pode existir em um idioma e não no outro.

## Conformidade e segurança

- Não publicar dados pessoais além de nome, e-mail e perfis públicos (GitHub, LinkedIn). Isso vale também para o currículo em PDF: telefone nunca é publicado.
- Nenhum segredo é necessário; o repositório é público.

## Explicitamente não é restrição

- Next.js não é obrigatório por necessidade técnica (um gerador estático mais simples atenderia); foi escolhido por alinhamento com a stack do currículo.
- O idioma padrão (`pt`) pode mudar sem impacto estrutural.

## Veja também

Decisões pendentes que podem virar restrições: `OPEN_QUESTIONS.md`. O que estas restrições servem: `PRD.md`.
