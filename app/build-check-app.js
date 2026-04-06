import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runBuild() {
  try {
    await build({
      root: __dirname,
      configFile: path.resolve(__dirname, './vite.config.ts'),
    });
    console.log('Build successful!');
  } catch (err) {
    console.error('Build failed with error:');
    if (err.errors) {
      err.errors.forEach((e, i) => {
        console.error(`Error ${i}:`, e);
      });
    } else {
      console.error(err);
      if (err.stack) console.error(err.stack);
    }
    process.exit(1);
  }
}

runBuild();
