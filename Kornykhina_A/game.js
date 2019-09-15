const readline = require('readline');
const minimist = require('minimist');
const boxen = require('boxen');
const fs = require('fs');
const argv = minimist(process.argv.slice(2), {
    alias: {
        score: 'stat',
    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const game = {
  data: {
    gamesCounter:0,
    wins: 0,
    loses: 0,
    itWasOne:0,
    itWasTwo:0,
    answer:"" 
  },
  getRandom: function() {
    return Math.round((Math.random()*1 +1));
  },
  init: function() {
    if (argv.s) {
      this.gameStat();
    }
    this.data.gamesCounter++;
    const number = this.getRandom();
    if (number === 1) {
      this.data.itWasOne++;
    } else {
      this.data.itWasTwo++;
    }
    rl.question('Угадайте 1 или 2?', (answer) => {
       this.data.answer = +answer;
       if (this.data.answer === number) {
        this.data.wins++;
        console.log('Верно! Вы выиграли');   
      } else {
        this.data.loses++;
        console.log('Не угадали');      
      }
        this.statWrite();
        rl.close();
    }); 
  
    
  },
  statWrite: function() {
        fs.readFile('./stat.json', "utf8", (err, data) => {
          if (err) throw err;
          let dat = JSON.parse(data);
          dat.gamesCounter += this.data.gamesCounter;
          dat.wins += this.data.wins;
          dat.loses += this.data.loses;
          dat.itWasOne += this.data.itWasOne;
          dat.itWasTwo += this.data.itWasTwo;

        fs.writeFile('./stat.json', JSON.stringify(dat, null, 4), err => {
            if (err) throw err;
            console.log('Статистика обновлена');
        });
      });

  }, 
  gameStat: function() {
    fs.readFile('./stat.json', "utf8", (err, data) => {
      if (err) throw err;
      let dat = JSON.parse(data);
      console.log(boxen(
      `Количество сыгранных игр - ${dat.gamesCounter}
Количество побед - ${dat.wins}
Количество поражений - ${dat.loses}
Столько раз загадывалось число 1 - ${dat.itWasOne}
Столько раз загадывалось число 2 - ${dat.itWasTwo}`, 
        {padding: 1,
        margin: 1, 
        borderStyle: 'bold',
        backgroundColor: 'blue',
        borderColor:'magentaBright',}));
      rl.close();

    })
  }
};

console.log(game.init());

