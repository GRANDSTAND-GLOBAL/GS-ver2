require('dotenv').load();
const express = require('express');
const app = express();
const { createToken, displayName, eventID, identity } = require('./getAuth.js');

app.use(function(res, req, next) {
  next();
});

  app.get('/', (req, res, next) => {
    let displayName = req.query.displayname;
    let eventID = req.query.eventID;
    let identity = req.query.identity;
    next();
  });    

  app.use( express.static( __dirname + '/' ) );

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Grandstand: listening on port ${port}`);
});
module.exports = { displayName, eventID, identity };
