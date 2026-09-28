import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Helper to create a valid minimal PNG buffer with given width, height, and RGBA fill color
function createPngBuffer(width, height, r, g, b, a = 255) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth
  ihdr.writeUInt8(6, 9); // RGBA color type
  ihdr.writeUInt8(0, 10); // compression method
  ihdr.writeUInt8(0, 11); // filter method
  ihdr.writeUInt8(0, 12); // interlace method

  // Raw image data with filter byte 0 at start of each scanline
  const scanlineLength = 1 + width * 4;
  const rawData = Buffer.alloc(scanlineLength * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  // Helper for chunk creation with CRC
  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type);
    const body = Buffer.concat([typeBuf, data]);
    const crc = calcCrc(body);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, body, crcBuf]);
  }

  // IEND chunk
  const iend = makeChunk('IEND', Buffer.alloc(0));
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);

  return Buffer.concat([signature, ihdrChunk, idatChunk, iend]);
}

// Simple CRC32 implementation
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function calcCrc(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

// Generate valid standard PDF
function generateMinimalPdf(title, author) {
  const content = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 450 >>
stream
BT
/F1 22 Tf
50 720 Td
(${author} - Curriculum Vitae) Tj
/F1 12 Tf
0 -30 Td
(Backend Developer | Node.js | Sistemas em Producao) Tj
0 -25 Td
(Email: diasmurilo02@gmail.com | GitHub: github.com/self1027 | LinkedIn: linkedin.com/in/murilo-dias-dev) Tj
0 -40 Td
(EXPERIENCE:) Tj
0 -20 Td
(Prefeitura Municipal de Andradina - Backend Development / Internal Systems (May 2023 - Present)) Tj
0 -15 Td
(- Development and maintenance of internal web system for Vigilancia Sanitaria) Tj
0 -15 Td
(- Reduced record lookup time from ~5 minutes to 10 seconds) Tj
0 -15 Td
(- Node.js, Sequelize ORM, MySQL, Linux Server, Nginx, PM2) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000746 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
825
%%EOF`;
  return Buffer.from(content, 'utf8');
}

// Ensure directories
const publicDir = path.resolve('public');
const mediaDir = path.join(publicDir, 'media');
const mermaidAscii = path.join(mediaDir, 'mermaid', 'ascii');
const mermaidTtt = path.join(mediaDir, 'mermaid', 'ttt');
const mermaidIntegra = path.join(mediaDir, 'mermaid', 'integra');
const mermaidLivro = path.join(mediaDir, 'mermaid', 'livro');
const mermaidNobs = path.join(mediaDir, 'mermaid', 'nobsdownloader');

[mediaDir, mermaidAscii, mermaidTtt, mermaidIntegra, mermaidLivro, mermaidNobs].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// Create CV PDF
fs.writeFileSync(path.join(mediaDir, 'MuriloDias_CV.pdf'), generateMinimalPdf('Murilo Dias CV', 'Murilo Dias'));

// Create placeholder PNGs (dark graphite technical aesthetic)
const darkGraphite = createPngBuffer(400, 240, 24, 26, 32);
const darkGraphiteTall = createPngBuffer(600, 360, 28, 30, 38);
const iconM = createPngBuffer(128, 128, 217, 119, 6); // amber accent

fs.writeFileSync(path.join(mediaDir, 'letra-m.png'), iconM);
fs.writeFileSync(path.join(mediaDir, 'livro-demo.png'), darkGraphite);
fs.writeFileSync(path.join(mediaDir, 'integra-demo.png'), darkGraphite);
fs.writeFileSync(path.join(mediaDir, 'ascii-demo.png'), darkGraphite);
fs.writeFileSync(path.join(mediaDir, 'infinityttt-demo.png'), darkGraphite);
fs.writeFileSync(path.join(mediaDir, 'nobsd-demo.png'), darkGraphite);

fs.writeFileSync(path.join(mermaidAscii, 'fig-2.png'), darkGraphiteTall);
fs.writeFileSync(path.join(mermaidTtt, 'fig-1.png'), darkGraphiteTall);
fs.writeFileSync(path.join(mermaidTtt, 'fig-2.png'), darkGraphiteTall);
fs.writeFileSync(path.join(mermaidIntegra, 'fig-1.png'), darkGraphiteTall);
fs.writeFileSync(path.join(mermaidIntegra, 'fig-3.png'), darkGraphiteTall);
fs.writeFileSync(path.join(mermaidLivro, 'fig-1.png'), darkGraphiteTall);
fs.writeFileSync(path.join(mermaidLivro, 'fig-2.png'), darkGraphiteTall);
fs.writeFileSync(path.join(mermaidNobs, 'fig-1.png'), darkGraphiteTall);
fs.writeFileSync(path.join(mermaidNobs, 'fig-2.png'), darkGraphiteTall);

console.log('Successfully generated public media files and CV PDF!');
