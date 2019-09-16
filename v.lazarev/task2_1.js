const readline = require('readline');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

var logname = 'log.txt'

if (argv.l){
  console.log(argv);
  logname = argv.l;
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Input 1 or 2 to guess. Input stop to quit");
fs.appendFile (logname, "g\n", () => {

});

rl.on('line', (inpt) => {
  let coin = (Math.floor(Math.random() * 2) + 1).toString();
  if (inpt === 'stop'){
    rl.close();
  } else if (inpt === coin){
    console.log('You won :)');
    fs.appendFile (logname, '1\n', () => {

    });
  } else {
    console.log('You lost :(');
    fs.appendFile (logname, '0\n', () => {

    });
  }
});