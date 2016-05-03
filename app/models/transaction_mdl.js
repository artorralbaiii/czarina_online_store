var mongoose = require('mongoose');
var schema = mongoose.Schema;

var LineItemSchema = new schema({
	product_id: {type: schema.Types.ObjectId, ref: 'Product'},
	qty: {type: Number, default: 0}
});

var BillAddressSchema = new schema({
	street: String,
	city: String,
	zip: String
});

var TransactionSchema = new schema({
	customer_name: String,
	bill_address: BillAddressSchema,
	line_items: [LineItemSchema]
});

module.exports = mongoose.model('Transaction', TransactionSchema);