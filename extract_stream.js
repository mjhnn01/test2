const fs = require('fs');
const zlib = require('zlib');

const filePath = 'C:/Users/mjhnn/.gemini/antigravity-ide/brain/5ecaefce-f60d-471e-9436-9c6c644042fd/.user_uploaded/media_1791707561105.pdf';
const buf = fs.readFileSync(filePath);
const str = buf.toString('latin1');

// Obj 8 찾기
const obj8Index = str.indexOf('8 0 obj');
const streamMarker = 'stream\r\n';
let streamStart = str.indexOf(streamMarker, obj8Index);
let offset = 8;
if (streamStart === -1) {
  streamStart = str.indexOf('stream\n', obj8Index);
  offset = 7;
}

const dataStart = streamStart + offset;
const dataEnd = str.indexOf('endstream', dataStart);
console.log('Stream length:', dataEnd - dataStart);

const compressed = buf.subarray(dataStart, dataEnd);
const decompressed = zlib.inflateSync(compressed);
console.log('Decompressed length:', decompressed.length);
console.log('Snippet:', decompressed.toString('utf8').substring(0, 500));

fs.writeFileSync('decompressed_obj8.txt', decompressed.subarray(0, 10000));
