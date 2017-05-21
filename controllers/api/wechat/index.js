const express = require('express');
const router = express.Router();
const request = require('request');

/**
 * 微信
 */
router.post('/chat', (req, res, next) => {
    const { chatid, message } = req.body;
    if (chatid === 'robot') {
        request.post('http://www.tuling123.com/openapi/api', {
            form: {
                key: 'b3c7f3fcac2f42af832299743c7c738e',
                info: message,
                userid: 'xxx',
            },
            json: true,
        }, (err, resp, body) => {
            const { code, text } = resp.body;
            if (code === 100000) {
                return res.send({
                    status: 0,
                    data: {
                        chatid,
                        message: text,
                    },
                });
            }

            return res.send({
                status: 500,
                errmsg: '我能怎么办，我也很绝望啊',
            });
        })
    }
});

module.exports = router;
