const form = require("../../../components/utils/formValidation.js")
Page({
  data: {
    id: '',
    list: []
  },
  onLoad: function (options) {
    var that = this
    console.log("options.id", options.id)
    that.setData({
      id: options.id
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
      name: "name",
      rule: ["required", "isChinese", "minLength:2", "maxLength:10"], //可使用区间，此处主要测试功能
      msg: ["请输入姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过10个字符"]
    }, {
      name: 'department',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'job',
      rule: ['required'],
      msg: ["请输入职务名"]
    }, {
      name: "idcard",
      rule: ["required", "isIdCard"],
      msg: ["请输入身份证号码", "请输入正确的身份证号码"]
    }, {
      name: "money",
      rule: ["required"],
      msg: ["请输入基本工资"]
    }, {
      name: "card",
      rule: ["required"],
      msg: ["请输入银行卡号"]
    }, {
      name: "date",
      rule: ["required"],
      msg: ["请输入入职时间"]
    }, {
      name: "age",
      rule: ["required", "isNum", "range:[0,100]"],
      msg: ["请输入工龄", "请输入正确的工龄", "请输入正确的工龄范围：0-100"]
    }, {
      name: "account",
      rule: ["required"],
      msg: ["请输入账号"]
    }, {
      name: "pwd",
      rule: ["required", "isEnAndNo"],
      msg: ["请输入密码", "密码为8~20位数字和字母组合"]
    }, {
      name: "pwd2",
      rule: ["required", "isSame:pwd"],
      msg: ["请输入确认密码", "两次输入的密码不一致"]
    }];
    //进行表单检查
    let formData = e.detail.value;
    let checkRes = form.validation(formData, rules);
    if (!checkRes) {
      wx.showToast({
        title: "验证通过,提交成功！",
        icon: "none"
      });
      console.log(formData)
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "update gongzi_renyuan set B = '" + formData.name + "',C ='" + formData.department + "',D = '" + formData.job + "',E = '" + formData.idcard + "',F = '" + formData.money + "',G = '" + formData.card + "',H = '" + formData.date + "',I = '" + formData.account + "',J = '" + formData.pwd + "',K = '" + formData.age + "' where id =" + that.data.id
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
  }
})