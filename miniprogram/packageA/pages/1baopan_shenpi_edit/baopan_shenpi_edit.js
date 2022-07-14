const form = require("../../../components/utils/formValidation.js")
Page({
  data: {
    id: -1,
    list: [],
    length : 0,
    companyName : "",
  },
  onLoad: function (options) {
    var that = this
    console.log("options.id", options.id)
    that.setData({
      id: options.id,
      companyName : options.companyName,
    })
    if(options.id == undefined){
      wx.setNavigationBarTitle({
        title: '添加信息'
      })
    }else{
      wx.setNavigationBarTitle({
        title: '修改信息'
      })
    }
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    if (options.id != undefined){
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select * from gongzi_shenpi where id=" + that.data.id
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
    }else{
      var this_list = [{
        shifa_gongzi:options.shifa,
        geren_zhichu:options.geren,
        qiye_zhichu:options.qiye,
        yuangong_renshu:options.yuangong,
        quanqin_tianshu:options.quanqin,
        shenpiren:'',
        riqi:''
      }]
      that.setData({
        list:this_list
      })
    }
  },
  formSubmit: function (e) {
    var that = this
    //表单规则
    let rules = [{
      name: "shifa_gongzi",
      rule: ["required"], //可使用区间，此处主要测试功能
      msg: ["请输入实发工资"]
    }, {
      name: 'geren_zhichu',
      rule: ['required'],
      msg: ["请输入个人支出"]
    }, {
      name: 'qiye_zhichu',
      rule: ['required'],
      msg: ["请输入企业支出"]
    }, {
      name: 'yuangong_renshu',
      rule: ['required'],
      msg: ["请输入员工人数"]
    }, {
      name: 'quanqin_tianshu',
      rule: ['required'],
      msg: ["请输入全勤天数"]
    }, {
      name: 'shenpiren',
      rule: ['required'],
      msg: ["请输入审批人"]
    }, {
      name: 'riqi',
      rule: ['required'],
      msg: ["请输入审批日期"]
    }
  ]
    //进行表单检查
    let formData = e.detail.value;
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
            query: "insert into gongzi_shenpi (shifa_gongzi,geren_zhichu,qiye_zhichu,yuangong_renshu,quanqin_tianshu,shenpiren,riqi,gongsi) values('" + formData.shifa_gongzi + "','" + formData.geren_zhichu + "','" + formData.qiye_zhichu + "','" + formData.yuangong_renshu + "','" + formData.quanqin_tianshu + "','" + formData.shenpiren + "','" + formData.riqi + "','" +that.data.companyName+"')"
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
        sql = "update gongzi_shenpi set shifa_gongzi = '" + formData.shifa_gongzi + "',geren_zhichu ='" + formData.geren_zhichu + "',qiye_zhichu = '" + formData.qiye_zhichu + "',yuangong_renshu = '" + formData.yuangong_renshu + "',quanqin_tianshu = '" + formData.quanqin_tianshu + "',shenpiren = '" + formData.shenpiren + "',riqi = '" + formData.riqi  + "' where id =" + that.data.id
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

  updateDate: function(e){
    this.setData({
      ['list[0].' + e.currentTarget.dataset.column]: e.detail.value
    })
  },

  //清空数据按钮调用的函数
  formReset: function (e) {
    console.log("清空数据")
  }
})