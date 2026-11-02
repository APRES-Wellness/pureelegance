const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/assets/img/real';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Gallery Catalog Preview</title>
  <style>
    body { background: #0b0f17; color: #fff; font-family: sans-serif; padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .card { background: #1e293b; border-radius: 8px; overflow: hidden; border: 1px solid #334155; }
    .card img { width: 100%; height: 180px; object-fit: cover; display: block; }
    .info { padding: 8px; font-size: 11px; word-break: break-all; }
  </style>
</head>
<body>
  <h1>Pure Elegance Real Photos Catalog (${files.length} images)</h1>
  <div class="grid">
`;

files.forEach(f => {
  const size = (fs.statSync(path.join(dir, f)).size / 1024).toFixed(0);
  html += `
    <div class="card">
      <img src="real/${f}" loading="lazy">
      <div class="info"><strong>${f}</strong> (${size} KB)</div>
    </div>
  `;
});

html += `
  </div>
</body>
</html>
`;

fs.writeFileSync('C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/assets/img/gallery-catalog.html', html);
console.log('Successfully written gallery-catalog.html with', files.length, 'images!');
