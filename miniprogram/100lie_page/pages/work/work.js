// 100lie_page/pages/work/work.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    name:'',
    date1: '',
    date2: '',
    index:'',
    input_name:'',
    column:'',
    idx:'',
    scrollTop: 0 ,
    text:"当前为及时同步更新数据",
    open:true,
    select:true,
    mask:true,
    input:true,
    mask_up:true,
    names:[],
    colmun:[],
    title:[],
    titil:[
      {text:'A'}, {text:'B'}, {text:'C'}, {text:'D'}, {text:'E'},
      {text:'F'}, {text:'G'}, {text:'H'}, {text:'I'}, {text:'J'}, {text:'K'}, {text:'L'},
      {text:'M'}, {text:'N'}, {text:'O'}, {text:'P'}, {text:'Q'}, {text:'R'}, {text:'S'},
      {text:'T'}, {text:'U'}, {text:'V'}, {text:'W'}, {text:'X'}, {text:'Y'}, {text:'Z'},
      {text:'AA'}, {text:'AB'}, {text:'AC'}, {text:'AD'}, {text:'AE'}, {text:'AF'}, {text:'AG'},
      {text:'AH'}, {text:'AI'}, {text:'AJ'}, {text:'AK'}, {text:'AL'}, {text:'AM'}, {text:'AN'},
      {text:'AO'}, {text:'AP'}, {text:'AQ'}, {text:'AR'}, {text:'ASS'}, {text:'AT'}, {text:'AU'},
      {text:'AV'}, {text:'AW'}, {text:'AX'}, {text:'AY'}, {text:'AZ'},
      {text:'BA'}, {text:'BB'}, {text:'BC'}, {text:'BD'}, {text:'BE'}, {text:'BF'}, {text:'BG'},
      {text:'BH'}, {text:'BI'}, {text:'BJ'}, {text:'BK'}, {text:'BL'}, {text:'BM'}, {text:'BN'},
      {text:'BO'}, {text:'BP'}, {text:'BQ'}, {text:'BR'}, {text:'BS'}, {text:'BT'}, {text:'BU'},
      {text:'BV'}, {text:'BW'}, {text:'BX'}, {text:'BYY'}, {text:'BZ'},
      {text:'CA'}, {text:'CB'}, {text:'CC'}, {text:'CD'}, {text:'CE'}, {text:'CF'}, {text:'CG'},
      {text:'CH'}, {text:'CI'}, {text:'CJ'}, {text:'CK'}, {text:'CL'}, {text:'CM'}, {text:'CN'},
      {text:'CO'}, {text:'CP'}, {text:'CQ'}, {text:'CR'}, {text:'CS'}, {text:'CT'}, {text:'CU'},
      {text:'CV'},  {text:'id'},{text:'公司'}
    ],
    list:[],
    users:[],
    insertList :[],
    ids:[],
    lie:'',
    info:'',     
    
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
   
    if(options!=undefined){
      that.setData({
        gongsi:options.gongsi,
        name:options.name,
      })
    }
    
    var sql = " select C from baitaoquanxian_renyun WHERE B = '" + that.data.gongsi + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){
        var name = res.result.recordset
        var names = []
        for(var i=0 ;i<name.length;i++){
           names.push(name[i].C)
        }
        that.setData({
           names
        })
      }
    })
    var ssql = "select * from baitaoquanxian where 公司 = '" + that.data.gongsi + "' "
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : ssql
      },
        success(res){
          var list = res.result.recordset      
          that.setData({
            list
         })
        }
      })  
  },
  // 开始日期
  strDateChange:function(e){
    this.setData({
      date1:e.detail.value
    })
  },
  // 结束日期
  endDateChange:function(e){
    this.setData({
      date2:e.detail.value
    })
  },
  // 人员
  renChange : function(e){
    var _this =this;
    _this.setData({
      index : e.detail.value
    })
  },
  // 日期图层
  hid_view:function() {
    var that=this
    that.setData({
      select:true,
      mask:true, 
    })
  },
 // 插入图层
  hid_up:function(){
    var that=this
    that.setData({
      input:true,
      mask_up:true, 
    })
  },
  //取消
  up_view:function(){
    var that=this
    that.setData({
      input:true,
      mask_up:true,  
    })
  },
  // 日期查询按钮
  dateclick:function(e){
    var that=this
    var index = that.data.index
    // if(that.data.names[index]=="管理员"){
    //  return;
    // }
   if(that.data.date1.length==0 || that.data.date2.length==0 || that.data.names[index]==""){
     return;
   }
   that.setData({
    select:false,
    mask:false,
   })
    var sql = "select * from baitaoquanxian where 公司 = '" + that.data.gongsi + "' and 人员 = '" + that.data.names[index] + "' and 日期  >='" + that.data.date1 + "'and 日期<= '" + that.data.date2 + "'"
     wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
        success(res){
          console.log(res)
          var users =res.result.recordset
          that.setData({
          users
          })
        }
    })   
  },
  // 及时开关
  jishi:function(e){
    var that = this
    if(that.data.open){
      that.setData({
        text:"当前需手动同步更新数据"
      })
    }else{
      that.setData({
        text:"当前为及时同步更新数据"
      })
      // that.saves(e)
    }
    that.data.open=!that.data.open
  },
  //添加一行
  addhang:function(){
    var obj = new Object()
    var that = this
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    var sql =" insert into baitaoquanxian (日期,人员,公司) values ('" + currentdate + "','" + that.data.name+ "','" +that.data.gongsi + "') "
    // var sql = "insert into baitaoquanxian (人员) values('" + that.data.name + "') "
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success : res=> {
        that.onLoad();
      }
    })  
    var len = this.data.list.length 
    this.setData({
      scrollTop: 1000 * len  // 这里我们的单对话区域最高1000，取了最大值，应该有方法取到精确的
    });
  },
