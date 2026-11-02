const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('Checks:');
console.log('1. Solid white style:', html.includes('background-color: #ffffff !important;'));
console.log('2. Dark text links:', html.includes('text-slate-900 hover:text-amber-600'));
console.log('3. Close button:', html.includes('closeMobileMenuBtn'));
console.log('4. Mobile link class:', html.includes('mobile-nav-link'));
