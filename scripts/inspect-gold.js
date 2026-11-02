const fs = require('fs');
const zlib = require('zlib');

function getPixels(filePath) {
  const buf = fs.readFileSync(filePath);
  let pos = 8;
  const idatChunks = [];
  let width = 0, height = 0;
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
    } else if (type === 'IDAT') {
      idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }
  const idat = Buffer.concat(idatChunks);
  const raw = zlib.inflateSync(idat);
  return { width, height, raw };
}

const orig = getPixels('C:/Users/wangu/.gemini/antigravity/brain/7508fec0-f019-43c0-8d6e-e06c3433b828/.user_uploaded/media_1793586477149_324804bb.png');
console.log('Original image dimensions:', orig.width, 'x', orig.height);

let colorMap = {};
const rowBytes = 1 + orig.width * 4;
for (let y = 180; y < 350; y++) {
  for (let x = 300; x < 500; x++) {
    let offset = y * rowBytes + 1 + x * 4;
    let r = orig.raw[offset], g = orig.raw[offset+1], b = orig.raw[offset+2];
    if (r > 100 && g > 80) {
      let key = (r >> 3) + ',' + (g >> 3) + ',' + (b >> 3);
      colorMap[key] = (colorMap[key] || 0) + 1;
    }
  }
}
let sorted = Object.entries(colorMap).sort((a,b)=>b[1]-a[1]).slice(0, 5);
sorted.forEach(([k, c]) => {
  let parts = k.split(',');
  console.log('RGB(' + parts[0]*8 + ',' + parts[1]*8 + ',' + parts[2]*8 + ') - count ' + c);
});
