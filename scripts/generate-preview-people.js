const fs = require('fs');

const realDir = 'C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/assets/img/real';

const candidates = [
  { id: '129', name: 'IMG_8465', file: 'pure-elegance-129.jpg' },
  { id: '139', name: 'IMG_8501', file: 'pure-elegance-139.jpg' },
  { id: '144', name: 'IMG_8422', file: 'pure-elegance-144.jpg' },
  { id: '149', name: 'IMG_8427', file: 'pure-elegance-149.jpg' },
  { id: '159', name: 'IMG_8809', file: 'pure-elegance-159.jpg' },
  { id: '164', name: 'IMG_8794', file: 'pure-elegance-164.jpg' },
  { id: '169', name: 'IMG_8720', file: 'pure-elegance-169.jpg' },
  { id: '174', name: 'IMG_8694', file: 'pure-elegance-174.jpg' },
  { id: '179', name: 'IMG_8680', file: 'pure-elegance-179.jpg' },
  { id: '184', name: 'IMG_8690', file: 'pure-elegance-184.jpg' },
  { id: '194', name: 'IMG_8416', file: 'pure-elegance-194.jpg' }
];

let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Preview Real People</title><style>
body { background: #0b0f17; color: #fff; font-family: sans-serif; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.card { background: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; }
.card img { width: 100%; height: 320px; object-fit: cover; object-position: top; display: block; }
.info { padding: 12px; font-size: 13px; font-weight: bold; }
</style></head><body>
<h1>Pure Elegance Direct Event Photos (People / Girls / Hostesses)</h1>
<div class="grid">
`;

candidates.forEach(c => {
  const p = `${realDir}/${c.file}`;
  if (fs.existsSync(p)) {
    const sz = (fs.statSync(p).size / 1024).toFixed(0);
    html += `
    <div class="card">
      <img src="real/${c.file}">
      <div class="info">${c.name} (${c.file}) - ${sz} KB</div>
    </div>
    `;
  }
});

html += `</div></body></html>`;

fs.writeFileSync('C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/assets/img/preview-people.html', html);
console.log('Written preview-people.html successfully!');
