const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/api', require('./api'));

/* PC */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../fe/system/build/index.html'));
});

/* M */
router.get('/m', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../fe/m.system/build/index.html'));
});

module.exports = router;
