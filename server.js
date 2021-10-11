const express = require('express');
const bodyParser = require('body-parser');

var multer = require('multer');
var upload = multer();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application."});
});
 
// Require Notes routes
require('./app/routes/note.routes.js')(app);

const port = process.env.PORT || 3000;
// listen for requests
app.listen(port, () => {
    console.log("Server is listening");
});