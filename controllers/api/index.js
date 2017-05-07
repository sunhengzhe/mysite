const express = require('express');
const router = express.Router();

router.use('/excelToSql', require('./excelToSql'));

module.exports = router;
