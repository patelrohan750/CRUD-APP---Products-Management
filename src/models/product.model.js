const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
	{
		prod_name: {
			type: String,
			required: true
		},
		prod_dec: {
			type: String,
			required: true
		},
		prod_price: {
			type: Number,
			required: true
		},
		prod_status: {
			type: String,
			required: true
		},
		prod_url: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);
const Product = new mongoose.model('Products', ProductSchema);
module.exports = Product;
