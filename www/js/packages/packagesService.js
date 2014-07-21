angular.module('HealthMeasures.packages')

	.factory('Packages', ['ParameterService', 'Settings', function(ParameterService, Settings) {

		var packages = {

			infantHeart: {
				parameters: [
					ParameterService.parameterTypes.weight,
					ParameterService.parameterTypes.O2,
					ParameterService.parameterTypes.feeds
				]
			}

		};

		Settings.registerSetting('package', 'infantHeart');
		var currentPackage = Settings.package();

		var packageService = {

			all: packages,

			currentPackage: function(value) {
				if(arguments.length < 1) return packages[currentPackage];
				Settings.package(value);
				currentPackage = value;
			}

		};

		return packageService;

	}]);