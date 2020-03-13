const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json()); // te traduce automaticamente a json

var port = process.env.PORT || 80;


app.get("/cool",(request,response) => {
	response.send("<html>"+cool()+"</html>");
});

app.use("/",express.static("./public"));

var contacts = [
	{
		name: "peter",
		phone: 12345
	},
	{
		name: "pablo",
		phone: 78910
	}
];

const BASE_API_URL =  "/api/v1";

app.get(BASE_API_URL + "/contacts", (req, res) => {
	res.send(JSON.stringify(contacts, null, 2)); // el tercer parametro es par aque lo indente
});

app.post(BASE_API_URL + "/contacts", (req, res) => {
	contacts.push(req.body);
	res.sendStatus(200, "OK");
});

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");