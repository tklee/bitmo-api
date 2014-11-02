var express = require('express')
var blockchain = require('./blockchain');
var app = express()
var u = require('./users.js')
var t = require('./sendSms.js')
var bodyParser = require('body-parser');
var logger = require('morgan');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


var allowCrossDomain = function(req, res, next) {
 res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 next();
}
app.use(allowCrossDomain);

blockchain.init(app);
u.init(app);


app.get('/', function (req, res) {
  res.send('Hello World!')

  //myUser = { "number": "4081112222", "guid": "new_guid", "address":"new_adress", "link":"new_link", "name":"new_name", "password":"new_password" };
  myUser = { "number": "4082223333", "guid": "new_guid", "address":"new_adress", "link":"new_link", "name":"new_name", "password":"new_password" };
  u.addUser(myUser);
})

app.get('/testSearch', function (req, res) {
  res.send('Hello World!')

  res.send(u.findUserByNumber("4082223333").number);
})

app.post('/account', function(req, res) {
  blockchain.createWallet(req.body.password, function(newWallet) {
    u.addUser({
      'number': req.body.phone,
      'guid':  newWallet.guid,
      'address': newWallet.address,
      'link': newWallet.link,
      'name': req.body.name,
      'password': req.body.password
    }, function(err) {
      if (err) {
        res.send(err);
      } else {

        res.send(newWallet);        
      }

    });

  });
})

app.post('/user/:from/pay/:to/amount/:amt', function(req, res) {
  u.findUserByNumber(req.params.from, function(senderFound, sender) {

    if (senderFound) {
      u.findUserByNumber(req.params.to, function(receiverFound, receiver) {

        if (receiverFound) {
          blockchain.sendPayment(sender.guid, sender.password, receiver.address, req.params.amt, function(obj) {
            res.send(obj);
          });
        } else {
          var randomPass = "RANDOM";

          blockchain.createWallet(randomPass, function(newWallet) {
            u.addUser({
              'number': req.params.to,
              'guid':  newWallet.guid,
              'address': newWallet.address,
              'link': newWallet.link,
              'name': '',
              'password': randomPass
            });

            blockchain.sendPayment(sender.guid, sender.password, newWallet.address, req.params.amt, function(obj) {
              res.send(obj);
            });

            t.NewAccountSMS(sender.name, req.params.to, randomPass);

            //res.send({'guid': obj.guid, 'number': req.body.phone, 'name': req.body.name});
          });
        }
      });
    } else {
      res.send({ 'error' : 'User does not have an account'});
    }
  });
})

/*
app.post('/user/:phone/pay/:to/amount/:amt', function(req, res) {
  u.findUserByNumber(req.params.phone, function(bRes, result) {
    if (bRes) {
      blockchain.sendPayment(result.guid, result.password, req.params.to, req.params.amt, function(obj) {
        res.send(obj);
      });
    } else {
      res.send({});
    }
  });
  u.findUserByNumber(req.params.phone, function(bRes, result) {
    if (bRes) {
      blockchain.sendPayment(result.guid, result.password, req.params.to, req.params.amt, function(obj) {
        res.send(obj);
      });
    } else {
      res.send({});
    }
  });
})
*/

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Bitmo API server listening at http://%s:%s', host, port)

})
