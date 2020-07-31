Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : [],
    initHidView : false,
    hid_view : false,
    empty : "",

    code : "选择项目代码",

    getCodeItems : [
      {
        text : "项目类别",
        list : [
          {class : 1,className : "资产类"},
          {class : 2,className : "负债类"},
          {class : 3,className : "权益类"},
          {class : 4,className : "成本类"},
          {class : 5,className : "损益类"}
        ]
      },{
        text : "项目等级",
        list : [
          {class : 1,className : "I"},
          {class : 2,className : "II"},
          {class : 3,className : "III"}
        ]
      }
    ],

    getCodeItem : [1,1],
    animationData_getCode : [],

    getParentCodeItems : [
      {grade : 1,list : []},
      {grade : 2,list : []},
      {grade : 3,list : []}
    ],

    parentCode : 0,
    parentCode2 : 0,
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



  reset : function(){
    var _this = this;
    _this.setData({
      empty : "",
      code : '选择项目代码',
      getCodeItem : [1,1],
      parentCode : 0,
      parentCode2 : 0,
    })
    var getParentCodeItems = _this.data.getParentCodeItems
    for(var i=0;i<getParentCodeItems.length;i++){
      for(var j=0;j<getParentCodeItems[i].list.length;j++){
        getParentCodeItems[i].list[j].is = 0
      }
    }
  },

  save : function(e){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    
    var form = e.detail.value;
    var result = _this.checkFrom(form)

    if(_this.data.code != "选择项目代码"){
      if(result==""){
        var sql = "insert into Accounting(code,name,direction,load,borrowed,company) values('"+_this.data.code+"','"+form.name+"','"+form.direction+"','"+form.load+"','"+form.borrowed+"','"+_this.data.userInfo.company+"')"


        wx.cloud.callFunction({
          name : 'sqlServer_cw',
          data : {
            query : sql
          },
          success : res => {
            wx.hideLoading({
              complete: (res) => {
                wx.showToast({
                  title: '保存成功',
                  icon : 'success',
                  complete: res => {
                    
                    _this.getAllCode(false);
                    _this.reset()
                  }
                })
              },
            })
          }
        })
      }else{
        wx.showToast({
          title: result,
          icon : 'none'
        })
      }
    }else{
      wx.showToast({
        title: '请选择科目代码',
        icon : 'none'
      })
    }
  },

  checkFrom : function(form){
    var formValidation = require("../../../components/utils/formValidation.js")
    var rules = [{
      name: "name",
      rule: ["required"],
      msg: ["请输入项目名称"]
    },{
      name: "direction",
      rule: ["required"], 
      msg: ["请选择借贷方向"]
    },{
      name: "load",
      rule: ["required","isNum"], 
      msg: ["请输入年初借金","请输入正确的年初借金"]
    },{
      name: "borrowed",
      rule: ["required","isNum"], 
      msg: ["请输入年初贷金","请输入正确的年初年初贷金"]
    }]
    return formValidation.validation(form,rules)
  },










  /**
   * 
   * 验证项目代码
   */

  showGetCode : function(){
    var _this = this;
    _this.showView(_this,"getCode")
  },

  changeClass : function(e){
    var _this = this;
    var itemsIndex = e.detail.currentItemId;
    var itemIndex = e.detail.current;
    var class_id = _this.data.getCodeItems[itemsIndex].list[itemIndex].class

    _this.setData({
      ["getCodeItem["+itemsIndex+"]"] : class_id
    })
    console.log(_this.data.getCodeItem)
  },

  back_getCode : function(){
    var _this = this;
    _this.hidView(_this,"getCode")
  },

  getCode : function(){
    var _this = this;
    if(_this.data.getCodeItem[1]==1){
      _this.getMax()
      _this.hidView(_this,"getCode")
      return;
    }
    _this.showView(_this,"getParentCode")
  },

  getAllCode : function(is){
    var _this = this;
    var isFirst = is==undefined?true:false
    if(isFirst){
      wx.showLoading({
        title : '加载中',
        mask : 'true'
      })
    }
    
    wx.cloud.callFunction({
      name : 'sqlServer_cw',
      data : {
        query : "select code,name,(CAST(LEN(code) as int)-1)/2 as grade,left(code,1) as class,left(code,4) as code1,left(code,6) as code2,left(code,8) as code3,null as parentCode,0 as [is] from Accounting"
      },
      success : res => {
        var getParentCodeItems = _this.data.getParentCodeItems
        var list = res.result.recordset
        for(var i=0;i<list.length;i++){
          if(list[i].grade==2){
            list[i].parentCode = list[i].code1
          }else if(list[i].grade==3){
            list[i].parentCode = list[i].code2
          }
          for(var j=0;j<getParentCodeItems.length;j++){
            if(list[i].grade == getParentCodeItems[j].grade){
              getParentCodeItems[j].list.push(list[i])
            }
          }
        }

        console.log(getParentCodeItems)

        _this.setData({
          getParentCodeItems
        })

        if(isFirst){
          wx.hideLoading({
            complete: (res) => {},
          })
        }
      }
    })
  },

  //这块代码太烂了后期要改的
  choiceCode : function(e){
    var _this = this;
    var code = e.currentTarget.dataset.code;
    var dx_i = e.currentTarget.dataset.i;
    var ds_j = e.currentTarget.dataset.j;
    var getParentCodeItems = _this.data.getParentCodeItems;


    for(var i=0;i<getParentCodeItems.length;i++){
      //只在点击项目的等级下修改is
      if(getParentCodeItems[i].grade == parseInt(dx_i)+1){
        //选的是三级项目且点击的项目等级为1
        if(getParentCodeItems[i].grade==1 && _this.data.getCodeItem[1]==3){
          var num = 0
          for(var x=0;x<getParentCodeItems[1].list.length;x++){
            if(getParentCodeItems[1].list[x].parentCode==code){
              num++
            }
          }
          if(num==0){
            wx.showModal({
              title : '提示',
              content : '该项目下没有子项目,请先创建其子项目',
              showCancel: 'false',
              confirmColor : '#009688',
              success : res => {
                if(res.confirm){
                  _this.hidView(_this,"getParentCode")
                  for(var c=0;c<getParentCodeItems.length;c++){
                    for(var b=0;b<getParentCodeItems[c].list.length;b++){
                      getParentCodeItems[c].list[b].is = 0
                    }
                  }
                  _this.setData({
                    getParentCodeItems
                  })
                  return;
                } 
              }
            })
          }
        }
        for(var j=0;j<getParentCodeItems[i].list.length;j++){
          getParentCodeItems[i].list[j].is = 0
        }
      }
    }
    getParentCodeItems[dx_i].list[ds_j].is = 1
    _this.setData({
      getParentCodeItems
    })

    if(dx_i==0){
      _this.setData({
        parentCode : code
      })
    }else{
      _this.setData({
        parentCode2 : code,
      })
    }
  },

  back_getParentCode : function(){
    var _this = this;
    _this.hidView(_this,"getParentCode")
  },

  getMax : function(){
    var _this = this;
    var getCodeItem = _this.data.getCodeItem;
    var list = _this.data.getParentCodeItems[getCodeItem[1]-1].list
    var parentCode = getCodeItem[1]==2?_this.data.parentCode:getCodeItem[1]==3?_this.data.parentCode2:0

    var maxCode = 0;
    for(var i=0;i<list.length;i++){
      var code = parseInt(list[i].code)
      var l_class = parseInt(list[i].class)
      if(list[i].grade==1){
        parentCode = code
        list[i].parentCode = code
      }
      if(l_class == getCodeItem[0] && maxCode<code && list[i].parentCode==parentCode){
        maxCode = code
      }
    }

    if(getCodeItem[1]>1 && maxCode==0){
      var newCode = parentCode + "01"
      maxCode = parseInt(newCode)
      _this.setData({
        code : maxCode
      })
      return;
    }

    _this.setData({
      code : maxCode+1
    }) 
  },

  saveCode : function(){
    var _this = this;
    var getCodeItem = _this.data.getCodeItem;
    var is = false
    if(getCodeItem[1]==2){
      if(_this.data.parentCode!=0){
        is = true
      }
    }else if(getCodeItem[1]==3){
      if(_this.data.parentCode2!=0){
        is = true
      }
    }else{
      is = true
    }
    
    if(is){
      _this.hid_view();
      _this.getMax();
    }else{
      wx.showToast({
        title: '请选择父级项目',
        icon : 'none'
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
    var _this = this;
    _this.hid_view();
    _this.getAllCode();
  },

  //动画效果
  
  hidView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })

    switch(type){
      case "getCode":
        animation.translateY(-300).step()
        _this.setData({
          animationData_getCode : animation.export(),
          hid_view : false
        })
        break;
      case "getParentCode":
        animation.translateY(-300).step()
        _this.setData({
          animationData_getParentCode : animation.export()
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

    wx.nextTick(()=>{
      switch(type){
        case "getCode":
          animation.translateX(0).step()
          _this.setData({
            animationData_getCode : animation.export()
          })
          break;
        case "getParentCode":
          animation.translateX(0).step()
          _this.setData({
            animationData_getParentCode : animation.export()
          })
          break;
      }
    })
  },

  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"getCode")
    _this.hidView(_this,"getParentCode")
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