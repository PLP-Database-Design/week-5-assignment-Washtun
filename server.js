// Declaring Dependences / variables

// HTTP framework for handling request
const express = require('express');

// Instance of express framework
const app = express();

// DBMS MySQL
const mysql = require ('mysql2');

// Cross Origin Resource Sharing
const cors = require('cors');

// Environment Variable doc
const dotenv = require('dotenv');


app.use(express.json());
app.use(cors());
dotenv.config();

// THIS IS FOR TESTING PURPOSES ONLY
//app.get('', (req, res) => {
 //  res.send('Hello world')
//})

//THE CODE ENDS HERE

// Creating a Connection to the hospital_db database ***

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Checking if db connection works
db.connect((err) => {
    // When connection not successful
    if (err) return console.log("Error connecting to the mysql database");
        
    // When connection is successful
    console.log("Connected to mysql successfully as id: ", db.threadId);
});


// RETRIEVING DATA FROM THE DATABASE USING THE 'GET' METHOD
// GET METHOD USING ejs, "This Usually changes for different projects"
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Retrieving all Patients
// '/get-patients is a route
app.get('/get-patients',(req, res) => {
    const getPatients = "SELECT * FROM patients"
    db.query(getPatients, (err, results) => {
        // an error can occur
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving patients record');
        }
        else {
            // Render the data in a template
            res.render('get-patients', {results: results});
        }
    });
} );


// Retrieving all Providers
// '/get-providers is another route
app.get('/get-providers',(req, res) => {
    const getProviders = "SELECT * FROM providers"
    db.query(getProviders, (err, results) => {
        // an error can occur
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving Providers records');
        }
        else {
            // Render the data in a template
            res.render('get-providers', {results: results});
        }
    });
} );


// Retrieving Patients by First Name
// '/get-patients-first-name is a route
app.get('/get-patients-first-name',(req, res) => {
    const getPatientsFirstName = "SELECT * FROM patients"
    db.query(getPatientsFirstName, (err, results) => {
        // an error can occur
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving patients first names');
        }
        else {
            // Render the data in a template
            res.render('get-patients-first-name', {results: results});
        }
    });
} );


// Retrieving all Providers by their specialty
// '/get-providers-specialty is another route
app.get('/get-providers-specialty',(req, res) => {
    const getProvidersSpecialty = "SELECT * FROM providers"
    db.query(getProvidersSpecialty, (err, results) => {
        // an error can occur
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving Providers records by specialty');
        }
        else {
            // Render the data in a template
            res.render('get-providers-specialty', {results: results});
        }
    });
} );

const PORT = 3300;

// Listening to server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})