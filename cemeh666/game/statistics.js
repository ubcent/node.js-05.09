const fs    = require('fs');
const _     = require('lodash');
const Table = require('cli-table');
const minimist  = require('minimist');
const argv      = minimist(process.argv.slice(2));

function getFile(){
    let path = './logs/gameLog.log';

    return new Promise((resolve, reject) =>{
        fs.readFile(path, 'utf8', (err, data) => {
            if(err) {
                reject(err);
            }

            resolve(data);
        });
    })

}

async function getStatistics(player) {

    try{
        let file = await getFile();
        file = file.substring(0, file.length - 1);
        file = '['+file+']';
        let json = JSON.parse(file);
        const statistics = {
            'head' : [
                'Игрок',
                'Количество побед',
                'Количество поражений',
                'Начало игры',
                'Окончание игр',
            ],
            'players': {}
        };
        var table = new Table({
            head: statistics.head
        });

        _.each(json, (val)=>{
            if(player && player !== val.player)
                return true;

            if(!statistics['players'][val.player]){
                statistics['players'][val.player] = {
                    'win'  : 0,
                    'lose' : 0,
                    'dt_start' : val.time,
                    'dt_end'   : val.time,
                }
            }

            statistics['players'][val.player]['win']  = (val.result)  ? ++statistics['players'][val.player]['win']  : statistics['players'][val.player]['win'];
            statistics['players'][val.player]['lose'] = (!val.result) ? ++statistics['players'][val.player]['lose'] : statistics['players'][val.player]['lose'];
            statistics['players'][val.player]['dt_start'] = val.time < statistics['players'][val.player]['dt_start'] ? val.time : statistics['players'][val.player]['dt_start'];
            statistics['players'][val.player]['dt_end']   = val.time > statistics['players'][val.player]['dt_end']   ? val.time : statistics['players'][val.player]['dt_end'];
        });

        _.each(statistics.players, (val, player)=>{
            table.push(
                [player, val.win, val.lose, val.dt_start, val.dt_end]
            );
        });

        console.log(table.toString());
        if(player){
            console.log("Статистика игрока:", player);
        }

    }catch (e) {
        console.log('Ошибка чтения файла');
        console.log(e);
    }
}

console.log('Для вывода статистики по игроку наберите (--player=name)');
let player = argv.player ? argv.player : null;

getStatistics(player);
