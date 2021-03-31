
const updSpace = require('../../util/updSpace')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : [],
    initHidView : false,
    hid_view : false,
    empty : "",

    options_word:{
      items : [],
      text : "",
      selectHid : true,
      columnName : "word"
    },

    accounting : [
      {text:"资产类",arr:[]},
      {text:"负债类",arr:[]},
      {text:"权益类",arr:[]},
      {text:"成本类",arr:[]},
      {text:"损益类",arr:[]},
    ],
    accounting_arr : [],
    animationData_upd_code :[],
    code : "选择科目代码",

    options_department:{
      items : [],
      text : "",
      selectHid : true,
      columnName : "department"
    },

    options_expenditure:{
      items : [],
      text : "",
      selectHid : true,
      columnName : "expenditure"
    }
  },

  getWordOptions : function(){
    var _this = this;
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select word from VoucherWord where company = '"+_this.data.userInfo.company+"' GROUP BY word"
      },
      success: res => {
        var wordList = res.result.recordset
        var optionsItem = [];
        for(var i=0;i<wordList.length;i++){
          optionsItem.push(wordList[i].word)
        }

        _this.setData({
          ["options_word.items"] : optionsItem
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },
  getDepartmentOptions : function(){
    var _this = this;
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select department,man from Department where company = '"+_this.data.userInfo.company+"'"
      },
      success: res => {
        var departmentList = res.result.recordset
        var optionsItem = [];
        for(var i=0;i<departmentList.length;i++){
          optionsItem.push(departmentList[i].department+":"+departmentList[i].man)
        }

        _this.setData({
          ["options_department.items"] : optionsItem
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },
  getExpenditureOptions : function(){
    var _this = this;
    wx.cloud.callFunction({
      name : "sqlServer_cw",
      data : {
        query : "select * from FinancingExpenditure where company = '"+_this.data.userInfo.company+"';select * from FinancingIncome where company = '"+_this.data.userInfo.company+"';select * from InvestmentExpenditure where company = '"+_this.data.userInfo.company+"';select * from InvestmentIncome where company = '"+_this.data.userInfo.company+"';select * from ManagementExpenditure where company = '"+_this.data.userInfo.company+"';select * from ManagementIncome where company = '"+_this.data.userInfo.company+"';"
      },
      success : res=>{
        var list = res.result.recordsets;
        var columnNames = [
          "financingExpenditure",
          "financingIncome",
          "investmentExpenditure",
          "investmentIncome",
          "managementExpenditure",
          "managementIncome"
        ]

        var items = []
        for(var i=0;i<list.length;i++){
          for(var j=0;j<list[i].length;j++){
            if(list[i][j][columnNames[i]]!=""){
              items.push(list[i][j][columnNames[i]])
              continue;
            }
          }
        }
        _this.setData({
          ["options_expenditure.items"] : items
        })
      }
    })
  },
  getAccountion : function(){
    var _this = this;
    wx.cloud.callFunction({
      name : "sqlServer_cw",
      data : {
        query : "select cast(code as varchar)code,name,LEFT(code,1) as area from Accounting where company = '"+_this.data.userInfo.company+"'"
      },
      success : res=>{
        var Accounting = _this.data.accounting
        var list = res.result.recordset;
        for(var i=0;i<list.length;i++){
          if(list[i].area==1){
            Accounting[0].arr.push({code:list[i].code,name:list[i].name})
          }
          if(list[i].area==2){
            Accounting[1].arr.push({code:list[i].code,name:list[i].name})
          }
          if(list[i].area==3){
            Accounting[2].arr.push({code:list[i].code,name:list[i].name})
          }
          if(list[i].area==4){
            Accounting[3].arr.push({code:list[i].code,name:list[i].name})
          }
          if(list[i].area==5){
            Accounting[4].arr.push({code:list[i].code,name:list[i].name})
          }
        }
        _this.setData({
          accounting : Accounting
        })
      }
    })
  },








  selectTap : function(e){
    var _this = this;
    var name = e.currentTarget.dataset.name
    var selectHid = _this.data[name].selectHid
    _this.setData({
      [name+".selectHid"] : selectHid?false:true
    })
  },
  choice : function(e){
    var _this = this;
    var name = e.currentTarget.dataset.name
    var items = _this.data[name];
    var index = e.currentTarget.dataset.index;
    var value = items.items[index]
    
    _this.setData({
      [name+".text"] : value,
      [name+".selectHid"] : true,
    })
  },
  input:function(e){
    var _this =this;
    var name = e.currentTarget.dataset.name
    var value = e.detail.value

    _this.setData({
      [name+".text"] : value
    })
  },

  show_upd_view : function(e){
    var _this = this;
    _this.showView(_this,"upd_code_input")
  },
  choice_item : function(e){
    var _this = this;
    var index = e.currentTarget.dataset.index
    var arr = _this.data.accounting[index].arr

    _this.setData({
      accounting_arr : arr,
      upd_index : index
    })
  },
  choice_code : function(e){
    var _this = this;
    _this.setData({
      code : e.currentTarget.dataset.code
    })
    _this.hidView(_this,"upd_code_input")
  },



  save : function(e){
    var _this = this;

    var form = e.detail.value
    var department = form.department.split(":")[0]
    var man = form.department.split(":")[1]
    var money = form.direction==1?form.money:form.money*-1

    if(_this.checkForm(form)){
      wx.showLoading({
        title : '验证通过加载中',
        mask : 'true'
      })
      if(!updSpace.insert("VoucherSummary")){
        wx.showModal({
          title : '警告',
          content : '数据库已满，请将数据备份后删除部分数据',
          showCancel : false,
          confirmColor : '#009688',
        })
        return;
      }
  
      
      wx.cloud.callFunction({
        name: 'sqlServer_cw',
        data: {
          query: "insert into VoucherSummary(word,no,abstract,code,department,expenditure,note,man,money,company,voucherDate,real) values('"+form.word+"','"+form.no+"','"+form.abstract+"','"+_this.data.code+"','"+department+"','"+form.expenditure+"','"+form.note+"','"+man+"','"+money+"','"+_this.data.userInfo.company+"','"+_this.getDate()+"','"+form.real+"')"
        },
        success: res => {
          wx.hideLoading({
            complete: (res) => {
              wx.showToast({
                title: '添加成功',
                icon : 'success',
                mask : 'true',
              })
              if(e.detail.target.dataset.type == 'submitAndReset'){
                _this.reset();
              }
            },
          })
        },
        err: res => {
          console.log("错误!")
        }
      })
    }
  },

  reset : function(){
    var _this = this;
    _this.setData({
      empty : "",
      code : "选择科目代码",
      ["options_word.text"] : "",
      ["options_department.text"] : "",
      ["options_expenditure.text"] : ""
    })

  },

  checkForm : function(form){
    var _this = this;
    var formValidation = require("../../../components/utils/formValidation.js")
    var rules = [{
      name: "word",
      rule: ["required"],
      msg: ["请选择凭证字"]
    },{
      name: "no",
      rule: ["required"], 
      msg: ["请输入凭证号"]
    },{
      name: "direction",
      rule: ["required"], 
      msg: ["请选择借贷方向"]
    },{
      name: "department",
      rule: ["required"], 
      msg: ["请选择部门"]
    },{
      name: "expenditure",
      rule: ["required"], 
      msg: ["请输入选择开支项目"]
    },{
      name: "money",
      rule: ["required","isNum"], 
      msg: ["请输入金额","请输入正确的金额"]
    },{
      name: "real",
      rule: ["required","isNum"], 
      msg: ["请输入实收金额","请输入正确的实收金额"]
    }]
    var msg = formValidation.validation(form,rules)
    if(msg==""){
      if(_this.data.code=="选择科目代码"){
        wx.showToast({
          title: '请选择科目代码',
          icon : 'none'
        })
        return false
      }

      var word = form.word;
      var words = _this.data.options_word.items
      var is1 = _this.checkOptions(words,word)
      if(!is1){
        wx.showToast({
          title: '请选择正确的凭证字',
          icon : 'none'
        })
        return false;
      }
      var department = form.department;
      var departments = _this.data.options_department.items
      var is2 = _this.checkOptions(departments,department)
      if(!is2){
        wx.showToast({
          title: '请选择正确的部门',
          icon : 'none'
        })
        return false;
      }
      var expenditure = form.expenditure;
      var expenditures = _this.data.options_expenditure.items
      var is3 = _this.checkOptions(expenditures,expenditure)
      if(!is3){
        wx.showToast({
          title: '请选择正确的开支项目',
          icon : 'none'
        })
        return false;
      }
      return true
    }
    wx.showToast({
      title: msg,
      icon : 'none'
    })
    return false;
  },

  checkOptions : function(items,item){
    for(var i=0;i<items.length;i++){
      if(items[i]==item){
        return true
      }
    }
    return false
  },

  getDate : function(){
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var _this = this;
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
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
    var _this = this;
    _this.hid_view();
    _this.getWordOptions();
    _this.getAccountion();
    _this.getDepartmentOptions();
    _this.getExpenditureOptions();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  hidView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    _this.setData({
      hid_view : false
    })

    switch(type){
      case "upd_code_input":
        animation.translateX(500).step()
        _this.setData({
          animationData_upd_code : animation.export()
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

    setTimeout(function(){
      switch(type){
        case "upd_code_input":
          animation.translateX(0).step()
          _this.setData({
            animationData_upd_code : animation.export()
          })
          break;
      }
    },100)
  },

  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"upd_code_input")
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