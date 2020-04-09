// miniprogram/pages/adminclass/classdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  tap: function(e) {
    wx.navigateTo({
      url: './classdetail?_id=' + e.target.id,
    })
  }
})