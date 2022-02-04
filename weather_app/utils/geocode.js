const request = require('request');
const urlMapbox= "https://api.mapbox.com/geocoding/v5/mapbox.places/" // Los%20Angeles.json?access_token=&limit=1"
const access_tokenMapbox = "pk.eyJ1IjoiYmFzYWN1bCIsImEiOiJja3o0bXUydmMwNXJvMm5xd3RxbXBhbHZ6In0.-Ay_rUkpeYzIZI8jvFNxgA";

const geocode = (address, callback) => {
	const url = `${urlMapbox}${encodeURIComponent(address)}.json?access_token=${access_tokenMapbox}&limit=1`;

	request({url: url, json: true}, (error, response) => {
		if(error){
			callback('Unable to connect to locations services.', undefined);
		}else if(response.body.features.length === 0){
			callback('Unable to find location. Try another search', undefined);
		}else{
			callback(undefined, {
				latitude: response.body.features[0].center[1],
				longitude: response.body.features[0].center[0],
				location: response.body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;

/*
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

						console.log(`${place_name}. ${weather_descriptions[0]}. It is currently ${temperature}째C out. It feels like ${feelslike}째C out.`);
					}
				});
			}
		}
	});	
}
*/
