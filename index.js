const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const config = require("config");

const app = express();

if (!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
  }

mongoose.connect(
    "mongodb://localhost:27017/colwriter",
    { useNewUrlParser: true}
);

app.use(express.json());
app.use('/api/users', require('./app/modules/user/user-route.js'));
app.use('/api/projects', require('./app/modules/project/project-route.js'));

requireDir("./app/modules");


app.listen(3000);

module.exports = app;