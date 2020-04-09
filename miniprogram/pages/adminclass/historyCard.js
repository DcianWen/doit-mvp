// miniprogram/pages/historyCard/historyCard.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {


  },

  previewImage(e) {
    // 图片点击放大的函数
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.info.images_fileID;
    console.log(e)
    wx.previewImage({
      current: imgArr[index], //当前图片地址
      urls: imgArr, //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onLoad: function(options) {
    var id = options._id
    db.collection('card').where({
      _id: id
    }).get({
      success: res => {
        this.setData({
          info: res.data[0]
        })
      }
    })
  },

  onChange(e) {
    let e_id = e.target.id //事件id的缩写
    // e.detail 为当前输入的值
    if (e_id == 1) {
      this.setData({
        evaluate: e.detail
      })
    } else if (e_id == 2) {
      this.setData({
        grade: e.detail
      })
    }

  },
  creat() {
    var that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updateCard',
      // 传给云函数的参数
      data: {
        id: that.data.info._id,
        status: '已查看',
        grade: that.data.grade,
        evaluate: that.data.evaluate
      },
      success: function(res) {
        wx.navigateBack({
          
        })
      },
      fail: function(res) {
        wx.showToast({
          icon: 'none',
          title: '提交失败',
        })
      }
    })

  }
})