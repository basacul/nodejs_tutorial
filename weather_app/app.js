const request = require('request');

const url = "http://api.weatherstack.com/current?access_key=MYAPIKEY&query=37.8267,-122.4233]units=m"

// we want to get a response as json without having to parse it, thus json: true
request({url: url, json: true}, (error, response) => {
	if(error){
		console.log(error);
	}else{
		const { temperature, weather_descriptions, feelslike } = response.body.current;

		console.log(`${weather_descriptions[0]}. It is currently ${temperature}°C out. It feels like ${feelslike}°C out.`);
	}
});