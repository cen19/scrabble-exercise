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
  var letters = req.body.letters.toLowerCase();
  var results = [];
  var possibleWords = '';

  var wordChecker = function(word, letters) {
    var remaining = letters;
    console.log(remaining);
    for (var i = 0; i < word.length; i++) {
      var currentLetter = word[i];
      if (!remaining.indexOf(currentLetter)) {
        remaining = remaining.slice(0, remaining.indexOf(currentLetter)) + remaining.slice(remaining.indexOf(currentLetter) + 1);
      } else {
        return false;
      }
    }
    return true;
  };

  fs.readFile('dictionary.txt', 'utf8', (err, data) => {
    if (err) { throw err; }
    var dictionaryWords = data.split('\n');

    console.log(dictionaryWords.length);
    
    possibleWords = dictionaryWords.filter(word => (word.length <= letters.length));

    possibleWords.forEach(function(word) {

      if (wordChecker(word.toLowerCase(), letters)) {
        console.log('in here');
        results.push(word);
      }
    });
    res.status(200).send(results);
    
  });

});


app.listen(3000, function () {
  console.log('Scrabble app listening on port 3000!');
});