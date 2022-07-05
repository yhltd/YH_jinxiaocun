Page({
  data: {
    list: [{
      url: "../../images/rili.png",
      text: "考勤表",
      lianjie: "../kaoqin/kaoqin",
      index: 0
    },
    {
      url: "../../images/shezhi.png",
      text: "配置表",
      index: 1,
      lianjie: "../peizhi/peizhi",
    },
    {
      url: "../../images/kaoqinjilu.png",
      text: "考勤记录",
      index: 2,
      lianjie: "../kaoqinjilu/kaoqinjilu",
    },
    {
      url: "../../images/gerenxinxi.png",
      text: "个人信息",
      index: 3,
      lianjie: "../gerenxinxi/gerenxinxi",

    },
    {
      url: "../../images/renyuanxinxiguanli.png",
      text: "人员信息管理",
      index: 4,
      lianjie: "../renyuanxinxiguanli/renyuanxinxiguanli",
    },
    {
      url: "../../images/gongzimingxi.png",

      text: "工资明细",
      index: 5,
      lianjie: "../1gongzimingxi/gongzimingxi",
    },
    {
      url: "../../images/bumenhuizong.png",
      text: "部门汇总",
      index: 6,
      lianjie: "../1bumenhuizong/index",
    },
    {
      url: "../../images/gerensuodeshui.png",
      text: "个人所得税",
      index: 7,
      lianjie: "../1gerensuodeshui/gerensuodeshui"
    },
    {

      url: "../../images/baopan.png",
      text: "报盘",
      index: 8,
      lianjie: "../1baopan/baopan"
    },
    {

      url: "../../images/baoshui.png",
      text: "报税",
      index: 9,
      lianjie: "../1baoshui/index"
    },
    {

      url: "../../images/shebao.png",
      text: "社保",
      index: 10,
      lianjie: "../1shebaohuizong/index"
    },
    {
      url: "../../images/gongzitiao.png",
      text: "工资条",
      index: 11,
      lianjie: "../1gongzitiao/gongzitiao"
    },
    {
      url: "../../images/dangan.png",
      text: "员工档案",
      index: 12,
      lianjie: "../1gongzitiao/gongzitiao"
    }
    ],
    iconList: [{
      name: "refresh",
      size: 26
    }, {
      name: "search",
      size: 26
    }, {
      name: "ios",
      size: 26
    }, {
      name: "android",
      size: 26
    }, {
      name: "close",
      size: 26
    }, {
      name: "close-fill",
      size: 25
    }, {
      name: "shut",
      size: 25
    }, {
      name: "plus",
      size: 26
    }, {
      name: "star-fill",
      size: 25
    }, {
      name: "revoke",
      size: 25
    }, {
      name: "shop",
      size: 25
    }, {
      name: "shop-fill",
      size: 25
    }, {
      name: "order",
      size: 25
    }, {
      name: "feedback",
      size: 26
    }, {
      name: "like",
      size: 26
    }],
    dataList: [{
      name: "refresh",
      size: 30
    }, {
      name: "search",
      size: 30
    }, {
      name: "close-fill",
      size: 30
    }, {
      name: "shut",
      size: 30
    }, {
      name: "plus",
      size: 30
    }, {
      name: "star-fill",
      size: 30
    }, {
      name: "revoke",
      size: 30
    }, {
      name: "shop",
      size: 30
    }, {
      name: "shop-fill",
      size: 30
    }, {
      name: "order",
      size: 30
    }, {
      name: "feedback",
      size: 30
    }, {
      name: "like",
      size: 30
    }]
  },
  detail: function () {
    wx.showToast({
      title: '未完成的功能~',
      icon: "none"
    })
  }
})