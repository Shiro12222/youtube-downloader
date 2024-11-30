const express = require("express");
const cors = require("cors");

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

// Home page
app.get('/', function(req, res) {
  res.render('layouts/main');
});

app.listen(process.env.PORT, function() {
  console.log(`Server is running on port ${process.env.PORT}`);
});