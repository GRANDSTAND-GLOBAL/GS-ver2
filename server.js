require('dotenv').load();
const express = require('express');
const userFile = require('./userFile.json');
var fs = require("fs");
const app = express();
const { createToken, saveToken, displayName, eventID, identity } = require('./getAuth.js');

let userDef = "{ ";

  app.use(function(res, req, next) {
    next();
  });

  app.get('/', (req, res, next) => {
    let displayName = req.query.displayname;
    let eventID = req.query.eventID;
    let identity = req.query.identity;
      userDef += '"eventID" : ' + JSON.stringify(eventID) + ", ";
      userDef += '"identity" : ' + JSON.stringify(identity) + ", ";
      userDef += '"displayName" : ' + JSON.stringify(displayName) + " }";      
    fs.writeFileSync('./userFile.json', userDef);
      console.log("write is: ", userDef);
      next();
  });   

  app.use( express.static( __dirname + '/' ) );

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Grandstand: listening on port ${port}`);
});
module.exports = { displayName, eventID, identity };
