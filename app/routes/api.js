module.exports = function(app, express) {
	var api = express.Router();
	var user_ctrl = require('../controllers/user_ctrl.js');
	var product_ctrl = require('../controllers/product_ctrl.js');

	// **User Resource**
	api.post('/users', user_ctrl.create);
	api.post('/users/authenticate', user_ctrl.authenticate);
	api.post('/users/:id', user_ctrl.update)
	api.get('/users/:id', user_ctrl.getUserByID);
	api.get('/users', user_ctrl.all);

	// **Product Resource**
	api.post('/products', product_ctrl.create);
	api.post('/products/:id', product_ctrl.update)
	api.get('/products/:id', product_ctrl.getProductByID);
	api.get('/products', product_ctrl.all);

	return api;
}