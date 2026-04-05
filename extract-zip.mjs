import { createReadStream } from 'fs';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream/promises';

// Since we don't have unzipper available, let's use a different approach
// Check if the directory structure already exists from extraction
import { existsSync, readdirSync, statSync } from 'fs';

const projectRoot = '/vercel/share/v0-project';
const zipPath = resolve(projectRoot, 'learnhub-export.zip');

console.log('[v0] Checking directory structure...');
console.log('[v0] Project root:', projectRoot);
console.log('[v0] Files in project root:');

try {
  const files = readdirSync(projectRoot);
  files.forEach(file => {
    const filePath = resolve(projectRoot, file);
    const stat = statSync(filePath);
    console.log(`  - ${file} (${stat.isDirectory() ? 'directory' : 'file'}, size: ${stat.size})`);
  });
} catch (err) {
  console.error('[v0] Error reading directory:', err.message);
}
