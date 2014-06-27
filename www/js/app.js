angular.module('HealthMeasures', [
	'ionic',
	'HealthMeasures.filters',
	'HealthMeasures.controllers',
	'HealthMeasures.services',
	'HealthMeasures.libServices',
	'HealthMeasures.diary',
	'HealthMeasures.visualizer'
])

	.config(function($stateProvider, $urlRouterProvider) {

		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state's controller can be found in controllers.js
		$stateProvider

			// setup an abstract state for the tabs directive
			.state('tab', {
				url: "/tab",
				abstract: true,
				templateUrl: "templates/tabs.html"
			})

			// Each tab has its own nav history stack:

			.state('tab.dash', {
				url: '/dash',
				views: {
					'tab-dash': {
						templateUrl: 'templates/tab-dash.html',
						controller: 'DashCtrl'
					}
				}
			})

			.state('tab.friends', {
				url: '/friends',
				views: {
					'tab-friends': {
						templateUrl: 'templates/tab-friends.html',
						controller: 'FriendsCtrl'
					}
				}
			})
			.state('tab.friend-detail', {
				url: '/friend/:friendId',
				views: {
					'tab-friends': {
						templateUrl: 'templates/friend-detail.html',
						controller: 'FriendDetailCtrl'
					}
				}
			})

			.state('tab.diary', {
				url: '/diary',
				views: {
					'tab-diary': {
						templateUrl: 'templates/diary/diary.html',
						controller: 'DiaryController'
					}
				}
			})

			.state('tab.visualizer', {
				url: '/visualizer',
				views: {
					'tab-visualizer': {
						templateUrl: 'templates/visualizer/visualizer.html',
						controller: 'VisualizerController'
					}
				}
			});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/tab/dash');

	})

	.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if(window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	})

	.run(['$rootScope', 'Formats', function($rootScope, Formats) {
		$rootScope.formats = Formats;
	}]);

