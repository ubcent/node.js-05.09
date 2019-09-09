const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('What is your name? ', (response) => {
  console.log('Hi', response);
});