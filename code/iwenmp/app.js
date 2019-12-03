let Api = require("./http/api.js");
let request = require("./http/request.js");
let config = require("./env/index.js")
let router = require("./utils/router.js")
let env = "Dev";
App.version = "1.0.0";
App.config = config[env]; // 公共文件用的

App({
  config:config[env], // 给视图用的
  Api,
  router,
  get:request.fetch,
  post:(url,data,option) =>{
    option.method = "post";
    return request.fetch(url,data,option);
  },
  onLaunch: function () {
    
  }
})
