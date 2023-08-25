// pages/dingdanxiangqing/dingdanxiangqing.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 4,//后端给的分数,显示相应的星星
    one_1: '',
    two_1: '',
    one_2: 0,
    two_2: 5

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      one_1: this.data.num,
      two_1: 5 - this.data.num
    })

    var id = options.id;
    that.setData({
      id: id
    })
    const db = wx.cloud.database();
    db.collection('todos').doc(id).get({
      success(res) {
        that.setData({
          all: res.data
        })
      }
    })

    db.collection('dizhi').where({
      _openid: openid,
    })
      .get({
        success: res => {
        
          that.setData({
            allll: res.data
          })
        }
      })

    var obj = wx.getStorageSync("openid")
    var openid = obj.openid;
    db.collection('shoucang').where({
      _openid: openid,
      id: id
    })
   .get({
        success: res => {
          // res.data 是包含以上定义的两条记录的数组
          console.log(res.data[0].zhuangtai)
          if (res.data[0].zhuangtai=="1"){
            var xiayibu="立即购买"
           var wuliu="代付款"
            var beijing = "cloud://yhltd-028b95.7968-yhltd-028b95/tupian/beijing1.png"
            that.setData({
              wuliu: wuliu,
              beijing: beijing,
              shijian:res.data[0].shijian,
              xiayibu:xiayibu
            })
          }
          else if (res.data[0].zhuangtai == "2") {
            var xiayibu = "正在发货"
           var wuliu = "发货中"
            var beijing = "cloud://yhltd-028b95.7968-yhltd-028b95/tupian/beijing2.png"
            that.setData({
              wuliu: wuliu,
              beijing: beijing,
              shijian: res.data[0].shijian,
               xiayibu: xiayibu
            })
          }
          else if (res.data[0].zhuangtai == "3") {
            var xiayibu = "收货"
           var wuliu = "代收货"
            var beijing = "cloud://yhltd-028b95.7968-yhltd-028b95/tupian/beijing3.png"
            that.setData({
              wuliu: wuliu,
              beijing: beijing,
              shijian: res.data[0].shijian,
              xiayibu: xiayibu
            })
          }
          else if (res.data[0].zhuangtai == "4") {
            var xiayibu = "评价"
           var wuliu= "待评价"
            var beijing = "cloud://yhltd-028b95.7968-yhltd-028b95/tupian/beijing4.png"
          
            that.setData({
              wuliu: wuliu,
              beijing: beijing,
              shijian: res.data[0].shijian,
              xiayibu: xiayibu
            })
          }

          that.setData({
            alll: res.data
          })
          }
          })
          },

  fahuozhong: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    console.log(id)
    var obj = wx.getStorageSync("openid")
    var openid = obj.openid;
    console.log(openid)
    const db = wx.cloud.database();
    db.collection('shoucang').where({
      _openid: openid,
      id: id
    })
      .get({
        success(res) {
          
          if (res.data[0].zhuangtai==4){
           var one_2=that.data.one_2
            var pingjia = e.detail.value.pingjia
            console.log(pingjia)
           console.log(one_2)
          db.collection('shoucang').doc(res.data[0]._id).update({
            data: {
              zhuangtai: 1,
              pingjia:pingjia,
              one_2:one_2
            },
            success: res => {
              wx.showToast({
                title: '评价成功',
              })
            },
          })
          }
         else if (res.data[0].zhuangtai == 3) {
            db.collection('shoucang').doc(res.data[0]._id).update({
              data: {
                zhuangtai: 4,
              },
              success: res => {
                wx.showToast({
                  title: '已收货',
                })
              },
            })
          }
           else  if (res.data[0].zhuangtai ==2) {
            db.collection('shoucang').doc(res.data[0]._id).update({
              data: {
                zhuangtai: 3,
              },
              success: res => {
                wx.showToast({
                  title: '发货中',
                })
              },
            })
          }
         else if (res.data[0].zhuangtai == 1) {
            db.collection('shoucang').doc(res.data[0]._id).update({
              data: {
                zhuangtai: 2,
              },
              success: res => {
                wx.showToast({
                  title: '购买成功',
                })
             
              },
            })
          }
        }
      })
   
  },
  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    if (in_xin === 'use_sc2') {
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
  }


})