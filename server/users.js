//var User = mongoose.model('User', { number: String, guid: String, address: String, link: String });
//var user = new User({ name: '4082391232', guid: 'testguid', address: 'testadderss', link: 'testlink' });
//user.save(function (err) {
//  if (err) // ...
//  console.log('Failed to save');
//});

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test');

var User = mongoose.model('User', { number: String, guid: String, address: String, link: String, name: String, password: String });
function addUser(aUser) {
  var user = new User({ number: aUser.number, guid: aUser.guid, address: aUser.address, link: aUser.link, name: aUser.name, password: aUser.password });
  user.save(function (err) {
    if (err) // ...
    console.log('Failed to save');
  });
}

function init(app) {
  app.get('/findTest', function (req, res) {
    findUserByNumber("4082223333", function(bRes) {
      if (bRes) {
        res.send('find succeeded');
      } else {
        res.send('find failed');
      }
    });
  });
}

function findUserByNumber(aNumber, cb) {
  User.find({ "number": aNumber }, function (err, docs) {
    // dangerous to keep waiting
    if (docs[0]) {
      cb(true)
    } else {
      cb(false)
    }
  })
};

module.exports = {
  addUser: addUser,
  findUserByNumber: findUserByNumber,
  init: init
}
