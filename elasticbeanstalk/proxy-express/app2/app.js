const express = require('express')
const app = express()

// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/app2/r1', function(req, res) {
  console.log('new request to r1');
  res.send(JSON.stringify({"customer": "Davi"}));
})

app.get('/app2/r2', function(req, res) {
  console.log('new request to r2');
  res.send(JSON.stringify({"customer": "Davi","size":"1kb","message":"blabla"}));
})

app.get('/app2/r2/1mb', function(req, res) {
  console.log('new request to r2 1mb');

  //Read file
  var fs = require('fs');
  var data;

  fs.readFile('./static-responses/response-1mb.json','utf8', function(err, data){

    if (err) res.send(JSON.stringify({"error":"opening json response"}));
    res.send(data);
  });
})

app.get('/app2/r2/5mb', function(req, res) {
  console.log('new request to r2 5mb');

  //Read file
  var fs = require('fs');
  var data;

  fs.readFile('./static-responses/response-5mb.json','utf8', function(err, data){

    if (err) res.send(JSON.stringify({"error":"opening json response"}));
    res.send(data);
  });
})

app.get('/app2/r2/10mb', function(req, res) {
  console.log('new request to r2 10mb');

  //Read file
  var fs = require('fs');
  var data;

  fs.readFile('./static-responses/response-10mb.json','utf8', function(err, data){

    if (err) res.send(JSON.stringify({"error":"opening json response"}));
    res.send(data);
  });
})

app.get('/app2/r2/25mb', function(req, res) {
  console.log('new request to r2 25mb');

  //Read file
  var fs = require('fs');
  var data;

  fs.readFile('./static-responses/response-25mb.json','utf8', function(err, data){

    if (err) res.send(JSON.stringify({"error":"opening json response"}));
    res.send(data);
  });
})

app.get('/app2/r2/50mb', function(req, res) {
  console.log('new request to r2 50mb');

  //Read file
  var fs = require('fs');
  var data;

  fs.readFile('./static-responses/response-50mb.json','utf8', function(err, data){

    if (err) res.send(JSON.stringify({"error":"opening json response"}));
    res.send(data);
  });
})

var server = app.listen(8081, function () {
  console.log("App listening on port 8081");
});
