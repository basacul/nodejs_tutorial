const chalk = require('chalk');
const yargs = require('yargs');
const getNotes = require('./notes.js');



// node app --version
yargs.version('1.1.0');

// node app list
yargs.command({
	command: 'list',
	describe: 'List the notes.',
	handler: function(){
		console.log('Listing the notes.');
	}
});

// node app add
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title:{
			describe: 'Note title',
			demandOption: true,  
			type: 'string'  
		},
		body:{
			describe: 'Note body',
			demandOption: true,
			type: 'string'
		}
	},
	handler: function(argv){
		console.log('Adding a new note!', argv);
	}
});

// node app remove
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	handler: function(){
		console.log('Removing the note.');
	}
});

// node app read
yargs.command({
	command: 'read',
	describe: 'Read the note.',
	handler: function(){
		console.log('Reading the note.');
	}
});


yargs.argv; // in order to run but not secure