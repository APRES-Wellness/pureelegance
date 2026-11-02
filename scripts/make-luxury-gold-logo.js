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

// Logo bounds: minX: 137, maxX: 646, minY: 182, maxY: 504
const pad = 8;
const cropX = Math.max(0, 137 - pad);
const cropY = Math.max(0, 182 - pad);
const cropMaxX = Math.min(orig.width - 1, 646 + pad);
const cropMaxY = Math.min(orig.height - 1, 504 + pad);
const newW = cropMaxX - cropX + 1;
const newH = cropMaxY - cropY + 1;

console.log('Cropped dimensions:', newW, 'x', newH);

const rowBytes = 1 + orig.width * 4;
const newRaw = Buffer.alloc(newH * (1 + newW * 4));

// We want the gold to look RICH, DEEP 24K GOLD on a WHITE background:
// For the butterfly:
// Bright highlights (which were near white in the black version) are mapped to warm lustrous yellow-gold: RGB(255, 205, 30)
// Midtones are mapped to royal gold: RGB(225, 175, 20)
// Shadows are mapped to deep amber-bronze: RGB(160, 110, 10)
//
// For the text (Pure Elegance AGENCY / Where elegance becomes a statement):
// It must have strong contrast on white:
// Deep luxury bronze-gold: RGB(145, 100, 15) to RGB(180, 130, 25), with 100% opacity!
// This makes every letter pop with gorgeous metallic sheen, and NEVER wash out!

for (let y = 0; y < newH; y++) {
  const srcY = cropY + y;
  const srcOffset = srcY * rowBytes;
  const dstOffset = y * (1 + newW * 4);
  newRaw[dstOffset] = 0; // Filter None

  const isTextZone = (y > newH * 0.48);

  for (let x = 0; x < newW; x++) {
    const srcX = cropX + x;
    const srcPixel = srcOffset + 1 + srcX * 4;
    const dstPixel = dstOffset + 1 + x * 4;

    let r = orig.raw[srcPixel];
    let g = orig.raw[srcPixel + 1];
    let b = orig.raw[srcPixel + 2];
    let brightness = Math.max(r, g, b);

    if (brightness < 18) {
      // Background black -> transparent
      newRaw[dstPixel] = 0;
      newRaw[dstPixel + 1] = 0;
      newRaw[dstPixel + 2] = 0;
      newRaw[dstPixel + 3] = 0;
    } else if (brightness < 45) {
      // Anti-aliased outer edge
      let alpha = Math.round(((brightness - 18) / (45 - 18)) * 255);
      newRaw[dstPixel] = 180;
      newRaw[dstPixel + 1] = 130;
      newRaw[dstPixel + 2] = 20;
      newRaw[dstPixel + 3] = alpha;
    } else {
      // Solid gold logo!
      let normB = brightness / 255; // 0.18 to 1.0

      if (isTextZone) {
        // Text: High contrast luxury bronze gold
        // Ensures full readability on white
        let textR = Math.round(140 + normB * 60); // 140 to 200
        let textG = Math.round(95 + normB * 45);  // 95 to 140
        let textB = Math.round(15 + normB * 15);  // 15 to 30
        newRaw[dstPixel] = textR;
        newRaw[dstPixel + 1] = textG;
        newRaw[dstPixel + 2] = textB;
        newRaw[dstPixel + 3] = 255;
      } else {
        // Butterfly: 3D radiant 24K gold foil
        // Map brightness to rich gold gradient (not white!)
        // Low: RGB(170, 115, 15)
        // Mid: RGB(225, 170, 20)
        // High: RGB(255, 210, 35) (Warm radiant gold, not blown-out white!)
        let goldR = Math.min(255, Math.round(160 + normB * 95));
        let goldG = Math.min(255, Math.round(110 + normB * 98));
        let goldB = Math.min(255, Math.round(15 + normB * 25));
        newRaw[dstPixel] = goldR;
        newRaw[dstPixel + 1] = goldG;
        newRaw[dstPixel + 2] = goldB;
        newRaw[dstPixel + 3] = 255;
      }
    }
  }
}

// CRC helper
function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xEDB88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const typeAndData = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crcBuf]);
}

const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(newW, 0);
ihdrData.writeUInt32BE(newH, 4);
ihdrData[8] = 8;
ihdrData[9] = 6;
ihdrData[10] = 0;
ihdrData[11] = 0;
ihdrData[12] = 0;

const pngSig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const luxuryGoldPng = Buffer.concat([
  pngSig,
  makeChunk('IHDR', ihdrData),
  makeChunk('IDAT', zlib.deflateSync(newRaw)),
  makeChunk('IEND', Buffer.alloc(0))
]);

const outPath1 = 'C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/assets/img/logo-removebg.png';
const outPath2 = 'C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/assets/img/logo-transparent.png';
const outPath3 = 'C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/assets/img/logo.png';
const outArtifact = 'C:/Users/wangu/.gemini/antigravity/brain/7508fec0-f019-43c0-8d6e-e06c3433b828/logo-luxury-gold.png';

fs.writeFileSync(outPath1, luxuryGoldPng);
fs.writeFileSync(outPath2, luxuryGoldPng);
fs.writeFileSync(outPath3, luxuryGoldPng);
fs.writeFileSync(outArtifact, luxuryGoldPng);

console.log('Successfully written luxury gold logo to all targets!');
