// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var strftime = require('strftime')
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/:time", function (req, res) {
  if (/^\d+$/.test(req.params.time)) {
     var result = new Date (+req.params.time * 1000);
  } else {
    result = new Date (req.params.time);
  }
  
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify( {unix: result.valueOf() / 1000, natural: (result.valueOf()  ? strftime("%B %e, %Y", result) : null)} ));
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});