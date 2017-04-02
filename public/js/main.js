angular.module('avalieaq', ['ngRoute', 'ngResource', 'jkAngularRatingStars', 'ngFileUpload'])
	.config(function($routeProvider) {
		$routeProvider.when('/avaliacoes', {
			templateUrl: 'partials/avaliacoes.html',
			controller: 'AvaliacoesController'
		});
		
		$routeProvider.when('/avaliacao/:avaliacaoId', {
			templateUrl: 'partials/avaliacao.html',
			controller: 'AvaliacaoController'
		});
		
		$routeProvider.when('/avaliacao', {
			templateUrl: 'partials/avaliacao.html',
			controller: 'AvaliacaoController'
		});
		
		$routeProvider.otherwise({redirectTo: '/avaliacoes'});
	}
);
