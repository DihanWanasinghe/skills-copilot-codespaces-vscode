//Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var comments = require('./comments.json');

// Use body parser to parse JSON body
app.use(bodyParser.json());

// Get all comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// Add a comment
app.post('/comments', function(req, res) {
  var comment = req.body;
  comment.id = Date.now();
  comments.push(comment);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 2), function(err) {
    if (err) {
      return res.status(500).end('Internal Server Error');
    }
    res.status(201).end('Comment added');
  });
});

// Start the server
app.listen(3000, function() {
  console.log('Server is running on http://localhost:3000');
});
