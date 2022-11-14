// 100lie_page/pages/userpeople/userpeople.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gongsi:'',
    name:'',
    info:'',
    lie:'',
    renyuan:'',
    input:true,
    titil1:[
      {text:'A'}, {text:'B'}, {text:'C'}, {text:'D'}, {text:'E'},
      {text:'F'}, {text:'G'}, {text:'H'}, {text:'I'}, {text:'J'}, {text:'K'}, {text:'L'},
      {text:'M'},
    ],
    titil2:[
      {text:'N'}, {text:'O'}, {text:'P'}, {text:'Q'}, {text:'R'}, {text:'S'},
      {text:'T'}, {text:'U'}, {text:'V'}, {text:'W'}, {text:'X'}, {text:'Y'}, {text:'Z'},
    ],
    titil3:[
      {text:'AA'}, {text:'AB'}, {text:'AC'}, {text:'AD'}, {text:'AE'}, {text:'AF'}, {text:'AG'},
      {text:'AH'}, {text:'AI'}, {text:'AJ'}, {text:'AK'}, {text:'AL'}, {text:'AM'}
    ],
    titil4:[
      {text:'AN'},
      {text:'AO'}, {text:'AP'}, {text:'AQ'}, {text:'AR'}, {text:'ASS'}, {text:'AT'}, {text:'AU'},
      {text:'AV'}, {text:'AW'}, {text:'AX'}, {text:'AY'}, {text:'AZ'}
    ],
    titil5:[
      {text:'BA'}, {text:'BB'}, {text:'BC'}, {text:'BD'}, {text:'BE'}, {text:'BF'}, {text:'BG'},
      {text:'BH'}, {text:'BI'}, {text:'BJ'}, {text:'BK'}, {text:'BL'}, {text:'BM'}
    ],
    titil6:[
      {text:'BN'},
      {text:'BO'}, {text:'BP'}, {text:'BQ'}, {text:'BR'}, {text:'BS'}, {text:'BT'}, {text:'BU'},
      {text:'BV'}, {text:'BW'}, {text:'BX'}, {text:'BYY'}, {text:'BZ'},
    ],
    titil7:[
      {text:'CA'}, {text:'CB'}, {text:'CC'}, {text:'CD'}, {text:'CE'}, {text:'CF'}, {text:'CG'},
      {text:'CH'}, {text:'CI'}, {text:'CJ'}, {text:'CK'}, {text:'CL'}, {text:'CM'}
    ],
    titil8:[
      {text:'CN'},
      {text:'CO'}, {text:'CP'}, {text:'CQ'}, {text:'CR'}, {text:'CS'}, {text:'CT'}, {text:'CU'},
      {text:'CV'} 
    ],
    list:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var _this = this
    if(options!=undefined){
      var userInfo = JSON.parse(options.userInfo)
      that.setData({
        gongsi:userInfo.B,
        name:options.name,
        user:options.user,
        userInfo:userInfo,
      })
    }
    
    var sql="select ins,del,upd,sel from baitaoquanxian_department where company = '" + _this.data.userInfo.B + "' and department_name ='" + _this.data.userInfo.bumen + "' and view_name='工作台权限设置'"
    var that =this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){     
        var quanxian = res.result.recordset
        if(quanxian == []){
          wx.showToast({
            title: '未读取到部门权限信息，请联系管理员',
            icon:"none"
          })
          return;
        }else{
          _this.setData({
            zeng:quanxian[0].ins,
            shan:quanxian[0].del,
            gai:quanxian[0].upd,
            cha:quanxian[0].sel,
          })

          if(_this.data.cha != '是'){
            wx.showToast({
              title: '无查询权限',
              icon:"none"
            })
            return;
          }
          var sql = "select * from baitaoquanxian_gongsi where B = '" + that.data.gongsi + "' "
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data:{
              query : sql
            },
            success(res){
              var list = res.result.recordset
              that.setData({
                list,
                id:list[0].id
              })
            }
          })
        }
      }
    })

  },

  click:function(e){
    var _this = this
    var list = _this.data.list
    var index = e.currentTarget.dataset.index
    var colmun=e.currentTarget.dataset.clie
    var this_val =list[index][colmun]
    if(this_val != '√'){
      this_val = "√"
    }else{
      this_val = ""
    }
    var sql = "update baitaoquanxian_gongsi set " + colmun + "='" + this_val + "' where id =" + list[index].id
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query: sql
      },
      success(res){
        wx.showToast({
          title: '修改成功',
          icon:"none"
        })
        _this.onLoad()
      }
    })
  },


  use_book:function(){
    var _this = this
    wx.showModal({
      title: '使用说明',
      content: '1.此页面用于设置工作台的哪些列可以正常使用。\n2.点击对应列即可修改权限情况',
      showCancel: false, //是否显示取消按钮
      confirmText: "知道了", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {},
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },
onReady: function () {
  wx.showLoading({
    title: '加载中',
    mask : 'true'
  }) 
  setTimeout(function () {
    wx.hideLoading()
  }, 1000)
},
})