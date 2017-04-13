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
	var rimraf = require('rimraf');
    var Grid = require('gridfs-stream');
    Grid.mongo = mongoose.mongo;
    
    controller.fazUploadDaFoto = function(req, res) {
        var gfs = Grid(mongoose.connection.db);
        var imagem = req.files.imagem;
		var idAvaliacao = req.body.idAvaliacao;
        
        var writeStream = gfs.createWriteStream({
            filename: imagem.name,
            mode: 'w',
            content_type: imagem.mimetype,
            metadata: {
                idAvaliacao: idAvaliacao
            }
        });

		var pastaRaiz = './uploads/';
        var pastaArquivo = pastaRaiz + idAvaliacao + '/';
        if (!fs.existsSync(pastaRaiz)) {
            fs.mkdirSync(pastaRaiz);
        }
        if (!fs.existsSync(pastaArquivo)) {
            fs.mkdirSync(pastaArquivo);
        }
        var caminhoArquivo = pastaArquivo + imagem.name;

        fs.writeFile(caminhoArquivo, imagem.data, function(erro) {
            if(erro) {
                console.log(erro);
            }
            console.log("Arquivo '" + imagem.name + "' salvo  em " + caminhoArquivo + ".");
        });

        writeStream.on('close', function(arquivo) {
            console.log('Foto salva com sucesso!');
            res.send('Foto salva com sucesso!');
			rimraf(pastaArquivo, function () {
                console.log('Pasta ' + pastaArquivo + ' removida.')
            });
        });

        fs.createReadStream(caminhoArquivo).pipe(writeStream);
    };
    
    controller.obtemFoto = function(req, res) {
		var idAvaliacao = req.params.idAvaliacao;
		var nomeImagem = req.params.nomeImagem;
		var gfs = Grid(mongoose.connection.db);
		gfs.findOne({filename: nomeImagem, metadata: {idAvaliacao: idAvaliacao}}, function(erro, imagem) {
			if(erro) {
				console.log(erro);
				res.status(500).json(erro);
			} else {
				if(imagem) {
					res.setHeader('Content-type', imagem.contentType);
                    res.setHeader('Content-disposition', 'filename=' + imagem.filename);
                    gfs.createReadStream({"_id": imagem._id}).pipe(res);
				} else {
					res.status(404).json('Imagem não encontrada.');
				}
			}
		});
    };
    
	
	return controller;
};





























