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

// Object destructuring

const product = {
	label: 'Red notebook',
	price: 3,
	stock: 201,
	salePrice: undefined
};

// const { label: productlabel, stock, rating = 5 } = product;

// console.log(productlabel, stock, rating);

const transaction = (type, { label, stock }) => {
	console.log(type, label, stock);
};

transaction('order', product);