const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const XLSX = require('node-xlsx');
const fs = require('fs');
const path = require('path');

/**
 * 导入线索
 */
router.post('/clue', (req, res, next) => {

    const form = new formidable.IncomingForm();
    // 指定文件位置
    form.uploadDir = path.join(__dirname, './files');
    // 保留扩展名
    form.keepExtensions = true;

    let filePath = '';

    // 接收文件
    form.parse(req, function (err, fields, files) {
        const cType = fields.cType;
        const fr = fields.fr;

        // 检查文件扩展名
        const extens = files.file.name.match(/\.\w+$/);
        if (!extens || extens[0] !== '.xlsx') {
            return res.send({
                status: 500,
                message: '无效文件类型'
            });
        }

        // 获取文件路径
        filePath = files.file.path;
        // 读取数据
        let data;

        try {
            data = XLSX.parse(filePath)[0].data;
        } catch (e) {
            return res.send({
                status: 500,
                message: '解析错误'
            });
        }

        fs.unlinkSync(filePath);
    });
});

module.exports = router;
