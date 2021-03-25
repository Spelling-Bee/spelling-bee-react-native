#!/usr/bin/env node
const fs = require('fs');

const build = 'node_modules/reanimated-bottom-sheet/lib/module/index.js';
const source = 'node_modules/reanimated-bottom-sheet/src/index.tsx';

function replaceDataInFile(fileName, regex, substitution) {
  fs.readFile(fileName, 'utf8', (readError, data) => {
    if (readError) {
      console.log(readError);
    }
    const result = data.replace(regex, substitution);

    fs.writeFile(fileName, result, 'utf8', writeError => {
      if (writeError) console.log(writeError);
    });
  });
}

replaceDataInFile(
  build,
  'this.isManuallySetValue.setValue(1)',
  'setTimeout(() => this.isManuallySetValue.setValue(1), 0);',
);
replaceDataInFile(
  source,
  'this.isManuallySetValue.setValue(1)',
  'setTimeout(() => this.isManuallySetValue.setValue(1), 0);',
);
