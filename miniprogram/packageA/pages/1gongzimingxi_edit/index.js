const form = require("../../../components/utils/formValidation.js")
const utils = require("../utils/utils.js")
Page({
  data: {
    id: '',
    list: [],
    companyName : "",
    nowDate : '',
    panduan:'',
    renyuan_list:[],
    name_list:[],
    shebao_list:[],
    gongjijin_list:[],
    yiliaojishu_list:[],
    zhinajin_list:[],
    nianjin_jishu_list:[],
    lixi_list:[],
    kuadu_gongzi_list:[],
    jintie_list:[],
    nianjin1_list:[],
    yansuangongshi_list:[],
  },
  onLoad: function (options) {
    var that = this
    var panduan = ''
    var list = []

    const formatData = date => {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      return year + '-' + month + '-' + day
      // return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }

    console.log("options.id", options.id)
    if(options.id == '' || options.id == undefined){
      wx.setNavigationBarTitle({
        title: '添加信息'
      })
      var nowDate = formatData(new Date())
      panduan = "insert"
      list.push({
        B:'',
        C:'',
        D:'',
        E:'',
        F:'',
        G:'',
        H:'',
        I:'',
        J:'',
        K:'',
        L:'',
        M:'',
        N:'',
        O:'',
        P:'',
        Q:'',
        R:'',
        S:'',
        T:'',
        U:'',
        V:'',
        W:'',
        X:'',
        Y:'',
        Z:'',
        AA:'',
        AB:'',
        AC:'',
        AD:'',
        AE:'',
        AF:'',
        AG:'',
        AH:'',
        AI:'',
        AJ:'',
        AK:'',
        AL:'',
        AM:'',
        AN:'',
        AO:'',
        AP:'',
        AQ:'',
        AR:'',
        AS:'',
        AT:'',
        AU:'',
        AV:'',
        AW:'',
        AX:'',
        AY:'',
        AZ:'',
        BA:'',
        BB:'',
        BC:nowDate,
        BD:'',
      })
      that.setData({
        list: list,
      })
    }else{
      panduan = "update"
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select * from gongzi_gongzimingxi where id =" + options.id
        },
        success: res => {
            this.setData({
              list: res.result.recordset,
            })
        },
        err: res => {
          console.log("错误!", res)
        }
      })
      wx.setNavigationBarTitle({
        title: '修改信息'
      })
    }
    that.setData({
      id: options.id,
      companyName : options.companyName,
      panduan : panduan
    })

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select id,B,C,D,E,H,F,AC,AD,G from gongzi_renyuan where L='" + options.companyName + "_hr'"
      },
      success: res => {
        var this_list = res.result.recordset
        var name_list = []
        for(var i = 0; i < this_list.length;i++){
          name_list.push(
            this_list[i].B
          )
        }
        that.setData({
          renyuan_list: res.result.recordset,
          name_list:name_list
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select isnull(kaoqin,'') as kaoqin from gongzi_peizhi where gongsi='" + options.companyName + "' and kaoqin != ''"
      },
      success: res => {
        var this_list = res.result.recordset
        var kaoqin_list = []
        for(var i = 0; i < this_list.length;i++){
          kaoqin_list.push(
            this_list[i].kaoqin
          )
        }
        that.setData({
          shebao_list: kaoqin_list,
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select isnull(kaoqin_peizhi,'') as kaoqin_peizhi from gongzi_peizhi where gongsi='" + options.companyName + "' and kaoqin_peizhi != ''"
      },
      success: res => {
        var this_list = res.result.recordset
        var kaoqin_list = []
        for(var i = 0; i < this_list.length;i++){
          kaoqin_list.push(
            this_list[i].kaoqin_peizhi
          )
        }
        that.setData({
          gongjijin_list: kaoqin_list,
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select isnull(yiliao_jishu,'') as yiliao_jishu from gongzi_peizhi where gongsi='" + options.companyName + "' and yiliao_jishu != ''"
      },
      success: res => {
        var this_list = res.result.recordset
        var kaoqin_list = []
        for(var i = 0; i < this_list.length;i++){
          kaoqin_list.push(
            this_list[i].yiliao_jishu
          )
        }
        that.setData({
          yiliaojishu_list: kaoqin_list,
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select isnull(zhinajin,'') as zhinajin from gongzi_peizhi where gongsi='" + options.companyName + "' and zhinajin != ''"
      },
      success: res => {
        var this_list = res.result.recordset
        var kaoqin_list = []
        for(var i = 0; i < this_list.length;i++){
          kaoqin_list.push(
            this_list[i].zhinajin
          )
        }
        that.setData({
          zhinajin_list: kaoqin_list,
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select isnull(zhinajin,'') as zhinajin from gongzi_peizhi where gongsi='" + options.companyName + "' and zhinajin != ''"
      },
      success: res => {
        var this_list = res.result.recordset
        var kaoqin_list = []
        for(var i = 0; i < this_list.length;i++){
          kaoqin_list.push(
            this_list[i].zhinajin
          )
        }
        that.setData({
          zhinajin_list: kaoqin_list,
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select isnull(nianjin_jishu,'') as nianjin_jishu from gongzi_peizhi where gongsi='" + options.companyName + "' and nianjin_jishu != ''"
      },
      success: res => {
        var this_list = res.result.recordset
        var kaoqin_list = []
        for(var i = 0; i < this_list.length;i++){
          kaoqin_list.push(
            this_list[i].nianjin_jishu
          )
        }
        that.setData({
          nianjin_jishu_list: kaoqin_list,
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select isnull(nianjin_jishu,'') as nianjin_jishu from gongzi_peizhi where gongsi='" + options.companyName + "' and nianjin_jishu != ''"
      },
      success: res => {
        var this_list = res.result.recordset
        var kaoqin_list = []
        for(var i = 0; i < this_list.length;i++){
          kaoqin_list.push(
            this_list[i].nianjin_jishu
          )
        }
        that.setData({
          nianjin_jishu_list: kaoqin_list,
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select isnull(lixi,'') as lixi from gongzi_peizhi where gongsi='" + options.companyName + "' and lixi != ''"
      },
      success: res => {
        var this_list = res.result.recordset
        var kaoqin_list = []
        for(var i = 0; i < this_list.length;i++){
          kaoqin_list.push(
            this_list[i].lixi
          )
        }
        that.setData({
          lixi_list: kaoqin_list,
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select isnull(kuadu_gongzi,'') as kuadu_gongzi from gongzi_peizhi where gongsi='" + options.companyName + "' and kuadu_gongzi != ''"
      },
      success: res => {
        var this_list = res.result.recordset
        var kaoqin_list = []
        for(var i = 0; i < this_list.length;i++){
          kaoqin_list.push(
            this_list[i].kuadu_gongzi
          )
        }
        that.setData({
          kuadu_gongzi_list: kaoqin_list,
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select isnull(jintie,'') as jintie from gongzi_peizhi where gongsi='" + options.companyName + "' and jintie != ''"
      },
      success: res => {
        var this_list = res.result.recordset
        var kaoqin_list = []
        for(var i = 0; i < this_list.length;i++){
          kaoqin_list.push(
            this_list[i].jintie
          )
        }
        that.setData({
          jintie_list: kaoqin_list,
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select isnull(nianjin1,'') as nianjin1 from gongzi_peizhi where gongsi='" + options.companyName + "' and nianjin1 != ''"
      },
      success: res => {
        var this_list = res.result.recordset
        var kaoqin_list = []
        for(var i = 0; i < this_list.length;i++){
          kaoqin_list.push(
            this_list[i].nianjin1
          )
        }
        that.setData({
          nianjin1_list: kaoqin_list,
        })
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select isnull(yansuangongshi,'') as yansuangongshi from gongzi_peizhi where gongsi='" + options.companyName + "' and yansuangongshi != ''"
      },
      success: res => {
        var this_list = res.result.recordset
        var kaoqin_list = []
        for(var i = 0; i < this_list.length;i++){
          kaoqin_list.push(
            this_list[i].yansuangongshi
          )
        }
        that.setData({
          yansuangongshi_list: kaoqin_list,
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
      var sql = ""
      if(that.data.panduan == 'insert'){
        console.log(formData.AJ)
        sql = "insert into gongzi_gongzimingxi (B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,AE,AF,AG,AH,AI,AJ,AK,AL,AM,AN,AO,AP,AQ,AR,ASA,ATA,AU,AV,AW,AX,AY,AZ,BA,BB,BC,BD) values('" + formData.B + "','" + formData.C + "','" + formData.D + "','" + formData.E + "','" + formData.F + "','" + formData.G + "','" + formData.H + "','" + formData.I + "','" + formData.J + "','" + formData.K + "','" + formData.L + "','" + formData.M + "','" + formData.N + "','" + formData.O + "','" + formData.P + "','" + formData.Q + "','" + formData.R + "','" + formData.S + "','" + formData.T + "','" + formData.U + "','" + formData.V + "','" + formData.W + "','" + formData.X + "','" + formData.Y + "','" + formData.Z + "','" + formData.AA + "','" + formData.AB + "','" + formData.AC + "','" + formData.AD + "','" + formData.AE + "','" + formData.AF + "','" + formData.AG + "','" + formData.AH + "','" + formData.AI + "','" + formData.AJ + "','" + formData.AK + "','" + formData.AL + "','" + formData.AM + "','" + formData.AN + "','" + formData.AO + "','" + formData.AP + "','" + formData.AQ + "','" + formData.AR + "','" + formData.ASA + "','" + formData.ATA + "','" + formData.AU + "','" + formData.AV + "','" + formData.AW + "','" + formData.AX + "','" + formData.AY + "','" + formData.AZ + "','" + formData.BA + "','" + formData.BB + "','" + formData.BC + "','"+that.data.companyName+"')"
      }else{
        sql = "update gongzi_gongzimingxi set B='" + formData.B + "',C='" + formData.C + "',D='" + formData.D + "',E='" + formData.E + "',F='" + formData.F + "',G='" + formData.G + "',H='" + formData.H + "',I='" + formData.I + "',J='" + formData.J + "',K='" + formData.K + "',L='" + formData.L + "',M='" + formData.M + "',N='" + formData.N + "',O='" + formData.O + "',P='" + formData.P + "',Q='" + formData.Q + "',R='" + formData.R + "',S='" + formData.S + "',T='" + formData.T + "',U='" + formData.U + "',V='" + formData.V + "',W='" + formData.W + "',X='" + formData.X + "',Y='" + formData.Y + "',Z='" + formData.Z + "',AA='" + formData.AA + "',AB='" + formData.AB + "',AC='" + formData.AC + "',AD='" + formData.AD + "',AE='" + formData.AE + "',AF='" + formData.AF + "',AG='" + formData.AG + "',AH='" + formData.AH + "',AI='" + formData.AI + "',AJ='" + formData.AJ + "',AK='" + formData.AK + "',AL='" + formData.AL + "',AM='" + formData.AM + "',AN='" + formData.AN + "',AO='" + formData.AO + "',AP='" + formData.AP + "',AQ='" + formData.AQ + "',AR='" + formData.AR + "',ASA='" + formData.ASA + "',ATA='" + formData.ATA + "',AU='" + formData.AU + "',AV='" + formData.AV + "',AW='" + formData.AW + "',AX='" + formData.AX + "',AY='" + formData.AY + "',AZ='" + formData.AZ + "',BA='" + formData.BA + "',BB='" + formData.BB + "',BC='" + formData.BC + "' where id=" + that.data.id
      }
      console.log(sql);
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: sql
        },
        success: res => {
          console.log("成功！")
          if(that.data.panduan == 'insert'){
            wx.showToast({
              title: '添加成功！',
              icon:"none"
            })
          }else{
            wx.showToast({
              title: '修改成功！',
              icon:"none"
            })
          }
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
  },

  update_xiala: function(e){
    console.log(e)
    var _this = this
    if(e.currentTarget.dataset.list == 'shebao_list'){
      this.setData({
        ['list[0].' + e.currentTarget.dataset.column]: _this.data.shebao_list[e.detail.value]
      })
    }else if(e.currentTarget.dataset.list == 'gongjijin_list'){
      this.setData({
        ['list[0].' + e.currentTarget.dataset.column]: _this.data.gongjijin_list[e.detail.value]
      })
    }else if(e.currentTarget.dataset.list == 'yiliaojishu_list'){
      this.setData({
        ['list[0].' + e.currentTarget.dataset.column]: _this.data.yiliaojishu_list[e.detail.value]
      })
    }else if(e.currentTarget.dataset.list == 'zhinajin_list'){
      this.setData({
        ['list[0].' + e.currentTarget.dataset.column]: _this.data.zhinajin_list[e.detail.value]
      })
    }else if(e.currentTarget.dataset.list == 'nianjin_jishu_list'){
      this.setData({
        ['list[0].' + e.currentTarget.dataset.column]: _this.data.nianjin_jishu_list[e.detail.value]
      })
    }else if(e.currentTarget.dataset.list == 'lixi_list'){
      this.setData({
        ['list[0].' + e.currentTarget.dataset.column]: _this.data.lixi_list[e.detail.value]
      })
    }else if(e.currentTarget.dataset.list == 'kuadu_gongzi_list'){
      this.setData({
        ['list[0].' + e.currentTarget.dataset.column]: _this.data.kuadu_gongzi_list[e.detail.value]
      })
    }else if(e.currentTarget.dataset.list == 'jintie_list'){
      this.setData({
        ['list[0].' + e.currentTarget.dataset.column]: _this.data.jintie_list[e.detail.value]
      })
    }else if(e.currentTarget.dataset.list == 'nianjin1_list'){
      this.setData({
        ['list[0].' + e.currentTarget.dataset.column]: _this.data.nianjin1_list[e.detail.value]
      })
    }else if(e.currentTarget.dataset.list == 'yansuangongshi_list'){
      this.setData({
        ['list[0].' + e.currentTarget.dataset.column]: _this.data.yansuangongshi_list[e.detail.value]
      })
    }
  },

  update_name:function(e){
    var _this = this
    console.log(_this.data.list)
    this.setData({
      ['list[0].B']:_this.data.renyuan_list[e.detail.value].B,
      ['list[0].C']:_this.data.renyuan_list[e.detail.value].C,
      ['list[0].D']:_this.data.renyuan_list[e.detail.value].D,
      ['list[0].E']:_this.data.renyuan_list[e.detail.value].E,
      ['list[0].G']:_this.data.renyuan_list[e.detail.value].F,
      ['list[0].H']:_this.data.renyuan_list[e.detail.value].AC,
      ['list[0].F']:_this.data.renyuan_list[e.detail.value].H,
      ['list[0].BA']:_this.data.renyuan_list[e.detail.value].G,
    })
  },
  

  jisuan:function(){
    var that = this
    console.log(that.data.list)
    //岗位工资
    if(that.data.list[0].D != ''){
      console.log("select gangwei_gongzi from gongzi_peizhi where gangwei='" + that.data.list[0].D + "' and gongsi='" + that.data.companyName + "'")
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select gangwei_gongzi from gongzi_peizhi where gangwei='" + that.data.list[0].D + "' and gongsi='" + that.data.companyName + "'"
        },
        success: res => {
          if (res.result.recordset.length > 0){
            console.log(res.result.recordset)
            var this_list = that.data.list
            this_list[0].I = res.result.recordset[0].gangwei_gongzi
            that.setData({
              list:this_list
            })
          }
        },
        err: res => {
          console.log("错误!")
        }
      })
    }
    //考勤
    if(that.data.list[0].BC != '' && that.data.list[0].B != ''){
      console.log()
      var this_date = that.data.list[0].BC
      var this_date = this_date.substring(0, 7)
      console.log(this_date)
      var sql = "select AJ,AK,AL,AM,AN from gongzi_kaoqinjilu where AO='" + that.data.companyName + "' and year + '-' + moth ='" + this_date + "' and name ='" + that.data.list[0].B + "'"  
      console.log(sql)
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: sql
        },
        success: res => {
          console.log(res.result.recordset)
          if (res.result.recordset.length > 0){
            console.log(res.result.recordset)
            var this_list = that.data.list
            this_list[0].N = res.result.recordset[0].AM
            this_list[0].M = res.result.recordset[0].AK
            this_list[0].Q = res.result.recordset[0].AJ - res.result.recordset[0].AK
            this_list[0].S = res.result.recordset[0].AN
            that.setData({
              list:this_list
            })
          }
        },
        err: res => {
          console.log("错误!")
        }
      })
    }


    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select jiabanfei,queqin_koukuan,chidao_koukuan from gongzi_peizhi where gongsi='" + that.data.companyName + "'"
      },
      success: res => {
        console.log(res.result.recordset)
        if (res.result.recordset.length > 0){
          console.log(res.result.recordset)
          var this_list = that.data.list
          this_list[0].O = this_list[0].N * res.result.recordset[0].jiabanfei
          this_list[0].R = this_list[0].Q * res.result.recordset[0].queqin_koukuan
          this_list[0].T = this_list[0].S * res.result.recordset[0].chidao_koukuan
          that.setData({
            list:this_list
          })
        }
      },
      err: res => {
        console.log("错误!")
      }
    })

    if(that.data.list[0].G != ''){
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select geren_yiliao,qiye_yiliao,geren_yanglao,qiye_yanglao,geren_shengyu,qiye_shengyu,geren_gongjijin,qiye_gongjijin,geren_shiye,qiye_shiye,qiye_gongshang,geren_nianjin,qiye_nianjin from gongzi_peizhi where gongsi='" + that.data.companyName + "'"
        },
        success: res => {
          console.log(res.result)
          if (res.result.recordset.length > 0){
            console.log(res.result.recordset)
            var this_list = that.data.list
            this_list[0].Z = this_list[0].G * res.result.recordset[0].qiye_yanglao
            this_list[0].AA = this_list[0].G * res.result.recordset[0].qiye_shiye
            this_list[0].AB = this_list[0].G * res.result.recordset[0].qiye_yiliao
            this_list[0].AC = this_list[0].G * res.result.recordset[0].qiye_gongshang
            this_list[0].AD = this_list[0].G * res.result.recordset[0].qiye_shengyu
            this_list[0].AE = this_list[0].G * res.result.recordset[0].qiye_gongjijin
            this_list[0].AF = this_list[0].G * res.result.recordset[0].qiye_nianjin
            this_list[0].AJ = this_list[0].G * res.result.recordset[0].geren_yanglao
            this_list[0].AK = this_list[0].G * res.result.recordset[0].geren_shiye
            this_list[0].AL = this_list[0].G * res.result.recordset[0].geren_yiliao
            this_list[0].AM = this_list[0].G * res.result.recordset[0].geren_shengyu
            this_list[0].AN = this_list[0].G * res.result.recordset[0].geren_gongjijin
            this_list[0].AO = this_list[0].G * res.result.recordset[0].geren_nianjin
            this_list[0].ASA = this_list[0].G * 1 + this_list[0].H * 1
            that.setData({
              list:this_list
            })
            if(that.data.list[0].ASA != ''){
              var this_money = that.data.list[0].ASA
              wx.cloud.callFunction({
                name: 'sqlServer_117',
                data: {
                  query: "select isnull(gongzi,'') as gongzi,isnull(shuilv,'') as shuilv from gongzi_peizhi where gongsi='" + that.data.companyName + "'"
                },
                success: res => {
                  console.log(res.result)
                  if (res.result.recordset.length > 0){
                    var this_list = that.data.list
                    console.log(res.result.recordset)
                    for(var i =0;i<res.result.recordset.length;i++){
                      var this_gongzi = res.result.recordset[i].gongzi
                      if(this_gongzi != ''){
                        var this_arr = this_gongzi.split('-')
                        console.log(this_arr)
                        if(this_money * 1 >= this_arr[0] * 1 && this_money * 1 <= this_arr[1] * 1){
                          console.log('进入 ' + i)
                          var this_shuilv = res.result.recordset[i].shuilv
                          this_list[0].AU = this_shuilv
                          this_list[0].ATA = this_list[0].ASA * 1 - this_list[0].ASA * this_shuilv
                          this_list[0].AW = this_list[0].ASA * this_shuilv
                          this_list[0].AR = this_list[0].G * 1 + this_list[0].H * 1 + this_list[0].AJ * 1 + this_list[0].AK * 1 + this_list[0].AL * 1 + this_list[0].AM * 1 + this_list[0].AN * 1 + this_list[0].AO * 1
                          this_list[0].AI = this_list[0].Z * 1 + this_list[0].AA * 1 + this_list[0].AB * 1 + this_list[0].AC * 1 + this_list[0].AD * 1 + this_list[0].AE * 1 + this_list[0].AF * 1 
                          this_list[0].AY = this_list[0].ATA * 1 - this_list[0].AJ * 1 - this_list[0].AK * 1 - this_list[0].AL * 1 - this_list[0].AM * 1 - this_list[0].AN * 1 - this_list[0].AO * 1
                          this_list[0].U = this_list[0].G * 1 + this_list[0].H * 1 - this_list[0].AJ * 1 - this_list[0].AK * 1 - this_list[0].AL * 1 - this_list[0].AM * 1 - this_list[0].AN * 1 - this_list[0].AO * 1 - this_list[0].AW * 1
                          this_list[0].J = this_list[0].AY * 1 + this_list[0].O * 1 - this_list[0].R * 1 - this_list[0].T * 1
                          that.setData({
                            list:this_list
                          })
                          break;
                        }
                      }
                      
                    }
                  }
                },
                err: res => {
                  console.log("错误!")
                }
              })
            }
          }
        },
        err: res => {
          console.log("错误!")
        }
      })
    }

    

  }
})