// 保存
  baocun:function(e){
    var that=this
    var obj = new Object()
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    var sql = ""
    var flag = true
    var list = that.data.list
    var idx =that.data.idx
    var ids = that.data.ids
    var insertList = that.data.insertList  
    for(var a = 0;a<ids.length;a++){
       sql+="update baitaoquanxian set "     
      for( var b = 0;b<insertList.length;b++){
        if(ids[a].id == insertList[b].id){
          sql+= insertList[b].column + "='" + insertList[b].val+ "',"
        }
      }
      sql = sql.substring(0,sql.length-1)
      sql+= ",日期 = '" + currentdate + "',人员 = '" + that.data.name+ "', 公司 = '" +that.data.gongsi + "'  where id = " + ids[a].id + ";"
    } 
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){
        if(that.data.insertList.length>0){
          wx.showToast({
            title: '保存成功',
          })
        }
        that.onLoad();
        that.setData({
          insertList:[],
          ids:[]
       })
      }
    })
  },
  // 点击事件
click:function(e){
  var that=this
  var idx = e.currentTarget.dataset.index
  var column = e.currentTarget.dataset.column 
  var clie = e.currentTarget.dataset.clie
  var lie = that.data.lie  
  var info = that.data.info
  var list=that.data.list
  //var color=that.data.color==''?'red':''
  
  that.setData({
    column,
     idx,
    // color
  })
  if(list[idx][column]==""){
    that.setData({
      info:''
    })
  }else if(list[idx][column]!=""){
    that.setData({
      info:list[idx][column]
    })
  }
  console.log("55"+info)
  var sqls= "select "+ clie +" from baitaoquanxian_copy1 WHERE quanxian = '" + that.data.gongsi + "' and B = '" + that.data.name + "' "
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query : sqls
    },
    success(res){
      console.log("res结果:"+res)
      if(res.result.recordset[0][clie]=="√"){      
      var csql = "select " + column + " from baitaoquanxian_copy2 where 公司 = '" + that.data.gongsi + "'"
     
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data:{
          query : csql
        },
        success(res){
          
          if(res.result.recordset[0][column]=="" || res.result.recordset[0][column]== that.data.name ){
            var sql = "update baitaoquanxian_copy2 set "+ column +"= '" + that.data.name + "' where id = 7 and 公司 = '"+ that.data.gongsi + "';update baitaoquanxian_copy2 set "+ column +"= '" + that.data.gongsi + "' where id = 8 and 公司 = '"+ that.data.gongsi + "';" 
            that.setData({
              input:false,
              mask_up:false,
              
            }) 
               if(lie!="" && lie!=column){
                 sql+="update baitaoquanxian_copy2 set "+ lie +"= '' where id = 7 and 公司 = '"+ that.data.gongsi + "';update baitaoquanxian_copy2 set "+ lie +"= '' where id = 8 and 公司 = '"+ that.data.gongsi + "'"
               }
              
            wx.cloud.callFunction({
              name: 'sqlServer_117',
              data:{
                query : sql
              },        
              success : res=> {
                that.setData({
                  lie:column
                })              
              }
            })
          }else if(res.result.recordset[0][column]!="" || res.result.recordset[0][column]!= that.data.name ){
            that.setData({
              input:true,
              mask_up:true,  
           })
            wx.showToast({
              title: '该列有人使用，请使用其他列',
              icon:"none"
            })     
            return;
          }
        }            
      })
      }else{
        wx.showToast({
          title: '你没有该列权限',
          icon:"none"
        })
      }
    }
  }) 
},
// 把手动保存的结果记录起来
setList : function(e){
  var that = this
  var colume = that.data.column
  var val = e.detail.value.input_name
  var idx = that.data.idx
  var list = that.data.list
  var id
  var ids = that.data.ids
  var insertList = that.data.insertList
 // var color=that.data.color==''?'red':''
  if(ids.length==0){
    ids.push({ id:list[idx].id })
  }else{
    let num = 0
    for(let i=0;i<ids.length;i++){
      if(list[idx].id==ids[i])
        num++
        break;
    }
    if(num==0){
      ids.push({ id:list[idx].id })
    }
  }
  insertList.push({
    column : colume,
    idx :idx,
    val :val,
    id:list[idx].id 
  })

  that.setData({
    ["list["+idx+"]."+colume+""] : val,
     //["list["+idx+"]."+colume+"ss.color"]:"#00dbf5",
    insertList,
    ids,
   // color
  })
},
// 提交
saves:function(e){ 
  var that = this
  var open = that.data.open;
  var obj = new Object()
  if(!open){
    that.setList(e)
    that.setData({
      input:true,
      mask_up:true,
    })
    return
  }
  var list = that.data.list
  var idx =that.data.idx
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  that.setData({
    input_name:e.detail.value.input_name,
  })
  if(that.data.input_name == ""){
    wx.showToast({
      title: '请输入',
    }) 
    return;
  }
  var sql
  var flag = true
  for(var j=0;j<list.length;j++){
    console.log(list[j].id,j)
    if(list[j].id!=undefined && list[idx].id == list[j].id){
      sql =" update baitaoquanxian set "+ that.data.column +" = '" +that.data.input_name + "',日期 = '" + currentdate + "',人员 = '" + that.data.name+ "', 公司 = '" +that.data.gongsi + "'  where id='"+list[idx].id + "'"
      flag=false   
    }
  }  
  if(flag){
    sql =" insert into baitaoquanxian ("+ that.data.column +",日期,人员,公司) values ('" +that.data.input_name + "','" + currentdate + "','" + that.data.name+ "','" +that.data.gongsi + "') "
  }  
   wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query : sql
    },
    success(res){
      if(that.data.input_name!=""){
        wx.showToast({
          title: '已保存',
        }) 
      } 
      that.onLoad();
      that.setData({
        insertList:[],
        input:true,
        mask_up:true,  
     })
    }
   })  
},
//关闭页面
onUnload() {
  var that=this
  var lie = that.data.lie
  var sql = "update baitaoquanxian_copy2 set "+ lie +"= '' where id = 7 and 公司 = '"+ that.data.gongsi + "';update baitaoquanxian_copy2 set "+ lie +"= '' where id = 8 and 公司 = '"+ that.data.gongsi + "' " 
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data:{
      query : sql
    },
  })
},
//显示加载
onReady: function () {
  wx.showLoading({
    title: '加载中',
    mask : 'true'
  }) 
  setTimeout(function () {
    wx.hideLoading()
  }, 3000)
},

})