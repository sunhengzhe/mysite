const express = require('express');
const crypto = require('crypto');
const config = require('./config');

const router = express.Router();
const sha1 = crypto.createHash('sha1');

/**
 * 认证
 */
router.get('/handle', (req, res, next) => {
    const {
        signature,
        timestamp,
        nonce,
        echostr,
    } = req.query;

    const token = config.token;

    const list = [token, timestamp, nonce];

    const str = list.sort().join('');

    sha1.update(str);

    const encryptStr = sha1.digest('hex');

    if (encryptStr === signature) {
        return res.send(echostr);
    }

    return res.send('I am handle');
});

module.exports = router;
