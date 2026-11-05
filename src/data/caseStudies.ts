import type { CaseStudyData } from '../types';
import { integraImage, meganTrimmerImage, livroImage } from './projectImages';

export const caseStudies: Record<string, CaseStudyData> = {
  'megan-trimmer': {
    id: 'megan-trimmer',
    slug: 'megan-trimmer',
    title: 'MeganTrimmer — Corte e Conversão de Vídeos',
    subtitle: {
      'pt-BR': "Corte e conversão de vídeos no computador com Electron e FFmpeg",
      'en-US': "Local video trimming and conversion with Electron and FFmpeg",
    },
    technologies: ['Electron', 'TypeScript', 'FFmpeg', 'FFprobe', 'IPC', 'electron-updater'],
    githubUrl: 'https://github.com/self1027/MeganTrimmer',
    previewImage: meganTrimmerImage.src,
    problem: {
      'pt-BR': [
        "O MeganTrimmer reúne a prévia do vídeo, a seleção do trecho e as opções de exportação em uma janela. A proposta é facilitar cortes e conversões do dia a dia.",
        "O processamento roda no computador, com FFmpeg e FFprobe incluídos. É possível manter as configurações originais, escolher formato, resolução e quadros por segundo ou extrair áudio em MP3 e WAV.",
      ],
      'en-US': [
        "MeganTrimmer puts video preview, trim selection and export options in one window. It is designed for everyday trimming and conversion tasks.",
        "Processing runs on the computer, with FFmpeg and FFprobe included. Users can keep the original settings, choose a format, resolution and frame rate, or extract MP3 and WAV audio.",
      ],
    },
    technicalChallenges: {
      'pt-BR': [
        'Separar a interface dos acessos a arquivos e da execução do FFmpeg por meio de IPC e validar os pedidos no processo principal.',
        'Decidir quando copiar streams sem recodificar e quando converter, considerando filtros e compatibilidade do contêiner.',
        'Testar se um encoder de hardware funciona de fato e preservar uma alternativa por software.',
        'Evitar sobrescrita de arquivos e coordenar exportação, fechamento e atualização do aplicativo.',
      ],
      'en-US': [
        'Separate the interface from file access and FFmpeg execution through IPC, validating requests in the main process.',
        'Choose between stream copy and re-encoding based on filters and container compatibility.',
        'Probe whether a hardware encoder actually works and retain a software fallback.',
        'Avoid overwriting files and coordinate export, closing and application updates.',
      ],
    },
    decision: {
      title: {
        'pt-BR': "Interface e exportação em processos separados",
        'en-US': "Separate processes for the interface and export",
      },
      content: {
        'pt-BR': [
          "A interface envia o pedido pela ponte preload. No processo principal, o handler valida arquivo, tempos e opções, escolhe o destino e impede exportações simultâneas. Os eventos IPC levam o progresso de volta ao renderer.",
          "O FFprobe identifica os streams. Quando formato e opções permitem, o FFmpeg os copia sem recodificar. Caso contrário, o serviço prepara a conversão e testa os encoders disponíveis. O arquivo é escrito em um temporário antes de ser publicado no destino.",
          "FFmpeg e FFprobe acompanham o aplicativo e rodam fora do arquivo ASAR. O usuário não precisa instalar esses binários separadamente.",
        ],
        'en-US': [
          "The interface sends a request through the preload bridge. In the main process, the handler validates the file, timings and options, resolves the destination and prevents concurrent exports. IPC events carry progress back to the renderer.",
          "FFprobe identifies the streams. When the format and options allow, FFmpeg copies them without re-encoding. Otherwise, the service prepares conversion and probes available encoders. The output is written to a temporary file before publication at its destination.",
          "FFmpeg and FFprobe ship with the app and run outside the ASAR archive. Users do not need to install those binaries separately.",
        ],
      },
    },
    diagrams: [{
      src: '/media/mermaid/megan-trimmer/export.png',
      caption: {
        'pt-BR': "A interface envia o corte por IPC. O processo principal valida o pedido e executa a exportação.",
        'en-US': "The interface sends the trim request over IPC. The main process validates it and runs the export.",
      },
      alt: {
        'pt-BR': 'Fluxo do renderer pela ponte preload até validação, FFprobe e exportação com FFmpeg',
        'en-US': 'Flow from the renderer through preload to validation, FFprobe and FFmpeg export',
      },
    }],
    pipelineOrSections: {
      title: { 'pt-BR': "Do vídeo ao clipe", 'en-US': "From video to clip" },
      items: [
        {
          subtitle: { 'pt-BR': "1. Abrir o vídeo e marcar o trecho", 'en-US': "1. Open the video and mark a segment" },
          text: {
            'pt-BR': 'O usuário abre ou arrasta um arquivo, acompanha a prévia e escolhe o trecho na linha do tempo. Para converter o vídeo inteiro, mantém a seleção completa e altera o formato de saída.',
            'en-US': 'Users open or drop a file, preview it and select a timeline segment. To convert the whole video, they retain the full selection and change the output format.',
          },
        },
        {
          subtitle: { 'pt-BR': "2. Validar e definir o destino", 'en-US': "2. Validate and resolve the destination" },
          text: {
            'pt-BR': 'O processo principal valida o pedido e recupera a pasta de saída salva. Se o nome desejado já existir, procura uma alternativa numerada, preservando o original.',
            'en-US': 'The main process validates the request and retrieves the saved output folder. If the desired name already exists, it finds a numbered alternative, preserving the original.',
          },
        },
        {
          subtitle: { 'pt-BR': "3. Copiar ou converter", 'en-US': "3. Copy or convert" },
          text: {
            'pt-BR': 'O serviço usa cópia de streams quando as condições permitem. A conversão pode ajustar resolução e FPS ou extrair áudio. Na codificação de vídeo, testa hardware e mantém libx264 como alternativa por software.',
            'en-US': 'The service uses stream copy when conditions allow. Conversion can adjust resolution and frame rate or extract audio. Video encoding probes hardware and retains libx264 as a software fallback.',
          },
        },
        {
          subtitle: { 'pt-BR': "4. Concluir a exportação e controlar atualizações", 'en-US': "4. Complete the export and manage updates" },
          text: {
            'pt-BR': 'A interface mostra progresso e permite abrir a pasta do clipe ao concluir. O instalador oferece atualização pelo aplicativo, com download e instalação sujeitos à escolha do usuário. Exportações em andamento impedem o reinício; alterações não exportadas exigem confirmação antes de fechar. O portátil é substituído manualmente.',
            'en-US': 'The interface shows progress and can open the clip folder on completion. The installed app offers updates, with downloading and installation subject to the user’s choice. Active exports block restart; unexported changes require confirmation before closing. Portable builds are replaced manually.',
          },
        },
      ],
    },
    codeSnippets: [
      {
        title: "Testar o encoder antes de usá-lo",
        titleEn: "Probing an encoder before use",
        language: 'typescript',
        code: `export async function selectEncoder(available: string[], probe: (name: string) => Promise<boolean>): Promise<string> {
  for (const name of HARDWARE_ENCODER_PRIORITIES) {
    if (available.includes(name) && await probe(name)) return name;
  }
  return 'libx264';
}`,
        description: {
          'pt-BR': "Trecho de src/main/services/trim.ts. Além de estar listado no FFmpeg, o encoder precisa passar no teste de execução para ser escolhido.",
          'en-US': "Excerpt from src/main/services/trim.ts. An encoder must be listed in FFmpeg and pass the runtime probe before it is selected.",
        },
      },
      {
        title: "Download e instalação por escolha do usuário",
        titleEn: "User-controlled download and installation",
        language: 'typescript',
        code: `updater.autoDownload = false;
updater.autoInstallOnAppQuit = false;
updater.allowPrerelease = false;
updater.allowDowngrade = false;`,
        description: {
          'pt-BR': "Trecho de src/main/services/updater.ts. Download e instalação são acionados explicitamente. Antes de permitir o reinício, o aplicativo verifica se há uma exportação em andamento.",
          'en-US': "Excerpt from src/main/services/updater.ts. Download and installation are triggered explicitly. Before allowing a restart, the app checks for an active export.",
        },
      },
    ],
    tradeOffs: {
      'pt-BR': [
        'Electron e os binários incluídos aumentam o tamanho da distribuição em troca de um ambiente desktop com processamento local e sem instalação separada do FFmpeg.',
        'Cópia de streams evita recodificação, mas os limites do corte dependem dos keyframes. Aceleração por hardware depende de GPU, driver e codec; não há uma promessa de ganho fixo de desempenho.',
        'A distribuição documentada concentra-se em Windows x64. Os executáveis não têm assinatura digital; a conferência SHA-512 do atualizador verifica integridade e não substitui a assinatura do editor.',
      ],
      'en-US': [
        'Electron and bundled binaries increase distribution size in exchange for a desktop environment with local processing and no separate FFmpeg installation.',
        'Stream copy avoids re-encoding, but trim boundaries depend on keyframes. Hardware acceleration depends on the GPU, driver and codec; no fixed performance gain is promised.',
        'The documented distribution focuses on Windows x64. Executables are not digitally signed; updater SHA-512 verification checks integrity and does not replace publisher signing.',
      ],
    },
    result: {
      'pt-BR': [
        'O aplicativo reúne corte, conversão para MP4, MKV e AVI e extração de MP3 e WAV em um fluxo local. O usuário pode salvar a pasta de destino, acompanhar a exportação e preservar o arquivo de entrada.',
        "O repositório inclui testes de serviços e interface, conferência dos binários empacotados e teste do feed de atualização em servidor local. Esses testes ajudam a verificar a manutenção do aplicativo; não medem velocidade nem adoção.",
      ],
      'en-US': [
        'The app brings trimming, MP4, MKV and AVI conversion, and MP3 and WAV extraction into a local workflow. Users can save the destination folder, track exports and preserve the input file.',
        "The repository includes service and interface tests, packaged-binary checks and an update-feed test on a local server. These help check application maintenance; they do not measure speed or adoption.",
      ],
    },
    demonstrates: {
      'pt-BR': ['Separação entre renderer, preload e processo principal', 'Validação de pedidos IPC e tratamento de falhas de exportação', 'Integração com FFmpeg, FFprobe e encoders de hardware', 'Empacotamento desktop e atualizações com escolha explícita'],
      'en-US': ['Renderer, preload and main-process separation', 'IPC request validation and export failure handling', 'FFmpeg, FFprobe and hardware encoder integration', 'Desktop packaging and updates with explicit user choice'],
    },
  },
  'ascii-cam': {
    id: 'ascii-cam',
    slug: 'ascii-cam',
    title: "ASCII Cam — Vídeo em caracteres",
    subtitle: {
      'pt-BR': "Vídeo em tempo real com Web Workers e transferência de buffers",
      'en-US': "Real-time video with Web Workers and buffer transfer",
    },
    technologies: ['TypeScript', 'Web Workers', 'Canvas 2D', 'Transferable Objects', 'Image Processing', 'Real-Time'],
    githubUrl: 'https://github.com/self1027/ascii-cam',
    demoUrl: 'https://ascii.murilod.dev/',
    previewImage: '/media/ascii-demo.webp',
    problem: {
      'pt-BR': [
        "Converter os quadros de uma webcam a 60 FPS em caracteres ASCII exige processar muitos pixels por segundo.",
        "Quando esse cálculo roda na thread principal do navegador, ele disputa tempo com o desenho da interface e pode causar travamentos.",
        "O objetivo foi manter 30+ FPS, com ajustes de brilho e contraste durante a captura e controles que continuassem respondendo.",
      ],
      'en-US': [
        "Converting webcam frames at 60 FPS into ASCII characters requires processing many pixels each second.",
        "Running those calculations on the browser’s main thread competes with interface rendering and can cause visible stuttering.",
        "The goal was to maintain 30+ FPS with live brightness and contrast adjustments while keeping the controls responsive.",
      ],
    },
    technicalChallenges: {
      'pt-BR': [
        "Manter 30+ FPS enquanto a webcam envia novos quadros.",
        "Evitar que a conversão dos pixels bloqueie a thread da interface.",
        "Transferir buffers entre threads sem copiar os dados.",
        "Usar uma tabela LUT para consultar os ajustes de brilho e contraste em O(1).",
      ],
      'en-US': [
        "Maintain 30+ FPS while the webcam supplies new frames.",
        "Keep pixel conversion from blocking the interface thread.",
        "Transfer buffers between threads without copying the data.",
        "Use a lookup table for O(1) brightness and contrast lookups.",
      ],
    },
    decision: {
      title: {
        'pt-BR': "Conversão de pixels em um Web Worker",
        'en-US': "Pixel conversion in a Web Worker",
      },
      content: {
        'pt-BR': [
          "A captura dos quadros e o desenho dos caracteres ficam separados do processamento dos pixels.",
          "Um Web Worker calcula a luminância e escolhe os caracteres. A thread principal recebe o resultado e desenha no Canvas.",
        ],
        'en-US': [
          "Frame capture and character drawing are separate from pixel processing.",
          "A Web Worker calculates luminance and selects characters. The main thread receives the result and draws it on the Canvas.",
        ],
      },
    },
    diagrams: [
      {
        src: '/media/mermaid/ascii/fig-2.png',
        caption: {
          'pt-BR': "A thread principal captura o quadro; o Worker calcula a matriz de caracteres em paralelo.",
          'en-US': "The main thread captures the frame while the Worker calculates the character matrix in parallel.",
        },
        alt: {
          'pt-BR': 'Diagrama do pipeline assíncrono entre Main Thread e Web Worker no ASCII Cam',
          'en-US': 'Asynchronous pipeline diagram between Main Thread and Web Worker in ASCII Cam',
        },
      },
    ],
    pipelineOrSections: {
      title: {
        'pt-BR': "Como cada quadro vira texto",
        'en-US': "How each frame becomes text",
      },
      items: [
        {
          subtitle: {
            'pt-BR': "1. Captura do quadro",
            'en-US': "1. Frame capture",
          },
          text: {
            'pt-BR': "A thread principal desenha o quadro do elemento <video> em um Canvas temporário e lê os pixels RGBA em um Uint8ClampedArray.",
            'en-US': "The main thread draws the <video> frame on a temporary Canvas and reads its RGBA pixels into a Uint8ClampedArray.",
          },
        },
        {
          subtitle: {
            'pt-BR': "2. Envio do buffer",
            'en-US': "2. Buffer transfer",
          },
          text: {
            'pt-BR': "O buffer é transferido ao Worker com Transferable Objects. A posse muda de thread sem clonar os dados em memória.",
            'en-US': "Transferable Objects move buffer ownership to the Worker without cloning the data in memory.",
          },
        },
        {
          subtitle: {
            'pt-BR': "3. Conversão no Worker",
            'en-US': "3. Worker conversion",
          },
          text: {
            'pt-BR': "O Worker calcula a luminância pelo padrão Rec. 709, ajusta o brilho e consulta o contraste em uma tabela LUT.",
            'en-US': "The Worker calculates Rec. 709 luminance, adjusts brightness and looks up contrast in a lookup table.",
          },
        },
        {
          subtitle: {
            'pt-BR': "4. Retorno dos caracteres",
            'en-US': "4. Character results",
          },
          text: {
            'pt-BR': "O Worker devolve um Int32Array com os índices dos caracteres e, no modo colorido, os dados de cor. O retorno também transfere a posse dos buffers.",
            'en-US': "The Worker returns an Int32Array containing character indexes and, in color mode, color data. The return path also transfers buffer ownership.",
          },
        },
        {
          subtitle: {
            'pt-BR': "5. Desenho no Canvas",
            'en-US': "5. Canvas drawing",
          },
          text: {
            'pt-BR': "A thread principal usa fillText para desenhar os caracteres na grade do Canvas 2D. O tamanho da grade determina quantas chamadas de desenho cada quadro exige.",
            'en-US': "The main thread uses fillText to draw the character grid on Canvas 2D. Grid size determines how many drawing calls each frame needs.",
          },
        },
      ],
    },
    codeSnippets: [
      {
        title: "Transferência dos buffers entre threads",
        titleEn: "Transferring buffers between threads",
        language: 'typescript',
        code: `// No Worker: Enviando os dados processados sem cópia
(self as any).postMessage({
    charIndices,
    colors
}, [charIndices.buffer, colors.buffer]);`,
        description: {
          'pt-BR': "O ArrayBuffer muda de dono e passa à thread principal sem duplicar os bytes na memória.",
          'en-US': "ArrayBuffer ownership moves to the main thread without duplicating the bytes in memory.",
        },
      },
      {
        title: "Luminância Rec. 709 e consulta de contraste",
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
          'pt-BR': "Este exemplo consulta a LUT em O(1) e limita o índice a [0, 255]. O processamento completo de um quadro inclui outras etapas.",
          'en-US': "This example performs an O(1) lookup with the index limited to [0, 255]. Processing a complete frame includes other steps.",
        },
      },
    ],
    tradeOffs: {
      'pt-BR': [
        "OffscreenCanvas pode melhorar o desempenho nos navegadores que o suportam. É preciso detectar esse suporte e manter uma alternativa.",
        "A conversão ainda consome CPU. Limitar a grade de caracteres reduz o número de pixels e chamadas de desenho por quadro.",
        "A resolução da grade precisa acompanhar o tamanho da tela para não acumular chamadas de desenho.",
      ],
      'en-US': [
        "OffscreenCanvas can improve performance in browsers that support it. Support detection and a fallback are needed.",
        "Conversion still uses CPU time. Limiting the character grid reduces pixels and drawing calls per frame.",
        "Grid resolution needs to suit the viewport size to avoid excessive drawing calls.",
      ],
    },
    result: {
      'pt-BR': [
        "O projeto relata 30+ FPS. A taxa varia com hardware, navegador e resolução da grade; este case não apresenta uma matriz de benchmarks.",
        "Mover a conversão para o Worker reduz o trabalho da thread principal. Capturar os quadros e desenhar no Canvas continuam sendo tarefas dessa thread.",
      ],
      'en-US': [
        "The project reports 30+ FPS. The rate varies with hardware, browser and grid resolution; this case study does not include a benchmark matrix.",
        "Moving conversion to the Worker reduces main-thread work. Frame capture and Canvas drawing still run on that thread.",
      ],
    },
    demonstrates: {
      'pt-BR': [
        'Processamento nativo de vídeo no navegador',
        'Concorrência JavaScript via Web Workers',
        "Cálculo de luminância e ajustes de imagem",
        "Ajuste da grade para manter a interface responsiva",
      ],
      'en-US': [
        'Native browser video stream processing',
        'JavaScript concurrency via Web Workers',
        "Luminance calculation and image adjustments",
        "Grid sizing to keep the interface responsive",
      ],
    },
  },

  'infinity-ttt': {
    id: 'infinity-ttt',
    slug: 'infinity-ttt',
    title: 'Infinity Tic-Tac-Toe',
    subtitle: {
      'pt-BR': "Jogo multiplayer com regras e estado controlados pelo servidor",
      'en-US': "A multiplayer game with server-controlled rules and state",
    },
    technologies: ['Node.js', 'TypeScript', 'Socket.io', 'Express', 'Event-Driven', 'Authoritative Server'],
    githubUrl: 'https://github.com/self1027/infinity-ttt',
    demoUrl: 'https://infinityttt.murilod.dev/',
    previewImage: '/media/infinityttt-demo.webp',
    problem: {
      'pt-BR': [
        "Em uma partida multiplayer, os jogadores precisam ver o mesmo tabuleiro. Se cada cliente decide o resultado das jogadas, o estado pode divergir quando os eventos chegam em ordens diferentes.",
        "Atrasos e jogadas concorrentes podem deixar as telas fora de sincronia. Confiar nas regras executadas pelo cliente também permite que elas sejam manipuladas.",
        "O modo infinito acrescenta uma regra: ao atingir o limite de peças, a mais antiga precisa sair antes da próxima jogada. Essa mudança deve ser igual para todos na sala.",
      ],
      'en-US': [
        "Players in a multiplayer match need to see the same board. If each client decides move outcomes, state can diverge when events arrive in different orders.",
        "Delays and concurrent moves can leave screens out of sync. Trusting client-side rules also leaves those rules open to manipulation.",
        "Infinity mode adds a rule: at the mark limit, the oldest mark must leave before the next move. That change must be the same for everyone in the room.",
      ],
    },
    technicalChallenges: {
      'pt-BR': [
        "Manter o mesmo estado da partida nos clientes conectados.",
        "Validar a ordem das jogadas quando chegam vários cliques em sequência.",
        "Aplicar no backend a remoção FIFO da peça mais antiga.",
        "Encerrar salas inativas e liberar a memória após desconexões.",
      ],
      'en-US': [
        "Keep connected clients on the same match state.",
        "Validate move order when several clicks arrive in quick succession.",
        "Apply FIFO removal of the oldest mark in the backend.",
        "Close inactive rooms and release memory after disconnections.",
      ],
    },
    decision: {
      title: {
        'pt-BR': "O servidor decide o estado da partida",
        'en-US': "The server owns match state",
      },
      content: {
        'pt-BR': [
          "O cliente envia a jogada pretendida e desenha o estado recebido do servidor.",
          "O backend valida a posição e o turno, aplica as regras e atualiza a fila de peças. Depois envia o novo estado aos participantes.",
        ],
        'en-US': [
          "The client sends the intended move and renders the state received from the server.",
          "The backend validates the position and turn, applies the rules and updates the mark queue. It then sends the new state to the participants.",
        ],
      },
    },
    diagrams: [
      {
        src: '/media/mermaid/ttt/fig-2.png',
        caption: {
          'pt-BR': "O servidor valida a jogada e envia o estado atualizado aos participantes da sala.",
          'en-US': "The server validates the move and sends the updated state to participants in the room.",
        },
        alt: {
          'pt-BR': 'Diagrama de fluxo do ciclo de vida de jogada com servidor autoritativo',
          'en-US': 'Authoritative server move lifecycle flow diagram',
        },
      },
      {
        src: '/media/mermaid/ttt/fig-1.png',
        caption: {
          'pt-BR': "Ao atingir o limite, a peça mais antiga sai do tabuleiro antes da nova.",
          'en-US': "At the limit, the oldest mark leaves the board before the new one is placed.",
        },
        alt: {
          'pt-BR': 'Fluxo da regra do modo infinito com fila circular de peças',
          'en-US': 'Infinity mode piece recycling FIFO queue flow',
        },
      },
    ],
    pipelineOrSections: {
      title: {
        'pt-BR': "O caminho de uma jogada",
        'en-US': "How a move is processed",
      },
      items: [
        {
          subtitle: {
            'pt-BR': "1. Pedido do jogador",
            'en-US': "1. Player request",
          },
          text: {
            'pt-BR': "O cliente emite make_move com as coordenadas e o identificador da sala. Ele espera o estado do servidor antes de atualizar o tabuleiro.",
            'en-US': "The client emits make_move with the coordinates and room ID. It waits for the server state before updating the board.",
          },
        },
        {
          subtitle: {
            'pt-BR': "2. Validação no servidor",
            'en-US': "2. Server validation",
          },
          text: {
            'pt-BR': "O servidor confere se o socket.id pertence ao jogador da vez, se a posição é válida e está livre e se a partida continua em andamento.",
            'en-US': "The server checks that socket.id belongs to the current player, the position is valid and free, and the match is still in progress.",
          },
        },
        {
          subtitle: {
            'pt-BR': "3. Remoção da peça mais antiga",
            'en-US': "3. Oldest-mark removal",
          },
          text: {
            'pt-BR': "Quando o jogador já tem 3 peças, o servidor remove a mais antiga do histórico antes de inserir a nova, na mesma atualização da partida.",
            'en-US': "When the player already has 3 marks, the server removes the oldest from the history before inserting the new one, in the same match update.",
          },
        },
        {
          subtitle: {
            'pt-BR': "4. Resultado e envio do estado",
            'en-US': "4. Result and state broadcast",
          },
          text: {
            'pt-BR': "O servidor verifica as linhas de vitória no tabuleiro e envia o novo estado a todos os sockets da sala.",
            'en-US': "The server checks winning lines on the board and broadcasts the new state to every socket in the room.",
          },
        },
      ],
    },
    codeSnippets: [
      {
        title: "Remoção da peça mais antiga",
        titleEn: 'Oldest-mark removal: partial excerpt',
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
          'pt-BR': "O recorte mostra a remoção da peça mais antiga. Histórico, validação de posição e troca de turno ficam no código completo do repositório.",
          'en-US': "This excerpt shows oldest-mark removal. History handling, position validation and turn changes are in the full repository implementation.",
        },
      },
      {
        title: "Validação de turno com Socket.io",
        titleEn: 'Turn validation with Socket.io',
        language: 'typescript',
        code: `socket.on('make_move', ({ position, roomId }) => {
    const game = roomManager.getGame(roomId);

    if (!game || game.turn !== socket.id) return;

    const updatedState = game.executeMove(position);
    io.to(roomId).emit('update_game', updatedState);
});`,
        description: {
          'pt-BR': "A verificação do turno ocorre antes de executeMove. O código completo também precisa tratar a posição, as reconexões e o ciclo de vida da sala.",
          'en-US': "The turn check runs before executeMove. The full implementation also needs to handle positions, reconnections and the room lifecycle.",
        },
      },
    ],
    tradeOffs: {
      'pt-BR': [
        "O cliente espera a resposta do servidor para mostrar a jogada. Isso mantém uma única decisão sobre o estado, mas torna o atraso da rede perceptível.",
        "Cada sala ocupa memória no servidor. Salas abandonadas precisam ser identificadas e removidas.",
      ],
      'en-US': [
        "The client waits for the server response before showing a move. This keeps one authority over state but makes network delay visible.",
        "Each room uses server memory. Abandoned rooms need to be identified and removed.",
      ],
    },
    result: {
      'pt-BR': [
        "O servidor mantém o estado da partida e o envia aos clientes da sala.",
        "Turnos e regras são validados no backend. Atrasos de rede, desconexões e retorno à sala continuam exigindo tratamento.",
      ],
      'en-US': [
        "The server maintains match state and sends it to clients in the room.",
        "Turns and rules are validated in the backend. Network delays, disconnections and room re-entry still need handling.",
      ],
    },
    demonstrates: {
      'pt-BR': [
        "Partidas multiplayer em tempo real",
        "Validação da ordem de jogadas concorrentes",
        "Sincronização do estado por WebSockets",
        'Arquitetura orientada a eventos',
        'Aplicação de regras de negócio autoritativas no backend',
      ],
      'en-US': [
        "Real-time multiplayer matches",
        "Ordering and validating concurrent moves",
        "State synchronization over WebSockets",
        'Event-driven architecture',
        'Backend business-rule enforcement',
      ],
    },
  },

  'integra': {
    id: 'integra',
    slug: 'integra',
    title: 'Integra MQF — Da Fala aos Sinais, Offline',
    subtitle: {
      'pt-BR': "Fala em português, transcrição e sinais de Libras com processamento local",
      'en-US': "Portuguese speech, transcription and Libras signs with local processing",
    },
    technologies: ['Node.js', 'Express', 'WebSockets', 'FFmpeg', 'Vosk', 'Python', 'VLibras', 'Unity/WebGL'],
    githubUrl: 'https://github.com/self1027/Integra',
    demoUrl: 'https://integra.murilod.dev/',
    previewImage: integraImage.src,
    problem: {
      'pt-BR': [
        "Murilo Dias e Victor Hugo desenvolveram o Integra MQF como TCC sobre acessibilidade digital e comunicação. A demonstração atual reúne fala em português, transcrição e sinais de Libras. Autenticação, permissões e gestão permanecem na branch sistema-completo.",
        "A versão anterior usava os serviços públicos do VLibras para traduzir o texto e buscar os sinais. A versão atual executa essas etapas localmente e mantém a reprodução incremental, tratando revisões da transcrição e diferenças entre a duração da fala e dos sinais.",
      ],
      'en-US': [
        "Murilo Dias and Victor Hugo developed Integra MQF as a graduation project on digital accessibility and communication. The current demonstration combines Portuguese speech, transcription and Libras signs. Authentication, permissions and management remain in the sistema-completo branch.",
        "The previous version used public VLibras services to translate text and fetch signs. The current version runs those stages locally and retains incremental playback, handling transcript revisions and differences in speech and sign duration.",
      ],
    },
    technicalChallenges: {
      'pt-BR': [
        "Baixar modelos e sinais no preparo inicial e executar a aplicação sem novas consultas externas, inclusive para fontes e sinais.",
        "Traduzir trechos estáveis enquanto a pessoa fala e descartar blocos pendentes quando o Vosk revisa o texto.",
        "Reproduzir os blocos em ordem e parar a captura quando a fila chega a 12 blocos, preservando os trechos aceitos.",
        "Distinguir sinais ausentes no catálogo de arquivos locais corrompidos e controlar a partida e a parada de Node e Python.",
      ],
      'en-US': [
        "Download models and signs during initial setup, then run without further external requests, including fonts and signs.",
        "Translate stable segments while the person speaks and discard pending blocks when Vosk revises the text.",
        "Play blocks in order and stop capture when the queue reaches 12 blocks, retaining accepted segments.",
        "Distinguish signs missing from the catalog from corrupted local files and control Node and Python startup and shutdown.",
      ],
    },
    decision: {
      title: {
        'pt-BR': "Tradução e sinais na máquina local",
        'en-US': "Translation and signs on the local machine",
      },
      content: {
        'pt-BR': [
          "O navegador captura e filtra o áudio com a Web Audio API e envia PCM por WebSocket. No Node, FFmpeg e Vosk alimentam uma sessão que acompanha palavras estáveis, revisões e a ordem de reprodução dos blocos.",
          "Um serviço Python mantém o tradutor neural oficial do VLibras carregado e atende por HTTP apenas em loopback. O avatar usa o renderizador Unity/WebGL do VLibras; o Express serve os sinais em /dictionary/, na mesma origem da página.",
          "O launcher confere o acervo e espera o tradutor ficar pronto antes de iniciar a aplicação. A política de conteúdo restringe as conexões do navegador à mesma origem. Antes de carregar o modelo, o processo Python bloqueia saídas de rede. Uma falha gera erro na interface, sem recorrer à API pública.",
        ],
        'en-US': [
          "The browser captures and filters audio with the Web Audio API and sends PCM over WebSocket. In Node, FFmpeg and Vosk feed a session that tracks stable words, revisions and block playback order.",
          "A Python service keeps the official VLibras neural translator loaded and serves HTTP requests on loopback only. The avatar uses the VLibras Unity/WebGL renderer; Express serves signs from /dictionary/ on the page’s own origin.",
          "The launcher checks the collection and waits for the translator to be ready before starting the app. The content policy restricts browser connections to the same origin. The Python process blocks outbound networking before loading the model. Failures appear in the interface without falling back to the public API.",
        ],
      },
    },
    diagrams: [
      {
        src: '/media/mermaid/integra/fig-1.png',
        caption: {
          'pt-BR': "O preparo usa internet. Na partida, a aplicação confere os arquivos e inicia os serviços locais.",
          'en-US': "Setup uses internet access. At startup, the application checks files and starts the local services.",
        },
        alt: {
          'pt-BR': 'Fluxo de preparo do acervo, verificação SHA-256, health do tradutor e execução local',
          'en-US': 'Collection preparation, SHA-256 verification, translator health and local execution flow',
        },
      },
      {
        src: '/media/mermaid/integra/fig-3.png',
        caption: {
          'pt-BR': "A fila acompanha as revisões da transcrição e envia os blocos ao tradutor local e ao avatar.",
          'en-US': "The queue tracks transcript revisions and sends blocks to the local translator and avatar.",
        },
        alt: {
          'pt-BR': 'Pipeline local com Web Audio, FFmpeg, Vosk, fila de blocos, Python e Unity/WebGL',
          'en-US': 'Local pipeline with Web Audio, FFmpeg, Vosk, a block queue, Python and Unity/WebGL',
        },
      },
    ],
    pipelineOrSections: {
      title: {
        'pt-BR': "Da fala aos sinais",
        'en-US': "From speech to signs",
      },
      items: [
        {
          subtitle: {
            'pt-BR': "1. Captura e envio do áudio",
            'en-US': "1. Capture and audio streaming",
          },
          text: {
            'pt-BR': 'A Web Audio API aplica passa-alta em 300 Hz, notch em 60 Hz e compressão dinâmica. Após a confirmação audio_ready do servidor, o cliente envia áudio PCM de 16 bits pelo WebSocket.',
            'en-US': 'The Web Audio API applies a 300 Hz high-pass filter, a 60 Hz notch filter and dynamic compression. After the server confirms audio_ready, the client sends 16-bit PCM audio over WebSocket.',
          },
        },
        {
          subtitle: {
            'pt-BR': "2. Reconhecimento local",
            'en-US': "2. Local speech recognition",
          },
          text: {
            'pt-BR': 'O FFmpeg converte o áudio para PCM mono a 16 kHz. O Vosk produz resultados parciais e finais com tempos das palavras; ao parar a captura, o servidor conclui o áudio pendente antes do resultado final.',
            'en-US': 'FFmpeg converts audio to mono PCM at 16 kHz. Vosk produces partial and final results with word timings; when capture stops, the server drains pending audio before finalizing recognition.',
          },
        },
        {
          subtitle: {
            'pt-BR': "3. Revisões e fila de blocos",
            'en-US': "3. Revisions and block queue",
          },
          text: {
            'pt-BR': 'A sessão prepara blocos de até seis palavras após observar estabilidade, mantendo uma margem de contexto. Revisões invalidam traduções pendentes; conflitos com sinais já exibidos podem exigir repetir ou pular o enunciado. A fila comporta até 12 blocos.',
            'en-US': 'The session prepares blocks of up to six words after observing stability, retaining a context margin. Revisions invalidate pending translations; conflicts with signs already shown may require repeating or skipping the utterance. The queue holds up to 12 blocks.',
          },
        },
        {
          subtitle: {
            'pt-BR': "4. Tradução no serviço Python",
            'en-US': "4. Translation in the Python service",
          },
          text: {
            'pt-BR': 'O Node envia os textos ao serviço Python em 127.0.0.1:5001. O motor oficial do VLibras combina pré-processamento por regras e tradução neural; o serviço processa um pedido por vez. O cliente HTTP mantém cache, timeout, cancelamento e nova tentativa para falhas transitórias.',
            'en-US': 'Node sends text to the Python service at 127.0.0.1:5001. The official VLibras engine combines rule-based preprocessing and neural translation; the service handles one request at a time. The HTTP client provides caching, timeouts, cancellation and a retry for transient failures.',
          },
        },
        {
          subtitle: {
            'pt-BR': "5. Reprodução dos sinais",
            'en-US': "5. Sign playback",
          },
          text: {
            'pt-BR': 'O servidor autoriza a reprodução em ordem e o avatar Unity/WebGL carrega os sinais pela mesma origem. Sinais indisponíveis usam a soletração nativa do player. Parar captura preserva a fila; cancelar sinalização encerra a sessão. A velocidade é ajustada manualmente entre 0,5× e 4×.',
            'en-US': 'The server authorizes playback in order and the Unity/WebGL avatar loads signs from the same origin. Unavailable signs use the player’s native fingerspelling. Stopping capture preserves the queue; cancelling signing ends the session. Speed is adjusted manually between 0.5× and 4×.',
          },
        },
      ],
    },
    codeSnippets: [
      {
        title: "Tradução local com timeout e cancelamento",
        titleEn: "Local translation with timeout and cancellation",
        language: 'javascript',
        code: `const response = await fetch(this.url, {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  redirect: 'error',
  body: JSON.stringify({ text }),
  signal: AbortSignal.any([AbortSignal.timeout(this.timeout), ...(signal ? [signal] : [])]),
});`,
        description: {
          'pt-BR': 'Recorte de audioPipeline/Translator.js. O construtor aceita somente HTTP em loopback, e a requisição recusa redirecionamentos. Cache, validação da resposta e nova tentativa ficam fora deste recorte.',
          'en-US': 'Excerpt from audioPipeline/Translator.js. The constructor accepts HTTP loopback URLs only, and the request rejects redirects. Caching, response validation and retry handling are outside this excerpt.',
        },
      },
      {
        title: "Interromper a captura quando a fila enche",
        titleEn: "Stopping capture when the queue fills",
        language: 'javascript',
        code: `if (this.blocks.length >= 12 && !this.capturePaused) {
  this.capturePaused = true;
  this.send({ type: 'flow_control', action: 'stop_capture', message: 'Fila cheia. Captura interrompida para concluir os trechos aceitos.' });
}`,
        description: {
          'pt-BR': 'Recorte de audioPipeline/StreamingSession.js. Ao atingir 12 blocos, a sessão pede ao navegador que pare a captura e preserve o trabalho aceito. A conclusão do PCM e a drenagem da fila são tratadas nas demais etapas.',
          'en-US': 'Excerpt from audioPipeline/StreamingSession.js. At 12 blocks, the session asks the browser to stop capture while retaining accepted work. PCM finalization and queue draining are handled by the surrounding stages.',
        },
      },
    ],
    tradeOffs: {
      'pt-BR': [
        'O preparo inicial exige internet e aproximadamente 1,7 GB para ambiente Python, modelo neural e sinais, além do modelo Vosk. Os recursos não são versionados; cada máquina precisa prepará-los.',
        "A execução local dispensa consultas externas, mas ainda exige tempo para reconhecer a fala, estabilizar o texto e reproduzir os sinais. Não houve comparação controlada com a versão online para medir um ganho fixo de latência.",
        "Trechos curtos podem perder contexto linguístico. Sinais já exibidos não podem ser desfeitos. Se o avatar ficar para trás, a fila limitada interrompe a captura; a reprodução pode não acompanhar a velocidade da fala.",
        'O catálogo consultado contém sinais indisponíveis na origem. Arquivos locais registrados são verificados por SHA-256 ao iniciar; falta ou corrupção impede a partida e exige reparo explícito, sem download automático durante o uso.',
      ],
      'en-US': [
        'Initial preparation needs internet access and roughly 1.7 GB for the Python environment, neural model and signs, in addition to the Vosk model. These resources are not versioned; each machine must prepare them.',
        "Local execution removes external requests, but speech recognition, text stabilization and sign playback still take time. There was no controlled comparison with the online version to establish a fixed latency gain.",
        "Short segments can lose linguistic context. Signs already shown cannot be undone. If the avatar falls behind, the bounded queue stops capture; playback may not keep up with speech.",
        'The consulted catalog contains signs unavailable at the source. Registered local files are checked by SHA-256 at startup; missing or corrupted files block startup and require explicit repair, without automatic downloads during use.',
      ],
    },
    result: {
      'pt-BR': [
        'Depois de npm run setup:offline, npm start inicia o tradutor local e a aplicação. O relatório de validação de 02/11/2026 registra o fluxo completo no Chromium com áudio sintetizado e requisições externas bloqueadas: zero requisições externas observadas e 13 blocos cujo texto concatenado correspondeu ao resultado final do Vosk nesse cenário.',
        'Na preparação documentada, 23.270 bundles foram verificados localmente, de 24.213 itens do catálogo; 943 estavam indisponíveis na origem. O relatório também registra 33 testes Node e seis testes Python aprovados. São evidências técnicas locais no Windows; qualidade linguística e compreensão dos sinais ainda exigem avaliação com pessoas fluentes em Libras.',
      ],
      'en-US': [
        'After npm run setup:offline, npm start launches the local translator and application. The November 2, 2026 validation report records the full Chromium flow with synthesized audio and external requests blocked: zero external requests observed and 13 blocks whose concatenated text matched the final Vosk result in that scenario.',
        'The documented preparation verified 23,270 local bundles from 24,213 catalog entries; 943 were unavailable at the source. The report also records 33 passing Node tests and six passing Python tests. This is local technical evidence on Windows; linguistic quality and sign comprehension still require evaluation by people fluent in Libras.',
      ],
    },
    demonstrates: {
      'pt-BR': [
        'Orquestração local de processos Node e Python',
        'Streaming de áudio e reconhecimento incremental com Vosk',
        'Controle de revisões, cancelamento e ordem de reprodução',
        'Preparação retomável e integridade de acervos por SHA-256',
        'Integração do motor oficial VLibras com Unity/WebGL',
      ],
      'en-US': [
        'Local Node and Python process orchestration',
        'Audio streaming and incremental recognition with Vosk',
        'Revision handling, cancellation and playback ordering',
        'Resumable preparation and SHA-256 collection integrity',
        'Official VLibras engine integration with Unity/WebGL',
      ],
    },
  },

  'livro': {
    id: 'livro',
    slug: 'livro',
    title: 'Livro — Gestão de Vigilância Sanitária',
    subtitle: {
      'pt-BR': "Registro de denúncias e acompanhamento da fiscalização sanitária",
      'en-US': "Complaint records and public health inspection tracking",
    },
    technologies: ['Node.js', 'Sequelize ORM', 'MySQL', 'EJS', 'Chart.js', 'PM2', 'Nginx'],
    githubUrl: 'https://github.com/self1027/Livro',
    demoUrl: 'https://livro.murilod.dev/',
    previewImage: livroImage.src,
    problem: {
      'pt-BR': [
        "A Vigilância Sanitária de Andradina usava livros e registros em papel para acompanhar denúncias e processos administrativos.",
        "Encontrar um atendimento antigo levava aproximadamente 5 minutos por consulta. Os registros em papel também estavam sujeitos a extravio e protocolos duplicados.",
        "O sistema foi criado para digitalizar esses registros, acompanhar as alterações e reduzir o tempo gasto nas buscas.",
      ],
      'en-US': [
        "Andradina’s public health department used paper books and records to track complaints and administrative proceedings.",
        "Finding an older case took about 5 minutes per lookup. Paper records were also vulnerable to loss and duplicate protocol numbers.",
        "The system was built to digitize those records, track changes and reduce lookup time.",
      ],
    },
    technicalChallenges: {
      'pt-BR': [
        "Substituir os livros em papel e preservar o histórico dos protocolos.",
        "Impedir registros com o mesmo ano e número de protocolo no banco.",
        "Reduzir o tempo de consulta aos registros de fiscalização.",
        "Implantar o sistema no servidor Linux da prefeitura, com controle de acesso e trilha de auditoria.",
      ],
      'en-US': [
        "Replace paper books while preserving protocol history.",
        "Prevent records with the same year and protocol number in the database.",
        "Reduce the time needed to find inspection records.",
        "Deploy on the municipality’s Linux server with access controls and an audit trail.",
      ],
    },
    decision: {
      title: {
        'pt-BR': "Unicidade dos protocolos no banco de dados",
        'en-US': "Protocol uniqueness in the database",
      },
      content: {
        'pt-BR': [
          "O MySQL armazena as relações entre as entidades, e o Sequelize organiza o acesso a esses dados na aplicação.",
          "Uma restrição composta impede dois protocolos com o mesmo ano e número. Permissões de edição, auditoria e requisitos legais precisam de controles próprios.",
        ],
        'en-US': [
          "MySQL stores entity relationships, and Sequelize handles access to that data in the application.",
          "A composite constraint prevents two protocols from sharing a year and number. Editing permissions, audit records and legal requirements need their own controls.",
        ],
      },
    },
    diagrams: [
      {
        src: '/media/mermaid/livro/fig-1.png',
        caption: {
          'pt-BR': "O banco rejeita protocolos que repetem a combinação de ano e número.",
          'en-US': "The database rejects protocols with a duplicate year-and-number pair.",
        },
        alt: {
          'pt-BR': 'Diagrama de fluxo de cadastro e validação de restrição única do protocolo',
          'en-US': 'Protocol uniqueness constraint registration flow diagram',
        },
      },
      {
        src: '/media/mermaid/livro/fig-2.png',
        caption: {
          'pt-BR': "Cada interação gera um registro de auditoria vinculado ao responsável.",
          'en-US': "Each interaction creates an audit record linked to the responsible user.",
        },
        alt: {
          'pt-BR': 'Diagrama de trilha de auditoria e rastreabilidade por agente',
          'en-US': 'Audit trail and agent traceability flow diagram',
        },
      },
    ],
    pipelineOrSections: {
      title: {
        'pt-BR': "Dos registros à operação",
        'en-US': "From records to daily use",
      },
      items: [
        {
          subtitle: {
            'pt-BR': "1. Requisitos e dados",
            'en-US': "1. Requirements and data",
          },
          text: {
            'pt-BR': "O esquema MySQL, modelado com Sequelize, relaciona denúncias, estabelecimentos, autuações e notificações fiscais.",
            'en-US': "The MySQL schema, modeled with Sequelize, relates complaints, establishments, citations and inspection notices.",
          },
        },
        {
          subtitle: {
            'pt-BR': "2. Ano e número únicos",
            'en-US': "2. Unique year and number",
          },
          text: {
            'pt-BR': "O índice composto impede números duplicados no mesmo ano, inclusive quando vários fiscais enviam registros ao mesmo tempo.",
            'en-US': "The composite index prevents duplicate numbers within a year, including when several inspectors submit records at the same time.",
          },
        },
        {
          subtitle: {
            'pt-BR': "3. Histórico de alterações",
            'en-US': "3. Change history",
          },
          text: {
            'pt-BR': "Hooks registram o autor, o horário e os dados anteriores quando há alteração de status ou despacho.",
            'en-US': "Hooks record the author, timestamp and previous data when a status or dispatch changes.",
          },
        },
        {
          subtitle: {
            'pt-BR': "4. Indicadores com Chart.js",
            'en-US': "4. Chart.js reports",
          },
          text: {
            'pt-BR': "Os painéis reúnem os dados atuais de denúncias por bairro, tipo de infração e índice de resolução.",
            'en-US': "Dashboards show current complaint data by district, infraction type and resolution rate.",
          },
        },
        {
          subtitle: {
            'pt-BR': "5. Implantação na prefeitura",
            'en-US': "5. Municipal deployment",
          },
          text: {
            'pt-BR': "A aplicação roda na infraestrutura interna da prefeitura. O Nginx atua como proxy reverso, e o PM2 supervisiona os processos e os reinicia quando necessário.",
            'en-US': "The application runs on the municipality’s internal infrastructure. Nginx acts as a reverse proxy, and PM2 supervises processes and restarts them when needed.",
          },
        },
      ],
    },
    codeSnippets: [
      {
        title: "Restrição composta de ano e número",
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
          'pt-BR': "A restrição rejeita pares de ano e número duplicados. Os outros campos continuam editáveis; essa regra não torna o registro imutável.",
          'en-US': "The constraint rejects duplicate year-and-number pairs. Other fields remain editable; this rule does not make the record immutable.",
        },
      },
      {
        title: "Implantação com PM2 e Nginx",
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
          'pt-BR': "Na rede interna da prefeitura, o Nginx encaminha as requisições e o PM2 supervisiona os processos.",
          'en-US': "On the municipality’s internal network, Nginx forwards requests and PM2 supervises processes.",
        },
      },
    ],
    tradeOffs: {
      'pt-BR': [
        "A aplicação usa um monólito Node.js, páginas EJS e Chart.js para simplificar a manutenção e a implantação na rede interna.",
        "O MySQL atende às relações entre os dados e às restrições de integridade. Conforme os requisitos mudam, o esquema precisa de manutenção e migrações.",
      ],
      'en-US': [
        "The application uses a Node.js monolith, EJS pages and Chart.js to simplify maintenance and deployment on the internal network.",
        "MySQL supports the data relationships and integrity constraints. As requirements change, the schema needs maintenance and migrations.",
      ],
    },
    result: {
      'pt-BR': [
        "A estimativa operacional relatada passou de cerca de 5 minutos de busca nos arquivos em papel para 10 segundos no sistema. A comparação é entre os dois fluxos de trabalho; não mede uma consulta SQL isolada.",
        "Com menos tempo gasto nas buscas, a equipe municipal passou a dedicar mais tempo ao trabalho de campo.",
      ],
      'en-US': [
        "The reported operational estimate went from about 5 minutes searching paper files to 10 seconds in the system. This compares the two workflows, not an isolated SQL query.",
        "With less time spent on lookups, the municipal team could spend more time on fieldwork.",
      ],
    },
    demonstrates: {
      'pt-BR': [
        "Levantamento de requisitos com os usuários",
        'Digitalização de processos no setor público',
        'Modelagem relacional de banco de dados (MySQL / Sequelize)',
        'Administração de servidores Linux',
        'Infraestrutura interna e proxy reverso Nginx',
        'Desenvolvimento de dashboards com Chart.js',
        "Auditoria e integridade dos registros",
      ],
      'en-US': [
        "Requirements gathering with users",
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
};
