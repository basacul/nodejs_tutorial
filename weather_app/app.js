const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const argumentsMapbox = Array.from(process.argv);
argumentsMapbox.shift(); 
argumentsMapbox.shift();

if(argumentsMapbox.length > 0){
	var query = "";
	argumentsMapbox.forEach(argument => {
		query += `${argument} `
	});
	query = query.substring(0, query.length - 1);
	geocode(query, (error, data) => {
		// console.log('Error', error); // for testing
		// console.log('Data', data);
		if(error){
			console.log(error);
		}
		forecast(data.latitude, data.longitude, (error, response) => {

			console.log(`${data.location}. ${response}`);
		});
	});
} else {
	console.log('No location provided')
}