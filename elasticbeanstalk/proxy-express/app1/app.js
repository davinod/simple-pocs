const express = require('express')
const app = express()

// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

app.get('/', function (req, res) {
  res.send({"message":"Hello World!"});
})

app.get('/app1/r2', function(req, res) {
  console.log('new request to r2');
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  var r2Path ;


  if (randomNumber < 70)
    r2Path = "app2/r2"
  else if (randomNumber >= 70 && randomNumber < 87)
    r2Path = "app2/r2/1mb"
  else if (randomNumber >= 87 && randomNumber < 93)
    r2Path = "app2/r2/5mb"
  else if (randomNumber >= 93 && randomNumber < 97)
    r2Path = "app2/r2/10mb"
  else if (randomNumber >= 97 && randomNumber < 99)
    r2Path = "app2/r2/25mb"
  else if (randomNumber >= 99)
    r2Path = "app2/r2/50mb"
  else r2Path = "app2/r2"

  var message = {r2Path:r2Path,
                 randomNumber:randomNumber}

  console.log(JSON.stringify(message));

  //res.send(message);

  /*var http = require('http');

  var headers = {
    "Content-Type": "application/json"
  };

  var options = {
      host: "app2-dev-davi.ap-southeast-2.elasticbeanstalk.com",
      port: 80,
      path: r2Path,
      method: "GET",
      headers: headers
  };

  var req2 = http.request(options, function(res2) {
    res2.on('data', function(data) {
      console.log("received data: " + data);
      res.send(data);
    });
  });

  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
    res.send(JSON.stringify({"error":"could not put internal request"}));
  });*/

  const request = require('request');

  request('http://app2-dev-davi.ap-southeast-2.elasticbeanstalk.com/' + r2Path , function (error, response, body) {
    if (error) console.log("error")
    if (!error && response.statusCode == 200) {
      res.send(body)
      console.log(body) // Show the HTML for the Google homepage.
    }
  });

  //res.send({"message":"Done"});

})

var server = app.listen(8081, function () {
  console.log("App listening on port 8081");
});
