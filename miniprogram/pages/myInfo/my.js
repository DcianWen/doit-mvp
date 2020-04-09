// miniprogram/pages/myInfo/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  onShow:function(){
    this.onLoad()
  },
  changeWhat(e){
   let event = e.target.dataset
    wx.navigateTo({
      url: './changeMy?changeWhat=' + event.id +'&what=' + event.what,
    })
  },

})