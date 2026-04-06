#!/usr/bin/env python3
import zipfile
import os
import sys

# The ZIP file is always in the v0 project directory
# Try multiple possible locations
zip_candidates = [
    '/vercel/share/v0-project/learnhub-export.zip',
    os.path.expanduser('~/learnhub-export.zip'),
    os.path.join(os.getcwd(), 'learnhub-export.zip'),
]

zip_path = None
for candidate in zip_candidates:
    print(f"[v0] Checking: {candidate}")
    if os.path.exists(candidate):
        zip_path = candidate
        print(f"[v0] Found ZIP at: {zip_path}")
        break

if not zip_path:
    print("[v0] ZIP file not found at any location")
    print(f"[v0] Current working directory: {os.getcwd()}")
    print(f"[v0] Candidates checked: {zip_candidates}")
    exit(1)

# Extract to current working directory
extract_dir = os.getcwd()
print(f"[v0] ZIP size: {os.path.getsize(zip_path)} bytes")
print(f"[v0] Extracting to: {extract_dir}")

try:
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        print(f"[v0] Extracting {os.path.basename(zip_path)}...")
        # Get list of files to verify it's a valid ZIP
        file_list = zip_ref.namelist()
        print(f"[v0] ZIP contains {len(file_list)} files")
        print(f"[v0] Sample files: {file_list[:5]}")
        
        # Extract all
        zip_ref.extractall(extract_dir)
        print(f"[v0] Extraction complete!")
        
        # List what was extracted
        extracted = os.listdir(extract_dir)
        print(f"[v0] Directory now contains {len(extracted)} items")
        non_hidden = [f for f in sorted(extracted) if not f.startswith('.')]
        print(f"[v0] Contents (first 20): {non_hidden[:20]}")
except Exception as e:
    print(f"[v0] Error: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
