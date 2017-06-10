/**
 * Created by vishwas on 4/6/17.
 */
const express        = require('express');
// const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes')(app, {});

app.listen(port, () => {
    console.log('We are live on ' + port);
});