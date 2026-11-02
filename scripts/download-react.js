const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, rejectUnauthorized: false }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function main() {
  const vendorDir = path.join(__dirname, '../assets/js/vendor');
  if (!fs.existsSync(vendorDir)) fs.mkdirSync(vendorDir, { recursive: true });

  console.log('Downloading React 18 production...');
  await download('https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js', path.join(vendorDir, 'react.production.min.js'));
  console.log('Downloaded react.production.min.js');

  console.log('Downloading ReactDOM 18 production...');
  await download('https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js', path.join(vendorDir, 'react-dom.production.min.js'));
  console.log('Downloaded react-dom.production.min.js');
}

main().catch(console.error);
