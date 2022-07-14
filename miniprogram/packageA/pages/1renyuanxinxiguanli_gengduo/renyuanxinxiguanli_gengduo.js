const form = require("../../../components/utils/formValidation.js")
Page({
  data: {
    id: -1,
    list: [],
    length : 0,
    companyName : "",
    rqxzShow3:false,
    bumen_insert:"",
    gengduo_panduan:true
  },
  onLoad: function (options) {
    var that = this
    console.log("options.id", options.id)
    that.setData({
      id: options.id,
    })
      wx.setNavigationBarTitle({
        title: '修改信息'
      })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    console.log(that.data.id)
    if (options.id != undefined){
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select * from gongzi_renyuan where id=" + that.data.id
        },
        success: res => {
          that.setData({
            list: res.result.recordset,
            bumen_insert:res.result.recordset[0].C
          })
        },
        err: res => {
          console.log("错误!")
        }
      })
    }
  },
  formSubmit: function (e) {
    var that = this
    //表单规则
    let rules = [{
      name: "T",
      rule: ["required"], //可使用区间，此处主要测试功能
      msg: ["请输入现住址"]
    }, {
      name: 'U',
      rule: ['required'],
      msg: ["请输入家庭地址"]
    }, {
      name: 'V',
      rule: ['required'],
      msg: ["请输入银行卡支行"]
    }, {
      name: 'W',
      rule: ['required'],
      msg: ["请输入是否购买社保"]
    }, {
      name: 'X',
      rule: ['required'],
      msg: ["请输入公积金账号"]
    }, {
      name: 'Y',
      rule: ['required'],
      msg: ["请输入社保账号"]
    }, {
      name: 'Z',
      rule: ['required'],
      msg: ["请输入劳动合同签订有效期限"]
    }, {
      name: 'AA',
      rule: ['required'],
      msg: ["请输入劳动合同第二次续签"]
    }, {
      name: 'AB',
      rule: ['required'],
      msg: ["请输入备注"]
    }
  ]
    //进行表单检查
    let formData = e.detail.value;
    let checkRes = form.validation(formData, rules);
    var sql = "";
    var log = "";
    if (!checkRes) {
      wx.showToast({
        title: "验证通过,提交成功！",
        icon: "none"
      });
      var sql = "";
        sql = "update gongzi_renyuan set T = '" + formData.T + "',U ='" + formData.U + "',V = '" + formData.V + "',W = '" + formData.W + "',X = '" + formData.X + "',Y = '" + formData.Y + "',Z = '" + formData.Z + "',AA = '" + formData.AA + "',AB = '" + formData.AB + "' where id =" + that.data.id
        log = "修改成功！";
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: sql
          },
          success: res => {
            console.log(log)
            wx.showToast({
              title: log,
              icon: "none"
            })
            wx.navigateBack({
              complete: (res) => {},
            })
          },
          err: res => {
            console.log("错误!")
          }
        })
      
      console.log(formData)
    }else {
      wx.showToast({
        title: checkRes,
        icon: "none"
      });
    }
  },

  //清空数据按钮调用的函数
  formReset: function (e) {
    console.log("清空数据")
  }
})