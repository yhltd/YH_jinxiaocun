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
      name: "B",
      rule: ["required", "isChinese", "minLength:2", "maxLength:10"], //可使用区间，此处主要测试功能
      msg: ["请输入姓名", "姓名必须全部为中文", "姓名必须2个或以上字符", "姓名不能超过10个字符"]
    }, {
      name: 'C',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'D',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'E',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'F',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'G',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'H',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'I',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'J',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'K',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'L',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'M',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'N',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'O',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'P',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'Q',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'R',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'S',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'T',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'U',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'V',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'W',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'X',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'Y',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'Z',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AA',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AB',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AC',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AD',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AE',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AF',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AG',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AH',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AI',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AJ',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AK',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AL',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AM',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AN',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AO',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AP',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AQ',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AR',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'ASA',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'ATA',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AU',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AV',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AW',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AX',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AY',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'AZ',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'BA',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'BB',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'BC',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, ];
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