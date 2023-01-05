//index.js
// import regeneratorRuntime from '../../regenerator-runtime/runtime.js';
// import "../../regenerator-runtime/runtime.js";
//  import { regeneratorRuntime } from '/regenerator-runtime/runtime.js';
// var regeneratorRuntime = require("../../regenerator-runtime/runtime.js");

const dateUtil = require('../../utils/date.js');
//获取应用实例
const app = getApp()
Page({
  onLoad: function (options) {
    // 监听页面加载 只调用一次
  },
  onReady: function () {
    let that = this;

  },
  onShow: function () {
    // 监听页面显示，每次打开都会调用
    let startCity = app.globalData.startCity;
    let endCity = app.globalData.endCity;
    if (startCity) {
      this.setData({
        startCity: startCity
      })
    }

  },
  onHide: function () {
    // 监听页面隐藏 当navigateTo或底部tab切换时调用
  },
  onUnload: function () {
    // 监听页面卸载 当redirectTo或navigateBack的时候调用
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享 此事件需要 return 一个 Object，用于自定义分享内容
    return {
      title: '模拟计算器',
      path: '/page/index/index'
    }
  },
  data: {

    indicatorDots: true,
    autoPlay: true,
    selectedDate: dateUtil.getToday(),
    selectedEndDate: dateUtil.getToday(),
    startDate: dateUtil.getToday(),
    endDate: dateUtil.getEndDate(),
    startCity: app.globalData.startCity,
    endCity: app.globalData.endCity,
    toast: {
      content: '',
      iconUrl: 'cloud://yhltd-lzok7.7968-yhltd-lzok7/SY_LHDataAnalysis/warning.png',
      showToast: false
    }
  },
  // date picker
  changeDate(e) {
    console.log('selected start date: ' + e.detail.value);
    let date = e.detail.value;
    this.setData({
      selectedDate: date
    })
    app.globalData.date = date;
  },
  // date end  picker
  changeDate_end(e) {
    console.log('selected end date: ' + e.detail.value);
    let date = e.detail.value;
    this.setData({
      selectedEndDate: date
    })
    app.globalData.date = date;
  },
  checkSchedule() {
    let that = this;
    var listAll_canshu1 = [];
    var ls = 0;
    let startCity = this.data.selectedDate;
    let endCity = this.data.selectedEndDate;
    console.log('selected startCity date: ' + parseFloat(String(startCity).replace("-", "").replace("-", "") + "000000"));
    console.log('selected endCity date: ' + parseFloat(String(endCity).replace("-", "").replace("-", "") + "999990"));
    if (startCity && startCity == '') {
      that.setData({
        'toast.content': '请选择时间',
        'toast.showToast': true
      });
      setTimeout(() => {
        that.setData({
          'toast.showToast': false
        })
      }, 1000);
      return;
    };
    // const cloud = require('wx-server-sdk')
    // const db = cloud.database()
    // const command_ = db.command
    const db = wx.cloud.database()
    const _ = db.command
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi 
    db.collection('SY_LHDataAnalysis_shuju').where({
      finduser: finduser,
      gongsi: gongsi,
      shuju8: _.gt(parseFloat(String(startCity).replace("-", "").replace("-", "") + "000000")).and(_.lt(parseFloat(String(endCity).replace("-", "").replace("-", "") + "999999")))
    }).get({
      success: res => {
        console.log(res);
        listAll_canshu1.push(res.data)
        console.log('time:' + listAll_canshu1[0].length);
        for (var i = 0; i < listAll_canshu1[0].length; i++) {
          //删自己的openid
          //   db.collection('SY_LHDataAnalysis_shuju').doc(listAll_canshu1[0][i]._id).remove({
          // // db.collection('SY_LHDataAnalysis_shuju').doc('ee3099285cc15a41065bd21127709088').remove({
          //   success: res => {
          //     console.log(res);

          //   },
          // })
          console.log('removeid:' + listAll_canshu1[0][i]._id);
          //删别人的自己的都可以
          wx.cloud.callFunction({
            name: 'removeid',
            data: {
              a: listAll_canshu1[0][i]._id

            },
            success: res => {
              // wx.showToast({
              //   title: '删除成功',
              // })
            },
            fail: err => {
              // wx.showToast({
              //   icon: 'none',
              //   title: ' 失败',
              // })
              console.error('[云函数]  调用失败：', err)
            }

          })
        }
        wx.showToast({
          title: listAll_canshu1[0].length + '条删除成功',
        })

      },
    })

  },
  del() {
    wx.cloud.callFunction({
      name: 'removeid',
      data: {
        a: 'ee3099285cc2968706dfae9d0aa5a069'
        // id: D[id].id,
      },
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: ' 失败',
        })
        console.error('[云函数]  调用失败：', err)
      }

    })
  },


});