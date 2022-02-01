const request = require('request');

const urlWeatherStack = `http://api.weatherstack.com/current?access_key=${access_keyWeatherStack}&query=`;
const urlMapbox= "https://api.mapbox.com/geocoding/v5/mapbox.places/" // Los%20Angeles.json?access_token=&limit=1"

const argumentsMapbox = Array.from(process.argv);
argumentsMapbox.shift(); 
argumentsMapbox.shift();

if(argumentsMapbox.length > 0){

	var query = "";
	argumentsMapbox.forEach(argument => {
		query += `${argument}%20`
	});
	query = query.substring(0, query.length - 3);
	const url = `${urlMapbox}${query}.json?access_token=${access_tokenMapbox}&limit=1`;
	console.log(url);
	request({url: url, json: true}, (error, response) => {
		if(error){
			console.log(error);
		}else{
			
			const { place_name, center  } = response.body.features[0];
			console.log(center);
			console.log(place_name);
			const coordinates = `${center[1]},${center[0]}`;
			console.log(coordinates);
			const url2 = `${urlWeatherStack}${coordinates}]units=m`
			console.log(url2);
			request({url: url2, json: true}, (error, response) => {
				if(error){
					console.log(error);
				}else{
					const { temperature, weather_descriptions, feelslike } = response.body.current;
					console.log(`${place_name}. ${weather_descriptions[0]}. It is currently ${temperature}°C out. It feels like ${feelslike}°C out.`);
				}
			});
		}
	});

	
	// we want to get a response as json without having to parse it, thus json: true
	/*
	request({url: urlWeatherStack, json: true}, (error, response) => {
		if(error){
			console.log(error);
		}else{
			const { temperature, weather_descriptions, feelslike } = response.body.current;

			console.log(`${weather_descriptions[0]}. It is currently ${temperature}°C out. It feels like ${feelslike}°C out.`);
		}
	});
	*/
}


