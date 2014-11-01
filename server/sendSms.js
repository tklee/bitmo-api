// Your accountSid and authToken from twilio.com/user/account
var accountSid = 'AC2df5e5b6e67043b626ae32dcec610370';
var authToken = '147a8dd021c103e6140629c3712b0f75';
var client = require('twilio')(accountSid, authToken);
 
function SignUpSMS(phoneNumber, userName){
	client.messages.create({
    body: "Hello " + userName + " You have requested to make a Bitmo ",
    to:   "+1" + phoneNumber,
    from: "+14243325880"
}, function(err, message) {
    process.stdout.write(message.sid);
});
}

function NewAccountSMS(phoneNumber, senderName, password){
	client.messages.create({
    body: "Hey! your friend " + senderName + " just sent you money on bitmo. Got to Bitmo.com Login with your phone number and password( " + password + " ) to retrieve your mula",
    to:   "+1" + phoneNumber,
    from: "+14243325880"
}, function(err, message) {
    process.stdout.write(message.sid);
});
}

// SignUpSMS("8184377808", "Sol");
//NewAccountSMS("8184377808", "Dickson", "pwa34rd");