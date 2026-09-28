# Spec - Currículo em PDF

## O que faz

Gera um currículo em PDF por idioma durante o build, a partir do mesmo conteúdo do site (`services/frontend/src/content/`), e oferece um link de download na página. O PDF nunca diverge do site porque não tem fonte de conteúdo própria.

## Arquivos gerados

| Arquivo | Idioma | Linkado em |
|---|---|---|
| `out/pedro-borges-curriculo.pdf` | PT | `/pt/` |
| `out/pedro-borges-resume.pdf` | EN | `/en/` |

Nomes fixos (sem hash) para que o link possa ser compartilhado diretamente.

## Conteúdo

- Mesmas seções da página: título, nome, localização, links (e-mail, GitHub, LinkedIn), Sobre, Experiência, Projetos, Habilidades e Formação.
- Sem telefone nem outros dados pessoais (veja `CONSTRAINTS.md`).
- Rótulos novos (ex.: texto do botão de download) entram em `Content.ui` e são preenchidos em `pt.ts` e `en.ts`.
- Layout A4, uma coluna, preto sobre branco, mesmas fontes do site (Geist / Geist Mono), links clicáveis.

## Geração

- `@react-pdf/renderer` em Node, sem navegador, rodando depois do `next build`.
- O documento do PDF é separado dos componentes do site (primitivas do react-pdf, sem Tailwind), mas lê o mesmo `Content` e `profile`. Nenhum texto fica hardcoded nele.

## Interface

- Botão "Baixar currículo (PDF)" / "Download resume (PDF)" no hero, ao lado dos links, usando `ButtonLink` com o atributo `download`.
- O link aponta sempre para o PDF do idioma da página.

## Critérios de aceite

- `npm run build` gera os dois PDFs em `out/` sem passo manual.
- O texto extraído de cada PDF contém o nome, o título e todas as empresas da seção Experiência do idioma correspondente.
- Nenhum PDF contém número de telefone.
- O link de download existe nas duas páginas e responde 200 com `Content-Type: application/pdf` no build estático servido (e2e) e no container nginx.
- O CI falha se a geração do PDF falhar.

## Fora de escopo

- Editor de currículo ou versões alternativas (ex.: resumida).
- PDF gerado no navegador do visitante.
