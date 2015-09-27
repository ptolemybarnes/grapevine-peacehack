module.exports = (function() { 
  var geocoder = (function() { 
    var geocoderProvider = 'google';
    var httpAdapter = 'https';
    var extra = {
        apiKey: process.env.gmaps_key, 
        formatter: null        
    };
     
    return require('node-geocoder')(geocoderProvider, httpAdapter, extra);
  })();

  var Alchemy = require('./alchemyWrapper');

  function buildUrlFromTweet(tweet) {
    return "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
  }

  function toFirebase(Firebase, tweetData) {
    Firebase.push(tweetData);
  }

  function build(tweet, callback) { 
    geocoder.geocode(tweet.text).then(function(data) {
      Alchemy.call(tweet.text, function(sentimentScore) { 
        var output = {
          date:      tweet.created_at,
          intensity: 1,
          rating:    sentimentScore,
          lat:       data[0].latitude,
          lng:       data[0].longitude,
          text:      tweet.text,
          url:       buildUrlFromTweet(tweet),
          name:      tweet.user.screen_name
        }
        callback(output)
      });
    });
  }
  
  return {
    build: build,
    toFirebase: toFirebase
  }
})();

