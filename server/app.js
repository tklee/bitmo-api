var express = require('express')
var blockchain = require('./blockchain');
var app = express()
var u = require('./users.js')
var bodyParser = require('body-parser');
var logger = require('morgan');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


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

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Bitmo API server listening at http://%s:%s', host, port)

})
