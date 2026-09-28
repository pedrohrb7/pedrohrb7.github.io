# Spec - Página do portfolio

## O que faz

Página única por idioma com as seções: hero (título, nome, localização, links), Sobre, Experiência, Projetos, Habilidades, Formação e Contato. Header fixo com menu de âncoras (a partir de `md`) e seletor PT/EN.

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Detecta `navigator.languages` e redireciona para `/pt/` ou `/en/` (padrão `pt`). Sem JS, mostra links para os dois idiomas. `noindex`. |
| `/pt/` | Página em português, `<html lang="pt-BR">` |
| `/en/` | Página em inglês, `<html lang="en">` |
| qualquer outra | `404.html` bilíngue (PT e EN lado a lado), com header/footer do site e botões para `/pt/` e `/en/`. `noindex`. |

## Conteúdo

- Fonte: `services/frontend/src/content/{pt,en}.ts`, derivado do `resume.md` do repositório de perfil `pedrohrb7/pedrohrb7`.
- Parágrafos longos do currículo foram quebrados em tópicos (`highlights`) por experiência para leitura rápida.
- Telefone não é publicado (veja `OPEN_QUESTIONS.md`).

## SEO

- `title`, `description` e Open Graph por idioma.
- `canonical` e `alternates.languages` (hreflang) apontando para as duas versões.

## Fora de escopo

Veja "Não-objetivos" no `PRD.md`.
