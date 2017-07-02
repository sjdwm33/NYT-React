var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

//Require Schemas
var Articles = require("./models/Articles");

var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//ROUTES
app.get('/', function(req, res){
	res.sendFile(__dirname + './public/index.html');
});

app.post('/api/saved', function(req, res){
	var newArticle = new Articles(req.body);

	var title = req.body.title;
	var date = req.body.date;
	var url = req.body.url;

	newArticle.save(function(err, doc){
		if(err){
			console.log("post error");
		}
		else{
			res.send(doc);
		}
	});
});

app.get('api/saved', function(req, res){
	Articles.find({}).exec(function(err, doc){
		if(err){
			console.log("get error");
		}
		else {
			res.json(doc);
		}
	});
});

app.delete('api/saved/', function(req, res){
	var url = req.param('url');

	Articles.find({"url": url}).remove().exec(function(err, data){
		if(err){
			console.log("delete error");
		}
		else{
			res.send("deleted");
		}
	});
});

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});