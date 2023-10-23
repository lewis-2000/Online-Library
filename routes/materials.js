const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('materials');

}).post(function (req, res){
    res.render('materials');
});

module.exports = router;