const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv/config");
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');

const api = process.env.API_URL;

app.use(cors());
app.options('*', cors());

//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

//Routes
const userRoutes = require('./routers/users');
const transactionRoutes = require('./routers/transactions');

app.use(`${api}/users`, userRoutes);
app.use(`${api}/transactions`, transactionRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "savelah-database",
  })
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
