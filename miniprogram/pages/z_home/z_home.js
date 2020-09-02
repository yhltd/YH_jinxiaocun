const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : [],
    showList : [
      {
        text : "入库",
        url :　"../../packageZ/z_ruku/z_ruku"
      },{
        text : "出库",
        url :　"../../packageZ/z_chuku/z_chuku"
      },{
        text : "库存",
        url :　"../../packageZ/z_kucun/z_kucun"
      },{
        text : "订单汇总",
        url :　"../../packageZ/z_sum_xiaoshoujilu/z_sum_xiaoshoujilu"
      },{
        text : "用户管理",
        url :　"../../packageZ/z_yonghuguanli/z_yonghuguanli"
      },{
        text : "使用说明",
        url :　"cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/零售管理系统-使用说明.pdf"
      },{
        text : "退出",
        url :　""
      }
    ]
  },

  go : function(e){
    var _this = this;
    var index = e.currentTarget.dataset.index;
    var url = _this.data.showList[index].url
    if(url == ""){
      wx.showModal({
        title: '提示',
        content: '确认退出吗？',
        success (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 1,
            })
          } else if (res.cancel) {
            return
          }
        }
      })
    }else{
      if(_this.data.showList[index].text!="入库" && _this.data.showList[index].text!="出库" && _this.data.showList[index].text!="使用说明"){
        if(_this.data.userInfo.power!=1){
          wx.showModal({
            title : "提示",
            content : "只有管理员才能进入",
            showCancel : 'false'
          })
          return;
        }
      }
      if(_this.data.showList[index].text=="使用说明"){
        wx.showLoading({
          title: '打开使用说明',
          mask : true
        })
        wx.cloud.downloadFile({
          fileID: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/零售管理系统-使用说明.docx",
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
                console.log(res.fileList);
              }
            })
          }
        })
        return
      }
      wx.navigateTo({
        url: url+"?userInfo="+JSON.stringify(_this.data.userInfo) ,
      })
    }
  },

  init : function(){
    var _this = this;
    var userInfo = _this.data.userInfo;

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "exec sp_spaceused 'zeng_stock';exec sp_spaceused 'zeng_wares';exec sp_spaceused 'zeng_user';"
      },
      success: res => {
        var list = res.result.recordsets
        var list_space = []
        var usedSpace = 0

        for(let i=0;i<list.length;i++){
          list_space.push({name:list[i][0].name,size:Math.ceil(list[i][0].reserved.split(" ")[0]/list[i][0].rows)})
          usedSpace = parseInt(list[i][0].reserved.split(" ")[0])
          app.globalData.spaceList_z.usedSpace += usedSpace
        }
        app.globalData.spaceList_z.list_table = list_space
        _this.getSpace();
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
        query : "SELECT mark4 from control_soft_time where name = '曾洋洋钟'"
      },
      success : res=> {
        app.globalData.spaceList_z.allSpace = res.result.recordset[0].mark4*1024
        console.log(app.globalData.spaceList_z)
      }
      
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
    _this.getSpace()
    _this.init();
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