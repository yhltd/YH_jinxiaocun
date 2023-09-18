// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id : 0,
    list: [{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/rili.png",
        text: "考勤表",
        lianjie: "../../packageA/pages/1kaoqin/kaoqin",
        index: 1,
        hid : true
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/renyuanxinxiguanli.png",
        text: "人员信息管理",
        index: 2,
        hid : true,
        lianjie: "../../packageA/pages/1renyuanxinxiguanli/renyuanxinxiguanli",
      },{

        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/baopan.png",
        text: "报盘",
        index: 3,
        hid : true,
        lianjie: "../../packageA/pages/1baopan/baopan"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/shezhi.png",
        text: "配置表",
        index: 4,
        hid : true,
        lianjie: "../../packageA/pages/1peizhi/index",
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzimingxi.png",
        text: "工资明细",
        index: 5,
        hid : true,
        lianjie: "../../packageA/pages/1gongzimingxi/gongzimingxi",
      },{

        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/baoshui.png",
        text: "报税",
        index: 6,
        hid : true,
        lianjie: "../../packageA/pages/1baoshui/index"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/kaoqinjilu.png",
        text: "考勤记录",
        index: 7,
        hid : true,
        lianjie: "../../packageA/pages/1kaoqinjilu/kaoqinjilu",
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/bumenhuizong.png",
        text: "部门汇总",
        index: 8,
        hid : true,
        lianjie: "../../packageA/pages/1bumenhuizong/index",
      },{

        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/shebao.png",
        text: "社保",
        index: 9,
        hid : true,
        lianjie: "../../packageA/pages/1shebaohuizong/index"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gerenxinxi.png",
        text: "个人信息",
        index: 10,
        hid : true,
        lianjie: "../../packageA/pages/1renyuanjibenxinxi/index",
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gerensuodeshui.png",
        text: "个人所得税",
        index: 11,
        hid : true,
        lianjie: "../../packageA/pages/1gerensuodeshui/gerensuodeshui"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "工资条",
        index: 12,
        hid : true,
        lianjie: "../../packageA/pages/1gongzitiao/gongzitiao"
      },{
        url: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/gongzitiao.png",
        text: "生日提醒",
        index: 13,
        hid : true,
        lianjie: "../../packageA/pages/1shengri_tixing/shengri_tixing"
      }
    ]
  },
  submit: function(e) {
    console.log('跳转')
    var that = this
    var index = e.currentTarget.dataset.index;
    if(!that.data.list[index].hid){
      return;
    }
    var id = that.data.id;
    var view_id = e.currentTarget.dataset.view_id;
    var old_view_id = e.currentTarget.dataset.view_id;
    var gongsi = app.globalData.gongsi;
    var companyArr = gongsi.split("_")
    wx.showToast({
      title:'页面跳转中',
      icon:'none'
    })

    if(view_id == 13){
      view_id = 2
      old_view_id = 13
    }

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select [add],del,upd,sel from gongzi_renyuanManager where R_id = '"+id+"' and view_id = '"+view_id+"'"
      },
      success: res => {
        var access = [0,0,0,0];
        if(res.result.recordset.length!=0){
          var access  = res.result.recordset[0];
        }
        if(old_view_id == 13){
          wx.navigateTo({
            url: that.data.list[12].lianjie + '?access=' + JSON.stringify(access) +"&companyName="+companyArr[0]
          })
        }else if(index == 9){
          wx.navigateTo({
            url: that.data.list[index].lianjie + '?access=' + JSON.stringify(access) +"&companyName="+gongsi
          })
        }else{
          wx.navigateTo({
            url: that.data.list[index].lianjie + '?access=' + JSON.stringify(access) +"&companyName="+companyArr[0]
          })
        }
        
      }
    })




    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    wx.setNavigationBarTitle({
      title: '人资管理系统'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })

    var id = options.id;
    id = undefined
    if(id == undefined){
      wx.login({
        success: (res) => {
            console.log(res);
            _this.setData({
                wxCode: res.code,
            })
            // ====== 【获取OpenId】
            let m_code = _this.data.wxCode; // 获取code
            let m_AppId = app.globalData.this_id1 + app.globalData.this_id2 + app.globalData.this_id3 ; // appid
            let m_mi =  app.globalData.sec_dd1 + app.globalData.sec_dd2 + app.globalData.sec_dd3; // 小程序密钥
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
                    var sql = "select id from gongzi_renyuan where wechart_user = '" + _this.data.wxOpenId + "'"
                    console.log(sql)
                    wx.cloud.callFunction({
                      name: 'sqlServer_117',
                      data:{
                        query : sql
                      },
                      success(res){
                        console.log(res)
                        var list = res.result.recordset
                        console.log(list)
                        if(list.length > 0){
                          _this.setData({
                            id: list[0].id
                          })
                          _this.getLooks(_this,_this.data.id)
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
      _this.setData({
        id
      })
    }


  },

  getLooks : function(_this,id){
    wx.showLoading({
      title:"获取权限信息",
      mask:"true"
    })
    var sql = "select ren.look,[view].viewName from gongzi_renyuanManager as ren,gongzi_viewNames as [view] where ren.R_id = '"+id+"' and ren.view_id = [view].id";
    console.log(sql)
    var looks = [];
    wx.cloud.callFunction({ 
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        looks = res.result.recordset;
        var list = _this.data.list
        list:
        for(var i=0;i<list.length;i++){
          for(var j=0;j<looks.length;j++){
            if(list[i].text==looks[j].viewName){
              _this.setData({
                ["list["+i+"].hid"] : looks[j].look > 0
              })
              continue list
            }
          }
          if(i != 12){
            _this.setData({
              ["list["+i+"].hid"] : false
            })
          }
        }
        wx.hideLoading({
          complete: (res) => {},
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this = this;

    _this.getLooks(_this,_this.data.id)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})