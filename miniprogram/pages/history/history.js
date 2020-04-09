// miniprogram/pages/adminclass/classdetail.js
import Dialog from '/@vant/weapp/dialog/dialog';
const db = wx.cloud.database()

// miniprogram/pages/adminclass/classdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student_info: [],
    page: 0,
    all: 0
  },

  onLoad: function(options) {
    var openid = getApp().globalData.openid
    db.collection('card').orderBy('time', 'desc').where({
      _openid: openid
    }).get({
      success: res => {
        console.log(this.data.page)
        this.setData({
          student_info: res.data
        })
      },
      fail: err => {
        wx.showModal({
          title: 'none',
          content: '暂无记录',
        })
      }
    })
    let that = this
    db.collection('card').where({
      _openid: getApp().globalData.openid
    }).count({
      success: res => {
        that.data.all = res.total
        console.log(that.data.all)
      }
    })
  },
  onShow: function(e) {
    this.onLoad()
  },


  load: function() {
    console.log('jiazai')
    this.setData({
      load: true
    })
    var openid = getApp().globalData.openid
    let that = this
    let shu = 20
    let dir = this.data.student_info
    that.data.page = that.data.page + 20
    db.collection('card').orderBy('time', 'desc').skip(this.data.page).limit(shu).where({
      _openid: openid
    }).get({
      success: res => {
        console.log(res)
        dir = dir.concat(res.data)
        this.data.student_info = dir
        this.setData({
          student_info: this.data.student_info,
          load: false
        })
        // console.log(this.data.student_info)
      },
      fail: err => {
        wx.showToast({
          icon: "none",
          title: '人家也是有底线的哦！',
        })
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    this.onLoad()
    wx.hideNavigationBarLoading();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(this.data.page)
    if (this.data.page < this.data.all) {
      wx.hideNavigationBarLoading(); //隐藏加载
      wx.stopPullDownRefresh();
      this.load()
    } else {

    }
  },
  tap: function(e) {
    // console.log(e)  
    wx.navigateTo({
      url: './historyCard?_id=' + e.target.dataset.id,
    })
  }
})