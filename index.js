const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 80;

// Allowing express to serve the views folder
app.use(express.static('views'))

app.listen(port);
console.log('Server started at http://localhost:' + port);

  

