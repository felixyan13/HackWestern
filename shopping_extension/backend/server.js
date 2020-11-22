const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const PORT = 8080;
const StoresDB = require('./model');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:user@cluster0.coo3z.mongodb.net/shoppingExtension?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    console.log("hello world");
    res.status(200).send("hello world");
})

app.get("/getByCategory", (req, res) => {
    MongoClient.connect(uri, (err, db) => {
        console.log(req.query.category);
        console.log("Connected");
        let cursor = db.db("shoppingExtension").collection("storesDB").find({category: req.query.category}).toArray((err, doc) => {
            console.log(doc);
            res.json(doc).status(200);
        }) ;
        db.close();
    }) 
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});