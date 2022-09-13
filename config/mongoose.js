// require the library
const mongoose = require('mongoose');

//make the connection to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//Acquire the connection (to check if it is successful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to the db'));

//up and running then print the message

db.once('open', function(){
    console.log('Successfully connected to the database');
})

exports = db;