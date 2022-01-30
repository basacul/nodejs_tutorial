const fs = require('fs');
const chalk = require('chalk');
const success = chalk.green.inverse;
const error = chalk.red.inverse;
const inverse = chalk.inverse;

const getNotes = function(){
	return 'Your notes...';
}

const listNotes = () => {
	const notes = loadNotes();
	console.log(inverse('Your list includes the following titles:'));
	notes.forEach(note => console.log(`- ${note.title}`));
};

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find(note => note.title === title);
	
	if(!duplicateNote){
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

const removeNote = (title) => {
	const notes = loadNotes();

	const filteredNotes = notes.filter(note => note.title !== title );
		
	if(filteredNotes.length < notes.length){
		console.log(success(`Note with the title "${title}" has been removed.`));
	}else{
		console.log(error(`Note with the title "${title}" does not exist.`));
	}
		
	saveNotes(filteredNotes);
}

const readNote = function(title){
	const notes = loadNotes();
	const note = notes.find(note => note.title === title);
	if(note){
		console.log(inverse(title));
		console.log(note.body);
	}else{
		console.log(error(`There is no note with the title "${title}".`))
	}

}
// takes as argument the array of objects
const saveNotes = (notes) => {
	fs.writeFileSync('./notes.json', JSON.stringify(notes));
}

// reads the notes.json file an return an array of objects
const loadNotes = () => {
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
	listNotes: listNotes,
	readNote: readNote,
	addNote: addNote,
	removeNote: removeNote
};