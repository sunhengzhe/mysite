const express = require('express');
const router = express.Router();

router.use('/excelToSql', require('./excelToSql'));
router.use('/music', require('./music'));
router.use('/wechat', require('./wechat'));
router.use('/wx', require('./wx'));

module.exports = router;
