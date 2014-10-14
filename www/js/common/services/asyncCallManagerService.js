angular.module('HealthMeasures.common').factory('AsyncCallManager', function($q, $rootScope, $timeout) {

	var asyncCallManagerService = {

		queueOverlappingCallsTo: function(f) {

			var queue = [];
			var busy = false;

			var execute = function() {
				var deferred = queue.shift();
				f().then(function(result) {
					deferred.resolve(result);
				}, function(result) {
					deferred.reject(result);
				}).finally(function() {
					if(queue.length > 0) {
						execute();
					} else {
						busy = false;
					}
				});
			};

			var wrapper = function() {
				var deferred = $q.defer();
				queue.push(deferred);

				if(!busy) {
					busy = true;
					$rootScope.$evalAsync(execute);
				}

				return deferred.promise;
			};

			return wrapper;
		},

		mergeOverlappingCallsTo: function(f) {

			var queue = [];
			var busy = false;

			var execute = function() {
				var deferred = queue.shift();
				f().then(function(result) {
					deferred.resolve(result);
					while(queue.length) {
						deferred = queue.shift();
						deferred.resolve(result);
					}
				}, function(result) {
					deferred.reject(result);
					while(queue.length) {
						deferred = queue.shift();
						deferred.reject(result);
					}
				}).finally(function() {
					busy = false;
				});
			};

			var wrapper = function() {
				var deferred = $q.defer();
				queue.push(deferred);

				if(!busy) {
					busy = true;
					$rootScope.$evalAsync(execute);
				}

				return deferred.promise;
			};

			return wrapper;
		},

		waitAndOnlyExecuteLastCallTo: function(f, delay) {

			var batches = [
				[]
			];
			var timeout;

			var execute = asyncCallManagerService.queueOverlappingCallsTo(function() {
				var deferred = $q.defer();
				var batch = batches.shift();
				var call = batch.pop();
				f().then(function(result) {
					call.resolve(result);
					while(batch.length) {
						call = batch.pop();
						call.resolve(result);
					}
				}, function(result) {
					call.reject(result);
					while(batch.length) {
						call = batch.pop();
						call.reject(result);
					}
				}).finally(function() {
					deferred.resolve();
				});
				return deferred.promise;
			});

			var wrapper = function() {
				var deferred = $q.defer();
				batches[batches.length - 1].push(deferred);

				if(timeout) {
					$timeout.cancel(timeout);
				}
				timeout = $timeout(function() {
					batches.push([]);
					execute();
				}, delay);

				return deferred.promise;
			};

			return wrapper;
		}

	};

	return asyncCallManagerService;

});
