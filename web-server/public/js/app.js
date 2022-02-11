console.log('Client side javascript file is loaded.');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
	// prevent reload after submit
	e.preventDefault();
	
	const location = search.value;
	const url = `https://nodejs-tutorial-isyzm.run-eu-central1.goorm.io/weather?address=${location}`; 
	fetch(url).then((response) => {
		response.json().then((data) => {
			if(data.error){
				console.log(data.error);
			}else{
				console.log(data.location);	
				console.log(data.forecast);	
			}
		});
	});
});