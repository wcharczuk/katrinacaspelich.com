var katrinaApp = angular.module('katrinaApp', ['ngRoute', 'katrinaControllers' ]);

katrinaApp.config(["$routeProvider", 
    function($routeProvider) {
		$routeProvider.
			when("/about", {
				templateUrl: 'partials/about.html',
				controller: 'katrinaController'
			}).
			when("/articles", {
				templateUrl: 'partials/articles.html',
				controller: 'katrinaController'
			}).
			when("/design", {
				templateUrl: 'partials/design.html',
				controller: 'katrinaController'
			}).
			when("/public_relations", {
				templateUrl: 'partials/public_relations.html',
				controller: 'katrinaController'
			}).
			otherwise({ 
				templateUrl: 'partials/home.html',
				controller: 'katrinaController' 
			});
}]);