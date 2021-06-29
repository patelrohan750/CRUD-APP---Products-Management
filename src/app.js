const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
require('./db/conn');
const port = 8000;
const ProductRouting = require('./routers/product.router');
	
app.use(express.urlencoded({ extended: false }));

//static path,views path and partials path
const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

//set the static path
app.use(express.static(static_path));

//set the view engine
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerHelper('inc', function(value, options) {
	return parseInt(value) + 1;
});
hbs.registerHelper('ternary', function(v1, opeartor, v2) {
	switch (opeartor) {
		case '==':
			return v1 == v2 ? 'checked' : '';
		default:
			return v1;
	}
});
//set the partials
hbs.registerPartials(partials_path);

//set the router
app.use(ProductRouting);

//set the local Stroage
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
// localStorage.setItem('user', 'admin');
// localStorage.setItem('pass', 'admin1234');





//start the server
app.listen(port, () => {
	console.log(`server runnig at port ${port}`);
});
