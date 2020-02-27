var express = require("express");

var cool = require("cool-ascii-faces");


var app = express();

app.get("/recurso", (req, res) => {
	res.send("<html><body>Hello world!</body></html>");
});

app.listen(80);

console.log("Server ready!");
