var geocoder = (function() { 
  var geocoderProvider = 'google';
  var httpAdapter = 'https';
  var extra = {
      apiKey: process.env.gmaps_key, 
      formatter: null        
  };
   
  return require('node-geocoder')(geocoderProvider, httpAdapter, extra);
})();

require('dotenv').load();
var R        = require("ramda");

var FirebaseClient = require('firebase');
var Twitter = require("twitter");
var client  = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

var Firebase = new FirebaseClient(process.env.firebase_url).child("tweets");

client.stream('statuses/filter', { track: "#grapevine-syria-test" }, function(stream) { 
  stream.on('data', function(tweet) {
    createTweetEntry(tweet, tweetHandler)
  });

  stream.on('error', function(error) {
    throw error;
  });
});

function createTweetEntry(tweet, callback) {
  geocoder.geocode(tweet.text).then(function(data) {
    var output = {
      date:      tweet.created_at,
      intensity: "",
      lat:       data[0].latitude,
      long:      data[0].longitude,
      rating:    "",
      text:      tweet.text,
      url:       buildUrlFromTweet(tweet)
    }
    callback(output)
  });
}

function buildUrlFromTweet(tweet) {
  return "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
}

function tweetHandler(tweet) {
  Firebase.push(tweet)
}

