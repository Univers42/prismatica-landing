import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runBuild() {
  try {
    await build({
      root: path.resolve(__dirname, './app'),
      configFile: path.resolve(__dirname, './app/vite.config.ts'),
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
    }
    process.exit(1);
  }
}

runBuild();
