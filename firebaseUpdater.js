var FirebaseClient = require('firebase');
var Twitter        = require("twitter");
var TweetHandler   = require("./tweetHandler.js");

var client  = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

var Firebase = new FirebaseClient(process.env.firebase_url).child("tweets");

client.stream('statuses/filter', { track: "#grapevinesyria" }, function(stream) { 

  stream.on('data', function(tweet) {
    TweetHandler.build(tweet, function(tweetData) {
      TweetHandler.toFirebase(Firebase, tweetData)
    });
  });

  stream.on('error', function(error) {
    console.log("ERROR");
    console.log(error);
  });

});
