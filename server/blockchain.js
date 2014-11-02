var agent = require('superagent');
var API_CODE = "d00a3a50-d438-463f-ab1b-1d6c5b2d1849";
var API_HOST = "blockchain.info";

function getEndpointUrl(path) {


};


function ping(cb) {

  agent.get('https://blockchain.info')
    .end(function(res) {
      console.log(res);
      if (res.ok) {
        cb(true)
      } else {
        cb(false)
      };
    });
}


/**

 createWallet
 Sample Error
  {"req":
    {"method":"POST",
    "url":"https://blockchain.info/api/v2/create_wallet",
    "data": { "password":"hello","api_code":"d00a3a50-d438-463f-ab1b-1d6c5b2d1849"}
   },
   "header": {
     "server":"cloudflare-nginx",
     "date":"Sun, 02 Nov 2014 00:11:35 GMT",
     "content-type":"text/plain;charset=UTF-8",
     "content-length":"53",
     "connection":"close",
     "set-cookie":["__cfduid=d800df347499f3524914a3a4c3c279ce11414887094832; expires=Mon, 23-Dec-2019 23:50:00 GMT; path=/; domain=.blockchain.info; HttpOnly"],
     "content-language":"en",
     "content-security-policy":"img-src 'self' data: https://blockchain.info; style-src 'self' 'unsafe-inline'; frame-src 'none'; script-src 'self'; connect-src 'self' *.blockchain.info wss://*.blockchain.info ws://*.blockchain.info; object-src 'none'; media-src 'none'; font-src 'none';","strict-transport-security":"max-age=31536000",
     "cache-control":"max-age=0, no-cache, no-store, must-revalidate",
     "pragma":"no-cache",
     "expires":"Thu, 01 Jan 1970 00:00:00 GMT",
     "cf-ray":"182c1d96bbe00d97-SJC"
    },
    "status":500,
    "text":"Password Must be greater than 10 characters in length"
 }

 Sample success
 {"req":
  {"method":"POST",
   "url":"https://blockchain.info/api/v2/create_wallet",
   "data":{"password":"helloworld!","api_code":"d00a3a50-d438-463f-ab1b-1d6c5b2d1849"}},
   "header":{
      "server":"cloudflare-nginx",
      "date":"Sun, 02 Nov 2014 00:18:06 GMT",
      "content-type":"application/json;charset=UTF-8",
      "transfer-encoding":"chunked",
      "connection":"close",
      "set-cookie":["__cfduid=d09f59dceb51ddc7170d77bfb56a6a3821414887485910; expires=Mon, 23-Dec-2019 23:50:00 GMT; path=/; domain=.blockchain.info; HttpOnly"],
      "content-language":"en",
      "content-security-policy":"img-src 'self' data: https://blockchain.info; style-src 'self' 'unsafe-inline'; frame-src 'none'; script-src 'self'; connect-src 'self' *.blockchain.info wss://*.blockchain.info ws://*.blockchain.info; object-src 'none'; media-src 'none'; font-src 'none';",
      "strict-transport-security":"max-age=31536000",
      "cache-control":"max-age=0, no-cache, no-store, must-revalidate",
      "pragma":"no-cache",
      "expires":"Thu, 01 Jan 1970 00:00:00 GMT",
      "cf-ray":"182c2722f1c60d97-SJC",
      "content-encoding":"gzip"
    },
    "status":200,
    "text":"{\"address\":\"1iePPszgHzA7849aR7hdgBgrTZhzvFLNZ\",\"link\":\"https:\\/\\/blockchain.info\\/wallet\\/8acd15c6-3ee3-46e4-bc06-28290b1fad9b\",\"guid\":\"8acd15c6-3ee3-46e4-bc06-28290b1fad9b\"}"
}

 */


function createWallet(password, cb) {

  agent.post('https://blockchain.info/api/v2/create_wallet')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .accept('application/json')
    .send({ 'password' : password, 'api_code': API_CODE})
    .end(function(res) {
        if (res.status == "200") {
          try {
            var json = JSON.parse(res.text);
            cb(json);
            console.log('createWallet: ' + json);
          } catch(e) {
            console.log('createWallet: Failed to parse JSON');
            cb({'error' : 'Failed to parse JSON.' });
          }
        } else {
          cb({'error' : 'Failed to create wallet.' });
          console.log('createWallet: Failed to create wallet.');
        }


    });
}

function init(app) {
  app.get('/ping', function (req, res) {
    ping(function(bRes) {
      if (bRes) {
        res.send('Ping succeeded');
      } else {
        res.send('Ping failed');
      }
    });
  });

  app.post('/create-wallet', function(req, res) {
    createWallet('helloworld!', function(obj) {
      res.send(obj);
    });
  });
}


module.exports = {
  ping: ping,
  init: init
}
