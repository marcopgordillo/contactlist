var express = require('express');
var app = express();
var mongojs = require('mongojs');

var db = mongojs('contactlist', ['contactlist']);

var bodyParser = require('body-parser');

/*app.get('/', function (req, res) {
	res.send("Hello world from server.js");
});*/

var cacheTime = 86400000*7;     // 7 days

app.use(express.static(__dirname = "./public", { maxAge: cacheTime }));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
	//console.log("I receive a GET request");

	db.contactlist.find(function (err, docs) {
		//console.log(docs);
		res.json(docs);
	});	
});

app.post('/contactlist', function (req, res) {
	//console.log(req.body);
	db.contactlist.insert(req.body, function (err, doc) {
		res.json(doc);
	});
});

app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	//console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	//console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	//console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc);
		});
});

app.listen(3000);

console.log('Server running in port 3000');