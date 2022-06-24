const form = require("../../../components/utils/formValidation.js")
const utils = require("../../../components/utils/utils.js")
Page({
  data: {
    id: '',
    list: [],
    companyName : "",
    nowDate : '',
  },
  onLoad: function (options) {
    var that = this
    console.log("options.id", options.id)
    that.setData({
      id: options.id,
      ['list[0].BC']: utils.getDate(),
      companyName : options.companyName
    })
    wx.setNavigationBarTitle({
      title: '修改信息'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    console.log(that.data.id)
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select * from gongzi_renyuan where id=" + that.data.id
      },
      success: res => {
        that.setData({
          list: res.result.recordset,
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

  },
  formSubmit: function (e) {
    var that = this
    //表单规则
    let rules = [{
      name: "B",
      rule: ["required"], //可使用区间，此处主要测试功能
      msg: ["请输入姓名"]
    }, {
      name: 'C',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'D',
      rule: ['required'],
      msg: ["请输入职务名"]
    }, {
      name: "E",
      rule: ["required"],
      msg: ["请输入身份证号码", "请输入正确的身份证号码"]
    }, {
      name: "F",
      rule: ["required"],
      msg: ["请输入入职时间"]
    }, {
      name: "G",
      rule: ["required"],
      msg: ["请输入基本工资"]
    }, {
      name: "BA",
      rule: ["required"],
      msg: ["请输入银行卡号"]
    }];
    //进行表单检查
    var formData = e.detail.value;
    var checkRes = form.validation(formData, rules);
    if (!checkRes) {
      wx.showToast({
        title: "验证通过,提交成功！",
        icon: "none"
      });
      var sql = "insert into gongzi_gongzimingxi (B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP,AQ,AR,ASA,ATA,AU,AV,AW,AX,AY,AZ,BA,BB,BC,BD) values('" + formData.B + "','" + formData.C + "','" + formData.D + "','" + formData.E + "','" + formData.F + "','" + formData.G + "','" + formData.H + "','" + formData.I + "','" + formData.J + "','" + formData.K + "','" + formData.L + "','" + formData.M + "','" + formData.N + "','" + formData.O + "','" + formData.P + "','" + formData.Q + "','" + formData.R + "','" + formData.S + "','" + formData.T + "','" + formData.U + "','" + formData.V + "','" + formData.W + "','" + formData.X + "','" + formData.Y + "','" + formData.Z + "','" + formData.AA + "','" + formData.AB + "','" + formData.AC + "','" + formData.AD + "','" + formData.AE + "','" + formData.AF + "','" + formData.AG + "','" + formData.AH + "','" + formData.AI + "','" + formData.AJ + "','" + formData.AK + "','" + formData.AL + "','" + formData.AM + "','" + formData.AN + "','" + formData.AO + "','" + formData.AP + "','" + formData.AQ + "','" + formData.AR + "','" + formData.ASA + "','" + formData.ATA + "','" + formData.AU + "','" + formData.AV + "','" + formData.AW + "','" + formData.AX + "','" + formData.AY + "','" + formData.AZ + "','" + formData.BA + "','" + formData.BB + "','" + formData.BC + "','"+that.data.companyName+"')"
      console.log(sql);
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: sql
        },
        success: res => {
          console.log("修改成功！")
          wx.showToast({
            title: '修改成功！',
            icon:"none"
          })
          wx.navigateBack({
            complete: (res) => {},
          })
        },
        err: res => {
          console.log("错误!")
        }
      })
    } else {
      wx.showToast({
        title: checkRes,
        icon: "none"
      });
    }
  },


  //清空数据按钮调用的函数
  formReset: function (e) {
    console.log("清空数据")
  },

  updateDate: function(e){
    this.setData({
      ['list[0].' + e.currentTarget.dataset.column]: e.detail.value
    })
  }
})