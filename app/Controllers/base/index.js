const request = require('request');
//read页面
exports.wxconfig = function(req,res){
	var url = req.body.url
	var ticket = access_token()
	var signatureStr = sign(ticket,url)
	res.json({
		        'signatureStr': signatureStr,
		    })

}

function access_token() {
	var appID = "wx189321a109722890";
	var appSecret = "296773ff0796a68be4c5a048ff58a9fa";
	// 获取access_token
	var tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appID+'&secret='+appSecret;
	request(tokenUrl, function (error, response, body) {
	  if (response.statusCode === 200) {
	    body = JSON.parse(body); 
	    var access_token = body.access_token
	    return ticket(access_token)
		}
	})
}

function ticket(access_token) {
	var ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi';
	request(ticketUrl, function (err, response, content) {
	  content = JSON.parse(content);
	  if (content.errcode == 0) {
	  	var ticket = content.ticket
	    return ticket
	  }
	})
}


function sign(jsapi_ticket, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  var string = raw(ret);
  jsSHA = require('jssha');
  shaObj = new jsSHA(string, 'TEXT');
  ret.signature = shaObj.getHash('SHA-1', 'HEX');

  return ret
};

function raw(args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });
  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

// 随机字符串
function createNonceStr() {
  return Math.random().toString(36).substr(2, 15);
};
	
// 时间戳
function createTimestamp() {
  return parseInt(new Date().getTime() / 1000) + '';
};
