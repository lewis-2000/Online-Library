const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('account');

}).post('/account', async function (req, res) {
    try {
      const bookData = req.body;
  
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