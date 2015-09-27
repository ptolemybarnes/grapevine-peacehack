module.exports = (function() { 
  var AlchemyAPI = require('alchemy-api');
  var alchemy    = new AlchemyAPI(process.env.alchemy_key);

  function call(text, callback) { 
    alchemy.sentiment(text, {}, function(err, response) {
      if (err) { throw err }
      callback(response.docSentiment.score)
    });
  };

  return {
    call: call
  }
})();
