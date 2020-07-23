const form = require("../../../components/utils/formValidation.js")
Page({
  data: {
    id: -1,
    list: [],
    length : 0,
    companyName : ""
  },
  onLoad: function (options) {
    var that = this
    console.log("options.id", options.id)
    that.setData({
      id: options.id,
      length : options.length,
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
      name: "name",
      rule: ["required", "minLength:2", "maxLength:10"], //可使用区间，此处主要测试功能
      msg: ["请输入姓名", "姓名必须2个或以上字符", "姓名不能超过10个字符"]
    }, {
      name: 'department',
      rule: ['required'],
      msg: ["请输入部门名"]
    }, {
      name: 'job',
      rule: ['required'],
      msg: ["请输入职务名"]
    }, {
      name: 'idcard',
      rule: ['required'],
      msg: ["请输入身份证号码"]
    }, {
      name: 'money',
      rule: ['required'],
      msg: ["请输入基本工资"]
    }, {
      name: 'card',
      rule: ['required'],
      msg: ["请输入银行卡号"]
    }, {
      name: 'date',
      rule: ['required'],
      msg: ["请输入入职时间"]
    }, {
      name: 'account',
      rule: ['required'],
      msg: ["请输入账号"]
    }, {
      name: 'pwd',
      rule: ['required'],
      msg: ["请输入密码"]
    }, {
      name: 'age',
      rule: ['required'],
      msg: ["请输入工龄"]
    }, {
      name: 'pwd2',
      rule: ['required'],
      msg: ["请确认密码"]
    }]
    //进行表单检查
    let formData = e.detail.value;
    if(formData.pwd!=formData.pwd2){
      wx.showToast({
        title: "请确认密码",
        icon: "none"
      });
      return
    }
    let checkRes = form.validation(formData, rules);
    var id = that.data.id;
    var sql = "";
    var log = "";
    if (!checkRes) {
      wx.showToast({
        title: "验证通过,提交成功！",
        icon: "none"
      });
      var sql = "";
      if(id==undefined || id==-1){
        console.log(sql)
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: "insert into gongzi_renyuan (B,C,D,E,F,G,H,I,J,K,L) values('" + formData.name + "','" + formData.department + "','" + formData.job + "','" + formData.idcard + "','" + formData.money + "','" + formData.card + "','" + formData.date + "','" + formData.account + "','" + formData.pwd + "','" + formData.age + "','"+that.data.companyName+"_hr');insert into gongzi_renyuanManager (R_id,[add],del,upd,sel,look,view_id) values((select @@identity),'1','1','1','1','1','1'),((select @@identity),'0','0','0','0','0','2'),((select @@identity),'1','1','1','1','1','3'),((select @@identity),'1','1','1','1','1','4'),((select @@identity),'1','1','1','1','1','5'),((select @@identity),'1','1','1','1','1','6'),((select @@identity),'1','1','1','1','1','7'),((select @@identity),'1','1','1','1','1','8'),((select @@identity),'1','1','1','1','1','9'),((select @@identity),'0','0','0','0','0','10'),((select @@identity),'1','1','1','1','1','11'),((select @@identity),'1','1','1','1','1','12')"
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
        log = sql;
      }else{
        sql = "update gongzi_renyuan set B = '" + formData.name + "',C ='" + formData.department + "',D = '" + formData.job + "',E = '" + formData.idcard + "',F = '" + formData.money + "',G = '" + formData.card + "',H = '" + formData.date + "',I = '" + formData.account + "',J = '" + formData.pwd + "',K = '" + formData.age + "' where id =" + that.data.id
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
      }
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