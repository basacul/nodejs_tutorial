const path = require('path');
const express = require('express');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

const port = 3000;
const url = 'https://nodejs-tutorial-isyzm.run-eu-central1.goorm.io';
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

// Due to set up index.html, about and help pages these functions are not called anymore
/* app.get('/', (req, res) => {
	res.send('<h1>Weather</h1>');
});

app.get('/help', (req, res) => {
	res.send([{
		name: 'Andrew'
	},{
		name: 'Susan'
	}]);
});

app.get('/about', (req, res) => {
	res.send('<h1>About</h1>');	
});
*/
app.get('/weather', (req, res) => {
	res.send({
		location: 'Zurich, Switzerland.',
		forecast: 'Gray and cold...'
	});
});

app.listen(port, () => {
	console.log(`Listening on port ${port} at ${url}`);
});