angular.module('HealthMeasures.settings')

	.factory('Settings', ['Storage', function(Storage) {

		var settingsService = {

			registerSetting: function(setting, defaultValue) {
				settingsService[setting] = function(value) {
					if(arguments.length < 1) return Storage.get('settings.' + setting)[0];
					Storage.set('settings.' + setting, [value]);
				};
				if(arguments.length > 1) {
					settingsService.setDefault(setting, defaultValue);
				}
			},

			setDefault: function(setting, value) {
				if(!Storage.get('settings.' + setting).length) {
					Storage.append('settings.' + setting, value);
				}
			}

		};

		return settingsService;

	}]);