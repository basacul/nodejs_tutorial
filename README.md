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

- [Documentation on file system](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html)

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