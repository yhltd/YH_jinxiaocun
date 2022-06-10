// packageH/page/contract_personnel/contract_personnel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    qx:true,
    list: [],
    title: [{
        text: "姓名",
        width: "200rpx",
        columnName: "full_name",
        type: "text",
        isupd: true
      },
      {
        text: "账号",
        width: "300rpx",
        columnName: "user_name",
        type: "text",
        isupd: true
      },
      {
        text: "密码",
        width: "300rpx",
        columnName: "password",
        type: "text",
        isupd: true
      },
      {
        text: "权限",
        width: "200rpx",
        columnName: "power",
        type: "text",
        isupd: true
      }
    ],
    full_name:'',
    user_name:'',
    password:'',
    power:'',
    id:'',
    array: ['个人中心', '合同管理', '账户信息','印章管理'],
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
        if(list.zhanghuzhongxin_sel == '否'){
          wx.showToast({
            title: '没有查询权限！',
            icon: 'none',
            duration: 3000
          })
        }else{
          var e = ['',userInfo.company]
          _this.tableShow(e)
        }
        _this.setData({
          cha: list.zhanghuzhongxin_sel,
          shan: list.zhanghuzhongxin_del,
          gai: list.zhanghuzhongxin_upd,
          zeng: list.zhanghuzhongxin_add,
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

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from contract_personnel where full_name like '%" + e[0] + "%' and company = '" + e[1] + "'"
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
      full_name:'',
      user_name:'',
      password:'',
      power:'',
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

  add1: function () {
    var _this = this
    if (_this.data.full_name != "" && _this.data.user_name != "" && _this.data.password != "" && _this.data.power != "") {
      wx.cloud.callFunction({
        name: 'sqlServer_cw',
        data: {
          query: "insert into contract_personnel(full_name,user_name,password,power,company) values('" + _this.data.full_name + "','" + _this.data.user_name + "','" + _this.data.password + "','" + _this.data.power + "','" + _this.data.this_company + "') select @@IDENTITY"
        },
        success: res => {
          console.log(res.result.recordset[0])
          var this_id =res.result.recordset[0]
          var id_value = ''
          for (var key in this_id){
            id_value = this_id[key]
          }
          wx.cloud.callFunction({
            name: 'sqlServer_cw',
            data: {
              query: "insert into contract_personnel_power(personnel_id,gerenzhongxin_sel,gerenzhongxin_upd,hetongguanli_sel,hetongguanli_del,hetongguanli_upd,hetongguanli_add,zhanghuzhongxin_sel,zhanghuzhongxin_del,zhanghuzhongxin_upd,zhanghuzhongxin_add,yinzhangguanli_sel,yinzhangguanli_del,yinzhangguanli_upd,yinzhangguanli_add) values('" + id_value + "','是','是','是','是','是','是','是','是','是','是','是','是','是','是')"
            },
            success: res => {
              console.log("权限添加成功")
            }
          })

          _this.setData({
            full_name:'',
            user_name:'',
            password:'',
            power:'',
          })
          _this.qxShow()
          var e = ['',_this.data.this_company]
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
    if (_this.data.full_name != "" && _this.data.user_name != "" && _this.data.password != "" && _this.data.power != ""){
      wx.cloud.callFunction({
        name: 'sqlServer_cw',
        data: {
          query: "update contract_personnel set full_name='" + _this.data.full_name + "',user_name='" + _this.data.user_name + "',password='" + _this.data.password + "',power='" + _this.data.power + "' where company='" + _this.data.this_company + "' and id='" + _this.data.id +"'"
        },
        success: res => {
          _this.setData({
            full_name:'',
            user_name:'',
            password:'',
            power:'',
            id:"",
          })
          _this.qxShow()
          var e = ['', _this.data.this_company]
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
      full_name: _this.data.list[e.currentTarget.dataset.index].full_name, 
      user_name: _this.data.list[e.currentTarget.dataset.index].user_name,
      password: _this.data.list[e.currentTarget.dataset.index].password,
      power: _this.data.list[e.currentTarget.dataset.index].power,
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
      wx.cloud.callFunction({
        name: 'sqlServer_cw',
        data: {
          query: "delete from contract_personnel where id=" + _this.data.id + ";delete from contract_personnel_power where personnel_id= '" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            full_name:"",
            user_name:"",
            password:"",
            power:"",
            id:"",
          })
          _this.qxShow()
          var e = ['', _this.data.this_company]
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
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
      full_name:"",
    })
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.full_name,_this.data.this_company]
    _this.tableShow(e)
    _this.qxShow()
  },

  bindPickerChange: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var list = _this.data.this_quanxian
    console.log(list)
    var zeng
    var shan
    var gai
    var cha
    var look
    if(e.detail.value==0){
      gai = list.gerenzhongxin_upd
      cha = list.gerenzhongxin_sel
      look = true
    }else if(e.detail.value==1){
      zeng = list.hetongguanli_add
      shan = list.hetongguanli_del
      gai = list.hetongguanli_upd
      cha = list.hetongguanli_sel
      look = false
    }else if(e.detail.value==2){
      zeng = list.zhanghuzhongxin_add
      shan = list.zhanghuzhongxin_del
      gai = list.zhanghuzhongxin_upd
      cha = list.zhanghuzhongxin_sel
      look = false
    }else if(e.detail.value==3){
      zeng = list.yinzhangguanli_add
      shan = list.yinzhangguanli_del
      gai = list.yinzhangguanli_upd
      cha = list.yinzhangguanli_sel
      look = false
    }
    // }else if(e.detail.value==4){
    //   zeng = list.pzhz_add
    //   shan = list.pzhz_delete
    //   gai = list.pzhz_update
    //   cha = list.pzhz_select
    //   look = false
    // }else if(e.detail.value==5){
    //   cha = list.znkb_select
    //   look = true
    // }else if(e.detail.value==6){
    //   cha = list.xjll_select
    //   look = true
    // }else if(e.detail.value==7){
    //   cha = list.zcfz_select
    //   look = true
    // }else if(e.detail.value==8){
    //   cha = list.lysy_select
    //   look = true
    // }else if(e.detail.value==9){
    //   zeng = list.jjtz_add
    //   shan = list.jjtz_delete
    //   gai = list.jjtz_update
    //   cha = list.jjtz_select
    //   look = false
    // }else if(e.detail.value==10){
    //   zeng = list.jjzz_add
    //   shan = list.jjzz_delete
    //   gai = list.jjzz_update
    //   cha = list.jjzz_select
    //   look = false
    // }
    _this.setData({
      index: e.detail.value,
      quanxian_add:zeng,
      quanxian_delete:shan,
      quanxian_update:gai,
      quanxian_select:cha,
      look:look
    })
    
    console.log(list)
    console.log(_this.data.quanxian_add)
    console.log(_this.data.quanxian_delete)
    console.log(_this.data.quanxian_update)
    console.log(_this.data.quanxian_select)
  },

  quanxian: function () {
    var _this = this;
    // if(_this.data.gai){
      console.log(_this.data.id)
      wx.cloud.callFunction({
        name: 'sqlServer_cw',
        data: {
          query: "select * from contract_personnel_power where personnel_id = '" + _this.data.id + "'"
        },
        success: res => {
          console.log(res)
          _this.setData({
            qx: false,
            index:0,
            this_quanxian:res.result.recordset[0],
            quanxian_update:res.result.recordset[0].gerenzhongxin_upd,
            quanxian_select:res.result.recordset[0].gerenzhongxin_sel,
            look:true,
          })
          console.log(_this.data.this_quanxian)
          _this.qxShow()
        },
        err: res => {
          console.log("错误!")
        }
      })

      
    // }else{
    //   wx.showToast({
    //     title: '无修改权限',
    //     icon: "none",
    //     duration: 1000
    //   })
    // }
  },

  inquire_QX:function(){
    var _this = this
    _this.setData({
      qx:true,
    })
  },

  switch1Change: function (e) {
    var _this = this
    var list = _this.data.this_quanxian
    console.log(e.detail.value)
    if (e.detail.value == true) {
      if(_this.data.index==1){
        list.hetongguanli_add = '是'
        _this.setData({
          quanxian_add:'是',
          this_quanxian:list,
        })
      }else if(_this.data.index==2){
        list.zhanghuzhongxin_add = '是'
        _this.setData({
          quanxian_add:'是',
          this_quanxian:list,
        })
      }else if(_this.data.index==3){
        list.yinzhangguanli_add = '是'
        _this.setData({
          quanxian_add:'是',
          this_quanxian:list,
        })
      }
      // else if(_this.data.index==4){
      //   list.pzhz_add = '是'
      //   _this.setData({
      //     quanxian_add:'是',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==9){
      //   list.jjtz_add = '是'
      //   _this.setData({
      //     quanxian_add:'是',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==10){
      //   list.jjzz_add = '是'
      //   _this.setData({
      //     quanxian_add:'是',
      //     this_quanxian:list,
      //   })
      // }
    }else{
      if(_this.data.index==1){
        list.hetongguanli_add = '否'
        _this.setData({
          quanxian_add:'否',
          this_quanxian:list,
        })
      }else if(_this.data.index==2){
        list.zhanghuzhongxin_add = '否'
        _this.setData({
          quanxian_add:'否',
          this_quanxian:list,
        })
      }else if(_this.data.index==3){
        list.yinzhangguanli_add = '否'
        _this.setData({
          quanxian_add:'否',
          this_quanxian:list,
        })
      }
      // else if(_this.data.index==4){
      //   list.pzhz_add = '否'
      //   _this.setData({
      //     quanxian_add:'否',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==9){
      //   list.jjtz_add = '否'
      //   _this.setData({
      //     quanxian_add:'否',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==10){
      //   list.jjzz_add = '否'
      //   _this.setData({
      //     quanxian_add:'否',
      //     this_quanxian:list,
      //   })
      // }
    }
  },
  switch2Change: function (e) {
    var _this = this
    var list = _this.data.this_quanxian
    console.log(e.detail.value)
    if (e.detail.value == true) {
      if(_this.data.index==1){
        list.hetongguanli_del = '是'
        _this.setData({
          quanxian_delete:'是',
          this_quanxian:list,
        })
      }else if(_this.data.index==2){
        list.zhanghuzhongxin_del = '是'
        _this.setData({
          quanxian_delete:'是',
          this_quanxian:list,
        })
      }else if(_this.data.index==3){
        list.yinzhangguanli_del = '是'
        _this.setData({
          quanxian_delete:'是',
          this_quanxian:list,
        })
      }
      // else if(_this.data.index==4){
      //   list.pzhz_delete = '是'
      //   _this.setData({
      //     quanxian_delete:'是',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==9){
      //   list.jjtz_delete = '是'
      //   _this.setData({
      //     quanxian_delete:'是',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==10){
      //   list.jjzz_delete = '是'
      //   _this.setData({
      //     quanxian_delete:'是',
      //     this_quanxian:list,
      //   })
      // }
    }else{
      if(_this.data.index==1){
        list.hetongguanli_del = '否'
        _this.setData({
          quanxian_delete:'否',
          this_quanxian:list,
        })
      }else if(_this.data.index==2){
        list.zhanghuzhongxin_del = '否'
        _this.setData({
          quanxian_delete:'否',
          this_quanxian:list,
        })
      }else if(_this.data.index==3){
        list.yinzhangguanli_del = '否'
        _this.setData({
          quanxian_delete:'否',
          this_quanxian:list,
        })
      }
    }
  },
  switch3Change: function (e) {
    var _this = this
    var list = _this.data.this_quanxian
    console.log(e.detail.value)
    if (e.detail.value == true) {
      if(_this.data.index==0){
        list.gerenzhongxin_upd = '是'
        _this.setData({
          quanxian_update:'是',
          this_quanxian:list,
        })
      }else if(_this.data.index==1){
        list.hetongguanli_upd = '是'
        _this.setData({
          quanxian_update:'是',
          this_quanxian:list,
        })
      }else if(_this.data.index==2){
        list.zhanghuzhongxin_upd = '是'
        _this.setData({
          quanxian_update:'是',
          this_quanxian:list,
        })
      }else if(_this.data.index==3){
        list.yinzhangguanli_upd = '是'
        _this.setData({
          quanxian_update:'是',
          this_quanxian:list,
        })
      }
      // else if(_this.data.index==4){
      //   list.pzhz_update = '是'
      //   _this.setData({
      //     quanxian_update:'是',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==9){
      //   list.jjtz_update = '是'
      //   _this.setData({
      //     quanxian_update:'是',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==10){
      //   list.jjzz_update = '是'
      //   _this.setData({
      //     quanxian_update:'是',
      //     this_quanxian:list,
      //   })
      // }
    }else{
      if(_this.data.index==0){
        list.gerenzhongxin_upd = '否'
        _this.setData({
          quanxian_update:'否',
          this_quanxian:list,
        })
      }else if(_this.data.index==1){
        list.hetongguanli_upd = '否'
        _this.setData({
          quanxian_update:'否',
          this_quanxian:list,
        })
      }else if(_this.data.index==2){
        list.zhanghuzhongxin_upd = '否'
        _this.setData({
          quanxian_update:'否',
          this_quanxian:list,
        })
      }else if(_this.data.index==3){
        list.yinzhangguanli_upd = '否'
        _this.setData({
          quanxian_update:'否',
          this_quanxian:list,
        })
      }
      // else if(_this.data.index==4){
      //   list.pzhz_update = '否'
      //   _this.setData({
      //     quanxian_update:'否',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==9){
      //   list.jjtz_update = '否'
      //   _this.setData({
      //     quanxian_update:'否',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==10){
      //   list.jjzz_update = '否'
      //   _this.setData({
      //     quanxian_update:'否',
      //     this_quanxian:list,
      //   })
      // }
    }
  },
  switch4Change: function (e) {
    var _this = this
    var list = _this.data.this_quanxian
    console.log(e.detail.value)
    if (e.detail.value == true) {
      if(_this.data.index==0){
        list.gerenzhongxin_sel = '是'
        _this.setData({
          quanxian_select:'是',
          this_quanxian:list,
        })
      }else if(_this.data.index==1){
        list.hetongguanli_sel = '是'
        _this.setData({
          quanxian_select:'是',
          this_quanxian:list,
        })
      }else if(_this.data.index==2){
        list.zhanghuzhongxin_sel = '是'
        _this.setData({
          quanxian_select:'是',
          this_quanxian:list,
        })
      }else if(_this.data.index==3){
        list.yinzhangguanli_sel = '是'
        _this.setData({
          quanxian_select:'是',
          this_quanxian:list,
        })
      }
      // else if(_this.data.index==4){
      //   list.pzhz_select = '是'
      //   _this.setData({
      //     quanxian_select:'是',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==5){
      //   list.znkb_select = '是'
      //   _this.setData({
      //     quanxian_select:'是',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==6){
      //   list.xjll_select = '是'
      //   _this.setData({
      //     quanxian_select:'是',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==7){
      //   list.zcfz_select = '是'
      //   _this.setData({
      //     quanxian_select:'是',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==8){
      //   list.lysy_select = '是'
      //   _this.setData({
      //     quanxian_select:'是',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==9){
      //   list.jjtz_select = '是'
      //   _this.setData({
      //     quanxian_select:'是',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==10){
      //   list.jjzz_select = '是'
      //   _this.setData({
      //     quanxian_select:'是',
      //     this_quanxian:list,
      //   })
      // }
    }else{
      if(_this.data.index==0){
        list.gerenzhongxin_sel = '否'
        _this.setData({
          quanxian_select:'否',
          this_quanxian:list,
        })
      }else if(_this.data.index==1){
        list.hetongguanli_sel = '否'
        _this.setData({
          quanxian_select:'否',
          this_quanxian:list,
        })
      }else if(_this.data.index==2){
        list.zhanghuzhongxin_sel = '否'
        _this.setData({
          quanxian_select:'否',
          this_quanxian:list,
        })
      }else if(_this.data.index==3){
        list.yinzhangguanli_sel = '否'
        _this.setData({
          quanxian_select:'否',
          this_quanxian:list,
        })
      }
      // else if(_this.data.index==4){
      //   list.pzhz_select = '否'
      //   _this.setData({
      //     quanxian_select:'否',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==5){
      //   list.znkb_select = '否'
      //   _this.setData({
      //     quanxian_select:'否',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==6){
      //   list.xjll_select = '否'
      //   _this.setData({
      //     quanxian_select:'否',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==7){
      //   list.zcfz_select = '否'
      //   _this.setData({
      //     quanxian_select:'否',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==8){
      //   list.lysy_select = '否'
      //   _this.setData({
      //     quanxian_select:'否',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==9){
      //   list.jjtz_select = '否'
      //   _this.setData({
      //     quanxian_select:'否',
      //     this_quanxian:list,
      //   })
      // }else if(_this.data.index==10){
      //   list.jjzz_select = '否'
      //   _this.setData({
      //     quanxian_select:'否',
      //     this_quanxian:list,
      //   })
      // }
    }
        
  },

  qxsave:function(){

    var _this = this
    var list = _this.data.this_quanxian
    var sql = "update contract_personnel_power set gerenzhongxin_sel ='" + (list.gerenzhongxin_sel == null ? "否" : list.gerenzhongxin_sel)  + "',gerenzhongxin_upd ='" + (list.gerenzhongxin_upd == null ? "否" :list.gerenzhongxin_upd) + "',hetongguanli_sel ='" + (list.hetongguanli_sel == null ? "否" : list.hetongguanli_sel) + "',hetongguanli_del = '" + (list.hetongguanli_del == null ? "否" : list.hetongguanli_del) + "',hetongguanli_upd ='" + (list.hetongguanli_upd == null ? "否" : list.hetongguanli_upd) + "',hetongguanli_add ='" + (list.hetongguanli_add == null ? "否" : list.hetongguanli_add) + "',zhanghuzhongxin_sel ='" + (list.zhanghuzhongxin_sel == null ? "否" : list.zhanghuzhongxin_sel) + "',zhanghuzhongxin_del ='" + (list.zhanghuzhongxin_del == null ? "否" : list.zhanghuzhongxin_del) + "',zhanghuzhongxin_upd ='" + (list.zhanghuzhongxin_upd == null ? "否" : list.zhanghuzhongxin_upd) + "',zhanghuzhongxin_add ='" + (list.zhanghuzhongxin_add == null ? "否" : list.zhanghuzhongxin_add) + "',yinzhangguanli_sel ='" + (list.yinzhangguanli_sel == null ? "否" : list.yinzhangguanli_sel) + "',yinzhangguanli_del ='" + (list.yinzhangguanli_del == null ? "否" : list.yinzhangguanli_del) + "',yinzhangguanli_upd ='" + (list.yinzhangguanli_upd == null ? "否" : list.yinzhangguanli_upd) + "',yinzhangguanli_add ='" + (list.yinzhangguanli_add == null ? "否" : list.yinzhangguanli_add) + "' where personnel_id ='" + _this.data.id + "';"

    console.log(sql)

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '修改成功',
          icon: "none",
          duration: 1000
        })
        _this.setData({
          qx: true,
        })
      },
      err: res => {
        console.log("错误!")
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