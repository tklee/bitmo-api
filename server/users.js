//var User = mongoose.model('User', { number: String, guid: String, address: String, link: String });
//var user = new User({ name: '4082391232', guid: 'testguid', address: 'testadderss', link: 'testlink' });
//user.save(function (err) {
//  if (err) // ...
//  console.log('Failed to save');
//});

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test');

function addUser(aUser) {
  var User = mongoose.model('User', { number: String, guid: String, address: String, link: String, name: String, password: String });
  var user = new User({ name: aUser.number, guid: aUser.guid, address: aUser.address, link: aUser.link });
  user.save(function (err) {
    if (err) // ...
    console.log('Failed to save');
  });
}

module.exports = {
  addUser: addUser
}

