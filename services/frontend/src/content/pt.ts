import type { Content } from "@/types/content";

export const pt: Content = {
  meta: {
    title: "Pedro Borges | Desenvolvedor Full-Stack",
    description:
      "Desenvolvedor Full-Stack com experiência em TypeScript, NestJS, Node.js, React, Next.js, microsserviços e modernização de sistemas legados.",
  },
  ui: {
    skipToContent: "Pular para o conteúdo",
    primaryNav: "Navegação principal",
    languageSwitcher: "Idioma",
    theme: { label: "Tema", options: { system: "Sistema", light: "Claro", dark: "Escuro" } },
    sections: {
      about: "Sobre",
      experience: "Experiência",
      projects: "Projetos",
      skills: "Habilidades",
      education: "Formação",
      contact: "Contato",
    },
    contactHeadline: "Vamos conversar",
    contactBody: "Estou aberto a oportunidades remotas ou híbridas. Fale comigo por e-mail ou pelas redes abaixo.",
    copyEmail: { copy: "Copiar", copyAriaLabel: "Copiar e-mail", copied: "Copiado!", failed: "Não foi possível copiar" },
    projectsCarousel: {
      roleDescription: "carrossel",
      slideRoleDescription: "projeto",
      slideLabel: "{n} de {total}",
      track: "Lista de projetos",
      previous: "Projeto anterior",
      next: "Próximo projeto",
      goTo: "Ir para o projeto {n}",
      hint: "Deslize ou use as setas",
    },
    projectDetails: {
      open: "Ver detalhes",
      openAriaLabel: "Ver detalhes do projeto {name}",
      close: "Fechar detalhes",
      hashPrefix: "projeto-",
      stackByLayer: "Stack por camada",
    },
    resumeCta: "Baixar currículo (PDF)",
    stackLabel: "Stack",
    notFound: {
      title: "Página não encontrada",
      body: "O endereço que você acessou não existe ou foi movido.",
      backHome: "Voltar ao início",
    },
  },
  title: "Desenvolvedor Full-Stack · Mobile",
  location: "São Paulo - SP",
  about: [
    "Desenvolvedor Full-Stack com atuação no ciclo completo de desenvolvimento de software, do back-end ao front-end. Tenho autonomia para conduzir demandas do início ao fim, com experiência na modernização de arquiteturas legadas, implementação de microsserviços e migração de sistemas.",
    "Trabalho principalmente com o ecossistema JavaScript/TypeScript (NestJS, Node.js, React, Next.js e React Native) e também desenvolvo em Java com Spring Boot no back-end. Atuo com bancos como MySQL, MongoDB e Postgres, containerização com Docker e deploy em cloud (AWS). Cultivo cultura de qualidade com testes automatizados e code review como prática de time, em ambientes ágeis remotos e distribuídos.",
  ],
  experience: [
    {
      company: "DMK3 Tecnologia",
      role: "Desenvolvedor Full-Stack",
      period: "Mai 2025 - Atual",
      workMode: "Híbrido",
      stack: ["NestJS", "Node.js", "TypeScript", "TypeORM", "React (Vite)", "MySQL", "Oracle DB", "Docker", "Jest", "Vitest", "Playwright"],
      highlights: [
        "Conduzi, como back-end principal, o ciclo completo de um sistema financeiro para um órgão do Governo do Estado de São Paulo, da definição técnica ao deploy e close-out.",
        "Liderei a migração de uma arquitetura legada para NestJS, incluindo a migração do banco de dados de Oracle para MySQL.",
        "Mapeei features, comportamentos e regras de negócio junto a gestão e design, participando das decisões de arquitetura e do planejamento de sprints (Scrum).",
        "Garanto qualidade com testes unitários (Jest, Vitest) e e2e (Playwright), e participo ativamente do code review do time.",
        "Desenvolvi uma API de logs para auditoria de dados abrangendo todos os projetos internos.",
        "Melhorei o front-end e refatorei o back-end do portal de acesso do cliente, além de contribuir com documentação técnica e de processos.",
      ],
    },
    {
      company: "Grupo New Way",
      role: "Desenvolvedor Full-Stack",
      period: "Out 2021 - Mai 2025",
      workMode: "Remoto",
      stack: ["Node.js", "NestJS", "React", "Next.js", "TypeScript", "Microsserviços", "RabbitMQ", "MongoDB", "MySQL", "Redis", "Docker", "Jest", "Cypress", "Testing Library"],
      highlights: [
        "Atuei na evolução e manutenção de uma plataforma construtora de bots composta por sete microsserviços, com BFF, comunicação entre serviços via filas com RabbitMQ e banco MongoDB.",
        "Implementei o SigNoz para observabilidade e mapeamento de slow queries, embasando o plano de ação de performance.",
        "Desenvolvi caixas de contexto, integrações com terceiros e logs para auditoria.",
        "Participei da definição e da refatoração do front-end de um CRM, migrando a aplicação para Next.js com um novo layout a partir do protótipo do time de design.",
        "Mantive e evoluí uma plataforma de multicanalidade que centralizava WhatsApp, Instagram e outros canais em uma única tela.",
        "Escrevi testes automatizados (Jest, Cypress, Testing Library) e atuei no code review como prática recorrente do time.",
      ],
    },
    {
      company: "NewTab Academy",
      role: "Estágio em Desenvolvimento",
      period: "Abr 2021 - Out 2021",
      workMode: "Remoto",
      stack: ["JavaScript", "Laravel", "Angular", "MongoDB", "MySQL", "Redis", "RabbitMQ"],
      highlights: ["Desenvolvi e mantive novas features para uma plataforma de atendimento multicanal."],
    },
    {
      company: "AlgarTech",
      role: "Analista de Suporte",
      period: "Abr 2015 - Abr 2021",
      stack: [],
      highlights: [
        "Suporte ao usuário final e atendimento de campo, com administração de usuários e acessos em Active Directory, configuração de perfis Windows e suporte a sistemas internos para clientes como KPMG, CPTM, Serasa e Mary Kay.",
      ],
    },
  ],
  projects: [
    {
      name: "Plataforma Financeira",
      slug: "plataforma-financeira",
      role: "DMK3 · Full-Stack",
      description:
        "Sistema de gestão financeira de um órgão do Governo do Estado de São Paulo: compras, pagamentos, estornos, devoluções e ressarcimentos, com rastreabilidade de ponta a ponta.",
      stack: ["NestJS", "Fastify", "TypeScript", "TypeORM", "MySQL", "React", "Vite", "Ant Design", "TanStack Query", "Docker", "Jest"],
      highlights: [
        "Atuei como back-end principal e também no front-end, conduzindo o ciclo completo da definição técnica ao deploy.",
        "Traduzi as regras financeiras do órgão em fluxos e requisitos do sistema junto à gestão, e validei essas regras antes de cada liberação.",
        "Integrei o sistema à API de logs de auditoria e reduzi a imagem Docker do front-end de 832 MB para cerca de 180 MB.",
      ],
      details: {
        caseStudy: [
          {
            heading: "Contexto e desafio",
            body: [
              "Um órgão público com vários processos administrativos precisava estruturar digitalmente a sua gestão financeira: compras, pagamentos e movimentações internas, incluindo estornos, devoluções e ressarcimentos.",
              "Era um ambiente de alta criticidade e impacto orçamentário. O sistema precisava padronizar os fluxos financeiros, dar rastreabilidade a cada pagamento e consolidar as informações para a gestão, com controle rigoroso sobre cada movimentação.",
            ],
          },
          {
            heading: "Minha atuação",
            body: [
              "Fui o desenvolvedor back-end principal e atuei também no front-end, conduzindo o sistema da definição técnica ao deploy e à entrega final.",
              "Além do código, levantei as regras financeiras com as áreas envolvidas e as traduzi em fluxos e requisitos, ajudei a priorizar o backlog e a conduzir as cerimônias Scrum, e validei as regras com testes funcionais antes de cada liberação.",
            ],
          },
          {
            heading: "Arquitetura e decisões",
            body: [
              "O back-end é uma API em NestJS sobre Fastify, organizada em módulos por domínio (depósitos, prestação de contas, devoluções), com TypeORM e migrações versionadas no MySQL, autenticação por JWT e documentação da API em Swagger.",
              "Operações pesadas ficam fora da requisição: as exportações de relatórios (PDF, CSV e planilha) são processadas por uma fila própria no banco, com nova tentativa em caso de falha e limpeza agendada dos arquivos. A rastreabilidade vem da integração com a API de logs de auditoria da empresa.",
              "O front-end é uma aplicação React com Vite e Ant Design, dados via TanStack Query e formulários validados com React Hook Form e Zod. O back-end tem uma suíte de testes unitários em Jest, e as duas aplicações rodam em containers Docker.",
            ],
          },
          {
            heading: "Impacto e resultados",
            body: [
              "O fluxo financeiro do órgão passou a ser digital e padronizado, com mais controle orçamentário, rastreabilidade das movimentações e informações consolidadas para a tomada de decisão.",
              "No front-end, a revisão do build Docker reduziu a imagem de produção de 832 MB para cerca de 180 MB.",
            ],
          },
        ],
        stackByLayer: [
          { label: "Back-end", items: ["NestJS", "Fastify", "TypeScript", "TypeORM", "JWT", "Swagger", "Jest"] },
          { label: "Front-end", items: ["React", "TypeScript", "Vite", "Ant Design", "TanStack Query", "Zustand", "React Hook Form", "Zod"] },
          { label: "Dados e infra", items: ["MySQL", "Docker"] },
        ],
      },
    },
    {
      name: "AutoSim",
      role: "Freelancer Full-Stack · 6 meses",
      description: "Plataforma de compra e venda de carros.",
      stack: ["React Native (Expo)", "Next.js", "NestJS", "Node.js", "MongoDB", "Redux", "Context API"],
      highlights: [
        "Atuei de forma autônoma nas três frentes do produto: mobile, front-end e back-end.",
        "Conduzi a migração do back-end principal para NestJS (v2), elevando a legibilidade e a manutenibilidade do código.",
        "Desenvolvi o app em React Native (Expo, Redux, Context API) e o front-end em Next.js, com foco em performance e refatoração em todas as camadas.",
      ],
    },
    {
      name: "Accountability",
      role: "Projeto pessoal · Full-Stack · Em andamento",
      description: "Aplicação multiusuário de controle financeiro pessoal, com contas bancárias, lançamentos e parcelamentos a receber.",
      stack: ["TypeScript", "React", "Vite", "Tailwind CSS", "Express", "TypeORM", "MySQL", "Docker"],
      highlights: [
        "Atuo de forma autônoma em todas as frentes do produto: planejamento, design, back-end e front-end.",
        "Estruturei o projeto como monorepo com a API, a web e o app mobile em submodules separados, orquestrados por Docker Compose para subir MySQL, API e web com um comando.",
        "Estou conduzindo o desenvolvimento com TDD (Jest, Testing Library e Supertest), com testes e2e da API rodando contra um banco MySQL dedicado.",
      ],
    },
  ],
  skills: [
    { label: "Linguagens", items: ["JavaScript", "TypeScript", "Java", "Kotlin", "PHP", "HTML", "CSS/SCSS"] },
    { label: "Back-end", items: ["NestJS", "Node.js", "Express", "Spring Boot", "Microsserviços", "BFF", "RabbitMQ", "REST APIs"] },
    {
      label: "Front-end",
      items: ["React", "Next.js", "React Native", "Vue.js", "Redux", "Context API", "Zustand", "Tailwind CSS", "Styled Components", "Material UI", "Ant Design"],
    },
    { label: "Bancos de dados", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle"] },
    { label: "Testes e qualidade", items: ["Jest", "Vitest", "Cypress", "Playwright", "Testing Library", "Testes unitários e e2e", "Code review"] },
    {
      label: "DevOps e ferramentas",
      items: ["Docker", "Docker Compose", "Git", "GitLab", "Github", "Bitbucket", "AWS", "SigNoz", "ESLint", "Prettier", "NeoVim", "Linux"],
    },
    { label: "Metodologias", items: ["Scrum", "Kanban", "Trabalho remoto e distribuído"] },
  ],
  education: [
    {
      course: "Análise e Desenvolvimento de Sistemas",
      institution: "Unicid",
      period: "Jan 2025 - Jun 2026",
    },
  ],
};
