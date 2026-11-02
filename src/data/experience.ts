import type { ExperienceItem } from '../types';

export const experiences: ExperienceItem[] = [
  {
    id: 'andradina-backend',
    company: 'Prefeitura Municipal de Andradina',
    area: {
      'pt-BR': 'Desenvolvimento Backend / Sistemas Internos',
      'en-US': 'Backend Development / Internal Systems',
    },
    period: {
      'pt-BR': 'Maio 2023 – Presente',
      'en-US': 'May 2023 – Present',
    },
    description: {
      'pt-BR': "Desenvolvo e mantenho o sistema web da Vigilância Sanitária de Andradina. Criei a aplicação do zero para substituir registros em papel, organizar denúncias e facilitar a consulta ao histórico dos atendimentos.",
      'en-US': "I develop and maintain the web system for Andradina’s public health department. I built it from scratch to replace paper records, organize complaints and make case histories easier to find.",
    },
    responsibilities: {
      'pt-BR': [
        "Conversei com servidores e fiscais sanitários para levantar os requisitos",
        "Desenvolvi o backend em Node.js, organizado em módulos",
        "Criei e mantive APIs REST para as consultas da equipe",
        "Modelei os dados em MySQL e Sequelize, com índices compostos de unicidade",
        "Vinculei os registros de auditoria ao responsável para acompanhar as alterações",
        "Implantei e administrei a infraestrutura Linux local",
        "Configurei o Nginx como proxy reverso, encaminhando Host e IP de origem",
        "Usei PM2 para supervisionar e reiniciar os processos",
        "Criei painéis e relatórios operacionais com Chart.js",
      ],
      'en-US': [
        "Gathered requirements directly from municipal staff and health inspectors",
        "Built the Node.js backend with a modular structure",
        "Built and maintained REST APIs for the team’s operational queries",
        "Modeled data in MySQL and Sequelize with composite unique indexes",
        "Linked audit records to the responsible user to track changes",
        "Deployed and administered local Linux infrastructure",
        "Configured Nginx as a reverse proxy with Host and source-IP forwarding",
        "Used PM2 to supervise and restart processes",
        "Built dashboards and operational reports with Chart.js",
      ],
    },
    technologies: ['Node.js', 'Sequelize ORM', 'MySQL', 'Linux Server', 'Nginx', 'PM2', 'Chart.js', 'EJS'],
  },
  {
    id: 'estagio-suporte',
    company: 'Estágio em Suporte e Sistemas',
    area: {
      'pt-BR': 'Suporte Técnico e Administração de Sistemas',
      'en-US': 'Technical Support & Systems Administration',
    },
    period: {
      'pt-BR': 'Junho 2022 – Abril 2023',
      'en-US': 'June 2022 – April 2023',
    },
    description: {
      'pt-BR': "Trabalhei com administração de sistemas e redes, suporte aos usuários e scripts para automatizar tarefas da rotina.",
      'en-US': "I worked on systems and network administration, user support and scripts to automate routine tasks.",
    },
    responsibilities: {
      'pt-BR': [
        "Administrei e dei suporte a servidores Linux e Windows Server",
        "Configurei e gerenciei roteadores e firewalls MikroTik",
        "Configurei regras de firewall e proxy de rede",
        "Escrevi scripts administrativos para tarefas da rotina",
        "Realizei manutenção preventiva e ajustes de desempenho em bancos de dados",
        "Automatizei comunicações e notificações operacionais pelo WhatsApp",
      ],
      'en-US': [
        "Administered and supported Linux and Windows Server systems",
        "Configured and managed MikroTik routers and firewalls",
        "Configured firewall rules and network proxies",
        "Wrote administrative scripts for routine tasks",
        "Performed preventive database maintenance and performance tuning",
        "Automated operational messages and notifications through WhatsApp",
      ],
    },
    technologies: ['Linux', 'Windows Server', 'MikroTik', 'Firewall / Proxy', 'Bash Scripts', 'WhatsApp Automation'],
  },
];
