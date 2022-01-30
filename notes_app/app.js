const yargs = require('yargs');
const notes = require('./notes.js');



// node app --version
yargs.version('1.1.0');

// node app list
yargs.command({
	command: 'list',
	describe: 'List the notes.',
	handler(){notes.listNotes();}
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
	handler(argv){
		notes.addNote(argv.title, argv.body);
	}
});

// node app remove
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		notes.removeNote(argv.title);
	}
});

// node app read
yargs.command({
	command: 'read',
	describe: 'Read the note.',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		notes.readNote(argv.title);
	}
});


yargs.argv; // in order to run but not secure