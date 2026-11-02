const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('Close button onclick:', html.includes('id="closeMobileMenuBtn" onclick="window.closeMobileMenu();"'));
console.log('Open button onclick:', html.includes('id="mobileMenuBtn" onclick="window.openMobileMenu();"'));
console.log('Main.js content check:');
const js = fs.readFileSync('assets/js/main.js', 'utf8');
console.log('openMobileMenu in js:', js.includes('window.openMobileMenu'));
console.log('closeMobileMenu in js:', js.includes('window.closeMobileMenu'));
console.log('touchstart in js:', js.includes('touchstart'));
