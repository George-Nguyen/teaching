const fs = require('fs');
const path = require('path');

try {
  console.log('[v0] Attempting to extract ZIP using Node.js...');
  const zipPath = path.join(__dirname, 'learnhub-export.zip');
  
  // Try to import unzipper or use native module
  let extract;
  try {
    const unzipper = require('unzipper');
    extract = unzipper;
  } catch (e) {
    console.log('[v0] unzipper not available, trying alternative...');
  }
  
  if (extract) {
    const { createReadStream } = fs;
    const { Extract } = extract;
    
    createReadStream(zipPath)
      .pipe(Extract({ path: __dirname }))
      .on('close', () => {
        console.log('[v0] Extraction successful!');
        const files = fs.readdirSync(__dirname);
        console.log('[v0] Directory now contains:', files.slice(0, 10).join(', '));
      })
      .on('error', (err) => {
        console.error('[v0] Extraction error:', err.message);
      });
  } else {
    console.log('[v0] No ZIP extraction library available');
    console.log('[v0] Project root:', __dirname);
    const files = fs.readdirSync(__dirname);
    console.log('[v0] Files in directory:', files.filter(f => !f.startsWith('.')).slice(0, 10).join(', '));
  }
} catch (error) {
  console.error('[v0] Error:', error.message);
}
