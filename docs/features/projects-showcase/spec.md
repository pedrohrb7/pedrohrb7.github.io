# Spec - Seção de projetos rica

## O que faz

Transforma a seção Projetos de uma lista de texto em vitrine: cada projeto pode ter imagem, link para o repositório e link para a demo. Serve principalmente ao público "engenheiros avaliando o candidato" do `PRD.md`, que querem chegar ao código rápido.

## Bloqueio

Depende da questão "Quais projetos pessoais/open source entram na seção de Projetos?" em `OPEN_QUESTIONS.md`. Sem projetos públicos escolhidos, a feature não entrega valor. A apresentação (carrossel) é uma feature separada, que não depende desta: `docs/features/projects-carousel/`.

## Conteúdo

- O tipo `Project` (`services/frontend/src/types/content.ts`) ganha campos opcionais:
  - `repoUrl` - repositório público.
  - `demoUrl` - demo publicada.
  - `image` - `{ src, alt }`, com `alt` traduzido.
- Projetos sem esses campos (ex.: AutoSim, código fechado) continuam renderizando como hoje.
- Textos por idioma em `pt.ts` e `en.ts`; URLs e caminhos de imagem iguais nos dois (candidatos a um arquivo compartilhado, como `profile.ts`).
- Rótulos novos ("Código", "Demo") em `Content.ui`.

## Interface

- Os cards aparecem no carrossel de `docs/features/projects-carousel/`; esta feature só acrescenta os links e a imagem ao card.
- Links de repositório/demo com `↗`, abrindo em nova aba (`ButtonLink` `external` ou link de texto no mesmo padrão).
- Imagens no topo do card, com proporção fixa para não causar layout shift; estáticas em `public/`, otimizadas antes do commit (WebP/AVIF, largura do conteúdo em 2x), já que `next/image` roda sem otimização no export.

## Critérios de aceite

- Projeto com e sem links/imagem renderiza corretamente nos dois idiomas, dentro do carrossel.
- Nenhum overflow horizontal em 360px.
- Imagens com `alt`, `width` e `height`; Lighthouse continua >= 95.
- Teste de componente cobrindo os campos opcionais.

## Fora de escopo

- Página de detalhe por projeto (continua fora da v1 no `PRD.md`).
- Integração com a API do GitHub em runtime.
