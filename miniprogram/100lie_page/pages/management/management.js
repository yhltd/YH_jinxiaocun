// 100lie_page/pages/personmasg/personmasg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    input_hid:true,
    upd_hid:true,
    mask_hid:true,
    input_det:true,
    mask_det:true,
    sel_hid:true,
    name: "",
    num: "",
    pwd: "",
    detname:'',
    titil:[
      {text:'部门名称',width:'200rpx'},
      {text:'页面名称',width:'300rpx'},
      {text:'增加',width:'100rpx'},
      {text:'删除',width:'100rpx'},
      {text:'修改',width:'100rpx'},
      {text:'查询',width:'100rpx'},
    ],
    list:[],
    view_list:['工作台','工作台权限设置','部门权限设置','公司数据分析','人员管理','人员权限设置','人员数据分析','工作台使用状态'],
    zhuangtai_list:['是','否'],
    zeng:'否',
    shan:'否',
    gai:'否',
    cha:'否',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    var that = this
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    if(options!=undefined){
      that.setData({
        gongsi:userInfo.B,
        userInfo:userInfo
      })
    }

    var sql="select ins,del,upd,sel from baitaoquanxian_department where company = '" + _this.data.userInfo.B + "' and department_name ='" + _this.data.userInfo.bumen + "' and view_name='部门权限设置'"
    var that =this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){     
        var quanxian = res.result.recordset
        if(quanxian == []){
          wx.showToast({
            title: '未读取到部门权限信息，请联系管理员',
            icon:"none"
          })
          return;
        }else{
          _this.setData({
            zeng:quanxian[0].ins,
            shan:quanxian[0].del,
            gai:quanxian[0].upd,
            cha:quanxian[0].sel,
          })

          if(_this.data.cha != '是'){
            wx.showToast({
              title: '无查询权限',
              icon:"none"
            })
            return;
          }

          var sql="select id,isnull(department_name,'') as department_name,isnull(view_name,'') as view_name,isnull(ins,'') as ins,isnull(del,'') as del,isnull(upd,'') as upd,isnull(sel,'') as sel from baitaoquanxian_department WHERE company = '" + that.data.gongsi + "' "
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data:{
              query : sql
            },
            success(res){
              var list=res.result.recordset
              that.setData({
                list
              })
            }
          })
      
          var sql="select department_name from baitaoquanxian_department WHERE company = '" + that.data.gongsi + "' group by department_name"
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data:{
              query : sql
            },
            success(res){
              var list=res.result.recordset
              var department_list = []
              for(var i=0; i<list.length; i++){
                if(list[i].department_name != '' &&list[i].department_name != undefined){
                  department_list.push(list[i].department_name)
                }
              }
              console.log(department_list)
              that.setData({
                department_list
              })
            }
          })

        }
      }
    })


  },

  tableShow:function(){
    var that = this
    var sql="select id,isnull(department_name,'') as department_name,isnull(view_name,'') as view_name,isnull(ins,'') as ins,isnull(del,'') as del,isnull(upd,'') as upd,isnull(sel,'') as sel from baitaoquanxian_department WHERE company = '" + that.data.gongsi + "' "
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){
        var list=res.result.recordset
        that.setData({
          list
        })
      }
    })

    var sql="select department_name from baitaoquanxian_department WHERE company = '" + that.data.gongsi + "' group by department_name"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){
        var list=res.result.recordset
        var department_list = []
        for(var i=0; i<list.length; i++){
          if(list[i].department_name != '' &&list[i].department_name != undefined){
            department_list.push(list[i].department_name)
          }
        }
        console.log(department_list)
        that.setData({
          department_list
        })
      }
    })

  },
  //添加
  add:function(){
    var that=this
    that.setData({
      input_hid:false,
      mask_hid:false,
    })
},

bindPickerChange1: function(e) {
  var _this = this
  _this.setData({
    ins: _this.data.zhuangtai_list[e.detail.value]
  })
},

bindPickerChange2: function(e) {
  var _this = this
  _this.setData({
    del: _this.data.zhuangtai_list[e.detail.value]
  })
},

bindPickerChange3: function(e) {
  var _this = this
  _this.setData({
    upd: _this.data.zhuangtai_list[e.detail.value]
  })
},

bindPickerChange4: function(e) {
  var _this = this
  _this.setData({
    sel: _this.data.zhuangtai_list[e.detail.value]
  })
},

bindPickerChange5: function(e) {
  var _this = this
  _this.setData({
    view_name: _this.data.view_list[e.detail.value]
  })
},

