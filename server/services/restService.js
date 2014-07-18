
var restService = {
	send: function(res, status, content) {
		res.type('application/json; charset=utf-8')
			.status(status)
			.send(JSON.stringify(content));
	}
};

module.exports = restService;