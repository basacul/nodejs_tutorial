const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
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
		title: 'Weather',
		name: 'Geisha'
	});	
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Geisha',
		message: "On ths site you won't find much help, yet."
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Geisha' 
	});	
});

app.get('/weather', (req, res) => {
	if(!req.query.address){
		return res.send({
			error: 'You must provide an address.'
		})
	}
	
	geocode(req.query.address, (error, data = {}) => {
		// console.log('Error', error); // for testing
		// console.log('Data', data);
		if(error){
			return res.send({ error });
		}
		
		forecast(data, (error, response) => {
			if(error){
				return res.send({ error	});
			}
			
			res.send({
				forecast: response,
				location: data.location, 
				address: req.query.address
			});
		});
	});

});

// by return you stop the code afterwards and is a common approach in express
app.get('/products', (req, res) => {
	if(!req.query.search){
		return res.send({
			error: 'You mus provide a search term'
		})
	}
	console.log(req.query);
	res.send({
		products: []
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Help',
		name: 'Geisha',
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