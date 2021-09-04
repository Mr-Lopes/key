import serverless from "serverless-http";
import express from "express";

import middlewares from "./middleware";
import api from "./api";

const app = express();

// // Lets make sure all the incomind requests are properly formatted in JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", api);

// Sets handling error functions
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

 module.exports.init = serverless(app);