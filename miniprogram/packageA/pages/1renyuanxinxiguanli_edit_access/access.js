// miniprogram/packageA/pages/1renyuanxinxiguanli_edit_access/access.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id : 0,

    views : [
      {
        image_url : "../../../images/rili.png",
        index : 1,
        text : "考勤表",
        function : [0,1,2,3,4]
      },{
        image_url : "../../../images/renyuanxinxiguanli.png",
        index : 2,
        text : "人员信息管理",
        function : [0,1,2,3,4]
      },{
        image_url : "../../../images/baopan.png",
        index : 3,
        text : "报盘",
        function : [-1,1,2,3,4]
      },{
        image_url : "../../../images/shezhi.png",
        index : 4,
        text : "配置表",
        function : [0,1,2,-1,4]
      },{
        image_url : "../../../images/gongzimingxi.png",
        index : 5,
        text : "工资明细",
        function : [0,1,2,3,4]
      },{
        image_url : "../../../images/baoshui.png",
        index : 6,
        text : "报税",
        function : [-1,-1,2,3,4]
      },{
        image_url : "../../../images/kaoqinjilu.png",
        index : 7,
        text : "考勤记录",
        function : [0,1,2,3,4]
      },{
        image_url : "../../../images/bumenhuizong.png",
        index : 8,
        text : "部门汇总",
        function : [-1,-1,2,3,4]
      },{
        image_url : "../../../images/shebao.png",
        index : 9,
        text : "社保",
        function : [-1,-1,2,3,4]
      },{
        image_url : "../../../images/gerenxinxi.png",
        index : 10,
        text : "个人信息",
        function : [-1,-1,-1,3,4]
      },{
        image_url : "../../../images/gerensuodeshui.png",
        index : 11,
        text : "个人所得税",
        function : [-1,-1,-1,-1,4]
      },{
        image_url : "../../../images/gongzitiao.png",
        index : 12,
        text : "工资条",
        function : [-1,-1,-1,-1,4]
      }
    ],

    show : [],
    sqlArr : [],

    view_id : ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options.id)
    _this.setData({
      id : options.id
    })
  },

  choice_left_item : function(e){
    wx.showLoading({
      title: '加载中',
      mask: 'true'
    })

    var _this = this;
    var view_index = e.currentTarget.dataset.view_index;
    _this.setData({
      view_id : view_index,
    })
    var show = _this.data.show;
    for(var i=0;i<show.length;i++){
      if(view_index == show[i].view_id){
        wx.hideLoading({
          complete: (res) => {},
        })
        return;
      }
    }


    //查询该用户对该表的权限
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select [add],del,upd,sel,look from gongzi_renyuanManager where R_id = '"+_this.data.id+"' and view_id = '"+view_index+"'"
      },
      success: res => {
        console.log(res)
        if(res.result.recordset.length!=0){
          var list = res.result.recordset[0];
          var arr = [];
          arr.push(list.add)
          arr.push(list.del)
          arr.push(list.upd)
          arr.push(list.sel)
          arr.push(list.look)

          _this.setRightArea(arr,"update",arr,false);
          wx.hideLoading({
            complete: (res) => {},
          })
        }else{
          wx.showModal({
            title : _this.data.views[view_index-1].text,
            content : "该用户对该表未设置规则,是否使用默认规则",
            cancelText : "取消",
            confirmText : "确定",
            confirmColor :"#84B9F2",
            success : function(res){
              if(res.confirm){
                _this.setRightArea([0,0,0,0,1],"insert",[],true);
              }
              if(res.cancel){
                _this.setRightArea([0,0,0,0,1],"insert",[0,0,0,0,1],false);
              }
            }
          })
          
          wx.hideLoading({
            complete: (res) => {},
          })
          
        }
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  //渲染右侧页面
  setRightArea : function(arr,caozuo,old_is,isDefault){
    var _this = this;
    var show = _this.data.show;
    var view_id = _this.data.view_id;
    var view = _this.data.views[view_id-1]

    if(isDefault){
      var newShow = {view_id:view_id,is:[],caozuo:caozuo,isUpd:true,old_is:old_is,isDefault:isDefault}
    }else{
      var newShow = {view_id:view_id,is:[],caozuo:caozuo,isUpd:false,old_is:old_is,isDefault:isDefault}
    }
    
    for(var j=0;j<view.function.length;j++){
      var isShow = true;
      if(view.function[j]==-1){
        isShow = false;
      }
      var newis = {
        isShow : isShow,
        text :  _this.getText(view.function[j],view_id),
        is : arr[j]
      }
      newShow.is.push(newis);
    }
    show.push(newShow)

    _this.setData({
      show
    })
  },

  getText : function(i,view_id){
    switch(i){
      case 0:
        return "新增"
      case 1:
        return "删除"
      case 2:
        return "修改"
      case 3:
        return "查询"
      case 4:
        if(view_id==12){
          return "查看&查询该表"
        }
        return "查看该表"
    }
  },

  //点击右侧权限按钮
  choice_right_item : function(e){
    var _this = this;
    var view_id = _this.data.view_id
    var index = e.currentTarget.dataset.index
    var is = e.currentTarget.dataset.is;

    var show = _this.data.show;
    for(var i=0;i<show.length;i++){
      if(show[i].view_id==view_id){
        var newIs = is==1?0:1
        _this.setData({
          ["show["+i+"].isUpd"]: true,
          ["show["+i+"].is["+index+"].is"] : newIs
        })

        var newIsArr =_this.data.show[i].is;
        var oldIs = show[i].old_is
        //只有是insert操作并且是选择了默认规则才能跳过比对
        if(show[i].caozuo=="insert"&&show[i].isDefault){
          return
        }
        if(_this.setIsUpd(newIsArr,oldIs)){
          _this.setData({
            ["show["+i+"].isUpd"]: false
          })
        }
        
        return;
      }
    }
  },

  setIsUpd : function(newarr,oldarr){
    var num = 0
    for(var i=0;i<newarr.length;i++){
      if(newarr[i].is==oldarr[i]){
        num++
      }
    }
    return num==newarr.length
  },

  save : function(){
    wx.showLoading({
      title: '加载中',
      mask: 'true'
    })
    var _this = this;
    var show = _this.data.show;
    if(show.length==0){
      wx.hideLoading({
        complete: (res) => {
          wx.navigateBack({
            delta : 2,
            complete: (res) => {},
          })
        },
      })
    }
    var id = _this.data.id;

    var sql = "";
    for(var i=0;i<show.length;i++){
      if(show[i].isUpd){
        if(show[i].caozuo=="insert"){
          sql += "insert into gongzi_renyuanManager(R_id,[add],del,upd,sel,look,view_id) values(";
          sql += id+","
          for(var j=0;j<show[i].is.length;j++){
            sql += show[i].is[j].is+","
          }
          sql += show[i].view_id+");"
          continue;
        }else if(show[i].caozuo=="update"){
          sql += "update gongzi_renyuanManager set [add] = "+show[i].is[0].is+",del = "+show[i].is[1].is+",upd = "+show[i].is[2].is+",sel = "+show[i].is[3].is+",look = "+show[i].is[4].is+" where R_id="+id+" and view_id = "+show[i].view_id+";"
          continue;
        }
      }
    }

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: "select view_id as num from gongzi_renyuanManager where R_id = "+id
          },
          success: res => {
            wx.hideLoading({
              complete: (res) => {},
            })
            var list = res.result.recordset;
            //如果一条规则都没有那直接清空list避免报错
            if(res.result.recordset.length==0){list==""}
            if(list.length==12){
              wx.navigateBack({
                delta : 2,
                complete: (res) => {},
              })
              return;
            }
            wx.showModal({
              title : "提示",
              content : "是否将该用户未设置规则的所有表设置默认规则（只可以查看！）",
              cancelText : "取消",
              confirmText : "确定",
              confirmColor :"#84B9F2",
              success : function(res){
                wx.showLoading({
                  title : '加载中',
                  mask : "true"
                })
                if(res.confirm){
                  var views = _this.data.views;
                  var sql = "";
                  view_items:
                  for(var i=0;i<views.length;i++){
                    for(var j=0;j<list.length;j++){
                      if(views[i].index==list[j].num){
                        continue view_items
                      }
                    }
                    sql += "insert into gongzi_renyuanManager(R_id,[add],del,upd,sel,look,view_id) values("+id+",0,0,0,0,1,"+views[i].index+");"
                  }


                  wx.cloud.callFunction({
                    name: 'sqlServer_117',
                    data: {
                      query: sql
                    },
                    success : res =>{
                      wx.showToast({
                        title: '保存成功',
                        icon : 'none',
                        success : function(res){
                          wx.navigateBack({
                            delta : 2,
                            complete: (res) => {},
                          })
                        }
                      })
                    },
                    err: res => {
                      console.log("错误!")
                    }
                  })
                }
                if(res.cancel){
                  wx.hideLoading({
                    complete: (res) => {
                      wx.navigateBack({
                        delta : 2,
                        complete: (res) => {},
                      })
                    },
                  })
                }
              }
            })
          },
          err: res => {
            console.log("错误!")
          }
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },

  goBack : function(){
    wx.navigateBack({
      complete: (res) => {},
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

  }
})