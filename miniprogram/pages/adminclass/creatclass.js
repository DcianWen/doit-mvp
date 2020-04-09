// miniprogram/pages/adminclass/creatclass.js
import Toast from '@vant/weapp/toast/toast';

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classname: '',
    number: '',
    but: false,
  },
  onChange(e) {
    let that = this
    var number1 = e.detail
    let e_id = e.target.id //事件id的缩写
    // event.detail 为当前输入的值
    if (e_id == 1) {
      this.setData({
        classname: e.detail
      })
    } else if (e_id == 2) {
      if (e.detail.length == 6) {
        // db.collection('adminclass').where({
        //   number: number1,
        //   success: res => {
        //     console.log(res)
        //   }
        // })
        db.collection('adminclass').where({
            number: number1,
          })
          .get({
            success: res => {
              console.log(res)
              if (res.data.length > 0) {
                this.setData({
                  tips: '此编号已存在',
                  but: false
                })
              } else {
                this.setData({
                  tips: '',
                  but: true
                })
              }
            },
            fail: console.error
          })
      } else {
        this.setData({
          but: false
        })
      }
      this.setData({
        number: e.detail
      })
    }
  },
  creat() {
    var classname = this.data.classname
    var number = this.data.number
    if (this.data.classname) {
      db.collection('adminclass').add({
        data: {
          classname: classname,
          number: number,
          student: [],
          task: {},
        },
        success: res => {
          wx.redirectTo({
            url: './adminclass',
          })
        }
      })
    } else {
      Toast.fail('名称未填');
    }

  }
})