var lowdb = require("lowdb")
const FileSync = require('lowdb/adapters/FileSync')
const express = require('express')
const adapter = new FileSync('db.json')
const db = lowdb(adapter)
const cron = require('node-cron')
const port = 3000
const uuidv1 = require('uuid/v1')


db.defaults({requests:[], user: {} })
    .write()
app = express();
app.listen(3128);
app.get('/', function (req, res) {
    console.log("Received request for", req.query.start, "to", req.query.finish)
    db.get('requests')
    .push({id:uuidv1(), origin: req.query.start, destination: req.query.finish})
    .write()
    cron.schedule("* * * * *", function() {
        console.log("Making HTTP request for", req.query.start, "to", req.query.finish)
        //put HTTP request here
        //need callback function
        //if travel time response is < some value
        //if travel time response is > some value
    });
    res.send("Received request")
})