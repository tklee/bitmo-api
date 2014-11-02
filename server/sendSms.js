// Your accountSid and authToken from twilio.com/user/account
var accountSid = 'AC2df5e5b6e67043b626ae32dcec610370';
var authToken = '147a8dd021c103e6140629c3712b0f75';
var client = require('twilio')(accountSid, authToken);
 
function SignUpSMS(User){
	client.messages.create({
    body: "Hello " + User.name + " You have requested to make a Bitmo ",
    to:   "+1" + User.number,
    from: "+14243325880"
}, function(err, message) {
    process.stdout.write(message.sid);
});
}

function NewAccountSMS(Sender , Receiver){
	client.messages.create({
    body: "Hey! your friend " + Sender.name + " just sent you money on bitmo. Go to Bitmo.com Login with your phone number and password( " + Receiver.password + " ) to own your coin",
    to:   "+1" + Receiver.number,
    from: "+14243325880"
}, function(err, message) {
    process.stdout.write(message.sid);
});
}

// Receiver = {
// 	name: "User1",
// 	phoneNumber: "8184377808",
// 	password: "pa22w4rd"
// };

// Sender = {
// 	name: "Sender User",
// 	phoneNumber: "8184377808",
// 	password: "pa22w4rd"
// };

// SignUpSMS(Receiver);

// NewAccountSMS(Sender, Receiver);
