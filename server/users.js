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

function findUserByNumber(aNumber) {
  User.find({ "number": aNumber }, function (err, docs) {
    console.log(docs)
    return docs[0];
  })
};

module.exports = {
  addUser: addUser,
  findUserByNumber: findUserByNumber
}
