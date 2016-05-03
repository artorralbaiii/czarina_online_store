var product_mdl = require('../models/product_mdl.js');

exports.create = function(req, res) {
	var product = new product_mdl({
		name: req.body.name,
		price: req.body.price,
		category: req.body.category,
		in_stock: req.body.availability
	});

	product.save(function(err){
		if (err) {
			res.json({
				success: false,
				msg: err.message
			});
		} else {
			res.json({
				success: true,
				msg: 'New product is created.'
			});
		}
	});
};

exports.getProductByID = function(req, res){
	product_mdl.findOne({_id: req.params.id}, function(err, doc){
		if (err) {
			res.json({
				success: false,
				msg: err.message
			});
		} else {
			if (doc!=null) {
				res.json(doc);
			} else {
				res.json({
					success: false,
					msg: 'Product not found'
				});
			}
		}
	});
};

exports.update = function(req, res) {
	product_mdl.findOne({_id: req.params.id}, function(err, doc){
		if (err) {
			res.json({
				success: false,
				msg: err.message
			});
		} else {
			if (doc != null) {

				doc.name = req.body.name;
				doc.price = req.body.price;
				doc.category = req.body.category;
				doc.in_stock = req.body.availability;
				doc.save();

				res.json({
					success: true,
					msg: 'Product is updated.'
				});
			} else {
				res.json({
					success: false,
					msg: 'Product not found.'
				});
			}
		}
	});
};

exports.all = function(req, res) {
	product_mdl.find({}, function(err, docs){
		if (err) {
			res.json({
				success: false,
				msg: err.message
			});
		} else {
			if (docs!=null) {
				res.json(docs);
			} else {
				res.json({
					success: false,
					msg: 'No products found'
				});
			}
		}
	});
};

