'use strict';

/*
 * Heavily inspired by the awesome post at
 * http://www.soliantconsulting.com/blog/2013/02/draft-title-generator-using-markov-chains
 */
var Medinator = function(fileName) {
    var self = this;
    this.wordGraph = {};
    this.startWords = [];
    this.terminals = [];
    this.lyrics = [];

    // read files
    var lyricsFile = require('fs').readFileSync(fileName).toString();
    lyricsFile.split(/\r?\n/).forEach(function(line){
        if (line !== '') {
            self.lyrics.push(line);
        }
    });
    this.lyrics = this.lyrics.join(' ');

    var words = this.lyrics.split(' ');
    for (var i = 0; i < words.length - 1; i++) {
        var currentWord = words[i];
        var nextWord = words[i+1];
        
        if (isTerminal(currentWord)) {
            this.terminals.push(currentWord);
            this.startWords.push(nextWord);
        }

        if (this.wordGraph.hasOwnProperty(currentWord)) {
            this.wordGraph[currentWord].push(nextWord); 
        } else {
            this.wordGraph[currentWord] = [ nextWord ]; 
        }   
    }
};

function isTerminal(string) {
    return string.indexOf('.') === string.length - 1;
}

function getNextRandomWord(words) {
    var index = Math.floor(Math.random() * words.length);
    return words[index];
}

Medinator.prototype.getSentence = function() {
    var words = [];
    var word = getNextRandomWord(this.startWords);
    words.push(word);
    while(true) {
        word = getNextRandomWord(this.wordGraph[word]);
        words.push(word);
        if (isTerminal(word)) {
            break;
        }
    }
    var sentence = words.join(' ');

    // If the original lyrics contain the sentence, recurse.
    if (this.lyrics.indexOf(sentence) > -1) {
        sentence = this.getSentence();
    }
    return sentence;
};

module.exports = Medinator;