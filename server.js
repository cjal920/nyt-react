var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 4000;

var app = express();
var PORT = process.env.PORT || port;

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Database configuration with mongoose
// Connect to heroku if deployed, or local
if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);	
} else {
	mongoose.connect('mongodb://localhost/nytreact');
}
var db = mongoose.connection;

// Show any mongoose errors
db.on('error', function (error) {
	console.log('Mongoose Error: ', error);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function () {
	console.log('Mongoose connection successful.');
});

// Serve static content for the app from the 'public' directory in the application directory.
app.use(express.static(path.join(__dirname, 'build')));

// Configure Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes ==========================================
var Article = require('./models/Article.js');
var Note = require('./models/Note.js');

// Serve HTML
app.get('/', function(req, res) {
	res.sendFile(path.resolve('build/index.html'));
});

// Get all saved articles with their notes from db
app.get('/api/article', function (req, res) {
	Article.find()
		.populate('noteID')
		.exec(function (error, doc) {
			if (error) {
				res.send(error);
			} else {
				res.send(doc);
			}
		});
});

// Save article to db
app.post('/api/article', function (req, res) {
	var newArticle = new Article({
		title: req.body.title,
		date: req.body.date,
		url: req.body.url
	});

	newArticle.save(function (error, doc) {
		if (error) {
			res.send(error);
		} else {
			res.send(doc);
		}
	});
});

// Delete article from db
app.delete('/api/article/:id', function (req, res) {
	Article.remove({
		_id: req.params.id
	}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(doc);
		}
	});
});

// Save note to db - Under Construction
app.post('/api/note', function (req, res) {
	var newNote = new Note({
		text: req.body.text,
		articleId: req.body.articleId
	});

	newNote.save(function (error, doc) {
		if (error) {
			res.send(error);
		} else {
			Article.findOneAndUpdate({
				_id: req.body.id
			}, {
				'noteID': doc._id
			}, {
				new: true
			}, function (err, newdoc) {
				if (err) {
					res.send(err);
				}
				else {
					res.send(newdoc);
				}
			});
		}
	});
});

// Delete note from db - Under Construction
app.delete('/api/note', function (req, res) {
	Note.remove({
		_id: req.body.id
	}, function (err, doc) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(doc);
		}
	});
});

// =================================================

// Start server
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});