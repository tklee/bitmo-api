var express = require('express')
var blockchain = require('./blockchain');
var app = express()

blockchain.init(app);

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Bitmo API server listening at http://%s:%s', host, port)

})
