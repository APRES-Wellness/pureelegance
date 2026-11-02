const fs = require('fs');

// Search for captions in Article 2
const log = fs.readFileSync('C:/Users/wangu/.gemini/antigravity/brain/7508fec0-f019-43c0-8d6e-e06c3433b828/.system_generated/tasks/task-209.log', 'utf8');

const regex = /<figcaption[^>]*>(.*?)<\/figcaption>/gi;
let m;
let count = 0;
while ((m = regex.exec(log)) !== null) {
  console.log(`Caption ${++count}:`, m[1]);
}
if (count === 0) {
  console.log('No figcaptions in log.');
}
