require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//const pessoaRoutes = require("./routes/pessoaRoutes");
app.use(require("./routes/pessoaRoutes"));

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("conectamos ao mongoDB");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log(err));
