
module.exports = function() {
	return function(req, res, next) {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		//res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
		res.header('Access-Control-Allow-Credentials', 'true');

		// intercept OPTIONS method
		if(req.method === 'OPTIONS') {
			res.status(200);
			res.send('200');
		}
		else {
			next();
		}
	};
};