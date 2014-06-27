angular.module('HealthMeasures.services', [])

	.factory('Formats', function() {
		var formats = {
			date: 'MMM DD YYYY',
			dateTime: 'MMM DD YYYY HH:mm'
		};
		return formats;
	})

	.factory('Friends', function() {
		// Might use a resource here that returns a JSON array

		// Some fake testing data
		var friends = [
			{ id: 0, name: 'Scruff McGruff' },
			{ id: 1, name: 'G.I. Joe' },
			{ id: 2, name: 'Miss Frizzle' },
			{ id: 3, name: 'Ash Ketchum' }
		];

		return {
			all: function() {
				return friends;
			},
			get: function(friendId) {
				// Simple index lookup
				return friends[friendId];
			}
		}
	});
