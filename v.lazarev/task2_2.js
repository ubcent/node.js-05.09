const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

var logname = 'log.txt'

if (argv.l){
  console.log(argv);
  logname = argv.l;
}

fs.readFile(logname, (err, data) => {
  let games = 0, rounds = 0, won = 0, lost = 0, winrate = 0, winstreak = 0, losestreak = 0, streak = 0, streak_log = 0;
  if (err){
    throw err;
  }
  data = data.toString();
  for(let i = 0; i < data.length; i++){
    if (data[i] === 'g'){
      games++;
      streak = 0;
    }
    if (data[i] === '1'){
      if (!streak) {
        streak = 0;
        streak_log = 1;
      }
      rounds++;
      won++;
      streak++;
      if (streak > winstreak){
        winstreak = streak;
      }
    }
    if (data[i] === '0'){
      if (streak) {
        streak = 0;
        streak_log = 0;
      }
      rounds++;
      lost++;
      streak++;
      if (streak > losestreak){
        losestreak = streak;
      }
    }
  }
  if (!lost) {
    winrate = won/1;
  } else {
    winrate = won/lost;
  }
  console.log("Games: ", games, " Rounds: ", rounds, " Won: ", won, " Lost: ", lost, " Win/lose: ", winrate, " Longest winning streak: ", winstreak, " Longest losing streak: ", losestreak);
});