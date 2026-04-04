import zipfile
import os

zip_path = '/vercel/share/v0-project/learnhub-export.zip'
extract_path = '/vercel/share/v0-project'

if os.path.exists(zip_path):
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)
    print(f"Successfully extracted {zip_path} to {extract_path}")
    print("Contents:")
    for root, dirs, files in os.walk(extract_path):
        level = root.replace(extract_path, '').count(os.sep)
        indent = ' ' * 2 * level
        print(f'{indent}{os.path.basename(root)}/')
        subindent = ' ' * 2 * (level + 1)
        for file in files[:10]:  # limit to first 10 files per directory
            print(f'{subindent}{file}')
else:
    print(f"ZIP file not found at {zip_path}")
