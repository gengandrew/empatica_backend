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
    console.log(dbConfig);
    res.send(dbConfig);
});

/*
    Http Request for Developer side testing tool used to check
    the contents of the dataTable
*/
router.get("/getDataTableContents", (req, res) => {
    let query = "SELECT * FROM DataTable;";

    let output = connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
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
            console.log(err);
            return res.send(err);
        } else {
            return res.send(result);
        }
    });
});

/*
    Http Request for inserting data into the AssociationTable using url params
    Example Usage: http://localhost:5000/api/InsertAssociation
    Requesting Body: {
        participantID: %d
    }
*/
router.post("/InsertAssociation", (req, res) => {
    console.log(req.body);
    let ParticipantID = req.body.participantID;
    let query = "INSERT INTO `AssociationTable`(ParticipantID) "
                    + "VALUES (" + ParticipantID + ");" +
                    "SELECT SessionID FROM `AssociationTable` "
                    + "WHERE ParticipantID=" + ParticipantID + ";";
    
    let output = connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            return res.send(err);
        } else {
            return res.json({sessionID: result[1][0].SessionID});
        }
    });
});

/*
    Http Request for inserting data into the dataTable using url params
    Example Usage: http://localhost:5000/api/InsertData
    Requesting Body: {
        sessionID: %d,
        utc: %s,
        e4Time: %.10f,
        bvp: %.10f,
        eda: %.10f,
        ibi: %.10f,
        heartRate: %.10f,
        temperature: %.10f
    }
*/
router.post("/InsertData", (req, res) => {
    console.log(req.body);
    let SessionID = req.body.sessionID;
    let UTC = req.body.utc;
    let E4Time = req.body.e4Time;
    let BVP = req.body.bvp;
    let EDA = req.body.eda;
    let IBI = req.body.ibi;
    let HeartRate = req.body.heartRate;
    let Temperature = req.body.temperature;
    let query = "INSERT INTO `DataTable`(SessionID,UTC,E4Time,BVP,EDA,IBI,HeartRate,Temperature) "
                    + "VALUES ("+SessionID+",'"+UTC+"',"+E4Time+","+BVP+","+EDA+","+IBI+","+HeartRate+","+Temperature+");";
    
    let output = connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            return res.send(err);
        } else {
            return res.send("Success with query " + query);
        }
    });
});

/*
    Http Request for inserting data into the AccelerationTable using url params
    Example Usage: http://localhost:5000/api/InsertAcceleration
    Requesting Body: {
        sessionID: %d,
        utc: %s,
        e4Time: %.10f,
        accelX: %d,
        accelY: %d,
        accelZ: %d
    }
*/
router.post("/InsertAcceleration", (req, res) => {
    console.log(req.body);
    let SessionID = req.body.sessionID;
    let UTC = req.body.utc;
    let E4Time = req.body.e4Time;
    let AccelX = req.body.accelX;
    let AccelY = req.body.accelY;
    let AccelZ = req.body.accelZ;
    let query = "INSERT INTO `AccelerationTable`(SessionID,UTC,E4Time,AccelX,AccelY,AccelZ) "
                    + "VALUES ("+SessionID+",'"+UTC+"',"+E4Time+","+AccelX+","+AccelY+","+AccelZ+");";

    let output = connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            return res.send(err);
        } else {
            return res.send("Success with query " + query);
        }
    });
});

module.exports = router;