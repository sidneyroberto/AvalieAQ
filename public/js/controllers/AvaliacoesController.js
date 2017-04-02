angular.module('avalieaq').controller('AvaliacoesController',	
	function($scope, $window, Avaliacao)	{
		
		$scope.avaliacoes = [];
		$scope.filtro = '';
		$scope.mensagem = {};
		
		function buscaAvaliacoes() {
			Avaliacao.query(
				function(avaliacoes) {
					$scope.avaliacoes = avaliacoes;
					$scope.mensagem = {};
				},
				function(erro) {
					console.log(erro);
					$scope.mensagem = {texto : 'Não foi possível recuperar a lista de avaliações'};
				}
			);
		}
		buscaAvaliacoes();
		
		function recarrega() {
			// Recarrega a página para forçar a recarga das estrelas de avaliação
			$window.location.reload()
		}
		
		
		$scope.remove = function(avaliacao) {
			if($window.confirm("Deseja realmente remover esta avaliação?")) {
				Avaliacao.delete(
					{id: avaliacao._id},
					recarrega,
					function(erro) {
						console.log(erro);
						$scope.mensagem = {texto: 'Não foi possível remover a avaliação'};
					}
				);
			}
		};
	}
);

