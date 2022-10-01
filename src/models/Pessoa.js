const mongoose = require("mongoose");
const aws = require("aws-sdk");

const s3 = new aws.S3();

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

pessoaSchema.pre("remove", function () {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: "teste-delta2222",
        Key: this.key,
      })
      .promise();
  }
});

module.exports = mongoose.model("Pessoa", pessoaSchema);
