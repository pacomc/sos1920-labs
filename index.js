const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json()); // todo lo que te llega a la api lo traduce a json automaticamente

var port = process.env.PORT || 80;


app.get("/cool",(request,response) => {
	response.send("<html>"+cool()+"</html>");
});

app.use("/",express.static("./public"));

var contacts = [
	{
		"country": "Spain",
		"year": "2016",
		"percentage-re-total": "38.1",
		"percentage-hydropower-total": "14.5",
		"percentage-wind-power-total": "17.8"	
	},
	{
		"country": "France",
		"year": "2016",
		"percentage-re-total": "17.5",
		"percentage-hydropower-total": "11.7",
		"percentage-wind-power-total": "3.8"	
	},
	{
		"country": "Russia",
		"year": "2016",
		"percentage-re-total": "16.9",
		"percentage-hydropower-total": "17.0",
		"percentage-wind-power-total": "0.0"	
	},
	{
		"country": "Canada",
		"year": "2016",
		"percentage-re-total": "65.0",
		"percentage-hydropower-total": "58.0",
		"percentage-wind-power-total": "4.6"	
	},
	{
		"country": "Greece",
		"year": "2016",
		"percentage-re-total": "27.4",
		"percentage-hydropower-total": "42.7",
		"percentage-wind-power-total": "9.5"	
	}
	
];

const BASE_API_URL =  "/api/v1";

app.get(BASE_API_URL + "/contacts", (req, res) => {
	res.send(JSON.stringify(contacts, null, 2)); // el tercer parametro es par aque lo indente
});

app.post(BASE_API_URL + "/contacts", (req, res) => {
	contacts.push(req.body);
	res.sendStatus(201, "CREATED");
});

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");