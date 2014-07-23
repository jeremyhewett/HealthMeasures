angular.module('HealthMeasures.entries')

	.factory('EntryService', ['Storage', function(Storage) {

		var entryService = function(parameterId) {

			return {

				getEntries: function() {
					var entries = Storage.selectAll('entries.' + parameterId);
					return entries.sort(function(a, b) {
						return b.timeStamp - a.timeStamp;
					});
				},

				saveValue: function(value) {
					var entry = {
						timeStamp: moment().valueOf(),
						value: value
					};
					var entries = Storage.insert('entries.' + parameterId, entry);
					return entries.sort(function(a, b) {
						return b.timeStamp - a.timeStamp;
					});
				},

				deleteEntry: function(entry) {
					var entries = Storage.delete('entries.' + parameterId, entry.id);
					return entries.sort(function(a, b) {
						return b.timeStamp - a.timeStamp;
					});
				}

			};
		};

		return entryService;
	}]);