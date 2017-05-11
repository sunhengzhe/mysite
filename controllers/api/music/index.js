const express = require('express');
const router = express.Router();

/**
 * 获取音乐列表
 */
router.get('/list', (req, res, next) => {
    res.send({
        status: 0,
        data: [
            {
                src: 'http://7xo08n.com1.z0.glb.clouddn.com/music/RADWIMPS%20-%20%E4%B8%89%E8%91%89%E3%81%AE%E3%83%86%E3%83%BC%E3%83%9E.mp3',
                title: '三葉のテーマ',
                album: '君の名は。',
                author: 'RADWIMPS',
                cover: 'http://7xo08n.com1.z0.glb.clouddn.com/music/sanye.png',
            }, {
                src: 'http://7xo08n.com1.z0.glb.clouddn.com/music/%E6%9D%A8%E5%A4%A7%E6%9E%97%20-%20Into%20the%20dream.mp3',
                title: 'Into the dream',
                album: 'Into the dream',
                author: '杨大林',
                cover: 'http://7xo08n.com1.z0.glb.clouddn.com/music/into-the-dream.png',
            }, {
                src: 'http://opmzrc0v0.bkt.clouddn.com/music/Falcom%20Sound%20Team%20jdk%20-%20%E9%89%B1%E5%B1%B1%E7%94%BA%E3%83%9E%E3%82%A4%E3%83%B3%E3%83%84.mp3',
                title: '鉱山町マインツ',
                album: '零の軌跡',
                author: 'Falcom Sound Team jdk',
                cover: 'http://opmzrc0v0.bkt.clouddn.com/music/Falcom%20Sound%20Team%20jdk%20-%20%E9%89%B1%E5%B1%B1%E7%94%BA%E3%83%9E%E3%82%A4%E3%83%B3%E3%83%84.png',
            }, {
                src: 'http://opmzrc0v0.bkt.clouddn.com/music/%E3%82%B3%E3%82%99%E3%83%B3%E3%83%81%E3%83%81%20-%20%E6%AD%A9%E3%81%84%E3%81%A6%E3%82%82%20%E6%AD%A9%E3%81%84%E3%81%A6%E3%82%82.mp3',
                title: '歩いても 歩いても',
                album: '歩いても 歩いても',
                author: 'ゴンチチ',
                cover: 'http://opmzrc0v0.bkt.clouddn.com/music/%E3%82%B3%E3%82%99%E3%83%B3%E3%83%81%E3%83%81%20-%20%E6%AD%A9%E3%81%84%E3%81%A6%E3%82%82%20%E6%AD%A9%E3%81%84%E3%81%A6%E3%82%82.png',
            }, {
                src: 'http://opmzrc0v0.bkt.clouddn.com/music/%E6%9E%97%E3%82%86%E3%81%86%E3%81%8D%20-%20justice-2.mp3',
                title: 'justice-2',
                album: 'リーガル・ハイ',
                author: '林ゆうき',
                cover: 'http://opmzrc0v0.bkt.clouddn.com/music/%E6%9E%97%E3%82%86%E3%81%86%E3%81%8D%20-%20justice-2.png',
            }
        ]
    })
});

module.exports = router;
