// miniprogram/pages/myInfo/changeMy.js
import Toast from '/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    decodeURIComponent(options.data);
    let changewhat
    let iswhat = options.what
    this.data.change = options.changeWhat
    if (options.changeWhat == 'username') {
      changewhat = '姓名'
    } else if (options.changeWhat == 'school') {
      changewhat = '学校'
    } else if (options.changeWhat == 'uclass') {
      changewhat = '班级'
    } else if (options.changeWhat == 'number') {
      changewhat = '学号'
    }
    wx.setNavigationBarTitle({
      title: '修改' + changewhat,
    })
    // this.data.what = options.what
    this.setData({
      what: iswhat,
      changewhat: changewhat
    })
  },
  change(e) {
    this.setData({
      what: e.detail
    })
  },
  changeWhat(e) {
    const db = wx.cloud.database()
    let change = this.data.change
    let id = getApp().globalData.userInfo._id
    let what = this.data.what
    if (change == 'username') {
      db.collection('userInfo').doc(id).update({
        data: {
          username: what
        }
      })
    } else if (change == 'school') {
      db.collection('userInfo').doc(id).update({
        data: {
          school: what
        },
      })
    } else if (change == 'uclass') {
      db.collection('userInfo').doc(id).update({
        data: {
          uclass: what
        },
      })
    } else if (change == 'number') {
      db.collection('userInfo').doc(id).update({
        data: {
          number: what
        },
      })
    }
    Toast.success('修改成功');
    db.collection('userInfo').where({
      _openid: getApp().globalData.openid,
      haveUser: true
    }).get({
      success: res => {
        getApp().globalData.userInfo = res.data[0]
        wx.navigateBack({

        })
      },
      fail: err => {
        console.log('fail to getUserInfo')
      }
    })
  }

})