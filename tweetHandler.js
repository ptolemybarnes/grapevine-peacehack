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
  
  function removeHashtag(tweetText) {
    var regexp = new RegExp('#([^\\s]*)','g');
    return tweetText.replace(regexp, '');
  }

  function build(tweet, callback) { 
    var text = removeHashtag(tweet.text);
    geocoder.geocode(text).then(function(data) {
      Alchemy.call(text, function(sentimentScore) { 
        if (!data[0]) { return }
        var output = {
          date:      tweet.created_at,
          intensity: 1,
          rating:    (sentimentScore || 0),
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

