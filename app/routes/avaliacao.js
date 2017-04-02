module.exports = function(app) {
	var controller = app.controllers.avaliacao;
	app.route('/avaliacoes')
		.get(controller.listaAvaliacoes)
		.post(controller.salvaAvaliacao);
	app.route('/avaliacoes/:id')
		.get(controller.obtemAvaliacao)
		.delete(controller.removeAvaliacao);
    app.route('/upload')
        .post(controller.fazUploadDaFoto);
    app.route('/upload/:nomeArquivo')
        .post(controller.obtemFoto);
};

