angular.module('HealthMeasures.packages')

	.factory('Packages', ['Measurements', 'Settings', function(Measurements, Settings) {

		var packages = {

			infantHeart: {
				parameters: [
					Measurements.parameters.weight,
					Measurements.parameters.O2,
					Measurements.parameters.feeds
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