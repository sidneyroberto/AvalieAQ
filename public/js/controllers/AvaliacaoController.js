angular.module('avalieaq').controller('AvaliacaoController',	
	function($scope, $routeParams, $timeout, Avaliacao, Upload)	{
		if($routeParams.avaliacaoId) {
			Avaliacao.get({id: $routeParams.avaliacaoId},
				function(avaliacao) {
					$scope.avaliacao = avaliacao;
					$scope.avaliacao.dataVisita = new Date(avaliacao.dataVisita);
				},
				function(erro) {
					console.log(erro);
					$scope.mensagem = {texto : "Avaliação inexistente. Avaliação nova.", sucesso : false};
					$scope.avaliacao = new Avaliacao();
				}
			);
		} else {
			$scope.avaliacao = new Avaliacao();
		}
	   
        $scope.imagens = [];
		$scope.salva = function() {
			$scope.avaliacao.$save()
				.then(
					function(avaliacao) {
                        fazUploadDasImagens(avaliacao._id);
						$scope.mensagem = {texto : "Avaliação salva com sucesso!", sucesso : true};
						$scope.avaliacao = new Avaliacao();
					},
					function(erro) {
						console.log(erro);
						$scope.mensagem = {texto : "Não foi possível salvar a avaliação.", sucesso : false};
					}
				);
		};
    
        
        function fazUploadDasImagens(idAvaliacao) {
            $scope.imagens = $scope.imagens.slice(0, 3);
            if($scope.imagens && $scope.imagens.length) {
                angular.forEach($scope.imagens, function(imagem) {
                    
                    imagem.upload = Upload.upload({
                        url: '/upload',
                        data: {imagem: imagem, idAvaliacao: idAvaliacao}
                    });
                    
                    imagem.upload.then(
                        function(resposta) {
                            $timeout(function() {
                                imagem.resultado = resposta.data;
                            });
                        },
                        function(resposta) {
                            if(resposta.status > 0) {
                                $scope.mensagem = {texto : "Erro ao tentar enviar a foto ao servidor.", sucesso : false};
                            }
                        },
                        function(evento) {
                            imagem.progresso = Math.min(100, parseInt(100.0 * evento.loaded / evento.total));
                        }
                    );
                });
            }
        };
            
	}
);
