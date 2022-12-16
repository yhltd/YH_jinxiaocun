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
      {text:'姓名'},
      {text:'账号'},
      {text:'密码'},
      {text:'账号状态'},
      {text:'部门'},
      {text:'邮箱'},
      {text:'电话号'},
      {text:'员工编号'},
      
    ],
    list:[],
    zhuangtai_list:['正常','锁定'],
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
    var sql="select ins,del,upd,sel from baitaoquanxian_department where company = '" + _this.data.userInfo.B + "' and department_name ='" + _this.data.userInfo.bumen + "' and view_name='人员管理'"
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
          _this.tableShow()
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
  //添加
  add:function(){
    var that=this
    that.setData({
      input_hid:false,
      mask_hid:false,
      name:"",
      num:"",
      pwd:"",
      zhuangtai:"",
      bumen:"",
      email:"",
      phone:"",
      bianhao:"",
      id:"",
    })
},



bindPickerChange1: function(e) {
  var _this = this
  _this.setData({
    zhuangtai: _this.data.zhuangtai_list[e.detail.value]
  })
},

tableShow: function(){
  var _this = this
  var that = this
  if(_this.data.cha != '是'){
    wx.showToast({
      title: '无查询权限',
      icon:"none"
    })
    return;
  }
  var sql="select id,isnull(B,'') as B,isnull(C,'') as C,isnull(D,'') as D,isnull(E,'') as E,isnull(zhuangtai,'') as zhuangtai,isnull(email,'') as email,isnull(phone,'') as phone,isnull(bianhao,'') as bianhao,isnull(bumen,'') as bumen,isnull(renyuan_id,'') as renyuan_id from baitaoquanxian_renyun WHERE B = '" + that.data.gongsi + "' "
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
},

bindPickerChange2: function(e) {
  var _this = this
  _this.setData({
    bumen: _this.data.department_list[e.detail.value]
  })
},

  //修改
  update:function(e){
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

  _this.setData({
    upd_hid:false,
    mask_hid:false,
    name:list[index].C,
    num:list[index].D,
    pwd:list[index].E,
    zhuangtai:list[index].zhuangtai,
    bumen:list[index].bumen,
    email:list[index].email,
    phone:list[index].phone,
    bianhao:list[index].bianhao,
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
    name:e.detail.value.input_name,
    num: e.detail.value.input_num,
    pwd: e.detail.value.input_pwd,
    zhuangtai:e.detail.value.input_zhuangtai,
    bumen:e.detail.value.input_bumen,
    email:e.detail.value.input_email,
    phone:e.detail.value.input_phone,
    bianhao:e.detail.value.input_bianhao,
  })
  if(that.data.name.length==0||that.data.pwd.length==0||that.data.num.length==0||that.data.zhuangtai.length==0||that.data.bumen.length==0){
    wx.showToast({
      title: '前五项不能为空',
      icon:"none"
    })
    return;
  }
for( var i =0; i<list.length;i++){
if(that.data.name==list[i].C){
  wx.showToast({
    title: '该用户已存在',
    icon:"none"
  })
  return;
}
}
  var this_time = getCurrentTime();

  var sql="insert into baitaoquanxian_renyun (B,C,D,E,zhuangtai,bumen,email,phone,bianhao,renyuan_id) values ('" + that.data.gongsi + "','"+that.data.name+ "','"+that.data.num+"','"+that.data.pwd+"','"+that.data.zhuangtai+"','"+that.data.bumen+"','"+that.data.email+"','"+that.data.phone+"','"+that.data.bianhao+"','"+this_time+"');insert into  baitaoquanxian_copy1 (quanxian,B,renyuan_id) values('" + that.data.gongsi + "','"+that.data.name+"','"+this_time+"')"
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
    name:e.detail.value.input_name,
    num: e.detail.value.input_num,
    pwd: e.detail.value.input_pwd,
    zhuangtai:e.detail.value.input_zhuangtai,
    bumen:e.detail.value.input_bumen,
    email:e.detail.value.input_email,
    phone:e.detail.value.input_phone,
    bianhao:e.detail.value.input_bianhao,
  })
  if(that.data.name.length==0||that.data.pwd.length==0||that.data.num.length==0||that.data.zhuangtai.length==0||that.data.bumen.length==0){
    wx.showToast({
      title: '前五项不能为空',
      icon:"none"
    })
    return;
  }
for( var i =0; i<list.length;i++){
  if(that.data.name==list[i].C && that.data.id != list[i].id){
    wx.showToast({
      title: '该姓名已存在',
      icon:"none"
    })
    return;
  }
}
  var sql="update baitaoquanxian_renyun set C='" + that.data.name + "',D='"+that.data.num+"',E='"+that.data.pwd+"',zhuangtai='"+that.data.zhuangtai+"',bumen='"+that.data.bumen+"',email='"+that.data.email+"',phone='"+that.data.phone+"',bianhao='"+that.data.bianhao+"' where id="+that.data.id
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

  if(list[index].renyuan_id != '' && list[index].renyuan_id != undefined){
    wx.showModal({
      title: '提示',
      content: '是否删除此条账号？',
      success: function(res) {
        if (res.confirm) {
          var sql="DELETE FROM baitaoquanxian_renyun WHERE renyuan_id = '" +list[index].renyuan_id + "';DELETE FROM baitaoquanxian_copy1 WHERE renyuan_id = '"+ list[index].renyuan_id + "'"
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
    sel_hid:false,
    name:"",
    num:"",
    pwd:"",
    zhuangtai:"",
    bumen:"",
    email:"",
    phone:"",
    bianhao:"",
    id:"",
  })
},
sel:function(e){
  var _this = this
  var name = e.detail.value.input_detname
  var sql="select id,isnull(B,'') as B,isnull(C,'') as C,isnull(D,'') as D,isnull(E,'') as E,isnull(zhuangtai,'') as zhuangtai,isnull(email,'') as email,isnull(phone,'') as phone,isnull(bianhao,'') as bianhao,isnull(bumen,'') as bumen,isnull(renyuan_id,'') as renyuan_id from baitaoquanxian_renyun WHERE B = '" + _this.data.gongsi + "' and C like '%" + name + "%'"
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

function repair(i){
  if (i >= 0 && i <= 9) {
      return "0" + i;
  } else {
      return i;
  }
}

function getCurrentTime() {
  var date = new Date();//当前时间
  var year = date.getFullYear() //返回指定日期的年份
  var month = repair(date.getMonth() + 1);//月
  var day = repair(date.getDate());//日
  var hour = repair(date.getHours());//时
  var minute = repair(date.getMinutes());//分
  var second = repair(date.getSeconds());//秒
  
  //当前时间 
  var curTime = year + month + day + hour + minute + second;
  return curTime;
}