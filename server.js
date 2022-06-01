require('dotenv').load();
const express = require('express');
const http = require('http');
const { Http2ServerResponse } = require('http2');
const https = require('https');
const path = require('path');
const { nextTick } = require('process');
const app = express();

app.use(function(res, req, next) {
  next();
});

app.get('/', (req, res, next) => {
  const eventID = req.query.eventID;
  const displayName = req.query.displayName
  console.log("here is:", eventID, "and user:", displayName);
  next();
});

app.use( express.static( __dirname + '/' ) );

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Grandstand: listening on port ${port}`);
});