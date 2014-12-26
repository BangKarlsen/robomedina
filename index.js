if (!process.env.medinabot_consumer_key || 
    !process.env.medinabot_consumer_secret || 
    !process.env.medinabot_access_token || 
    !process.env.medinabot_access_token_secret) {
    throw new Error('Environment variables are not initialised!');
}

var Twit = require('twit');
var T = new Twit({
    consumer_key: process.env.medinabot_consumer_key,
    consumer_secret: process.env.medinabot_consumer_secret,
    access_token: process.env.medinabot_access_token,
    access_token_secret: process.env.medinabot_access_token_secret
});

var Medinator = require('./medinator.js');
var medinator = new Medinator('./lyrics/kun_for_mig.txt');

var sentence = '';
while(true) {
    var nextSentence = medinator.getSentence() + ' ';
    if (sentence.length + nextSentence.length < 140) {
        sentence += nextSentence;
    } else {
        break;
    }
}

console.log(sentence +'[' + sentence.length + ']');

// T.post('statuses/update', { status: sentence }, function(err, data, response) {
//   console.log(data)
// })
