// miniprogram/pages/card/card.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    images_fileID: [],
    max: 520,
    talk: '什么都没有留下~'
  },

  onLoad: function(options) {
    var student = getApp().globalData.userInfo
    this.setData({
      student: student
    })
  },
  onChange(e) {
    let that = this
    var number1 = e.detail
    let e_id = e.target.id //事件id的缩写
    // event.detail 为当前输入的值

    if (e.detail.length == 6) {
      db.collection('adminclass').where({
          number: number1,
        })
        .get({
          success: res => {
            if (res.data.length > 0) {
              this.setData({
                tips: '此编号可以使用',
                but: true
              })
            } else {
              this.setData({
                tips: '',
                but: false
              })
            }
          },
          fail: console.error
        })
    } else {
      this.setData({
        but: false,
        tips: ''
      })
    }
    this.setData({
      number: e.detail
    })

  },
  chooseImage: function(e) { // 选择图片
    var that = this;
    let len = 0;
    if (that.data.files != null) {
      len = that.data.files.length; // 确定图片的数量，目的是限制图片只能上传三张
    } //获取当前已有的图片
    wx.chooseImage({
      count: 8 - len, //  图片的数量
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        // that.data.files = that.data.files.concat(res.tempFilePaths)
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
        });
        console.log(that.data.files)
      }
    })
  },
  deleteImage: function(e) { // 很明显这个函数是用来删除已选择的图片
    var that = this;
    var files = that.data.files;
    var id = e.currentTarget.dataset.id; //获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('点击确定了');
          files.splice(id, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          files
        });
      }
    })
  },

  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  inputs: function(e) { // 这个用来记录问题框的字数，虽然没什么用就，就是搞得好看的。
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    this.setData({
      currentWordNumber: len, //当前字数  
      value: value
    });

  },
  creat() {
    var that = this
    var number = this.data.number // 编号
    var studnt = this.data.student // 学生信息
    var talk = this.data.value // 说点什么
    var images_fileID = that.data.images_fileID; //得到fileID
    var imageFiles = that.data.files;
    var date = new Date();
    var now = date.getFullYear() + "/" + ((date.getMonth() + 1) < "10" ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + "/" + (date.getDate() < "10" ? ("0" + date.getDate()) : date.getDate()) + " " + (date.getHours() < "10" ? ("0" + date.getHours()) : date.getHours()) + ":" + (date.getMinutes() < "10" ? ("0" + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < "10" ? ("0" + date.getSeconds()) : date.getSeconds()); // 记录一下上传的时间
    if (imageFiles.length) {
      //for循环进行图片上传
      for (var i = 0; i < imageFiles.length; i++) {
        console.log('进到for里了')
        var imageUrl = imageFiles[i].split("/");
        var name = imageUrl[imageUrl.length - 1]; //得到图片的名称
        wx.cloud.uploadFile({
          cloudPath: "question/" + name, //云存储路径
          filePath: imageFiles[i], //文件临时路径
          success: res => {
            console.log(res)
            images_fileID.push(res.fileID);
            that.setData({
              images_fileID: images_fileID //更新data中的 fileID
            })
            if (images_fileID.length === imageFiles.length) {
              //对数据库进行操作
              console.log('到这里了第三个if了')
              db.collection('card').add({
                data: {
                  student: studnt,
                  number: number,
                  time: now,
                  images_fileID: that.data.images_fileID,
                  talk: talk
                },
                success: res => {
                  wx.redirectTo({
                    url: '../firstPage/first',
                  })
                }
              })
            }
          }
        })
      }
    } else {
      console.log('到else了')
      db.collection('card').add({
        data: {
          student: studnt,
          number: number,
          talk: talk,
          time: now,
        },
        success: res => {
          wx.redirectTo({
            url: '../firstPage/first',
          })
        }
      })
    }


  }


})