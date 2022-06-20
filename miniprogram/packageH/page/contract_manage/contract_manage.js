// packageH/page/contract_manage/contract_manage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    user_name:'',
    user_id:'',
    company:'',
    full_name:'',
    tableShow: true,
    delWindow1: false,
    tjShow: false,
    rqxzShow1: false,
    xgShow: false,
    cxShow: false,
    list: [],
    title: [{
        text: "合同编码",
        width: "275rpx",
        columnName: "contract_code",
        type: "text",
        isupd: true
      },
      {
        text: "合同名称",
        width: "300rpx",
        columnName: "contract_name",
        type: "text",
        isupd: true
      },
      {
        text: "合同类别",
        width: "275rpx",
        columnName: "contract_type",
        type: "text",
        isupd: true
      },
      {
        text: "甲方",
        width: "200rpx",
        columnName: "first_party",
        type: "text",
        isupd: true
      },
      {
        text: "乙方",
        width: "200rpx",
        columnName: "second_party",
        type: "text",
        isupd: true
      },
      {
        text: "创建者",
        width: "200rpx",
        columnName: "creator",
        type: "text",
        isupd: true
      },
      {
        text: "创建日期",
        width: "200rpx",
        columnName: "creation_date",
        type: "text",
        isupd: true
      },
      {
        text: "签字人",
        width: "200rpx",
        columnName: "send_out",
        type: "text",
        isupd: true
      },
    ],
    contract_code:"",
    contract_name:"",
    contract_type:"",
    first_party:"",
    second_party:"",
    creation_date:"",
    send_out:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    var sql = "select * from contract_personnel_power where personnel_id ='" + userInfo.id + "'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordset[0]
        if(list.hetongguanli_sel == '否'){
          wx.showToast({
            title: '没有查询权限！',
            icon: 'none',
            duration: 3000
          })
        }else{
          var e = ['','','','1900/1/1','2100/12/31',userInfo.company]
          _this.tableShow(e)
        }
        _this.setData({
          cha: list.hetongguanli_sel,
          shan: list.hetongguanli_del,
          gai: list.hetongguanli_upd,
          zeng: list.hetongguanli_add,
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
    _this.setData({
      user_name : userInfo.user_name,
      user_id : userInfo.id,
      company : userInfo.company,
      full_name : userInfo.full_name,
    })
    
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from contract_manage where contract_code like '%" + e[0] + "%' and contract_name like '%" + e[1] + "%' and contract_type like '%" + e[2] + "%' and creation_date between '" + e[3] + "' and '" + e[4] + "' and company = '" + e[5] + "'"
      },
      success: res => {
        var list = res.result.recordset
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

  inquire: function () {
    var _this = this
    if(_this.data.zeng == '否'){
      wx.showToast({
        title: '没有添加权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    _this.setData({
      tjShow: true,
      contract_code:"",
      contract_name:"",
      contract_type:"",
      first_party:"",
      second_party:"",
      creation_date:"",
      send_out:"",
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

  choiceDate: function (e) {
    //e.preventDefault(); 
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },

  add1: function () {
    var _this = this
    if (_this.data.contract_code != "" && _this.data.contract_name != "" && _this.data.contract_type != "" && _this.data.first_party != "" && _this.data.second_party != "" && _this.data.creation_date != "" && _this.data.send_out != "") {
      wx.cloud.callFunction({
        name: 'sqlServer_cw',
        data: {
          query: "insert into contract_manage(contract_code,contract_name,contract_type,first_party,second_party,creator,creation_date,send_out,company,send_judge) values('" + _this.data.contract_code + "','" + _this.data.contract_name + "','" + _this.data.contract_type + "','" + _this.data.first_party + "','" + _this.data.second_party + "','" + _this.data.full_name + "','" + _this.data.creation_date + "','" + _this.data.send_out + "','" + _this.data.company + "','否')"
        },
        success: res => {
          _this.setData({
            contract_code:"",
            contract_name:"",
            contract_type:"",
            first_party:"",
            second_party:"",
            creation_date:"",
            send_out:"",
          })
          _this.qxShow()
          var e = ['','','','1900/1/1','2100/12/31', _this.data.company]
          _this.tableShow(e)
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
    } else {
      wx.showToast({
        title: '信息输入不全！',
        icon: 'none'
      })
    }
  },

  upd1:function(){
    var _this = this
    if (_this.data.contract_code != "" && _this.data.contract_name != "" && _this.data.contract_type != "" && _this.data.first_party != "" && _this.data.second_party != "" && _this.data.creation_date != "" && _this.data.send_out != ""){
      wx.cloud.callFunction({
        name: 'sqlServer_cw',
        data: {
          query: "update contract_manage set contract_code='" + _this.data.contract_code + "',contract_name='" + _this.data.contract_name + "',contract_type='" + _this.data.contract_type + "',first_party='" + _this.data.first_party + "',second_party='" + _this.data.second_party + "',creation_date='" + _this.data.creation_date + "',send_out='" + _this.data.send_out + "' where company='" + _this.data.company + "' and id='" + _this.data.id +"'"
        },
        success: res => {
          _this.setData({
            contract_code:"",
            contract_name:"",
            contract_type:"",
            first_party:"",
            second_party:"",
            creation_date:"",
            send_out:"",
            id:"",
          })
          _this.qxShow()
          var e = ['','','','1900/1/1','2100/12/31', _this.data.company]
          _this.tableShow(e)

          wx.showToast({
            title: '保存成功！',
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
    } else {
      wx.showToast({
        title: '信息输入不全！',
        icon: 'none'
      })
    }
  },

  clickView:function(e){
    var _this = this

    if(_this.data.gai == '否'){
      wx.showToast({
        title: '没有修改权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    _this.setData({
      contract_code: _this.data.list[e.currentTarget.dataset.index].contract_code, 
      contract_name: _this.data.list[e.currentTarget.dataset.index].contract_name,
      contract_type: _this.data.list[e.currentTarget.dataset.index].contract_type,
      first_party: _this.data.list[e.currentTarget.dataset.index].first_party,
      second_party: _this.data.list[e.currentTarget.dataset.index].second_party,
      creation_date: _this.data.list[e.currentTarget.dataset.index].creation_date,
      send_out: _this.data.list[e.currentTarget.dataset.index].send_out,
      id: _this.data.list[e.currentTarget.dataset.index].id,
      xgShow:true,
    })
  },

  del1:function(){
    var _this = this
    if(_this.data.shan == '否'){
      wx.showToast({
        title: '没有删除权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '是否删除此合同？',
      success: function(res) {
        if (res.cancel) {
          return;
        }else{
          wx.cloud.callFunction({
            name: 'sqlServer_cw',
            data: {
              query: "delete from contract_manage where id='" + _this.data.id + "';delete from contract_manage where contract_id ='" + _this.data.id + "';"
            },
            success: res => {
              _this.setData({
                contract_code:"",
                contract_name:"",
                contract_type:"",
                first_party:"",
                second_party:"",
                creation_date:"",
                send_out:"",
                id:"",
              })
              _this.qxShow()
              var e = ['','','','1900/1/1','2100/12/31', _this.data.company]
              _this.tableShow(e)
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
        }
      }
    })
      
  },

  entering:function(){
    var _this=this

    if(_this.data.cha == '否'){
      wx.showToast({
        title: '没有查询权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    _this.setData({
      cxShow:true,
      contract_code:"",
      contract_name:"",
      contract_type:"",
      first_party:"",
      second_party:"",
      creation_date:"",
      creation_date_start:"",
      creation_date_stop:"",
      send_out:"",
    })
  },

  sel1:function(){
    var _this = this
    var start_date = '1900/1/1'
    var stop_date = '2100/12/31'
    if (_this.data.creation_date_start != ''){
      start_date = _this.data.creation_date_start
    }
    if (_this.data.creation_date_stop != ''){
      stop_date = _this.data.creation_date_stop
    }
    var e = [_this.data.contract_code,_this.data.contract_name,_this.data.contract_type,start_date,stop_date,_this.data.company]
    _this.tableShow(e)
    _this.qxShow()
  },


  contract_png:function(){
    var _this = this
    var url = "../contract_png/contract_png"
    wx.navigateTo({
      url: url + '?userInfo=' + JSON.stringify({
        id : _this.data.id,
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})