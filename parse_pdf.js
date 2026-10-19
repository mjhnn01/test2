const fs = require('fs');
const zlib = require('zlib');

const filePath = 'C:/Users/mjhnn/.gemini/antigravity-ide/brain/5ecaefce-f60d-471e-9436-9c6c644042fd/.user_uploaded/media_1791707561105.pdf';
const buf = fs.readFileSync(filePath);

console.log('PDF total size:', buf.length);

// 정규식으로 obj ... endobj 찾기
const str = buf.toString('latin1');
const objRegex = /(\d+)\s+(\d+)\s+obj([\s\S]*?)endobj/g;
let match;
let count = 0;
while ((match = objRegex.exec(str)) !== null) {
  count++;
  const objNum = match[1];
  const objGen = match[2];
  const body = match[3];
  
  // 스트림 여부
  const streamIdx = body.indexOf('stream');
  if (streamIdx !== -1) {
    const dict = body.substring(0, streamIdx);
    console.log(`Obj ${objNum} has stream. Dict: ${dict.replace(/\s+/g, ' ').trim().substring(0, 150)}`);
  } else {
    if (body.length < 500) {
      console.log(`Obj ${objNum}: ${body.replace(/\s+/g, ' ').trim()}`);
    }
  }
}
console.log('Total objects:', count);
