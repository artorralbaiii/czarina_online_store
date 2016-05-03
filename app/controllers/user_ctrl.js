var user_mdl = require('../models/user_mdl.js');

exports.create = function(req, res) {
	var user = new user_mdl({
		name: req.body.name,
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err){
		if (err) {
			res.json({
				success: false,
				msg: err.message
			});
		} else {
			res.json({
				success: true,
				msg: 'New user is created.'
			});
		}
	});
};

exports.getUserByID = function(req, res){
	user_mdl.findOne({_id: req.params.id}, function(err, doc){
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
					msg: 'User not found'
				});
			}
		}
	});
};

exports.update = function(req, res) {
	user_mdl.findOne({_id: req.params.id}, function(err, doc){
		if (err) {
			res.json({
				success: false,
				msg: err.message
			});
		} else {
			if (doc != null) {

				doc.name = req.body.name;
				doc.username = req.body.username;
				doc.password = req.body.password;
				doc.save();

				res.json({
					success: true,
					msg: 'User profile is updated.'
				});
			} else {
				res.json({
					success: false,
					msg: 'User not found.'
				});
			}
		}
	});
};

exports.all = function(req, res) {
	user_mdl.find({}, function(err, docs){
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
					msg: 'No users found'
				});
			}
		}
	});
};

exports.authenticate = function(req, res) {
	user_mdl.findOne({username: req.body.username})
	.select('password')
	.exec(function(err, doc){
		if(err) {
			res.json({
				success: false,
				msg: err.message
			});
		} else {
			if(doc == null) {
				res.json({
					success: false,
					msg: 'User doesnt exist'
				});
			} else {
				var isvalid = doc.comparePassword(req.body.password);

				if (isvalid) {
					res.json({
						success: true,
						msg: 'Authenticated.'
					});
				} else {
					res.json({
						success:false,
						msg: 'Invalid password'
					});
				}
			}
		}
	});
};

