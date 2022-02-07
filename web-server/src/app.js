const path = require('path');
const express = require('express');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

const port = 3000;
const url = 'https://nodejs-tutorial-isyzm.run-eu-central1.goorm.io';
const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));


 app.get('/', (req, res) => {
	// renders views/index.hbs
	
	res.render('index', {
		title: 'Weather App',
		name: 'Andrew'
	});	
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		message: "On ths site you won't find much help, yet."
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Goorm' 
	});	
});

app.get('/weather', (req, res) => {
	res.send({
		location: 'Zurich, Switzerland.',
		forecast: 'Gray and cold...'
	});
});

app.listen(port, () => {
	console.log(`Listening on port ${port} at ${url}`);
});