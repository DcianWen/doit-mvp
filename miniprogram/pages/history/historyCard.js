// miniprogram/pages/historyCard/historyCard.js
import Dialog from '/@vant/weapp/dialog/dialog';
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {


  },

  onLoad: function(options) {
    var id = options._id
    db.collection('card').where({
      _id: id
    }).get({
      success: res => {
        this.setData({
          info: res.data[0],
          id: id
        })
      }
    })
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


  deleteIt(e) {
    var that = this
    var id = this.data.id

    Dialog.confirm({
      title: '删除此信息',
      message: '确定要删除此信息吗'
    }).then(() => {
      // on confirm
      db.collection('card').doc(id).remove({ //根据判断id进入数据库中删除该预约
        success: function(res) {
          wx.navigateBack({

          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '取消失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })

    }).catch(() => {
      // on cancel
      console.log('quxiao')
    });

  }
})