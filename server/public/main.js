let lettersOnlyChecker = function(string) {
  var lettersOnly = true;
  for (var i = 0; i < string.length; i++) {
    if (Number(string[i])) {
      lettersOnly = false;
      break;
    }
  }
  return lettersOnly;
};

let submit = function() {
  let letters = document.getElementById('letter-box').value;

  if (letters.length > 7) {
    alert('too many letters');
  } else if (letters.length === 0) {
    alert('input up to 7 letters');
  } else if (!lettersOnlyChecker(letters)) {
    alert('letters only please');
  } else {
    console.log('letters', letters);
    var findWords = new XMLHttpRequest();
    findWords.open('POST', 'http://localhost:3000/words', true);
    findWords.setRequestHeader('Content-type', 'application/json');
    findWords.send(JSON.stringify({letters: letters}));

    findWords.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText, typeof this.responseText);
        var results = JSON.parse(this.responseText);
        document.getElementById('results').value = results.length ? results.join(', ') : 'NO RESULTS';
      }
    };

  }

  // console.log(inputBox, typeof inputBox);
};