const Product = require('../models/product.model');
const axios = require('axios');
const loginid=require('../db/emailAndPassword')
const jwt = require('jsonwebtoken');
module.exports.Homeroute = (req, res) => {

	
	axios
		.get('http://localhost:8000/api/product')
		.then((response) => {
			// console.log(response.data.data);
			res.render('products', { products: response.data.data });
		})
		.catch((err) => {
			res.send(err);
		});
};

module.exports.add_product = (req, res) => {

	res.render('add-product');
};
module.exports.update_product = (req, res) => {
	const id = req.params.id;
	Product.findById(id)
		.then((data) => {
			// console.log(data);
			res.render('update-product', {
				product: data
			});
		})
		.catch((e) => {
			res.status(400).send({
				message: 'some error are occured '
			});
		});
};

///login route
module.exports.login=(req,res)=>{
	res.render('login')
}
module.exports.loginData=(req,res)=>{
	
	const {email,password}=req.body;
	
		if(email===loginid.MatchEmail && password===loginid.MatchPass){
			localStorage.setItem('email',email)
			localStorage.setItem('password',password)
			console.log(localStorage.getItem('email'));
			const token = jwt.sign({ email: email }, 'iamdevelopertoken');
			console.log("token is:",token);
			localStorage.setItem('token',token)
			res.redirect('/')
		}else{
			res.render('login',{errorshow:"Invalid Details"})
		}

}
//logout
module.exports.logout=(req,res)=>{
	localStorage.removeItem("email")
	localStorage.removeItem("password")
	localStorage.removeItem("token")
	console.log("user Logged Out!!!!");
	res.redirect('/login')

}
module.exports.create = (req, res) => {
	const { prod_name, prod_dec, prod_price, prod_status, prod_url } = req.body;
	if (!req.body) {
		console.log('All fields are Required');
		return res.status(400).send({
			message: 'All fields are Required'
		});
	}
	const product = new Product({
		prod_name,
		prod_dec,
		prod_price,
		prod_url,
		prod_status
	});
	product
		.save()
		.then((data) => {
			// console.log(data);
			res.redirect('/');
		})
		.catch((e) => {
			res.status(500).send({ message: 'some error are occured' });
			console.log(e);
		});
};

module.exports.read = (req, res) => {
	Product.find()
		.then((data) => {
			res.send({ data });
		})
		.catch((e) => {
			res.status(500).send({ message: 'some error are occured' });
			console.log(e);
		});
};

module.exports.update = (req, res) => {
	const { prod_name, prod_dec, prod_price, prod_status, prod_url } = req.body;
	Product.findByIdAndUpdate(
		req.body.id,
		{
			prod_name,
			prod_dec,
			prod_price,
			prod_status,
			prod_url
		},
		{ new: true }
	)
		.then((data) => {
			res.redirect('/');
		})
		.catch((e) => {
			res.status(500).send({ message: 'some error are occured' });
			console.log(e);
		});
};
module.exports.delete = (req, res) => {
	Product.findByIdAndRemove(req.params.id)
		.then((data) => {
			res.redirect('/');
		})
		.catch((e) => {
			res.status(500).send({ message: 'some error are occured' });
			console.log(e);
		});
};
