const readline = require('readline');
const _  = require('lodash');
const fs = require('fs');

var player = {
    'name' : '',
    'win' : 0,
    'lose' : 0,
};
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Добро пожаловать в игру 'Больше меньше' \nдля прекращения игры в любой момент игры наберите exit\n");

function hello() {
    return new Promise((resolve, reject) => {
        rl.question('Представьтесь: ', (name) => {
            if(name === 'exit')
                reject();
            resolve(name);

        });
    });
}

function rules() {
    return new Promise((resolve, reject) => {
        rl.question('Введите условие > или < 5: ', (conditional) => {
            if(conditional === 'exit')
                reject();

            if(conditional !== '<' && conditional !== '>'){
                return startGame();
            }

            resolve(conditional);
        });
    });

}


function game(rules) {
    let randomScore = _.random(1, 10);

    let logic = (rules === '>') ? randomScore > 5 : randomScore < 5;

    if(logic){
        player.win++;
    }else {
        player.lose++;
    }

    saveLogs(player, logic);

    console.log("----------------");
    console.log("Выпало: ", randomScore);

    return player;

}

function saveLogs(player, result){

    let log = JSON.stringify({
        player: player.name,
        result: result,
        time: new Date(),
    });

    let path = './logs/gameLog.log';
    fs.appendFile(path, log+',', function (err) {
        if (err) throw err;
    });
}

async function startGame() {
    try {
        if(!player.name)
            player.name = await hello();

        let condition  = await rules();
        player =  game(condition);
        console.log("----------------");
        console.log("Игрок: ", player.name);
        console.log("Побед:", player.win);
        console.log("Поражений:", player.lose);
        console.log("----------------");

        return startGame();


    } catch (error) {
        console.log("\nЗавершение игры!");
        rl.close();
    }
}

startGame();