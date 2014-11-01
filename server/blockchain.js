var agent = require('superagent');

function ping(cb) {

  agent.get('https://blockchain.com')
  .end(function(res) {
    console.log(res);
    if (res.ok) {
      cb(true)
    } else {
      cb(false)
    };
  });
}

function init(app) {
  app.get('/ping', function (req, res) {
    blockchain.ping(function(bRes) {
      if (bRes) {
        res.send('Ping succeeded');
      } else {
        res.send('Ping failed');
      }
    });
  })
}




module.exports = {
  ping: ping,
  init: init
}
