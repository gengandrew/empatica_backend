const express = require("express");
const mysql = require("mysql");
const router = express.Router();

let dbConfig = require("../config/keys");
let connection = mysql.createConnection(dbConfig);

/*
    Http Request for Developer side testing tool used to check
    if database config is valid
*/
router.get("/checkDatabaseConfig", (req, res) => {
    res.send(dbConfig);
    console.log(dbConfig);
});

/*
    Http Request for Developer side testing tool used to check
    the contents of the dataTable
*/
router.get("/getDataTableContents", (req, res) => {
    let query = "SELECT * FROM DataTable;";

    let output = connection.query(query, (err, result) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
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
        } else {
            return res.send(result);
        }
    });
});

/*
    Http Request for getting the SessionID from the AccelerationTable using the ParticipantID
    Example Usage: http://localhost:5000/api/getSessionID/1
*/
router.get("/getSessionID" + "/:participantID", (req, res) => {
    let ParticipantID = req.params.participantID;
    let query = "SELECT SessionID FROM AssociationTable WHERE ParticipantID="+ParticipantID+";";

    let output = connection.query(query, (err, result) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send("Success with result " + result);
        }
    });
});

/*
    Http Request for inserting data into the AssociationTable using url params
    Example Usage: http://localhost:5000/api/InsertAssociation/1
*/
router.post("/InsertAssociation", (req, res) => {
    console.log(req.params);
    console.log(req.body);
    let ParticipantID = req.body.participantID;
    
    let query = "INSERT INTO `AssociationTable`(ParticipantID) "
                    + "VALUES ("+ParticipantID+");";
    let output = connection.query(query, (err, result) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send("Success with query " + query);
        }
    });
});

/*
    Http Request for inserting data into the dataTable using url params
    Example Usage: http://localhost:5000/api/InsertData/1/1/1/1/1/1/1
*/
router.post("/InsertData", (req, res) => {
    console.log(req.params);
    console.log(req.body);
    let SessionID = req.body.sessionID;
    let E4Time = req.body.e4Time;
    let BVP = req.body.bvp;
    let EDA = req.body.eda;
    let IBI = req.body.ibi;
    let HeartRate = req.body.heartRate;
    let Temperature = req.body.temperature;
    
    let query = "INSERT INTO `DataTable`(SessionID,UTC,E4Time,BVP,EDA,IBI,HeartRate,Temperature) "
                    + "VALUES ("+SessionID+",NOW(),"+E4Time+","+BVP+","+EDA+","+IBI+","+HeartRate+","+Temperature+");";
    let output = connection.query(query, (err, result) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send("Success with query " + query);
        }
    });
});

/*
    Http Request for inserting data into the AccelerationTable using url params
    Example Usage: http://localhost:5000/api/InsertAcceleration/1/1/1/1/1
*/
router.post("/InsertAcceleration", (req, res) => {
    console.log(req.params);
    console.log(req.body);
    let SessionID = req.body.sessionID;
    let E4Time = req.body.e4Time;
    let AccelX = req.body.accelX;
    let AccelY = req.body.accelY;
    let AccelZ = req.body.accelZ;
    
    let query = "INSERT INTO `AccelerationTable`(SessionID,UTC,E4Time,AccelX,AccelY,AccelZ) "
                    + "VALUES ("+SessionID+",NOW(),"+E4Time+","+AccelX+","+AccelY+","+AccelZ+");";
    let output = connection.query(query, (err, result) => {
        if(err) {
            return res.send(err);
        } else {
            return res.send("Success with query " + query);
        }
    });
});

module.exports = router;