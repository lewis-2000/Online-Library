const express = require('express');
const {MongoClient} = require('mongodb');
const router = express.Router();

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
    try {
        const searchData = req.query.q;
        let books = await retrieveBooks();

        if (searchData) {
            // Use a filter function to find documents that match the search query
            books = books.filter(item => {
              // You can modify this logic to match your specific search requirements
              return (
                item.author.includes(searchData) ||
                item.description.includes(searchData) 

              );
            });
          }
    
          res.render('search', { books, searchQuery: searchData  });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error'); // Handle errors gracefully
    }
  

}).post('/add-to-collection', async function (req, res) {
    try {
      const bookData = req.body; // Assuming you send book data in the request body
  
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('mycollection'); // Change collection name as needed
  
      // Insert the book data into your collection
      const result = await collection.insertOne(bookData);
  
      if (result.insertedCount === 1) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      console.error('Error:', error);
      res.json({ success: false });
    } finally {
      await client.close();
      console.log("Database connection closed");
    }
  });

module.exports = router;