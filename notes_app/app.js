const fs = require('fs');

fs.writeFileSync('notes.txt', 'My name is Andrew.\n');
fs.appendFileSync('notes.txt', 'Appending text\n');
fs.appendFileSync('notes.txt', 'and again.\n');