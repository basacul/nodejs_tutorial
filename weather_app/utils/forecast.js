const request = require('request');
const access_keyWeatherStack = "4eb0b13f2e2b030bfaf2a69f55f3ede9";
const urlWeatherStack = `http://api.weatherstack.com/current?access_key=${access_keyWeatherStack}&query=`;

const forecast = (latitude, longitude, callback) => {

	const url = `${urlWeatherStack}${latitude},${longitude}&units=m`;

	request({url:url, json: true}, (error, response) => {
		if(error){
			callback('Unable to connect to weather service.', undefined);
		}else if(response.body.error){
			callback('Unable to find location.', undefined);
		}else{
			const { temperature, weather_descriptions, feelslike } = response.body.current;

			callback(undefined,`${weather_descriptions[0]}. It is currently ${temperature}°C out. It feels like ${feelslike}°C out.`);
		}
	});
};

module.exports = forecast;
/*
const coordinates = `${center[1]},${center[0]}`;
			 
const url2 = `${urlWeatherStack}${coordinates}&units=m`		 
request({url: url2, json: true}, (error, response2) => {
	if(error){
		console.log(error);
	}else if(response2.body.error){
		console.log('Something went wrong with weather stack api.');
	}else{

		const { temperature, weather_descriptions, feelslike } = response2.body.current;

		console.log(`${place_name}. ${weather_descriptions[0]}. It is currently ${temperature}째C out. It feels like ${feelslike}째C out.`);
	}
});
*/