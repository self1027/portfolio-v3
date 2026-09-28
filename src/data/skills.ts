import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    title: {
      'pt-BR': 'Backend',
      'en-US': 'Backend',
    },
    skills: [
      'Node.js',
      'Express',
      'TypeScript',
      'APIs REST',
      'WebSockets',
    ],
  },
  {
    id: 'databases',
    title: {
      'pt-BR': 'Bancos de Dados & ORM',
      'en-US': 'Databases & ORM',
    },
    skills: [
      'PostgreSQL',
      'MySQL / MariaDB',
      'MongoDB',
      'Sequelize',
    ],
  },
  {
    id: 'realtime-media',
    title: {
      'pt-BR': 'Tempo Real & Processamento de Mídia',
      'en-US': 'Real-Time & Media Processing',
    },
    skills: [
      'WebSockets',
      'Socket.io',
      'Web Workers',
      'FFmpeg',
      'Web Audio API',
      'Canvas 2D',
      'Stream Processing',
      'Image Processing',
    ],
  },
  {
    id: 'cloud-infra',
    title: {
      'pt-BR': 'Nuvem & Infraestrutura',
      'en-US': 'Cloud & Infrastructure',
    },
    skills: [
      'AWS',
      'Google Cloud',
      'Cloud Run',
      'Linux Server',
      'Nginx',
      'Docker',
      'PM2',
    ],
  },
  {
    id: 'tooling-automation',
    title: {
      'pt-BR': 'Ferramentas & Automação',
      'en-US': 'Tooling & Automation',
    },
    skills: [
      'GitHub Actions',
      'CI/CD',
      'Child Processes',
      'YAML',
    ],
  },
];
