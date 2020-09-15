const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js');    //db connection
var photographerRoutes = require('./routes/photographers-routes');
var userRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use('/api/photographer', photographerRoutes);
app.use('/api/user', userRoutes);
app.use('/api', (req, res)=> {
  res.send("Server stared");
});

app.use((error, req, res, next) => {
  if(res.headerSent)
  {
    return next(error);
  } else
  {
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'})
  }

});

module.exports = app;
