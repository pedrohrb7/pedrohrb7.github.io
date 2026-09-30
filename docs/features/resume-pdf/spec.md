# Spec - Currículo em PDF

## O que faz

Gera um currículo em PDF por idioma durante o build, a partir do mesmo conteúdo do site (`services/frontend/src/content/`), e oferece um link de download na página. O PDF nunca diverge do site porque não tem fonte de conteúdo própria.

## Arquivos gerados

| Arquivo | Idioma | Linkado em |
|---|---|---|
| `out/pt/pedro-borges-fullstack-developer.pdf` | PT | `/pt/` |
| `out/en/pedro-borges-fullstack-developer.pdf` | EN | `/en/` |

Nome fixo (sem hash) para que o link possa ser compartilhado diretamente, e o mesmo nos dois idiomas: cada PDF fica na pasta do seu idioma, junto das páginas dele. Até 2026-09-29 os arquivos ficavam na raiz com nomes por idioma (`pedro-borges-curriculo.pdf` e `pedro-borges-resume.pdf`); os nomes antigos foram removidos sem cópia (decisão do Pedro), então links antigos compartilhados passam a dar 404.

## Conteúdo

- Mesmas seções da página: título, nome, localização, links (e-mail, GitHub, LinkedIn), Sobre, Experiência, Projetos, Habilidades e Formação.
- Sem telefone nem outros dados pessoais (veja `CONSTRAINTS.md`).
- Rótulos novos (ex.: texto do botão de download) entram em `Content.ui` e são preenchidos em `pt.ts` e `en.ts`.
- Layout A4, uma coluna, preto sobre branco, mesmas fontes do site (Geist / Geist Mono), links clicáveis.

## Geração

- `@react-pdf/renderer` em Node, sem navegador, rodando depois do `next build`.
- O documento do PDF é separado dos componentes do site (primitivas do react-pdf, sem Tailwind), mas lê o mesmo `Content` e `profile`. Nenhum texto fica hardcoded nele.

## Interface

- Botão "Baixar currículo (PDF)" / "Download resume (PDF)" no hero, usando `ButtonLink` com o atributo `download`.
- A partir de `md` (768px), fica alinhado à direita, na mesma linha dos links de contato (e-mail, GitHub, LinkedIn), que ficam à esquerda. Abaixo de `md`, desce para a linha de baixo, alinhado à esquerda.
- O link aponta sempre para o PDF do idioma da página.
- No `npm run dev` o link dá 404: os PDFs só existem depois do `npm run build`.

## Critérios de aceite

- `npm run build` gera os dois PDFs em `out/` sem passo manual.
- O texto extraído de cada PDF contém o nome, o título e todas as empresas da seção Experiência do idioma correspondente.
- Nenhum PDF contém número de telefone.
- O link de download existe nas duas páginas e responde 200 com `Content-Type: application/pdf` no build estático servido (e2e) e no container nginx.
- O CI falha se a geração do PDF falhar.

## Fora de escopo

- Editor de currículo ou versões alternativas (ex.: resumida).
- PDF gerado no navegador do visitante.
