const https = require('https');
const fs = require('fs');
const path = require('path');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, rejectUnauthorized: false }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = res.headers.location.startsWith('http') 
          ? res.headers.location 
          : 'https://unpkg.com' + res.headers.location;
        return get(nextUrl).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching Babel Standalone 7...');
  const babelCode = await get('https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.24.4/babel.min.js');

  const vm = require('vm');
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(babelCode, sandbox);
  const Babel = sandbox.Babel || sandbox.window.Babel;

  // Read App.jsx
  let appCode = fs.readFileSync(path.join(__dirname, '../src/App.jsx'), 'utf8');
  // Remove import statements
  appCode = appCode.replace(/import\s+.*?from\s+['"].*?['"];?/g, '');
  appCode = appCode.replace(/export const /g, 'const ');
  appCode = appCode.replace(/export default function App\(\)/, 'function App()');

  // Mount logic
  const fullSource = `
    const { useState } = React;
    ${appCode}
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(App));
  `;

  console.log('Compiling React code...');
  const res = Babel.transform(fullSource, {
    presets: ['react']
  });

  const outJs = path.join(__dirname, '../assets/js/app.js');
  fs.writeFileSync(outJs, res.code, 'utf8');
  console.log('Successfully compiled assets/js/app.js! Size:', res.code.length);
}

main().catch(console.error);
