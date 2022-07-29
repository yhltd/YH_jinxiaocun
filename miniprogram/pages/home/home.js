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
      }
    ]
  },
  submit: function(e) {
    
    var that = this
    var index = e.currentTarget.dataset.index;
    if(!that.data.list[index].hid){
      return;
    }
    var id = that.data.id;
    var view_id = e.currentTarget.dataset.view_id;
    
    var gongsi = app.globalData.gongsi;
    var companyArr = gongsi.split("_")
    wx.showToast({
      title:'页面跳转中',
      icon:'none'
    })

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
        if(index == 9){
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
    wx.setNavigationBarTitle({
      title: '人资管理系统'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })

    var id = options.id;

    var _this = this;
    _this.setData({
      id
    })
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
          _this.setData({
            ["list["+i+"].hid"] : false
          })
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