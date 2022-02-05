const http = require('http');

const access_keyWeatherStack = "4eb0b13f2e2b030bfaf2a69f55f3ede9";
const urlWeatherStack = `http://api.weatherstack.com/current?access_key=${access_keyWeatherStack}&query=`;
const url = `${urlWeatherStack}40,-75&units=m`;

const request = http.request(url, (response) => {
	let data = '';
	
	// fires when data comes in
	response.on('data', (chunk) => {
		data += chunk.toString();
	});
	
	// when finished
	response.on('end', () => {
		const body = JSON.parse(data);
		console.log(body);
	});
});

request.on('error', (error) => {
	console.log('An error', error);
});
request.end();
