# Deploy - Portfolio Pedro Borges

## Ambientes

| Ambiente | URL | Publica a partir de | Propósito |
|---|---|---|---|
| Local | `http://localhost:8080` (`services/docker-compose.yml`) ou `http://localhost:3000` (`npm run dev`) | - | Desenvolvimento |
| Produção | https://pedrohrb7.github.io | `main` | Site público |

## Publicando um serviço

### `services/frontend`

- Trigger: push na `main` (ou execução manual em Actions). Pull requests rodam só as verificações, sem publicar.
- Filtro de caminhos (push e pull request): o workflow só roda quando a mudança toca em `services/frontend/**` (exceto arquivos `.md`), `.nvmrc` ou no próprio `.github/workflows/deploy.yml`. Mudanças só em documentação (`docs/`, `.md` da raiz e do frontend), `wireframe/` ou `services/docker-compose.yml` não rodam verificações nem publicam, porque não mudam o site. Um push que mistura código e docs roda normalmente.
- Para publicar um commit que o filtro ignorou, rode o workflow à mão em Actions > "Deploy to GitHub Pages" > Run workflow.
- Novo serviço em `services/` ou outro arquivo lido no build ou nos testes fora de `services/frontend/`: acrescente o caminho às duas listas `paths` do workflow (push e pull request).
- Se a `main` passar a exigir o check `check` em pull requests, um PR só de docs fica esperando um check que nunca roda. Nesse caso, troque o filtro do `pull_request` por um passo que detecte mudanças dentro do job.
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
