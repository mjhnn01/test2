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

console.log('Decompressed total chars:', decompressed.length);

// 연산자 통계
const tokens = decompressed.trim().split(/\s+/);
const opCount = {};
for (let i = 0; i < tokens.length; i++) {
  const tok = tokens[i];
  if (['m','l','c','v','y','h','re','f','f*','F','b','b*','B','B*','s','S','n','q','Q','cm','rg','RG','k','K','g','G','sc','SC','scn','SCN','cs','CS','BMC','EMC','BDC','EDC'].includes(tok)) {
    opCount[tok] = (opCount[tok] || 0) + 1;
  }
}
console.log('Operations count:', JSON.stringify(opCount, null, 2));

// 색상 확인: scn, rg 등이 어떻게 쓰이는지
const scnMatches = decompressed.match(/[\d\.]+\s+[\d\.]+\s+[\d\.]+\s+scn/g);
console.log('Unique scn colors (first 10):', [...new Set(scnMatches)].slice(0, 10));
