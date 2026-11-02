const fs = require('fs');

const html = fs.readFileSync('C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/index.html', 'utf8');

// Find script content
const startIndex = html.indexOf('<script type="text/babel"');
const codeStart = html.indexOf('>', startIndex) + 1;
const codeEnd = html.indexOf('</script>', codeStart);
const code = html.substring(codeStart, codeEnd);

// Find line 731
const lines = code.split('\n');
console.log('Total lines:', lines.length);
console.log('Line 730:', lines[729]);
console.log('Line 731:', lines[730]);
console.log('Line 732:', lines[731]);
