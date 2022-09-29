const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const uploadPessoa = require("../middleware/upload");

const Pessoa = require("../models/Pessoa");

router.post("/", multer(uploadPessoa).single("file"), async (req, res) => {
  const { nome, rua, bairro, cidade, numero, complemento, cep } = req?.body;
  console.log(req.file);

  if (!nome) {
    res.status(422).json({ error: "Nome é obrigatório" });
    return;
  }

  const pessoa = {
    nome,
    rua,
    bairro,
    cidade,
    numero,
    complemento,
    cep,
    nomeArquivo: req.file.originalname,
    tamanho: req.file.size,
    key: req.file.key,
    url: req.file.location ?? "",
  };
  try {
    const post = await Pessoa.create(pessoa);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const pessoas = await Pessoa.find();

    res.status(200).json(pessoas);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const pessoa = await Pessoa.findOne({ _id: id });

    if (!pessoa) {
      res.status(422).json({ mensagem: "O usuário não foi encontrado." });
      return;
    }

    res.status(200).json(pessoa);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.patch("/:id", multer(uploadPessoa).single("file"), async (req, res) => {
  const id = req.params.id;

  const { nome, rua, bairro, cidade, numero, complemento, cep } = req?.body;

  const pessoa = {
    nome,
    rua,
    bairro,
    cidade,
    numero,
    complemento,
    cep,
    nomeArquivo: req.file.originalname,
    tamanho: req.file.size,
    key: req.file.key,
    url: req.file.location ?? "",
  };
  try {
    const pessoaAtualizada = await Pessoa.updateOne({ _id: id }, pessoa);

    if (pessoaAtualizada.matchedCount === 0) {
      res
        .status(422)
        .json({ mensagem: "Não foi possível atualizar o usuário." });
      return;
    }

    res.status(200).json(pessoa);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const pessoa = await Pessoa.findOne({ _id: id });

    if (!pessoa) {
      res.status(422).json({ mensagem: "O usuário não foi encontrado." });
      return;
    }

    await Pessoa.deleteOne({ _id: id });

    res.status(200).json({ mensagem: "Usuário removido com sucesso." });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
