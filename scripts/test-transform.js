const https = require('https');
const fs = require('fs');

const html = fs.readFileSync('C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/index.html', 'utf8');
const startIndex = html.indexOf('<script type="text/babel"');
const codeStart = html.indexOf('>', startIndex) + 1;
const codeEnd = html.indexOf('</script>', codeStart);
const code = html.substring(codeStart, codeEnd);

// Download Babel standalone to test transform locally
https.get('https://unpkg.com/@babel/standalone/babel.min.js', res => {
  let babelCode = '';
  res.on('data', c => babelCode += c);
  res.on('end', () => {
    const vm = require('vm');
    const sandbox = { window: {}, console };
    vm.createContext(sandbox);
    vm.runInContext(babelCode, sandbox);
    const Babel = sandbox.Babel || sandbox.window.Babel;
    console.log('Babel loaded version:', Babel.version);

    try {
      const output = Babel.transform(code, { presets: ['react'] });
      console.log('TRANSFORM SUCCESS! Output code length:', output.code.length);
    } catch (err) {
      console.error('TRANSFORM ERROR:', err.message);
      if (err.loc) {
        console.error('Error location:', err.loc);
      }
    }
  });
}).on('error', e => console.error(e));
