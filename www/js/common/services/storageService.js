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
				write: function(key, records) {
					window.localStorage[key] = angular.toJson(records);
				}
			}
		};

		var activeDevice = devices.localStorage;

		var storageService = {

			selectAll: function(key) {
				var records = activeDevice.read(key);
				return records;
			},

			insert: function(key, record) {
				var records = storageService.selectAll(key);
				record.id = records.length ? records[records.length - 1].id + 1 : 0;
				records.push(record);
				activeDevice.write(key, records);
				return records;
			},

			update: function(key, record) {
				if(angular.isUndefined(record.id)) {
					throw 'Failed to update record. Record id is undefined.';
				}
				var records = storageService.selectAll(key);
				var index;
				for(index = 0; index < records.length; index++) {
					if(records[index].id == record.id) {
						break;
					}
				}
				if(index >= records.length) {
					throw 'Failed to update record. Id ' + record.id + ' not found in ' + key;
				}
				records[index] = record;
				activeDevice.write(key, records);
				return records;
			},

			'delete': function(key, id) {
				var records = storageService.selectAll(key);
				var index;
				for(index = 0; index < records.length; index++) {
					if(records[index].id == id) {
						break;
					}
				}
				if(index >= records.length) {
					throw 'Failed to delete record. Id ' + id + ' not found in ' + key;
				}
				records.splice(index, 1);
				activeDevice.write(key, records);
				return records;
			},

			deleteAll: function(key) {
				activeDevice.write(key, []);
			}

		};

		return storageService;

	}]);