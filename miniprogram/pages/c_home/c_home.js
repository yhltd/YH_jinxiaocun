const formValidation = require("../../components/utils/formValidation.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isdo_newuser : false,
    initHidView : false,
    hid_view : false,
    function_userInfo : "upd_pwd",
    names : [
      {
        id:1,
        name:"基本信息",
        list : [
          {text:"科目总账",url:"../../packageC/pages/c_kemuzongzhang/c_kemuzongzheng"},
          {text:"开支科目",url:"../../packageC/pages/c_kaizhixiangmu/c_kaizhixiangmu"},
          {text:"部门设置",url:"../../packageC/pages/c_bumenpeizhi/c_bumenpeizhi"},
          {text:"账号设置",url:""}
        ],
        listHid : false,
        animationData :{}
      },{
        id:2,
        name:"凭证处理",
        list:[
          {id:1,text:"凭证录入",url:"../../packageC/pages/c_pingzhenghuizong_insert/c_pingzhenghuizong_insert"},
          {id:2,text:"凭证汇总",url:"../../packageC/pages/c_pingzhenghuizong/c_pingzhenghuizong"},
          {id:3,text:"智能看板",url:"../../packageC/pages/c_zhinengkanban/c_zhinengkanban"}
        ],
        listHid : false,
        animationData :{}
      },{
        id:3,
        name:"各类报表",
        list:[
          {id:1,text:"现金流量",url:"../../packageC/pages/c_xianjinliuliang/c_xianjinliuliang"},
          {id:2,text:"资产负债",url:"../../packageC/pages/c_zichanfuzhai/c_zichanfuzhai"},
          {id:3,text:"利益损益",url:"../../packageC/pages/c_liyisunyi/c_liyisunyi"},
        ],
        listHid : false,
        animationData :{}
      },{
        id:4,
        name:"极简财务",
        list:[
          {id:1,text:"极简台账",url:"../../packageC/pages/c_jijiantaizhang/c_jijiantaizhang"},
          {id:2,text:"极简总账",url:"../../packageC/pages/c_jijianzongzhang/c_jijianzongzhang"},
          {id:3,text:"使用说明",url:""},
          {id:1,text:"数据空间",url:"../../packageC/pages/c_shujukongjian/c_shujukongjian"},
        ],
        listHid : false,
        animationData :{}
      }
    ],

    userInfo : "",
    ianimation_userinfo : [],

    list : []
  },

  choice : function(e){
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var hid = _this.data.names[index].listHid;
    
    if(hid){
      _this.hidList(100,_this,index)
      setTimeout(function(){
        _this.setData({
          ["names["+index+"].listHid"] :hid?false:true
        })
      },150)
    }else{
      _this.setData({
        ["names["+index+"].listHid"] :hid?false:true
      })
      setTimeout(function(){
        _this.showList(100,_this,index)
      },150)
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

    _this.setData({
      initHidView : true
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

    _this.setData({
      initHidView : false
    })
    for(var i=0;i<length;i++){
      _this.hidList(1,_this,i)
    }
    _this.hidUserInfo()
  },

  
  init : function(mark4){
    wx.showLoading({
      title : '正在计算',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;


    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "exec sp_spaceused 'Account';exec sp_spaceused 'Accounting';exec sp_spaceused 'Department';exec sp_spaceused 'FinancingExpenditure';exec sp_spaceused 'FinancingIncome';exec sp_spaceused 'InvestmentIncome';exec sp_spaceused 'FinancingExpenditure';exec sp_spaceused 'ManagementExpenditure';exec sp_spaceused 'ManagementIncome';exec sp_spaceused 'SimpleAccounting';exec sp_spaceused 'SimpleData';exec sp_spaceused 'VoucherSummary';exec sp_spaceused 'VoucherWord';"
      },
      success: res => {
        var lists = res.result.recordsets
        let list = []
        for(let i=0;i<lists.length;i++){
          list.push(lists[i][0])
        }
        _this.setData({
          list
        })
        wx.hideLoading({

        })
        _this.getPro(mark4)
      },
      err: res => {
        console.log("错误!")
      },
    })
    

    
  },

  getPro : function(mark4){
    wx.showLoading({
      title : '正在计算',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from Account;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from Accounting;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from Department;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from FinancingExpenditure;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from FinancingIncome;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from InvestmentExpenditure;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from InvestmentIncome;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from ManagementExpenditure;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from ManagementIncome;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from SimpleAccounting;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from SimpleData;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from VoucherSummary;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from VoucherWord;"
      },
      success: res => {
        var lists = res.result.recordsets
        let list = _this.data.list
        var useSpase = 0
        for(let i=0;i<list.length;i++){
          useSpase += parseInt(list[i].reserved.split("K")[0])*Math.ceil(lists[i][0].proportion)
        }
        console.log(useSpase+"KB")
        wx.hideLoading({
          complete: (res) => {},
        })

        wx.showModal({
          title : '已用空间：'+Math.ceil(useSpase/(mark4*1024)*100)+"%",
          content : '剩余大小：'+Math.floor((mark4*1024-useSpase)/1024)+"MB",
          showCancel: false,
          confirmColor : '#009688'
        })
      },
      err: res => {
        console.log("错误!")
      },
    })
  },

  getSpace : function(){
    wx.showLoading({
      title : '正在计算',
      mask : 'true'
    })
    var _this = this;
    var userInfo = _this.data.userInfo;
    var mark4 = 0;
    wx.cloud.callFunction({
      name : 'sqlServer_system',
      data : {
        query : "SELECT mark4 from control_soft_time where name = '"+userInfo.company+"' and soft_name = '财务'"
      },
      success : res=> {
        mark4 = res.result.recordset[0].mark4
        wx.hideLoading({
          complete: (res) => {},
        })
        _this.init(mark4)
      }
    })
  },

  go : function(e){
    var _this = this;
    var itemindex = e.currentTarget.dataset.itemindex;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.names[itemindex].list[index].url
    if(_this.data.names[itemindex].list[index].text=="账号设置"){
      _this.showUserInfo();
      return;
    }
    if(_this.data.names[itemindex].list[index].text=="使用说明"){
      wx.showLoading({
        title: '打开使用说明',
        mask : true
      })
      wx.cloud.downloadFile({
        fileID: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/云合未来财务系统_使用说明.pdf",
        success : res=> {
          console.log("获取本地临时路径:"+res.tempFilePath)
          wx.openDocument({
            filePath: res.tempFilePath,
            showMenu : 'true',
            success : res=> {
              wx.hideLoading({
                complete: (res) => {},
              })
              console.log("用户打开使用说明")
            }
          })
        },
        complete : res=> {
          //删除云储存
          console.log("清除云缓存")
          wx.cloud.deleteFile({
            fileList: fileIDs,
            success: res => {
              // handle success
              console.log(res.fileList);
            }
          })
        }
      })
      
      
      return
    }
    if(_this.data.names[itemindex].list[index].text=="数据空间"){
      _this.getSpace()
      return;
    }
    if(url==null || url==undefined || url==""){
      wx.showToast({
        title: "找不到路径",
        icon : "none"
      })
      return
    }
    _this.hidList(100,_this,itemindex)
    
    wx.navigateTo({
      url : url+"?userInfo="+JSON.stringify(_this.data.userInfo)
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
  },

  showUserInfo : function(){
    var _this = this;
    var animation = wx.createAnimation({
      duration : 300
    })

    _this.setData({
      initHidView : true,
      hid_view : true
    })
    setTimeout(function(){
      animation.translateX(0).step()
      _this.setData({
        ianimation_userinfo : animation.export(),
      },100)
    })
    
  },

  hidUserInfo : function(){
    var _this = this;
    var animation = wx.createAnimation({
      duration : 300
    })

    _this.setData({
      hid_view : false
    })
    animation.translateX(-500).step()
    _this.setData({
      ianimation_userinfo : animation.export(),
      
    })
  },

  changeFunction : function(e){
    var _this = this;
    
    _this.setData({
      function_userInfo : e.detail.currentItemId,
      isdo_newuser : false
    })
  },

  empty : function(){

  },
  
  update_pwd : function(e){
    var _this = this;
    var rule = [{
      name: "new_pwd",
      rule: ["required"],
      msg: ["请输入新密码"]
    },{
      name: "again_pwd",
      rule: ["required"], 
      msg: ["请重复新密码"]
    }]
    var msg = formValidation.validation(e.detail.value,rule)
    if(msg!=""){
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      return;
    }
    var newPwd = e.detail.value.new_pwd
    var againPwd = e.detail.value.again_pwd
    var userInfo = _this.data.userInfo

    
    if(newPwd!=againPwd){
      wx.showToast({
        title: '重复密码错误！',
        icon : 'none'
      })
      return;
    }

    var sql = "update Account set pwd = '"+newPwd+"' where id = '"+userInfo.id+"'";
    console.log(sql)

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '修改成功！',
          icon : 'success'
        })
        userInfo.pwd = newPwd
        _this.setData({
          userInfo,
          empty : ""
        })
        
      },
    })
  },

  update_do : function(e){
    var _this = this;
    var rule = [{
      name: "new_pwd",
      rule: ["required"],
      msg: ["请输入旧操作密码"]
    },{
      name: "new_do",
      rule: ["required"], 
      msg: ["请输入新操作密码"]
    },{
      name: "again_do",
      rule: ["required"], 
      msg: ["请重复新操作密码"]
    }]
    var msg = formValidation.validation(e.detail.value,rule)
    if(msg!=""){
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      return;
    }
    var oldDo = e.detail.value.old_do;
    var newDo = e.detail.value.new_do;
    var againDo = e.detail.value.again_do;

    var userInfo = _this.data.userInfo;
    if(oldDo != userInfo.do){
      wx.showToast({
        title: '旧操作密码不正确',
        icon : 'none'
      })
      return;
    }
    if(newDo!=againDo){
      wx.showToast({
        title: '重复操作密码错误！',
        icon : 'none'
      })
      return;
    }

    var sql = "update Account set do = '"+newDo+"' where id = '"+userInfo.id+"'";

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '修改成功！',
          icon : 'success'
        })
        userInfo.do = newDo
        _this.setData({
          userInfo,
          empty : ""
        })
        
      },
    })
  },

  check_do : function(e){
    var _this = this;
    var rule = [{
      name: "do",
      rule: ["required"],
      msg: ["请输入操作密码"]
    }]
    var msg = formValidation.validation(e.detail.value,rule)
    if(msg!=""){
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      return;
    }
    var Do = e.detail.value.do

    var userInfo = _this.data.userInfo;

    if(Do!=userInfo.do){
      wx.showToast({
        title: '操作密码不正确',
        icon :'none'
      })
      return
    }

    _this.setData({
      isdo_newuser : true,
      empty : ""
    })
  },

  new_user : function(e){
    var _this = this;
    var rule = [{
      name: "newuser_name",
      rule: ["required"],
      msg: ["请输入用户名"]
    },{
      name: "newuser_pwd",
      rule: ["required"], 
      msg: ["请重复密码"]
    },{
      name: "newuser_do",
      rule: ["required"], 
      msg: ["请重复操作密码"]
    }]
    var msg = formValidation.validation(e.detail.value,rule)
    if(msg!=""){
      wx.showToast({
        title: msg,
        icon: 'none'
      })
      return;
    }
    var userName = e.detail.value.newuser_name;
    var userPwd = e.detail.value.newuser_pwd;
    var userDo = e.detail.value.newuser_do;

    var userInfo = _this.data.userInfo
    var sql = "insert into Account([name],[pwd],[do],[company]) values('"+userName+"','"+userPwd+"','"+userDo+"','"+userInfo.company+"')"

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '添加成功！',
          icon : 'success'
        })
        _this.setData({
          empty : ""
        })
        
      },
    })
  }
})



