var express = require('express');
var bodyParser = require('body-parser');
let cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require("path");
const fs = require("fs");
const createError = require('http-errors');


// // MySQL Connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'figure',
//     port: '3306'
// })

// connection.connect((err) => {
//     if (err) {
//         console.log('Error connecting to MySQL database = ', err)
//         return;
//     }
//     console.log('MySQL successfully connected!');
// })


//set routes
var index = require('./routes/index');
var figureRoute = require('./routes/figure.route');


var app = express();

var publicDir = require('path').join(__dirname,'/public'); 
// Add this line to serve our index.html page

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(fileUpload());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/index.html'));
})
// API
app.use('/api', index);
app.use('/figure_api', figureRoute);
  

// 404 Handler
app.use((req, res, next) => {
    next(createError(404))
})


// CREATE PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// 404 Handler
app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})
