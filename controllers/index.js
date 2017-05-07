const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/api', require('./api'));

/* 主页 */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../fe/system/build/index.html'));
});

module.exports = router;
