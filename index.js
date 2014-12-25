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

// T.post('statuses/update', { status: 'Jeg har det godt. Kun tonerne fylder mine årer. Og jeg har det godt.' }, function(err, data, response) {
//   console.log(data)
// })


var Medinator = require('./medinator.js');
var medinator = new Medinator('./lyrics/kun_for_mig.txt');
var textLine = medinator.getSentence(10);
console.log(textLine);