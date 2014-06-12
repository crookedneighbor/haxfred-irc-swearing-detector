var Haxfred,
    request = require("request"),
    url = "http://www.wdyl.com/profanity?q=",
    users;
var haxfred_irc_swearing_detector = function(haxfred) {
  Haxfred = haxfred;

  var convertMessage = function(message) {
    var msg = message;
    while(msg.indexOf(" ") > -1) {
      var start = msg.indexOf(" ");
      msg = msg.substring(0, start) + "%20" +  msg.substring(start + 1);
    }
    return msg;
  }

  var checkSwear = function(message, from) {
    request({
       url: url + message,
       json: true
    }, function(error, resp, body) {
        if(body.response == "true") {
          haxfred.irc.say(from + ": Stop swearing");
        } 
    })
  }

  haxfred.on('irc.msg', '', function(data, deferred) {
    var from = data.from,
        message = convertMessage(data.content);
    checkSwear(message, from);
    deferred.resolve();
  });

};

module.exports = haxfred_irc_swearing_detector;
