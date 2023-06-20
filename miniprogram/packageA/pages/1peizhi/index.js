var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result : [],
    companyName : "",
    id: 0,
    maxLength: 0,
    jiaqiLength: 0,

    input_type : "",
    type: 1,
    startYear: 1980,
    endYear: 2030,
    cancelColor: "#888",
    color: "#5677fc",
    setDateTime: "",
    result: "",
    title_year: '',
    title_month: '',
    title_day: '',

    showModalStatus: false,
    animationData: "",
    tabIndex: 26,
    leftDrawer: false,
    mode: "left",
    scrollTop: null,
    list: [],
    title: [],
    title1: [
      {
        text: "社保基数",
        width: 20,
        columnName: "kaoqin",
        type: "text",
        isupd: true
      },
      {
        text: "公积金基数",
        width: 20,
        columnName: "kaoqin_peizhi",
        type: "text",
        isupd: true
      },
      // {
      //   text: "假期",
      //   width: 20,
      //   columnName: "jiaqi",
      //   type: "text",
      //   isupd: true
      // },
      {
        text: "部门配置",
        width: 20,
        columnName: "bumen",
        type: "text",
        isupd: true
      },
      {
        text: "职务配置",
        width: 20,
        columnName: "zhiwu",
        type: "text",
        isupd: true
      },
      {
        text: "迟到扣款",
        width: 20,
        columnName: "chidao_koukuan",
        type: "text",
        isupd: true
      },
      {
        text: "迟到扣款",
        width: 20,
        columnName: "chidao_koukuan",
        type: "text",
        isupd: true
      },
      {
        text: "个人医疗",
        width: 20,
        columnName: "geren_yiliao",
        type: "text",
        isupd: true
      },
      {
        text: "企业医疗",
        width: 20,
        columnName: "qiye_yiliao",
        type: "text",
        isupd: true
      },
      {
        text: "个人生育",
        width: 20,
        columnName: "geren_shengyu",
        type: "text",
        isupd: true
      },
      {
        text: "企业生育",
        width: 20,
        columnName: "qiye_shengyu",
        type: "text",
        isupd: true
      },
      {
        text: "个人公积金",
        width: 20,
        columnName: "geren_gongjijin",
        type: "text",
        isupd: true
      },
      {
        text: "企业公积金",
        width: 20,
        columnName: "qiye_gongjijin",
        type: "text",
        isupd: true
      },
      {
        text: "医疗技术",
        width: 20,
        columnName: "yiliao_jishu",
        type: "text",
        isupd: true
      },
      {
        text: "个人年金",
        width: 20,
        columnName: "geren_nianjin",
        type: "text",
        isupd: true
      },
      {
        text: "滞纳金",
        width: 20,
        columnName: "zhinajin",
        type: "text",
        isupd: true
      },
      {
        text: "年金基数",
        width: 20,
        columnName: "nianjin_jishu",
        type: "text",
        isupd: true
      },
      {
        text: "利息",
        width: 20,
        columnName: "lixi",
        type: "text",
        isupd: true
      },
      {
        text: "个人养老",
        width: 20,
        columnName: "geren_yanglao",
        type: "text",
        isupd: true
      },
      {
        text: "企业养老",
        width: 20,
        columnName: "qiye_yanglao",
        type: "text",
        isupd: true
      },
      {
        text: "岗位",
        width: 20,
        columnName: "gangwei",
        type: "text",
        isupd: true
      },
      {
        text: "岗位工资",
        width: 20,
        columnName: "gangwei_gongzi",
        type: "text",
        isupd: true
      },
      {
        text: "企业失业",
        width: 20,
        columnName: "qiye_shiye",
        type: "text",
        isupd: true
      },
      {
        text: "工资",
        width: 20,
        columnName: "gongzi",
        type: "text",
        isupd: true
      },
      {
        text: "税率",
        width: 20,
        columnName: "shuilv",
        type: "text",
        isupd: true
      },
      {
        text: "跨度工资",
        width: 20,
        columnName: "kuadu_gongzi",
        type: "text",
        isupd: true
      },
      {
        text: "企业工伤",
        width: 20,
        columnName: "qiye_gongshang",
        type: "text",
        isupd: true
      },
      {
        text: "职称津贴",
        width: 20,
        columnName: "jintie",
        type: "text",
        isupd: true
      },
      {
        text: "企业年金",
        width: 20,
        columnName: "qiye_nianjin",
        type: "text",
        isupd: true
      },
      {
        text: "年金1%",
        width: 20,
        columnName: "nianjin1",
        type: "text",
        isupd: true
      },
      {
        text: "加班费",
        width: 20,
        columnName: "jiabanfei",
        type: "text",
        isupd: true
      },
      {
        text: "验算公式",
        width: 20,
        columnName: "yansuangongshi",
        type: "text",
        isupd: true
      },
      {
        text: "缺勤扣款",
        width: 20,
        columnName: "queqin_koukuan",
        type: "text",
        isupd: true
      },
      {
        text: "个人失业",
        width: 20,
        columnName: "geren_shiye",
        type: "text",
        isupd: true
      },
    ],
    page: "1",
    IsLastPage: false,
    id: '',
    gongsi: '',
    edit_old: '',
    modal9: false,
    mark: '',
    edit_new: '',
    id: ''
  },


  click_delete: function (e) {
    var _this = this;
    if(_this.data.result.del!=1){
      wx.showToast({
        title: '您没有权限',
        icon : 'none'
      })
      return;
    }
    var $collection = e.currentTarget.dataset
    var dbid = $collection.dbid
    var id = $collection.id
    wx.showModal({
      title: '操作选择',
      content: '确认删除么？序号'+id,
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是“取消”
      cancelColor: '', //取消文字的颜色
      confirmText: "删除", //默认是“确定”
      confirmColor: '#DD5044', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
          //这里可以callfunction！！！！
        } else {
          var sql = "delete from gongzi_peizhi where id = "+ dbid
          console.log(sql)
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: {
              query: sql
            },
            success: res => {
              _this.baochi();
            },
            err: res => {
              console.log("错误!", res)
            }
          })
          wx.showToast({
            title: '删除成功！序号为' + id,
            icon: 'none'
          })
        }
      },
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    _this.setData({
      companyName : options.companyName,
      result : JSON.parse(options.access)
    })
    wx.setNavigationBarTitle({
      title: '配置表'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4876ff',
    })
    console.log('onLoad')

    // query: "select top 100 isnull((year+'-'+month+'-'+day),'-') as jiaqi,* from gongzi_peizhi where gongsi = '"+_this.data.companyName+"'"

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        //用isnull来判断
        query: "select top 100 * from gongzi_peizhi where gongsi = '"+_this.data.companyName+"'"
      },
      success: res => {
        console.log("进入成功")
        if (res.result.recordset.length < 100) {
          this.setData({
            list: res.result.recordset,
            IsLastPage: true
          })
        } else {
          this.setData({
            list: res.result.recordset
          })
        }
      },
      err: res => {
        console.log("错误!", res)
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select peizhi from gongzi_title where peizhi is not null and peizhi != ''"
      },
      success: res => {
        console.log(res.result.recordsets[0])
        this.setData({
          title: res.result.recordsets[0]
        })
      },
      err: res => {
        console.log("错误!")
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dateTime = this.selectComponent("#tui-dateTime-ctx")
    var that = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_peizhi where gongsi = '"+that.data.companyName+"'"
      },
      success: res => {
        that.setData({
          maxpagenumber: Math.ceil(res.result.recordset[0].maxpagenumber / 100)
        })
        console.log(that.data.maxpagenumber)
      },
      err: res => {
        console.log("错误!")
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(day)as count from gongzi_peizhi where day is not null and day <>'-' and day <> '' and gongsi = '"+that.data.companyName+"'"
      },
      success: res => {
        console.log("进入成功:", res.result.recordset[0].count)
        that.setData({
          jiaqiLength: res.result.recordset[0].count + 1
        })
      },
      err: res => {
        console.log("错误!", res)
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(day)as count from gongzi_peizhi where gongsi ='"+that.data.companyName+"'"
      },
      success: res => {
        console.log("进入成功:", res.result.recordset[0].count)
        that.setData({
          maxLength: res.result.recordset[0].count + 1
        })
      },
      err: res => {
        console.log("错误!", res)
      }
    })

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
  nianyueri: function (e) {
    var that = this
    var $collection = e.currentTarget.dataset
    var id = $collection.id
    that.setData({
      id:id
    })
    if($collection.x!="-"){
      wx.showModal({
        title: '请选择操作',
        content: '删除或编辑假期配置',
        showCancel: true, //是否显示取消按钮
        cancelText: "删除", //默认是“取消”
        cancelColor: '#DD5044', //取消文字的颜色
        confirmText: "编辑", //默认是“确定”
        confirmColor: '#84B9F2', //确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            if(that.data.result.del!=1){
              wx.showToast({
                title: '您没有权限',
                icon : 'none'
              })
              return;
            }
            //取消就删除，直接云函数  （双押！！！skr）
            wx.cloud.callFunction({
              name: 'sqlServer_117',
              data: {
                query: "update gongzi_peizhi set year = null,month = null,day = null  where id =" + id
              },
              success: res => {
                that.data.list[id+1].jiaqi = '-'
                that.setData({
                  list: that.data.list
                })
                console.log("删除成功")
                that.baochi()
              },
              err: res => {
                console.log("错误!", res)
              }
            })
          } else {
            that.show()
          }
        },
        fail: function (res) {}, //接口调用失败的回调函数
        complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
      })
    }else{
      that.show();
    }
  },
  showM: function () {
    var that = this
    console.log("小小的脑袋，大大的问号?")
    wx.showModal({
      title: '请选择操作',
      content: '确认添加新的配置行？',
      showCancel: true, //是否显示取消按钮
      cancelText: "取消", //默认是“取消”
      cancelColor: '', //取消文字的颜色
      confirmText: "添加", //默认是“确定”
      confirmColor: '#84B9F2', //确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消无操作
        } else {
          that.kuaisutianjia()
        }
      },
      fail: function (res) {}, //接口调用失败的回调函数
      complete: function (res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
    })
  },

  show: function () {
    var _this = this;
    if(_this.data.result.upd!=1){
      wx.showToast({
        title: '您没有权限',
        icon : 'none'
      })
      return;
    }
    _this.setData({
      cancelColor: "#888",
      color: "#5677fc",
      setDateTime: "",
      startYear: 1980,
      endYear: 2030
    })
    _this.setData({
      type: 2
    })
    _this.dateTime.show();
  },
  change: function (e) {
    console.log(e)
    this.setData({
      result: e.detail.result,
      title_day: e.detail.day,
      title_month: e.detail.month,
      title_year: e.detail.year
    })
    this.tianjia()
  },
  //添加
  tianjia: function () {
    var that = this
    if (that.data.id == 0) {
      wx.showToast({
        title: '未知的错误发生，请联系开发者',
        icon:'none',
        duration:2000
      })
    }else if(that.data.id !=0){
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "update gongzi_peizhi set year = '" + that.data.title_year + "',month='" + that.data.title_month + "',day='" + that.data.title_day + "'where id =" + that.data.id
        },
        success: res => {
          console.log("插入成功")
          that.baochi()
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: ()=>{
          that.setData({
            //清除标志位，不这样做可能导致无法添加
            id:0
          })
        }
      })
    }
    
  },



  //添加
  kuaisutianjia: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "insert into gongzi_peizhi (gongsi) values('"+that.data.companyName+"')"
      },
      success: res => {
        console.log("插入成功!!!!!!")
        that.setData({
          list: that.data.list
        })
        that.baochi()
      },
      err: res => {
        console.log("错误!", res)
      }
    })
  },


  /*刷新页面 */
  shuaxin: function (e) {
    var that = this
    //点击关闭左遮罩
    const mode = e.currentTarget.dataset.mode;
    if (mode == "left") {
      this.setData({
        leftDrawer: false
      })
    } else {
      this.setData({
        rightDrawer: false
      })
    }
    that.onLoad()
    wx.showToast({
      title: '同步数据成功',
      icon: 'none'
    })
  },




  /*************************************下面是自定义函数，请谨慎修改***********************************/

  /*该自定义模态弹窗来自Thor UI，感谢 */
  /*函数块名称：自定义可输入弹窗的传值和编辑
    描述：自定义一个可输入的遮罩层弹窗，用的form形式，提交修改mssql数据库执行update
    作者：117
    时间：2020/5/21
  */
  edit_cell(e) {
    var that = this

    if (e.detail.value.value.length == 0) { //如果输入为空则保持原来的值
      that.setData({
        edit_new: that.data.edit_old
      })
    } else if (e.detail.value.value.length != 0) {
      that.setData({
        edit_new: e.detail.value.value
      })
    }
    console.log("选中单元格的信息：", that.data.id, that.data.edit_old) //that.data.edit_old的是单元格修改之前的值
    console.log("提交成功，得到的值为:", that.data.edit_new)
    console.log("标记位为：", that.data.mark)
    var arr = []
    //通过云函数修改数据库内容
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "update gongzi_peizhi set " + that.data.mark + " = '" + that.data.edit_new + "' where id = '" + that.data.id + "'"
      },
      success: res => {
        console.log('操作成功')
        that.baochi()
      },
      err: res => {
        console.log("错误!")
      }
    })
  },
  click_edit(e) {
    var that = this
    if(that.data.result.upd!=1){
      wx.showToast({
        title: '您没有权限',
        icon : 'none'
      })
      return;
    }
    var $collection = e.currentTarget.dataset
    that.setData({
      input_type : $collection.type,
      id: $collection.id,
      name: $collection.name,
      edit_old: $collection.x,
      mark: $collection.doinb, //这个值是传过来的该列在mssql数据库的【列标】，也是json数组中的标记位，因为标记为不能取到，所以只能一个一个在WXML中定义，然后传值（老板说json取不到标记位，我现在时间紧迫没时间研究，等有空了重看代码的时候再研究！）
      modal9: true
    })
    console.log(that.data.id, that.data.name, that.data.edit_old, that.data.modal9)
    console.log("对应数据库中查找的标记位为:", that.data.mark)
  },
  //通过清除标记位modal9，来隐藏弹窗的控制函数
  hide9() {
    var that = this
    //清除标记位
    that.setData({
      modal9: false,
    })
    console.log("隐藏自定义可输入弹窗！！")
  },





  /*
  函数块名称：1.点击编辑单元格，弹出输入模态对话框  2.长按删除单元格对应的数据库中的列
  作者：117
  时间：2020/5/20
  */

  




  /*
  函数块名称：分页逻辑
  作者：117
  时间：2020/5/15
  */
  //内嵌列表查找上一页数据
  lastpage: function () {
    var that = this
    console.log("1:islastpage?:", that.data.IsLastPage)
    //点击上一页，则取消最后一页的状态标记(但是如果是第一页则不取消标记状态，因为第一页又是最后一页的情况存在)
    if (that.data.IsLastPage && !(that.data.page == 1)) {
      that.data.IsLastPage = false
    }
    console.log("2:islastpage?:", that.data.IsLastPage)
    //判断第一页和上一页的翻页
    if (that.data.page == 1) {
      wx.showToast({
        title: '已经是第一页',
        icon: 'none'
      })
    } else {
      that.data.page--
      wx.showToast({
        title: '正在加载第' + that.data.page + '页',
        icon: 'none',
        duration: 2500
      })
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, isnull((year+'-'+month+'-'+day),'-') as jiaqi,* from gongzi_peizhi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"'"
        },
        success: res => {
          console.log("上一页进入成功：第" + this.data.page + "页")
          that.setData({
            list: res.result.recordset
          })
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {
          that.setData({
            page: this.data.page
          })
        }
      })
    }
  },
  //内嵌列表查找下一页数据
  nextpage: function () {
    var that = this
    console.log("islastpage?:", that.data.IsLastPage)
    //通过Islastpage判断是否为最后一页
    //如果第一页是最后一页，则在onload里第一次setdata中将Islastpage置true
    if (that.data.IsLastPage) {
      wx.showToast({
        title: '已经是最后一页',
        icon: 'none'
      })
    } else {
      that.data.page++
      wx.showToast({
        title: '正在加载第' + that.data.page + '页',
        icon: 'none',
        duration: 2500
      })
      wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
          query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber, isnull((year+'-'+month+'-'+day),'-') as jiaqi,* from gongzi_peizhi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"'"
        },
        success: res => {
          console.log("返回长度", res.result)
          //长度不为0则说明不是最后一页，可以输出
          if (res.result.recordset.length != 0) {
            console.log("下一页进入成功：第" + that.data.page + "页")
            that.setData({
              list: res.result.recordset,
            })
          }
          //输出的长度小于100，则本页的下一页是最后一页，将标记置true
          if (res.result.recordset.length < 100) {
            that.setData({
              IsLastPage: true
            })
            console.log("抵达最后一页")
          }
        },
        err: res => {
          console.log("错误!", res)
        },
        complete: () => {
          that.setData({
            page: this.data.page
          })
        }
      })
    }
  },








  /*
    函数块名称：左侧遮罩层
    作者：117
    时间：2020/5/14
    描述：功能按钮滑出操作区域的组件函数，包括从左侧，右侧，底部滑出，本项目只应用到从左侧滑出
    具体功能详见Thor UI 开发文档
    修改时间：
  */
  showModal: function () {
    console.log("触发函数")
    // 显示遮罩层
    // 创建动画实例 
    var animation = wx.createAnimation({
      duration: 220,
      timingFunction: "linear",
      delay: 0
    })
    //执行第一组动画：Y轴偏移500px后(盒子高度是500px) ，停
    animation.translateY(500).step()
    //导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    this.setData({
      showModalStatus: false
    })
  },
  //这是从底部弹出的模态窗口的，尚未应用的扩展模块，不要在意
  getRegion: function (e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      regionTxt: this.data.regionArr[index],
      tabIndex: index,
      showModalStatus: false
    })
    wx.showToast({
      title: '您选择了：' + this.data.regionArr[index],
      icon: "none"
    })
  },
  closeDrawer(e) {
    const mode = e.currentTarget.dataset.mode;
    if (mode == "left") {
      this.setData({
        leftDrawer: false
      })
    } else {
      this.setData({
        rightDrawer: false
      })
    }
  },
  rightDrawer() {
    this.setData({
      rightDrawer: true
    })
  },
  leftDrawer() {
    this.setData({
      leftDrawer: true
    })
  },




  /*
    函数块名称:页面处理四小龙！
    描述：
        1.baochi保持页面的页数并刷新
        2.shuaxin  刷新页面，保持页数，调用了baochi()
        3.chazhao  查找
        4.tianjia  添加，调用baochi()
    其中核心模块是保持
    作者：117
    时间:2020/5/25
  */


  //用于刷新页面时保持页数，或者跳转到某一页
  baochi: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select top 100 * from(select row_number() over(order by cast(id as int) asc) as rownumber,isnull((year+'-'+month+'-'+day),'-') as jiaqi,* from gongzi_peizhi) temp_row where rownumber > (( '" + that.data.page + "' - 1) * 100) and gongsi = '"+that.data.companyName+"'"
      },
      success: res => {
        if(res.result.recordset==""){
          that.setData({
            list: ""
          })
        }else{
          that.setData({
            list: res.result.recordset
          })
        }
        
      },
      err: res => {
        console.log("错误!", res)
      }
    })

    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select count(id) as maxpagenumber from gongzi_peizhi where gongsi = '"+that.data.companyName+"'"
      },
      success: res => {
        that.setData({
          maxpagenumber: Math.ceil(res.result.recordset[0].maxpagenumber / 100)
        })
        console.log(that.data.maxpagenumber)
      },
      err: res => {
        console.log("错误!")
      }
    })

  },


  /*刷新页面 */
  shuaxin: function (e) {
    var that = this
    //点击关闭左遮罩
    const mode = e.currentTarget.dataset.mode;
    if (mode == "left") {
      this.setData({
        leftDrawer: false
      })
    } else {
      this.setData({
        rightDrawer: false
      })
    }
    that.baochi()
    wx.showToast({
      title: '同步数据成功',
      icon: 'none'
    })
  },

  getExcel : function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.list;
    console.log(list)
    var title = _this.data.title1;
    console.log(title)
    var cloudList = {
      name : '人员信息管理',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:title[i].width,
        columnName:title[i].columnName
      })
    }
    cloudList.items = list
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获取临时路径")
            wx.hideLoading({
              success: (res) => {},
            })
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu : 'true',
              fileType : 'xlsx',
              success : res=> {
                console.log("打开Excel")
              }
            })
          }
        })
      },
      fail : res=> {
        console.log(res)
      }
    })
  },


})