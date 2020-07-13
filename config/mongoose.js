// Require mongoose for db
const mongoose = require('mongoose');

// Connection with db collection
mongoose.connect('mongodb://localhost/hospital_API');

const db = mongoose.connection;


// error in connecting db
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


// connection done successfully
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


// exporting the connected db
module.exports = db;