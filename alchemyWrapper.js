module.exports = (function() { 
  var AlchemyAPI = require('alchemy-api');
  var alchemy    = new AlchemyAPI(process.env.alchemy_key);

  function call(text, callback) { 
    alchemy.sentiment(text, {}, function(err, response) {
      console.log("Response from Alchemy: ");
      console.log(response);
      if (err) { throw err }
      response.docSentiment = (response.docSentiment || { score: 0 });
      callback(response.docSentiment.score)
    });
  };

  return {
    call: call
  }
})();
