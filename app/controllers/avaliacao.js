module.exports = function(app) {
	var controller = {};
	
	var Avaliacao = app.models.avaliacao;
	
	controller.listaAvaliacoes = function(req, res) {
		Avaliacao.find().exec()
		.then(
			function(avaliacoes) {
				res.json(avaliacoes);
			},
			function(erro) {
				console.error(erro);
				res.status(500).json(erro);
			}
		);
	};
	
	controller.obtemAvaliacao = function(req, res) {
		var _id = req.params.id;
		Avaliacao.findById(_id).exec()
			.then(
				function(avaliacao) {
					if(!avaliacao) {
						res.status(404).json("Avaliação não encontrada!");
					} else {						
						res.json(avaliacao);
					}
				},
				function(erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
			);
	};
	
	controller.salvaAvaliacao = function(req, res) {
		var _id = req.body._id;
		
		if(_id) {
			Avaliacao.findByIdAndUpdate(_id, req.body).exec()
				.then(
					function(avaliacao) {
						res.json(avaliacao);
					},
					function(erro) {
						console.error(erro);
						res.status(500).json(erro);
					}
				);
		} else {
			Avaliacao.create(req.body)
				.then(
					function(avaliacao) {
						res.status(201).json(avaliacao);
					},
					function(erro) {
						console.error(erro);
						res.status(500).json(erro);
					}
				);
		}
	};
	
	controller.removeAvaliacao = function(req, res) {
		var _id = req.params.id;
		Avaliacao.remove({"_id" : _id}).exec()
			.then(
				function() {
					res.status(204).end();
				},
				function(erro) {
					return console.error(erro);
				}
			);
	};
    
    // Realização de upload e download das fotos das avaliações
    
    var fs = require('fs');
    var mongoose = require('mongoose');
    var Grid = require('gridfs-stream');
    Grid.mongo = mongoose.mongo;
    
    controller.fazUploadDaFoto = function(req, res) {
        var gfs = Grid(mongoose.connection.db);
        var imagem = req.files.imagem;
        
        var writeStream = gfs.createWriteStream({
            filename: imagem.name,
            mode: 'w',
            content_type: imagem.mimetype,
            metadata: {
                idFoto: req.body.idAvaliacao
            }
        });

        fs.writeFile('./uploads/' + imagem.name, imagem.data, function(erro) {
            if(erro) {
                console.log(erro);
            }
            console.log("Arquivo '" + imagem.name + "' salvo na pasta ./uploads!");
        });

        writeStream.on('close', function(arquivo) {
            console.log('Foto salva com sucesso!');
            res.send('Foto salva com sucesso!');
        });

        fs.createReadStream('./uploads/' + imagem.name).pipe(writeStream);
    };
    
    controller.obtemFoto = function(req, res) {
            
    };
    
	
	return controller;
};





























