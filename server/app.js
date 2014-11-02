var express = require('express')
var blockchain = require('./blockchain');
var app = express()
var u = require('./users.js')
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
  blockchain.createWallet(req.body.password, function(obj) {
    u.addUser({
      'number': req.body.phone,
      'guid':  obj.guid,
      'address': obj.address,
      'link': obj.link,
      'name': req.body.name,
      'password': req.body.password
    });
    res.send({'guid': obj.guid, 'number': req.body.phone, 'name': req.body.name});
  });
})

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
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Bitmo API server listening at http://%s:%s', host, port)

})
