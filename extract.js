import fs from 'fs';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

// Use unzipper package or built-in
const unzipper = await import('unzipper');

const zipPath = '/vercel/share/v0-project/learnhub-export.zip';
const extractPath = '/vercel/share/v0-project';

console.log('[v0] Extracting ZIP file...');

createReadStream(zipPath)
  .pipe(unzipper.Extract({ path: extractPath }))
  .on('close', () => {
    console.log('[v0] Extraction complete!');
    process.exit(0);
  })
  .on('error', (err) => {
    console.error('[v0] Extraction error:', err);
    process.exit(1);
  });
