require("dotenv").config();
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./api/routes/users')
const config = require("./api/config/database");
const bodyParser = require("body-parser");
const app = express();

// Connect to db
mongoose.connect(config.database, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to mongodb");
});



//allow the app to use json format
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


// Set app Routes
app.use('/api/user', userRoutes)

app.get('/',(req, res, next)=>{
  res.status(200).json({
    message: "Welcome to book-event API"
  })
})
// app.use((req, res, next) => {
//     const error = new Error('Not Found');
//     error.status = 404;
//     next(error)
// })

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

// Start the app
const port = 5000;

const server = http.createServer(app)
// server.listen(port)
console.log("server is starteing on "+ port)

module.exports = server.listen(port);;