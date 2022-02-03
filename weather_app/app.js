const geocode = require('./utils/geocode.js');
const access_keyWeatherStack = "4eb0b13f2e2b030bfaf2a69f55f3ede9";

const urlWeatherStack = `http://api.weatherstack.com/current?access_key=${access_keyWeatherStack}&query=`;



geocode('Zurich', (error, data) => {
	// console.log('Error', error); // for testing
	console.log('Data', data);
});


