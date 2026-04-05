const fs = require('fs');
const path = require('path');

// Use actual current working directory where ZIP is located
const projectDir = process.cwd();
const zipPath = path.join(projectDir, 'learnhub-export.zip');

console.log('[v0] Project directory:', projectDir);
console.log('[v0] Looking for ZIP at:', zipPath);
console.log('[v0] ZIP exists:', fs.existsSync(zipPath));

// List files in project directory
try {
  const files = fs.readdirSync(projectDir);
  console.log('[v0] Files in directory (first 20):', files.filter(f => !f.startsWith('.')).slice(0, 20));
} catch (e) {
  console.error('[v0] Error reading directory:', e.message);
}

// Try to use AdmZip
try {
  const AdmZip = require('adm-zip');
  console.log('[v0] AdmZip available, extracting...');
  
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(projectDir, true);
  console.log('[v0] Extraction successful!');
  
  const filesAfter = fs.readdirSync(projectDir);
  console.log('[v0] Files after extraction (first 20):', filesAfter.filter(f => !f.startsWith('.')).slice(0, 20));
} catch (e) {
  console.log('[v0] AdmZip error:', e.message);
}
