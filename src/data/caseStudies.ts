import type { CaseStudyData } from '../types';

export const caseStudies: Record<string, CaseStudyData> = {
  'ascii-cam': {
    id: 'ascii-cam',
    slug: 'ascii-cam',
    title: 'ASCII Cam — Renderização de Alto Desempenho',
    subtitle: {
      'pt-BR': 'Processamento de Vídeo em Tempo Real com Web Workers e Zero-Copy',
      'en-US': 'Real-Time Video Processing with Web Workers and Zero-Copy',
    },
    technologies: ['TypeScript', 'Web Workers', 'Canvas 2D', 'Transferable Objects', 'Image Processing', 'Real-Time'],
    githubUrl: 'https://github.com/self1027/ascii-cam',
    demoUrl: 'https://ascii.murilod.dev/',
    previewImage: '/media/ascii-demo.webp',
    problem: {
      'pt-BR': [
        'Processar cada quadro de webcam a 60 FPS para converter pixels em caracteres ASCII é uma tarefa computacionalmente intensiva.',
        'Executar esse cálculo na Main Thread do navegador bloqueia a renderização da interface, gerando engasgos (jank) e perda severa de fluidez.',
        'O objetivo técnico foi manter uma taxa estável de 30+ FPS com controles de brilho e contraste em tempo real, sem prejudicar a responsividade dos elementos da interface.',
      ],
      'en-US': [
        'Processing each webcam frame at 60 FPS to convert raw pixel data into ASCII characters is computationally intensive.',
        'Executing this calculation on the browser\'s Main Thread blocks UI rendering, causing visible jank and degraded responsiveness.',
        'The engineering objective was to maintain a stable 30+ FPS rate with real-time brightness and contrast manipulation without compromising UI event dispatching.',
      ],
    },
    technicalChallenges: {
      'pt-BR': [
        'Manter taxa estável de 30+ FPS com transmissão ininterrupta de streams da webcam.',
        'Eliminar congelamentos da interface e contenção na Main Thread durante transformações matriciais.',
        'Despacho de buffers com zero-copy entre threads sem penalidade de serialização de memória.',
        'Consultas de contraste e brilho em tempo constante O(1) através de tabela LUT dinâmica.',
      ],
      'en-US': [
        'Sustaining a stable 30+ FPS throughput under continuous webcam stream ingestion.',
        'Preventing frame drops (jank) and main-thread CPU starvation during dense matrix conversions.',
        'Zero-copy buffer dispatch across worker boundaries without memory serialization overhead.',
        'Constant-time O(1) brightness and contrast lookups via precomputed dynamic Look-Up Tables.',
      ],
    },
    decision: {
      title: {
        'pt-BR': 'Paralelismo e Desacoplamento via Web Worker',
        'en-US': 'Parallelism and Offloading via Dedicated Web Worker',
      },
      content: {
        'pt-BR': [
          'A arquitetura separa o ciclo de captura do ciclo de renderização.',
          'A decisão primária foi transferir toda a lógica de conversão matemática, luminância e mapeamento de caracteres para um Web Worker dedicado em segundo plano.',
        ],
        'en-US': [
          'The architecture strictly decouples the frame capture cycle from the character rendering cycle.',
          'The primary architectural decision was delegating mathematical transformation, luminance calculation, and character indexing to a dedicated background Web Worker.',
        ],
      },
    },
    diagrams: [
      {
        src: '/media/mermaid/ascii/fig-2.png',
        caption: {
          'pt-BR': 'Pipeline: a Main Thread captura o frame enquanto o Worker processa a matriz de caracteres em paralelo.',
          'en-US': 'Pipeline: the Main Thread captures the frame while the Worker processes the character matrix in parallel.',
        },
        alt: {
          'pt-BR': 'Diagrama do pipeline assíncrono entre Main Thread e Web Worker no ASCII Cam',
          'en-US': 'Asynchronous pipeline diagram between Main Thread and Web Worker in ASCII Cam',
        },
      },
    ],
    pipelineOrSections: {
      title: {
        'pt-BR': 'Pipeline de Processamento em 5 Etapas',
        'en-US': '5-Stage Processing Pipeline',
      },
      items: [
        {
          subtitle: {
            'pt-BR': '1. Captura — Main Thread',
            'en-US': '1. Capture — Main Thread',
          },
          text: {
            'pt-BR': 'Extração do quadro do elemento <video> desenhado em um buffer Canvas temporário para obtenção dos dados brutos RGBA em Uint8ClampedArray.',
            'en-US': 'Frame extraction from the <video> element drawn onto a temporary Canvas buffer to obtain raw RGBA pixel data as a Uint8ClampedArray.',
          },
        },
        {
          subtitle: {
            'pt-BR': '2. Despacho — Transferência Zero-Copy',
            'en-US': '2. Dispatch — Zero-Copy Transfer',
          },
          text: {
            'pt-BR': 'Envio dos buffers para o Web Worker utilizando a semântica de Transferable Objects, eliminando a serialização e clonagem em memória.',
            'en-US': 'Buffer dispatch to the Web Worker using Transferable Objects semantics, eliminating costly memory serialization and copying.',
          },
        },
        {
          subtitle: {
            'pt-BR': '3. Transformação — Worker',
            'en-US': '3. Transformation — Worker',
          },
          text: {
            'pt-BR': 'Cálculo de luminância ponderada padrão Rec. 709, ajuste de brilho e consulta de contraste via Look-Up Table (LUT) em tempo constante.',
            'en-US': 'Rec. 709 weighted luminance calculation, brightness scaling, and constant-time Look-Up Table (LUT) contrast lookup.',
          },
        },
        {
          subtitle: {
            'pt-BR': '4. Retorno Estruturado',
            'en-US': '4. Structured Return',
          },
          text: {
            'pt-BR': 'O Worker devolve um Int32Array com os índices dos caracteres e os dados de cor (quando o modo colorido está ativado), também via ownership transfer.',
            'en-US': 'The Worker returns an Int32Array with character indices and color data (when color mode is active), transferred via ownership transfer.',
          },
        },
        {
          subtitle: {
            'pt-BR': '5. Renderização — Main Thread',
            'en-US': '5. Rendering — Main Thread',
          },
          text: {
            'pt-BR': 'Execução de chamadas fillText otimizadas em Canvas 2D em grade de alta densidade sem causar gargalos na taxa de atualização.',
            'en-US': 'Optimized fillText execution on the Canvas 2D context across a high-density grid without causing display refresh stalls.',
          },
        },
      ],
    },
    codeSnippets: [
      {
        title: 'Transferable Objects — Comunicação Zero-Copy',
        titleEn: 'Transferable Objects: buffer ownership transfer',
        language: 'typescript',
        code: `// No Worker: Enviando os dados processados sem cópia
(self as any).postMessage({
    charIndices,
    colors
}, [charIndices.buffer, colors.buffer]);`,
        description: {
          'pt-BR': 'Transferência direta de posse do ArrayBuffer para a Main Thread sem duplicar bytes na heap.',
          'en-US': 'Direct transfer of ArrayBuffer ownership to the Main Thread without heap memory duplication.',
        },
      },
      {
        title: 'Luminância Rec. 709 & Lookup Dinâmico de Contraste (LUT)',
        titleEn: 'Rec. 709 luminance and contrast lookup',
        language: 'typescript',
        code: `const r = pixels[i];
const g = pixels[i + 1];
const b = pixels[i + 2];

let v = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
v *= brightness;

// Illustrative example: clamp the lookup index.
const index = Math.max(0, Math.min(255, (v * 255) | 0));
const finalV = contrastLUT[index] / 255;`,
        description: {
          'pt-BR': 'Exemplo didático de consulta O(1) à LUT, com índice limitado a [0, 255]. Não representa todo o custo de processamento de um quadro.',
          'en-US': 'Illustrative O(1) LUT lookup with an index clamped to [0, 255]. This does not represent the full cost of processing a frame.',
        },
      },
    ],
    tradeOffs: {
      'pt-BR': [
        'OffscreenCanvas melhora a performance quando disponível no navegador, mas exige detecção de suporte e fallback.',
        'O uso de CPU permanece substancial dado o volume de pixels por segundo, exigindo limitação cuidadosa do tamanho da grade de caracteres.',
        'A resolução da grade precisa ser calibrada proporcionalmente ao tamanho do viewport para evitar sobrecarga de chamadas de desenho.',
      ],
      'en-US': [
        'OffscreenCanvas boosts throughput where available, but requires feature detection and fallback logic.',
        'CPU consumption remains non-trivial due to pixel volume, necessitating strict grid resolution constraints.',
        'Grid resolution must be calibrated against viewport dimensions to prevent canvas draw call saturation.',
      ],
    },
    result: {
      'pt-BR': [
        'O projeto relata processamento a 30+ FPS. A taxa depende do hardware, navegador e resolução da grade; não há uma matriz de benchmark publicada neste estudo.',
        'O processamento de pixels foi movido para um Web Worker para reduzir a carga na thread da interface. Captura e desenho no Canvas continuam consumindo tempo na thread principal.',
      ],
      'en-US': [
        'The project reports 30+ FPS. Frame rate depends on hardware, browser and grid resolution; this case study does not publish a benchmark matrix.',
        'Pixel processing runs in a Web Worker to reduce work on the UI thread. Capture and Canvas drawing still take time on the main thread.',
      ],
    },
    demonstrates: {
      'pt-BR': [
        'Processamento nativo de vídeo no navegador',
        'Concorrência JavaScript via Web Workers',
        'Otimização algorítmica aplicada ao processamento de imagem',
        'Engenharia de experiência orientada a performance',
      ],
      'en-US': [
        'Native browser video stream processing',
        'JavaScript concurrency via Web Workers',
        'Algorithmic image processing optimization',
        'Performance-oriented UX engineering',
      ],
    },
  },

  'infinity-ttt': {
    id: 'infinity-ttt',
    slug: 'infinity-ttt',
    title: 'Infinity Tic-Tac-Toe',
    subtitle: {
      'pt-BR': 'Sincronização de Estado em Tempo Real com Servidor Autoritativo',
      'en-US': 'Real-Time State Synchronization with Authoritative Server',
    },
    technologies: ['Node.js', 'TypeScript', 'Socket.io', 'Express', 'Event-Driven', 'Authoritative Server'],
    githubUrl: 'https://github.com/self1027/infinity-ttt',
    demoUrl: 'https://infinityttt.murilod.dev/',
    previewImage: '/media/infinityttt-demo.webp',
    problem: {
      'pt-BR': [
        'Aplicações multiplayer que confiam no cliente para atualizar o estado do jogo sofrem com latência de rede, problemas de concorrência e divergência de estado.',
        'Isso gera comportamentos não determinísticos, desincronização entre participantes e potencial para manipulação de regras.',
        'O desafio consistia em orquestrar partidas multiplayer em tempo real com regras complexas (remoção de peças antigas) garantindo consistência estrita.',
      ],
      'en-US': [
        'Multiplayer applications that trust clients to advance game state suffer from latency spikes, concurrency anomalies, and state drift.',
        'This produces non-deterministic client views, desynchronization between players, and vulnerability to rule evasion.',
        'The engineering challenge was orchestrating real-time multiplayer matches with dynamic piece expiration while guaranteeing strict state consistency.',
      ],
    },
    technicalChallenges: {
      'pt-BR': [
        'Garantir sincronização determinística e consistente entre clientes geograficamente distribuídos.',
        'Eliminar race conditions e eventos de jogadas fora de ordem em cenários de alta cadência de cliques.',
        'Executar regras de negócio autoritativas no backend (remoção FIFO de peças antigas).',
        'Gerenciamento seguro de ciclo de vida das salas com desalocação de memória para partidas inativas.',
      ],
      'en-US': [
        'Guaranteeing deterministic, drift-free state synchronization across distributed clients.',
        'Eliminating out-of-order dispatch and concurrent race conditions during rapid player interactions.',
        'Enforcing authoritative business logic on the backend (circular FIFO piece expiration).',
        'Managing room lifecycle and memory allocation safely upon player disconnects.',
      ],
    },
    decision: {
      title: {
        'pt-BR': 'Servidor Autoritativo como Única Fonte da Verdade',
        'en-US': 'Authoritative Server as the Single Source of Truth',
      },
      content: {
        'pt-BR': [
          'O cliente atua apenas como emissor de intenção do jogador e renderizador de estado.',
          'Todas as validações de jogada, alternância de turnos, aplicação das regras de negócio e controle da fila de peças residem exclusivamente no backend.',
        ],
        'en-US': [
          'Clients act strictly as intent dispatchers and state renderers.',
          'All move validation, turn scheduling, business rule enforcement, and piece queue management live strictly on the backend.',
        ],
      },
    },
    diagrams: [
      {
        src: '/media/mermaid/ttt/fig-2.png',
        caption: {
          'pt-BR': 'Ciclo de vida de uma jogada: validação centralizada e broadcast síncrono para os participantes.',
          'en-US': 'Lifecycle of a move: centralized validation and synchronous broadcast to participants.',
        },
        alt: {
          'pt-BR': 'Diagrama de fluxo do ciclo de vida de jogada com servidor autoritativo',
          'en-US': 'Authoritative server move lifecycle flow diagram',
        },
      },
      {
        src: '/media/mermaid/ttt/fig-1.png',
        caption: {
          'pt-BR': 'Fluxo da regra de negócio: identificação e remoção da peça mais antiga ao atingir o limite.',
          'en-US': 'Business-rule flow: identifying and removing the oldest piece upon reaching the threshold.',
        },
        alt: {
          'pt-BR': 'Fluxo da regra do modo infinito com fila circular de peças',
          'en-US': 'Infinity mode piece recycling FIFO queue flow',
        },
      },
    ],
    pipelineOrSections: {
      title: {
        'pt-BR': 'Regras de Negócio e Ciclo de Vida do Modo Infinito',
        'en-US': 'Business Rules & Infinity Mode Lifecycle',
      },
      items: [
        {
          subtitle: {
            'pt-BR': '1. Despacho de Intenção pelo Cliente',
            'en-US': '1. Client Move Intent Dispatch',
          },
          text: {
            'pt-BR': 'O cliente emite apenas o evento make_move com as coordenadas pretendidas e o identificador da sala; nenhuma alteração local é assumida.',
            'en-US': 'The client emits make_move with target coordinates and room ID; no local state mutation is committed speculatively.',
          },
        },
        {
          subtitle: {
            'pt-BR': '2. Validação Autoritativa no Backend',
            'en-US': '2. Authoritative Backend Validation',
          },
          text: {
            'pt-BR': 'O servidor checa se o socket.id corresponde ao jogador da vez, se a casa está disponível e se o jogo está em andamento.',
            'en-US': 'The server verifies whether the socket.id matches the active turn, validates cell boundaries, and confirms match status.',
          },
        },
        {
          subtitle: {
            'pt-BR': '3. Evicção FIFO de Peças (Modo Infinito)',
            'en-US': '3. FIFO Piece Eviction (Infinity Mode)',
          },
          text: {
            'pt-BR': 'Ao atingir o limite de 3 peças por jogador, a peça mais antiga é identificada no histórico e removida atomicamente antes da nova inserção.',
            'en-US': 'Upon reaching the 3-piece limit per player, the oldest move is identified in the ledger and evicted atomically before placing the new mark.',
          },
        },
        {
          subtitle: {
            'pt-BR': '4. Avaliação de Vitória e Broadcast',
            'en-US': '4. Win Condition Evaluation & Broadcast',
          },
          text: {
            'pt-BR': 'O motor calcula o status de vitória nas matrizes do tabuleiro e propaga o novo estado canônico instantaneamente para todos os sockets da sala.',
            'en-US': 'The backend calculates victory vectors across matrix lines and broadcasts the canonical state payload to all room sockets simultaneously.',
          },
        },
      ],
    },
    codeSnippets: [
      {
        title: 'Gerenciamento da Fila Circular de Peças (Modo Infinito)',
        titleEn: 'Oldest-piece eviction: partial excerpt',
        language: 'typescript',
        code: `function processMove(state, move) {
    const playerMoves = state.history.filter(m => m.symbol === move.symbol);

    if (playerMoves.length >= 3) {
        const oldest = playerMoves[0];
        state.board[oldest.position] = null;
    }

    state.board[move.position] = move.symbol;
    return state;
}`,
        description: {
          'pt-BR': 'Trecho parcial da remoção da peça mais antiga. A manutenção do histórico, a validação de posição e a atualização de turno não aparecem neste recorte; veja o repositório.',
          'en-US': 'Partial excerpt of oldest-piece eviction. History maintenance, position validation and turn updates are omitted here; see the repository.',
        },
      },
      {
        title: 'Controle de Concorrência e Validação de Turno via Socket.io',
        titleEn: 'Turn validation with Socket.io',
        language: 'typescript',
        code: `socket.on('make_move', ({ position, roomId }) => {
    const game = roomManager.getGame(roomId);

    if (!game || game.turn !== socket.id) return;

    const updatedState = game.executeMove(position);
    io.to(roomId).emit('update_game', updatedState);
});`,
        description: {
          'pt-BR': 'O trecho verifica o dono do turno antes de chamar executeMove. Validação da posição, reconexão e ciclo de vida da sala precisam ser tratados pela implementação completa.',
          'en-US': 'The excerpt checks turn ownership before calling executeMove. Position validation, reconnection and room lifecycle are responsibilities of the complete implementation.',
        },
      },
    ],
    tradeOffs: {
      'pt-BR': [
        'A arquitetura prioriza a integridade do estado sobre a latência percebida imediata (sem predição no cliente).',
        'Exige gerenciamento explícito de estado de cada sala na memória do servidor e limpeza programada de partidas abandonadas.',
      ],
      'en-US': [
        'The architecture prioritizes game-state integrity over zero-latency client prediction.',
        'Requires explicit per-room memory management on the server with scheduled cleanup for abandoned connections.',
      ],
    },
    result: {
      'pt-BR': [
        'O servidor mantém o estado canônico da partida e o distribui aos clientes da sala.',
        'A validação de turno e de regras fica no backend. Latência, desconexões e reentrada na sala continuam sendo limites relevantes.',
      ],
      'en-US': [
        'The server maintains the canonical match state and broadcasts it to clients in the room.',
        'Turn and rule validation runs in the backend. Latency, disconnections and room re-entry remain relevant limitations.',
      ],
    },
    demonstrates: {
      'pt-BR': [
        'Arquitetura de sistemas distribuídos em tempo real',
        'Controle e sincronização de concorrência',
        'Sincronização estrita de estado com WebSockets',
        'Arquitetura orientada a eventos',
        'Aplicação de regras de negócio autoritativas no backend',
      ],
      'en-US': [
        'Real-time distributed system design',
        'Concurrency management',
        'State synchronization',
        'Event-driven architecture',
        'Backend business-rule enforcement',
      ],
    },
  },

  'integra': {
    id: 'integra',
    slug: 'integra',
    title: 'Integra — Educação Sem Barreiras',
    subtitle: {
      'pt-BR': 'Pipeline de Áudio em Tempo Real para Tradução e Renderização em Libras',
      'en-US': 'Real-Time Audio Pipeline for Translation and Libras Rendering',
    },
    technologies: ['Node.js', 'WebSockets', 'FFmpeg', 'Vosk', 'Google Cloud STT', 'VLibras', 'Three.js'],
    githubUrl: 'https://github.com/self1027/INTEGRA',
    demoUrl: 'https://integra.murilod.dev/',
    previewImage: '/media/integra-demo.webp',
    problem: {
      'pt-BR': [
        'Sistemas de acessibilidade em tempo real baseados em fala para Libras necessitam manter um fluxo ininterrupto entre captura de áudio, processamento de sinal, reconhecimento fonético, tradução gramatical e renderização 3D.',
        'Flutuações de latência de rede, pacotes fragmentados e atrasos na inicialização de codecs quebram a sincronia e comprometem a compreensão da tradução.',
      ],
      'en-US': [
        'Real-time speech-to-Libras accessibility systems must maintain a continuous pipeline between capture, signal processing, speech recognition, translation, and 3D rendering.',
        'Network jitter, fragmented audio packets, and codec initialization delays quickly disrupt synchronization and break user comprehension.',
      ],
    },
    technicalChallenges: {
      'pt-BR': [
        'Baixa latência ponta a ponta para viabilizar acompanhamento em salas de aula.',
        'Pré-processamento de áudio para eliminar ruídos elétricos e estáticos antes do reconhecimento de fala.',
        'Ingestão contínua de chunks binários via WebSockets.',
        'Inicialização segura do pipeline sem perda dos primeiros milissegundos de fala.',
      ],
      'en-US': [
        'Low end-to-end latency to support real-time classroom environments.',
        'Audio signal preprocessing to filter 60Hz hum and ambient noise prior to STT.',
        'Continuous binary chunk ingestion via WebSockets.',
        'Safe pipeline initialization preventing loss of the opening milliseconds of user speech.',
      ],
    },
    decision: {
      title: {
        'pt-BR': 'Divisão Estratégica Cliente-Servidor e Orquestração de Pipeline',
        'en-US': 'Strategic Client-Server Split & Pipeline Orchestration',
      },
      content: {
        'pt-BR': [
          'A arquitetura dividiu as responsabilidades: o cliente realiza filtragem DSP de sinal leve através da Web Audio API nativa.',
          'O servidor atua como orquestrador central de streaming, transcodificação via FFmpeg e ponte com os motores de STT e VLibras.',
        ],
        'en-US': [
          'Responsibilities are split: the client executes lightweight DSP filtering using the native Web Audio API.',
          'The server serves as the pipeline orchestrator, handling stream coordination, FFmpeg transcoding, and bridges to STT engines and VLibras.',
        ],
      },
    },
    diagrams: [
      {
        src: '/media/mermaid/integra/fig-1.png',
        caption: {
          'pt-BR': 'O pipeline inicia somente quando os dados de configuração estão consistentes.',
          'en-US': 'The pipeline starts only when the required data is consistent.',
        },
        alt: {
          'pt-BR': 'Diagrama de inicialização controlada e buffering do pipeline de áudio',
          'en-US': 'Controlled initialization and buffering diagram for audio pipeline',
        },
      },
      {
        src: '/media/mermaid/integra/fig-3.png',
        caption: {
          'pt-BR': 'Sincronização entre transcrição, tradução e renderização em tempo real do avatar.',
          'en-US': 'Synchronization between transcription, translation and real-time avatar rendering.',
        },
        alt: {
          'pt-BR': 'Diagrama de sincronização de transcrição com avatar 3D',
          'en-US': 'Transcription to 3D avatar synchronization flow',
        },
      },
    ],
    pipelineOrSections: {
      title: {
        'pt-BR': 'Pipeline de Áudio e Streaming em 5 Fases',
        'en-US': '5-Phase Audio & Streaming Pipeline',
      },
      items: [
        {
          subtitle: {
            'pt-BR': '1. Captura e Filtragem DSP no Cliente',
            'en-US': '1. Client Capture & DSP Filtering',
          },
          text: {
            'pt-BR': 'Uso da Web Audio API nativa com filtro passa-alta em 300Hz, notch em 60Hz e compressor dinâmico de volume.',
            'en-US': 'Native Web Audio API chain with 300Hz high-pass filter, 60Hz notch filter, and dynamic volume compressor.',
          },
        },
        {
          subtitle: {
            'pt-BR': '2. Streaming de Chunks via WebSockets',
            'en-US': '2. WebSocket Chunk Streaming',
          },
          text: {
            'pt-BR': 'Transmissão contínua de pacotes binários Float32Array serializados em formato compacto para o servidor Node.js.',
            'en-US': 'Continuous transmission of serialized binary audio chunks over low-latency WebSockets to the Node.js backend.',
          },
        },
        {
          subtitle: {
            'pt-BR': '3. Buffering de Inicialização e FFmpeg',
            'en-US': '3. Startup Buffering & FFmpeg Transcoding',
          },
          text: {
            'pt-BR': 'Retenção dos primeiros frames em buffer seguro até a estabilização do pipeline de transcodificação pelo FFmpeg.',
            'en-US': 'Early frames are held in a safe queue until codec parameters stabilize, preventing clipping of the initial phonemes.',
          },
        },
        {
          subtitle: {
            'pt-BR': '4. Reconhecimento de Fala (STT)',
            'en-US': '4. Speech-to-Text Recognition',
          },
          text: {
            'pt-BR': 'Vosk e Google Cloud STT convertem os chunks de áudio em transcrições para as próximas etapas do pipeline.',
            'en-US': 'Vosk and Google Cloud STT convert audio chunks into transcripts for the next pipeline stages.',
          },
        },
        {
          subtitle: {
            'pt-BR': '5. Tradução Gramatical e Renderização 3D',
            'en-US': '5. Grammatical Translation & 3D Avatar Rendering',
          },
          text: {
            'pt-BR': 'Conversão para glosas de Libras e sincronização de animações ósseas no Three.js através do VLibras.',
            'en-US': 'Grammar compilation into Libras glosses and skeletal animation synchronization in Three.js via VLibras.',
          },
        },
      ],
    },
    codeSnippets: [
      {
        title: 'Pré-processamento de Áudio no Cliente (Web Audio API)',
        titleEn: 'Client-side audio preprocessing',
        language: 'javascript',
        code: `source.connect(highpass)
      .connect(notch)
      .connect(compressor)
      .connect(processor);`,
        description: {
          'pt-BR': 'Filtro passa-alta em 300Hz (elimina ruídos graves), filtro notch em 60Hz (remove zumbido da rede elétrica) e compressor de faixa dinâmica.',
          'en-US': '300Hz high-pass filter, 60Hz notch filter for electrical interference rejection, and dynamic range compressor.',
        },
      },
      {
        title: 'Buffer Temporário e Inicialização Segura no Servidor',
        titleEn: 'Buffering before pipeline initialization',
        language: 'javascript',
        code: `if (isPipelineInitialized) {
    ffmpeg.pushAudio(data);
    return;
}

audioBuffer.push(data);
initPipeline(FALLBACK_SAMPLE_RATE);`,
        description: {
          'pt-BR': 'O recorte mostra buffering antes da inicialização. Controle de inicialização única, limite do buffer e backpressure não estão representados neste trecho.',
          'en-US': 'This excerpt shows buffering before initialization. Single-initialization guards, buffer limits and backpressure are not represented in this snippet.',
        },
      },
    ],
    tradeOffs: {
      'pt-BR': [
        'A filtragem DSP no cliente aumenta o custo de CPU e trata ruídos antes do reconhecimento de fala. O efeito na precisão depende das condições de áudio.',
        'Dependência de serviços externos de transcrição com alternativa de motor local.',
        'Maior complexidade arquitetural em comparação com processamento de áudio em lote (batch).',
      ],
      'en-US': [
        'Client-side DSP filtering increases CPU cost and treats noise before speech recognition. Its effect on accuracy depends on audio conditions.',
        'Dependency on external cloud transcription services with local engine fallback capability.',
        'Increased architectural complexity over conventional batch-oriented audio processing.',
      ],
    },
    result: {
      'pt-BR': [
        'O projeto integra captura de áudio, transcrição e renderização em Libras. Latência e qualidade da tradução dependem dos motores, da rede e das condições de áudio; não há benchmark de precisão neste estudo.',
      ],
      'en-US': [
        'The project integrates audio capture, transcription and Libras rendering. Latency and translation quality depend on the engines, network and audio conditions; this study does not provide an accuracy benchmark.',
      ],
    },
    demonstrates: {
      'pt-BR': [
        'Design de pipelines de streaming em tempo real',
        'Processamento de áudio cliente-servidor',
        'Sincronização de streams no backend',
        'Gerenciamento de estado e buffering assíncrono',
        'Integração entre múltiplos serviços e modelos 3D',
      ],
      'en-US': [
        'Real-time pipeline design',
        'Client-side audio processing',
        'Backend stream synchronization',
        'State management',
        'Integration between multiple services',
      ],
    },
  },

  'livro': {
    id: 'livro',
    slug: 'livro',
    title: 'Livro — Gestão de Vigilância Sanitária',
    subtitle: {
      'pt-BR': 'Digitalização de Processos, Inteligência de Dados e Monitoramento de Denúncias',
      'en-US': 'Process Digitization, Data Intelligence, and Denunciation Monitoring',
    },
    technologies: ['Node.js', 'Sequelize ORM', 'MySQL', 'EJS', 'Chart.js', 'PM2', 'Nginx'],
    githubUrl: 'https://github.com/self1027/Livro',
    demoUrl: 'https://livro.murilod.dev/',
    previewImage: '/media/livro-demo.webp',
    problem: {
      'pt-BR': [
        'A Vigilância Sanitária de Andradina operava historicamente com livros físicos e registros manuais para acompanhamento de denúncias e processos administrativos.',
        'Essa operação manual tornava as buscas por históricos operacionais morosas (aproximadamente 5 minutos por consulta) e gerava riscos severos de extravio ou duplicidade de protocolos.',
        'O objetivo foi digitalizar os registros, preservar a rastreabilidade e reduzir o tempo gasto em consultas ao arquivo físico.',
      ],
      'en-US': [
        'The Vigilância Sanitária de Andradina historically operated with physical logbooks and paper records to track municipal health complaints and administrative inspections.',
        'This manual process made historical searches time-consuming (~5 minutes per inquiry) and created risks of lost records or conflicting protocol numbering.',
        'The objective was to digitize records, preserve traceability and reduce time spent searching physical files.',
      ],
    },
    technicalChallenges: {
      'pt-BR': [
        'Eliminar livros físicos e garantir que protocolos históricos não fossem extraviados ou danificados.',
        'Impedir duplicidade na combinação de ano e número de protocolo no banco de dados.',
        'Reduzir drasticamente o tempo de consulta aos registros de fiscalização.',
        'Implantar sistema seguro com trilha de auditoria completa em servidor Linux on-premises.',
      ],
      'en-US': [
        'Eliminating paper-based records while safeguarding historical municipal health complaints from loss.',
        'Enforcing unique year-and-protocol-number pairs at the database level.',
        'Drastically slashing inspection record lookup duration from minutes to seconds.',
        'Deploying a secure audit-trailed system on municipal on-premises Linux server infrastructure.',
      ],
    },
    decision: {
      title: {
        'pt-BR': 'Modelagem Relacional Rígida e Unicidade Protocolar',
        'en-US': 'Strict Relational Modeling & Protocol Uniqueness Constraints',
      },
      content: {
        'pt-BR': [
          'A arquitetura adotou o Sequelize ORM com banco de dados MySQL para estruturação relacional das entidades.',
          'Uma restrição única composta sobre ano e número impede protocolos duplicados no banco. Essa restrição trata integridade dos dados; permissões de edição, auditoria e requisitos legais são responsabilidades separadas.',
        ],
        'en-US': [
          'The architecture uses Sequelize ORM and MySQL to model relationships and enforce database constraints.',
          'A composite unique constraint on year and number rejects duplicate protocols in the database. It addresses data integrity; editing permissions, audit records and legal requirements are separate responsibilities.',
        ],
      },
    },
    diagrams: [
      {
        src: '/media/mermaid/livro/fig-1.png',
        caption: {
          'pt-BR': 'Fluxo de registro: unicidade da combinação de ano e protocolo por restrição no banco.',
          'en-US': 'Registration flow: database constraint enforces unique year-and-protocol-number pairs.',
        },
        alt: {
          'pt-BR': 'Diagrama de fluxo de cadastro e validação de restrição única do protocolo',
          'en-US': 'Protocol uniqueness constraint registration flow diagram',
        },
      },
      {
        src: '/media/mermaid/livro/fig-2.png',
        caption: {
          'pt-BR': 'Rastreabilidade: cada interação gera um log vinculado ao agente responsável.',
          'en-US': 'Traceability: each interaction generates a log linked to the responsible agent.',
        },
        alt: {
          'pt-BR': 'Diagrama de trilha de auditoria e rastreabilidade por agente',
          'en-US': 'Audit trail and agent traceability flow diagram',
        },
      },
    ],
    pipelineOrSections: {
      title: {
        'pt-BR': 'Arquitetura de Dados, Automação e Auditoria',
        'en-US': 'Data Architecture, Automation & Auditability',
      },
      items: [
        {
          subtitle: {
            'pt-BR': '1. Levantamento de Requisitos e Modelagem Relacional',
            'en-US': '1. Requirements Gathering & Relational Modeling',
          },
          text: {
            'pt-BR': 'Normalização do banco de dados MySQL via Sequelize ORM para suportar denúncias, estabelecimentos, autuações e notificações fiscais.',
            'en-US': 'MySQL schema normalization via Sequelize ORM to support denunciations, commercial establishments, citations, and fiscal notices.',
          },
        },
        {
          subtitle: {
            'pt-BR': '2. Restrição de Unicidade Composta [Ano + Número]',
            'en-US': '2. Compound Uniqueness Constraint [Year + Number]',
          },
          text: {
            'pt-BR': 'Índices compostos no MySQL impedem colisões de numeração mesmo em requisições simultâneas de múltiplos fiscais.',
            'en-US': 'Compound database indexes prevent protocol number collisions even during concurrent submissions from multiple inspectors.',
          },
        },
        {
          subtitle: {
            'pt-BR': '3. Hooks de Ciclo de Vida e Trilha de Auditoria',
            'en-US': '3. Lifecycle Hooks & Audit Trail',
          },
          text: {
            'pt-BR': 'Hooks automáticos registram autor, timestamp e dados anteriores a cada alteração de status ou despacho legal.',
            'en-US': 'Automated lifecycle hooks capture user ID, timestamp, and previous state snapshots upon every status change.',
          },
        },
        {
          subtitle: {
            'pt-BR': '4. Painel de Inteligência Operacional com Chart.js',
            'en-US': '4. Operational Intelligence Dashboard with Chart.js',
          },
          text: {
            'pt-BR': 'Dashboards agregam dados de denúncias por bairro, tipo de infração e índice de resolução em tempo real.',
            'en-US': 'Real-time dashboards aggregate denunciations by municipal district, infraction category, and resolution velocity.',
          },
        },
        {
          subtitle: {
            'pt-BR': '5. Infraestrutura Local, PM2 e Nginx',
            'en-US': '5. On-Premises Infrastructure, PM2 & Nginx',
          },
          text: {
            'pt-BR': 'Deploy interno na infraestrutura da Prefeitura com proxy reverso Nginx, supervisão contínua por PM2 e reinicialização automática.',
            'en-US': 'Deployment within the municipal intranet featuring Nginx reverse proxy, PM2 process supervision, and auto-restart resilience.',
          },
        },
      ],
    },
    codeSnippets: [
      {
        title: 'Modelo Sequelize com Restrição Única Composta (Ano + Número)',
        titleEn: 'Sequelize model: unique year-and-number pairs',
        language: 'typescript',
        code: `const Denunciation = connection.define('denunciations', {
    year: { type: Sequelize.INTEGER, allowNull: false },
    number: { type: Sequelize.INTEGER, allowNull: false },
    status: { type: Sequelize.STRING },
    title: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false }
}, {
    indexes: [{
        unique: true,
        fields: ['year', 'number']
    }]
});`,
        description: {
          'pt-BR': 'A restrição rejeita pares de ano e número duplicados. Ela não impede alterações em outros campos nem torna o registro imutável.',
          'en-US': 'The constraint rejects duplicate year-and-number pairs. It does not prevent other fields from being edited or make a record immutable.',
        },
      },
      {
        title: 'Configuração de Infraestrutura Local: PM2 & Nginx',
        titleEn: 'Local infrastructure: PM2 and Nginx',
        language: 'bash',
        code: `# Gestão de Uptime com PM2
pm2 start bin/www --name "sistema-livro" --watch

# Configuração Nginx Local
location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}`,
        description: {
          'pt-BR': 'Deploy em rede interna da Prefeitura com proxy reverso Nginx e monitoramento contínuo de processos pelo PM2.',
          'en-US': 'Municipal internal network deployment featuring Nginx reverse proxy and continuous PM2 process supervisor.',
        },
      },
    ],
    tradeOffs: {
      'pt-BR': [
        'Arquitetura monolítica em Node.js com EJS e Chart.js adotada para viabilizar manutenção simples e deploy ágil na rede interna da prefeitura.',
        'MySQL foi escolhido pelas relações entre entidades e restrições de integridade. Essa escolha exige manutenção do esquema e migrações conforme os requisitos evoluem.',
      ],
      'en-US': [
        'Monolithic Node.js with EJS server-rendered views and Chart.js chosen for rapid deployment and simple on-premises maintenance.',
        'MySQL was chosen for entity relationships and integrity constraints. This requires schema maintenance and migrations as requirements evolve.',
      ],
    },
    result: {
      'pt-BR': [
        'A estimativa operacional relatada passou de ~5 minutos de busca em arquivos físicos para ~10 segundos no sistema. A comparação descreve a digitalização do fluxo, não um benchmark isolado de consulta SQL.',
        'A equipe municipal passou a dedicar menos tempo à busca em arquivos físicos e mais tempo a ações operacionais de campo.',
      ],
      'en-US': [
        'The reported operational estimate went from ~5 minutes searching physical files to ~10 seconds in the system. This compares workflows after digitization, not isolated SQL query performance.',
        'The municipal team now spends far less time searching physical files and more time in high-priority field operations.',
      ],
    },
    demonstrates: {
      'pt-BR': [
        'Levantamento e análise de requisitos reais',
        'Digitalização de processos no setor público',
        'Modelagem relacional de banco de dados (MySQL / Sequelize)',
        'Administração de servidores Linux',
        'Infraestrutura interna e proxy reverso Nginx',
        'Desenvolvimento de dashboards com Chart.js',
        'Rastreabilidade e integridade estrita de dados',
      ],
      'en-US': [
        'Requirements analysis',
        'Public-sector process digitization',
        'Relational database modeling',
        'MySQL / Sequelize',
        'Linux server administration',
        'Internal infrastructure',
        'Dashboard development',
        'Data visualization with Chart.js',
        'Data traceability',
      ],
    },
  },

  'nobsdownloader': {
    id: 'nobsdownloader',
    slug: 'nobsdownloader',
    title: 'NoBSDownloader — Media Extraction Engine',
    subtitle: {
      'pt-BR': 'Extração de Mídia com yt-dlp e Processamento de Streams em Tempo Real',
      'en-US': 'Media Extraction with yt-dlp and Real-Time Stream Processing',
    },
    technologies: ['Node.js', 'yt-dlp', 'FFmpeg', 'Child Processes', 'Stream Processing', 'YAML'],
    githubUrl: 'https://github.com/self1027/NoBSDownloader',
    previewImage: '/media/nobsd-demo.png',
    problem: {
      'pt-BR': [
        'Usuários que necessitam de extração de mídia frequentemente dependem de interfaces web repletas de publicidade abusiva, rastreadores e redirecionamentos inseguros.',
        'O desafio técnico consiste em orquestrar ferramentas nativas de alto consumo de I/O (yt-dlp e FFmpeg) controlando rigorosamente o consumo de recursos computacionais e isolando arquivos temporários.',
      ],
      'en-US': [
        'Users requiring media extraction are often pushed toward shady web portals overloaded with intrusive advertisements, trackers, and malicious redirects.',
        'The engineering challenge is orchestrating resource-heavy I/O tools (yt-dlp and FFmpeg) while strictly safeguarding system CPU/disk limits and isolating temporary files.',
      ],
    },
    technicalChallenges: {
      'pt-BR': [
        'Orquestrar binários nativos pesados (yt-dlp e FFmpeg) sem bloquear o loop de eventos assíncrono do Node.js.',
        'Tratar encerramento de processos e limpeza por plataforma; processos descendentes exigem controle adicional no Linux.',
        'Impor limites rigorosos de tamanho de arquivo (teto de 1.0 GiB) através de inspeção contínua de streams.',
        'Separação de tarefas em diretórios temporários únicos e rotinas de limpeza pós-processamento.',
      ],
      'en-US': [
        'Orchestrating resource-intensive native binaries (yt-dlp and FFmpeg) without starving the Node.js event loop.',
        'Handling process termination and cleanup per platform; descendant processes require additional control on Linux.',
        'Enforcing rigid file payload ceilings (1.0 GiB cap) via real-time stdout stream inspection.',
        'Per-job temporary directories and post-extraction cleanup routines.',
      ],
    },
    decision: {
      title: {
        'pt-BR': 'Orquestração Assíncrona de Processos-Filho (Child Processes)',
        'en-US': 'Asynchronous Child Process Orchestration',
      },
      content: {
        'pt-BR': [
          'Em vez de sobrecarregar o event loop do Node.js, yt-dlp e FFmpeg são executados como processos-filho utilizando spawn.',
          'Isso permite monitoramento em tempo real dos fluxos stdout/stderr e terminação imediata (taskkill no Windows ou SIGKILL no Linux) caso limites pré-determinados sejam violados.',
        ],
        'en-US': [
          'Rather than blocking Node.js application logic, yt-dlp and FFmpeg are orchestrated as child processes via spawn.',
          'This permits direct stdout/stderr stream observation and immediate process termination (taskkill on Windows, SIGKILL on POSIX) when safety thresholds are breached.',
        ],
      },
    },
    diagrams: [
      {
        src: '/media/mermaid/nobsdownloader/fig-1.png',
        caption: {
          'pt-BR': 'Fluxo de extração: da URL à entrega controlada do binário processado.',
          'en-US': 'Extraction flow: from URL to processed binary delivery.',
        },
        alt: {
          'pt-BR': 'Diagrama de fluxo de extração de mídia com spawn e FFmpeg',
          'en-US': 'Media extraction stream flow with spawn and FFmpeg',
        },
      },
      {
        src: '/media/mermaid/nobsdownloader/fig-2.png',
        caption: {
          'pt-BR': 'Pipeline de transcodificação de áudio através de FFmpeg.',
          'en-US': 'Audio transcoding pipeline through FFmpeg.',
        },
        alt: {
          'pt-BR': 'Diagrama do pipeline de transcodificação de áudio',
          'en-US': 'Audio transcoding pipeline diagram',
        },
      },
    ],
    pipelineOrSections: {
      title: {
        'pt-BR': 'Pipeline de Extração, Limitação e Transcodificação',
        'en-US': 'Extraction, Limitation & Transcoding Pipeline',
      },
      items: [
        {
          subtitle: {
            'pt-BR': '1. Ingestão de URL e Configuração Declarativa',
            'en-US': '1. URL Ingestion & Declarative YAML Config',
          },
          text: {
            'pt-BR': 'Validação e higienização estrita de URLs recebidas, com leitura de parâmetros de formato e codec a partir de esquemas YAML.',
            'en-US': 'Strict validation and sanitization of incoming URLs paired with declarative format/codec specs parsed from YAML configs.',
          },
        },
        {
          subtitle: {
            'pt-BR': '2. Extração de Metadados e Mapeamento',
            'en-US': '2. Metadata Dump & Stream Resolution Mapping',
          },
          text: {
            'pt-BR': 'Execução de dump JSON de formatos disponíveis via yt-dlp, filtrando faixas duplicadas ou streams sem áudio correspondente.',
            'en-US': 'Execution of yt-dlp JSON format dump, filtering redundant streams and cataloging resolutions with valid audio pairings.',
          },
        },
        {
          subtitle: {
            'pt-BR': '3. Spawn de Processo e Inspeção de stdout',
            'en-US': '3. Process Spawn & Real-Time stdout Inspection',
          },
          text: {
            'pt-BR': 'Invocação isolada do processo nativo com captura de chunks de saída para cálculo de progresso e detecção de tamanho.',
            'en-US': 'Isolated native process invocation capturing streamed chunks to calculate progress and track output size thresholds.',
          },
        },
        {
          subtitle: {
            'pt-BR': '4. Kill Switch de Segurança (Teto de 1.0 GiB)',
            'en-US': '4. Safety Kill Switch (1.0 GiB Ceiling)',
          },
          text: {
            'pt-BR': 'Ao ultrapassar o limite monitorado de saída, a aplicação solicita o encerramento do processo. A árvore de processos e arquivos temporários exigem tratamento adicional.',
            'en-US': 'When output exceeds the monitored limit, the application requests process termination. Process trees and temporary files require additional handling.',
          },
        },
        {
          subtitle: {
            'pt-BR': '5. Transcodificação FFmpeg e Limpeza Automática',
            'en-US': '5. FFmpeg Transcoding & Automatic Cleanup',
          },
          text: {
            'pt-BR': 'Conversão para o formato desejado (MP3, MP4) em diretório temporário isolado com remoção de resíduos pós-entrega.',
            'en-US': 'Conversion to the target container (MP3, MP4) in a per-job scratch directory with cleanup after delivery.',
          },
        },
      ],
    },
    codeSnippets: [
      {
        title: 'Monitoramento de Fluxo e Encerramento Forçado por Limite de Tamanho',
        titleEn: 'Output monitoring and size limits',
        language: 'javascript',
        code: `const yt = spawn(YTDLP_PATH, ytArgs);

yt.stdout.on("data", (data) => {
    const output = data.toString();

    if (output.includes("GiB")) {
        const sizeMatch = output.match(/(\\d+\\.\\d+)GiB/);

        if (sizeMatch && parseFloat(sizeMatch[1]) >= 1.0) {
            exitReason = "LIMIT_EXCEEDED";

            process.platform === "win32"
                ? exec(\`taskkill /pid \${yt.pid} /f /t\`)
                : yt.kill("SIGKILL");
        }
    }
});`,
        description: {
          'pt-BR': 'Monitoramento do progresso em stdout para solicitar encerramento ao detectar o limite. O trecho não substitui quotas do sistema operacional nem garante encerramento dos processos descendentes.',
          'en-US': 'Monitoring stdout progress to request termination when the limit is detected. This excerpt does not replace operating-system quotas or guarantee termination of descendant processes.',
        },
      },
      {
        title: 'Mapeamento Seguro e Filtragem de Formatos',
        titleEn: 'Format mapping and filtering',
        language: 'javascript',
        code: `json.formats.forEach(f => {
    const isVideo = f.vcodec !== "none" || f.video_ext !== "none";
    const height = f.height || parseInt(f.quality) || 0;

    if (isVideo && height > 0 && !videoMap.has(height)) {
        videoMap.set(height, {
            format_id: f.format_id,
            resolution: \`\${height}p\`,
            hasAudio: f.acodec !== "none"
        });
    }
});`,
        description: {
          'pt-BR': 'Filtragem seletiva de streams de áudio e vídeo com remoção de formatos corrompidos ou redundantes.',
          'en-US': 'Selective parsing and deduplication of video and audio tracks from yt-dlp JSON metadata.',
        },
      },
    ],
    tradeOffs: {
      'pt-BR': [
        'A dependência de binários externos instalados no host exige validação prévia de caminhos executáveis.',
        'Limites de tempo e tamanho reduzem consumo excessivo, mas não substituem quotas de CPU, memória e disco no sistema operacional.',
      ],
      'en-US': [
        'Requirement for host-installed native binaries requires pre-flight executable verification.',
        'Runtime and payload limits reduce excessive consumption but do not replace operating-system CPU, memory and disk quotas.',
      ],
    },
    result: {
      'pt-BR': [
        'Extração limpa, direta e determinística de mídia sem publicidade invasiva, redirecionamentos ou rastreadores.',
        'Monitoramento de tamanho e uso de diretórios temporários por tarefa. spawn não é uma sandbox; quotas do sistema operacional e controle da árvore de processos são medidas adicionais.',
      ],
      'en-US': [
        'Clean, deterministic media extraction without deceptive advertisements, redirects, or third-party trackers.',
        'Output-size monitoring and per-task temporary directories. spawn is not a sandbox; operating-system quotas and process-tree control are additional measures.',
      ],
    },
    demonstrates: {
      'pt-BR': [
        'Orquestração de processos-filho (Child Processes)',
        'Integração e automação com yt-dlp',
        'Integração e transcodificação com FFmpeg',
        'Gerenciamento de streams e buffers de I/O',
        'Isolamento e limpeza automática de diretórios temporários',
        'Aplicação de limites rígidos de recursos computacionais',
        'Terminação de processos multiplataforma (Windows / POSIX)',
        'Configuração declarativa baseada em YAML',
      ],
      'en-US': [
        'Child-process orchestration',
        'yt-dlp integration',
        'FFmpeg integration',
        'Stream and buffer management',
        'Job isolation',
        'Resource-limit enforcement',
        'Cross-platform process termination',
        'YAML-based configuration',
      ],
    },
  },
};
