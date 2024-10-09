// pages/gongzitiao/gongzitiao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result : [],
    countPage : 100, //每一页显示的数据数据数量
    pageCount : 0, //总页数
    pageNum : 1, //当前页 
    riqi1:"",
    riqi2:"",
    list: [],
    title: [],
    title1: [
      {
        text: "姓名",
        width: 20,
        columnName: "B",
        type: "text",
        isupd: true
      },
      {
        text: "部门",
        width: 20,
        columnName: "C",
        type: "text",
        isupd: true
      },
      {
        text: "岗位",
        width: 20,
        columnName: "D",
        type: "text",
        isupd: true
      },
      {
        text: "身份证号码",
        width: 20,
        columnName: "E",
        type: "text",
        isupd: true
      },
      {
        text: "入职时间",
        width: 20,
        columnName: "F",
        type: "text",
        isupd: true
      },
      {
        text: "基本工资",
        width: 20,
        columnName: "G",
        type: "text",
        isupd: true
      },
      {
        text: "绩效工资",
        width: 20,
        columnName: "H",
        type: "text",
        isupd: true
      },
      {
        text: "岗位工资",
        width: 20,
        columnName: "I",
        type: "text",
        isupd: true
      },
      {
        text: "当月合计工资",
        width: 20,
        columnName: "J",
        type: "text",
        isupd: true
      },
      {
        text: "跨度工资",
        width: 20,
        columnName: "K",
        type: "text",
        isupd: true
      },
      {
        text: "职称津贴",
        width: 20,
        columnName: "L",
        type: "text",
        isupd: true
      },
      {
        text: "月出勤天数",
        width: 20,
        columnName: "M",
        type: "text",
        isupd: true
      },
      {
        text: "加班时间",
        width: 20,
        columnName: "N",
        type: "text",
        isupd: true
      },
      {
        text: "加班费",
        width: 20,
        columnName: "O",
        type: "text",
        isupd: true
      },
      {
        text: "全勤应发",
        width: 20,
        columnName: "P",
        type: "text",
        isupd: true
      },
      {
        text: "缺勤天数",
        width: 20,
        columnName: "Q",
        type: "text",
        isupd: true
      },
      {
        text: "缺勤扣款",
        width: 20,
        columnName: "R",
        type: "text",
        isupd: true
      },
      {
        text: "迟到天数",
        width: 20,
        columnName: "S",
        type: "text",
        isupd: true
      },
      {
        text: "迟到扣款",
        width: 20,
        columnName: "T",
        type: "text",
        isupd: true
      },
      {
        text: "应发工资",
        width: 20,
        columnName: "U",
        type: "text",
        isupd: true
      },
      {
        text: "社保基数",
        width: 20,
        columnName: "V",
        type: "text",
        isupd: true
      },
      {
        text: "医疗技术",
        width: 20,
        columnName: "W",
        type: "text",
        isupd: true
      },
      {
        text: "公积金基数",
        width: 20,
        columnName: "X",
        type: "text",
        isupd: true
      },
      {
        text: "年金基数",
        width: 20,
        columnName: "Y",
        type: "text",
        isupd: true
      },
      {
        text: "企业养老",
        width: 20,
        columnName: "Z",
        type: "text",
        isupd: true
      },
      {
        text: "企业失业",
        width: 20,
        columnName: "AA",
        type: "text",
        isupd: true
      },
      {
        text: "企业医疗",
        width: 20,
        columnName: "AB",
        type: "text",
        isupd: true
      },
      {
        text: "企业工伤",
        width: 20,
        columnName: "AC",
        type: "text",
        isupd: true
      },
      {
        text: "企业生育",
        width: 20,
        columnName: "AD",
        type: "text",
        isupd: true
      },
      {
        text: "企业公积金",
        width: 20,
        columnName: "AE",
        type: "text",
        isupd: true
      },
      {
        text: "企业年金",
        width: 20,
        columnName: "AF",
        type: "text",
        isupd: true
      },
      {
        text: "滞纳金",
        width: 20,
        columnName: "AG",
        type: "text",
        isupd: true
      },
      {
        text: "利息",
        width: 20,
        columnName: "AH",
        type: "text",
        isupd: true
      },
      {
        text: "企业小计",
        width: 20,
        columnName: "AI",
        type: "text",
        isupd: true
      },
      {
        text: "个人养老",
        width: 20,
        columnName: "AJ",
        type: "text",
        isupd: true
      },
      {
        text: "个人失业",
        width: 20,
        columnName: "AK",
        type: "text",
        isupd: true
      },
      {
        text: "个人医疗",
        width: 20,
        columnName: "AL",
        type: "text",
        isupd: true
      },
      {
        text: "个人生育",
        width: 20,
        columnName: "AM",
        type: "text",
        isupd: true
      },
      {
        text: "个人公积金",
        width: 20,
        columnName: "AN",
        type: "text",
        isupd: true
      },
      {
        text: "个人年金4%",
        width: 20,
        columnName: "AO",
        type: "text",
        isupd: true
      },
      {
        text: "滞纳金",
        width: 20,
        columnName: "AP",
        type: "text",
        isupd: true
      },
      {
        text: "利息",
        width: 20,
        columnName: "AQ",
        type: "text",
        isupd: true
      },
      {
        text: "个人小计",
        width: 20,
        columnName: "AR",
        type: "text",
        isupd: true
      },
      {
        text: "税前工资",
        width: 20,
        columnName: "ASA",
        type: "text",
        isupd: true
      },
      {
        text: "应税工资",
        width: 20,
        columnName: "ATA",
        type: "text",
        isupd: true
      },
      {
        text: "税率",
        width: 20,
        columnName: "AU",
        type: "text",
        isupd: true
      },
      {
        text: "扣除数",
        width: 20,
        columnName: "AV",
        type: "text",
        isupd: true
      },
      {
        text: "代扣个人所得税",
        width: 20,
        columnName: "AW",
        type: "text",
        isupd: true
      },
      {
        text: "1%年金",
        width: 20,
        columnName: "AX",
        type: "text",
        isupd: true
      },
      {
        text: "实发工资",
        width: 20,
        columnName: "AY",
        type: "text",
        isupd: true
      },
      {
        text: "验算公式",
        width: 20,
        columnName: "AZ",
        type: "text",
        isupd: true
      },
      {
        text: "银行账号",
        width: 20,
        columnName: "BA",
        type: "text",
        isupd: true
      },
    ],

    title2: [
      {
        text: "姓名",
        width: 20,
        columnName: "B",
        type: "text",
        isupd: true
      },
      {
        text: "部门",
        width: 20,
        columnName: "C",
        type: "text",
        isupd: true
      },
      {
        text: "岗位",
        width: 20,
        columnName: "D",
        type: "text",
        isupd: true
      },
      {
        text: "基本工资",
        width: 20,
        columnName: "G",
        type: "text",
        isupd: true
      },
      {
        text: "个人养老",
        width: 20,
        columnName: "AJ",
        type: "text",
        isupd: true
      },
      {
        text: "个人失业",
        width: 20,
        columnName: "AK",
        type: "text",
        isupd: true
      },
      {
        text: "个人医疗",
        width: 20,
        columnName: "AL",
        type: "text",
        isupd: true
      },
      {
        text: "个人生育",
        width: 20,
        columnName: "AM",
        type: "text",
        isupd: true
      },
      {
        text: "个人公积金",
        width: 20,
        columnName: "AN",
        type: "text",
        isupd: true
      },
      
      {
        text: "税前工资",
        width: 20,
        columnName: "ASA",
        type: "text",
        isupd: true
      },
      {
        text: "代扣个人所得税",
        width: 20,
        columnName: "AW",
        type: "text",
        isupd: true
      },
      {
        text: "实发工资",
        width: 20,
        columnName: "AY",
        type: "text",
        isupd: true
      }
    ],

    companyName :"",

    options:[
      {
        background_color : "#4876FF",
        text_color : "white",
        items : [],
        text : "请选择",
        selectHid : true,
        columnName : "bumen"
      },
      {
        background_color : "#4876FF",
        text_color : "white",
        items : [],
        text : "请选择",
        selectHid : true,
        columnName : "zhiwu"
      }
    ],

    hidMask : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      companyName : options.companyName,
      result : JSON.parse(options.access)
    })


    _this.getTitle(_this);

    _this.getOptions(_this,0,options.companyName,"bumen");
    _this.getOptions(_this,1,options.companyName,"zhiwu");
  },

  getTitle : function(_this){
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select gongzimingxi from gongzi_title where gongzimingxi is not null"
      },
      success: res => {
        _this.setData({
          title: res.result.recordset.slice(0,53)
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  getList : function(riqi1,riqi2,pageNum,countPage,_this,companyName,where){
    riqi1 = riqi1.replace(/-/g, '/');
    riqi2=riqi2.replace(/-/g, '/');
    this.setData({
      riqi1: riqi1,
      riqi2:riqi2
    })
     var sql= "select * from (select *,ROW_NUMBER() over(order by [id]) ROW_ID from [gongzi_gongzimingxi] where BC between '"+ _this.data.riqi1 +"' and '"+ _this.data.riqi2 +"' and  BD = '"+companyName+"') t where t.ROW_ID >("+pageNum+"-1)*"+countPage+" and t.ROW_ID<("+pageNum+"*"+countPage+"+1) "+where
    
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        console.log(sql)
        _this.setData({
          list: res.result.recordset
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  getOptions : function(_this,index,companyName,columnName){
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select ["+columnName+"] from gongzi_peizhi where gongsi = '"+companyName+"' and ["+columnName+"] != '-' and ["+columnName+"] is not null"
      },
      success: res => {
        var items = res.result.recordset
        var options = [];
        if(columnName=="bumen"){
          for(var i=0;i<items.length;i++){
            options.push(items[i].bumen)
          }
        }else if(columnName=="zhiwu"){
          for(var i=0;i<items.length;i++){
            options.push(items[i].zhiwu)
          }
        }
        _this.setData({
          ["options["+index+"].items"] : options
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },


  selectTap : function(e){
    var _this = this;
    var items_index = e.currentTarget.dataset.items_index
    var selectHid = _this.data.options[items_index].selectHid
    _this.setData({
      ["options["+items_index+"].selectHid"] : selectHid?false:true
    })
  },
  choice : function(e){
    var _this = this;
    var items_index = e.currentTarget.dataset.items_index;
    var items = _this.data.options[items_index];
    var index = e.currentTarget.dataset.item_index;
    var value = items.items[index]
    
    _this.setData({
      ["options["+items_index+"].text"] : value,
      ["options["+items_index+"].selectHid"] : true,
    })
  },

  sel : function(){
    var _this = this;
    var bumen = _this.data.options[0].text
    // if(bumen=='请选择'){
    //   var where = "and D = '"+zhiwu+"'";
    // }
    var zhiwu = _this.data.options[1].text
    // if(zhiwu=='请选择'){
    //   var where = "and C = '"+bumen+"'"
    // }
    if(_this.data.riqi1==''){
      _this.setData({
        // riqi1:'1900-01-01'
        riqi1:'1900/01/01'
      })
    }
    if(_this.data.riqi2==''){
      _this.setData({
        riqi2:'2100-12-31'
      })
    }
    var where = ""
    if(bumen == "请选择" || bumen == ""){
    }else{
      where = " and C like '%"+bumen+"%'";
    }
    if(zhiwu == "请选择" || zhiwu == ""){
    }else{
      where = where + " and D like '%"+zhiwu+"%'";
    }
    // var where = "and C = '"+bumen+"' and D = '"+zhiwu+"'";
    _this.getList(_this.data.riqi1,_this.data.riqi2,_this.data.pageNum,_this.data.countPage,_this,_this.data.companyName,where);

    _this.setData({
      riqi1:"",
      riqi12:"",
      hidMask : true,
    })
  },

  selAgain : function(){
    this.setData({
      hidMask : false
    })
  },

  back_yemian : function(){
    this.setData({
      hidMask : true
    })
  },

  input:function(e){
    var _this =this;
    var index = e.currentTarget.dataset.index
    var value = e.detail.value

    _this.setData({
      ["options["+index+"].text"] : value
    })
  },
  choiceDate: function (e) {
    //e.preventDefault(); 
    
    this.setData({
      [e.target.dataset.column_name]: e.detail.value
    })
    console.log(e.detail.value)
  },
  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    console.log(column)
    _this.setData({
      currentDate: e.detail,
      [column]: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getExcel: function () {
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask: 'true'
    })
    var list = _this.data.list;
    console.log(list)
    var title = _this.data.title2;
    console.log(title)
    var cloudList = {
      name: '工资明细',
      items: [], 
      header: []
    }

    for (let i = 0; i < title.length; i++) {
      cloudList.header.push({
        item: title[i].text,
        type: title[i].type,
        width: title[i].width,
        columnName: title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name: 'getExcel',
      data: {
        list: cloudList
      },
      success: function (res) {
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID: res.result.fileID,
          success: res => {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu: 'true',
              fileType: 'xlsx',
              success: res => {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  },
})