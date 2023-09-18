// miniprogram/pages/frmadminindex/frmadminindex.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    department: [{
      tag: "新建",
      icon: "pifuke color1"
    }, {
      tag: "查看",
      icon: "tuina color2"
    }],
    searchDoctor: [],
    selectnameValue: '',
    // list: [
    //   { id: 1, name: 1, checked: false },
    //   { id: 2, name: 2, checked: false },
    //   { id: 3, name: 3, checked: false },
    //   { id: 4, name: 4, checked: false },
    // ],
    select: [],
    listAll: [],
    shop: ['默认排序', '最新上拍', '即将结拍'],
    shopitem: 'name1'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // app.editTabBar1(); //底部栏
    const db = wx.cloud.database();
    var finduser = app.globalData.finduser
    var gongsi = app.globalData.gongsi


    db.collection('Yh_JinXiaoCun_user').doc('XJuFPYnnuWjci0CF').get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
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
    var that = this;
    var listAll = [];
    const db = wx.cloud.database();
    // db.collection('Yh_JinXiaoCun_user').get({
    //   success(res) {
    //     listAll.push(res.data)
    //     that.setData({
    //       listAll: listAll[0]
    //     },
    //       console.log(listAll)
    //     )
    //   }
    // })
    
    var gongsi = app.globalData.gongsi 
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select *,'1' as isShow,case when ifnull(wechart_user,'') = '' then '未绑定' else '已绑定' end as wechart_user2 from yh_jinxiaocun_user where gongsi = '" + gongsi + "'"
      },
      success(res) {
        console.log("成功", res)
        that.setData({
          listAll: res.result
        })
        console.log(listAll)
      },
      fail(res) {
        console.log("失败", res)
      }
    });

  },

  bangding:function(e){
    var _this = this
    var list = _this.data.listAll
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '是否使用当前微信绑定此账号？',
      success: function(res) {
        if (res.confirm) {
          var this_id = wx.getStorageSync('openid')
          console.log(this_id)
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
                        var sql = "update yh_jinxiaocun_user set wechart_user = '" + _this.data.wxOpenId + "' where _id='" +  list[index]._id + "'"
                        console.log(sql)
                        wx.cloud.callFunction({
                          name: 'sqlConnection',
                          data:{
                            sql : sql
                          },
                          success(res){
                            console.log(res)
                            wx.showToast({
                              title: '绑定成功',
                              icon:"none"
                            })
                            _this.onShow()
                          }
                        })
                    }
                })
            }
        })
        }
      }
    })
  },
  
  
  jiebang:function(e){
    var _this = this
    var list = _this.data.listAll
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '是否解除此账号的微信绑定？',
      success: function(res) {
        if (res.confirm) {
          var sql = "update yh_jinxiaocun_user set wechart_user = '' where _id='" +  list[index]._id + "'"
          console.log(sql)
          wx.cloud.callFunction({
            name: 'sqlConnection',
            data:{
              sql : sql
            },
            success(res){
              console.log(res)
              wx.showToast({
                title: '解绑成功',
                icon:"none"
              })
              _this.onShow()
            }
          })
        }
      }
    })
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
  searchFocus: function() {
    this.setData({
      searchClass: "inputFocus"
    });
  },
  searchBlur: function() {
    this.setData({
      searchClass: ""
    })
  },

  searchKey: function(e) {
    var _this = this;
    var listAll = _this.data.listAll;
    for(let i=0;i<listAll.length;i++){
      if(listAll[i].name.indexOf(e.detail.value)==-1){
        _this.setData({
          ["listAll["+i+"].isShow"] : 0
        })
      }else{
        _this.setData({
          ["listAll["+i+"].isShow"] : 1
        })
      }
    }
  },
  navgiate: function() {
    var _this = this
    var userNum = app.globalData.userNum
    console.log(userNum)
    var sql = "select count(_id) as id from yh_jinxiaocun_user where gongsi ='" + app.globalData.gongsi + "'"
    console.log(sql)
    if(userNum != undefined && userNum != null){
      if(userNum != ""){
        wx.cloud.callFunction({
          name: "sqlConnection",
          data: {
            sql: sql
          },
          success(res) {
            console.log("成功", res)
            console.log(res.result[0].id)
            if(res.result[0].id * 1 >= userNum * 1){
              wx.showToast({
                title: '已有账号数量过多，请删除无用账号后再试！',
                icon: 'none'
              })
            }else{
              wx.navigateTo({
                url: "/pages/frmadminform/frmadminform"
              });
            }
          },
          fail(res) {
            console.log("失败", res)
          }
        });
      }else{
        wx.navigateTo({
          url: "/pages/frmadminform/frmadminform"
        });
      }
    }else{
      wx.navigateTo({
        url: "/pages/frmadminform/frmadminform"
      });
    }
  },
  navgiate2: function(e) {
    wx.navigateTo({
      url: "/pages/frmedituser/frmedituser?_id=" + e.currentTarget.dataset.id
    });
  },
  bindAll: function(e) {


  },
  //单选
  select: function(e) {
    let selectValue = e.currentTarget.dataset.name
    let index = e.currentTarget.dataset.index;
    let listAll = this.data.listAll
    console.log('ss' + selectValue);

    let newli = 'listAll[' + index + '].checked';
    this.setData({
      [newli]: !this.data.listAll[index].checked,
      selectnameValue: selectValue
    })
    let li2 = this.data.listAll[index].checked
    if (li2 == false) {
      for (let i in this.data.select) {
        if (this.data.select[i] == selectValue) {
          this.data.select.splice(i, 1);
        }
      }
    } else {
      this.data.select.push(selectValue);
    }
    this.setData({
      shopitem: this.data.select,
    })
    //  console.log(this.data.select)
    console.log(this.data.shopitem)

  },
  bindshop: function(event) {
    var classify = event.currentTarget.dataset.classify;
    var that = this;

    console.log(classify) //输出的结果就是你点击的
    this.setData({
      shopitem: classify, //更新


    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})