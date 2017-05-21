const express = require('express');
const router = express.Router();

router.use('/excelToSql', require('./excelToSql'));
router.use('/music', require('./music'));
router.use('/wechat', require('./wechat'));

module.exports = router;
