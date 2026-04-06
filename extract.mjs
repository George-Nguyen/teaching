import fs from 'fs';
import path from 'path';
import { createReadStream, createWriteStream, mkdirSync } from 'fs';
import { pipeline } from 'stream/promises';

// Try to find and extract using native Node APIs
const candidates = [
  '/vercel/share/v0-project/learnhub-export.zip',
  new URL(import.meta.url).pathname.replace('extract.mjs', 'learnhub-export.zip'),
  'learnhub-export.zip',
];

let zipPath = null;
for (const candidate of candidates) {
  console.log(`[v0] Checking: ${candidate}`);
  if (fs.existsSync(candidate)) {
    zipPath = candidate;
    console.log(`[v0] Found ZIP: ${zipPath}`);
    break;
  }
}

if (!zipPath) {
  console.log('[v0] ZIP file not found');
  console.log(`[v0] cwd: ${process.cwd()}`);
  console.log(`[v0] __dirname: ${new URL(import.meta.url).pathname}`);
  process.exit(1);
}

console.log(`[v0] ZIP size: ${fs.statSync(zipPath).size} bytes`);

// Try using adm-zip or unzipper if available
try {
  const AdmZip = (await import('adm-zip')).default;
  console.log('[v0] Using adm-zip...');
  const zip = new AdmZip(zipPath);
  const extractPath = process.cwd();
  zip.extractAllTo(extractPath, true);
  console.log('[v0] Extraction successful!');
  
  const files = fs.readdirSync(extractPath).filter(f => !f.startsWith('.')).slice(0, 20);
  console.log('[v0] Extracted files:', files);
} catch (e) {
  console.log(`[v0] adm-zip error: ${e.message}`);
  
  try {
    const unzipper = await import('unzipper');
    console.log('[v0] Using unzipper...');
    const extractPath = process.cwd();
    await pipeline(
      createReadStream(zipPath),
      unzipper.Extract({ path: extractPath })
    );
    console.log('[v0] Extraction successful!');
    
    const files = fs.readdirSync(extractPath).filter(f => !f.startsWith('.')).slice(0, 20);
    console.log('[v0] Extracted files:', files);
  } catch (e2) {
    console.log(`[v0] unzipper error: ${e2.message}`);
  }
}
