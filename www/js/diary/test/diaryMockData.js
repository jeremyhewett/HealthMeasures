
angular.module('HealthMeasures.test')

	.factory('DiaryMockData', [function() {

		var diaryMockData = {

			entries: [
				{
					timeStamp: moment('22 Jun, 2014').valueOf(),
					narrative: 'This is my latest entry.'
				},
				{
					timeStamp: moment('20 Jun, 2014').valueOf(),
					narrative: 'This is my 2nd entry.'
				},
				{
					timeStamp: moment('Jun 19, 2014').valueOf(),
					narrative: 'This is my first entry.'
				},
				{
					timeStamp: moment('19 Jun, 2014').valueOf(),
					narrative: 'Another entry.'
				}
			]

		};

		return diaryMockData;
	}])

	.run(['Config', 'Storage', 'DiaryMockData', function(Config, Storage, DiaryMockData) {

		if(Config.injectMockData) {
			Storage.set('diary.entries', DiaryMockData.entries);
		}

	}]);