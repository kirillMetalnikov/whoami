// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/api", function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  var result = {};
  result.ip = req.headers["x-forwarded-for"].split(",")[0]
  result.language = req.headers["accept-language"].split(",")[0]
  result.software = req.headers["user-agent"].match(/\((.+)\)/)[1]
  
 // res.write(JSON.stringify(result));
  res.end(JSON.stringify(result));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
