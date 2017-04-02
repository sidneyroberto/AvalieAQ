angular.module('avalieaq').factory('Avaliacao', function($resource) {
	// Ligação entre o AngularJS e os RESTful endpoints do Express de CRUD de avaliação
	return $resource('/avaliacoes/:id');
});
