(function(){
	var app = angular.module('app', ['ngRoute']);

	app.config(function ($routeProvider) {
	$routeProvider

	.when("/", {
		templateUrl: "views/charts.html",
		controller: "ChartsCtrl",
		controllerAs: 'charts'
	})

	.when("/charts", {
		templateUrl: "views/charts.html",
		controller: "ChartsCtrl",
		controllerAs: 'charts'
	})

	.when("/attacks", {
		templateUrl: "views/attacks.html",
		controller: "AttacksCtrl",
		controllerAs: 'attacks'
	})

	.when("/logs", {
		templateUrl: "views/logs.html",
		controller: "LogsCtrl",
		controllerAs: 'logs'
	})

	.otherwise({redirectTo: "/charts"});
	});

})();