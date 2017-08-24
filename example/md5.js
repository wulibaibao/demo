var crypto = require('crypto');

var md5 = (str) => {
            	var obj = crypto.createHash('md5');
            	obj.updata(str);
            	var result = obj.degest('hex');
            	return result;
        	}