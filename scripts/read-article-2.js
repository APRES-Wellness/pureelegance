const fs = require('fs');
const log = fs.readFileSync('C:/Users/wangu/.gemini/antigravity/brain/7508fec0-f019-43c0-8d6e-e06c3433b828/.system_generated/tasks/task-209.log', 'utf8');

const idx2 = log.indexOf('https://belidemag.net/culture/pure-elegance-agency-lart-de-sublimer-chaque-evenement-avec-grace-et-professionnalisme/');
console.log(log.substring(idx2, idx2 + 4000));
