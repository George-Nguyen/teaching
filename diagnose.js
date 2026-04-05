const fs = require('fs');
const path = require('path');

console.log('[v0] CWD:', process.cwd());
console.log('[v0] __dirname:', __dirname);
console.log('[v0] __filename:', __filename);

// Check various paths
const paths = [
  __dirname,
  process.cwd(),
  '/vercel/share/v0-project',
  '.',
  '..',
];

paths.forEach(p => {
  console.log(`\n[v0] Checking path: ${p}`);
  try {
    const resolved = path.resolve(p);
    console.log(`[v0]   Resolved to: ${resolved}`);
    console.log(`[v0]   Exists: ${fs.existsSync(resolved)}`);
    if (fs.existsSync(resolved)) {
      const files = fs.readdirSync(resolved);
      console.log(`[v0]   Contents (first 10):`, files.slice(0, 10).join(', '));
      
      // Look for ZIP
      const hasZip = files.some(f => f.includes('learnhub'));
      console.log(`[v0]   Has learnhub files: ${hasZip}`);
    }
  } catch (e) {
    console.log(`[v0]   Error: ${e.message}`);
  }
})
