import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'livro',
    displayName: "Livro",
    engineeringDecision: {"pt-BR":"Uma restrição única de ano e número de protocolo no MySQL protege os registros contra duplicatas.","en-US":"A unique year-and-protocol-number constraint in MySQL protects records against duplicates."},
    previewCaption: {"pt-BR":"Livro: gestão de denúncias e registros sanitários.","en-US":"Livro: public health complaints and record management."},
    imageWidth: 1920,
    imageHeight: 1080,
    slug: 'livro',
    title: 'Livro — Gestão de Vigilância Sanitária',
    subtitle: {
      'pt-BR': 'Digitalização de Processos, Inteligência de Dados e Monitoramento de Denúncias',
      'en-US': 'Process Digitization, Data Intelligence, and Denunciation Monitoring',
    },
    shortDescription: {
      'pt-BR': 'Sistema utilizado em produção pela Vigilância Sanitária de Andradina para gestão de denúncias, rastreabilidade de registros e apoio aos processos de fiscalização.',
      'en-US': 'Production system used by the Vigilância Sanitária de Andradina for complaint management, record traceability, and inspection process support.',
    },
    outcome: {
      'pt-BR': 'Busca em registros digitalizados: de ~5 minutos para ~10 segundos, segundo estimativa operacional.',
      'en-US': 'Digitized record lookup: from ~5 minutes to ~10 seconds, based on an operational estimate.',
    },
    technologies: ['Node.js', 'Sequelize ORM', 'MySQL', 'EJS', 'Chart.js', 'PM2', 'Nginx'],
    githubUrl: 'https://github.com/self1027/Livro',
    demoUrl: 'https://livro.murilod.dev/',
    image: '/media/livro-demo.webp',
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
    displayName: "Integra",
    engineeringDecision: {"pt-BR":"Separar captura, transcrição e renderização permite tratar as etapas do pipeline de áudio de forma independente.","en-US":"Separating capture, transcription and rendering lets each stage of the audio pipeline be handled independently."},
    previewCaption: {"pt-BR":"Integra: áudio, transcrição e avatar de Libras.","en-US":"Integra: audio, transcription and a Libras avatar."},
    imageWidth: 1920,
    imageHeight: 1080,
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
    image: '/media/integra-demo.webp',
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
    displayName: "ASCII Cam",
    engineeringDecision: {"pt-BR":"Web Worker e transferência de ArrayBuffers movem o processamento de pixels para fora da thread da interface.","en-US":"A Web Worker and ArrayBuffer transfers move pixel processing off the interface thread."},
    previewCaption: {"pt-BR":"ASCII Cam: renderização de vídeo em caracteres.","en-US":"ASCII Cam: video rendered as characters."},
    imageWidth: 1280,
    imageHeight: 720,
    slug: 'ascii-cam',
    title: 'ASCII Cam — Renderização de Alto Desempenho',
    subtitle: {
      'pt-BR': 'Processamento de Vídeo em Tempo Real com Web Workers e Zero-Copy',
      'en-US': 'Real-Time Video Processing with Web Workers and Zero-Copy',
    },
    shortDescription: {
      'pt-BR': 'Conversão de webcam em arte ASCII com processamento de imagem em Web Worker, LUT de contraste e renderização em Canvas 2D.',
      'en-US': 'Webcam-to-ASCII conversion with image processing in a Web Worker, a contrast LUT and Canvas 2D rendering.',
    },
    outcome: {
      'pt-BR': '30+ FPS no cenário apresentado, variando com hardware e resolução da grade.',
      'en-US': '30+ FPS in the presented scenario, varying with hardware and grid resolution.',
    },
    technologies: ['TypeScript', 'Web Workers', 'Canvas 2D', 'Transferable Objects', 'Image Processing', 'Real-Time'],
    githubUrl: 'https://github.com/self1027/ascii-cam',
    demoUrl: 'https://ascii.murilod.dev/',
    image: '/media/ascii-demo.webp',
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
    displayName: "Infinity Tic-Tac-Toe",
    engineeringDecision: {"pt-BR":"O servidor valida os turnos e publica o estado da sala; o cliente não decide as regras da partida.","en-US":"The server validates turns and broadcasts room state; clients do not decide the game rules."},
    previewCaption: {"pt-BR":"Infinity Tic-Tac-Toe: uma partida, estado compartilhado.","en-US":"Infinity Tic-Tac-Toe: one match, shared state."},
    imageWidth: 1920,
    imageHeight: 1080,
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
    image: '/media/infinityttt-demo.webp',
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
