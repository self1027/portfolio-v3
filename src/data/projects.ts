import type { Project } from '../types';
import { integraImage, meganTrimmerImage, livroImage } from './projectImages';

export const projects: Project[] = [
  {
    id: 'livro',
    displayName: "Livro",
    engineeringDecision: {"pt-BR":"Uma restrição no MySQL impede que dois registros tenham o mesmo ano e número de protocolo.","en-US":"A MySQL constraint prevents two records from sharing the same year and protocol number."},
    previewCaption: {"pt-BR":"Livro: gestão de denúncias e registros sanitários.","en-US":"Livro: public health complaints and record management."},
    imageWidth: livroImage.width,
    imageHeight: livroImage.height,
    slug: 'livro',
    title: 'Livro — Gestão de Vigilância Sanitária',
    subtitle: {
      'pt-BR': "Registro de denúncias e acompanhamento da fiscalização sanitária",
      'en-US': "Complaint records and public health inspection tracking",
    },
    shortDescription: {
      'pt-BR': "Sistema usado pela Vigilância Sanitária de Andradina para registrar denúncias, acompanhar vistorias e consultar o histórico dos atendimentos.",
      'en-US': "A system used by Andradina’s public health department to record complaints, track inspections and look up case histories.",
    },
    outcome: {
      'pt-BR': "Na estimativa operacional relatada, a busca passou de cerca de 5 minutos nos arquivos em papel para 10 segundos no sistema.",
      'en-US': "The reported operational estimate puts lookup time at about 5 minutes in paper files and 10 seconds in the system.",
    },
    technologies: ['Node.js', 'Sequelize ORM', 'MySQL', 'EJS', 'Chart.js', 'PM2', 'Nginx'],
    githubUrl: 'https://github.com/self1027/Livro',
    demoUrl: 'https://livro.murilod.dev/',
    image: livroImage.src,
    imageAlt: {
      'pt-BR': 'Listagem de denúncias do Livro com protocolo, status e fiscal responsável',
      'en-US': 'Livro complaint list with protocol, status and assigned inspector',
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
    engineeringDecision: {"pt-BR":"O tradutor neural em Python e o acervo de sinais ficam na máquina local. Assim, o pipeline funciona sem internet após o preparo inicial.","en-US":"The Python neural translator and sign collection run locally, allowing the pipeline to work without internet after initial setup."},
    previewCaption: {"pt-BR":"Integra: controles de captura, transcrição e avatar VLibras.","en-US":"Integra: capture controls, transcription and the VLibras avatar."},
    imageWidth: integraImage.width,
    imageHeight: integraImage.height,
    slug: 'integra',
    title: 'Integra MQF — Da Fala aos Sinais, Offline',
    subtitle: {
      'pt-BR': "Fala em português, transcrição e sinais de Libras com processamento local",
      'en-US': "Portuguese speech, transcription and Libras signs with local processing",
    },
    shortDescription: {
      'pt-BR': "Captura a fala em português, mostra a transcrição e reproduz os sinais com um avatar de Libras. Após o preparo inicial, funciona sem internet.",
      'en-US': "Captures Portuguese speech, displays the transcript and plays Libras signs through an avatar. It runs without internet after initial setup.",
    },
    outcome: {
      'pt-BR': "A validação no Windows usou áudio sintetizado e não registrou requisições externas.",
      'en-US': "Validation on Windows used synthesized audio and recorded no external requests.",
    },
    technologies: ['Node.js', 'Express', 'WebSockets', 'FFmpeg', 'Vosk', 'Python', 'VLibras', 'Unity/WebGL'],
    githubUrl: 'https://github.com/self1027/Integra',
    demoUrl: 'https://integra.murilod.dev/',
    image: integraImage.src,
    imageAlt: {
      'pt-BR': 'Interface do Integra com controles de microfone, transcrição e avatar VLibras',
      'en-US': 'Integra interface with microphone controls, transcription and the VLibras avatar',
    },
    caseStudyRoute: '/projects/integra',
    badge: {
      'pt-BR': 'Execução Local',
      'en-US': 'Local Execution',
    },
  },
  {
    id: 'megan-trimmer',
    displayName: 'MeganTrimmer',
    engineeringDecision: {
      'pt-BR': "O FFmpeg copia os streams compatíveis sem recodificar. Quando a conversão é necessária, o serviço testa os encoders de hardware e mantém uma alternativa por software.",
      'en-US': "FFmpeg copies compatible streams without re-encoding. When conversion is needed, the service probes hardware encoders and keeps a software fallback.",
    },
    previewCaption: {
      'pt-BR': "MeganTrimmer com um vídeo de teste e a confirmação de que o clipe foi salvo.",
      'en-US': "MeganTrimmer showing a test video and confirmation that the clip was saved.",
    },
    imageWidth: meganTrimmerImage.width,
    imageHeight: meganTrimmerImage.height,
    slug: 'megan-trimmer',
    title: 'MeganTrimmer — Corte e Conversão de Vídeos',
    subtitle: {
      'pt-BR': "Corte e conversão de vídeos no computador com Electron e FFmpeg",
      'en-US': "Local video trimming and conversion with Electron and FFmpeg",
    },
    shortDescription: {
      'pt-BR': "Aplicativo para cortar vídeos, converter formatos e extrair áudio no computador. A prévia, a seleção do trecho e as opções de exportação ficam na mesma janela.",
      'en-US': "An app for trimming videos, converting formats and extracting audio on your computer. Preview, trim selection and export options share one window.",
    },
    technologies: ['Electron', 'TypeScript', 'FFmpeg', 'FFprobe', 'IPC', 'electron-updater'],
    githubUrl: 'https://github.com/self1027/MeganTrimmer',
    image: meganTrimmerImage.src,
    imageAlt: {
      'pt-BR': 'MeganTrimmer com vídeo de teste verde, linha do tempo e confirmação de clipe salvo',
      'en-US': 'MeganTrimmer with a green test video, timeline and saved-clip confirmation',
    },
    caseStudyRoute: '/projects/megan-trimmer',
    badge: { 'pt-BR': 'Aplicativo Desktop', 'en-US': 'Desktop App' },
  },
  {
    id: 'infinity-ttt',
    displayName: "Infinity Tic-Tac-Toe",
    engineeringDecision: {"pt-BR":"O cliente envia a jogada pretendida. O servidor verifica o turno, aplica as regras e envia o novo estado aos jogadores da sala.","en-US":"The client sends the intended move. The server checks the turn, applies the rules and sends the new state to players in the room."},
    previewCaption: {"pt-BR":"Infinity Tic-Tac-Toe: uma partida, estado compartilhado.","en-US":"Infinity Tic-Tac-Toe: one match, shared state."},
    imageWidth: 1920,
    imageHeight: 1080,
    slug: 'infinity-ttt',
    title: 'Infinity Tic-Tac-Toe',
    subtitle: {
      'pt-BR': "Jogo multiplayer com regras e estado controlados pelo servidor",
      'en-US': "A multiplayer game with server-controlled rules and state",
    },
    shortDescription: {
      'pt-BR': "Jogo da velha multiplayer em que a peça mais antiga sai do tabuleiro quando o jogador atinge o limite. O servidor valida as jogadas e mantém a partida sincronizada.",
      'en-US': "A multiplayer tic-tac-toe game where the oldest mark leaves the board when a player reaches the limit. The server validates moves and synchronizes the match.",
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
  }
];
