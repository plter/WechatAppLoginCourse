/**
 * 路由跳转
 */

// 映射
const routerPath = {
  "index":"/pages/index/index",
  "iwenblog":"/pages/iwenblog/iwenblog"
}

module.exports = {
  // this.$router.push("/index",{path:"/index",query:{}})
  // /index?name=iwen&age=20  query={ name:'iwen',age:20 }   axios  fetch post参数类型 querystring
  push(path,option={}){
    if(typeof path === 'string'){
      option.path = path;
    }else{
      option = path;
    }

    // 获取url : "index"
    let url = routerPath[option.path];
    // openType跳转类型
    let { query = {}, openType } = option;
    let params = this.parse(query);
    if(params){
      url += '?' + params;
    }
    this.to(openType,url);
  },
  to(openType,url){
    let obj = { url }; //  { url:"..." }
    if (openType === 'redirect'){
      wx.redirectTo(obj);
    } else if (openType === 'reLaunch'){
      wx.reLaunch(obj);
    } else if (openType === 'back'){
      wx.navigateBack({
        delta:1
      })
    }else{
      wx.navigateTo(obj);
    }
  },
  parse(data){
    let arr =[];
    for(let key in data){
      arr.push(key + '=' +data[key]);
    }
    return arr.join("&");
  }
}