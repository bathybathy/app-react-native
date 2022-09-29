const mongoose = require("mongoose");

const pessoaSchema = new mongoose.Schema({
  nome: String,
  rua: String,
  cep: String,
  bairro: String,
  cidade: String,
  numero: Number,
  complemento: String,
  nomeArquivo: String,
  tamanho: Number,
  key: String,
  url: String,
});

module.exports = mongoose.model("Pessoa", pessoaSchema);
