const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const dbConfig = require("./config/keys");
const api = require("./routes/api");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
const port = 5000;  // Chooses the defult port specified on server or port 5000
let connection = mysql.createConnection(dbConfig);

connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("sucess");
  }
});

app.use("/api", api);

// Starts the server on listening to backend "localhost:5000"
app.listen(port, () => {
  console.log("Server Listening on port " + port);
});