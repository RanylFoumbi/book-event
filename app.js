// App initialization
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const appRoutes = require("./api/routes");
const mongoose = require("mongoose");
const morgan = require("morgan");
const http = require('http')
const config = require("./api/config/database");
const { FILE_SIZE_LIMIT } = require("./api/utils/utils");
const app = express();

// Connect to db
mongoose.connect(config.database);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to mongodb");
});

app.use(morgan('dev'))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Type, Accept, Content-Type, X-Auth-Token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//allow the app to use json format
app.use(bodyParser.json({ limit: FILE_SIZE_LIMIT }));
app.use(bodyParser.urlencoded({ limit: FILE_SIZE_LIMIT, extended: true }));
app.use(bodyParser.text({ limit: FILE_SIZE_LIMIT, extended: true }));

// Set app Routes
app.use("/api/v1", appRoutes());

/*server runtime port */
const port = process.env.PORT || 5000
const server = http.createServer(app);
server.listen(port,()=>{
  console.log(`server started on ${port}`)
});
