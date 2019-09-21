const request = require('request');
const cheerio = require('cheerio');

const program = () => {
	
	const url = 'https://moikrug.ru/vacancies?q=node.js&currency=rur&location=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&city_id=678&with_salary=1';

	request(url, (err, response, body) => {

		if (!err && response.statusCode === 200) {
			const $ = cheerio.load(body);

			console.log('\nВакансии со знанием технологии Node.js в Москве по данным сервиса "Мой круг":\n\n');

			$('.job').each(function() {
				const job = $(this).find('.inner');
				console.log(`${job.children('.date').text()}\n${job.find('.title').text()}\n${job.find('.salary').text()}\n`);
			});

		} else if (err) {
			console.log(err);
			process.exit(1);
		}
	});
};

program();
