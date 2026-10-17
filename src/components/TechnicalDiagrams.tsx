import React, { useId } from 'react';
import { useI18n } from '../i18n/I18nContext';
import type { Language } from '../types';
const flows: Record<string, Record<Language, string[][]>> = {
  "/media/mermaid/ascii/fig-2.png": {
    "pt-BR": [
      [
        "Captura",
        "Vídeo → pixels RGBA"
      ],
      [
        "Transferência",
        "ArrayBuffer transferível"
      ],
      [
        "Processamento",
        "Worker: luminância + LUT"
      ],
      [
        "Renderização",
        "Canvas 2D na interface"
      ]
    ],
    "en-US": [
      [
        "Capture",
        "Video → RGBA pixels"
      ],
      [
        "Transfer",
        "Transferable ArrayBuffer"
      ],
      [
        "Processing",
        "Worker: luminance + LUT"
      ],
      [
        "Rendering",
        "Canvas 2D in the UI"
      ]
    ]
  },
  "/media/mermaid/ttt/fig-1.png": {
    "pt-BR": [
      [
        "Cliente",
        "Solicita uma jogada"
      ],
      [
        "Servidor",
        "Valida turno e posição"
      ],
      [
        "Histórico",
        "Se 3 peças: remove a antiga"
      ],
      [
        "Sala",
        "Publica o novo estado"
      ]
    ],
    "en-US": [
      [
        "Client",
        "Requests a move"
      ],
      [
        "Server",
        "Validates turn & position"
      ],
      [
        "History",
        "At 3 pieces: evict oldest"
      ],
      [
        "Room",
        "Broadcasts the new state"
      ]
    ]
  },
  "/media/mermaid/ttt/fig-2.png": {
    "pt-BR": [
      [
        "Socket",
        "Evento make_move"
      ],
      [
        "Validação",
        "Regras no servidor"
      ],
      [
        "Estado canônico",
        "Atualiza tabuleiro e turno"
      ],
      [
        "Broadcast",
        "Todos os clientes da sala"
      ]
    ],
    "en-US": [
      [
        "Socket",
        "make_move event"
      ],
      [
        "Validation",
        "Rules run on the server"
      ],
      [
        "Canonical state",
        "Updates board and turn"
      ],
      [
        "Broadcast",
        "All clients in the room"
      ]
    ]
  },
  "/media/mermaid/integra/fig-1.png": {
    "pt-BR": [
      [
        "Áudio recebido",
        "Chunks via WebSocket"
      ],
      [
        "Pipeline pronto?",
        "Verifica inicialização"
      ],
      [
        "Antes de iniciar",
        "Acumula no buffer"
      ],
      [
        "Após iniciar",
        "Encaminha ao FFmpeg"
      ]
    ],
    "en-US": [
      [
        "Incoming audio",
        "Chunks over WebSocket"
      ],
      [
        "Pipeline ready?",
        "Checks initialization"
      ],
      [
        "Before startup",
        "Accumulates in a buffer"
      ],
      [
        "After startup",
        "Forwards to FFmpeg"
      ]
    ]
  },
  "/media/mermaid/integra/fig-3.png": {
    "pt-BR": [
      [
        "Captura e filtros",
        "Web Audio API no cliente"
      ],
      [
        "Ingestão",
        "Node.js + FFmpeg"
      ],
      [
        "Transcrição",
        "Vosk / Google Cloud STT"
      ],
      [
        "Avatar",
        "VLibras + Three.js"
      ]
    ],
    "en-US": [
      [
        "Capture & filters",
        "Web Audio API on client"
      ],
      [
        "Ingestion",
        "Node.js + FFmpeg"
      ],
      [
        "Transcription",
        "Vosk / Google Cloud STT"
      ],
      [
        "Avatar",
        "VLibras + Three.js"
      ]
    ]
  },
  "/media/mermaid/livro/fig-1.png": {
    "pt-BR": [
      [
        "Requisição",
        "Ano + número de protocolo"
      ],
      [
        "Modelo",
        "Sequelize: valida estrutura"
      ],
      [
        "Restrição única",
        "MySQL: UNIQUE(year, number)"
      ],
      [
        "Persistência",
        "Rejeita par duplicado"
      ]
    ],
    "en-US": [
      [
        "Request",
        "Year + protocol number"
      ],
      [
        "Model",
        "Sequelize: models the data"
      ],
      [
        "Unique constraint",
        "MySQL: UNIQUE(year, number)"
      ],
      [
        "Persistence",
        "Rejects a duplicate pair"
      ]
    ]
  },
  "/media/mermaid/livro/fig-2.png": {
    "pt-BR": [
      [
        "Ação operacional",
        "Alteração de registro"
      ],
      [
        "Hooks",
        "Evento do ciclo de vida"
      ],
      [
        "Registro de auditoria",
        "Autor, horário e alteração"
      ],
      [
        "Rastreabilidade",
        "Histórico por responsável"
      ]
    ],
    "en-US": [
      [
        "Operational action",
        "Record updated"
      ],
      [
        "Hooks",
        "Lifecycle event"
      ],
      [
        "Audit entry",
        "Author, time and change"
      ],
      [
        "Traceability",
        "History linked to a user"
      ]
    ]
  },
  "/media/mermaid/nobsdownloader/fig-1.png": {
    "pt-BR": [
      [
        "Solicitação",
        "URL e preset"
      ],
      [
        "Processo-filho",
        "spawn: yt-dlp"
      ],
      [
        "Monitoramento",
        "stdout / stderr e tamanho"
      ],
      [
        "Entrega ou interrupção",
        "Verifica limite de saída"
      ]
    ],
    "en-US": [
      [
        "Request",
        "URL and preset"
      ],
      [
        "Child process",
        "spawn: yt-dlp"
      ],
      [
        "Monitoring",
        "stdout / stderr and size"
      ],
      [
        "Deliver or interrupt",
        "Checks the output limit"
      ]
    ]
  },
  "/media/mermaid/nobsdownloader/fig-2.png": {
    "pt-BR": [
      [
        "Entrada",
        "Áudio em diretório temporário"
      ],
      [
        "Transcodificação",
        "FFmpeg em processo-filho"
      ],
      [
        "Arquivo de saída",
        "Formato e metadados"
      ],
      [
        "Limpeza",
        "Remove arquivos temporários"
      ]
    ],
    "en-US": [
      [
        "Input",
        "Audio in a temp directory"
      ],
      [
        "Transcoding",
        "FFmpeg child process"
      ],
      [
        "Output file",
        "Format and metadata"
      ],
      [
        "Cleanup",
        "Removes temporary files"
      ]
    ]
  }
};
export const TechnicalDiagram: React.FC<{ id: string }> = ({ id }) => {
  const { language } = useI18n();
  const uid = useId().replace(/:/g, '');
  const nodes = flows[id]?.[language];
  if (!nodes) return <img src={id} alt={language === 'pt-BR' ? 'Diagrama de arquitetura' : 'Architecture diagram'} width={960} height={240} loading="lazy" />;
  const description = nodes.map(node => node.join(': ')).join(' → ');
  return (
    <svg viewBox="0 0 1040 180" role="img" aria-labelledby={uid + '-title'} xmlns="http://www.w3.org/2000/svg">
      <title id={uid + '-title'}>{description}</title>
      <defs><marker id={uid + '-arrow'} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" fill="var(--secondary-accent)" /></marker></defs>
      {nodes.map(([label, detail], index) => {
        const x = index * 260 + 8;
        return <g key={label}>
          <rect x={x} y={24} width={238} height={124} fill="var(--surface-muted)" />
          <text x={x + 16} y={66} fill="var(--text)" fontSize={17} fontWeight={600}>{label}</text>
          <text x={x + 16} y={100} fill="var(--text-muted)" fontSize={13}>{detail}</text>
          {index < nodes.length - 1 && <path d={'M' + (x + 240) + ' 86h17'} stroke="var(--secondary-accent)" strokeWidth={2} markerEnd={'url(#' + uid + '-arrow)'} />}
        </g>;
      })}
    </svg>
  );
};
