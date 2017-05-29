var async = require('async');
var request = require('request');
var express = require('express');
var app = express();

app.get('/sync/deployments/:name/rpc', function (req, res) {
	var name = req.params['name'];
	var qParams = qParamsToString(req.query);

	runFunc(name, qParams, function(err, results){
		if (err){
			return res.json({status: false, error: err.message});
		}
		return res.json({status: true, output: results.output});
	})
});

function qParamsToString(params) {
    var str = '';
    for (var p in params) {
        if (params.hasOwnProperty(p)) {
            str += p + '=' + params[p] + '&';
        }
    }
    return str.slice(0, -1);
}

var runFunc = function(name, parameters, callback){
	async.waterfall([
	    function(innerCallback) {	        
	        var url = 'https://rest.faaspot.com/api/deployments/' + name + '/rpc?' + parameters;	        
	        callApi(url, function(err, rpcId){
	        	if (err){
	        		return innerCallback(err);
	        	}
	        	return innerCallback(null, rpcId);
	        })
	    },
	    function(rpcId, innerCallback) {
			var inProgress = true;
			var timeout_before_exec_ms = 500;
			async.whilst(
			    function() { return inProgress; },
			    function(innerInnerCallback) {
			    	setTimeout(function(){
				    	var url = 'https://rest.faaspot.com/api/executions/' + rpcId;
				        callApi(url, function(err, results){
				            if (err){
				                return innerInnerCallback(err);
				            }

				            var status = results.status;			            
				            inProgress = status.toLowerCase() != 'success' && status.toLowerCase() != 'failure' && status.toLowerCase() != 'completed';
				            return innerInnerCallback(null, results);
				        })
			    	}, timeout_before_exec_ms);
			    },
			    function (err, results) {
			        if (err){
			        	return innerCallback(err);
			        }
			        return innerCallback(null, results);
			    }
			);	
	    }
	], function (err, results) {
		if (err){
			return callback(err);
		}
		return callback(null, results);
	});
};

var callApi = function(url, callback){		
	request({
		url: url,
		headers : {            
            'Authorization': 'Token ' + process.env.FAASPOT_TOKEN
        }
    }, function (err, response, body) {
		if (err) {
			return callback(err);
		}		

		body = JSON.parse(body);
		return callback(null, body);
	});
};

app.listen(5000, function () {
	console.log('App listening on port 5000!')
});