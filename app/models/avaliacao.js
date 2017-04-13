var mongoose = require('mongoose');

module.exports = function() {
	var schema = mongoose.Schema({
		nomeAvaliador: {
			type: String,
			required: true
		},
		estabelecimento : mongoose.Schema({
			nome: {
				type: String,
				required: true
			},
			endereco: {
				type: String,
				required: true
			}
		}),
		quantidadeEstrelas: {
			type: Number,
			min: 1,
			max: 5,
			default: 1
		},
		opiniao: {
			type: String
		},
		dataVisita: {
			type: Date,
			default: Date.now
		},
		midia: [String]
	});
	
	return mongoose.model('Avaliacao', schema);
};




