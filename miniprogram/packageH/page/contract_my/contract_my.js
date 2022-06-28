// packageH/page/contract_my/contract_my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pick_list:[
      {label:'我收到的合同'},
      {label:'待签字'},
      {label:'已签字'},
    ],
    picker_select:'我收到的合同',
    this_gongsi:'',
    this_user_name:'',
    this_user_id:'',
    this_company:'',
    this_full_name:'',
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
    {
      text: "是否签字",
      width: "200rpx",
      columnName: "send_judge",
      type: "text",
      isupd: true
    },
  ],
    full_name:'',
    user_name:'',
    password:'',
    power:'',
    id:'',
    cha:'',
    gai:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    console.log(userInfo.id)
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
        if(list.gerenzhongxin_sel == '否'){
          wx.showToast({
            title: '没有查询权限！',
            icon: 'none',
            duration: 3000
          })
        }else{
          if(userInfo.qianzi == '待签字'){
            var ee = [userInfo.user_name,'否',userInfo.company]
            _this.setData({
              picker_select:'待签字'
            })
          }else{
            var ee = [userInfo.user_name,'',userInfo.company]
          }
          _this.tableShow(ee)
        }
        _this.setData({
          cha: list.gerenzhongxin_sel,
          gai: list.gerenzhongxin_upd
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
      this_user_name : userInfo.user_name,
      this_user_id : userInfo.id,
      this_company : userInfo.company,
      this_full_name : userInfo.full_name,
    })

  },

  tableShow: function (ee) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select id,contract_code,contract_name,contract_type,first_party,second_party,creator,creation_date,send_out,company,case when send_judge = '' then '否' else send_judge end as send_judge from contract_manage where (send_out = '" + ee[0] + "' or first_party = '" + ee[0] + "') and send_judge like '%" + ee[1] + "%' and company = '"+ ee[2] +"'"
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

  choicePick (e) {
    var _this = this
    console.log("e",e);
    this.setData({
      picker_select: _this.data.pick_list[e.detail.value].label
    })
    var this_select = _this.data.pick_list[e.detail.value].label
    var ee = [_this.data.this_user_name,'',_this.data.this_company]
    if(this_select =='我收到的合同'){
      var ee = [_this.data.this_user_name,'',_this.data.this_company]
    }else if(this_select =='待签字'){
      var ee = [_this.data.this_user_name,'否',_this.data.this_company]
    }else if (this_select =='已签字'){
      var ee = [_this.data.this_user_name,'是',_this.data.this_company]
    }

    if(_this.data.cha == '否'){
      wx.showToast({
        title: '没有查询权限！',
        icon: 'none',
        duration: 3000
      })
      _this.setData({
        list:[]
      })
      return;
    }

    _this.tableShow(ee)
  },

  clickView:function(e){
    var _this = this
    var send_judge = _this.data.list[e.currentTarget.dataset.index].send_judge
    var id = _this.data.list[e.currentTarget.dataset.index].id
    var first_party = _this.data.list[e.currentTarget.dataset.index].first_party
    var second_party = _this.data.list[e.currentTarget.dataset.index].send_out
    var qianzi_type = ''
    console.log(_this.data.this_user_name)
    if(_this.data.this_user_name == first_party){
      qianzi_type = "甲"
    }else{
      qianzi_type = "乙"
    }
    console.log(qianzi_type)
    if(_this.data.gai == '否'){
      wx.showToast({
        title: '没有修改权限！',
        icon: 'none',
        duration: 3000
      })
      return;
    }

    console.log(id)
    // if (send_judge == '是'){
    //   wx.showToast({
    //     title:"此合同已过签字",
    //     icon: 'none',//图标，支持"success"、"loading" 
    //     duration: 1500,//提示的延迟时间，单位毫秒，默认：1500 
    //     mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false 
    //   })
    //   return;
    // }
    // else{
      wx.showModal({
        title: '提示',
        content: '确定跳转到签字？',
        showCancel: true,//是否显示取消按钮
        cancelText:"取消",//默认是“取消”
        cancelColor:'#000000',//取消按钮的文字颜色，必须是 16 进制格式的颜色字符串
        confirmText:"确定",//默认是“确定”
        confirmColor: '#576B95',//确定文字的颜色，必须是 16 进制格式的颜色字符串
        success: function (res) {
           if (res.confirm) {
            wx.navigateTo({
              url: '../contract_pitcure_select/contract_pitcure_select' + '?userInfo=' + JSON.stringify({
                id : id,
                qianzi_type:qianzi_type,
                send_judge:send_judge
              })
            })
           } else if(res.cancel) {
             return;
           }
        },
     })
    // }

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