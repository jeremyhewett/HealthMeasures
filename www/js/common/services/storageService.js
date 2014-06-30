angular.module('HealthMeasures.common')

	.factory('Storage', [function() {

		var devices = {
			localStorage: {
				read: function(key) {
					var dataString = window.localStorage[key];
					if(dataString) {
						return angular.fromJson(dataString);
					}
					return [];
				},
				write: function(key, value) {
					window.localStorage[key] = angular.toJson(value);
				}
			}
		};

		var currentDevice = devices.localStorage;

		var storageService = {

			get: function(key) {
				return currentDevice.read(key);
			},

			set: function(key, values) {
				currentDevice.write(key, values);
			},

			append: function(key, value, options) {
				var data = storageService.get(key);
				data.push(value);
				if(options && options.sort) {
					data.sort(options.sort);
				}
				storageService.set(key, data);
			}

		};

		return storageService;

	}]);