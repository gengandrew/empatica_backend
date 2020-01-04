const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const router = express.Router();

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended:true }));

let dbConfig = require("../config/keys");
let connection = mysql.createConnection(dbConfig);

/*
    Http Request for Developer side testing tool used to check
    if database config is valid
*/
router.get("/checkDatabase", (req, res) => {
    res.send(dbConfig);
    console.log(dbConfig);
});

/*
    Http Request for Developer side testing tool used to check
    the contents of the dataTable
*/
router.get("/getDataTableContents", (req, res) => {
    let query = "SELECT * FROM dataTable;";

    let output = connection.query(query, (err, result) => {
        if(err) {
            return res.send(err);
        }
    });

    res.send(output);
});

/*
    Http Request for Developer side testing tool used to check
    the contents of the AccelerationTable
*/
router.get("/getAccelerationTableContents", (req, res) => {
    let query = "SELECT * FROM AccelerationTable;";

    let output = connection.query(query, (err, result) => {
        if(err) {
            return res.send(err);
        }
    });
    
    res.send(output);
});

/*
    Http Request for inserting data into the dataTable using url params
    Example Usage: http://localhost:5000/api/InsertData/1/1/1/1/1/1/1
*/
router.get("/InsertData" + "/:sessionID" + "/:e4Time" + "/:bvp" + "/:eda" + "/:ibi" + "/:heartRate" + "/:temperature",
            (req, res) => {
    console.log(req.params);
    let SessionID = req.params.sessionID;
    let E4Time = req.params.e4Time;
    let BVP = req.patams.bvp;
    let EDA = req.params.eda;
    let IBI = req.params.ibi;
    let HeartRate = req.params.heartRate;
    let Temperature = req.params.temperature;
    
    let query = "INSERT INTO `dataTable`(SessionID,UTC,E4Time,BVP,EDA,IBI,HeartRate,Temperature) "
                    + "VALUES ("+SessionID+",NOW(),"+E4Time+","+BVP+","+EDA+","+IBI+","+HeartRate+","+Temperature+");";
    let output = connection.query(query, (err, result) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send("Success with query " + query);
        }
    });
});

// router.post("/insertDataDepracated", (req, res) => {
//     console.log("hello");
//     console.log(req.body);
//     let SessionID = req.body.sessionID;
//     let E4Time = req.body.e4Time;
//     let BVP = req.body.bvp;
//     let EDA = req.body.eda;
//     let IBI = req.body.ibi;
//     let HeartRate = req.body.heartRate;
//     let Temperature = req.body.temperature;
    
//     let query = "INSERT INTO `dataTable`(SessionID,UTC,E4Time,BVP,EDA,IBI,HeartRate,Temperature) "
//                     + "VALUES ("+SessionID+",NOW(),"+E4Time+","+BVP+","+EDA+","+IBI+","+HeartRate+","+Temperature+");";
//     let output = connection.query(query, (err, result) => {
//         if(err) {
//             return res.send(err);
//         } else {
//             return res.send("Success with query " + query);
//         }
//     });
// });

module.exports = router;