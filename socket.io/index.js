const { getIPAdress } = require('../utils');

const ip = getIPAdress();

const headers = [
    'cat.jpg',
    'doge.jpg',
    'judy.jpg',
    'nick.jpg',
    'shifen.jpg',
    'cola.jpg',
    'shituotuo.jpg',
    'zhizunbao.jpg',
];

const firstNames = [
    '搞笑的',
    '猥琐的',
    '帅气的',
    '英俊的',
    '运气差的',
    '爱笑的',
    '傻逼的',
    '娇弱的',
    '呆头呆脑的',
    '牛逼哄哄的',
    '见人就砍的',
    '卖保险的',
    '色眯眯的',
    '胡言乱语的',
    '游手好闲的',
    '神经兮兮的',
    '一脸懵逼的',
];

const lastNames = [
    '小仙女',
    '小可爱',
    '中年大叔',
    '萝莉',
    '御姐',
    '老头',
    '老太太',
    '少年',
    '愣头青',
    '傻逼',
    '神经病',
    '智障少年',
];

// 应该存在 redis 里
const groups = {
    onlineGroup: {},
};

const PORT = process.env.PORT || 3000;

module.exports = (io) => {
    var wechat = io.of('/wechat');

    // 微信
    wechat.on('connection', function (socket){

        const id = socket.id;

        // 随机分配
        const usericon = `http://7xo08n.com1.z0.glb.clouddn.com/images/headers/${headers[Math.floor(Math.random() * headers.length)]}`;
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const usernick = `${firstName}${lastName}`;

        const userInfo = {
            usericon,
            usernick,
        }

        groups.onlineGroup[socket.id] = userInfo;

        // 生成用户信息
        socket.emit('create userInfo', userInfo);

        // 告诉其他人有人加入
        wechat.emit('answer group total', {
            chatid: 'onlineGroup',
            total: Object.keys(groups.onlineGroup).length,
        });
        wechat.emit('someone enter', {
            chatid: 'onlineGroup',
            content: `欢迎${usernick}加入群聊！`,
        });

        // 断开连接
        socket.on('disconnect', function (){
            delete groups.onlineGroup[socket.id];

            // 告诉其他人有人加入
            wechat.emit('answer group total', {
                chatid: 'onlineGroup',
                total: Object.keys(groups.onlineGroup).length,
            });
            socket.broadcast.emit('someone leave', {
                chatid: 'onlineGroup',
                content: `${usernick}退出了群聊`,
            });
        });

        // 询问群组人数
        socket.on('ask group total', function (chatid){
            socket.emit('answer group total', {
                chatid,
                total: Object.keys(groups[chatid]).length,
            });
        });

        // 消息
        socket.on('wechat message', function ({ chatid, message }){
            socket.broadcast.emit('wechat message', {
                chatid,
                userInfo,
                message,
            })
        });
    });
}
