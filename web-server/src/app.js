const express = require('express');

const app = express();
const port = 3000;
const url = 'https://nodejs-tutorial-isyzm.run-eu-central1.goorm.io';

app.get('/', (req, res) => {
	res.send('Welcome to my site.');
});

app.get('/help', (req, res) => {
	res.send('Unfortunately, I cannot help you...');
});

app.get('/about', (req, res) => {
	res.send('There is nothing to tell about this site, yet...');	
});

app.get('/weather', (req, res) => {
	res.send('Welcome to the weather api.');
});

app.listen(port, () => {
	console.log(`Listening on port ${port} at ${url}`);
});