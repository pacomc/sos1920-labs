// Llamamos a los modulos
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const contactAPI = require(path.join(__dirname, "contactAPI"));

const port = process.env.PORT || 80;

const app = express();

app.use(bodyParser.json()); // todo lo que te llega a la api lo traduce a json automaticamente

contactAPI(app);


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");