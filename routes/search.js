const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('search');

}).post(function (req, res){
    res.render('search');
});

module.exports = router;