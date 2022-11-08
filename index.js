// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

let utc_out, unix_out, date_string;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  date_string = req.params.date;
  if (!isNaN(parseInt(date_string)) && date_string.match(/^[0-9]+$/) != null) {
    unix_out = Math.floor(new Date(parseInt(date_string)).getTime());
    utc_out = new Date(parseInt(date_string)).toUTCString();
    res.json({unix: parseInt(unix_out), utc: utc_out});
  } 
  if (new Date(date_string) == 'Invalid Date') {
    res.json({error: 'Invalid Date'});
  } else {
    unix_out = Math.floor(new Date(date_string).getTime());
    utc_out = new Date(date_string).toUTCString();
    res.json({unix: parseInt(unix_out), utc: utc_out});
  }
});

app.get("/api/", function (req, res) {
  unix_out = Math.floor(new Date().getTime());
  utc_out = new Date().toUTCString();
  res.json({unix: parseInt(unix_out), utc: utc_out});
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3500, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
