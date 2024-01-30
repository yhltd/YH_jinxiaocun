// packageP/page/ZhangHaoGuanLi/ZhangHaoGuanLi.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  //
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  rqxzShow2: false,
  rqxzShow3: false,
  //
  tjShow:false,
  xgShow: false,
  cxShow: false,
  data: {
    list:[],
    title: [{ text: "账号", width: "275rpx", columnName: "user_code", type: "digit", isupd: true },
            { text: "密码", width: "275rpx", columnName: "password", type: "text", isupd: true },
            { text: "部门", width: "200rpx", columnName: "department_name", type: "text", isupd: true },
            { text: "状态", width: "200rpx", columnName: "state", type: "text", isupd: true },
            { text: "绑定微信", width: "200rpx", columnName: "wechart_user2", type: "text", isupd: true },
          ],
    zh:"",
    mm:"",
    bm:"",
    id:"",
    // 新增代码
    isdis: '',
    isdischa: '',
    isdisgai:'',
    isdisshan:'',
    zhuangtai_list:['正常','禁用']
    //结束
  },

  panduanquanxian: function () {
    var _this = this
    _this.setData({
      isdis: 1,
      isdischa:1,
      isdisgai:1,
      isdisshan:1
    });
    //读取缓存    
    var department_list1 = wx.getStorageSync('department_list')
    var paibanbiao_renyuan_bumen1 = wx.getStorageSync('paibanbiao_renyuan_bumen')
    console.log(department_list1)
    console.log(paibanbiao_renyuan_bumen1)
    for (let i = 0; i < department_list1.length; i++) {
      console.log(department_list1[i].department_name + "ffff" + paibanbiao_renyuan_bumen1)
      if (department_list1[i].department_name == paibanbiao_renyuan_bumen1 && department_list1[i].view_name == "账号管理") {
        console.log(department_list1[i])
        //添加没权限
        if (department_list1[i].add == "否") {
          _this.setData({
            isdis: 2            
          });
          // console.log("否 isdis："+_this.data.isdis)
        } else {
          _this.setData({
            isdis: 1           
          });
         // console.log("是 isdis："+_this.data.isdis)

        }
        //修改没权限
        if (department_list1[i].upd == "否") {
          _this.setData({           
            isdisgai:2
          });
        } else {
          _this.setData({           
            isdisgai:1
          });

        }
        //删除没权限
        if (department_list1[i].del == "否") {
          _this.setData({           
            isdisshan:2
          });
          console.log("否 isdisshan："+_this.data.isdisshan)
        } else {
          _this.setData({           
            isdisshan:1
          });
          
          console.log("是 isdisshan："+_this.data.isdisshan)
        }
        //查询没权限
        if (department_list1[i].sel == "否") {
          _this.setData({           
            isdischa:2
          });
        } else {
          _this.setData({           
            isdischa:1
          });

        }
        console.log(_this.data.isdis)

      }
    }
  },

  tableShow: function (e) {
    var _this = this
    let user = app.globalData.gongsi;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select *,case when isnull(wechart_user,'') = '' then '未绑定' else '已绑定' end as wechart_user2 from user_info where company = '" + user + "' and user_code like '%" + e[0] + "%'" 
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list: list
        })
        console.log(list)

      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      }
    })
  },

  bindPickerChange: function(e) {
    var _this = this
    this.setData({
      zt: _this.data.zhuangtai_list[e.detail.value]
    })
  },

  inquire:function(){
    var _this = this
    var userNum = app.globalData.userNum
    if(userNum != undefined && userNum != null){
      if(userNum != ""){
        var sql = "select count(id) as id from user_info where company ='" + app.globalData.gongsi + "'"
        wx.cloud.callFunction({
          name: 'sqlServer_PC',
          data: {
            query: sql
          },
          success: res => {
            console.log(res.result.recordset[0].id)
            console.log(userNum)
            if(res.result.recordset[0].id * 1 >= userNum * 1){
              wx.showToast({
                title: '已有账号数量过多，请删除无用账号后再试！',
                icon: 'none'
              })
            }else{
              _this.setData({
                tjShow: true
              })
            }
          },
          err: res => {
            console.log("错误!")
          },
          fail: res => {
            wx.showToast({
              title: '请求失败！',
              icon: 'none',
              duration: 3000
            })
            console.log("请求失败！")
          }
        })
      }else{
        _this.setData({
          tjShow: true
        })
      }
    }else{
      _this.setData({
        tjShow: true
      })
    }

  },

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow:false,
      xgShow: false,
      cxShow:false,
      zh: "",
      mm: "",
      bm: "",
      zt:"",
    })
  },

  del1:function(){
    var _this = this
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "delete from user_info where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            zh:"",
            mm:"",
            bm:""
          })
          _this.qxShow()
          var e = ['']
          _this.tableShow(e)
          wx.showToast({
            title: '删除成功！',
            icon: 'none'
          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          console.log("请求失败！")
        }
      })
  },
  add1:function(){
    var _this=this
    let user = app.globalData.gongsi;
    if (_this.data.zh != "" && _this.data.mm != "" && _this.data.bm !="" && _this.data.zt !=""){
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "insert into user_info(user_code,password,department_name,company,state) values('" + _this.data.zh + "','" + _this.data.mm + "','" + _this.data.bm + "','" + user + "','" + _this.data.zt + "')"
      },
      success: res => {
        _this.setData({
          zh:"",
          mm:"",
          bm:"",
          zt:"",
        })
        _this.qxShow()
        var e = ['']
        _this.tableShow(e)
        wx.showToast({
          title: '添加成功！',
          icon: 'none'
        })
        wx.hideLoading({

        })
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    }) 
          
    // ------------------------------------
          // },
    }else{
      wx.showToast({
        title: '信息输入不全！',
        icon: 'none'
      })
    
  }
  },

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  clickView:function(e){
    var _this = this
    if(e.currentTarget.dataset.column == "wechart_user2"){
      var list = _this.data.list
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
                          var sql = "update user_info set wechart_user = '" + _this.data.wxOpenId + "' where id=" +  list[index].id
                          console.log(sql)
                          wx.cloud.callFunction({
                            name: 'sqlServer_PC',
                            data:{
                              query : sql
                            },
                            success(res){
                              console.log(res)
                              wx.showToast({
                                title: '绑定成功',
                                icon:"none"
                              })
                              var e = ['']
                              _this.tableShow(e)
                            }
                          })
                      }
                  })
              }
          })
          }
        }
      })
    }else{
      _this.setData({
        zh: _this.data.list[e.currentTarget.dataset.index].user_code, 
        mm: _this.data.list[e.currentTarget.dataset.index].password,
        bm: _this.data.list[e.currentTarget.dataset.index].department_name,
        id: _this.data.list[e.currentTarget.dataset.index].id,
        xgShow:true,
      })
    }
  },

  jiebang:function(e){
    var _this = this
    var list = _this.data.list
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '是否解除此账号的微信绑定？',
      success: function(res) {
        if (res.confirm) {
          var sql = "update user_info set wechart_user = '' where id=" +  list[index].id 
          console.log(sql)
          wx.cloud.callFunction({
            name: 'sqlServer_PC',
            data:{
              query : sql
            },
            success(res){
              console.log(res)
              wx.showToast({
                title: '解绑成功',
                icon:"none"
              })
              var e = ['']
              _this.tableShow(e)
            }
          })
        }
      }
    })
  },

  upd1:function(){
    var _this = this
    let user = app.globalData.gongsi;
    if (_this.data.zh != "" && _this.data.mm != "" && _this.data.bm !="" && _this.data.zt !="") {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: "update user_info set user_code='" + _this.data.zh + "',password='" + _this.data.mm + "',department_name='" + _this.data.bm + "',state='" + _this.data.zt + "' where company='" + user + "' and id='" + _this.data.id +"'"
        },
        success: res => {
          _this.setData({
            zh: "",
            mm: "",
            bm: "",
            zt: "",
            id:""
          })
          _this.qxShow()
          var e = ['']
          _this.tableShow(e)

          wx.showToast({
            title: '修改成功！',
            icon: 'none'
          })
        },
        err: res => {
          console.log("错误!")
        },
        fail: res => {
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          console.log("请求失败！")
        }
      })
    } else {
      wx.showToast({
        title: '信息输入不全！',
        icon: 'none'
      })
    }
  },

  entering:function(){
    var _this=this
    _this.setData({
      cxShow:true,
    })
  },

  sel1:function(){
    var _this = this
    var e = [_this.data.zh]
    _this.tableShow(e)
    _this.qxShow()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    this.panduanquanxian()
    var e= ['']
    if (_this.data.isdischa == 1) {
      _this.tableShow(e)
    }
  },

  goto_yanshi: function(){
    wx.navigateTo({
      url: "../PC_mp4/PC_mp4?this_url=cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/pakageP_mp4/zhanghaoguanli.mp4"
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