// 100lie_page/pages/gongzuotaigongs/gongzuotaigongs.js
// packageP/page/PaiChanHeDui/PaiChanHeDui.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  xgShow: false,
  tjShow:false,
  data: {
    list: [],
    title: [{
      text: "序号",
      width: "200rpx",
      columnName: "id",
      type: "text",
      isupd: true
    },
    {
      text: "列",
      width: "200rpx",
      columnName: "thiscolumn",
      type: "text",
      isupd: true
    },
    {
      text: "公式",
      width: "350rpx",
      columnName: "gongshi",
      type: "text",
      isupd: true
    },
   
    ],
    id: "",
    thiscolumn: "",
    gongshi: "",
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    // let user = _this.data.userInfo.Company;
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo
    })
    console.log(userInfo.B)
    _this.tableShow()
  },

  tableShow: function () {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select id,thiscolumn,gongshi from baitaoquanxian_jisuan where company='" + _this.data.userInfo.B + "'"
      },
      success: res => {
        var list = res.result.recordset
        _this.setData({
          list:list,
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

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },

 

  selRIQI1: function () {
    var _this = this
    _this.setData({
      rqxzShow1: true,
    })
  },

  inquire: function () {
    var _this = this
    _this.setData({
      tjShow: true,
      rq: "",
      thiscolumn: "",
      gongshi: "",
      gongshi: "",
    })
  },

  qxShow: function () {
    var _this = this
    _this.setData({
      xgShow: false,
      tjShow:false,
      rq: "",
      thiscolumn: "",
      gongshi: "",
      gongshi: "",
    })
  },

  

  clickView:function(e){
    var _this = this
    console.log(_this.data.list[e.currentTarget.dataset.index].id)
    _this.setData({
      id: _this.data.list[e.currentTarget.dataset.index].id, 
      thiscolumn: _this.data.list[e.currentTarget.dataset.index].thiscolumn, 
      gongshi: _this.data.list[e.currentTarget.dataset.index].gongshi, 
      xgShow:true,
    })
   
  },

  // add1: function () {
  //   var _this = this
  //   let user = _this.data.userInfo.Company;
  //   if(_this.data.thiscolumn == "" || _this.data.gongshi == ""){
  //     wx.showToast({
  //       title: '信息填写不全',
  //       icon :'none',
  //     })
  //     return;
  //   }
  //   var this_gongshi = _this.data.gongshi
  //   var lie = ""
  //   for(var i=0; i<this_gongshi.length;i++){
  //     var this_str = this_gongshi.substring(i,i+1)
  //     var this_asc = this_gongshi.charCodeAt(i)
  //     console.log(this_asc)
  //     if((this_asc >= 65 && this_asc <= 90) || (this_asc >= 97 && this_asc <= 122)){
  //       lie = lie + this_str
  //     }else{
  //       if(_this.data.thiscolumn.toUpperCase() == lie.toUpperCase()){
  //         wx.showToast({
  //           title: '设置公式的列不能包含本身',
  //           icon :'none',
  //         })
  //         return;
  //       }
  //       lie = ""
  //     }
  //   }
  //   wx.cloud.callFunction({
  //     name: 'sqlServer_117',
  //     data: {
  //       query: "insert into baitaoquanxian_jisuan(thiscolumn,gongshi,Company) values('" + _this.data.thiscolumn + "','" + _this.data.gongshi + "','"+ _this.data.userInfo.B +"')"
  //     },
  //     success: res => {
  //       _this.setData({
  //         rq: "",
  //         thiscolumn: "",
  //         gongshi: "",
  //       })
  //       _this.qxShow()
       
  //       _this.tableShow()
  //       wx.showToast({
  //         title: '添加成功！',
  //         icon: 'none'
  //       })
  //     },
  //     err: res => {
  //       console.log("错误!")
  //     },
  //     fail: res => {
  //       wx.showToast({
  //         title: '请求失败！',
  //         icon: 'none'
  //       })
  //       console.log("请求失败！")
  //     }
  //   })
    
  // },
//-------新0130
add1: function () {
  var _this = this
  let user = _this.data.userInfo.Company;
  if(_this.data.thiscolumn == "" || _this.data.gongshi == ""){
    wx.showToast({
      title: '信息填写不全',
      icon :'none',
    })
    return;
  }
  
  // 首先检查是否已存在相同的列
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: "SELECT COUNT(*) as count FROM baitaoquanxian_jisuan WHERE thiscolumn = '" + _this.data.thiscolumn + "' AND Company = '" + _this.data.userInfo.B + "'"
    },
    success: res => {
      var count = res.result.recordset[0].count;
      
      if (count > 0) {
        // 已存在相同的列
        wx.showModal({
          title: '提示',
          content: '页面已有该列"' + _this.data.thiscolumn + '"的公式，是否前往修改？',
          confirmText: '前往修改',
          cancelText: '取消',
          success: function(res) {
            if (res.confirm) {
              // 用户确认前往修改，查找该列的ID并设置到编辑状态
              wx.cloud.callFunction({
                name: 'sqlServer_117',
                data: {
                  query: "SELECT id FROM baitaoquanxian_jisuan WHERE thiscolumn = '" + _this.data.thiscolumn + "' AND Company = '" + _this.data.userInfo.B + "'"
                },
                success: res => {
                  if (res.result.recordset.length > 0) {
                    _this.setData({
                      id: res.result.recordset[0].id,
                      xgShow: true, // 显示修改弹窗
                      tjShow: false // 隐藏添加弹窗
                    })
                    
                    // 获取该列的公式信息并填充到表单
                    wx.cloud.callFunction({
                      name: 'sqlServer_117',
                      data: {
                        query: "SELECT gongshi FROM baitaoquanxian_jisuan WHERE id = '" + _this.data.id + "'"
                      },
                      success: res => {
                        if (res.result.recordset.length > 0) {
                          _this.setData({
                            gongshi: res.result.recordset[0].gongshi
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        })
        return;
      }
      
      // 继续原来的验证逻辑
      var this_gongshi = _this.data.gongshi
      var lie = ""
      for(var i=0; i<this_gongshi.length;i++){
        var this_str = this_gongshi.substring(i,i+1)
        var this_asc = this_gongshi.charCodeAt(i)
        console.log(this_asc)
        if((this_asc >= 65 && this_asc <= 90) || (this_asc >= 97 && this_asc <= 122)){
          lie = lie + this_str
        }else{
          if(_this.data.thiscolumn.toUpperCase() == lie.toUpperCase()){
            wx.showToast({
              title: '设置公式的列不能包含本身',
              icon :'none',
            })
            return;
          }
          lie = ""
        }
      }
      
      // 执行添加操作
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "insert into baitaoquanxian_jisuan(thiscolumn,gongshi,Company) values('" + _this.data.thiscolumn + "','" + _this.data.gongshi + "','"+ _this.data.userInfo.B +"')"
        },
        success: res => {
          _this.setData({
            rq: "",
            thiscolumn: "",
            gongshi: "",
          })
          _this.qxShow()
         
          _this.tableShow()
          wx.showToast({
            title: '添加成功！',
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
    err: res => {
      console.log("检查重复列错误!")
    }
  })
},

  upd1:function(){
    var _this = this
    if(_this.data.thiscolumn == "" || _this.data.gongshi == ""){
      wx.showToast({
        title: '信息填写不全',
        icon :'none',
      })
      return;
    }
    var this_gongshi = _this.data.gongshi
    var lie = ""
    for(var i=0; i<this_gongshi.length;i++){
      var this_str = this_gongshi.substring(i,i+1)
      var this_asc = this_gongshi.charCodeAt(i)
      console.log(this_asc)
      if((this_asc >= 65 && this_asc <= 90) || (this_asc >= 97 && this_asc <= 122)){
        lie = lie + this_str
      }else{
        if(_this.data.thiscolumn.toUpperCase() == lie.toUpperCase()){
          wx.showToast({
            title: '设置公式的列不能包含本身',
            icon :'none',
          })
          return;
        }
        lie = ""
      }
    }
    wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "update baitaoquanxian_jisuan set thiscolumn='" + _this.data.thiscolumn + "',gongshi='" + _this.data.gongshi + "' where id='" + _this.data.id + "'"
        },
        success: res => {
          _this.setData({
            rq: "",
            thiscolumn: "",
            gongshi: "",
            
          })
          _this.qxShow()
          
          _this.tableShow()

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
    
  },
  del1:function(){
    var _this = this
    console.log(_this.data.id)
    wx.showModal({
      title: '提示',
      content: '确认删除此行数据？',
      success (res) {
        if (res.confirm) {
          var sql ="delete from baitaoquanxian_jisuan where id='" + _this.data.id + "'"
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: sql
            },
            success: res => {
              console.log(sql)
              _this.setData({
                id: "",
                thiscolumn: "",
                gongshi: "",
              })
              _this.qxShow()
              _this.tableShow()
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
        } else if (res.cancel) {

        }
      }
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