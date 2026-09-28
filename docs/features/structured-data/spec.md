# Spec - Dados estruturados (JSON-LD)

## O que faz

Adiciona dados estruturados `schema.org` (JSON-LD) às páginas de idioma, para buscadores entenderem que a página é o perfil profissional de uma pessoa: nome, cargo, localização, links e site. Ajuda o Google a associar o site ao nome e aos perfis (GitHub, LinkedIn) no painel de conhecimento e nos resultados.

## Conteúdo

- Um bloco `<script type="application/ld+json">` em `/pt/` e `/en/` com um `ProfilePage` cujo `mainEntity` é um `Person`:
  - `name`, `jobTitle` (título do idioma), `url` (página do idioma), `image` (imagem Open Graph do idioma), `email`, `address` (cidade/estado/país, sem endereço exato), `sameAs` (GitHub e LinkedIn), `knowsAbout` (derivado das habilidades), `alumniOf` (formação).
  - `inLanguage` da página.
- Tudo derivado de `Content` (`pt.ts`/`en.ts`) e `profile.ts`, nunca hardcoded. Sem telefone (veja `CONSTRAINTS.md`).
- Não entra em `/` (é `noindex` e só redireciona) nem na 404.

## Critérios de aceite

- O JSON-LD de cada idioma valida sem erros no Rich Results Test e no validador do schema.org.
- E2E: as duas páginas têm exatamente um bloco JSON-LD, que faz parse e tem `@type` `ProfilePage` com `mainEntity.name` igual ao nome do perfil.
- Teste unitário da função que monta o objeto, cobrindo os dois idiomas e a ausência de telefone.
- Lighthouse SEO continua em 100.

## Fora de escopo

- Outros tipos (`WebSite` com busca, `BreadcrumbList`, `CreativeWork` por projeto). Projetos podem ganhar dados estruturados junto com `docs/features/projects-showcase/`.
