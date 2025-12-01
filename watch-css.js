const { spawn } = require('child_process');
const { watch } = require('fs');
const path = require('path');

const styleDir = path.join(__dirname, 'src', 'style');

function buildCSS() {
  console.log('Building CSS...');
  const build = spawn('lightningcss', [
    '--bundle',
    '--targets',
    '>= 0.25%',
    'src/style/style.css',
    '-o',
    'public/style.css'
  ], { stdio: 'inherit' });

  build.on('close', (code) => {
    if (code === 0) {
      console.log('CSS built successfully');
    } else {
      console.error(`CSS build failed with code ${code}`);
    }
  });
}

// Initial build
buildCSS();

// Watch for changes
console.log(`Watching ${styleDir} for changes...`);
watch(styleDir, { recursive: true }, (eventType, filename) => {
  if (filename && filename.endsWith('.css')) {
    console.log(`Detected change in ${filename}`);
    buildCSS();
  }
});
