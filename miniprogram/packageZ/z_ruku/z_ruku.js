const updSpace = require('../util/updSpace')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    list: [],
    
    title: [
      {text: "序号",width: "100rpx",columnName: "row_id",type:"text",isupd:true},
      {text: "入库数量",width: "200rpx",columnName: "num",type:"number",isupd:true},
      {text: "备注",width: "300rpx",columnName: "comment",type:"text",isupd:true},

      {text: "商品代码",width: "250rpx",columnName: "code",isupd:false},
      {text: "商品名称",width: "250rpx",columnName: "name",isupd:false},
      {text: "商品单价",width: "200rpx",columnName: "price",isupd:false},
      {text: "用料",width: "250rpx",columnName: "cloth",isupd:false},
      {text: "规格",width: "250rpx",columnName: "norms",isupd:false},
      {text: "类型",width: "250rpx",columnName: "type",isupd:false},
      {text: "备用字段1",width: "250rpx",columnName: "mark1",isupd:false},
      {text: "备用字段2",width: "250rpx",columnName: "mark2",isupd:false},
      {text: "备用字段3",width: "250rpx",columnName: "mark3",isupd:false},
      {text: "备用字段4",width: "250rpx",columnName: "mark4",isupd:false},
      {text: "备用字段5",width: "250rpx",columnName: "mark5",isupd:false},
    ],

    list2 : [],
    title2: [
      {text: "操作",width: "100rpx",columnName: "",},
      {text: "商品代码",width: "250rpx",columnName: "code",},
      {text: "商品名称",width: "250rpx",columnName: "name",},
      {text: "库存数量",width: "250rpx",columnName: "num",},
      {text: "商品单价",width: "200rpx",columnName: "price",},
      {text: "用料",width: "250rpx",columnName: "cloth",},
      {text: "规格",width: "250rpx",columnName: "norms",},
      {text: "类型",width: "250rpx",columnName: "type",},
      {text: "备用字段1",width: "250rpx",columnName: "mark1"},
      {text: "备用字段2",width: "250rpx",columnName: "mark2"},
      {text: "备用字段3",width: "250rpx",columnName: "mark3"},
      {text: "备用字段4",width: "250rpx",columnName: "mark4"},
      {text: "备用字段5",width: "250rpx",columnName: "mark5"},
    ],


    moreDo_hid: true,
    mask_hid: true,
    choice_hid: true,
    new_hid: true,

    checkItems : [],
    checked : false,

    sumPrice : 0,

    input_hid : true,
    dataset_input : [],
    empty : "",

    startPrice : 0,
    endPrice : 0
  },


  init: function () {
    var _this = this;
    _this.hid_view()
    wx.showLoading({
      title: '加载中',
    })
    var sql = "select *,0 as isHid from zeng_wares";
    wx.cloud.callFunction({
      name: "sqlServer_117",
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset;
        _this.setData({
          list2 : list
        })
      },
      complete: res => {
        wx.hideLoading({
          success: (res) => {},
        })
      }

    })
  },

  input_Price : function(e){
    var _this = this;
    var column = e.currentTarget.dataset.column
    var value = e.detail.value==""?0:parseInt(e.detail.value)

    if(column=="startPrice"){
      _this.setData({
        startPrice : value
      })
    }else{
      _this.setData({
        endPrice : value
      })
    }

    var list = _this.data.list2;
    var startPrice = _this.data.startPrice
    var endPrice = _this.data.endPrice
    for(let i=0;i<list.length;i++){
      if(startPrice==0 && endPrice==0){
        _this.setData({
          ["list2["+i+"].isHid"] : 0
        })
      }else if(startPrice!=0 && endPrice!=0){
        if(list[i].price>= startPrice && list[i].price <= endPrice){
          _this.setData({
            ["list2["+i+"].isHid"] : 0
          })
        }else{
          _this.setData({
            ["list2["+i+"].isHid"] : 1
          })
        }
      }else if(startPrice==0 && endPrice!=0){
        if(list[i].price <= endPrice){
          _this.setData({
            ["list2["+i+"].isHid"] : 0
          })
        }else{
          _this.setData({
            ["list2["+i+"].isHid"] : 1
          })
        }
      }else if(startPrice!=0 && endPrice==0){
        if(list[i].price >= startPrice){
          _this.setData({
            ["list2["+i+"].isHid"] : 0
          })
        }else{
          _this.setData({
            ["list2["+i+"].isHid"] : 1
          })
        }
      }
    }
  },




  //获取订单号
  getOrder_id : function(){
    var _this = this;
    var id = _this.data.userInfo.id
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    var second = myDate.getSeconds();
    var milliSecond = myDate.getMilliseconds();

    
    var time = myDate.getTime().toString()

    var random = Math.round(Math.random()*99);
    
    
    var order_id = year+month+day+hour+minute+second+milliSecond+id+time.substring(time.length-8)+random

    return order_id
  },

  insertList : function(){
    var _this = this;
    var checkItems = _this.data.checkItems;
    var list = _this.data.list;
    var list2 = _this.data.list2;
    
    
    for(let i=0;i<checkItems.length;i++){
      list.push({
        id : list2[checkItems[i]].id,
        row_id : list.length+1,
        num : 0,
        comment : "",
        code : list2[checkItems[i]].code,
        name : list2[checkItems[i]].name,
        price : list2[checkItems[i]].price,
        cloth : list2[checkItems[i]].cloth,
        norms : list2[checkItems[i]].norms,
        type : list2[checkItems[i]].type,
        mark1 : list2[checkItems[i]].mark1,
        mark2 : list2[checkItems[i]].mark2,
        mark3 : list2[checkItems[i]].mark3,
        mark4 : list2[checkItems[i]].mark4,
        mark5 : list2[checkItems[i]].mark5,
        sqlType : 0
      })
    }
    _this.setData({
      list,
      checked : false,
      checkItems : []
    })
    _this.hid_view();
  },

  checkForm : function(form){
    var _this = this;
    var formValidation = require("../../components/utils/formValidation")
    var rules = [{
      name: "code",
      rule: ["required"],
      msg: ["请输入商品代码"]
    },{
      name: "name",
      rule: ["required"], 
      msg: ["请输入商品名"]
    },{
      name: "price",
      rule: ["required"], 
      msg: ["请输入单价"]
    },{
      name: "num",
      rule: ["required"], 
      msg: ["请输入入库数量"]
    }]
    var msg = formValidation.validation(form,rules)
    if(msg!=""){
      wx.showToast({
        title: msg,
        icon : 'none'
      })
      return false;
    }
    return true;
  },
  newList : function(e){
    var _this = this;
    var form = e.detail.value
    var list = _this.data.list;

    if(_this.checkForm(form)){
      wx.showLoading({
        title : '检查代码唯一性',
        mask : 'true'
      })
      wx.cloud.callFunction({
        name : 'sqlServer_117',
        data : {
          query : "select count(*) as num from zeng_wares where code = '"+form.code+"'"
        },
        success : res=> {
          wx.hideLoading({
            success: (res) => {},
          })
          if(parseInt(res.result.recordset[0].num) <= 0){
            list.push({
              row_id : list.length+1,
              order_id : _this.getOrder_id(),
              num : form.num,
              comment : "",
              code : form.code,
              name : form.name,
              price : form.price,
              cloth : form.cloth,
              norms : form.norms,
              type : form.type,
              mark1 : form.mark1,
              mark2 : form.mark2,
              mark3 : form.mark3,
              mark4 : form.mark4,
              mark5 : form.mark5,
              sqlType : 1
            })
            _this.setData({
              list
            })
            _this.hid_view();
          }else{
            wx.showToast({
              title: '商品代码已存在',
              icon : 'none',
              duration : 1500
            })
            return;
          }
        }
      })
    }
  },



  clickView : function(e){
    var _this = this;
    var dataset = e.currentTarget.dataset;
    if(!dataset.isupd){
      return
    }
    if(dataset.column=="row_id"){
      wx.showModal({
        title : '提示',
        content: '确认删除吗？',
        success (res) {
          if (res.confirm) {
            var list = _this.data.list;
            var index = dataset.index;
            var sumPrice = _this.data.sumPrice-list[index].num*list[index].price
            list.splice(index,1)
            _this.setData({
              list,
              sumPrice
            })
          }
        }
      })
      return;
    }
    _this.setData({
      input_hid : false,
      mask_hid : false,
      dataset_input : dataset,
    })
  },

  save : function(e){
    var _this = this;
   
    var list = _this.data.list
    var dataset = _this.data.dataset_input

    var index = dataset.index;
    var column = dataset.column;
    var new_value = e.detail.value.new;
    var value = dataset.value
    if(new_value=="" && new_value != 0){
      new_value = value
      wx.showToast({
        title: "未修改",
        icon : "none"
      })
      return;
    }

    if(column == "num"){
      new_value = parseInt(new_value)
      _this.setData({
        sumPrice : Math.floor((_this.data.sumPrice+=(new_value-value)*list[index].price)*100)/100
      })
    }
    _this.setData({
      ["list["+index+"]."+column] : new_value,
    })
    _this.hid_view()
    
  },



  set : function(){
    var _this = this;
    if(_this.data.list.length==0){
      wx.showToast({
        title: '请选择商品',
        icon : "none"
      })
      return;
    }
    if(!updSpace.insert("zeng_wares") && !updSpace.insert("zeng_stock")){
      wx.showModal({
        title : '警告',
        content : '数据库已满，请将数据备份后删除部分数据',
        showCancel : false,
        confirmColor : '#009688',
      })
      return;
    }

    wx.showLoading({
      title : '入库中',
      mask : true
    })
    var list = _this.data.list;

    var sql = "";

    var order_id =  _this.getOrder_id()
    for(let i=0;i<list.length;i++){
      if(list[i].num==""){
        wx.hideLoading({
          complete : res=> {
            wx.showToast({
              title: '请输入入库数量：序号'+(i+1),
              duration: 1000,
              icon : "none"
            })
          }
        })
        return;
      }
     
      if(list[i].sqlType==1){
        sql += "insert into zeng_wares(code,name,price,num,cloth,norms,type,mark1,mark2,mark3,mark4,mark5) values('"+list[i].code+"','"+list[i].name+"','"+list[i].price+"','"+list[i].num+"','"+list[i].cloth+"','"+list[i].norms+"','"+list[i].type+"','"+list[i].mark1+"','"+list[i].mark2+"','"+list[i].mark3+"','"+list[i].mark4+"','"+list[i].mark5+"');insert into zeng_stock(productCode,discount,direction,userName,num,time,comment,payType,order_id) values('"+list[i].code+"','0','1','"+_this.data.userInfo.userName+"','"+list[i].num+"',CONVERT(varchar,GETDATE(),120),'"+list[i].comment+"','','"+order_id+"');"
      }else{
        sql += "update zeng_wares set num = num + "+list[i].num+" where id = '"+list[i].id+"';insert into zeng_stock(productCode,discount,direction,userName,num,time,comment,payType,order_id) values('"+list[i].code+"','0','1','"+_this.data.userInfo.userName+"','"+list[i].num+"',CONVERT(varchar,GETDATE(),120),'"+list[i].comment+"','','"+order_id+"');"
      }
    }

    wx.cloud.callFunction({
      name: "sqlServer_117",
      data: {
        query: sql
      },
      success: res => {
        wx.hideLoading({
          complete : res=> {
            wx.showToast({
              title: '入库成功',
              icon : 'success'
            })
          }
        })
        _this.init();
        _this.setData({
          list : [],
          sumPrice : 0,
          checkItems : [],
          checked : false
        })
      },
      complete: res => {
        wx.hideLoading({
          success: (res) => {},
        })
      }

    })
  },


  moreDo_show : function(){
    var _this = this;
    _this.hid_view();
    _this.setData({
      moreDo_hid : false,
      mask_hid : false
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
    })
    _this.init();
  },
  choice_checkBox: function (e) {
    var _this = this;
    var value = e.detail.value
    var index = e.currentTarget.dataset.index;
    var checkItems = _this.data.checkItems;
    if (value != "") {
      checkItems.push(index)
    } else {
      for (let i = 0; i < checkItems.length; i++) {
        if (checkItems[i] == index) {
          checkItems.splice(i, 1)
        }
      }
    }
    _this.setData({
      checkItems
    })
  },
  

  
  choice_show : function(){
    var _this = this;
    _this.hid_view();
    _this.setData({
      mask_hid : false,
      choice_hid : false
    })
  },
  new_show : function(){
    var _this = this;
    _this.hid_view();
    _this.setData({
      mask_hid : false,
      new_hid : false
    })
  },



  hid_view: function () {
    var _this = this;
    _this.setData({
      dataset_input : [],
      empty : "",
      moreDo_hid : true,
      input_hid : true,
      mask_hid: true,
      choice_hid: true,
      new_hid: true,
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