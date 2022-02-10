const request = require('request');
const access_keyWeatherStack = "4eb0b13f2e2b030bfaf2a69f55f3ede9";
const urlWeatherStack = `http://api.weatherstack.com/current?access_key=${access_keyWeatherStack}&query=`;

const forecast = ({ location, latitude, longitude}, callback) => {

	const url = `${urlWeatherStack}${latitude},${longitude}&units=m`;

	request({url, json: true}, (error, { body} ) => {
		if(error){
			callback('Unable to connect to weather service.', undefined);
		}else if(body.error){
			callback('Unable to find location.', undefined);
		}else{
			const { temperature, weather_descriptions, feelslike } = body.current;
			callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature}°C out. It feels like ${feelslike}°C out.`);
		}
	});
};

module.exports = forecast;
