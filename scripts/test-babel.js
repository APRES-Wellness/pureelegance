const fs = require('fs');

const html = fs.readFileSync('C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/index.html', 'utf8');
const scriptMatch = html.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/);

if (!scriptMatch) {
  console.log('No script found');
  process.exit(1);
}

const code = scriptMatch[1];
console.log('Script length:', code.length);

// Check unescaped quotes or issues
const lines = code.split('\n');
console.log('Total lines:', lines.length);

lines.forEach((line, i) => {
  if (line.includes('\"') || line.includes('\\"')) {
    console.log(`Line ${i + 1}: ${line.trim()}`);
  }
});
