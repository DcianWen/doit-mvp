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

  },

  tap(e) {
    wx.navigateTo({
      url: '../card/card',
    })
  }
})