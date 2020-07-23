const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names : [
      {
        id:1,
        name:"基本信息",
        list : [
          {text:"科目总账",url:"../../packageC/pages/c_kemuzongzhang/c_kemuzongzheng"},
          {text:"开支科目",url:"../../packageC/pages/c_kaizhixiangmu/c_kaizhixiangmu"},
          {text:"部门设置",url:""},
          {text:"账号设置",url:""}
        ],
        listHid : false,
        animationData :{}
      },{
        id:2,
        name:"凭证处理",
        list:[
          {id:1,text:"凭证录入",url:""},
          {id:2,text:"凭证汇总",url:"../../packageC/pages/c_pingzhenghuizong/c_pingzhenghuizong"},
          {id:3,text:"凭证生成",url:""}
        ],
        listHid : false,
        animationData :{}
      },{
        id:3,
        name:"各类报表",
        list:[
          {id:1,text:"科目余额",url:""},
          {id:2,text:"资产负债",url:"../../packageC/pages/c_zichanfuzhai/c_zichanfuzhai"},
          {id:3,text:"利益损益",url:""},
          {id:4,text:"现金流量",url:""}
        ],
        listHid : false,
        animationData :{}
      }
    ],

    userInfo : ""
  },

  choice : function(e){
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var hid = _this.data.names[index].listHid;
    _this.setData({
    ["names["+index+"].listHid"] :hid?false:true
    })
    if(hid){
      _this.hidList(400,_this,index)
    }else{
      _this.showList(400,_this,index)
    }
  },

  hidList : function(ms,_this,index){
    var names = _this.data.names;
    var animation = wx.createAnimation({
      duration : ms
    })
    animation.translateX(400).step()
    _this.setData({
      ["names["+index+"].animationData"] : animation.export()
    })
  },
  
  showList : function(ms,_this,index){
    var names = _this.data.names;
    var animation = wx.createAnimation({
      duration : ms
    })
    animation.translateX(0).step()
    _this.setData({
      ["names["+index+"].animationData"] : animation.export()
    })
  },
  onLoad : function(options){
    var _this = this;
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
    })
    console.log(JSON.parse(options.userInfo))
  },

  onShow : function(){
    var _this = this;
    var length = _this.data.names.length
    for(var i=0;i<length;i++){
      _this.hidList(1,_this,i)
    }
  },

  go : function(e){
    var _this = this;
    var itemindex = e.currentTarget.dataset.itemindex;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.names[itemindex].list[index].url
    if(url==null || url==undefined || url==""){
      wx.showToast({
        title: "找不到路径",
        icon : "none"
      })
      return
    }
    _this.hidList(100,_this,itemindex)
    wx.navigateTo({
      url : url+"?userInfo="+JSON.stringify({id:4,company:'admin',pwd:'pwd',do:'123',name:'ppp'})
      //_this.data.userInfo
    })
    wx.showToast({
      title: "正在跳转",
      icon : "none"
    })
  },

  //跳走初始化数据
  onHide : function(){
    var _this = this
    for(var i=0;i<_this.data.names.length;i++){
      _this.setData({
        ["names["+i+"].animationData"] : "",
        ["names["+i+"].listHid"] : false
      })
    }
  }
})