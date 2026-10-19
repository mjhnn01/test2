const fs = require('fs');
const zlib = require('zlib');

const filePath = 'C:/Users/mjhnn/.gemini/antigravity-ide/brain/5ecaefce-f60d-471e-9436-9c6c644042fd/.user_uploaded/media_1791707561105.pdf';
const buf = fs.readFileSync(filePath);
const str = buf.toString('latin1');

const obj8Index = str.indexOf('8 0 obj');
let streamStart = str.indexOf('stream\r\n', obj8Index);
let offset = 8;
if (streamStart === -1) {
  streamStart = str.indexOf('stream\n', obj8Index);
  offset = 7;
}

const dataStart = streamStart + offset;
const dataEnd = str.indexOf('endstream', dataStart);
const compressed = buf.subarray(dataStart, dataEnd);
const decompressed = zlib.inflateSync(compressed).toString('latin1');

console.log('Parsing PDF vector commands into SVG...');

const width = 2398.5;
const height = 2363.110352;

// q ... Q 단위로 분할
const parts = decompressed.split(/(?:^|\n)q\s*\n/);
console.log('Total parts:', parts.length);

let svgElements = [];
let redCount = 0;
let grayCount = 0;

for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  const qEnd = part.indexOf('\nQ');
  const body = qEnd !== -1 ? part.substring(0, qEnd) : part;

  const lines = body.trim().split(/\r?\n/);
  let matrix = null;
  let color = null;
  let d = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.endsWith(' cm')) {
      const vals = trimmed.slice(0, -3).trim().split(/\s+/);
      matrix = vals.join(' ');
    } else if (trimmed.endsWith(' scn')) {
      const vals = trimmed.slice(0, -4).trim().split(/\s+/).map(Number);
      if (vals.length === 3) {
        const r = Math.round(vals[0] * 255);
        const g = Math.round(vals[1] * 255);
        const b = Math.round(vals[2] * 255);
        if (r > 200 && g < 50 && b < 50) {
          // 사용자 지정 색상 #E80202
          color = '#E80202';
          redCount++;
        } else {
          // 사용자 지정 색상 #5D5D5D (회색 선)
          color = '#5D5D5D';
          grayCount++;
        }
      }
    } else if (trimmed.endsWith(' m')) {
      const vals = trimmed.slice(0, -2).trim();
      d += `M${vals} `;
    } else if (trimmed.endsWith(' l')) {
      const vals = trimmed.slice(0, -2).trim();
      d += `L${vals} `;
    } else if (trimmed.endsWith(' c')) {
      const vals = trimmed.slice(0, -2).trim();
      d += `C${vals} `;
    } else if (trimmed === 'h') {
      d += 'Z ';
    }
  }

  if (d && matrix && color) {
    svgElements.push(`<path fill="${color}" transform="matrix(${matrix})" d="${d.trim()}"/>`);
  }
}

console.log(`Parsed ${svgElements.length} paths (Gray: ${grayCount}, Red points: ${redCount})`);

const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <g transform="matrix(1 0 0 -1 0 ${height})">
    ${svgElements.join('\n    ')}
  </g>
</svg>`;

fs.writeFileSync('assets/combustion-graphic.svg', svgContent, 'utf8');
console.log('Saved assets/combustion-graphic.svg successfully, size:', fs.statSync('assets/combustion-graphic.svg').size);
