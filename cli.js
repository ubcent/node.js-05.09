const minimist = require('minimist');
const argv = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
  }
});

console.log(argv);
console.log(process.env);