bindPickerChange6: function(e) {
  var _this = this
  _this.setData({
    department_name: _this.data.department_list[e.detail.value]
  })
},


  //修改
  update:function(e){
  var _this = this
  var list = _this.data.list
  var index= e.currentTarget.dataset.index

  if(_this.data.gai != '是'){
    wx.showToast({
      title: '无修改权限',
      icon:"none"
    })
    return;
  }

  _this.setData({
    upd_hid:false,
    mask_hid:false,
    department_name:list[index].department_name,
    view_name:list[index].view_name,
    ins:list[index].ins,
    del:list[index].del,
    upd:list[index].upd,
    sel:list[index].sel,
    id:list[index].id,
  })
},
hid_view:function(){
  var that=this
  that.setData({
    input_hid:true,
    mask_hid:true,
    upd_hid:true,
  })
},
hid_det:function() {
  var that=this
  that.setData({
    input_det:true,
    mask_det:true,
  })
},
save:function(e){
  var that=this
  var list=that.data.list
  that.setData({
    department_name:e.detail.value.input_department_name,
    view_name: e.detail.value.input_view_name,
    ins: e.detail.value.input_ins,
    del:e.detail.value.input_del,
    upd:e.detail.value.input_upd,
    sel:e.detail.value.input_sel,
  })
  if(that.data.department_name.length==0||that.data.view_name.length==0||that.data.ins.length==0||that.data.del.length==0||that.data.upd.length==0||that.data.sel.length==0){
    wx.showToast({
      title: '所有文本框不能为空',
      icon:"none"
    })
    return;
  }
  for( var i =0; i<list.length;i++){
    if(that.data.department_name==list[i].department_name && that.data.view_name==list[i].view_name){
      wx.showToast({
        title: '已有此部门对应的页面权限，无需重复添加',
        icon:"none"
      })
      return;
    }
  }

  var sql="insert into baitaoquanxian_department(department_name,view_name,ins,del,upd,sel) values ('" + that.data.department_name + "','"+that.data.view_name+ "','"+that.data.ins+"','"+that.data.del+"','"+that.data.upd+"','"+that.data.sel+"')"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){       
          wx.showToast({
            title: '添加成功',
            icon:'success'
          })
         that.tableShow()    
      }
    })   
  that.setData({
    input_hid:true,
    mask_hid:true,
  })
  that.tableShow()
},

upd:function(e){
  var that=this
  var list=that.data.list
  that.setData({
    department_name:e.detail.value.input_department_name,
    view_name: e.detail.value.input_view_name,
    ins: e.detail.value.input_ins,
    del:e.detail.value.input_del,
    upd:e.detail.value.input_upd,
    sel:e.detail.value.input_sel,
  })
  if(that.data.department_name.length==0||that.data.view_name.length==0||that.data.ins.length==0||that.data.del.length==0||that.data.upd.length==0||that.data.sel.length==0){
    wx.showToast({
      title: '所有文本框不能为空',
      icon:"none"
    })
    return;
  }

  for( var i =0; i<list.length;i++){
    if(that.data.department_name==list[i].department_name && that.data.view_name==list[i].view_name && that.data.id != list[i].id){
      wx.showToast({
        title: '已有此部门对应的页面权限，无需重复添加',
        icon:"none"
      })
      return;
    }
  }
  var sql="update baitaoquanxian_department set department_name='" + that.data.department_name + "',view_name='"+that.data.view_name+"',ins='"+that.data.ins+"',del='"+that.data.del+"',upd='"+that.data.upd+"',sel='"+that.data.sel+"' where id="+that.data.id
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){       
          wx.showToast({
            title: '修改成功',
            icon:'success'
          })
         that.tableShow() 
      }
    })   
  that.setData({
    input_hid:true,
    mask_hid:true,
    upd_hid:true,
  })
  that.tableShow()
},

// 删除
det:function(){
  var that=this
  that.setData({
    input_det:false,
    mask_det:false,
  })
},
det_view:function() {
  var that=this
  that.setData({
    input_det:true,
    mask_det:true,

  })
},

delete:function(e){
  var _this = this
  var list = _this.data.list
  var index= e.currentTarget.dataset.index

  if(_this.data.shan != '是'){
    wx.showToast({
      title: '无删除权限',
      icon:"none"
    })
    return;
  }

  if(list[index].id != ''){
    wx.showModal({
      title: '提示',
      content: '是否删除此条信息？',
      success: function(res) {
        if (res.confirm) {
          var sql="DELETE FROM baitaoquanxian_department WHERE id = " +list[index].id 
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data:{
              query: sql
            },
            success(res){
              wx.showToast({
                title: '删除成功',
                icon:"none"
              })
              _this.tableShow()
            }
          })
        }
      }
    })
  }
},

onReady: function () {
  wx.showLoading({
    title: '加载中',
    mask : 'true'
  }) 
  setTimeout(function () {
    wx.hideLoading()
  }, 1000)
},
hid_sel:function(){
  var _this = this
  _this.setData({
    name : "",
    sel_hid:true
  })
},
sel_show:function(){
  var _this = this
  _this.setData({
    name : "",
    sel_hid:false
  })
},
  sel:function(e){
    var _this = this
    var department_name = e.detail.value.input_department_name
    var sql="select id,isnull(department_name,'') as department_name,isnull(view_name,'') as view_name,isnull(ins,'') as ins,isnull(del,'') as del,isnull(upd,'') as upd,isnull(sel,'') as sel from baitaoquanxian_department WHERE company = '" + that.data.gongsi + "' and department_name ='" + department_name + "'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){
        var list=res.result.recordset
        _this.setData({
          list
        })
        _this.hid_sel()
      }
    })

  },

  ref:function(){
    var _this = this
    _this.tableShow()
  }
})