#!/usr/bin/env python3
import zipfile
import os
import glob

# Find the ZIP file
zip_files = glob.glob('*.zip')
print(f"[v0] Found ZIP files: {zip_files}")

if not zip_files:
    print("[v0] No ZIP files found in current directory")
    print(f"[v0] Current directory: {os.getcwd()}")
    print(f"[v0] Directory contents: {os.listdir('.')}")
    exit(1)

zip_path = zip_files[0]
print(f"[v0] Using ZIP file: {zip_path}")
print(f"[v0] ZIP file exists: {os.path.exists(zip_path)}")
print(f"[v0] ZIP file size: {os.path.getsize(zip_path)} bytes")

try:
    # Extract the ZIP
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        print(f"[v0] Extracting {zip_path}...")
        zip_ref.extractall('.')
        print(f"[v0] Extraction successful!")
        
        # List extracted files
        extracted_files = os.listdir('.')
        print(f"[v0] Directory contents after extraction:")
        for f in sorted(extracted_files)[:20]:
            if not f.startswith('.'):
                print(f"  - {f}")
except Exception as e:
    print(f"[v0] Error: {e}")
    import traceback
    traceback.print_exc()
