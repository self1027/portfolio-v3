import React from 'react';

interface DiagramProps {
  id: string;
}

export const TechnicalDiagram: React.FC<DiagramProps> = ({ id }) => {
  switch (id) {
    case '/media/mermaid/ascii/fig-2.png':
      return (
        <svg viewBox="0 0 800 280" className="w-full h-auto text-text font-mono" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Thread lane */}
          <rect x="20" y="20" width="760" height="110" rx="6" fill="var(--surface)" stroke="var(--border-strong)" strokeDasharray="4 4" />
          <text x="35" y="42" fill="var(--accent)" fontSize="11" fontWeight="bold">MAIN THREAD (UI & CAPTURE)</text>
          
          <rect x="40" y="55" width="160" height="55" rx="4" fill="var(--surface-muted)" stroke="var(--border)" />
          <text x="50" y="77" fill="var(--text)" fontSize="11" fontWeight="600">&lt;video&gt; Capture</text>
          <text x="50" y="94" fill="var(--text-muted)" fontSize="9">Canvas 2D Buffer (RGBA)</text>

          <path d="M200 82 H 270" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrow)" />

          <rect x="270" y="55" width="180" height="55" rx="4" fill="var(--surface-muted)" stroke="var(--accent)" />
          <text x="280" y="77" fill="var(--text)" fontSize="11" fontWeight="600">Zero-Copy Dispatch</text>
          <text x="280" y="94" fill="var(--accent)" fontSize="9">postMessage(Transferable)</text>

          <path d="M450 82 H 520" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="2 2" />

          <rect x="520" y="55" width="230" height="55" rx="4" fill="var(--surface-muted)" stroke="var(--secondary-accent)" />
          <text x="530" y="77" fill="var(--text)" fontSize="11" fontWeight="600">Optimized fillText Grid</text>
          <text x="530" y="94" fill="var(--secondary-accent)" fontSize="9">Canvas 2D @ 30+ FPS Stable</text>

          {/* Web Worker lane */}
          <rect x="20" y="150" width="760" height="110" rx="6" fill="var(--surface)" stroke="var(--border-strong)" />
          <text x="35" y="172" fill="var(--secondary-accent)" fontSize="11" fontWeight="bold">WEB WORKER (PARALLEL COMPUTATION THREAD)</text>

          {/* Arrow down to worker */}
          <path d="M360 110 V 180" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#arrow)" />

          <rect x="270" y="180" width="220" height="60" rx="4" fill="var(--surface-muted)" stroke="var(--border)" />
          <text x="280" y="202" fill="var(--text)" fontSize="11" fontWeight="600">Luminance &amp; Dynamic LUT</text>
          <text x="280" y="218" fill="var(--text-muted)" fontSize="9">Rec. 709 + O(1) Contrast Lookup</text>
          <text x="280" y="232" fill="var(--accent)" fontSize="9">ASCII Character Index Mapping</text>

          {/* Arrow up to render */}
          <path d="M490 210 H 635 V 110" stroke="var(--secondary-accent)" strokeWidth="2" markerEnd="url(#arrow)" />

          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent)" />
            </marker>
          </defs>
        </svg>
      );

    case '/media/mermaid/ttt/fig-1.png':
      return (
        <svg viewBox="0 0 800 240" className="w-full h-auto text-text font-mono" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="30" width="200" height="70" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="45" y="58" fill="var(--text)" fontSize="12" fontWeight="600">Player Move Intent</text>
          <text x="45" y="78" fill="var(--text-muted)" fontSize="10">{`move: { position, symbol }`}</text>

          <path d="M230 65 H 310" stroke="var(--accent)" strokeWidth="2" />

          <polygon points="390,30 470,65 390,100 310,65" fill="var(--surface-muted)" stroke="var(--accent)" />
          <text x="352" y="62" fill="var(--text)" fontSize="11" fontWeight="bold">History &gt;= 3?</text>
          <text x="355" y="76" fill="var(--accent)" fontSize="9">Piece limit</text>

          {/* Yes path */}
          <path d="M470 65 H 560" stroke="var(--accent)" strokeWidth="2" />
          <text x="495" y="55" fill="var(--accent)" fontSize="10" fontWeight="bold">YES</text>

          <rect x="560" y="30" width="210" height="70" rx="6" fill="var(--surface)" stroke="#ef4444" />
          <text x="575" y="58" fill="#ef4444" fontSize="12" fontWeight="600">FIFO Eviction: oldest[0]</text>
          <text x="575" y="78" fill="var(--text-muted)" fontSize="10">board[oldest.position] = null</text>

          {/* No path */}
          <path d="M390 100 V 170 H 560" stroke="var(--border-strong)" strokeWidth="2" />
          <text x="400" y="130" fill="var(--text-subtle)" fontSize="10">NO (&lt; 3 pieces)</text>

          {/* Connect eviction down to commit */}
          <path d="M665 100 V 170" stroke="var(--accent)" strokeWidth="2" />

          <rect x="560" y="150" width="210" height="60" rx="6" fill="var(--surface)" stroke="var(--secondary-accent)" />
          <text x="575" y="175" fill="var(--text)" fontSize="12" fontWeight="600">Commit State Mutation</text>
          <text x="575" y="193" fill="var(--secondary-accent)" fontSize="10">board[move.position] = symbol</text>
        </svg>
      );

    case '/media/mermaid/ttt/fig-2.png':
      return (
        <svg viewBox="0 0 800 230" className="w-full h-auto text-text font-mono" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="35" width="180" height="75" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="45" y="65" fill="var(--text)" fontSize="12" fontWeight="bold">Client A (Player)</text>
          <text x="45" y="85" fill="var(--accent)" fontSize="10">socket.emit('make_move')</text>

          <path d="M210 72 H 290" stroke="var(--accent)" strokeWidth="2" />

          <rect x="290" y="25" width="220" height="180" rx="6" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="305" y="50" fill="var(--accent)" fontSize="12" fontWeight="bold">AUTHORITATIVE BACKEND</text>
          <text x="305" y="75" fill="var(--text)" fontSize="10">• Verify room ID exists</text>
          <text x="305" y="95" fill="var(--text)" fontSize="10">• Validate socket.id === turn</text>
          <text x="305" y="115" fill="var(--text)" fontSize="10">• Enforce circular move rules</text>
          <text x="305" y="135" fill="var(--text)" fontSize="10">• Check victory / tie conditions</text>
          <text x="305" y="155" fill="var(--text)" fontSize="10">• Advance next player turn</text>
          <text x="305" y="180" fill="var(--secondary-accent)" fontSize="10" fontWeight="bold">io.to(roomId).emit('update')</text>

          <path d="M510 72 H 580" stroke="var(--secondary-accent)" strokeWidth="2" />
          <path d="M510 160 H 580" stroke="var(--secondary-accent)" strokeWidth="2" />

          <rect x="580" y="35" width="180" height="65" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="595" y="65" fill="var(--text)" fontSize="11" fontWeight="bold">Client A State Sync</text>
          <text x="595" y="82" fill="var(--text-muted)" fontSize="9">Instant view reconciliation</text>

          <rect x="580" y="130" width="180" height="65" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="595" y="160" fill="var(--text)" fontSize="11" fontWeight="bold">Client B State Sync</text>
          <text x="595" y="177" fill="var(--text-muted)" fontSize="9">Identical board representation</text>
        </svg>
      );

    case '/media/mermaid/integra/fig-1.png':
      return (
        <svg viewBox="0 0 800 220" className="w-full h-auto text-text font-mono" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="30" width="180" height="65" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="45" y="55" fill="var(--text)" fontSize="12" fontWeight="600">Audio Ingestion</text>
          <text x="45" y="75" fill="var(--accent)" fontSize="10">WebSocket Binary Stream</text>

          <path d="M210 62 H 290" stroke="var(--accent)" strokeWidth="2" />

          <polygon points="380,25 470,62 380,100 290,62" fill="var(--surface-muted)" stroke="var(--accent)" />
          <text x="330" y="58" fill="var(--text)" fontSize="11" fontWeight="bold">Pipeline Ready?</text>
          <text x="340" y="73" fill="var(--accent)" fontSize="9">Metadata confirmed</text>

          <path d="M470 62 H 560" stroke="var(--secondary-accent)" strokeWidth="2" />
          <text x="495" y="52" fill="var(--secondary-accent)" fontSize="10" fontWeight="bold">YES</text>

          <rect x="560" y="30" width="200" height="65" rx="6" fill="var(--surface)" stroke="var(--secondary-accent)" />
          <text x="575" y="55" fill="var(--text)" fontSize="12" fontWeight="600">ffmpeg.pushAudio(data)</text>
          <text x="575" y="75" fill="var(--secondary-accent)" fontSize="10">Direct PCM transcode</text>

          <path d="M380 100 V 150 H 560" stroke="var(--border-strong)" strokeWidth="2" />
          <text x="390" y="130" fill="var(--text-subtle)" fontSize="10">NO (Bootstrapping)</text>

          <rect x="560" y="125" width="200" height="70" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="575" y="152" fill="var(--text)" fontSize="11" fontWeight="bold">audioBuffer.push(data)</text>
          <text x="575" y="172" fill="var(--accent)" fontSize="10">initPipeline(SAMPLE_RATE)</text>
        </svg>
      );

    case '/media/mermaid/integra/fig-3.png':
      return (
        <svg viewBox="0 0 800 230" className="w-full h-auto text-text font-mono" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Step 1 to 4 */}
          <rect x="20" y="30" width="165" height="75" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="30" y="55" fill="var(--accent)" fontSize="11" fontWeight="bold">1. CLIENT DSP</text>
          <text x="30" y="72" fill="var(--text)" fontSize="10">Highpass 300Hz</text>
          <text x="30" y="88" fill="var(--text-muted)" fontSize="9">Notch 60Hz + Comp</text>

          <path d="M185 67 H 215" stroke="var(--accent)" strokeWidth="2" />

          <rect x="215" y="30" width="165" height="75" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="225" y="55" fill="var(--secondary-accent)" fontSize="11" fontWeight="bold">2. STREAM INGESTION</text>
          <text x="225" y="72" fill="var(--text)" fontSize="10">Node.js WebSockets</text>
          <text x="225" y="88" fill="var(--text-muted)" fontSize="9">FFmpeg PCM conversion</text>

          <path d="M380 67 H 410" stroke="var(--secondary-accent)" strokeWidth="2" />

          <rect x="410" y="30" width="170" height="75" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="420" y="55" fill="var(--accent)" fontSize="11" fontWeight="bold">3. SPEECH RECOGNITION</text>
          <text x="420" y="72" fill="var(--text)" fontSize="10">Vosk + Cloud STT</text>
          <text x="420" y="88" fill="var(--text-muted)" fontSize="9">Real-time transcript chunks</text>

          <path d="M580 67 H 610" stroke="var(--accent)" strokeWidth="2" />

          <rect x="610" y="30" width="170" height="75" rx="6" fill="var(--surface)" stroke="var(--secondary-accent)" strokeWidth="1.5" />
          <text x="620" y="55" fill="var(--secondary-accent)" fontSize="11" fontWeight="bold">4. 3D AVATAR (VLIBRAS)</text>
          <text x="620" y="72" fill="var(--text)" fontSize="10">Grammar Parser</text>
          <text x="620" y="88" fill="var(--secondary-accent)" fontSize="9">Three.js Gestural Stream</text>

          {/* Sync bar */}
          <rect x="20" y="145" width="760" height="50" rx="6" fill="var(--surface-muted)" stroke="var(--border)" />
          <text x="40" y="175" fill="var(--text)" fontSize="11" fontWeight="bold">END-TO-END PIPELINE SYNCHRONIZATION</text>
          <text x="360" y="175" fill="var(--accent)" fontSize="11">Continuous chunks · Low Latency</text>
        </svg>
      );

    case '/media/mermaid/livro/fig-1.png':
      return (
        <svg viewBox="0 0 800 220" className="w-full h-auto text-text font-mono" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="30" width="180" height="70" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="45" y="56" fill="var(--text)" fontSize="11" fontWeight="bold">Fiscal Registration</text>
          <text x="45" y="74" fill="var(--text-muted)" fontSize="10">POST /denunciations</text>
          <text x="45" y="88" fill="var(--accent)" fontSize="9">{`{ year: 2024, number: 1042 }`}</text>

          <path d="M210 65 H 290" stroke="var(--accent)" strokeWidth="2" />

          <rect x="290" y="25" width="220" height="80" rx="6" fill="var(--surface)" stroke="var(--accent)" />
          <text x="305" y="50" fill="var(--accent)" fontSize="11" fontWeight="bold">SEQUELIZE TRANSACTION</text>
          <text x="305" y="70" fill="var(--text)" fontSize="10">Composite Unique Index</text>
          <text x="305" y="88" fill="var(--text-muted)" fontSize="9">indexes: unique[year, number]</text>

          <path d="M510 65 H 580" stroke="var(--accent)" strokeWidth="2" />

          <rect x="580" y="30" width="190" height="70" rx="6" fill="var(--surface)" stroke="var(--secondary-accent)" />
          <text x="595" y="56" fill="var(--secondary-accent)" fontSize="11" fontWeight="bold">MySQL InnoDB Engine</text>
          <text x="595" y="74" fill="var(--text)" fontSize="10">ACID Atomic Commit</text>
          <text x="595" y="88" fill="var(--text-subtle)" fontSize="9">Duplication Impossible</text>

          {/* Outcome block */}
          <rect x="30" y="135" width="740" height="55" rx="6" fill="var(--surface-muted)" stroke="var(--border)" />
          <text x="50" y="165" fill="var(--accent)" fontSize="11" fontWeight="bold">RESULTADO:</text>
          <text x="140" y="165" fill="var(--text)" fontSize="11">Tempo de busca reduzido de ~5 minutos para 10 segundos com indexação rígida.</text>
        </svg>
      );

    case '/media/mermaid/livro/fig-2.png':
      return (
        <svg viewBox="0 0 800 220" className="w-full h-auto text-text font-mono" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="30" width="180" height="70" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="45" y="55" fill="var(--text)" fontSize="11" fontWeight="bold">Operational Action</text>
          <text x="45" y="72" fill="var(--text-muted)" fontSize="10">Status alteration / dispatch</text>
          <text x="45" y="88" fill="var(--accent)" fontSize="9">Agent: Fiscal Sanitário</text>

          <path d="M210 65 H 290" stroke="var(--accent)" strokeWidth="2" />

          <rect x="290" y="25" width="220" height="80" rx="6" fill="var(--surface)" stroke="var(--border-strong)" />
          <text x="305" y="50" fill="var(--text)" fontSize="11" fontWeight="bold">LIFECYCLE HOOKS</text>
          <text x="305" y="70" fill="var(--text-muted)" fontSize="10">afterUpdate / afterCreate</text>
          <text x="305" y="88" fill="var(--accent)" fontSize="9">Extract session &amp; diff delta</text>

          <path d="M510 65 H 580" stroke="var(--accent)" strokeWidth="2" />

          <rect x="580" y="30" width="190" height="70" rx="6" fill="var(--surface)" stroke="var(--secondary-accent)" />
          <text x="595" y="55" fill="var(--secondary-accent)" fontSize="11" fontWeight="bold">AUDIT TRAIL ENTRY</text>
          <text x="595" y="72" fill="var(--text)" fontSize="10">Immutable Log Recorded</text>
          <text x="595" y="88" fill="var(--text-subtle)" fontSize="9">Legal accountability valid</text>
        </svg>
      );

    case '/media/mermaid/nobsdownloader/fig-1.png':
      return (
        <svg viewBox="0 0 800 230" className="w-full h-auto text-text font-mono" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="30" width="170" height="65" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="45" y="55" fill="var(--text)" fontSize="11" fontWeight="bold">Request Input</text>
          <text x="45" y="75" fill="var(--accent)" fontSize="10">Media URL + Selected Preset</text>

          <path d="M200 62 H 270" stroke="var(--accent)" strokeWidth="2" />

          <rect x="270" y="20" width="230" height="85" rx="6" fill="var(--surface)" stroke="var(--accent)" />
          <text x="285" y="45" fill="var(--accent)" fontSize="11" fontWeight="bold">CHILD PROCESS: SPAWN</text>
          <text x="285" y="65" fill="var(--text)" fontSize="10">spawn(YTDLP_PATH, args)</text>
          <text x="285" y="85" fill="var(--text-muted)" fontSize="9">stdout chunk-by-chunk stream</text>

          <path d="M500 62 H 570" stroke="var(--accent)" strokeWidth="2" />

          <polygon points="630,25 710,62 630,100 550,62" fill="var(--surface-muted)" stroke="var(--border-strong)" />
          <text x="600" y="58" fill="var(--text)" fontSize="10" fontWeight="bold">Size &gt;= 1GiB?</text>
          <text x="612" y="73" fill="var(--accent)" fontSize="9">Safety check</text>

          {/* Abort flow */}
          <path d="M630 100 V 145" stroke="#ef4444" strokeWidth="2" />
          <rect x="540" y="145" width="180" height="50" rx="6" fill="var(--surface)" stroke="#ef4444" />
          <text x="555" y="167" fill="#ef4444" fontSize="10" fontWeight="bold">SIGKILL / taskkill</text>
          <text x="555" y="183" fill="var(--text-muted)" fontSize="9">LIMIT_EXCEEDED (Safe Exit)</text>

          {/* Safe delivery */}
          <path d="M710 62 H 740 V 170 H 420" stroke="var(--secondary-accent)" strokeWidth="2" />
          <rect x="220" y="145" width="200" height="50" rx="6" fill="var(--surface)" stroke="var(--secondary-accent)" />
          <text x="235" y="167" fill="var(--secondary-accent)" fontSize="10" fontWeight="bold">Binary Pipe Stream</text>
          <text x="235" y="183" fill="var(--text)" fontSize="9">Direct delivery to client</text>
        </svg>
      );

    case '/media/mermaid/nobsdownloader/fig-2.png':
      return (
        <svg viewBox="0 0 800 220" className="w-full h-auto text-text font-mono" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="30" width="180" height="70" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="45" y="55" fill="var(--text)" fontSize="11" fontWeight="bold">Source Audio Stream</text>
          <text x="45" y="72" fill="var(--text-muted)" fontSize="10">Raw opus / webm payload</text>
          <text x="45" y="88" fill="var(--accent)" fontSize="9">Isolated temp directory</text>

          <path d="M210 65 H 290" stroke="var(--accent)" strokeWidth="2" />

          <rect x="290" y="25" width="230" height="80" rx="6" fill="var(--surface)" stroke="var(--secondary-accent)" />
          <text x="305" y="50" fill="var(--secondary-accent)" fontSize="11" fontWeight="bold">FFMPEG TRANSCODING</text>
          <text x="305" y="70" fill="var(--text)" fontSize="10">spawn(FFMPEG_PATH, args)</text>
          <text x="305" y="88" fill="var(--text-muted)" fontSize="9">-vn -acodec libmp3lame -q:a 2</text>

          <path d="M520 65 H 590" stroke="var(--secondary-accent)" strokeWidth="2" />

          <rect x="590" y="30" width="180" height="70" rx="6" fill="var(--surface)" stroke="var(--border)" />
          <text x="605" y="55" fill="var(--text)" fontSize="11" fontWeight="bold">Sanitized MP3/M4A</text>
          <text x="605" y="72" fill="var(--accent)" fontSize="10">Metadata normalized</text>
          <text x="605" y="88" fill="var(--text-subtle)" fontSize="9">Immediate directory purge</text>
        </svg>
      );

    default:
      return null;
  }
};
