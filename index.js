const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

// Body Parser to read form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    "auth": { "authSource": "admin" },
    "user": "admin",
    "pass": "admin"
});

//Pug is a template engine for Express
app.set('view engine', 'pug');

//This is the default path for views
app.set('views', path.join(__dirname, './views'));

//This is the default path for static files
app.use(express.static('public'));

// Add routes to the app
app.use('/', routes());

app.listen(3000);