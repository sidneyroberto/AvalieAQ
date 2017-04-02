angular.module('avalieaq', ['ngRoute', 'ngResource', 'jkAngularRatingStars', 'ngFileUpload', 'ngMap'])
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
    
        $routeProvider.when('/mapa', {
			templateUrl: 'partials/mapa.html',
			controller: 'AvaliacoesController'
		});
		
		$routeProvider.otherwise({redirectTo: '/avaliacoes'});
	}
);
