// pages/firstPage/first.js
const app = getApp()
const db = wx.cloud.database()
import Dialog from '/@vant/weapp/dialog/dialog';
import Toast from '/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: '待完成',
    tabbar: 0,
    toast: false
  },
  onLoad(options) {
    var that = this
    const toast = Toast.loading({
      duration: 0,       // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      message: 'loading',
      loadingType: 'spinner',
      selector: '#custom-selector'
    });

    let second = 2;
    const timer = setInterval(() => {
      second--;
      if (second) {
        toast.setData({
          message: `loading`
        });
      } else {
        clearInterval(timer);
        Toast.clear();
        this.setData({
          toast:true
        })
      }
    }, 1000);

  },
  onShow: function() {

  },
  onChangeTab(event) { // 头部标签
    wx.showToast({
      title: `切换到 ${event.detail.name}`,
      icon: 'none'
    });
  },
  onChangeTabbar(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({
      tabbar: event.detail
    });
  },
  onClick(e) {
    // console.log(e)
  }

})