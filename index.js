const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const dbConfig = require("./config/keys");
const api = require("./routes/api");

const app = express();
const port = 5000; // Choose port as 5000
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
let connection = mysql.createConnection(dbConfig);

connection.connect(err => {
  if (err) {
    console.log(err);
  }
});

app.use("/api", api);

// Starts the server on listening to backend "localhost:5000"
app.listen(port, () => {
  console.log("Server Listening on port " + port);
});