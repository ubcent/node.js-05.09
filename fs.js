const fs = require('fs');
const Task = require('./models/task');

fs.readFile('./package.json', 'utf8', (err, data) => {
  if(err) {
    throw err;
  }

  console.log(data);
});