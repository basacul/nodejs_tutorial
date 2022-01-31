const request = require('request');

const url = "http://api.weatherstack.com/current?access_key=MYAPIKEY&query=37.8267,-122.4233"

request({url: url}, (error, response) => {
	if(error){
		console.log(error);
	}else{
		const data = JSON.parse(response.body);
		console.log(data.current);
	}
	
});