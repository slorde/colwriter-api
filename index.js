const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const requireDir = require('require-dir').

const app = express();

mongoose.connect(
    "mongodb://localhost:27017/colwriter",
    { useNewUrlParser: true}
);

requireDir("./app/models");

app.listen(8080);