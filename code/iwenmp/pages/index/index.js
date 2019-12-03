const app = getApp()
let store = require("../../utils/store.js")
let router = require("../../utils/router.js")
let Api = app.Api

Page({
  data: {
    userId: store.getItem("userId")
  },
  onLoad: function () {
    // 判断用户是否登录
    if(!this.data.userId){
      this.getSession();
    }
  },
  // 获取登录的code
  getSession(){
    wx.login({
      success:res =>{
        if(res.code){
          app.get(Api.getSession,{
            code:res.code
          }).then(res =>{
            store.setItem("openId",res.openid);
          }).catch(err =>{
            console.log(err.message)
          })
        }
      }
    })
  },
  getUserInfo(e){
    let userInfo = e.detail.userInfo;
    userInfo.openid = store.getItem("openId");
    /**
     * userInfo = {
     *   nick:"iwen",'
     *   city:"北京",
     *   openId:"34dfref4rer2fwdfe"
     * }
     */
    app.get(Api.login,{
      userInfo
    }).then(res =>{
      store.setItem('userId',res.userId);
      this.setData({
        userId:res.userId
      })
    })
  },
  gotoIwenBlog(){
    router.push("iwenblog")
  },
  onShareAppMessage(){
    return{
      title:"iwen的个人博客",
      path:"/pages/iwenblog/iwenblog",
      imageUrl:""
    }
  }
})
