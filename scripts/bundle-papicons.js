const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../node_modules/@getpapillon/papicons/lib/module/icons-web');
const outJs = path.join(__dirname, '../assets/js/papicons.js');

if (!fs.existsSync(srcDir)) {
  console.error("Directory not found:", srcDir);
  process.exit(1);
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.js'));
console.log(`Found ${files.length} icon files.`);

const iconMap = {};

files.forEach(f => {
  const name = path.basename(f, '.js');
  const code = fs.readFileSync(path.join(srcDir, f), 'utf8');

  // Match viewBox
  const vbMatch = code.match(/viewBox:\s*["']([^"']+)["']/);
  const viewBox = vbMatch ? vbMatch[1] : '0 0 24 24';

  // Extract all jsx elements
  const elMatches = [...code.matchAll(/_jsx\(["'](path|circle|rect|polygon|line)["'],\s*\{([^}]+)\}/g)];
  if (elMatches.length > 0) {
    const inner = elMatches.map(m => {
      const tag = m[1];
      const props = m[2];
      
      const d = (props.match(/d:\s*["']([^"']+)["']/) || [])[1];
      const cx = (props.match(/cx:\s*["']?([^"',]+)["']?/) || [])[1];
      const cy = (props.match(/cy:\s*["']?([^"',]+)["']?/) || [])[1];
      const r = (props.match(/r:\s*["']?([^"',]+)["']?/) || [])[1];
      const x = (props.match(/x:\s*["']?([^"',]+)["']?/) || [])[1];
      const y = (props.match(/y:\s*["']?([^"',]+)["']?/) || [])[1];
      const width = (props.match(/width:\s*["']?([^"',]+)["']?/) || [])[1];
      const height = (props.match(/height:\s*["']?([^"',]+)["']?/) || [])[1];
      const points = (props.match(/points:\s*["']([^"']+)["']/) || [])[1];

      let attrs = '';
      if (d) attrs += ` d="${d}"`;
      if (cx) attrs += ` cx="${cx.trim()}"`;
      if (cy) attrs += ` cy="${cy.trim()}"`;
      if (r) attrs += ` r="${r.trim()}"`;
      if (x) attrs += ` x="${x.trim()}"`;
      if (y) attrs += ` y="${y.trim()}"`;
      if (width) attrs += ` width="${width.trim()}"`;
      if (height) attrs += ` height="${height.trim()}"`;
      if (points) attrs += ` points="${points}"`;

      return `<${tag}${attrs} fill="currentColor" />`;
    }).join('');

    iconMap[name.toLowerCase()] = { viewBox, inner };
  }
});

console.log(`Parsed ${Object.keys(iconMap).length} icons into bundle.`);

const outputCode = `/**
 * Papicons Web Runtime for Pure Elegance Agency
 * Extracted directly from @getpapillon/papicons
 */
(function(window) {
  const ICONS = ${JSON.stringify(iconMap)};

  function renderPapicons() {
    const elements = document.querySelectorAll('[data-papicon]');
    elements.forEach(el => {
      const name = el.getAttribute('data-papicon').toLowerCase();
      const icon = ICONS[name];
      if (!icon) return;

      const size = el.getAttribute('data-size') || '20';
      const className = el.getAttribute('class') || '';

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', icon.viewBox);
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('fill', 'currentColor');
      if (className) svg.setAttribute('class', className);
      svg.innerHTML = icon.inner;

      el.replaceWith(svg);
    });
  }

  window.Papicons = {
    render: renderPapicons,
    icons: ICONS
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPapicons);
  } else {
    renderPapicons();
  }
})(window);
`;

fs.writeFileSync(outJs, outputCode, 'utf8');
console.log(`Successfully generated ${outJs} (${Math.round(outputCode.length / 1024)} KB)`);
