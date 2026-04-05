const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  const cwd = '/home/user';
  const zipPath = path.join(cwd, 'learnhub-export.zip');
  
  console.log('[v0] Current directory:', cwd);
  console.log('[v0] ZIP path:', zipPath);
  console.log('[v0] ZIP exists:', fs.existsSync(zipPath));
  
  if (fs.existsSync(zipPath)) {
    const stats = fs.statSync(zipPath);
    console.log('[v0] ZIP file size:', stats.size, 'bytes');
    
    // Try unzip command with verbose output
    console.log('[v0] Attempting unzip...');
    const output = execSync(`unzip -t "${zipPath}" 2>&1 | head -20`, { encoding: 'utf-8', stdio: 'pipe', cwd: cwd });
    console.log('[v0] Unzip test result:', output);
    
    // If test passed, extract
    execSync(`unzip -q "${zipPath}"`, { cwd: cwd });
    console.log('[v0] Extraction successful!');
    
    // List extracted files
    const files = fs.readdirSync(cwd);
    console.log('[v0] Files in directory:', files.filter(f => !f.startsWith('.')).slice(0, 15));
  }
} catch (error) {
  console.error('[v0] Error:', error.message);
}
