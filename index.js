const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
    "mongodb://localhost:27017/colwriter",
    { useNewUrlParser: true}
);

app.listen(8080);