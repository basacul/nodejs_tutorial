# Readme
Udemy course "The Complete Node.js Developer Course" on goorm.io: ubuntu 18.04 and node v16.13.2.

## Section 1 Introduction

### Environment

Running on macOS Big Sur with node v16.13.0 LTS and using visual studio code v1.62.2.

And running node instance on goorm.io.

## Section 2 Basic Information

### The v8 Javascript Engine

The engine runs on chrome and node, but both may have different attributes and commands based on their context. Here an snippet view

| Node | Chrome |  
| ---- | :------: |  
| global | window |
| process | document |

> process.exit() kills the current node session in the terminal.

### NPM

At npmhs.com you can find tons of packages to help you build and create.

## Notes App: Sections 3, 4 and 5:

The node module system is necessary to work with the file system with synchronous and asynchronous approaches. The folder ./notes_app includes code from this section.

- [Documentation on file system](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html)  
- [Documentation on chalk](https://github.com/chalk/chalk)  
- [Documentation on yargs](https://github.com/yargs/yargs)  
- [Documentation on node inspect](https://nodejs.org/api/inspector.html)  
### Require

You can define variables and functions in one file. "module.exports" helps you export definitions in one to another by stating "require" in the desired file.
````
// utils.js
...
module.exports = ...
...
// app.js
require('.../utils.js');
````

### Basic information
Via "npm init" you generate a package.json file, where you need to apply double quotes for the variables. JSON requires double quotes.

By the way, so far, node does not support the ES6 syntax "import something from 'something'", if the instructor is correct.

If a package.json with the needed dependencies exist, with command "npm install" all necessary packages are installed.

"npm install package@X.X.X -g" installs a package globally and not listed in the package files.

"process.argv" represents an array with two fix values and further arguments
1. Path to node
2. Path to app.js
3. Further passed arguments
````
root@goorm:/anyfolder# node app Whatever1 Whatever2
[ 
  '/usr/bin/node',
  '/workspace/nodejs_tutorial/notes_app/app',
  'Whatever1',
  'Whatever2'
]
````

### Yargs
There exists the package "yargs" that provides useful features and allows me to avoid to implement the needed features.
````
// node app list
yargs.command({
	command: 'list',
	describe: 'List the notes.',
	handler: function(){
		....
	}
});
````

### Arrow function
Arrow function does not bind the value of this such as:
````
const event = {
	name: 'Birthday Party',
	printGuestList: () => { console.log(`Guest list for ${this.name}`);}
};
````
but the following resolves this
````
const event = {
	name: 'Birthday Party',
	printGuestList(){ console.log(`Guest list for ${this.name}`);}
};
````
Funny enough, if an array is defined and you use forEach, then it is not bound to each value - you don't need "this" for each value - such as
````
const event = {
	name: 'Birthday Party',
	guestList: ['Andrew', 'Jenn', 'Mike'],
	printGuestList(){ 
		this.guestList.forEach(guest => console.log(`${guest} is attending ${this.name}`));
	}
};
````

### Debugging
In case I run into errors, there are basic tools, I could use such as
````
1. console.log(variableName);
2. debugger: needs to be added at a specific place in your code and in the terminal run "node inspect applicationName arg1 ...". But you need to inspect on chrome with dev tools enabled :-(.
````

## Weather App: Sections 6, 7, 8 and 9
The node module system is necessary to work with the file system with synchronous and asynchronous approaches. The folder ./weather_app includes code from these sections.

- [Weatherstack - Real-Time World Weather REST API](https://weatherstack.com/)
- [Maps, geocoding and navigation APIs & SDKs | Mapbox](https://www.mapbox.com/)
- [Documentation on npm package request - deprecated!](https://www.npmjs.com/package/request) 
- [Documentation on npm package postman-request - forked from request and maintained](https://www.npmjs.com/package/postman-request) 
- [HTTP | Node.js v15.14.0 Documentation](https://nodejs.org/docs/latest-v15.x/api/http.html) 
- [HTTPS | Node.js v15.14.0 Documentation](https://nodejs.org/docs/latest-v15.x/api/https.html) 
- [Express - Node.js web application framework](http://expressjs.com/)
- [Path | Node.js v16.13.2 Documentation](https://nodejs.org/dist/latest-v16.x/docs/api/path.html)

### Asynchronous Basics
setTimeout allows me to specify when a function is called, but it can also habe some weird behavior such as this:
````
console.log('Starting');


setTimeout(() => {
	console.log('2 Second Timer.');
}, 2000);


setTimeout(() => {
	console.log('0 Second Timer');
}, 0);

console.log('Stopping');

OUTPUT:
Starting
Stopping
0 Second Timer
2 Second Timer.
````
The reason for this behavior is explained in the next subsection.

### Call Stack, Callback Queue and Event Loop
Watch this video again, when you are done with the weather app in order to recap the content.

setTimeout is not a javascript implementation, but in C++. Thus setTimeout is registered in the Node API, while the items in the stack are executed (because node is non-blocking).
When main is removed from the stack, setTimeout(..., 0) is added onto the stack. Because console.log('Stopping') is added on top of, it is executed before setTimeout(..., 0).
The callback queue checks what is ready to be executed in the Node API and adds setTimeout(..., 0),iff the main is done and consequently the stack is empty.

script -> call stack -> node api -> callback queue -> call stack -> ... -> main is done --> items of callback added to the stack --> execution of setTimeout(..., 0) --> ... -> execution of setTimeout(..., 2000)

### HTTP Request: Weatherstack
Along these sections we will use the following query on api.weatherstack.com with the deprecated package *request*
````
http://api.weatherstack.com/current?access_key=MYAPIKEAY&query=37.8267,-122.4233&units=m|f|s
````
With the api of mapbox we can fetch the coordinates by a given city. 

### Handling Errors
There is the issue, where there is no internet connection. In this case you would not get an error, why you should test the response as well - what I already did.

I should pay attention, that the url is correctly spelled and I pass all the necessary arguments. Otherwise, the data I retrieve might be undefined. Thus catch those errors as well.

### Callback Function
Not all callback functions are asychronous such as setTimeout, a node provided api. Callback functions such as filter (a plain javascript function) are synchronous.

By using callback functions I can resolve the problem of undefined variables, because main needs to finish before the callback function returns a value: 
````
onst geocode = (address, callback) => {
	setTimeout(() => {
		const data = {
		latitude: 0,
		longitude: 0
		};
	
		return data;
	}, 2000);
};

const data = geocode('Philadelphia');
console.log(data);
// output undefined
````

By using callback functions appropriately we resolve the issue of undefined variables. By simply calling the callback ;-).
````
// solution
const geocode = (address, callback) => {
	setTimeout(() => {
		const data = {
		latitude: 0,
		longitude: 0
		};
	
		callback(data);
	}, 2000);
};

geocode('Philadelphia', (data) => {
	console.log(data)
});
````
The way I solved the problem creates too many nested blocks and there are better solutions. The solution consists in externalizing a lot of code in other places, such that I get
````
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

geocode('Zurich', (error, data) => {
	// console.log('Error', error); // for testing
	// console.log('Data', data);
	if(error){
		console.log(error);
	}
	forecast(data.latitude, data.longitude, (error, response) => {
  		
  		console.log(`${data.location}. ${response}`);
	});
});

````

### ES6
Destructuring works also as arguments in function definitions.
````
// Object property shorthand

const name = 'Andrew';
const age = 27;

// attribute name must be equal to the variable I defined
const user = {
	name,
	age,
	location: 'Philadelphia'
}

console.log(user);
#output: { name: 'Andrew', age: 27, location: 'Philadelphia' }

// Object destructuring

const product = {
	label: 'Red notebook',
	price: 3,
	stock: 201,
	salePrice: undefinded
};

// rating does not exist, if it exists then the default is not used!
const { label:productlabel, stock, rating = 5 } = product;
console.log(productlabel, stock, rating);
#output: Red notebook 201 undefined

const transaction = (type, { label, stock }) => {
	console.log(type, label, stock);
};

transaction('order', product);
#output: order Red notebook 201
````

### HTTP requests without a library
There are two core modules in node: HTTP, HTTPS and can be used to set up the server. 
````
const http = require('http');

const url = ....

const request = http.request(url, (response) => {
	let data = '';
	
	// fires when data comes in
	response.on('data', (chunk) => {
		data += chunk.toString();
	});
	
	// when finished
	response.on('end', () => {
		const body = JSON.parse(data);
		console.log(body);
	});
});

request.on('error', (error) => {
	console.log('An error', error);
});
request.end();
````
### Express
Express is simply a function.