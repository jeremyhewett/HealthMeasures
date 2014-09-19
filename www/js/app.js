
angular.module('HealthMeasures', [
	'ionic',
	'HealthMeasures.common',
	'HealthMeasures.user',
	'HealthMeasures.test', //To be commented out on production
	'HealthMeasures.services',
	'HealthMeasures.settings',
	'HealthMeasures.packages',
	'HealthMeasures.home',
	'HealthMeasures.diary',
	'HealthMeasures.entries',
	'HealthMeasures.visualizer'
])

	.constant('Config', {
		apiUrl: 'http://localhost:80/api',
		injectMockData: true
	})

	.config(function($stateProvider, $urlRouterProvider) {

		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state's controller can be found in controllers.js
		$stateProvider

			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: "templates/app.html",
				controller: 'AppController'
			})


			.state('app.authorize', {
				url: '/authorize',
				views: {
					'app': {
						templateUrl: 'templates/user/register.html',
						controller: 'RegisterController'
					}
				}
			})

			// setup an abstract state for the tabs directive
			.state('app.tab', {
				url: "/tab",
				abstract: true,
				views: {
					'app': {
						templateUrl: "templates/tabs.html"
					}
				}
				//templateUrl: "templates/tabs.html"
			})

			// Each tab has its own nav history stack:

			.state('app.tab.home', {
				url: '/home',
				views: {
					'tab-home': {
						templateUrl: 'templates/home/home.html',
						controller: 'HomeController'
					}
				}
			})

			.state('app.tab.selectParameter', {
				url: '/entries',
				views: {
					'tab-entries': {
						templateUrl: 'templates/entries/selectParameter.html',
						controller: 'SelectParameterController'
					}
				}
			})
			.state('app.tab.entries', {
				url: '/entries/:parameterId',
				views: {
					'tab-entries': {
						templateUrl: 'templates/entries/entries.html',
						controller: 'EntryController',
						resolve: {
							asyncDependencies: function(EntryMockData) {
								return EntryMockData.initialize();
							}
						}
					}
				}
			})

			.state('app.tab.diary', {
				url: '/diary',
				views: {
					'tab-diary': {
						templateUrl: 'templates/diary/diary.html',
						controller: 'DiaryController',
						resolve: {
							asyncDependencies: function(DiaryMockData) {
								return DiaryMockData.initialize();
							}
						}
					}
				}
			})

			.state('app.tab.visualizer', {
				url: '/visualizer',
				views: {
					'tab-visualizer': {
						templateUrl: 'templates/visualizer/visualizer.html',
						controller: 'VisualizerController'
					}
				}
			});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/app/tab/home');

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
	}])

	.run(['$rootScope', '$location', '$state', 'User', function ($rootScope, $location, $state, User) {
		$rootScope.$on('$stateChangeStart', function (event, toState) {

			if (!User.isAuthorized() && toState.name !== 'app.authorize') {
				event.preventDefault();
				$state.go('app.authorize');
			}

		});
	}]);

