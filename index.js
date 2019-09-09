// CommonJS
const ansi = require('ansi');

const cursor = ansi(process.stdout);

cursor.blue().bold().underline().bg.hex('#ff00ff').write('Hello world!').reset().bg.reset().write('\n');