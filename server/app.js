const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('index.html');
});

app.post('/words', function(req, res) {
  // console.log(req.body.letters);
  var letters = req.body.letters;
  var results = [];
  var possibleWords = '';

  fs.readFile('dictionary.txt', 'utf8', (err, data) => {
    if (err) { throw err; }
    var dictionaryWords = data.split('\n');
    console.log(dictionaryWords.length);
    possibleWords = dictionaryWords.filter(word => (word.length <= letters.length));

    possibleWords.forEach(function(word) {
      for (var i = 0; i < word.length; i++) {
        
      }
    });
  
  });

  


  res.status(200).send(req.body);
});


app.listen(3000, function () {
  console.log('Scrabble app listening on port 3000!');
});