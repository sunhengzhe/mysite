const express = require('express');
const crypto = require('crypto');
const logger = require('winston');
const config = require('./config');
const { parseString, Builder } = require('xml2js');
const xmlBuilder = new Builder();

const router = express.Router();


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

    const sha1 = crypto.createHash('sha1');

    sha1.update(str);

    const encryptStr = sha1.digest('hex');

    if (encryptStr === signature) {
        return res.send(echostr);
    }

    return res.send(str);
});

/**
 * 获取消息
 */
router.post('/handle', (req, res, next) => {
    const msg = req.body;

    parseString(msg, function (err, result) {
        if (err) {
            logger.error('api.wx.post.handle', err);
            return res.send('success');
        }

        const { ToUserName, FromUserName, Content } = result;

        const reply = {
            ToUserName: FromUserName,
            FromUserName: ToUserName,
            CreateTime: +new Date(),
            MsgType: 'text',
            Content: `
                欢迎
                you are my secret
            `
        };

        return res.send(xmlBuilder.buildObject(reply));
    });
});

module.exports = router;
