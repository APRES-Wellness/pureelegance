const fs = require('fs');
const path = require('path');

const desk = 'C:\\Users\\wangu\\Desktop\\pure-elegance-agency';
const scratch = 'C:\\Users\\wangu\\.gemini\\antigravity\\scratch\\pure-elegance-agency';

const files = fs.readdirSync(desk);
const removebgFile = files.find(f => f.includes('removebg'));
const squareFile = files.find(f => f.startsWith('Capture') && !f.includes('removebg') && f.endsWith('.png'));

console.log('RemoveBG logo found:', removebgFile);
console.log('Square logo found:', squareFile);

if (removebgFile) {
  const src = path.join(desk, removebgFile);
  fs.copyFileSync(src, path.join(scratch, 'assets', 'img', 'logo-transparent.png'));
  fs.copyFileSync(src, path.join(desk, 'assets', 'img', 'logo-transparent.png'));
  console.log('Copied transparent logo');
}

if (squareFile) {
  const src = path.join(desk, squareFile);
  fs.copyFileSync(src, path.join(scratch, 'assets', 'img', 'logo-square.png'));
  fs.copyFileSync(src, path.join(scratch, 'favicon.png'));
  fs.copyFileSync(src, path.join(scratch, 'apple-touch-icon.png'));
  
  fs.copyFileSync(src, path.join(desk, 'assets', 'img', 'logo-square.png'));
  fs.copyFileSync(src, path.join(desk, 'favicon.png'));
  fs.copyFileSync(src, path.join(desk, 'apple-touch-icon.png'));
  console.log('Copied square favicon');
}
