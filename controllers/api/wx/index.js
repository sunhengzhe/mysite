const express = require('express');
const crypto = require('crypto');
const logger = require('winston');
const config = require('./config');
const { parseString, Builder } = require('xml2js');
const xmlBuilder = new Builder({
    rootName: 'xml',
    headless: true,
});

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
    req.rawBody = '';

    req.on('data', function(chunk) {
        req.rawBody += chunk;
    });

    req.on('end', function() {
        parseString(req.rawBody, function (err, result) {
            if (err) {
                logger.error('api.wx.post.handle.parse', err);
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

    req.on('error', function(err) {
        logger.error('api.wx.post.handle.onerror', err);
        return res.send('success');
    });
});

module.exports = router;
