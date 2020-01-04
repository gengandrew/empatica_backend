const axios = require("axios");

let item = {
    sessionID: 1,
    e4Time: 1,
    bvp: 1,
    eda: 1,
    ibi: 1,
    heartRate: 1,
    temperature: 1
}

axios.post("https://localhost:5000/api/insertData", item).then(res => [
    console.log("Has been pushed to database.")
  ])