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

  function buildUrlFromTweet(tweet) {
    return "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
  }

  function toFirebase(Firebase, tweetData) {
    console.log(tweetData);
    Firebase.push(tweetData);
  }

  function build(tweet, callback) { 
    geocoder.geocode(tweet.text).then(function(data) {
      console.log(data[0]);
      var output = {
        date:      tweet.created_at,
        intensity: "",
        rating:    "",
        lat:       data[0].latitude,
        lng:       data[0].longitude,
        text:      tweet.text,
        url:       buildUrlFromTweet(tweet)
      }
      callback(output)
    });
  }
  
  return {
    build: build,
    toFirebase: toFirebase
  }
})();

