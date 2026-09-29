# PRD - Portfolio Pedro Borges

Site pessoal que apresenta a trajetória, os projetos e as habilidades de Pedro Borges para recrutadores e empresas, em português e inglês.

## Problema

O currículo hoje existe apenas como documento (`resume.md`) e perfil do GitHub/LinkedIn. Falta um endereço único, rápido e compartilhável que apresente o trabalho de forma clara, com versão em inglês para vagas remotas internacionais.

## Usuários-alvo

- **Recrutadores (Brasil):** leem em português, querem entender em poucos segundos senioridade, stack e experiência recente.
- **Recrutadores e empresas internacionais:** mesmo objetivo, em inglês.
- **Engenheiros avaliando o candidato:** querem ver profundidade técnica e, em seguida, código (GitHub).

## Objetivos

- Apresentar resumo, experiências, projetos, habilidades, formação e contato em uma única página.
- Oferecer PT e EN com seletor de idioma e detecção automática pelo navegador na primeira visita.
- Publicar no GitHub Pages sem custo, com deploy automático a cada push na `main`.
- Servir também como amostra de qualidade de engenharia (testes, acessibilidade, performance).

## Não-objetivos

- Blog ou CMS.
- Formulário de contato com backend (contato é por e-mail e redes).
- Domínio próprio (o site fica em `pedrohrb7.github.io`).
- Telefone ou outros dados pessoais além de e-mail e perfis públicos.

## Critérios de sucesso

- Lighthouse >= 95 em Performance, Accessibility, Best Practices e SEO nas duas versões.
- Nenhum overflow horizontal em 360px de largura.
- Deploy da `main` publicado em menos de 5 minutos após o push.

## Fluxos principais

### Fluxo: primeira visita

1. O visitante acessa `https://pedrohrb7.github.io/`.
2. O site detecta o idioma do navegador e redireciona para `/pt/` ou `/en/` (padrão `/pt/`).
3. O visitante lê o resumo e navega pelas seções pelo menu ou rolando.
4. O visitante entra em contato por e-mail ou abre GitHub/LinkedIn.

### Fluxo: troca de idioma

1. O visitante clica em PT/EN no header.
2. A página equivalente no outro idioma é carregada.

## Escopo

| Módulo | Na v1? | Spec |
|---|---|---|
| Página do portfolio (seções + i18n) | Sim | `docs/features/portfolio/spec.md` |
| Currículo em PDF (um por idioma, gerado no build a partir de `src/content/`) | Sim (no ar) | `docs/features/resume-pdf/spec.md` |
| SEO e assets (favicon, Open Graph, sitemap, robots, Lighthouse) | Sim (no ar) | `docs/features/seo-assets/spec.md` |
| Seção de projetos rica (imagem, repositório, demo) | Não (bloqueada pela escolha de projetos) | `docs/features/projects-showcase/spec.md` |
| Melhorias de UX (tema manual, seção atual no menu) | Sim (no ar) | `docs/features/ux-enhancements/spec.md` |
| Dados estruturados JSON-LD (`ProfilePage`/`Person`) | Não (backlog) | `docs/features/structured-data/spec.md` |
| Carrossel de projetos | Sim | `docs/features/projects-carousel/spec.md` |
| E-mail com botão de copiar (hero e Contato) | Sim | `docs/features/copy-email/spec.md` |
| Detalhes do projeto em drawer (estudo de caso e stack por camada) | Sim | `docs/features/project-details/spec.md` |
| Detalhe de projetos (páginas por projeto, proposta em `wireframe/dark-nexus-project.html`) | Não (substituída pelo drawer) | - |
| Transições de interface (idioma, tema, entrada das seções, microinterações, modal e drawer) | Em andamento (troca de idioma, de tema e microinterações prontas; o resto em backlog) | `docs/features/ui-transitions/spec.md` |

Status e mapa de todas as features: `docs/features/README.md`.

## Restrições e questões em aberto

Veja `CONSTRAINTS.md` para limites rígidos e `OPEN_QUESTIONS.md` para decisões pendentes.
