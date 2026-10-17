import { fileURLToPath } from 'node:url';
import { basename, dirname, resolve } from 'node:path';
import { rename, rm, stat } from 'node:fs/promises';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const exportDirectory = resolve(projectRoot, 'out');
const targetDirectory = resolve(projectRoot, 'dist');

if (dirname(exportDirectory) !== projectRoot || dirname(targetDirectory) !== projectRoot || basename(targetDirectory) !== 'dist') {
  throw new Error('Refusing to move the static export outside the project root.');
}

if (!(await stat(exportDirectory).catch(() => null))?.isDirectory()) {
  throw new Error('Next.js did not create the expected out/ static export.');
}

await rm(targetDirectory, { recursive: true, force: true });
await rename(exportDirectory, targetDirectory);
console.log('Static export ready in dist/.');
