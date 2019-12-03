let express = require('express');
let router = express.Router();
let request = require('request');
let config = require('../util/config');
let util = require('../util/util')

config = Object.assign({}, config.mp);

// 两个接口
router.get('/getSession', (req, res) => {
    let code = req.query.code;
    if (!code) {
        res.json(util.handleFail('code不能为空', 10001));
    } else {
        let sessionUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appId}&secret=${config.appSecret}&js_code=${code}&grant_type=authorization_code`
        request(sessionUrl, (err, response, body) => {
            let result = util.handleResponse(err, response, body);
            res.json(result);
        })
    }
})

router.get("/login", (req, res) => {
    let userInfo = JSON.parse(req.query.userInfo);
    if (!userInfo) {
        res.json(util.handleFail('用户信息不能为空'), 10002);
    } else {
        /**
         * 存储数据到数据库
         */
        res.json({ 
            code: 0,
            data: {
                userId:'10000001'
            }, 
            message: "登录成功" 
        })
    }
})

module.exports = router;