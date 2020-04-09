//app.js

App({
  onLaunch: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function(res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function() {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'txzs-zzsg',
        traceUser: true,
      })
    }
    this.globalData = {}
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login', //函数名称
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid)
        wx.setStorageSync('user_Openid', res.result.openid) //  获得用户openid存储在缓存
        this.globalData.openid = res.result.openid // 将openID记录在app.globalData里面，可以全局调用
        this.globalData.haveUser = false
        const db = wx.cloud.database()
        db.collection('userInfo').where({
          _openid: this.globalData.openid,
          haveUser: true
        }).get({
          success: res => {
            this.globalData.userInfo = res.data[0]
            if( res.data[0]){
            this.globalData.haveUser = true
            }
          },
          fail: err => {
            console.log('fail to getUserInfo')
          }
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({ //这边用来判断用户是否授权，有授权过就直接进入页面，没有授权则进入授权界面
            success: function(res) {
              //从数据库获取用户信息
              //用户已经授权过
             
            },
          });
        } else {
          //未授权
          wx.showModal({
            title: '尚未授权',
            content: '请前往授权和注册',
            success: function(res) {
              if (res.confirm) {
                console.log('点击确定了');
                wx.navigateTo({
                  url: '../register/authSetting',
                })
              } else if (res.cancel) {
                console.log('点击取消了');
                return false;
              }
            }
          })
        }
      }
    })

  },
})