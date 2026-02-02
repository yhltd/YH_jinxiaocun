// packageP/page/PC_RenYuanXinXi/PC_RenYuanXinXi.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xm:"",
    dh:"",
    idcard:"",
    bm:"",
    bc:"",
    id:"",
    list:[],
    listBUMEN: [],
    title: 
    [{ text: "姓名", width: "200rpx", columnName: "staff_name", type: "text", isupd: true },
    { text: "电话", width: "250rpx", columnName: "phone_number", type: "text", isupd: true },
    { text: "身份证号", width: "300rpx", columnName: "id_number", type: "text", isupd: true },
    { text: "部门名称", width: "200rpx", columnName: "department_name", type: "text", isupd: true },
    { text: "班次", width: "200rpx", columnName: "banci", type: "text", isupd: true },
  ],
  tjShow: false,
  handle:true,
  delWindow1:false,
  xgShow:false,
  rqxzShow3:false,
  cxShow:false,
  isdis: '',
  isdischa: '',
  isdisgai:'',
  isdisshan:'',
  name:'',
  banci:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.panduanquanxian()
    if (_this.data.isdischa == 1) {
      var e = ['','']
      _this.tableShow(e)
      _this.getSystemName()
    }
  },

  entering: function () {
    var _this = this
    _this.setData({
      cxShow: true,
      name:'',
      banci:'',
    })
  },

  sel1:function(){
    var _this = this
    console.log(_this.data.name)
    console.log(_this.data.banci)
    var e = [_this.data.name,_this.data.banci]
    _this.tableShow(e)
    _this.qxShow()
    wx.showToast({
      title: '查询成功！',
      icon: 'none',
      duration: 2000
    })
  },

  goto_yanshi: function(){
    wx.navigateTo({
      url: "../PC_mp4/PC_mp4?this_url=cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/pakageP_mp4/renyuanxinxi.mp4"
      }) 
  },

  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa:1,
      isdisgai:1,
      isdisshan:1
    });
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log(department_list1)
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "人员信息") {
        console.log(department_list1[i])
        //添加没权限
        if (department_list1[i].add == "否") {
          _this.setData({
            isdis: 2            
          });
          // console.log("否 isdis："+_this.data.isdis)
        } else {
          _this.setData({
            isdis: 1           
          });
         // console.log("是 isdis："+_this.data.isdis)

        }
        //修改没权限
        if (department_list1[i].upd == "否") {
          _this.setData({           
            isdisgai:2
          });
        } else {
          _this.setData({           
            isdisgai:1
          });

        }
        //删除没权限
        if (department_list1[i].del == "否") {
          _this.setData({           
            isdisshan:2
          });
          console.log("否 isdisshan："+_this.data.isdisshan)
        } else {
          _this.setData({           
            isdisshan:1
          });
          
          console.log("是 isdisshan："+_this.data.isdisshan)
        }
        //查询没权限
        if (department_list1[i].sel == "否") {
          _this.setData({           
            isdischa:2
          });
        } else {
          _this.setData({           
            isdischa:1
          });

        }
        console.log(_this.data.isdis)

      }
    }
  },

  tableShow:function(e){
    var _this = this
    let user = app.globalData.gongsi;
    console.log("select * from paibanbiao_renyuan where company='" + user + "' and staff_name like '%" + e[0] + "%' and banci like '%"+ e[1] +"%'")
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select * from paibanbiao_renyuan where company='" + user + "' and staff_name like '%" + e[0] + "%' and banci like '%"+ e[1] +"%'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list: list,
          name:'',
          banci:'',
        })

        // console.log(list)
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

     onInput3: function (e) {
     var _this = this
     let column = e.currentTarget.dataset.column
     _this.setData({
       [column]: e.detail.value
     })
   },

  add1:function(){
    var _this=this
    let user = app.globalData.gongsi;
    if (_this.data.xm != "" ){
      
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "insert into paibanbiao_renyuan (staff_name,phone_number,id_number,department_name,banci,company) values ('" +_this.data.xm + "','"+ _this.data.dh + "','"+ _this.data.idcard + "','" + _this.data.bm + "','" + _this.data.bc+ "','" + user + "')"
        },
        success: res => {
          wx.showToast({
            title: '添加成功！',
            icon: 'none'
          })
          var e = ['', '']
          _this.qxShow()
          _this.tableShow(e)
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
     
    }else{
      wx.showToast({
        title: '姓名不能为空！',
        icon: 'none'
      })
    }
  },

  upd1: function () {
    var _this = this
    if (_this.data.xm != "") {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "update paibanbiao_renyuan set staff_name='" + _this.data.xm + "',phone_number='" + _this.data.dh + "',id_number='" + _this.data.idcard + "',department_name='" + _this.data.bm + "', banci='" + _this.data.bc + "' where id='" + _this.data.id +"'"
        },
        success: res => {
          _this.setData({
            xm: "",
            dh: "",
            idcard: "",
            bm: "",
            bc: "",
          })
          _this.qxShow()
          _this.tableShow()
          wx.showToast({
            title: '修改成功！',
            icon: 'none',
            duration: 3000
          })
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
    } else {
      wx.showToast({
        title: '姓名不能为空！',
        icon: 'none',
        duration: 3000
      })
    }
  },

  inquire:function(){
    var _this=this
    _this.setData({
      tjShow:true,
      xm:"",
      dh:"",
      idcard:"",
      bm:"",
      bc:"",
      id:""
    })
  },

  clickView:function(e){
    var _this = this
    _this.setData({
      xm: _this.data.list[e.currentTarget.dataset.index].staff_name,
      dh: _this.data.list[e.currentTarget.dataset.index].phone_number,
      idcard: _this.data.list[e.currentTarget.dataset.index].id_number,
      bm: _this.data.list[e.currentTarget.dataset.index].department_name,
      bc: _this.data.list[e.currentTarget.dataset.index].banci,
      id: _this.data.list[e.currentTarget.dataset.index].id,
      handle:false,
    })
  },

  sure1:function(){
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "delete from paibanbiao_renyuan where id='" + _this.data.id + "'"
      },
      success: res => {
        wx.showToast({
          title: '删除成功！',
          icon: 'none',
          duration: 3000
        })
        var e = ['', '']
        _this.tableShow(e)
        _this.setData({
          handle: true
        })
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

  scRenYuan:function(){
    var _this = this
    _this.setData({
      delWindow1:true
    })
  },

  hid_view:function(){
    var _this = this
    _this.setData({
      handle:true
    })
  },

  qxShow:function(){
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow:false,
      handle:true
    })
  },

  xgRenYuan:function(){
    var _this = this
    _this.setData({
      xgShow:true
    })
  },

  getSystemName: function () {
    var _this = this;
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select distinct department_name as name from paibanbiao_renyuan where company='" + user + "'"
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          listBUMEN: list
        })
      },
      err: res => {
        console.log("错误!" + res)
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

  selBM: function () {
    var _this = this
    _this.setData({
      rqxzShow3: true
    })
  },

  select2: function (e) {
    var _this = this
    _this.setData({
      rqxzShow3: false
    })
    if (e.type == 'select') {
      _this.setData({
        bm: e.detail.name,
      })
    }
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