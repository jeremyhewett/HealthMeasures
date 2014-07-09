angular.module('HealthMeasures.settings')

	.factory('Settings', ['Storage', function(Storage) {

		function getSetting(name) {
			return Storage.selectAll('settings')
				.filter(function(setting) {
					return setting.name == name;
				})[0];
		}

		function setValue(name, value) {
			var settings = Storage.selectAll('settings');
			var setting = settings.filter(function(setting) {
				return setting.name == name;
			})[0];
			if(!setting) {
				throw 'Failed to set value for setting. Setting ' + name + ' not found.';
			}
			setting.value = value;
			Storage.update('settings', settings);
		}

		var settingsService = {

			registerSetting: function(name, defaultValue) {
				settingsService[name] = function(value) {
					if(arguments.length < 1) return getSetting(name).value;
					setValue(name, value);
				};
				var setting = {
					name: name
				};
				if(arguments.length > 1) {
					setting.value = defaultValue;
				}
				Storage.insert('settings', setting);
			}

		};

		return settingsService;

	}]);