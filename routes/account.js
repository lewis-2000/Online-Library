const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('account');

}).post(function (req, res){
    res.render('account');
});

module.exports = router;