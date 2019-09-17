const readline = require('readline');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

let logname = 'log.txt'

if (argv.l){
  logname = argv.l;
}

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Input 1 or 2 to guess. Input stop to quit');
fs.appendFile (logname, 'g\n', () => {

});

rl.on('line', (inpt) => {
  let coin = (Math.floor(Math.random() * 2) + 1).toString();
  if (inpt === 'stop'){
    rl.close();
  } else if (inpt === coin){
    console.log('You won :)');
    fs.appendFileSync (logname, '1\n');
  } else {
    console.log('You lost :(');
    fs.appendFileSync (logname, '0\n');
  }
});