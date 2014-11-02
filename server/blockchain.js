var agent = require('superagent');
var API_CODE = "d00a3a50-d438-463f-ab1b-1d6c5b2d1849";
var API_HOST = "blockchain.info";

function getBlockchainUrl(path) {
  return 'https://' + API_HOST + path;
};


function ping(cb) {

  agent.get(getBlockchainUrl())
    .end(function(res) {
      console.log(res);
      if (res.ok) {
        cb(true)
      } else {
        cb(false)
      };
    });
}

function sendPayment(guid, password, to, amt) {
  var path = '/merchant' + guid + '/payment';

  agent.post(getBlockchainUrl(path))
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .accept('application/json')
    .send({ 'main_password' : password, 'to' : to})
    .end(function(res) {
      if (res.status == "200") {
        try {
          var json = JSON.parse(res.text);
          cb(json);
          console.log('sendPayment: ' + json);
        } catch(e) {
          console.log('sendPayment: Failed to parse JSON');
          console.log(res);
          cb({'error' : 'Failed to parse JSON.', 'xmlres' : res});
        }
      } else {
        var errmsg = res.text || 'Failed to send payment.';
        cb({'error' : errmsg, 'xmlres' : res});
        console.log('sendPayment: Failed to send payment.');
      }

    });
}

function createWallet(password, cb) {

  agent.post(getBlockchainUrl('/api/v2/create_wallet'))
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .accept('application/json')
    .send({ 'password' : password, 'api_code': API_CODE})
    .end(function(res) {
        if (res.status == "200") {
          try {
            var json = JSON.parse(res.text);
            cb(json);
            console.log('createWallet: ' + json);
          } catch(e) {
            console.log('createWallet: Failed to parse JSON');
            console.log(res);
            cb({'error' : 'Failed to parse JSON.', 'xmlres' : res});
          }
        } else {
          var errmsg = res.text || 'Failed to create wallet.';
          cb({'error' : errmsg, 'xmlres' : res});
          console.log('createWallet: Failed to create wallet.');
        }
    });
}

function init(app) {
  app.get('/bc/ping', function (req, res) {
    ping(function(bRes) {
      if (bRes) {
        res.send('Ping succeeded');
      } else {
        res.send('Ping failed');
      }
    });
  });

  app.post('/bc/:guid/pay/:to/amount/:amt', function(req, res) {
    sendPayment(req.params.guid, req.query.password, req.params.to, req.params.amt, function(obj) {
      res.send(obj);
    });
  });

  app.post('/bc/wallet', function(req, res) {
    createWallet(req.body.password, function(obj) {
      res.send(obj);
    });
  });
}


module.exports = {
  ping: ping,
  init: init,
  createWallet: createWallet,
  sendPayment: sendPayment
}
