module.exports = function (app) {
	console.log("Registering contact API...");
	
	const dataStore = require("nedb");
	const path = require("path");

	const dbFileName = path.join(__dirname, "contacts.db");
	const BASE_API_URL =  "/api/v1";

	
	const db = new dataStore({
				filename: dbFileName,
				autoload: true
			});
	


	var initialContacts = [
		{ 
			name: "peter",
			phone: 123456	
		},
		{ 
			name: "pablo",
			phone: 789456	
		}
	];


	// GET LOAD INITIAL DATA

	app.get(BASE_API_URL+"/contacts/loadInitialData", (req,res) =>{
		console.log("New GET .../loadInitialData");

		db.insert(initialContacts); // Esto es NoSQL porque hacemos un insert sin sentencia
		res.sendStatus(200);
		console.log("Initial contacts loaded: "+ JSON.stringify(initialContacts, null, 2));
	});

	// GET CONTACTS

	app.get(BASE_API_URL+"/contacts", (req,res) =>{
		console.log("New GET .../contacts");

		db.find({}, (err, contacts) => {
			var slimContacts = contacts.forEach((c) => {
				delete c._id;
			});

			res.send(JSON.stringify(contacts, null, 2));
			console.log("Data sent: "+ JSON.stringify(slimContacts, null, 2));
		}); // Es asincrona


	});


	// POST CONTACTS

	app.post(BASE_API_URL+"/contacts",(req,res) =>{

		var newContact = req.body; // Cogemos el body de la request http (que debe tener un contacto en json)
		//console.log(newContact);

		if((newContact == {}) || (newContact.name == null)){
			res.sendStatus(400,"BAD REQUEST");
		} else {
			contacts.push(newContact); 	
			res.sendStatus(201,"CREATED");
		}
	});

	// DELETE CONTACTS

	app.delete(BASE_API_URL+"/contacts",(req,res) =>{	
		contacts = [];
		res.sendStatus(200);

	});


	// GET CONTACTS/XXX

	app.get(BASE_API_URL+"/contacts/:name", (req,res) =>{

		var name = req.params.name; //params contiene todos los parametros

		var filteredContacts = contacts.filter((c) => {
			return (c.name == name)
		});

		if(filteredContacts.length >= 1) {
			res.send(filteredContacts[0]);	
		} else {
			res.sendStatus(404, "CONTACT NOT FOUND");
		}

	});
	
	
	// PUT CONTACTS/XXX
	app.put(BASE_API_URL+"/contacts/:name", (req,res) =>{

		var params = req.params;
		var name = params.name;

		var body = req.body;

		var updatedContacts = contacts.map((c) => {
			var updatedC = c;

			if (c.name == name) {
				for (var p in body) {
					updatedC[p] = body[p];
				}	
			}


			return (updatedC)

		});

		if (updatedContacts.length == 0) {
			res.sendStatus(404, "CONTACT NOT FOUND");
		} else {
			contacts = updatedContacts;
			res.sendStatus(200, "OK");
		}

	});

	// DELETE CONTACTS/XXX
	app.delete(BASE_API_URL+"/contacts/:name",(req,res) =>{

		var name = req.params.name; //params contiene todos los parametros

		var filteredContacts = contacts.filter((c) => {
			return (c.name != name)
		});

		if(filteredContacts.length < contacts.length) {
			contacts = filteredContacts;
			res.sendStatus(200);

		} else {
			res.sendStatus(404, "CONTACT NOT FOUND");
		}
	});


	
	
	
	console.log("OK");
}
