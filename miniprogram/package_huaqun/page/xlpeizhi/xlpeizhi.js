// package_huaqun/page/xlpeizhi/xlpeizhi.js
// pages/general/general.js
Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  data: {
    update_name:{
      cxdk:"出线端口",
      lxc:"铝型材",
      lcys:"铝材颜色",
      gy:"光源",
      dy:"电源",
      kg:"开关",
      pj:"配件",
    },
    list: [],
    title: [{
        text: "出线端口",
        width: "275rpx",
        columnName: "cxdk",
        type: "text",
        isupd: true
      },
      {
        text: "铝型材",
        width: "330rpx",
        columnName: "lxc",
        type: "text",
        isupd: true
      },
      {
        text: "铝材颜色",
        width: "200rpx",
        columnName: "lcys",
        type: "text",
        isupd: true
      },
      {
        text: "光源",
        width: "275rpx",
        columnName: "gy",
        type: "text",
        isupd: true
      },{
        text: "电源",
        width: "300rpx",
        columnName: "dy",
        type: "text",
        isupd: true
      },{
        text: "开关",
        width: "225rpx",
        columnName: "kg",
        type: "text",
        isupd: true
      },{
        text: "配件",
        width: "275rpx",
        columnName: "pj",
        type: "text",
        isupd: true
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    
    _this.tableShow()
  },

  tableShow: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "select id,isnull(cxdk,'') as cxdk,isnull(lxc,'') as lxc,isnull(lcys,'') as lcys,isnull(gy,'') as gy,isnull(dy,'') as dy,isnull(kg,'') as kg,isnull(pj,'') as pj from dropdowntable"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          list: list
        })
        console.log(list)
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
      currentDate: new Date().getTime()
    })
  },

  clickView:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    console.log(e.currentTarget.dataset.value)
    console.log(_this.data.list[e.currentTarget.dataset.index].id)
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id,
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      xgShow:true,
    })
  },

  inquire: function () {
    var _this = this
    wx.showModal({
      title: '提示',
      content: '确认添加一条数据？',
      success (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlserver_huaqun',
            data: {
              query: "insert into dropdowntable(cxdk,lxc,lcys,gy,dy,kg,pj) values('','','','','','','')"
            },
            success: res => {
              _this.setData({
                id:'',
                cxdk:'', 
                lxc: '',
                lcys: '',
                gy: '',
                dy: '',
                kg: '',
                pj: '',
                
              })
              _this.qxShow()
              _this.tableShow()
              wx.showToast({
                title: '添加成功！',
                icon: 'none'
              })
            },
            err: res => {
              console.log("错误!")
            },
            fail: res => {
              wx.showToast({
                title: '请求失败！',
                icon: 'none'
              })
              console.log("请求失败！")
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  add1: function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlserver_huaqun',
        data: {
          query: "insert into dropdowntable(cxdk,lxc,lcys,gy,dy,kg,pj) values('" + _this.data.cxdk + "','" + _this.data.lxc + "','" + _this.data.lcys + "','" + _this.data.gy + "','" + _this.data.dy + "','" + _this.data.kg + "','" + _this.data.pj + "')"
        },
        success: res => {
          _this.setData({
            id:'',
            cxdk:'', 
            lxc: '',
            lcys: '',
            gy: '',
            dy: '',
            kg: '',
            pj: '',
          })
          _this.qxShow()
          _this.tableShow()
          wx.showToast({
            title: '添加成功！',
            icon: 'none'
          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          console.log("请求失败！")
        }
      })
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },
  upd1:function(){
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: "update dropdowntable set " + _this.data.this_column + "='" + _this.data.this_value + "' where  id=" + _this.data.id 
      },
      success: res => {
        _this.setData({
          id:'',
          this_column:'',
          this_value:'',
        })
        _this.qxShow()
        _this.tableShow()

        wx.showToast({
          title: '修改成功！',
          icon: 'none'
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
  },

  del1:function(e){
    var _this = this
    console.log('aaa',_this.data.list[e.currentTarget.dataset.index].id)

    wx.showModal({
      title: '提示',
      content: '确认删除此行数据？',
      success (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sqlserver_huaqun',
            data: {
              query: "delete from dropdowntable where id=" + _this.data.list[e.currentTarget.dataset.index].id
            },
            success: res => {
              _this.setData({
                id:'',
                cxdk:'', 
                lxc: '',
                lcys: '',
                gy: '',
                dy: '',
                kg: '',
                pj: '',
              })
              _this.qxShow()
              _this.tableShow()
              wx.showToast({
                title: '删除成功！',
                icon: 'none'
              })
            },
            err: res => {
              console.log("错误!")
            },
            fail: res => {
              wx.showToast({
                title: '请求失败！',
                icon: 'none'
              })
              console.log("请求失败！")
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})