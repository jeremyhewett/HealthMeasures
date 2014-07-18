//libs
var express = require('express');
var handlers = require('./handlers');

var app = express();
app.use(handlers.jsonParser);
app.use(handlers.allowCrossDomain);

require('./resources/usersResource')(app);

var server = app.listen(80, function() {
	console.log('Listening on port %d', server.address().port);
});
