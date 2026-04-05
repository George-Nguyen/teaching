const fs = require('fs');
const path = require('path');

console.log('[v0] Current working directory:', process.cwd());
console.log('[v0] Script location:', __filename);
console.log('[v0] Script directory:', __dirname);

// Check if ZIP exists
const zipPath = path.join(__dirname, 'learnhub-export.zip');
console.log('[v0] Looking for ZIP at:', zipPath);
console.log('[v0] ZIP exists:', fs.existsSync(zipPath));

// List files in script directory
try {
  const files = fs.readdirSync(__dirname);
  console.log('[v0] Files in directory:', files.filter(f => !f.startsWith('.')).slice(0, 20));
} catch (e) {
  console.error('[v0] Error reading directory:', e.message);
}

// Try to use AdmZip or built-in approach
try {
  const AdmZip = require('adm-zip');
  console.log('[v0] AdmZip available');
  
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(__dirname, true);
  console.log('[v0] Extraction successful with AdmZip!');
  
  const filesAfter = fs.readdirSync(__dirname);
  console.log('[v0] Files after extraction:', filesAfter.filter(f => !f.startsWith('.')).slice(0, 20));
} catch (e) {
  console.log('[v0] AdmZip not available or error:', e.message);
}
