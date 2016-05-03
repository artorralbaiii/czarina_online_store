var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new schema({
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true, select: false},
	name: {type: String, required: true},
	role: String
});

// **Encrypt Password**
UserSchema.pre('save', function(next){
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.hash(user.password, null, null, function(err, hash){
		if (err) return next(err);

		user.password = hash;
		next();
	});
});

// **Compare Password**
UserSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
