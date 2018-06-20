var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  
  produto_id: String,
  nro_serie: String,
  vigencia: String, // text box
  suporte_modalidade: String, // Fazer um DROP com as modalidades existentes
  suporte_fornecedor: String,
  data_end_suport: String,
  versao_software: String,
  fabricante: String // Fazer um DROP com os fabricantes
  
  //updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
