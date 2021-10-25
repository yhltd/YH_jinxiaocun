const updSpace = require('../../util/updSpace')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titil : [
      {text:"序号",width:"100rpx",type:"number",columnName:"rownum"},
      {text:"账号",width:"300rpx",type:"text",columnName:"name"},
      {text:"密码",width:"300rpx",type:"text",columnName:"pwd"},
      {text:"操作密码",width:"300rpx",type:"text",columnName:"do"},
    ],
    array: ['科目总账', '开支项目', '部门设置','账号管理','凭证汇总','智能看板','现金流量','资产负债','利益损益','极简台账','极简总账'],
    index:0,
    list:{},
    userInfo:"",
    countPage : 50, //每一页显示的数据数据数量
    pageCount : 0, //总页数
    pageNum : 1, //当前页 
    hid_view : true,
    qx:true,

    quanxian_add:"",
    quanxian_update:"",
    quanxian_delete:"",
    quanxian_select:"",

    value_input : "",
    index_input : "",
    column_input : "",
    bianhao : "",
    an_id : "",
    this_quanxian:{},
    look:false,
    shan:"",
    gai:"",
    zeng:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var user = JSON.parse(options.userInfo)
    var bianhao = user.bianhao
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from quanxian where bianhao ='" + bianhao + "'"
      },
      success: res => {
        var list = res.result.recordset[0]
        console.log(list)
        var shan = true
        var gai = true
        var zeng = true
        if (list.zhgl_delete != "是"){
          shan = false
        }
        if (list.zhgl_update != "是"){
          gai = false
        }
        if (list.zhgl_add != "是"){
          zeng = false
        }
        _this.setData({
          shan:shan,
          gai:gai,
          zeng:zeng
        })
      },
      err: res => {
        console.log("错误!")
      },
      fail : res=>{
        wx.showToast({
          title: '请求失败！',
          icon : 'none'
        })
        console.log("请求失败！")
      }
    })
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
    })
  },

    //初始化页面
    init : function(where2){
      wx.showLoading({
        title : "加载中",
        mask : 'true'
      })
      var _this = this;
      _this.getPageCount();
  
      var pageNum = _this.data.pageNum;
      var countPage = _this.data.countPage;
  
      var where = "where a.rownum > "+(pageNum-1)*countPage+" and a.rownum <'"+(pageNum*countPage+1)+"'"
      if(where2!="" && where2!=undefined){
        where = ""
      }else{
        where2 = ""
      }
  
      var sql = "select a.id,a.rownum,a.name,a.pwd,a.do,a.bianhao from (select *,row_number() over(order by id) as rownum from Account where company = '"+_this.data.userInfo.company+"') as a "+where+where2

      wx.cloud.callFunction({
        name: 'sqlServer_cw',
        data: {
          query: sql
        },
        success: res => {
  
          var list = res.result.recordset
          _this.setData({
            list
          })
          wx.hideLoading({
  
          })
        },
        err: res => {
          console.log("错误!")
        }
      })
    },

    getPageCount : function(){
      var _this = this;
      wx.cloud.callFunction({
        name: 'sqlServer_cw',
        data: {
          query: "select count(id) as [count] from Account where company='"+_this.data.userInfo.company+"'"
        },
        success: res => {
  
  
          var list = res.result.recordset
          var countPage = _this.data.countPage;
          var pageCount = Math.ceil(list[0].count/countPage);
          _this.setData({
            pageCount
          })
        },
        err: res => {
          console.log("错误!")
        }
      })
    },

    switchpage : function(e){
      var _this = this;
      if(_this.data.isSelect){
        return
      }
      var index= e.currentTarget.dataset.index;
      var pageNum = _this.data.pageNum;
      var pageCount = _this.data.pageCount;
  
      if(index=="-1"){
        pageNum--;
        if(pageNum<1){
          wx.showToast({
            title: "已经是第一页",
            icon : "none"
          })
        }else{
          _this.setData({
            pageNum
          })
          _this.init();
        }
      }else{
        pageNum++;
        if(pageNum>pageCount){
          wx.showToast({
            title: "已经是最后一页",
            icon : "none"
          })
        }else{
          _this.setData({
            pageNum
          })
          _this.init();
        }
      }
    },

    show_updPageCount : function(){
      var _this =this;
      _this.showView(_this,"countPage")
    },

    save_countPage : function(e){
      var _this = this;
      var countPage = e.detail.value.countPage
      _this.setData({
        pageNum : 1,
        countPage
      })
      _this.hidView(_this,"countPage")
      _this.init()
    },

    hidView : function(_this,type){
      var animation = wx.createAnimation({
        duration : 300
      })
      _this.setData({
        hid_view : false
      })
  
      switch(type){
        case "input":
          animation.translateX(-400).step()
          _this.setData({
            animationData_input : animation.export(),
            value_input : "",
            index_input : "",
            column_input : ""
          })
          break;
        case "upd_code_input":
          animation.translateX(500).step()
          _this.setData({
            animationData_upd_code : animation.export()
          })
          break;
        case "select":
          animation.translateY(500).step()
          _this.setData({
            animationData_select_view : animation.export()
          })
          break;
        case "moreDo":
          animation.translateX(-300).step()
          _this.setData({
            animationData_moreDo_view : animation.export()
          })
          break;
        case "examine":
          animation.translateX(-400).step()
          _this.setData({
            animationData_examine : animation.export()
          })
          break;
        case "countPage":
          animation.translateX(-400).step()
          _this.setData({
            animationData_countPage : animation.export()
          })
          break;
      }
    },

    showView : function(_this,type){
      var animation = wx.createAnimation({
        duration : 300
      })
      _this.setData({
        initHidView : false,
        hid_view : true
      })
  
      switch(type){
        case "input":
          animation.translateX(0).step()
          _this.setData({
            animationData_input : animation.export()
          })
          break;
        case "upd_code_input":
          animation.translateX(0).step()
          _this.setData({
            animationData_upd_code : animation.export()
          })
          break;
        case "select":
          animation.translateY(0).step()
          _this.setData({
            animationData_select_view : animation.export()
          })
          break;
        case "moreDo":
          animation.translateX(0).step()
          _this.setData({
            animationData_moreDo_view : animation.export()
          })
          break;
        case "examine":
          animation.translateX(0).step()
          _this.setData({
            animationData_examine : animation.export()
          })
          break;
        case "countPage":
          animation.translateX(0).step()
          _this.setData({
            animationData_countPage : animation.export()
          })
          break;
      }
      
    },

    hid_view : function(){
      var _this = this;
      _this.hidView(_this,"countPage")
      _this.hidView(_this,"input")
      _this.hidView(_this,"upd_code_input")
      _this.hidView(_this,"select")
      _this.hidView(_this,"moreDo")
      _this.hidView(_this,"examine")
      _this.hidView(_this,"countPage")
    },

    clickView : function(e){
      var _this = this;
      if(_this.data.gai){
        var index = e.currentTarget.dataset.index;
        var upd_db_id = e.currentTarget.dataset.id
        var column = e.currentTarget.dataset.column;
        var value = e.currentTarget.dataset.value;
        var input_type = e.currentTarget.dataset.input_type;
        var money_type = e.currentTarget.dataset.money_type;
        _this.setData({
          value_input : value,
          index_input : index,
          column_input : column,
          upd_db_id,
          money_type
        })
    
        if(input_type=="date"){
          if(value!=""){
            var arr = value.split(" ");
            var arr1 = arr[0].split("-")
            var arr2 = arr[1].split(":")
            _this.setData({
              ["dateArray["+0+"].value"] : arr1[0],
              ["dateArray["+1+"].value"] : arr1[1],
              ["dateArray["+2+"].value"] : arr1[2],
              ["dateArray["+3+"].value"] : arr2[0],
              ["dateArray["+4+"].value"] : arr2[1],
              ["dateArray["+5+"].value"] : arr2[2]
            })
          }
          _this.setData({
            isDate : false,
            input_type: "date"
          })
        }else{
          _this.setData({
            isDate : true,
            input_type: "text"
          })
        }
        _this.showView(_this,"input");
      }else{
        wx.showToast({
          title: '无修改权限',
          icon: "none",
          duration: 1000
        })
      }

    },

    save: function(e){
      var _this = this;
  
      var new_value_input = ""
     
      var new_value_input = e.detail.value.new
      if(new_value_input==""){
        new_value_input = _this.data.value_input
      }
      var index = _this.data.index_input;
      var column = _this.data.column_input;
      var id = _this.data.upd_db_id
  
     
      _this.hidView(_this,"input")

      _this.setData({
        ["list["+index+"]."+column] : new_value_input,
        empty : ""
      })
      
      wx.cloud.callFunction({
        name : "sqlServer_cw",
        data : {
          query: "update Account set ["+column+"] = '"+new_value_input+"' where id = '"+id+"'"
        },
        success : res=>{
          wx.showToast({
            title: "修改成功",
            icon : "none"
          })
        },
        err : res =>{
          wx.showToast({
            title: "错误",
            icon : "none"
          })
        }
      })
    },

    delete: function(e){
      var _this = this;
      var list = _this.data.list
      var bianhao=""
      _this.hidView(_this,"moreDo")
      for (var i=0;i<list.length;i++){
        if (list[i].id == _this.data.an_id){
          bianhao = list[i].bianhao
          break;
        }
      }
      if(_this.data.shan){
        wx.showModal({
          title : '提示',
          content : '确定删除吗？',
          cancelColor: '#009688',
          confirmColor : '#DD5044',
          success : res => {
            if (res.confirm) {
              let id = _this.data.an_id
              wx.showLoading({
                title: '加载中',
                mask : 'true'
              })
              var sql = "delete from Account where id = '" + id + "';delete from quanxian where bianhao ='" + bianhao + "'"
              wx.cloud.callFunction({
                name : 'sqlServer_cw',
                data : {
                  query : sql
                },
                success : res =>{
                  wx.hideLoading({
                    success: (res)=>{
                      _this.init();
                    },
                    complete: (res) => {
                      wx.showToast({
                        title: '删除成功',
                        icon : 'success'
                      })
                      updSpace.del("VoucherSummary",1)
                    },
                  })
                },
                err : res =>{
                  console.log("错误："+res)
                },
                fail : res=>{
                  console.log("请求失败！"+res)
                }
              })
            }
          }
        })
      }else{
        wx.showToast({
          title: '无删除权限',
          icon: "none",
          duration: 1000
        })
      }
    },

    ryqx: function () {
      var _this = this;
      if(_this.data.sheetqx5.Upd=="1"){
      _this.setData({
        quanxian: false,
      })
    }else{
        wx.showToast({
          title: '无权限',
          icon: 'none',
        })
    }
    },

    insert : function(){
      var _this = this;
      if(_this.data.zeng){
        var this_date = new Date()
        var this_year = this_date.getFullYear()
        var this_month = this_date.getMonth() + 1
        if(this_month < 10){
          this_month = "0" + this_month 
        }
        var this_day = this_date.getDate()
        if(this_day < 10){
          this_day = "0" + this_day 
        }
        var this_hour = this_date.getHours()
        if(this_hour < 10){
          this_hour = "0" + this_hour 
        }
        var this_minute = this_date.getMinutes()
        var this_hour = this_date.getHours()
        if(this_minute < 10){
          this_minute = "0" + this_minute 
        }
        var this_second = this_date.getSeconds()
        if(this_second < 10){
          this_second = "0" + this_second 
        }
        var bianhao = this_year + this_month + this_day + this_hour + this_minute + this_second
        wx.cloud.callFunction({
          name : "sqlServer_cw",
          data : {
            query: "insert into Account(bianhao,company,name,pwd,do) values('" + bianhao + "','"+ _this.data.userInfo.company+ "','','','');insert into quanxian(bianhao,kmzz_add,kmzz_delete,kmzz_update,kmzz_select,kzxm_add,kzxm_delete,kzxm_update,kzxm_select,bmsz_add,bmsz_delete,bmsz_update,bmsz_select,pzhz_add,pzhz_delete,pzhz_update,pzhz_select,znkb_select,xjll_select,zcfz_select,lysy_select,jjtz_add,jjtz_delete,jjtz_update,jjtz_select,jjzz_add,jjzz_delete,jjzz_update,jjzz_select,zhgl_add,zhgl_delete,zhgl_update,zhgl_select) values('" + bianhao + "','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是','是');"
          },
          success : res=>{
            _this.init()
          },
          err : res =>{
            wx.showToast({
              title: "错误",
              icon : "none"
            })
          }
        })
      }else{
        wx.showToast({
          title: '无新增权限',
          icon: "none",
          duration: 1000
        })
      }

    },

    moreDo: function(e){
      var _this = this;
      console.log(e.currentTarget.dataset.id)
      _this.setData({
        an_id : e.currentTarget.dataset.id
      })
      _this.showView(_this,"moreDo")
    },

    quanxian: function () {
      var _this = this;
      if(_this.data.gai){
        console.log("select * from Account where id = " + _this.data.an_id )
        wx.cloud.callFunction({
          name: 'sqlServer_cw',
          data: {
            query: "select * from Account where id = " + _this.data.an_id 
          },
          success: res => {
            console.log(res)
            _this.setData({
              qx: false,
              bianhao:res.result.recordset[0].bianhao,
            })
            wx.cloud.callFunction({
              name: 'sqlServer_cw',
              data: {
                query: "select * from quanxian where bianhao = '" + _this.data.bianhao + "'"
              },
              success: res => {
                console.log(res)
                _this.setData({
                  qx: false,
                  index:0,
                  this_quanxian:res.result.recordset[0],
                  quanxian_add:res.result.recordset[0].kmzz_add,
                  quanxian_delete:res.result.recordset[0].kmzz_delete,
                  quanxian_update:res.result.recordset[0].kmzz_update,
                  quanxian_select:res.result.recordset[0].kmzz_select,
                })
              },
              err: res => {
                console.log("错误!")
              }
            })
          },
          err: res => {
            console.log("错误!")
          }
        })
        console.log(_this.data.this_quanxian)
      }else{
        wx.showToast({
          title: '无修改权限',
          icon: "none",
          duration: 1000
        })
      }
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
        if(_this.data.index==0){
          list.kmzz_add = '是'
          _this.setData({
            quanxian_add:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==1){
          list.kzxm_add = '是'
          _this.setData({
            quanxian_add:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==2){
          list.bmsz_add = '是'
          _this.setData({
            quanxian_add:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==3){
          list.zhgl_add = '是'
          _this.setData({
            quanxian_add:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==4){
          list.pzhz_add = '是'
          _this.setData({
            quanxian_add:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==9){
          list.jjtz_add = '是'
          _this.setData({
            quanxian_add:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==10){
          list.jjzz_add = '是'
          _this.setData({
            quanxian_add:'是',
            this_quanxian:list,
          })
        }
      }else{
        if(_this.data.index==0){
          list.kmzz_add = '否'
          _this.setData({
            quanxian_add:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==1){
          list.kzxm_add = '否'
          _this.setData({
            quanxian_add:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==2){
          list.bmsz_add = '否'
          _this.setData({
            quanxian_add:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==3){
          list.zhgl_add = '否'
          _this.setData({
            quanxian_add:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==4){
          list.pzhz_add = '否'
          _this.setData({
            quanxian_add:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==9){
          list.jjtz_add = '否'
          _this.setData({
            quanxian_add:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==10){
          list.jjzz_add = '否'
          _this.setData({
            quanxian_add:'否',
            this_quanxian:list,
          })
        }
      }
    },
    switch2Change: function (e) {
      var _this = this
      var list = _this.data.this_quanxian
      console.log(e.detail.value)
      if (e.detail.value == true) {
        if(_this.data.index==0){
          list.kmzz_delete = '是'
          _this.setData({
            quanxian_delete:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==1){
          list.kzxm_delete = '是'
          _this.setData({
            quanxian_delete:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==2){
          list.bmsz_delete = '是'
          _this.setData({
            quanxian_delete:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==3){
          list.zhgl_delete = '是'
          _this.setData({
            quanxian_delete:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==4){
          list.pzhz_delete = '是'
          _this.setData({
            quanxian_delete:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==9){
          list.jjtz_delete = '是'
          _this.setData({
            quanxian_delete:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==10){
          list.jjzz_delete = '是'
          _this.setData({
            quanxian_delete:'是',
            this_quanxian:list,
          })
        }
      }else{
        if(_this.data.index==0){
          list.kmzz_delete = '否'
          _this.setData({
            quanxian_delete:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==1){
          list.kzxm_delete = '否'
          _this.setData({
            quanxian_delete:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==2){
          list.bmsz_delete = '否'
          _this.setData({
            quanxian_delete:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==3){
          list.zhgl_delete = '否'
          _this.setData({
            quanxian_delete:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==4){
          list.pzhz_delete = '否'
          _this.setData({
            quanxian_delete:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==9){
          list.jjtz_delete = '否'
          _this.setData({
            quanxian_delete:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==10){
          list.jjzz_delete = '否'
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
          list.kmzz_update = '是'
          _this.setData({
            quanxian_update:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==1){
          list.kzxm_update = '是'
          _this.setData({
            quanxian_update:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==2){
          list.bmsz_update = '是'
          _this.setData({
            quanxian_update:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==3){
          list.zhgl_update = '是'
          _this.setData({
            quanxian_update:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==4){
          list.pzhz_update = '是'
          _this.setData({
            quanxian_update:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==9){
          list.jjtz_update = '是'
          _this.setData({
            quanxian_update:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==10){
          list.jjzz_update = '是'
          _this.setData({
            quanxian_update:'是',
            this_quanxian:list,
          })
        }
      }else{
        if(_this.data.index==0){
          list.kmzz_update = '否'
          _this.setData({
            quanxian_update:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==1){
          list.kzxm_update = '否'
          _this.setData({
            quanxian_update:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==2){
          list.bmsz_update = '否'
          _this.setData({
            quanxian_update:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==3){
          list.zhgl_update = '否'
          _this.setData({
            quanxian_update:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==4){
          list.pzhz_update = '否'
          _this.setData({
            quanxian_update:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==9){
          list.jjtz_update = '否'
          _this.setData({
            quanxian_update:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==10){
          list.jjzz_update = '否'
          _this.setData({
            quanxian_update:'否',
            this_quanxian:list,
          })
        }
      }
    },
    switch4Change: function (e) {
      var _this = this
      var list = _this.data.this_quanxian
      console.log(e.detail.value)
      if (e.detail.value == true) {
        if(_this.data.index==0){
          list.kmzz_select = '是'
          _this.setData({
            quanxian_select:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==1){
          list.kzxm_select = '是'
          _this.setData({
            quanxian_select:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==2){
          list.bmsz_select = '是'
          _this.setData({
            quanxian_select:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==3){
          list.zhgl_select = '是'
          _this.setData({
            quanxian_select:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==4){
          list.pzhz_select = '是'
          _this.setData({
            quanxian_select:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==5){
          list.znkb_select = '是'
          _this.setData({
            quanxian_select:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==6){
          list.xjll_select = '是'
          _this.setData({
            quanxian_select:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==7){
          list.zcfz_select = '是'
          _this.setData({
            quanxian_select:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==8){
          list.lysy_select = '是'
          _this.setData({
            quanxian_select:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==9){
          list.jjtz_select = '是'
          _this.setData({
            quanxian_select:'是',
            this_quanxian:list,
          })
        }else if(_this.data.index==10){
          list.jjzz_select = '是'
          _this.setData({
            quanxian_select:'是',
            this_quanxian:list,
          })
        }
      }else{
        if(_this.data.index==0){
          list.kmzz_select = '否'
          _this.setData({
            quanxian_select:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==1){
          list.kzxm_select = '否'
          _this.setData({
            quanxian_select:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==2){
          list.bmsz_select = '否'
          _this.setData({
            quanxian_select:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==3){
          list.zhgl_select = '否'
          _this.setData({
            quanxian_select:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==4){
          list.pzhz_select = '否'
          _this.setData({
            quanxian_select:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==5){
          list.znkb_select = '否'
          _this.setData({
            quanxian_select:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==6){
          list.xjll_select = '否'
          _this.setData({
            quanxian_select:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==7){
          list.zcfz_select = '否'
          _this.setData({
            quanxian_select:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==8){
          list.lysy_select = '否'
          _this.setData({
            quanxian_select:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==9){
          list.jjtz_select = '否'
          _this.setData({
            quanxian_select:'否',
            this_quanxian:list,
          })
        }else if(_this.data.index==10){
          list.jjzz_select = '否'
          _this.setData({
            quanxian_select:'否',
            this_quanxian:list,
          })
        }
      }
          
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
        zeng = list.kmzz_add
        shan = list.kmzz_delete
        gai = list.kmzz_update
        cha = list.kmzz_select
        look = false
      }else if(e.detail.value==1){
        zeng = list.kzxm_add
        shan = list.kzxm_delete
        gai = list.kzxm_update
        cha = list.kzxm_select
        look = false
      }else if(e.detail.value==2){
        zeng = list.bmsz_add
        shan = list.bmsz_delete
        gai = list.bmsz_update
        cha = list.bmsz_select
        look = false
      }else if(e.detail.value==3){
        zeng = list.zhgl_add
        shan = list.zhgl_delete
        gai = list.zhgl_update
        cha = list.zhgl_select
        look = false
      }else if(e.detail.value==4){
        zeng = list.pzhz_add
        shan = list.pzhz_delete
        gai = list.pzhz_update
        cha = list.pzhz_select
        look = false
      }else if(e.detail.value==5){
        cha = list.znkb_select
        look = true
      }else if(e.detail.value==6){
        cha = list.xjll_select
        look = true
      }else if(e.detail.value==7){
        cha = list.zcfz_select
        look = true
      }else if(e.detail.value==8){
        cha = list.lysy_select
        look = true
      }else if(e.detail.value==9){
        zeng = list.jjtz_add
        shan = list.jjtz_delete
        gai = list.jjtz_update
        cha = list.jjtz_select
        look = false
      }else if(e.detail.value==10){
        zeng = list.jjzz_add
        shan = list.jjzz_delete
        gai = list.jjzz_update
        cha = list.jjzz_select
        look = false
      }
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
    qxsave:function(){

      var _this = this
      var list = _this.data.this_quanxian
      var sql = "update quanxian set kmzz_add ='" + (list.kmzz_add == null ? "否" : list.kmzz_add)  + "',kmzz_delete ='" + (list.kmzz_delete == null ? "否" :list.kmzz_delete) + "',kmzz_update ='" + (list.kmzz_update == null ? "否" : list.kmzz_update) + "',kmzz_select = '" + (list.kmzz_select == null ? "否" : list.kmzz_select) + "',kzxm_add ='" + (list.kzxm_add == null ? "否" : list.kzxm_add) + "',kzxm_delete ='" + (list.kzxm_delete == null ? "否" : list.kzxm_delete) + "',kzxm_update ='" + (list.kzxm_update == null ? "否" : list.kzxm_update) + "',kzxm_select ='" + (list.kzxm_select == null ? "否" : list.kzxm_select) + "',bmsz_add ='" + (list.bmsz_add == null ? "否" : list.bmsz_add) + "',bmsz_delete ='" + (list.bmsz_delete == null ? "否" : list.bmsz_delete) + "',bmsz_update ='" + (list.bmsz_update == null ? "否" : list.bmsz_update) + "',bmsz_select ='" + (list.bmsz_select == null ? "否" : list.bmsz_select) + "',zhgl_add ='" + (list.zhgl_add == null ? "否" : list.zhgl_add) + "',zhgl_delete ='" + (list.zhgl_delete == null ? "否" : list.zhgl_delete) + "',zhgl_update ='" + (list.zhgl_update == null ? "否" : list.zhgl_update) + "',zhgl_select ='" + (list.zhgl_select == null ? "否" : list.zhgl_select) + "',pzhz_add ='" + (list.pzhz_add == null ? "否" : list.pzhz_add) + "',pzhz_delete ='" + (list.pzhz_delete == null ? "否" : list.pzhz_delete) + "',pzhz_update ='" + (list.pzhz_update == null ? "否" : list.pzhz_update) + "',pzhz_select ='" + (list.pzhz_select == null ? "否" :list.pzhz_select) + "',znkb_select ='" + (list.znkb_select == null ? "否" : list.znkb_select) + "',xjll_select ='" + (list.xjll_select == null ? "否" : list.xjll_select) + "',zcfz_select ='" + (list.zcfz_select == null ? "否" : list.zcfz_select) + "',lysy_select ='" + (list.lysy_select == null ? " 否" : list.lysy_select) + "',jjtz_add ='" + (list.jjtz_add == null ? "否" : list.jjtz_add) + "',jjtz_delete ='" + (list.jjtz_delete == null ? "否" : list.jjtz_delete) + "',jjtz_update ='" + (list.jjtz_update == null ? "否" : list.jjtz_update) + "',jjtz_select ='" + (list.jjtz_select == null ? "否" : list.jjtz_select) + "',jjzz_add ='" + (list.jjzz_add == null ? "否" : list.jjzz_add) + "',jjzz_delete ='" + (list.jjzz_delete == null ? "否" : list.jjzz_delete) + "',jjzz_update ='" + (list.jjzz_update == null ? "否" : list.jjzz_update) + "',jjzz_select ='" + (list.jjzz_select == null ? "否" : list.jjzz_select) + "' where bianhao ='" + list.bianhao + "';"

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
          _this.hid_view();
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
    var _this = this
    _this.init()
    _this.hid_view();
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