'use strict';

// API Gateway's Lambda proxy integration requires a
// Lambda function to return JSON in this format;
// see the Developer Guide for further details
const createResponse = (statusCode, body) => {

    // to restrict the origin for CORS purposes, replace the wildcard
    // origin with a specific domain name
    return {
        statusCode: statusCode,
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
};


// API call to retrieve all TODO items

exports.getRandom = async (event) => {

    try {
      console.log('new request to getRandom');
      const randomNumber = Math.floor(Math.random() * 100) + 1;

      //Read file
      var file;
      var fs = require('fs');
      var data;

      if (randomNumber < 70)
        file = "../static-responses/response-1kb.json"
      else if (randomNumber >= 70 && randomNumber < 87)
        file = "../static-responses/response-1mb.json"
      else if (randomNumber >= 87 && randomNumber < 93)
        file = "../static-responses/response-5mb.json"
      else if (randomNumber >= 93 && randomNumber < 97)
        file = "../static-responses/response-10mb.json"
      else if (randomNumber >= 97 && randomNumber < 99)
        file = "../static-responses/response-25mb.json"
      else if (randomNumber >= 99)
        file = "../static-responses/response-50mb.json"
      else file = "../static-responses/response-1kb.json"

      console.log('opening ' + file);

      fs.readFile(file,'utf8', function(err, data){
        if (err) res.send(JSON.stringify({"error":"opening json response"}));
        console ('successfully retrieve data');
        return createResponse(200, JSON.stringify(data) + '\n');
      });

    }
    catch(err) {
        console.log(`GET RANDOM FAILED, WITH ERROR: ${err}`);
        return createResponse(500, err);
    }
};
