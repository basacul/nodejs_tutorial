const fs = require('fs');

const dataBuffer = fs.readFileSync('./1-json.json'); // represents binary
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
data.name = 'Lucas';
data.age = '23';
fs.writeFileSync('./1-json.json',JSON.stringify(data));