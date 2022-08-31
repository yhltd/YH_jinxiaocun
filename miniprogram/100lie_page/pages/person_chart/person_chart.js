import * as echarts from '../ec-canvas/echarts'

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pie_data:[],
    this_column :'A列-CV列',
    listJiQi:[],
    gongsi: '',
    xlShow2:false,
    xdrq: "",
    jieshuriqi: "",
    ddh: "",
    lineChart: '',
    ddmk:'',
    ec: {
      lazyLoad: true
    },
    column_list:['A列-Z列','AA列-AZ列','BA列-BZ列','CA列-CV列','A列-CV列'],
    person_name:'',
    person_list:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var userInfo = JSON.parse(options.userInfo)
    _this.setData({
      userInfo:userInfo,
    })

    var sql="select ins,del,upd,sel from baitaoquanxian_department where company = '" + _this.data.userInfo.B + "' and department_name ='" + _this.data.userInfo.bumen + "' and view_name='人员数据分析'"
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
        }
      }
    })

    var sql="select isnull(C,'') as C from baitaoquanxian_renyun WHERE B = '" + _this.data.userInfo.B + "' order by B"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : sql
      },
      success(res){
        var list=res.result.recordset
        var person_list = []
        for(var i=0; i<list.length; i++){
          person_list.push(list[i].C)
        }
        _this.setData({
          person_list:person_list
        })
      }
    })

  },

  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      this_column: _this.data.column_list[e.detail.value]
    })
  },

  bindPickerChange2: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      person_name: _this.data.person_list[e.detail.value]
    })
  },

  tableShow: function (e) {
    var _this = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select sum(case when isnull(A,'') !='' then 1 else 0 end ) as A,sum(case when isnull(B,'') !='' then 1 else 0 end ) as B,sum(case when isnull(C,'') !='' then 1 else 0 end ) as C,sum(case when isnull(D,'') !='' then 1 else 0 end ) as D,sum(case when isnull(E,'') !='' then 1 else 0 end ) as E,sum(case when isnull(F,'') !='' then 1 else 0 end ) as F,sum(case when isnull(G,'') !='' then 1 else 0 end ) as G,sum(case when isnull(H,'') !='' then 1 else 0 end ) as H,sum(case when isnull(I,'') !='' then 1 else 0 end ) as I,sum(case when isnull(J,'') !='' then 1 else 0 end ) as J,sum(case when isnull(K,'') !='' then 1 else 0 end ) as K,sum(case when isnull(L,'') !='' then 1 else 0 end ) as L,sum(case when isnull(M,'') !='' then 1 else 0 end ) as M,sum(case when isnull(N,'') !='' then 1 else 0 end ) as N,sum(case when isnull(O,'') !='' then 1 else 0 end ) as O,sum(case when isnull(P,'') !='' then 1 else 0 end ) as P,sum(case when isnull(Q,'') !='' then 1 else 0 end ) as Q,sum(case when isnull(R,'') !='' then 1 else 0 end ) as R,sum(case when isnull(S,'') !='' then 1 else 0 end ) as S,sum(case when isnull(T,'') !='' then 1 else 0 end ) as T,sum(case when isnull(U,'') !='' then 1 else 0 end ) as U,sum(case when isnull(V,'') !='' then 1 else 0 end ) as V,sum(case when isnull(W,'') !='' then 1 else 0 end ) as W,sum(case when isnull(X,'') !='' then 1 else 0 end ) as X,sum(case when isnull(Y,'') !='' then 1 else 0 end ) as Y,sum(case when isnull(Z,'') !='' then 1 else 0 end ) as Z,sum(case when isnull(AA,'') !='' then 1 else 0 end ) as AA,sum(case when isnull(AB,'') !='' then 1 else 0 end ) as AB,sum(case when isnull(AC,'') !='' then 1 else 0 end ) as AC,sum(case when isnull(AD,'') !='' then 1 else 0 end ) as AD,sum(case when isnull(AE,'') !='' then 1 else 0 end ) as AE,sum(case when isnull(AF,'') !='' then 1 else 0 end ) as AF,sum(case when isnull(AG,'') !='' then 1 else 0 end ) as AG,sum(case when isnull(AH,'') !='' then 1 else 0 end ) as AH,sum(case when isnull(AI,'') !='' then 1 else 0 end ) as AI,sum(case when isnull(AJ,'') !='' then 1 else 0 end ) as AJ,sum(case when isnull(AK,'') !='' then 1 else 0 end ) as AK,sum(case when isnull(AL,'') !='' then 1 else 0 end ) as AL" +
            ",sum(case when isnull(AM,'') !='' then 1 else 0 end ) as AM,sum(case when isnull(AN,'') !='' then 1 else 0 end ) as AN,sum(case when isnull(AO,'') !='' then 1 else 0 end ) as AO,sum(case when isnull(AP,'') !='' then 1 else 0 end ) as AP,sum(case when isnull(AQ,'') !='' then 1 else 0 end ) as AQ,sum(case when isnull(AR,'') !='' then 1 else 0 end ) as AR,sum(case when isnull(ASS,'') !='' then 1 else 0 end ) as ASS,sum(case when isnull(AT,'') !='' then 1 else 0 end ) as AT,sum(case when isnull(AU,'') !='' then 1 else 0 end ) as AU,sum(case when isnull(AV,'') !='' then 1 else 0 end ) as AV,sum(case when isnull(AW,'') !='' then 1 else 0 end ) as AW,sum(case when isnull(AX,'') !='' then 1 else 0 end ) as AX,sum(case when isnull(AY,'') !='' then 1 else 0 end ) as AY,sum(case when isnull(AZ,'') !='' then 1 else 0 end ) as AZ,sum(case when isnull(BA,'') !='' then 1 else 0 end ) as BA,sum(case when isnull(BB,'') !='' then 1 else 0 end ) as BB,sum(case when isnull(BC,'') !='' then 1 else 0 end ) as BC,sum(case when isnull(BD,'') !='' then 1 else 0 end ) as BD,sum(case when isnull(BE,'') !='' then 1 else 0 end ) as BE,sum(case when isnull(BF,'') !='' then 1 else 0 end ) as BF,sum(case when isnull(BG,'') !='' then 1 else 0 end ) as BG,sum(case when isnull(BH,'') !='' then 1 else 0 end ) as BH,sum(case when isnull(BI,'') !='' then 1 else 0 end ) as BI,sum(case when isnull(BJ,'') !='' then 1 else 0 end ) as BJ,sum(case when isnull(BK,'') !='' then 1 else 0 end ) as BK,sum(case when isnull(BL,'') !='' then 1 else 0 end ) as BL,sum(case when isnull(BM,'') !='' then 1 else 0 end ) as BM,sum(case when isnull(BN,'') !='' then 1 else 0 end ) as BN,sum(case when isnull(BO,'') !='' then 1 else 0 end ) as BO,sum(case when isnull(BP,'') !='' then 1 else 0 end ) as BP,sum(case when isnull(BQ,'') !='' then 1 else 0 end ) as BQ,sum(case when isnull(BR,'') !='' then 1 else 0 end ) as BR,sum(case when isnull(BS,'') !='' then 1 else 0 end ) as BS,sum(case when isnull(BT,'') !='' then 1 else 0 end ) as BT,sum(case when isnull(BU,'') !='' then 1 else 0 end ) as BU,sum(case when isnull(BV,'') !='' then 1 else 0 end ) as BV,sum(case when isnull(BW,'') !='' then 1 else 0 end ) as BW," +
            "sum(case when isnull(BX,'') !='' then 1 else 0 end ) as BX,sum(case when isnull(BYY,'') !='' then 1 else 0 end ) as BYY,sum(case when isnull(BZ,'') !='' then 1 else 0 end ) as BZ,sum(case when isnull(CA,'') !='' then 1 else 0 end ) as CA,sum(case when isnull(CB,'') !='' then 1 else 0 end ) as CB,sum(case when isnull(CC,'') !='' then 1 else 0 end ) as CC,sum(case when isnull(CD,'') !='' then 1 else 0 end ) as CD,sum(case when isnull(CE,'') !='' then 1 else 0 end ) as CE,sum(case when isnull(CF,'') !='' then 1 else 0 end ) as CF,sum(case when isnull(CG,'') !='' then 1 else 0 end ) as CG,sum(case when isnull(CH,'') !='' then 1 else 0 end ) as CH,sum(case when isnull(CI,'') !='' then 1 else 0 end ) as CI,sum(case when isnull(CJ,'') !='' then 1 else 0 end ) as CJ,sum(case when isnull(CK,'') !='' then 1 else 0 end ) as CK,sum(case when isnull(CL,'') !='' then 1 else 0 end ) as CL,sum(case when isnull(CM,'') !='' then 1 else 0 end ) as CM,sum(case when isnull(CN,'') !='' then 1 else 0 end ) as CN,sum(case when isnull(CO,'') !='' then 1 else 0 end ) as CO,sum(case when isnull(CP,'') !='' then 1 else 0 end ) as CP,sum(case when isnull(CQ,'') !='' then 1 else 0 end ) as CQ,sum(case when isnull(CR,'') !='' then 1 else 0 end ) as CR,sum(case when isnull(CS,'') !='' then 1 else 0 end ) as CS,sum(case when isnull(CT,'') !='' then 1 else 0 end ) as CT,sum(case when isnull(CU,'') !='' then 1 else 0 end ) as CU,sum(case when isnull(CV,'') !='' then 1 else 0 end ) as CV from baitaoquanxian" +
            " where 公司= '" + _this.data.userInfo.B + "' and 日期 >= convert(date,'" + e[0] + "') and 日期 <= convert(date,'" + e[1] + "') and 人员='" + e[2] + "'"
      },
      success: res => {
        var this_arr = res.result.recordset
        var this_column = _this.data.this_column
        var data1=[]
        var data2=[]
        if(this_arr[0] == null){
          if(this_column == 'A列-Z列'){
              data1 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
              data2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          }else if(this_column == 'AA列-AZ列'){
              data1 = ['AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ']
              data2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          }else if(this_column == 'BA列-BZ列'){
              data1 = ['BA','BB','BC','BD','BE','BF','BG','BH','BI','BJ','BK','BL','BM','BN','BO','BP','BQ','BR','BS','BT','BU','BV','BW','BX','BY','BZ']
              data2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          }else if(this_column == 'CA列-CV列'){
              data1 = ['CA','CB','CC','CD','CE','CF','CG','CH','CI','CJ','CK','CL','CM','CN','CO','CP','CQ','CR','CS','CT','CU','CV']
              data2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          }else if(this_column == 'A列-CV列'){
              data1 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ','BA','BB','BC','BD','BE','BF','BG','BH','BI','BJ','BK','BL','BM','BN','BO','BP','BQ','BR','BS','BT','BU','BV','BW','BX','BY','BZ','CA','CB','CC','CD','CE','CF','CG','CH','CI','CJ','CK','CL','CM','CN','CO','CP','CQ','CR','CS','CT','CU','CV']
              data2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          }
      }else{
          if(this_column == 'A列-Z列'){
              data1 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
              data2 = [this_arr[0].A,this_arr[0].B,this_arr[0].C,this_arr[0].D,this_arr[0].E,this_arr[0].F,this_arr[0].G,this_arr[0].H,this_arr[0].I,this_arr[0].J,this_arr[0].K,this_arr[0].L,this_arr[0].M,this_arr[0].N,this_arr[0].O,this_arr[0].P,this_arr[0].Q,this_arr[0].R,this_arr[0].S,this_arr[0].T,this_arr[0].U,this_arr[0].V,this_arr[0].W,this_arr[0].X,this_arr[0].Y,this_arr[0].Z]
          }else if(this_column == 'AA列-AZ列'){
              data1 = ['AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ']
              data2 = [this_arr[0].AA,this_arr[0].AB,this_arr[0].AC,this_arr[0].AD,this_arr[0].AE,this_arr[0].AF,this_arr[0].AG,this_arr[0].AH,this_arr[0].AI,this_arr[0].AJ,this_arr[0].AK,this_arr[0].AL,this_arr[0].AM,this_arr[0].AN,this_arr[0].AO,this_arr[0].AP,this_arr[0].AQ,this_arr[0].AR,this_arr[0].ASS,this_arr[0].AT,this_arr[0].AU,this_arr[0].AV,this_arr[0].AW,this_arr[0].AX,this_arr[0].AY,this_arr[0].AZ]
          }else if(this_column == 'BA列-BZ列'){
              data1 = ['BA','BB','BC','BD','BE','BF','BG','BH','BI','BJ','BK','BL','BM','BN','BO','BP','BQ','BR','BS','BT','BU','BV','BW','BX','BY','BZ']
              data2 = [this_arr[0].BA,this_arr[0].BB,this_arr[0].BC,this_arr[0].BD,this_arr[0].BE,this_arr[0].BF,this_arr[0].BG,this_arr[0].BH,this_arr[0].BI,this_arr[0].BJ,this_arr[0].BK,this_arr[0].BL,this_arr[0].BM,this_arr[0].BN,this_arr[0].BO,this_arr[0].BP,this_arr[0].BQ,this_arr[0].BR,this_arr[0].BS,this_arr[0].BT,this_arr[0].BU,this_arr[0].BV,this_arr[0].BW,this_arr[0].BX,this_arr[0].BYY,this_arr[0].BZ]
          }else if(this_column == 'CA列-CV列'){
              data1 = ['CA','CB','CC','CD','CE','CF','CG','CH','CI','CJ','CK','CL','CM','CN','CO','CP','CQ','CR','CS','CT','CU','CV']
              data2 = [this_arr[0].CA,this_arr[0].CB,this_arr[0].CC,this_arr[0].CD,this_arr[0].CE,this_arr[0].CF,this_arr[0].CG,this_arr[0].CH,this_arr[0].CI,this_arr[0].CJ,this_arr[0].CK,this_arr[0].CL,this_arr[0].CM,this_arr[0].CN,this_arr[0].CO,this_arr[0].CP,this_arr[0].CQ,this_arr[0].CR,this_arr[0].CS,this_arr[0].CT,this_arr[0].CU,this_arr[0].CV]
          }else if(this_column == 'A列-CV列'){
              data1 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX','AY','AZ','BA','BB','BC','BD','BE','BF','BG','BH','BI','BJ','BK','BL','BM','BN','BO','BP','BQ','BR','BS','BT','BU','BV','BW','BX','BY','BZ','CA','CB','CC','CD','CE','CF','CG','CH','CI','CJ','CK','CL','CM','CN','CO','CP','CQ','CR','CS','CT','CU','CV']
              data2 = [this_arr[0].A,this_arr[0].B,this_arr[0].C,this_arr[0].D,this_arr[0].E,this_arr[0].F,this_arr[0].G,this_arr[0].H,this_arr[0].I,this_arr[0].J,this_arr[0].K,this_arr[0].L,this_arr[0].M,this_arr[0].N,this_arr[0].O,this_arr[0].P,this_arr[0].Q,this_arr[0].R,this_arr[0].S,this_arr[0].T,this_arr[0].U,this_arr[0].V,this_arr[0].W,this_arr[0].X,this_arr[0].Y,this_arr[0].Z,this_arr[0].AA,this_arr[0].AB,this_arr[0].AC,this_arr[0].AD,this_arr[0].AE,this_arr[0].AF,this_arr[0].AG,this_arr[0].AH,this_arr[0].AI,this_arr[0].AJ,this_arr[0].AK,this_arr[0].AL,this_arr[0].AM,this_arr[0].AN,this_arr[0].AO,this_arr[0].AP,this_arr[0].AQ,this_arr[0].AR,this_arr[0].ASS,this_arr[0].AT,this_arr[0].AU,this_arr[0].AV,this_arr[0].AW,this_arr[0].AX,this_arr[0].AY,this_arr[0].AZ,this_arr[0].BA,this_arr[0].BB,this_arr[0].BC,this_arr[0].BD,this_arr[0].BE,this_arr[0].BF,this_arr[0].BG,this_arr[0].BH,this_arr[0].BI,this_arr[0].BJ,this_arr[0].BK,this_arr[0].BL,this_arr[0].BM,this_arr[0].BN,this_arr[0].BO,this_arr[0].BP,this_arr[0].BQ,this_arr[0].BR,this_arr[0].BS,this_arr[0].BT,this_arr[0].BU,this_arr[0].BV,this_arr[0].BW,this_arr[0].BX,this_arr[0].BYY,this_arr[0].BZ,this_arr[0].CA,this_arr[0].CB,this_arr[0].CC,this_arr[0].CD,this_arr[0].CE,this_arr[0].CF,this_arr[0].CG,this_arr[0].CH,this_arr[0].CI,this_arr[0].CJ,this_arr[0].CK,this_arr[0].CL,this_arr[0].CM,this_arr[0].CN,this_arr[0].CO,this_arr[0].CP,this_arr[0].CQ,this_arr[0].CR,this_arr[0].CS,this_arr[0].CT,this_arr[0].CU,this_arr[0].CV]
          }
      }
        _this.setData({
          xvalue:data1,
          yvalue:data2
        })
        _this.category_refresh()
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

  entering:function(){
    var _this = this
    var start_date = _this.data.xdrq
    var stop_date = _this.data.jieshuriqi
    var person_name = _this.data.person_name
    if(person_name == '' || person_name == undefined){
      wx.showToast({
        title: '请选择人员！',
        icon: 'none',
      })
      return;
    }
    if(start_date == ''){
      start_date = "1900-01-01"
    }
    if(stop_date == ''){
      stop_date = "2100-12-31"
    }
    var e = [start_date,stop_date,person_name]
    _this.tableShow(e)
    
  },

  pie_refresh: function(){
    var _this = this
    var options = getBarOption(_this.data.pie_data)
    _this.updChart(options)
  },

  category_refresh: function(){
    var _this = this
    var options = {
      xAxis: {
        type: 'category',
        data: _this.data.xvalue
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: _this.data.yvalue,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
        }
      ],
      dataZoom: [{
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        left: '9%',
        bottom: -5,
        start: 0,
        end: 20 //初始化滚动条
    }],
    }
    var options = 
    _this.updChart(options)
  },

  updChart : function(options){
    this.selectComponent('#mychart-dom-bar').init((canvas, width, height) => {
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(options,true);
      return barChart;
    });
  },
  choiceDate: function (e) {
    var _this = this
    _this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
  },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },
})