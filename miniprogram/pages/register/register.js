// miniprogram/pages/register/register.js
import Dialog from '/@vant/weapp/dialog/dialog';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    school:'',
    uclass:'',
    number:'',
  },
  onChange(event) {
    let that = this
    let e_id = event.target.id   //事件id的缩写
    // event.detail 为当前输入的值
    if(e_id == 1){
      this.setData({
        username:event.detail
      })
    }else if(e_id == 2){
      this.setData({
        school: event.detail
      })
    } else if (e_id == 3) {
      this.setData({
        uclass: event.detail
      })
    } else if (e_id == 4) {
      this.setData({
        number: event.detail
      })
    }
  },
  uploadUserInfo:function(e){
    let it = this.data    
    console.log(this.data.username.length)
    if(it.username.length == 0 || it.school.length == 0 || it.uclass == 0 || it.number.length == 0){
      Dialog.alert({
        title: '您有信息未填写',
        message: '请填写'
      })
    } else {
      this.upload()
    }
  },
  upload(){
    const db = wx.cloud.database()
    const it = this.data
    db.collection('userInfo').add({
      data: {
        username: it.username,
        school: it.school,
        uclass: it.uclass,
        number: it.number,
        addclass:[],
        adminclass:[],
        temporary:[],
        haveUser:true
      },
      success: res => {
        // util.hideLoading()
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          icon: 'none',
          title: '注册成功',
          duration: 2000, //显示时长
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id),
          // wx.redirectTo({
          //   url: '../firstPage/first',
          // })
          app.globalData.haveUser = true
          wx.switchTab({
            url: '../firstPage/first',
          })
      },
      fail: err => {
        // util.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '注册失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  }
})