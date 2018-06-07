var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  produto_id: String,
  nro_serie: String,
  nro_contrato: String,
  termino_vigencia: String,
  suporte: String,
  suporte_fornecedor: String,
  versao_software: String,
  
  //updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);
