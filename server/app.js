var express = require('express')
var blockchain = require('./blockchain');
var app = express()
var u = require('./users.js')

blockchain.init(app);

app.get('/', function (req, res) {
  res.send('Hello World!')

  myUser = { "number": "4081112222", "guid": "new_guid", "address":"new_adress", "link":"new_link", "name":"new_name", "password":"new_password" };
  u.addUser(myUser);
})
>>>>>>> a5a70d26e5b6beb5099a1fc0e35c975d236abe19

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Bitmo API server listening at http://%s:%s', host, port)

})
