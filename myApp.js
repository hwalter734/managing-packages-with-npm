var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('dotenv').config();

function newDate() {
  return Date().toString();
};

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

console.log('Hello World');

absolutePath = __dirname + '/views/index.html'
app.get('/', function(req, res) {
  res.sendFile(absolutePath);
});


app.use('/public', express.static(__dirname + '/public'));

// app.get('/json', function(req, res) {
//   res.json({'message': 'Hello json'})
// });

app.get('/json', function(req, res) {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({'message': 'HELLO JSON'})
    }
    else {
        res.json({'message': 'Hello json'})
    }
  });


app.get('/now', function(req, res, next) {
  req.time = newDate();
  next();
}, function(req, res) {
  res.json({time: req.time})
});

app.get('/:word/echo', function(req, res) {
  res.json({echo: req.params.word})
});

app.get('/name', function(req, res) {
  res.json({name: req.query.first + ' ' + req.query.last})
}).post('/name', function(req, res) {
  res.json({name: req.body.first + ' ' + req.body.last})
});

 module.exports = app;