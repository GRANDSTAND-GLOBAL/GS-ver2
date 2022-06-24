require('dotenv').load();
const express = require('express');
const fs = require("fs");
//const userFile = require('./userFile.json');

const app = express();
const { createToken, saveToken, displayName, eventID, identity } = require('./getAuth.js');

let userSpec = "";

  app.use(function(res, req, next) {
    next();
  });

  app.get('/', (req, res, next) => {
    let displayName = req.query.displayName;
    let eventID = req.query.eventID;
    let identity = req.query.identity;
      userSpec = '{ "eventID" : ' + JSON.stringify(eventID) + ", ";
      userSpec += '"identity" : ' + JSON.stringify(identity) + ", ";
      userSpec += '"displayName" : ' + JSON.stringify(displayName) + " }";      
    fs.writeFileSync('./userFile.json', userSpec);
    console.log("write is: ", userSpec);

      next();
  });   

  app.use( express.static( __dirname + '/' ) );

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Grandstand: listening on port ${port}`);
});
