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
        signature = '499172f8974aaa9cd87fd766ae54e36a5443017b',
        timestamp = '2017-10-25 22:56:08',
        nonce = '180802211',
        echostr = '16751326018643340984',
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
