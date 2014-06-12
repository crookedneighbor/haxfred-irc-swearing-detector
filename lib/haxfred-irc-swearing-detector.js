var Haxfred,
    request = require("request"),
    url = "http://www.wdyl.com/profanity?q=",
    users;

var haxfred_irc_random_quotes = function(haxfred) {
  Haxfred = haxfred;

  var convertMessage = function(message) {
    var msg = message;
    while(msg.indexOf(" ") > -1) {
      var start = msg.indexOf(" ");
      msg = msg.substring(0, start) + "%20" +  msg.substring(start);
      console.log(message);
      console.log(msg);
      return msg;
    }
  }

  var checkSwear = function(message) {
    request({
       url: url + message,
       json: true
    }, function(error, response, body) {

    })
  }

  haxfred.on('irc.msg', '', function(data, deferred) {
    var from = data.from,
        message = convertMessage(data.content);
    
    //checkSwear(message);
    deferred.resolve();
  });

};

module.exports = haxfred_irc_random_quotes;
