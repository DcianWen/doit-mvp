// miniprogram/pages/adminclass/adminclass.js
import Dialog from '/@vant/weapp/dialog/dialog';
const app = getApp()
const db = wx.cloud.database()
const uopenid = app.globalData.openid

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  creat() {
    wx.redirectTo({
      url: './creatclass',
    })
  },
  onLoad(options) {
    var that = this
    if (app.globalData.openid) {
      console.log(app.globalData.openid)
      db.collection('adminclass').where({
        _openid: app.globalData.openid
      }).get({
        success: res => {
          console.log(res)
          that.setData({
            adminclass: res.data
          })
          console.log(that.data.adminclass)
        }
      })
    }

  },
  onClose(event) {
    const {
      position,
      instance
    } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          console.log('点击了确定')
          instance.close();
        }).catch(() => {
          // on cancel
          console.log('取消了')
        });;
        break;
    }
  },
  tap:function(e){
    wx.navigateTo({
      url: './classdetail?_id=' + e.target.id,
    })
  }
})