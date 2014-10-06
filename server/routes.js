/**
 * Main application routes
 */

'use strict';

var express = require('express');

var RESTactions = [
	{verb: 'get', path: '/', method: 'index'},
	{verb: 'post', path: '/', method: 'create'},
	{verb: 'get', path: '/:id', method: 'show'},
	{verb: 'put', path: '/:id', method: 'update'},
	{verb: 'delete', path: '/:id', method: 'destroy'}
];

function generateApiRoutes(resource) {
	var controller = require('./api/' + resource + '.js');
	var router = express.Router();

	RESTactions.forEach(function(action) {
		if(controller[action.method]) {
			router[action.verb](action.path, controller[action.method]);
		}
	});

	return router;
}

module.exports = function(app) {

	// Insert routes below
	app.use('/api/user', generateApiRoutes('user'));
	app.use('/api/auth', generateApiRoutes('auth'));

};
