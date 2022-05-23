const express = require('express');
const app = express();
//const bundle = require('./bundle');

require('dotenv').load();

app.use( express.static( __dirname + '/' ));

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Grandstand: listening on port ${port}`);
});

app.get('/',(req,res) => {
  res.sendFile(__dirname + '/index.html');
});