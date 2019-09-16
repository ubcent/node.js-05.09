const request = require('request');
const cheerio = require('cheerio');

const program = () => {
	
	const moiKrug = 'https://moikrug.ru/vacancies?q=node.js&currency=rur&location=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&city_id=678&with_salary=1';

	request(moiKrug, (err, response, body) => {

		if (!err && response.statusCode === 200) {
			const $ = cheerio.load(body);

			console.log('\nВакансии со знанием технологии Node.js в Москве по данным сервиса "Мой круг":\n\n');

			$('.show_marked').children('.job').each(function() {
				let job = $(this).find('.inner');

				console.log(
					job.children('.date').text() + '\n' +
					job.children('.info').text() + '\n' +
					job.find('.salary').text() + '\n'
					);

				/*
					как вывести содержимое '.info' без '.salary'
					('.salary' - последний дочерний элемент в '.info')
					так и не понял, пробовал not() и nextUntil(), не получилось:  

					job.children('.info').not('.salary').text();
					job.children('.info').nextUntil('.salary').text();
					job.children('.info').nextUntil('.v2').text();	- элемент '.v2' стоит перед '.salary'
				*/

			});

		} else if (err) {
			console.log(err);
			process.exit(1);
		}
	});
};

program();