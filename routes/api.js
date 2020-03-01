const express = require("express");
const mysql = require("mysql");
const router = express.Router();

let dbConfig = require("../config/keys");
let connection = mysql.createConnection(dbConfig);
let toggleDatabase = false;
const SessionID = process.argv.slice(2)[0];
console.log("Initializing SessionID as " + SessionID);
if(SessionID === undefined) {
    console.log("No SessionID was provided");
    process.exit(0);
}

const faces = ["sad", "neutral", "happy"];
let face = faces[1];

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
    if the accessed ip address is the correct localhost
*/
router.post("/CheckLocalHost", (req, res) => {
    console.log("Correct LocalHost!");
    return res.json({message: "Correct LocalHost!"});
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
    Example Usage: http://localhost:8006/api/InsertAssociation
    Requesting Body: {
        participantID: %d
    }
*/
router.post("/InsertAssociation", (req, res) => {
    if(toggleDatabase == false) {
        console.log("Database is not toggled!");
        return;
    }
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
    Example Usage: http://localhost:8006/api/InsertData
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
    if(toggleDatabase == false) {
        console.log("Database is not toggled!");
        return;
    }
    console.log(req.body);
    // let SessionID = req.body.sessionID;
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
    Example Usage: http://localhost:8006/api/InsertAcceleration
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
    if(toggleDatabase == false) {
        console.log("Database is not toggled!");
        return;
    }
    console.log(req.body);
    // let SessionID = req.body.sessionID;
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

/*
    Http Request for inserting data into the AccelerationTable using url params
    Example Usage: http://localhost:8006/api/InsertAcceleration
    Requesting Body: {
        sessionID: %d,
        utc: %s,
        e4Time: %.10f,
        accelX: %d,
        accelY: %d,
        accelZ: %d
    }
*/
router.post("/InsertSound", (req, res) => {
    if(toggleDatabase == false) {
        console.log("Database is not toggled!");
        return;
    }
    console.log(req.body);
    console.log(req.params);
    // let SessionID = req.body.sessionID;
    let SoundLevel = req.body.level;
    let UTC = req.body.utc;
    let query = "INSERT INTO `VolumeTable`(SessionID,UTC,SoundLevel) "
                    + "VALUES ("+SessionID+",'"+UTC+"',"+SoundLevel+");";

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
    Http Request for toggle the toggleDatabase variable between true and false
    Example Usage: http://localhost:8006/api/DataCollectionToggle
    Requesting Body: { }
*/
router.post("/DataCollectionToggle", (req, res) => {
    let temp = toggleDatabase;
    if(temp == true) {
        toggleDatabase = false;
    } else {
        toggleDatabase = true;
    }
    console.log("Toggling database from " + temp + " to " + toggleDatabase);
});

/*
    Http Request for getting the internal state of the face
*/
router.get("/getFaceState", (req, res) => {
    res.json({face: face});
});

/*
    Http Request for getting the internal state of the face
*/
router.get("/postFaceState/:state", (req, res) => {
    console.log(req.params);
    let UTC = new Date().toUTCString();
    let temp = req.params.state;
    if(temp >= 0 && temp <= 2) {
        face = faces[temp];
    }
    if(toggleDatabase == false) {
        console.log("Database is not toggled!");
        return;
    }

    let Custom_Action = "ACTION_" + faces[temp].toUpperCase();
    let query = "INSERT INTO `ResponderTable`(SessionID,UTC,Custom_Action,Custom_Message) "
                    + "VALUES ("+SessionID+",'"+UTC+"','"+Custom_Action+"',"+null+");";

    let output = connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
            return res.send(err);
        } else {
            return res.json({result: "success"});
        }
    });
});

module.exports = router;