const fs = require('fs');
const chalk = require('chalk');
const success = chalk.green.inverse;
const error = chalk.red.inverse;

const getNotes = function(){
	return 'Your notes...';
}

const addNote = function(title, body){
	const notes = loadNotes();
	
	const duplicateNotes = notes.filter(note => {return note.title === title;});
	
	if(duplicateNotes.length <= 0){
		notes.push({
			title: title,
			body: body
		});
		console.log(success('New note added.'));
	}else{
		console.log(error('Note title taken.'));
	}
		
	
	saveNotes(notes);
}

const removeNote = function(title){
	const notes = loadNotes();

	const filteredNotes = notes.filter(note => { 
		return note.title !== title	
	});
		
	if(filteredNotes.length < notes.length){
		console.log(success(`Note with the title "${title}" has been removed.`));
	}else{
		console.log(error(`Note with the title "${title}" does not exist.`));
	}
		
	saveNotes(filteredNotes);
}

// takes as argument the array of objects
const saveNotes = function(notes){
	fs.writeFileSync('./notes.json', JSON.stringify(notes));
}

// reads the notes.json file an return an array of objects
const loadNotes = function(){
	try{
		const dataBuffer = fs.readFileSync('./notes.json'); // represents binary
		return JSON.parse(dataBuffer.toString());
	}catch (e){
		return []; // notes.json does not exist: thus return empty array
	}

	// fs.writeFileSync('./1-json.json',JSON.stringify(data));
}

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote
};