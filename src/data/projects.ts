import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'livro',
    slug: 'livro',
    title: 'Livro — Gestão de Vigilância Sanitária',
    subtitle: {
      'pt-BR': 'Digitalização de Processos, Inteligência de Dados e Monitoramento de Denúncias',
      'en-US': 'Process Digitization, Data Intelligence, and Denunciation Monitoring',
    },
    shortDescription: {
      'pt-BR': 'Sistema utilizado em produção pela Vigilância Sanitária de Andradina para gestão de denúncias, rastreabilidade de registros e apoio aos processos de fiscalização.',
      'en-US': 'Production system used by the Vigilância Sanitária de Andradina for denunciation management, record traceability, and inspection process support.',
    },
    outcome: {
      'pt-BR': 'Redução do tempo médio de consulta de aproximadamente 5 minutos para 10 segundos.',
      'en-US': 'Reduction of average query time from approximately 5 minutes to 10 seconds.',
    },
    technologies: ['Node.js', 'Sequelize ORM', 'MySQL', 'EJS', 'Chart.js', 'PM2', 'Nginx'],
    githubUrl: 'https://github.com/self1027/Livro',
    demoUrl: 'https://livro.murilod.dev/',
    image: '/media/livro-demo.png',
    imageAlt: {
      'pt-BR': 'Interface do sistema Livro em produção para Vigilância Sanitária',
      'en-US': 'Livro production system interface for public health surveillance',
    },
    caseStudyRoute: '/projects/livro',
    badge: {
      'pt-BR': 'Produção Governamental',
      'en-US': 'Production Public Sector',
    },
  },
  {
    id: 'integra',
    slug: 'integra',
    title: 'Integra — Educação Sem Barreiras',
    subtitle: {
      'pt-BR': 'Pipeline de Áudio em Tempo Real para Tradução e Renderização em Libras',
      'en-US': 'Real-Time Audio Pipeline for Translation and Libras Rendering',
    },
    shortDescription: {
      'pt-BR': 'Sistema de acessibilidade em tempo real que processa áudio, realiza transcrição e integra tradução e renderização em Libras por meio de um avatar 3D.',
      'en-US': 'Real-time accessibility system that processes audio, performs transcription, and integrates translation and Libras rendering via a 3D avatar.',
    },
    technologies: ['Node.js', 'WebSockets', 'FFmpeg', 'Vosk', 'Google Cloud STT', 'VLibras', 'Three.js'],
    githubUrl: 'https://github.com/self1027/INTEGRA',
    demoUrl: 'https://integra.murilod.dev/',
    image: '/media/integra-demo.png',
    imageAlt: {
      'pt-BR': 'Demonstração do pipeline em tempo real e avatar 3D do Integra',
      'en-US': 'Integra real-time pipeline and 3D avatar demonstration',
    },
    caseStudyRoute: '/projects/integra',
    badge: {
      'pt-BR': 'Pipeline de Áudio',
      'en-US': 'Audio Pipeline',
    },
  },
  {
    id: 'ascii-cam',
    slug: 'ascii-cam',
    title: 'ASCII Cam — Renderização de Alto Desempenho',
    subtitle: {
      'pt-BR': 'Processamento de Vídeo em Tempo Real com Web Workers e Zero-Copy',
      'en-US': 'Real-Time Video Processing with Web Workers and Zero-Copy',
    },
    shortDescription: {
      'pt-BR': 'Conversão de webcam para arte ASCII a 30+ FPS com processamento em Web Worker, Transferable Objects, LUT dinâmica e renderização eficiente em Canvas 2D.',
      'en-US': 'Webcam to ASCII art conversion at 30+ FPS with Web Worker processing, Transferable Objects, dynamic LUT, and efficient Canvas 2D rendering.',
    },
    outcome: {
      'pt-BR': 'Processamento contínuo a 30+ FPS estáveis sem bloqueio da UI.',
      'en-US': 'Continuous stable 30+ FPS processing with zero UI freezing.',
    },
    technologies: ['TypeScript', 'Web Workers', 'Canvas 2D', 'Transferable Objects', 'Image Processing', 'Real-Time'],
    githubUrl: 'https://github.com/self1027/ascii-cam',
    demoUrl: 'https://ascii.murilod.dev/',
    image: '/media/ascii-demo.png',
    imageAlt: {
      'pt-BR': 'Feed de vídeo processado em tempo real em caracteres ASCII',
      'en-US': 'Real-time video feed processed into ASCII characters',
    },
    caseStudyRoute: '/projects/ascii-cam',
    badge: {
      'pt-BR': '30+ FPS / Zero-Copy',
      'en-US': '30+ FPS / Zero-Copy',
    },
  },
  {
    id: 'infinity-ttt',
    slug: 'infinity-ttt',
    title: 'Infinity Tic-Tac-Toe',
    subtitle: {
      'pt-BR': 'Sincronização de Estado em Tempo Real com Servidor Autoritativo',
      'en-US': 'Real-Time State Synchronization with Authoritative Server',
    },
    shortDescription: {
      'pt-BR': 'Motor multiplayer baseado em servidor autoritativo, com gerenciamento de salas, sincronização de estado e processamento de eventos em tempo real.',
      'en-US': 'Multiplayer engine based on authoritative server architecture, with room management, state synchronization, and real-time event processing.',
    },
    technologies: ['Node.js', 'TypeScript', 'Socket.io', 'Express', 'Event-Driven', 'Authoritative Server'],
    githubUrl: 'https://github.com/self1027/infinity-ttt',
    demoUrl: 'https://infinityttt.murilod.dev/',
    image: '/media/infinityttt-demo.png',
    imageAlt: {
      'pt-BR': 'Tabuleiro multiplayer sincronizado do Infinity Tic-Tac-Toe',
      'en-US': 'Infinity Tic-Tac-Toe synchronized multiplayer board',
    },
    caseStudyRoute: '/projects/infinity-ttt',
    badge: {
      'pt-BR': 'Servidor Autoritativo',
      'en-US': 'Authoritative Server',
    },
  }/*,
  {
    id: 'nobsdownloader',
    slug: 'nobsdownloader',
    title: 'NoBSDownloader — Media Extraction Engine',
    subtitle: {
      'pt-BR': 'Extração de Mídia com yt-dlp e Processamento de Streams em Tempo Real',
      'en-US': 'Media Extraction with yt-dlp and Real-Time Stream Processing',
    },
    shortDescription: {
      'pt-BR': 'Ferramenta de extração de mídia utilizando child processes, yt-dlp e FFmpeg para processamento de streams e transcodificação.',
      'en-US': 'Media extraction tool utilizing child processes, yt-dlp, and FFmpeg for stream processing and transcoding.',
    },
    technologies: ['Node.js', 'yt-dlp', 'FFmpeg', 'Child Processes', 'Stream Processing', 'YAML'],
    githubUrl: 'https://github.com/self1027/NoBSDownloader',
    image: '/media/nobsd-demo.png',
    imageAlt: {
      'pt-BR': 'Motor de orquestração de processos do NoBSDownloader',
      'en-US': 'NoBSDownloader child process orchestration engine',
    },
    caseStudyRoute: '/projects/nobsdownloader',
    badge: {
      'pt-BR': 'Orquestração de Processos',
      'en-US': 'Process Orchestration',
    },
  },*/
];
