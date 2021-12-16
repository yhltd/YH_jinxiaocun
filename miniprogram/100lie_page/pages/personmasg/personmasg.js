// 100lie_page/pages/personmasg/personmasg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    input_hid:true,
    mask_hid:true,
    input_det:true,
    mask_det:true,
    sel_hid:true,
    name: "",
    num: "",
    pwd: "",
    detname:'',
    titil:[
      {text:'公司'},
      {text:'姓名'},
      {text:'账号'},
      {text:'密码'}
    ],
    list:[
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options!=undefined){
      that.setData({
        gongsi:options.gongsi
      })
    }   
    var sql="select  C, D, E from baitaoquanxian_renyun WHERE B = '" + that.data.gongsi + "' "
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){
        var list=res.result.recordset
        // console.log(ii);
        // for(var i=1;i<ii;i++){
        //   var colmun=list[i].colmun
        //   var val=res.result.recordset[0][colmun]
        //   list[i].val=val
        // }
        that.setData({
          list
        })
       
      }


    })

  },
  //添加
  add:function() {
    var that=this
    that.setData({
      input_hid:false,
      mask_hid:false,

    })
},
hid_view:function() {
  var that=this
  that.setData({
    input_hid:true,
    mask_hid:true,
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
  })
  if(that.data.name.length==0||that.data.pwd.length==0||that.data.num.length==0){
    wx.showToast({
      title: '名字密码账号不能为空',
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
  var sql="insert into  baitaoquanxian_renyun (B,C, D, E) values ('" + that.data.gongsi + "','"+that.data.name+ "','"+that.data.num+"','"+that.data.pwd+"');insert into  baitaoquanxian_copy1 (quanxian,B) values('" + that.data.gongsi + "','"+that.data.name+"')"
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
         that.onLoad()        
      }
    })   
  that.setData({
    input_hid:true,
    mask_hid:true,
  })
  that.onLoad ()
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
saves:function(e){
  var that=this
  that.setData({
    detname:e.detail.value.input_detname
  })
var sql="DELETE FROM baitaoquanxian_renyun WHERE C = '" +that.data.detname + "' AND B = '" + that.data.gongsi + "';DELETE FROM baitaoquanxian_copy1 WHERE quanxian = '"+ that.data.gongsi +"' and B = '" +that.data.detname + "' "
wx.cloud.callFunction({
  name: 'sqlServer_117',
  data:{
    query : sql
  },
 success(res){
    for( var i =0; i<that.data.list.length;i++){
      if(that.data.detname==that.data.list[i].C ){
        wx.showToast({
          title: '删除成功',
          icon:'success'
        })
      }
    }
    that.onLoad()   
 }
})
that.setData({
  input_det:true,
    mask_det:true,
})
},
//显示加载
// onShow: function () {
//   wx.showLoading({
//     title: '加载中',
//     mask : 'true'
//   }) 
//   setTimeout(function () {
//     wx.hideLoading()
//   }, 1000)
  

// },
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
  var name = e.detail.value.input_detname
  var sql="select  C, D, E from baitaoquanxian_renyun WHERE B = '" + _this.data.gongsi + "' and c like '%" + name + "%'"
  console.log(sql)
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query : sql
    },
    success(res){
      var list=res.result.recordset
      // console.log(ii);
      // for(var i=1;i<ii;i++){
      //   var colmun=list[i].colmun
      //   var val=res.result.recordset[0][colmun]
      //   list[i].val=val
      // }
      _this.setData({
        list
      })
      _this.hid_sel()
    }
  })

},

ref:function(){
  var _this = this
  _this.onLoad()
}





})