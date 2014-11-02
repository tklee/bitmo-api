//var User = mongoose.model('User', { number: String, guid: String, address: String, link: String });
//var user = new User({ name: '4082391232', guid: 'testguid', address: 'testadderss', link: 'testlink' });
//user.save(function (err) {
//  if (err) // ...
//  console.log('Failed to save');
//});


var mongoose = require('mongoose')

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };



var mongodbUri = 'mongodb://heroku_app31209122:j2qhlnv9ad4jpatu57gg69vefq@ds049180.mongolab.com:49180/heroku_app31209122';

mongoose.connect('mongodb://localhost/test');
//mongoose.connect(mongodbUri, options);

var User = mongoose.model('User', { number: String, guid: String, address: String, link: String, name: String, password: String });

var defaultHandler = function (err) {
  if (err) // ...
  console.log('Failed to save');
};

function addUser(aUser, cb) {
  var user = new User({ number: aUser.number, guid: aUser.guid, address: aUser.address, link: aUser.link, name: aUser.name, password: aUser.password });
  cb = cb || defaultHandler;
  user.save(cb);
}

// function init(app) {
//   app.get('/findTest', function (req, res, next) {
//     findUserByNumber(req.number, function(bRes, result) {
//       if (bRes) {
//         req.user = result;
//       	next();
//       } else {
// 	res.send(404, 'Invalid request');
//       }
//     });
// }, function(req, res) {
// 	res.send(req.user);
//   });
// }

function init(app) {

  app.get('/user/:number', function (req, res) {
    findUserByNumber(req.params.number, function(bRes, result) {
      if (bRes) {
        res.send(result);
      } else {
        res.send({});
      }
    });
  });
  app.post('/user', function (req, res) {
    console.log(req.body);
    res.send();
  });
}


function findUserByNumber(aNumber, cb) {
  User.find({ "number": aNumber }, function (err, docs) {
    if (docs[0]) {
      console.log('docs[0] exists');
      console.log(docs[0]);
      cb(true, docs[0])
    } else {
      console.log('docs[0] does not exist');
      console.log(docs[0]);
      cb(false, docs[0])
    }
  })
};

module.exports = {
  addUser: addUser,
  findUserByNumber: findUserByNumber,
  init: init
}
