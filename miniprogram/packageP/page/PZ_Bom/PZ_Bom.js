const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  //
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  rqxzShow2: false,
  rqxzShow3: false,
  //
  tjShow:false,
  xgShow: false,
  cxShow: false,
  data: {
    list:[],
    title: [{ text: "物料编码", width: "200rpx", columnName: "code", type: "digit", isupd: true },
            { text: "物料名称", width: "200rpx", columnName: "name", type: "text", isupd: true },
            { text: "类别", width: "200rpx", columnName: "type", type: "text", isupd: true },
            { text: "规格", width: "200rpx", columnName: "norms", type: "text", isupd: true },
            { text: "描述", width: "400rpx", columnName: "comment", type: "date", isupd: true },
            { text: "大小", width: "200rpx", columnName: "size", type: "text", isupd: true },
            { text: "单位", width: "200rpx", columnName: "unit", type: "date", isupd: true },
            { text: "使用数量", width: "200rpx", columnName: "useNum", type: "date", isupd: false }
          ],
    code:"",  
    name:"",
    type:"",
    wlbm: "",
    wlmc: "",
    lb: "",
    gg: "",
    dx: "",
    dw: "",
    ms: "",
    id:"",
    // 新增代码
    isdis: '',
    isdischa: '',
    isdisgai:'',
    isdisshan:''
    //结束
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//原先代码
    // var _this=this 
    //  var e= ['', '', '']
    //  _this.tableShow(e)
//结束
  
  //新增代码
  var _this = this
  var e= ['', '', '']

  //_this.tableShow(e)
  
  _this.panduanquanxian()
  //判断是否有查看权限
  if (_this.data.isdischa == 1) {
    _this.tableShow(e)
  }
  _this.setData({

  })

  //_this.addMK()
  //_this.
  //_this.module_info_show(_this.e)
   
    
  //   //结束
},

  //新增代码
       //判断权限
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
        console.log("department_list1")
        console.log(paibanbiao_renyuan_bumen1)
        for (let i = 0; i < department_list1.length; i++) {
          console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
          if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "BOM") {
            console.log("BOM没有添加权限")
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
//初始数据
tableShow: function (e) {
  var _this = this
  let user = app.globalData.gongsi;
  console.log(e)
  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: {
      query: "select * from (select row_number() over(order by b.id) as rownum,b.*,isnull((select sum(o.use_num*oi.set_num) from order_bom as o left join order_info as oi on o.order_id = oi.id where o.bom_id = b.id), 0) as useNum from bom_info as b where b.company = '" + user + "' and code like '%" + e[0] + "%' and name like '%" + e[1] + "%' and type like '%" + e[2] + "%') as bom where company='" + user + "'"
    },
    success: res => {
      var list = res.result.recordset
      _this.setData({
        list: list,
        listJiQi: list
      })
      console.log(list)
      wx.hideLoading({

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
  
  module_info_show: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select * from(select id,isnull((select name from module_type as t where module_info.type_id=t.id),'') as type_name,isnull(name,'') as name,isnull(cast(num as varchar),'') as num,isnull((select name from module_info as i where module_info.parent_id=i.id),'') as parent from module_info where company = '" + user + "') as p where not p.type_name  is null and p.type_name !='' and p.type_name like '%" + e + "%'"
      },
      success: res => {
        var list_module_info = res.result.recordset
        console.log(res)
        _this.setData({
          list_module_info: list_module_info
        })
        wx.hideLoading({

        })
              //新增
      wx.showToast({
        title: '删除成功！',
        icon: 'none'
      })
      _this.tableShow()
      _this.qxShow()
      //结束
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
 

  qxShow: function () {
    var _this = this
    _this.setData({
      delWindow1: false,
      rqxzShow1: false,
      rqxzShow2: false,
      rqxzShow3: false,
      tjShow: false,
    })
  },
  qxShow2: function () {
    var _this = this
    _this.setData({
      delWindow1: false,
      rqxzShow1: false,
      rqxzShow2: false,
      rqxzShow3: false,
    })
  },
  // //结束
  // tableShow:function(e){
  //   var _this = this
  //   let user = app.globalData.gongsi;
  //   wx.cloud.callFunction({
  //     name: 'sqlServer_PC',
  //     data: {
  //       query: "select id,code,name,[type],norms,comment,[size],[unit],isnull((select sum(use_num) from order_bom where bom_id=bom_info.id),0) as [count] from bom_info where company='" + user + "' and code like '%" + e[0] + "%' and name like '%" + e[1] + "%' and [type] like '%" + e[2] +"%'"
  //     },
  //     success: res => {
  //         var list = res.result.recordset
  //         _this.setData({
  //           list: list
  //         })
  //       wx.hideLoading({

  //       })
  //     },
  //     err: res => {
  //       console.log("错误!")
  //     },
  //     fail: res => {
  //       wx.showToast({
  //         title: '请求失败！',
  //         icon: 'none'
  //       })
  //       console.log("请求失败！")
  //     }
  //   })
  // },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
  qxShow:function(){
    var _this=this
    _this.setData({
      tjShow:false,
      xgShow: false,
      cxShow:false,
      code: "",
      name: "",
      type: "",
      wlbm: "",
      wlmc: "",
      lb: "",
      gg: "",
      dx: "",
      dw: "",
      ms: "",
      id: "",
    })
  },
  inquire:function(){
    var _this = this
    _this.setData({
      tjShow: true
    })
  },
  add1:function(){
    var _this=this
    let user = app.globalData.gongsi;
    if (_this.data.wlbm != "" && _this.data.wlmc != "" && _this.data.lb !=""){
      // wx.cloud.callFunction({
      //   name: 'sqlServer_PC',
      //   data: {
      //     query: "select * from bom_info where code ='" + _this.data.wlbm + "' or name ='" + _this.data.wlmc +"'"
      //   },
      //   success: res => {
      //     if (res.result.recordset.length=0){


      // ------------------------------------
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "insert into bom_info(code,name,norms,comment,[unit],[size],[type],company) values('" + _this.data.wlbm + "','" + _this.data.wlmc + "','" + _this.data.gg + "','" + _this.data.ms + "','" + _this.data.dw + "','" + _this.data.dx + "','" + _this.data.lb + "','" + user +"')"
      },
      success: res => {
        _this.setData({
          code: "",
          name: "",
          norms: "",
          wlbm: "",
          wlmc: "",
          lb: "",
          gg: "",
          dx: "",
          dw: "",
          ms: "",
        })
        _this.qxShow()
        var e = ['', '', '']
        _this.tableShow(e)
        wx.showToast({
          title: '添加成功！',
          icon: 'none'
        })
        wx.hideLoading({

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
          
    // ------------------------------------
          // },
    }else{
      wx.showToast({
        title: '物料编码、物料名称、类别不能为空！',
        icon: 'none'
      })
    
  }
  },
  clickView:function(e){
    var _this = this
    _this.setData({
      wlbm: _this.data.list[e.currentTarget.dataset.index].code, 
      wlmc: _this.data.list[e.currentTarget.dataset.index].name,
      lb: _this.data.list[e.currentTarget.dataset.index].type,
      gg: _this.data.list[e.currentTarget.dataset.index].norms,
      dx: _this.data.list[e.currentTarget.dataset.index].size,
      dw: _this.data.list[e.currentTarget.dataset.index].unit,
      ms: _this.data.list[e.currentTarget.dataset.index].comment,
      id: _this.data.list[e.currentTarget.dataset.index].id,
      xgShow:true,
    })
  },
  upd1:function(){
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.wlbm != "" && _this.data.wlmc != "" && _this.data.lb !="") {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "update bom_info set code='" + _this.data.wlbm + "',name='" + _this.data.wlmc + "',norms='" + _this.data.gg + "',comment='" + _this.data.ms + "',[unit]='" + _this.data.dw + "',[size]='" + _this.data.dx + "',[type]='" + _this.data.lb + "' where  company='" + user + "' and id='" + _this.data.id +"'"
        },
        success: res => {
          _this.setData({
            code: "",
            name: "",
            norms: "",
            wlbm: "",
            wlmc: "",
            lb: "",
            gg: "",
            dx: "",
            dw: "",
            ms: "",
          })
          _this.qxShow()
          var e = ['', '', '']

          _this.tableShow(e)

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
    } else {
      wx.showToast({
        title: '物料编码、物料名称、类别不能为空！',
        icon: 'none'
      })
    }
  },
  del1:function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "delete from bom_info where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            code: "",
            name: "",
            norms: "",
            wlbm: "",
            wlmc: "",
            lb: "",
            gg: "",
            dx: "",
            dw: "",
            ms: "",
          })
          _this.qxShow()
          var e = ['', '', '']
          _this.tableShow()
          wx.showToast({
            title: '删除成功！',
            icon: 'none'
          })
          wx.hideLoading({

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
  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
    })
  },
  sel1:function(){
    var _this = this
    var e = [_this.data.code, _this.data.name, _this.data.type]
    _this.tableShow(e)
    _this.qxShow()
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