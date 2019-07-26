// miniprogram/pages/frmadminindex/frmadminindex.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    department: [{
      tag: "新建",
      icon: "pifuke color1"
    }, {
      tag: "查看",
      icon: "tuina color2"
    }],
    searchDoctor: [],
    selectnameValue: '',
    // list: [
    //   { id: 1, name: 1, checked: false },
    //   { id: 2, name: 2, checked: false },
    //   { id: 3, name: 3, checked: false },
    //   { id: 4, name: 4, checked: false },
    // ],
    select: [],
    listAll: [],
    shop: ['默认排序', '最新上拍', '即将结拍'],
    shopitem: 'name1'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // app.editTabBar1(); //底部栏
    const db = wx.cloud.database();
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi 

    
    db.collection('Yh_JinXiaoCun_user').doc('XJuFPYnnuWjci0CF').get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var listAll = [];
    const db = wx.cloud.database();
    db.collection('Yh_JinXiaoCun_user').get({
      success(res) {
        listAll.push(res.data)
        that.setData({
          listAll: listAll[0]
        },
          console.log(listAll)
        )
      }
    })


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  searchFocus: function () {
    this.setData({
      searchClass: "inputFocus"
    });
  },
  searchBlur: function () {
    this.setData({
      searchClass: ""
    })
  },

  searchKey: function (e) {

    // 节流算法
    change && clearTimeout(change);

    change = setTimeout(() => {
      change = null;
      let val = e.detail.value;
      val && a.request({
        "doc_name": val,
        "depId": -1,
        "subdepId": -1
      }, "searchDoctor", data => {
        data = data.data;
        if (typeof data == "object") {
          data.map && data.map(res => {
            res.split = res.name.split(val);
            res.key = val;
            return res;
          });
          this.setData({
            searchDoctor: data
          });
        }
      });
    }, 500);
  },
  navgiate: function () {

    wx.navigateTo({
      url: "/pages/frmadminform/frmadminform"
    });

  },
  navgiate2: function () {
    console.log(this.data.select)
    wx.navigateTo({
      url: "/pages/frmedituser/frmedituser?_id=" + this.data.selectnameValue
      // this.data.select
    });

  },
  bindAll: function (e) {


  },
  //单选
  select: function (e) {
    let selectValue = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.index;
    let listAll = this.data.listAll
    console.log('ss' + selectValue);

    let newli = 'listAll[' + index + '].checked';
    this.setData({
      [newli]: !this.data.listAll[index].checked,
      selectnameValue: selectValue
    })
    let li2 = this.data.listAll[index].checked
    if (li2 == false) {
      for (let i in this.data.select) {
        if (this.data.select[i] == selectValue) {
          this.data.select.splice(i, 1);
        }
      }
    } else {
      this.data.select.push(selectValue);
    }
    this.setData({
      shopitem: this.data.select,
    })
    //  console.log(this.data.select)
    console.log(this.data.shopitem)

  },
  bindshop: function (event) {
    var classify = event.currentTarget.dataset.classify;
    var that = this;

    console.log(classify)  //输出的结果就是你点击的
    this.setData({
      shopitem: classify,  //更新


    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})