const formValidation = require("../../components/utils/formValidation.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBannerHidden: true,
    showXuanTu: true,
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
          {text:"账号管理",url:"../../packageC/pages/c_zhanghaoguanli/c_zhanghaoguanli"},
          {text:"密码修改",url:""},
          {text:"我的",url:"../../packageC/pages/c_wode/c_wode"}
        ],
        src:"cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/jibenxinxi-bg.png",
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
        src:"cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/pingzhengchuli-bg.png",
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
        src:"cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/geleibaobiao_bg.png",
        listHid : false,
        animationData :{}
      },{
        id:4,
        name:"极简财务",
        list:[
          {id:1,text:"极简台账",url:"../../packageC/pages/c_jijiantaizhang/c_jijiantaizhang"},
          {id:2,text:"极简总账",url:"../../packageC/pages/c_jijianzongzhang/c_jijianzongzhang"},
          {id:3,text:"极简配置",url:"../../packageC/pages/c_jijianpeizhi/c_jijianpeizhi"},
          {id:4,text:"发票",url:"../../packageC/pages/c_fapiao/c_fapiao"},
          {id:5,text:"报表",url:"../../packageC/pages/c_baobiao/c_baobiao"},
          {id:6,text:"应付明细账",url:"../../packageC/pages/c_mingxizhang_fu/c_mingxizhang_fu"},
          {id:7,text:"应收明细账",url:"../../packageC/pages/c_mingxizhang_shou/c_mingxizhang_shou"},
          {id:8,text:"利润",url:"../../packageC/pages/c_mingxizhang_shou/c_mingxizhang_shou"},
          {id:9,text:"应收报表",url:"../../packageC/pages/c_yingshoubaobiao/c_yingshoubaobiao"},
          {id:10,text:"应付报表",url:"../../packageC/pages/c_yingfubaobiao/c_yingfubaobiao"},
          {id:11,text:"工资明细",url:"../../packageC/pages/c_gongzimingxi/c_gongzimingxi"},
          {id:12,text:"项目配置",url:"../../packageC/pages/c_ysyfpeizhi/c_ysyfpeizhi"},
          {id:12,text:"统计看板",url:"../../packageC/pages/c_tongji/c_tongji"},
          {id:13,text:"使用说明",url:""},
          {id:14,text:"数据空间",url:"../../packageC/pages/c_shujukongjian/c_shujukongjian"},
        ],
        src:"cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/jijiancaiwu-bg.png",
        listHid : false,
        animationData :{}
      }
    ],

    userInfo : "",
    ianimation_userinfo : [],
    bianhao:"",
    list : [],
    this_quanxian:"",
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
    this.queryUserPermissions()
    var _this = this;
    var user = JSON.parse(options.userInfo)
    if(user == undefined){
      wx.login({
        success: (res) => {
            console.log(res);
            _this.setData({
                wxCode: res.code,
            })
            let m_code = _this.data.wxCode; // 获取code
            let m_AppId = app.globalData.this_id1 + app.globalData.this_id2 + app.globalData.this_id3 ;
            let m_mi =  app.globalData.sec_dd1 + app.globalData.sec_dd2 + app.globalData.sec_dd3;
            console.log("m_code:" + m_code);
            let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + m_AppId + "&secret=" + m_mi + "&js_code=" + m_code + "&grant_type=authorization_code";
            wx.request({
                url: url,
                success: (res) => {
                    console.log(res);
                    _this.setData({
                        wxOpenId: res.data.openid
                    })
                    //获取到你的openid
                    console.log("====openID=======");
                    console.log(_this.data.wxOpenId);
                    var sql = "select * from Account where wechart_user = '" + _this.data.wxOpenId + "'"
                    console.log(sql)
                    wx.cloud.callFunction({
                      name: 'sqlServer_cw',
                      data:{
                        query : sql
                      },
                      success(res){
                        console.log(res)
                        var list = res.result.recordset
                        console.log(list)
                        if(list.length > 0){
                          var bianhao = list[0].bianhao
                          _this.setData({
                            userInfo : list[0],
                            bianhao : bianhao
                          })
                          _this.getSpace()
                          _this.init();
                        }else{
                          wx.showToast({
                            title: '未绑定账号信息',
                            icon:"none"
                          })
                        }
                      }
                    })
                }
            })
        }
    })
    }else{
      var bianhao = user.bianhao
      _this.setData({
        userInfo : JSON.parse(options.userInfo),
        bianhao : bianhao
      })
      _this.getSpace()
      _this.init();
    }

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

  
  init : function(){
    var _this = this;
    var userInfo = _this.data.userInfo;


    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "exec sp_spaceused 'Account';exec sp_spaceused 'Accounting';exec sp_spaceused 'Department';exec sp_spaceused 'FinancingExpenditure';exec sp_spaceused 'FinancingIncome';exec sp_spaceused 'InvestmentIncome';exec sp_spaceused 'FinancingExpenditure';exec sp_spaceused 'ManagementExpenditure';exec sp_spaceused 'ManagementIncome';exec sp_spaceused 'SimpleAccounting';exec sp_spaceused 'SimpleData';exec sp_spaceused 'VoucherSummary';exec sp_spaceused 'VoucherWord';"
      },
      success: res => {
        var list = res.result.recordsets
        var list_space = []

        for(let i=0;i<list.length;i++){
          list_space.push({name:list[i][0].name,size:Math.ceil(list[i][0].reserved.split(" ")[0]/list[i][0].rows)})
        }
        app.globalData.spaceList_cw.list_table = list_space

        _this.getPro(list)
      },
      err: res => {
        console.log("错误!")
      },
    })
    

    
  },

  getPro : function(list){
    var _this = this;
    var userInfo = _this.data.userInfo;

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from Account;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from Accounting;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from Department;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from FinancingExpenditure;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from FinancingIncome;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from InvestmentExpenditure;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from InvestmentIncome;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from ManagementExpenditure;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from ManagementIncome;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from SimpleAccounting;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from SimpleData;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from VoucherSummary;select convert(float,count(case company when '"+userInfo.company+"' then 1 else null end))/convert(float,count(id)) as proportion from VoucherWord;"
      },
      success: res => {
        var lists = res.result.recordsets
        var useSpase = 0
        for(let i=0;i<list.length;i++){
          useSpase += parseInt(list[i][0].reserved.split("K")[0])*Math.ceil(lists[i][0].proportion)
        }
        app.globalData.spaceList_cw.usedSpace = useSpase
        console.log(app.globalData.spaceList_cw)
      },
      err: res => {
        console.log("错误!")
      },
    })
  },

  getSpace : function(){
    var _this = this;
    var userInfo = _this.data.userInfo;
    var mark4 = 0;
    wx.cloud.callFunction({
      name : 'sqlServer_system',
      data : {
        query : "SELECT mark4 from control_soft_time where name = '"+userInfo.company+"' and soft_name = '财务'"
      },
      success : res=> {
        app.globalData.spaceList_cw.allSpace = res.result.recordset[0].mark4*1024
      }
    })
  },

  go : function(e){
    var _this = this;
    var itemindex = e.currentTarget.dataset.itemindex;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.names[itemindex].list[index].url
    var sql = "select * from quanxian where bianhao ='" + _this.data.bianhao + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset[0]
        _this.setData({
          this_quanxian:list[0]
        })
        if(_this.data.names[itemindex].list[index].text=="科目总账"){
          console.log(list)
          if(list.kmzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_kemuzongzhang/c_kemuzongzheng' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        }
        if(_this.data.names[itemindex].list[index].text=="开支科目"){
          console.log(list)
          if(list.kzxm_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_kaizhixiangmu/c_kaizhixiangmu' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        }
        if(_this.data.names[itemindex].list[index].text=="部门设置"){
          console.log(list)
          if(list.bmsz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_bumenpeizhi/c_bumenpeizhi' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        }
        if(_this.data.names[itemindex].list[index].text=="账号管理"){
          console.log(list)
          if(list.zhgl_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_zhanghaoguanli/c_zhanghaoguanli' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        }
        if(_this.data.names[itemindex].list[index].text=="凭证录入"){
          console.log(list)
          if(list.pzhz_add == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_pingzhenghuizong_insert/c_pingzhenghuizong_insert' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块新增权限',
              icon: "none",
              duration: 1000
            })
          }
        }
        if(_this.data.names[itemindex].list[index].text=="凭证汇总"){
          console.log(list)
          if(list.pzhz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_pingzhenghuizong/c_pingzhenghuizong' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        }
        if(_this.data.names[itemindex].list[index].text=="智能看板"){
          console.log(list)
          if(list.znkb_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_zhinengkanban/c_zhinengkanban' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        }
        if(_this.data.names[itemindex].list[index].text=="现金流量"){
          console.log(list)
          if(list.xjll_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_xianjinliuliang/c_xianjinliuliang' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        }
        if(_this.data.names[itemindex].list[index].text=="资产负债"){
          console.log(list)
          if(list.zcfz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_zichanfuzhai/c_zichanfuzhai' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        }
        if(_this.data.names[itemindex].list[index].text=="利益损益"){
          console.log(list)
          if(list.lysy_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_liyisunyi/c_liyisunyi' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        }
        if(_this.data.names[itemindex].list[index].text=="极简台账"){
          console.log(list)
          if(list.jjtz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_jijiantaizhang/c_jijiantaizhang' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        }
        if(_this.data.names[itemindex].list[index].text=="极简总账"){
          console.log(list)
          if(list.jjzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_jijianzongzhang/c_jijianzongzhang' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          }else{
            wx.showToast({
              title: '无此模块查询权限',
              icon: "none",
              duration: 1000
            })
          }
        }
        if(_this.data.names[itemindex].list[index].text=="发票"){
          console.log(list)
          // if(list.jjzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_fapiao/c_fapiao' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          // }else{
          //   wx.showToast({
          //     title: '无此模块查询权限',
          //     icon: "none",
          //     duration: 1000
          //   })
          // }
        }
        if(_this.data.names[itemindex].list[index].text=="极简配置"){
          console.log(list)
          // if(list.jjzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_jijianpeizhi/c_jijianpeizhi' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          // }else{
          //   wx.showToast({
          //     title: '无此模块查询权限',
          //     icon: "none",
          //     duration: 1000
          //   })
          // }
        }
        if(_this.data.names[itemindex].list[index].text=="报表"){
          console.log(list)
          // if(list.jjzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_baobiao/c_baobiao' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          // }else{
          //   wx.showToast({
          //     title: '无此模块查询权限',
          //     icon: "none",
          //     duration: 1000
          //   })
          // }
        }
        if(_this.data.names[itemindex].list[index].text=="应付明细账"){
          console.log(list)
          // if(list.jjzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_mingxizhang_fu/c_mingxizhang_fu' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          // }else{
          //   wx.showToast({
          //     title: '无此模块查询权限',
          //     icon: "none",
          //     duration: 1000
          //   })
          // }
        }
        if(_this.data.names[itemindex].list[index].text=="应收明细账"){
          console.log(list)
          // if(list.jjzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_mingxizhang_shou/c_mingxizhang_shou' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          // }else{
          //   wx.showToast({
          //     title: '无此模块查询权限',
          //     icon: "none",
          //     duration: 1000
          //   })
          // }
        }
        if(_this.data.names[itemindex].list[index].text=="利润"){
          console.log(list)
          // if(list.jjzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_lirun/c_lirun' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          // }else{
          //   wx.showToast({
          //     title: '无此模块查询权限',
          //     icon: "none",
          //     duration: 1000
          //   })
          // }
        }
        if(_this.data.names[itemindex].list[index].text=="应付报表"){
          console.log(list)
          // if(list.jjzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_yingfubaobiao/c_yingfubaobiao' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          // }else{
          //   wx.showToast({
          //     title: '无此模块查询权限',
          //     icon: "none",
          //     duration: 1000
          //   })
          // }
        }
        if(_this.data.names[itemindex].list[index].text=="应收报表"){
          console.log(list)
          // if(list.jjzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_yingshoubaobiao/c_yingshoubaobiao' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          // }else{
          //   wx.showToast({
          //     title: '无此模块查询权限',
          //     icon: "none",
          //     duration: 1000
          //   })
          // }
        }
        if(_this.data.names[itemindex].list[index].text=="我的"){
          wx.navigateTo({
            url: '../../packageC/pages/c_wode/c_wode' +"?userInfo="+JSON.stringify(_this.data.userInfo)
          })
        }
        if(_this.data.names[itemindex].list[index].text=="项目配置"){
          console.log(list)
          // if(list.jjzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_ysyfpeizhi/c_ysyfpeizhi' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          // }else{
          //   wx.showToast({
          //     title: '无此模块查询权限',
          //     icon: "none",
          //     duration: 1000
          //   })
          // }
        }

        if(_this.data.names[itemindex].list[index].text=="统计看板"){
          console.log(list)
          // if(list.jjzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_tongji/c_tongji' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          // }else{
          //   wx.showToast({
          //     title: '无此模块查询权限',
          //     icon: "none",
          //     duration: 1000
          //   })
          // }
        }

        if(_this.data.names[itemindex].list[index].text=="工资明细"){
          console.log(list)
          // if(list.jjzz_select == '是'){
            wx.navigateTo({
              url: '../../packageC/pages/c_gongzimingxi/c_gongzimingxi' +"?userInfo="+JSON.stringify(_this.data.userInfo)
            })
          // }else{
          //   wx.showToast({
          //     title: '无此模块查询权限',
          //     icon: "none",
          //     duration: 1000
          //   })
          // }
        }
      },
      err: res => {
        console.log("错误!")
      }
    })
    if(_this.data.names[itemindex].list[index].text=="密码修改"){
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
      if(app.globalData.spaceList_cw.list_table=="" || app.globalData.spaceList_cw.usedSpace==0 || app.globalData.allSpace == 0){
        wx.showToast({
          title: '正在加载',
          icon : 'none'
        })
        return
      }
      var usedSpace = app.globalData.spaceList_cw.usedSpace
      var allSpace = app.globalData.spaceList_cw.allSpace
      wx.showModal({
        title : '已用空间：'+Math.ceil(usedSpace/allSpace*100)+'%',
        content : '剩余空间：'+Math.floor((allSpace-usedSpace)/1024)+'MB',
        showCancel : false,
        cancelColor	: '#009688'
      })
      return;
    }
    // if(url==null || url==undefined || url==""){
    //   wx.showToast({
    //     title: "找不到路径",
    //     icon : "none"
    //   })
    //   return
    // }
    // _this.hidList(100,_this,itemindex)
    
    // wx.navigateTo({
    //   url : url+"?userInfo="+JSON.stringify(_this.data.userInfo)
    //   //_this.data.userInfo
    // })
    // wx.showToast({
    //   title: "正在跳转",
    //   icon : "none"
    // })
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
      name: "old_pwd",
      rule: ["required"],
      msg: ["请输入旧密码"]
    },{
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
    var oldPwd = e.detail.value.old_pwd
    console.log(oldPwd)
    var newPwd = e.detail.value.new_pwd
    var againPwd = e.detail.value.again_pwd
    var userInfo = _this.data.userInfo
    console.log(userInfo)
    sql = "select * from "

    if(oldPwd != userInfo.pwd){
      wx.showToast({
        title: '旧密码错误！',
        icon : 'none'
      })
      return;
    }
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

    if(!updSpace.insert("Account")){
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
        query: "insert into Account([name],[pwd],[do],[company]) values('"+userName+"','"+userPwd+"','"+userDo+"','"+userInfo.company+"')"
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
  },

  hideBanner: function() {
    this.setData({
      isBannerHidden: false
    });
  },
  closeXuanTu: function() {
    this.setData({
      showXuanTu: false
    })
  },
  queryUserPermissions: function() {
    var that = this;
    
    wx.getStorage({
      key: 'gongsi',
      success: function(gongsiRes) {
        wx.getStorage({
          key: 'system',
          success: function(systemRes) {
            let companyName = gongsiRes.data;
            let systemName = systemRes.data;
            
            console.log('想要获取公司名称:', companyName);
            console.log('获取系统名称:', systemName);
            that.setData({
              gongsi: companyName,
              system: systemName,
              jizhu_panduan: true
            });
            
            console.log('=== 开始调用云函数（分批获取）===')
            
            // 先获取非图片的基础信息
            that.queryBasicInfo(companyName, systemName);
          }
        })
      }
    })
  },
  
  // 第一步：获取基础信息（不包含图片）
  queryBasicInfo: function(companyName, systemName) {
    var that = this;
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: `SELECT topgao,xuankuan,xuangao,textbox,beizhu1 
                FROM yh_notice.dbo.product_pushnews 
                WHERE gsname='${companyName}' 
                AND xtname='云合未来财务系统' 
                AND ((qidate IS NULL OR GETUTCDATE() >= CONVERT(DATETIME, LEFT(qidate, 10), 120)) 
                AND (zhidate IS NULL OR GETUTCDATE() <= CONVERT(DATETIME, LEFT(zhidate, 10), 120)))`
      },
      success: res => {
        var pushdata = res.result.recordset;
        if (pushdata && pushdata.length > 0) {
          const firstItem = pushdata[0];
          
          if(firstItem.beizhu1 == "隐藏广告"){
            that.hideBanner();
            that.closeXuanTu();
            return;
          }
  
          let marqueeText = firstItem.textbox || '暂无公告信息';
          let xuankuan = firstItem.xuankuan ? firstItem.xuankuan + 'px' : '300rpx';
          let xuangao = firstItem.xuankuan ? firstItem.xuangao + 'px' : '300rpx';
          let topgao = firstItem.topgao ? firstItem.topgao + 'px' : '200rpx';
  
          // 先设置基础信息
          that.setData({ 
            marqueeText: marqueeText,
            xuanTuStyle: `width: ${xuankuan};height: ${xuangao};`,
            topTuStyle: `height: ${topgao};`
          });
          
          // 第二步：分批获取图片数据
          that.queryImageData(companyName, systemName);
        }
      },
      fail: err => {
        console.error('获取基础信息失败:', err);
      }
    });
  },
  
 // 第二步：逐字段获取图片数据（最保险的方案）
queryImageData: function(companyName, systemName) {
  var that = this;
  
  // 逐个字段获取，确保每次只获取一个图片
  const imageFields = ['tptop1', 'tptop2', 'tptop3', 'tptop4', 'tptop5', 'tptop6'];
  
  let currentIndex = 0;
  let singleImage = '';
  let bannerImages = [];
  
  function fetchNextField() {
    if (currentIndex >= imageFields.length) {
      // 所有图片数据获取完成
      that.setData({ 
        singleImage: singleImage,
        bannerImages: bannerImages,
        hasSingleImage: !!singleImage,
        hasBannerImages: bannerImages.length > 0
      });
      
      if (singleImage) {
        that.testImageLoad(singleImage, '单独图片');
      }
      if (bannerImages.length > 0) {
        that.testImageLoad(bannerImages[0], '轮播图第一张');
      }
      return;
    }
    
    const fieldName = imageFields[currentIndex];
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: `SELECT ${fieldName} 
                FROM yh_notice.dbo.product_pushnews 
                WHERE gsname='${companyName}' 
                AND xtname='云合未来财务系统' 
                AND ((qidate IS NULL OR GETUTCDATE() >= CONVERT(DATETIME, LEFT(qidate, 10), 120)) 
                AND (zhidate IS NULL OR GETUTCDATE() <= CONVERT(DATETIME, LEFT(zhidate, 10), 120)))`
      },
      success: res => {
        var imageData = res.result.recordset;
        if (imageData && imageData.length > 0) {
          const item = imageData[0];
          const rawData = item[fieldName];
          
          if (rawData && rawData.trim() !== '') {
            // 检查数据大小
            const dataSize = rawData.length;
            const sizeInKB = Math.round(dataSize / 1024);
            console.log(`图片 ${fieldName} 大小: ${sizeInKB}KB`);
            
            // 如果图片太大，跳过并记录警告
            if (sizeInKB > 500) { // 500KB限制
              console.warn(`图片 ${fieldName} 过大(${sizeInKB}KB)，已跳过`);
            } else {
              const cleanedData = rawData
                .replace(/\r?\n|\r/g, '')
                .replace(/\s/g, '')
                .trim();
              
              let mimeType = 'image/jpeg';
              if (cleanedData.startsWith('iVBORw0KGgo')) {
                mimeType = 'image/png';
              } else if (cleanedData.startsWith('/9j/')) {
                mimeType = 'image/jpeg';
              }
              
              const finalUrl = `data:${mimeType};base64,${cleanedData}`;
              
              // tptop1 单独处理，其他作为轮播图
              if (fieldName === 'tptop1') {
                singleImage = finalUrl;
                console.log('单独图片 tptop1 已设置');
              } else {
                bannerImages.push(finalUrl);
                console.log(`轮播图添加 ${fieldName}`);
              }
            }
          }
        }
        
        currentIndex++;
        // 继续获取下一个字段，增加延迟避免请求过快
        setTimeout(fetchNextField, 200);
      },
      fail: err => {
        console.error(`获取图片字段 ${fieldName} 失败:`, err);
        
        // 如果是数据超限错误，尝试使用数据截取方案
        if (err.errMsg && err.errMsg.includes('exceed')) {
          console.log(`图片 ${fieldName} 数据超限，尝试分段获取`);
          that.fetchImageInChunks(companyName, systemName, fieldName, currentIndex);
        } else {
          currentIndex++;
          setTimeout(fetchNextField, 200);
        }
      }
    });
  }
  
  // 开始获取第一个图片字段
  fetchNextField();
},

// 分段获取大图片数据（如果单个字段也超限）
fetchImageInChunks: function(companyName, systemName, fieldName, fieldIndex) {
  var that = this;
  let chunkSize = 8000; // 每次获取8000字符
  let startPos = 0;
  let fullData = '';
  let chunkCount = 0;
  
  function fetchNextChunk() {
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: `SELECT SUBSTRING(${fieldName}, ${startPos + 1}, ${chunkSize}) as data_chunk 
                FROM yh_notice.dbo.product_pushnews 
                WHERE gsname='${companyName}' 
                AND xtname='云合未来财务系统' 
                AND ((qidate IS NULL OR GETUTCDATE() >= CONVERT(DATETIME, LEFT(qidate, 10), 120)) 
                AND (zhidate IS NULL OR GETUTCDATE() <= CONVERT(DATETIME, LEFT(zhidate, 10), 120)))`
      },
      success: res => {
        chunkCount++;
        var chunkData = res.result.recordset;
        if (chunkData && chunkData.length > 0) {
          const chunk = chunkData[0].data_chunk;
          if (chunk) {
            fullData += chunk;
            console.log(`获取 ${fieldName} 第${chunkCount}段数据，长度: ${chunk.length}`);
            
            // 如果获取的数据长度小于chunkSize，说明是最后一段
            if (chunk.length < chunkSize) {
              processCompleteImage(fullData, fieldName, fieldIndex);
            } else {
              startPos += chunkSize;
              setTimeout(fetchNextChunk, 300);
            }
          } else {
            // 没有更多数据了
            processCompleteImage(fullData, fieldName, fieldIndex);
          }
        } else {
          processCompleteImage(fullData, fieldName, fieldIndex);
        }
      },
      fail: err => {
        console.error(`获取 ${fieldName} 第${chunkCount}段失败:`, err);
        // 即使失败也尝试处理已获取的数据
        processCompleteImage(fullData, fieldName, fieldIndex);
      }
    });
  }
  
  function processCompleteImage(imageData, fieldName, fieldIndex) {
    if (!imageData || imageData.trim() === '') {
      console.log(`图片 ${fieldName} 数据为空`);
      that.continueToNextField(fieldIndex + 1);
      return;
    }
    
    const cleanedData = imageData
      .replace(/\r?\n|\r/g, '')
      .replace(/\s/g, '')
      .trim();
    
    let mimeType = 'image/jpeg';
    if (cleanedData.startsWith('iVBORw0KGgo')) {
      mimeType = 'image/png';
    } else if (cleanedData.startsWith('/9j/')) {
      mimeType = 'image/jpeg';
    }
    
    const finalUrl = `data:${mimeType};base64,${cleanedData}`;
    
    // 更新到对应的数据中
    if (fieldName === 'tptop1') {
      that.singleImage = finalUrl;
      console.log('分段获取的单独图片 tptop1 已设置');
    } else {
      that.bannerImages.push(finalUrl);
      console.log(`分段获取的轮播图添加 ${fieldName}`);
    }
    
    that.continueToNextField(fieldIndex + 1);
  }
  
  // 开始获取第一段数据
  fetchNextChunk();
},

continueToNextField: function(nextIndex) {
  var that = this;
  const imageFields = ['tptop1', 'tptop2', 'tptop3', 'tptop4', 'tptop5', 'tptop6'];
  
  if (nextIndex >= imageFields.length) {
    // 所有字段获取完成，更新界面
    that.setData({ 
      singleImage: that.singleImage,
      bannerImages: that.bannerImages,
      hasSingleImage: !!that.singleImage,
      hasBannerImages: that.bannerImages.length > 0
    });
    
    if (that.singleImage) {
      that.testImageLoad(that.singleImage, '单独图片');
    }
    if (that.bannerImages.length > 0) {
      that.testImageLoad(that.bannerImages[0], '轮播图第一张');
    }
  } else {
    // 继续获取下一个字段
    setTimeout(() => {
      that.queryImageData(companyName, systemName);
    }, 200);
  }
}
  
})



