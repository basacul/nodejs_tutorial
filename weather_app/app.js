const request = require('request');
const access_keyWeatherStack = "4eb0b13f2e2b030bfaf2a69f55f3ede9";
const access_tokenMapbox = "pk.eyJ1IjoiYmFzYWN1bCIsImEiOiJja3o0bXUydmMwNXJvMm5xd3RxbXBhbHZ6In0.-Ay_rUkpeYzIZI8jvFNxgA";
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
	 
	request({url: url, json: true}, (error, response1) => {
		if(error){
			console.log(error);
		}else if(response1.body.error){
			console.log("Something went wrong with mapbox api.");
		}else{
			
			const { place_name, center  } = response1.body.features[0];
			if(center.length <= 0){
				console.log('Unable to find location')
			}else{
				const coordinates = `${center[1]},${center[0]}`;
			 
				const url2 = `${urlWeatherStack}${coordinates}&units=m`		 
				request({url: url2, json: true}, (error, response2) => {
					if(error){
						console.log(error);
					}else if(response2.body.error){
						console.log('Something went wrong with weather stack api.');
					}else{

						const { temperature, weather_descriptions, feelslike } = response2.body.current;

						console.log(`${place_name}. ${weather_descriptions[0]}. It is currently ${temperature}°C out. It feels like ${feelslike}°C out.`);
					}
				});
			}
			
		
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


