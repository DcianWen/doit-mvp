// miniprogram/pages/firstPage/user.js
const app = getApp()
import Dialog from '/@vant/weapp/dialog/dialog';
import Toast from '/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn:[
      {
        name:'我的信息',
        id:1,
        icon:'manager'
      },
      {
        name: '已加入组织',
        id: 2,
        icon: 'friends-o'
      },
      {
        name: '已创建的组织',
        id: 3,
        icon: 'add-o'
      },
      {
        name: '临时打卡活动',
        id: 4,
        icon: 'bookmark-o'
      },
      // {
      //   name: '客服',
      //   id: 5,
      //   icon: 'service'
      // }
    ]
  },
  onLoad: function() {

  },
  onShow: function() {
    const db = wx.cloud.database()
    db.collection('userInfo').where({
      _openid: app.globalData.openid,
      haveUser: true
    }).get({
      success: res => {
        app.globalData.userInfo = res.data[0]
        app.globalData.haveUser = true
      },
      fail: err => {
        console.log('fail to getUserInfo')
      }
    })
    if (app.globalData.haveUser == false) {
      Dialog.confirm({
        title: '还未注册哦',
        message: '请前往注册'
      }).then(() => {
        wx.navigateTo({
          url: '../register/authSetting',
        })
      }).catch(() => {
        // on cancel;
      })
    }
  },
  clickButton(e){
    // console.log(e.target.dataset.id)
    let e_id = e.target.dataset.id
    if( e_id == 1 ){
      wx.navigateTo({
        url: '../myInfo/my',
      })
    } else if (e_id == 2) {
      // wx.navigateTo({
      //   url: '',
      // })
      Toast.fail('还在开发中');
    } else if (e_id == 3) {
      wx.navigateTo({
        url: '../adminclass/adminclass',
      })
      // Toast.fail('还在开发中');
    } else if (e_id == 4) {
      // wx.navigateTo({
      //   url: '',
      // })
      Toast.fail('还在开发中');
    } else if (e_id == 5) {
      wx.navigateTo({
        url: '',
      })
    }
  }

})