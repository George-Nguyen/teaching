const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  console.log('[v0] Attempting ZIP extraction...');
  const zipPath = '/vercel/share/v0-project/learnhub-export.zip';
  const extractPath = '/vercel/share/v0-project';
  
  // Use unzip command
  execSync(`cd ${extractPath} && unzip -q learnhub-export.zip`);
  console.log('[v0] Extraction successful!');
  
  // List extracted files
  const files = fs.readdirSync(extractPath);
  console.log('[v0] Directory contents:', files);
} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}
