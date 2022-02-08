const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();


// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
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
		name: 'Andrew',
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

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Help',
		name: 'Andrew',
		message: "Help article not found."
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Andrew',
		message: "Page not found"
	});
});

const port = 3000;
const url = 'https://nodejs-tutorial-isyzm.run-eu-central1.goorm.io';
app.listen(port, () => {
	console.log(`Listening on port ${port} at ${url}`);
});