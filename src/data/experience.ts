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
      'pt-BR': 'Desenvolvimento e manutenção de sistema web interno para a Vigilância Sanitária de Andradina, concebido do zero para digitalizar processos operacionais, organizar denúncias, aprimorar a rastreabilidade e acelerar o acesso a registros históricos.',
      'en-US': 'Development and maintenance of an internal web system for the Vigilância Sanitária de Andradina, built from scratch to digitize operational processes, organize denunciations, improve traceability, and accelerate access to historical records.',
    },
    responsibilities: {
      'pt-BR': [
        'Levantamento de requisitos diretamente com servidores públicos e fiscais sanitários',
        'Desenvolvimento backend em Node.js com arquitetura modular e escalável',
        'Criação e manutenção de APIs REST estruturadas para consultas operacionais',
        'Modelagem relacional com MySQL e Sequelize ORM, com índices compostos de unicidade',
        'Garantia de integridade e rastreabilidade com auditoria vinculada ao agente responsável',
        'Implantação e gestão de infraestrutura local em ambiente Linux',
        'Configuração de proxy reverso Nginx com encaminhamento de headers de segurança',
        'Gerenciamento de disponibilidade e reinicialização de processos com PM2',
        'Desenvolvimento de painéis analíticos e relatórios operacionais com Chart.js',
      ],
      'en-US': [
        'Requirements gathering directly with municipal staff and health inspectors',
        'Backend development in Node.js using modular and scalable architecture',
        'Structured REST API design and maintenance for operational queries',
        'Relational database modeling with MySQL and Sequelize ORM featuring composite uniqueness constraints',
        'Data integrity and traceability enforcement with audit logs tied to responsible agents',
        'Local infrastructure deployment and server administration in a Linux environment',
        'Nginx reverse proxy configuration with security header forwarding',
        'Process management and zero-downtime restarts using PM2',
        'Analytical dashboards and operational reports built with Chart.js',
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
      'pt-BR': 'Atuação com administração de sistemas operacionais, redes de computadores, suporte operacional e criação de scripts para automação de tarefas cotidianas.',
      'en-US': 'Hands-on work in operating systems administration, computer networks, operational support, and script creation for routine task automation.',
    },
    responsibilities: {
      'pt-BR': [
        'Administração e suporte a servidores em ambiente Linux e Windows Server',
        'Configuração e gerenciamento de roteadores e firewalls MikroTik',
        'Configurações de regras de firewall e proxy de rede',
        'Desenvolvimento de scripts administrativos para rotinas operacionais',
        'Rotinas de otimização e manutenção preventiva de bancos de dados',
        'Automação de comunicações e notificações operacionais via WhatsApp',
      ],
      'en-US': [
        'Administration and support for Linux and Windows Server environments',
        'Configuration and management of MikroTik routers and firewalls',
        'Firewall policy configuration and network proxy management',
        'Development of administrative scripts for routine operational tasks',
        'Database optimization routines and preventative maintenance',
        'Operational communication and notification automation via WhatsApp',
      ],
    },
    technologies: ['Linux', 'Windows Server', 'MikroTik', 'Firewall / Proxy', 'Bash Scripts', 'WhatsApp Automation'],
  },
];
