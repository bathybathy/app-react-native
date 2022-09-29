require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pessoaRoutes = require("./routes/pessoaRoutes");

app.use("/pessoa", pessoaRoutes);

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("conectamos ao mongoDB");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
