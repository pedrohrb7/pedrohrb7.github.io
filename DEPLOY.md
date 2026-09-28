# Deploy - Portfolio Pedro Borges

## Ambientes

| Ambiente | URL | Publica a partir de | Propósito |
|---|---|---|---|
| Local | `http://localhost:8080` (`services/docker-compose.yml`) ou `http://localhost:3000` (`npm run dev`) | - | Desenvolvimento |
| Produção | https://pedrohrb7.github.io | `main` | Site público |

## Publicando um serviço

### `services/frontend`

- Trigger: push na `main` (ou execução manual em Actions). Pull requests rodam só as verificações, sem publicar.
- Pipeline: `.github/workflows/deploy.yml` - lint, typecheck, Vitest, Playwright contra o build estático, upload de `services/frontend/out` e deploy no GitHub Pages.
- Passos manuais: nenhum além do merge na `main`. Configuração única: Settings > Pages > Source = "GitHub Actions".

## Segredos e configuração

- Nenhum segredo. O deploy usa o token OIDC do próprio GitHub Actions (`id-token: write`).

## Rollback

- Reverter o commit na `main` e fazer push; o workflow publica a versão anterior. Alternativa: reexecutar em Actions o workflow de um commit anterior.

## Monitoramento e alertas

- Status dos deploys na aba Actions e em Settings > Pages do repositório.

## Infra

- GitHub Pages (hospedagem estática do GitHub). Sem infraestrutura como código.
