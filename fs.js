const fs = require('fs');

fs.readFile('./package.json', 'utf8', (err, data) => {
  if(err) {
    throw err;
  }

  console.log(data);
});