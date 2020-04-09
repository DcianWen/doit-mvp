// miniprogram/pages/register/authSetting.js
import Dialog from '/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      Dialog.alert({
        message: '即将跳转注册页面'
      }).then(() => {
          // on close
          wx.navigateTo({
          url: './register',
     })
      });
      //授权成功后，跳转进入小程序首页
     
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法使用全部功能，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
})