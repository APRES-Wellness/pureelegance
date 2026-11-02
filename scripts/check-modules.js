const fs = require('fs');

// We can use a jpeg decoder or check pixel columns
// But wait, can we install or do we have jimp / canvas / jpeg-js?
// Let's check node_modules in scratch or globally
console.log('Checking available modules:');
['jpeg-js', 'sharp', 'jimp', 'canvas', 'pngjs'].forEach(m => {
  try {
    require(m);
    console.log('Found:', m);
  } catch(e) {
    console.log('Missing:', m);
  }
});
