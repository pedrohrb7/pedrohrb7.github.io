import type { Content } from "@/types/content";

export const en: Content = {
  meta: {
    title: "Pedro Borges | Full-Stack Developer",
    description:
      "Full-Stack developer experienced in TypeScript, NestJS, Node.js, React, Next.js, microservices and legacy system modernization.",
  },
  ui: {
    skipToContent: "Skip to content",
    primaryNav: "Main navigation",
    languageSwitcher: "Language",
    theme: { label: "Theme", options: { system: "System", light: "Light", dark: "Dark" } },
    sections: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      education: "Education",
      contact: "Contact",
    },
    contactHeadline: "Let's talk",
    contactBody: "I'm open to remote or hybrid opportunities. Reach me by email or through the links below.",
    copyEmail: { copy: "Copy", copyAriaLabel: "Copy email", copied: "Copied!", failed: "Couldn't copy" },
    resumeCta: "Download resume (PDF)",
    stackLabel: "Stack",
    notFound: {
      title: "Page not found",
      body: "The address you tried doesn't exist or has moved.",
      backHome: "Back to home",
    },
  },
  title: "Full-Stack Developer",
  location: "São Paulo, Brazil · open to remote/hybrid",
  about: [
    "Full-Stack developer working across the whole software development lifecycle, from back-end to front-end. I own work end to end, with experience modernizing legacy architectures, building microservices and migrating systems.",
    "I work mainly in the JavaScript/TypeScript ecosystem (NestJS, Node.js, React, Next.js and React Native), and I also build back-ends in Java with Spring Boot. I work with databases such as MySQL, MongoDB and Postgres, containerization with Docker and cloud deployment on AWS. I foster a quality culture through automated testing and code review as a team practice, in remote, distributed agile teams.",
  ],
  experience: [
    {
      company: "DMK3 Tecnologia",
      role: "Full-Stack Developer",
      period: "May 2025 - Present",
      workMode: "Hybrid",
      stack: ["NestJS", "Node.js", "TypeScript", "TypeORM", "React (Vite)", "MySQL", "Oracle DB", "Docker", "Jest", "Vitest", "Playwright"],
      highlights: [
        "Led, as the main back-end developer, the full lifecycle of a financial system for ITESP (a São Paulo State Government agency), from technical definition to deploy and close-out.",
        "Led the migration from a legacy architecture to NestJS, including moving the database from Oracle to MySQL.",
        "Mapped features, system behavior and business rules with management and design, taking part in architecture decisions and sprint planning (Scrum).",
        "Ensure quality with unit tests (Jest, Vitest) and e2e tests (Playwright), and actively take part in the team's code review.",
        "Built a logging API for data auditing across every internal project.",
        "Improved the front-end and refactored the back-end of the customer access portal, and contributed to technical and process documentation.",
      ],
    },
    {
      company: "Grupo New Way",
      role: "Full-Stack Developer",
      period: "Oct 2021 - May 2025",
      workMode: "Remote",
      stack: ["Node.js", "NestJS", "React", "Next.js", "TypeScript", "Microservices", "RabbitMQ", "MongoDB", "MySQL", "Redis", "Docker", "Jest", "Cypress", "Testing Library"],
      highlights: [
        "Built a bot-builder platform made of seven microservices, with a BFF, RabbitMQ queues for service-to-service communication and MongoDB.",
        "Introduced SigNoz for observability and slow query mapping, grounding the performance action plan.",
        "Developed context boxes, third-party integrations and audit logs.",
        "Helped define and refactor a CRM front-end, migrating it to Next.js with a new layout based on the design team's prototype.",
        "Maintained and evolved an omnichannel platform that brought WhatsApp, Instagram and other channels into a single screen.",
        "Wrote automated tests (Jest, Cypress, Testing Library) and did code review as a recurring team practice.",
      ],
    },
    {
      company: "NewTab Academy",
      role: "Software Development Intern",
      period: "Apr 2021 - Oct 2021",
      workMode: "Remote",
      stack: ["JavaScript", "Laravel", "Angular", "MongoDB", "MySQL", "Redis", "RabbitMQ"],
      highlights: ["Built and maintained new features for an omnichannel customer service platform."],
    },
    {
      company: "AlgarTech",
      role: "IT Support Analyst",
      period: "Apr 2015 - Apr 2021",
      stack: [],
      highlights: [
        "End-user and field support, managing users and access in Active Directory, configuring Windows profiles and supporting internal systems for clients such as KPMG, CPTM, Serasa and Mary Kay.",
      ],
    },
  ],
  projects: [
    {
      name: "AutoSim",
      role: "Full-Stack Freelancer · 6 months",
      description: "A marketplace for buying and selling cars.",
      stack: ["React Native (Expo)", "Next.js", "NestJS", "Node.js", "MongoDB", "Redux", "Context API"],
      highlights: [
        "Worked independently across all three fronts of the product: mobile, front-end and back-end.",
        "Led the migration of the main back-end to NestJS (v2), improving code readability and maintainability.",
        "Built the React Native app (Expo, Redux, Context API) and the Next.js front-end, focusing on performance and refactoring across every layer.",
      ],
    },
  ],
  skills: [
    { label: "Languages", items: ["JavaScript", "TypeScript", "Java", "Kotlin", "PHP", "HTML", "CSS/SCSS"] },
    { label: "Back-end", items: ["NestJS", "Node.js", "Express", "Spring Boot", "Microservices", "BFF", "RabbitMQ", "REST APIs"] },
    {
      label: "Front-end",
      items: ["React", "Next.js", "React Native", "Vue.js", "Redux", "Context API", "Zustand", "Tailwind CSS", "Styled Components", "Material UI", "Ant Design"],
    },
    { label: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle"] },
    { label: "Testing and quality", items: ["Jest", "Vitest", "Cypress", "Playwright", "Testing Library", "Unit and e2e testing", "Code review"] },
    {
      label: "DevOps and tooling",
      items: ["Docker", "Docker Compose", "Git", "GitLab", "Bitbucket", "AWS", "SigNoz", "ESLint", "Prettier", "NeoVim", "Linux"],
    },
    { label: "Methodologies", items: ["Scrum", "Kanban", "Remote and distributed work"] },
  ],
  education: [
    {
      course: "Systems Analysis and Development (Associate degree)",
      institution: "Unicid",
      period: "Jan 2025 - Jun 2026",
    },
  ],
};
