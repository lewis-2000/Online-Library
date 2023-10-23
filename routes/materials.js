const express = require('express');
const router = express.Router();
const {MongoClient} = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = 'onlineLibrary';
const collectionName = "book";

const client = new MongoClient(url);


async function retrieveBooks() {
    try {
        await client.connect();
        console.log("Connected to the database");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const documents = await collection.find({}).toArray();
        return documents; // Return the retrieved data
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
        console.log("Database connection closed");
    }
}

router.get('/',async function (req, res) {

    const books = await retrieveBooks();
    res.render('materials', {books});

}).post(function (req, res){
    res.render('materials');
});

module.exports = router;