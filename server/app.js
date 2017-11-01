const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('index.html');
});

app.post('/words', function(req, res) {
  // console.log(req.body.letters);
  var results = [];

  



  res.status(200).send(req.body);
});


app.listen(3000, function () {
  console.log('Scrabble app listening on port 3000!');
});