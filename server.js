require('dotenv').load();
const express = require('express');
const fs = require("fs");
const app = express();

let userSpec = "";

  app.use(function(res, req, next) {
    next();
  });

  app.get('/', (req, res, next) => {
    let displayName = req.query.displayName;
    let eventID = req.query.eventID;
    let identity = req.query.identity;
    let userType = req.query.userType;
      userSpec = '{ "eventID" : ' + JSON.stringify(eventID) + ", ";
      userSpec += '"identity" : ' + JSON.stringify(identity) + ", ";
      userSpec += '"displayName" : ' + JSON.stringify(displayName) + ", ";      
      userSpec += '"userType" : ' + JSON.stringify(userType) + " }";          fs.writeFileSync('./userFile.json', userSpec);
      next();
  });   

  app.use( express.static( __dirname + '/' ) );

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Grandstand: listening on port ${port}`);
});
