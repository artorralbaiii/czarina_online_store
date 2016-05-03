var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ProductSchema = new schema({
	name: {type: String, required: true, index: {unique: true}},
	price: Number,
	category: String,
	in_stock: {type: Boolean, default: false}
});

module.exports = mongoose.model('Product', ProductSchema);
