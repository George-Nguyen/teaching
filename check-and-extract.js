const fs = require('fs');
const path = require('path');

// Use absolute path
const projectDir = '/vercel/share/v0-project';
const zipPath = path.join(projectDir, 'learnhub-export.zip');

console.log('[v0] Project directory:', projectDir);
console.log('[v0] Looking for ZIP at:', zipPath);
console.log('[v0] ZIP exists:', fs.existsSync(zipPath));

// List files in project directory
try {
  const files = fs.readdirSync(projectDir);
  console.log('[v0] Files in directory:', files.filter(f => !f.startsWith('.')).slice(0, 20));
} catch (e) {
  console.error('[v0] Error reading directory:', e.message);
}

// Try to use AdmZip or built-in approach
try {
  const AdmZip = require('adm-zip');
  console.log('[v0] AdmZip available');
  
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(projectDir, true);
  console.log('[v0] Extraction successful with AdmZip!');
  
  const filesAfter = fs.readdirSync(projectDir);
  console.log('[v0] Files after extraction (first 20):', filesAfter.filter(f => !f.startsWith('.')).slice(0, 20));
} catch (e) {
  console.log('[v0] AdmZip not available or error:', e.message);
}
