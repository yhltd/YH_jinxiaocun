// package_huaqun/page/ddxiadan/ddxiadan.js

Page({

  /**
   * 页面的初始数据
   */
  tableShow: true,
  delWindow1: false,
  tjShow: false,
  rqxzShow1: false,
  xgShow: false,
  cxShow: false,
  xlShow: false,
  data: {
    onload_panduan:'',
    header_list:{
      customer_name:'',
      insert_date:'',
      order_number:'',
      pinyin:'',
      shipping_address:'',
      phone:'',
      shipping_type:'',
      install_address:'',
      customer_number:'',
    },
    body_list:[
      {
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',

        zhuangsuofangxiang_select_left:'',
        zhuangsuofangxiang_select_right:'',
        zhuangsuofangwei_insert_left1:'',
        zhuangsuofangwei_insert_left2:'',
        zhuangsuofangwei_insert_right1:'',
        zhuangsuofangwei_insert_right2:'',
        zhuangsuoshuliang_insert_left1:'',
        zhuangsuoshuliang_insert_left2:'',
        zhuangsuoshuliang_insert_right1:'',
        zhuangsuoshuliang_insert_right2:'',
        
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        zhuangsuofangxiang_select_left:'',
        zhuangsuofangxiang_select_right:'',
        zhuangsuofangwei_insert_left1:'',
        zhuangsuofangwei_insert_left2:'',
        zhuangsuofangwei_insert_right1:'',
        zhuangsuofangwei_insert_right2:'',
        zhuangsuoshuliang_insert_left1:'',
        zhuangsuoshuliang_insert_left2:'',
        zhuangsuoshuliang_insert_right1:'',
        zhuangsuoshuliang_insert_right2:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        zhuangsuofangxiang_select_left:'',
        zhuangsuofangxiang_select_right:'',
        zhuangsuofangwei_insert_left1:'',
        zhuangsuofangwei_insert_left2:'',
        zhuangsuofangwei_insert_right1:'',
        zhuangsuofangwei_insert_right2:'',
        zhuangsuoshuliang_insert_left1:'',
        zhuangsuoshuliang_insert_left2:'',
        zhuangsuoshuliang_insert_right1:'',
        zhuangsuoshuliang_insert_right2:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        zhuangsuofangxiang_select_left:'',
        zhuangsuofangxiang_select_right:'',
        zhuangsuofangwei_insert_left1:'',
        zhuangsuofangwei_insert_left2:'',
        zhuangsuofangwei_insert_right1:'',
        zhuangsuofangwei_insert_right2:'',
        zhuangsuoshuliang_insert_left1:'',
        zhuangsuoshuliang_insert_left2:'',
        zhuangsuoshuliang_insert_right1:'',
        zhuangsuoshuliang_insert_right2:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        zhuangsuofangxiang_select_left:'',
        zhuangsuofangxiang_select_right:'',
        zhuangsuofangwei_insert_left1:'',
        zhuangsuofangwei_insert_left2:'',
        zhuangsuofangwei_insert_right1:'',
        zhuangsuofangwei_insert_right2:'',
        zhuangsuoshuliang_insert_left1:'',
        zhuangsuoshuliang_insert_left2:'',
        zhuangsuoshuliang_insert_right1:'',
        zhuangsuoshuliang_insert_right2:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        zhuangsuofangxiang_select_left:'',
        zhuangsuofangxiang_select_right:'',
        zhuangsuofangwei_insert_left1:'',
        zhuangsuofangwei_insert_left2:'',
        zhuangsuofangwei_insert_right1:'',
        zhuangsuofangwei_insert_right2:'',
        zhuangsuoshuliang_insert_left1:'',
        zhuangsuoshuliang_insert_left2:'',
        zhuangsuoshuliang_insert_right1:'',
        zhuangsuoshuliang_insert_right2:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },
    ],
    body_list_refresh:[
      {
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        zhuangsuofangxiang_select_left:'',
        zhuangsuofangxiang_select_right:'',
        zhuangsuofangwei_insert_left1:'',
        zhuangsuofangwei_insert_left2:'',
        zhuangsuofangwei_insert_right1:'',
        zhuangsuofangwei_insert_right2:'',
        zhuangsuoshuliang_insert_left1:'',
        zhuangsuoshuliang_insert_left2:'',
        zhuangsuoshuliang_insert_right1:'',
        zhuangsuoshuliang_insert_right2:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        zhuangsuofangxiang_select_left:'',
        zhuangsuofangxiang_select_right:'',
        zhuangsuofangwei_insert_left1:'',
        zhuangsuofangwei_insert_left2:'',
        zhuangsuofangwei_insert_right1:'',
        zhuangsuofangwei_insert_right2:'',
        zhuangsuoshuliang_insert_left1:'',
        zhuangsuoshuliang_insert_left2:'',
        zhuangsuoshuliang_insert_right1:'',
        zhuangsuoshuliang_insert_right2:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        zhuangsuofangxiang_select_left:'',
        zhuangsuofangxiang_select_right:'',
        zhuangsuofangwei_insert_left1:'',
        zhuangsuofangwei_insert_left2:'',
        zhuangsuofangwei_insert_right1:'',
        zhuangsuofangwei_insert_right2:'',
        zhuangsuoshuliang_insert_left1:'',
        zhuangsuoshuliang_insert_left2:'',
        zhuangsuoshuliang_insert_right1:'',
        zhuangsuoshuliang_insert_right2:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        zhuangsuofangxiang_select_left:'',
        zhuangsuofangxiang_select_right:'',
        zhuangsuofangwei_insert_left1:'',
        zhuangsuofangwei_insert_left2:'',
        zhuangsuofangwei_insert_right1:'',
        zhuangsuofangwei_insert_right2:'',
        zhuangsuoshuliang_insert_left1:'',
        zhuangsuoshuliang_insert_left2:'',
        zhuangsuoshuliang_insert_right1:'',
        zhuangsuoshuliang_insert_right2:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        zhuangsuofangxiang_select_left:'',
        zhuangsuofangxiang_select_right:'',
        zhuangsuofangwei_insert_left1:'',
        zhuangsuofangwei_insert_left2:'',
        zhuangsuofangwei_insert_right1:'',
        zhuangsuofangwei_insert_right2:'',
        zhuangsuoshuliang_insert_left1:'',
        zhuangsuoshuliang_insert_left2:'',
        zhuangsuoshuliang_insert_right1:'',
        zhuangsuoshuliang_insert_right2:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },{ 
        height:'',
        width:'',
        lvxingcai:'',
        lvcai_yanse:'',
        boli_shenjiagong:'',
        boli_yanse:'',
        lashou_xinghao:'',
        lashou_shuliang_left:'',
        lashou_shuliang_right:'',
        lashouwei_select_left:'',
        lashouwei_insert_left:'',
        lashouwei_select_right:'',
        lashouwei_insert_right:'',
        jiaoliankong_fangxiang_left:'',
        jiaoliankong_fangxiang_right:'',
        zhuangsuofangxiang_select_left:'',
        zhuangsuofangxiang_select_right:'',
        zhuangsuofangwei_insert_left1:'',
        zhuangsuofangwei_insert_left2:'',
        zhuangsuofangwei_insert_right1:'',
        zhuangsuofangwei_insert_right2:'',
        zhuangsuoshuliang_insert_left1:'',
        zhuangsuoshuliang_insert_left2:'',
        zhuangsuoshuliang_insert_right1:'',
        zhuangsuoshuliang_insert_right2:'',
        kaijiaolian:'',
        jiaolian1_select_left:'',
        jiaolian1_insert_left:'',
        jiaolian1_select_right:'',
        jiaolian1_insert_right:'',
        jiaolian2_select_left:'',
        jiaolian2_insert_left:'',
        jiaolian2_select_right:'',
        jiaolian2_insert_right:'',
        jiaolian3_select_left:'',
        jiaolian3_insert_left:'',
        jiaolian3_select_right:'',
        jiaolian3_insert_right:'',
        jiaolian4_select_left:'',
        jiaolian4_insert_left:'',
        jiaolian4_select_right:'',
        jiaolian4_insert_right:'',
        jiaolian5_select_left:'',
        jiaolian5_insert_left:'',
        jiaolian5_select_right:'',
        jiaolian5_insert_right:'',
        jiaolian6_select_left:'',
        jiaolian6_insert_left:'',
        jiaolian6_select_right:'',
        jiaolian6_insert_right:'',
        qita:''
      },
    ],

    title:[{
      text: "",
      width: "400rpx",
      columnName: "A",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "B",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "C",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "D",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "E",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "F",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "G",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "H",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "I",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "J",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "K",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "L",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "M",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "N",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "O",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "P",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "Q",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "R",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "S",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "T",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "U",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "V",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "W",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "X",
      type: "text",
      isupd: true
    },{
      text: "",
      width: "400rpx",
      columnName: "Y",
      type: "text",
      isupd: true
    },]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    if(_this.data.onload_panduan != 1){
      var userInfo = JSON.parse(options.userInfo)
      var order_number = JSON.parse(options.order_number)
      _this.setData({
        userInfo:userInfo,
        order_number:order_number,
        onload_panduan:1
      })
    }
    _this.tableShow()
  },

  tableShow: function(){
    var _this = this
    var sql = "select * from lvkuang_xiadan where order_number ='" + _this.data.order_number + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        console.log(list)
        _this.setData({
          body_list: list
        })
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

  onInput: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    _this.setData({
      [column]: e.detail.value
    })
  },

  onInput_text: function (e) {
    var _this = this
    let column = e.currentTarget.dataset.column
    var list = _this.data.header_list
    list[column] = e.detail.value
    _this.setData({
      header_list: list
    })
  },

  clickView:function(e){
    var _this = this
    console.log(e.currentTarget.dataset.column)
    console.log(e.currentTarget.dataset.value)
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    if(_this.data.userInfo.power == '管理员' ||(_this.data.userInfo.power == '操作员' && _this.data.userInfo.pay == '是')){

    }else{
      wx.showToast({
        title: '无付款权限！',
        icon: 'none'
      })
      return;
    }
    _this.setData({
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      this_index:e.currentTarget.dataset.index,
      xgShow:true,
    })
  },

  upd1:function(){
    var _this = this
    var index = _this.data.this_index
    var this_column = _this.data.this_column
    var this_value = _this.data.this_value
    var list = _this.data.body_list
    list[index * 1][this_column] = this_value
    var sql = "update lvkuang_xiadan set " + this_column + "='" + this_value + "' where id=" + _this.data.body_list[index].id
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        wx.showToast({
          title: '修改成功！',
          icon: 'none',
          duration: 3000
        })
        _this.setData({
          xgShow:false,
        })
        _this.tableShow()
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

  qxShow: function () {
    var _this = this
    _this.setData({
      tjShow: false,
      xgShow: false,
      cxShow: false,
    })
  },

  out_put:function(){
    var _this = this;
    wx.showLoading({
      title: '打开Excel中',
      mask : 'true'
    })
    var list = _this.data.body_list;
    if(list.length == 0){
      wx.showToast({
        title: '无可导出数据，请查询后再试！',
        icon: 'none'
      })
      return;
    }

    var title = _this.data.title
    var cloudList = {
      name : '铝框下单明细',
      items : [],
      header : []
    }

    for(let i=0;i<title.length;i++){
      cloudList.header.push({
        item:title[i].text,
        type:title[i].type,
        width:parseInt(title[i].width.split("r")[0]),
        columnName:title[i].columnName
      })
    }
    var body_list = _this.data.body_list
    var body_list_end = []
    //序号
    body_list_end.push({
      A:'序号',
      B:'1',
      C:'',
      D:'',
      E:'',
      F:'2',
      G:'',
      H:'',
      I:'',
      J:'3',
      K:'',
      L:'',
      M:'',
      N:'4',
      O:'',
      P:'',
      Q:'',
      R:'5',
      S:'',
      T:'',
      U:'',
      V:'6',
      W:'',
      X:'',
      Y:'',
    })
    //第二行标题
    body_list_end.push({
      A:'',
      B:'H&高',
      C:'',
      D:'W&宽',
      E:'',
      F:'H&高',
      G:'',
      H:'W&宽',
      I:'',
      J:'H&高',
      K:'',
      L:'W&宽',
      M:'',
      N:'H&高',
      O:'',
      P:'W&宽',
      Q:'',
      R:'H&高',
      S:'',
      T:'W&宽',
      U:'',
      V:'H&高',
      W:'',
      X:'W&宽',
      Y:'',
    })
    //尺寸
    body_list_end.push({
      A:'尺寸',
      B:body_list[0].height,
      C:'',
      D:body_list[0].width,
      E:'',
      F:body_list[1].height,
      G:'',
      H:body_list[1].width,
      I:'',
      J:body_list[2].height,
      K:'',
      L:body_list[2].width,
      M:'',
      N:body_list[3].height,
      O:'',
      P:body_list[3].width,
      Q:'',
      R:body_list[4].height,
      S:'',
      T:body_list[4].width,
      U:'',
      V:body_list[5].height,
      W:'',
      X:body_list[5].width,
      Y:'',
    })
    //铝型材
    body_list_end.push({
      A:'铝型材',
      B:body_list[0].lvxingcai,
      C:'',
      D:'',
      E:'',
      F:body_list[1].lvxingcai,
      G:'',
      H:'',
      I:'',
      J:body_list[2].lvxingcai,
      K:'',
      L:'',
      M:'',
      N:body_list[3].lvxingcai,
      O:'',
      P:'',
      Q:'',
      R:body_list[4].lvxingcai,
      S:'',
      T:'',
      U:'',
      V:body_list[5].lvxingcai,
      W:'',
      X:'',
      Y:'',
    })
    //铝材颜色
    body_list_end.push({
      A:'铝材颜色',
      B:body_list[0].lvcai_yanse,
      C:'',
      D:'',
      E:'',
      F:body_list[1].lvcai_yanse,
      G:'',
      H:'',
      I:'',
      J:body_list[2].lvcai_yanse,
      K:'',
      L:'',
      M:'',
      N:body_list[3].lvcai_yanse,
      O:'',
      P:'',
      Q:'',
      R:body_list[4].lvcai_yanse,
      S:'',
      T:'',
      U:'',
      V:body_list[5].lvcai_yanse,
      W:'',
      X:'',
      Y:'',
    })
    //玻璃深加工
    body_list_end.push({
      A:'玻璃深加工',
      B:body_list[0].boli_shenjiagong,
      C:'',
      D:'',
      E:'',
      F:body_list[1].boli_shenjiagong,
      G:'',
      H:'',
      I:'',
      J:body_list[2].boli_shenjiagong,
      K:'',
      L:'',
      M:'',
      N:body_list[3].boli_shenjiagong,
      O:'',
      P:'',
      Q:'',
      R:body_list[4].boli_shenjiagong,
      S:'',
      T:'',
      U:'',
      V:body_list[5].boli_shenjiagong,
      W:'',
      X:'',
      Y:'',
    })
    //玻璃颜色
    body_list_end.push({
      A:'玻璃颜色',
      B:body_list[0].boli_yanse,
      C:'',
      D:'',
      E:'',
      F:body_list[1].boli_yanse,
      G:'',
      H:'',
      I:'',
      J:body_list[2].boli_yanse,
      K:'',
      L:'',
      M:'',
      N:body_list[3].boli_yanse,
      O:'',
      P:'',
      Q:'',
      R:body_list[4].boli_yanse,
      S:'',
      T:'',
      U:'',
      V:body_list[5].boli_yanse,
      W:'',
      X:'',
      Y:'',
    })
    //拉手型号
    body_list_end.push({
      A:'拉手型号',
      B:body_list[0].lashou_xinghao,
      C:'',
      D:'',
      E:'',
      F:body_list[1].lashou_xinghao,
      G:'',
      H:'',
      I:'',
      J:body_list[2].lashou_xinghao,
      K:'',
      L:'',
      M:'',
      N:body_list[3].lashou_xinghao,
      O:'',
      P:'',
      Q:'',
      R:body_list[4].lashou_xinghao,
      S:'',
      T:'',
      U:'',
      V:body_list[5].lashou_xinghao,
      W:'',
      X:'',
      Y:'',
    })
    //有拉手数量（个）
    body_list_end.push({
      A:'有拉手数量（个）',
      B:'右边拉手',
      C:body_list[0].lashou_shuliang_right,
      D:'左边拉手',
      E:body_list[0].lashou_shuliang_left,
      F:'右边拉手',
      G:body_list[1].lashou_shuliang_right,
      H:'左边拉手',
      I:body_list[1].lashou_shuliang_left,
      J:'右边拉手',
      K:body_list[2].lashou_shuliang_right,
      L:'左边拉手',
      M:body_list[2].lashou_shuliang_left,
      N:'右边拉手',
      O:body_list[3].lashou_shuliang_right,
      P:'左边拉手',
      Q:body_list[3].lashou_shuliang_left,
      R:'右边拉手',
      S:body_list[4].lashou_shuliang_right,
      T:'左边拉手',
      U:body_list[4].lashou_shuliang_left,
      V:'右边拉手',
      W:body_list[5].lashou_shuliang_right,
      X:'左边拉手',
      Y:body_list[5].lashou_shuliang_left,
    })
    //拉手位
    body_list_end.push({
      A:'拉手位',
      B:body_list[0].lashouwei_select_left,
      C:body_list[0].lashouwei_insert_left,
      D:body_list[0].lashouwei_select_right,
      E:body_list[0].lashouwei_insert_right,
      F:body_list[1].lashouwei_select_left,
      G:body_list[1].lashouwei_insert_left,
      H:body_list[1].lashouwei_select_right,
      I:body_list[1].lashouwei_insert_right,
      J:body_list[2].lashouwei_select_left,
      K:body_list[2].lashouwei_insert_left,
      L:body_list[2].lashouwei_select_right,
      M:body_list[2].lashouwei_insert_right,
      N:body_list[3].lashouwei_select_left,
      O:body_list[3].lashouwei_insert_left,
      P:body_list[3].lashouwei_select_right,
      Q:body_list[3].lashouwei_insert_right,
      R:body_list[4].lashouwei_select_left,
      S:body_list[4].lashouwei_insert_left,
      T:body_list[4].lashouwei_select_right,
      U:body_list[4].lashouwei_insert_right,
      V:body_list[5].lashouwei_select_left,
      W:body_list[5].lashouwei_insert_left,
      X:body_list[5].lashouwei_select_right,
      Y:body_list[5].lashouwei_insert_right,
    })
    //左右开标题
    body_list_end.push({
      A:'',
      B:'左开',
      C:'',
      D:'右开',
      E:'',
      F:'左开',
      G:'',
      H:'右开',
      I:'',
      J:'左开',
      K:'',
      L:'右开',
      M:'',
      N:'左开',
      O:'',
      P:'右开',
      Q:'',
      R:'左开',
      S:'',
      T:'右开',
      U:'',
      V:'左开',
      W:'',
      X:'右开',
      Y:'',
    })
    //铰链孔方向及数量（个）
    body_list_end.push({
      A:'铰链孔方向及数量（个）',
      B:body_list[0].jiaoliankong_fangxiang_left,
      C:'',
      D:body_list[0].jiaoliankong_fangxiang_right,
      E:'',
      F:body_list[1].jiaoliankong_fangxiang_left,
      G:'',
      H:body_list[1].jiaoliankong_fangxiang_right,
      I:'',
      J:body_list[2].jiaoliankong_fangxiang_left,
      K:'',
      L:body_list[2].jiaoliankong_fangxiang_right,
      M:'',
      N:body_list[3].jiaoliankong_fangxiang_left,
      O:'',
      P:body_list[3].jiaoliankong_fangxiang_right,
      Q:'',
      R:body_list[4].jiaoliankong_fangxiang_left,
      S:'',
      T:body_list[4].jiaoliankong_fangxiang_right,
      U:'',
      V:body_list[5].jiaoliankong_fangxiang_left,
      W:'',
      X:body_list[5].jiaoliankong_fangxiang_right,
      Y:'',
    })
    //装锁方向
    body_list_end.push({
      A:'装锁方向',
      B:body_list[0].zhuangsuofangxiang_select_left,
      C:'从右向左',
      D:body_list[0].zhuangsuofangxiang_select_right,
      E:'从左向右',
      F:body_list[1].zhuangsuofangxiang_select_left,
      G:'从右向左',
      H:body_list[1].zhuangsuofangxiang_select_right,
      I:'从左向右',
      J:body_list[2].zhuangsuofangxiang_select_left,
      K:'从右向左',
      L:body_list[2].zhuangsuofangxiang_select_right,
      M:'从左向右',
      N:body_list[3].zhuangsuofangxiang_select_left,
      O:'从右向左',
      P:body_list[3].zhuangsuofangxiang_select_right,
      Q:'从左向右',
      R:body_list[4].zhuangsuofangxiang_select_left,
      S:'从右向左',
      T:body_list[4].zhuangsuofangxiang_select_right,
      U:'从左向右',
      V:body_list[5].zhuangsuofangxiang_select_left,
      W:'从右向左',
      X:body_list[5].zhuangsuofangxiang_select_right,
      Y:'从左向右',
    })
    //装锁方位
    body_list_end.push({
      A:'装锁方位',
      B:body_list[0].zhuangsuofangwei_insert_left1,
      C:body_list[0].zhuangsuofangwei_insert_left2,
      D:body_list[0].zhuangsuofangwei_insert_right1,
      E:body_list[0].zhuangsuofangwei_insert_right2,
      F:body_list[1].zhuangsuofangwei_insert_left1,
      G:body_list[1].zhuangsuofangwei_insert_left2,
      H:body_list[1].zhuangsuofangwei_insert_right1,
      I:body_list[1].zhuangsuofangwei_insert_right2,
      J:body_list[2].zhuangsuofangwei_insert_left1,
      K:body_list[2].zhuangsuofangwei_insert_left2,
      L:body_list[2].zhuangsuofangwei_insert_right1,
      M:body_list[2].zhuangsuofangwei_insert_right2,
      N:body_list[3].zhuangsuofangwei_insert_left1,
      O:body_list[3].zhuangsuofangwei_insert_left2,
      P:body_list[3].zhuangsuofangwei_insert_right1,
      Q:body_list[3].zhuangsuofangwei_insert_right2,
      R:body_list[4].zhuangsuofangwei_insert_left1,
      S:body_list[4].zhuangsuofangwei_insert_left2,
      T:body_list[4].zhuangsuofangwei_insert_right1,
      U:body_list[4].zhuangsuofangwei_insert_right2,
      V:body_list[5].zhuangsuofangwei_insert_left1,
      W:body_list[5].zhuangsuofangwei_insert_left2,
      X:body_list[5].zhuangsuofangwei_insert_right1,
      Y:body_list[5].zhuangsuofangwei_insert_right2,
    })
    //装锁数量
    body_list_end.push({
      A:'装锁数量',
      B:body_list[0].zhuangsuoshuliang_insert_left1,
      C:body_list[0].zhuangsuoshuliang_insert_left2,
      D:body_list[0].zhuangsuoshuliang_insert_right1,
      E:body_list[0].zhuangsuoshuliang_insert_right2,
      F:body_list[1].zhuangsuoshuliang_insert_left1,
      G:body_list[1].zhuangsuoshuliang_insert_left2,
      H:body_list[1].zhuangsuoshuliang_insert_right1,
      I:body_list[1].zhuangsuoshuliang_insert_right2,
      J:body_list[2].zhuangsuoshuliang_insert_left1,
      K:body_list[2].zhuangsuoshuliang_insert_left2,
      L:body_list[2].zhuangsuoshuliang_insert_right1,
      M:body_list[2].zhuangsuoshuliang_insert_right2,
      N:body_list[3].zhuangsuoshuliang_insert_left1,
      O:body_list[3].zhuangsuoshuliang_insert_left2,
      P:body_list[3].zhuangsuoshuliang_insert_right1,
      Q:body_list[3].zhuangsuoshuliang_insert_right2,
      R:body_list[4].zhuangsuoshuliang_insert_left1,
      S:body_list[4].zhuangsuoshuliang_insert_left2,
      T:body_list[4].zhuangsuoshuliang_insert_right1,
      U:body_list[4].zhuangsuoshuliang_insert_right2,
      V:body_list[5].zhuangsuoshuliang_insert_left1,
      W:body_list[5].zhuangsuoshuliang_insert_left2,
      X:body_list[5].zhuangsuoshuliang_insert_right1,
      Y:body_list[5].zhuangsuoshuliang_insert_right2,
    })
    //开铰链孔
    body_list_end.push({
      A:'开铰链孔',
      B:body_list[0].kaijiaolian,
      C:'',
      D:'',
      E:'',
      F:body_list[1].kaijiaolian,
      G:'',
      H:'',
      I:'',
      J:body_list[2].kaijiaolian,
      K:'',
      L:'',
      M:'',
      N:body_list[3].kaijiaolian,
      O:'',
      P:'',
      Q:'',
      R:body_list[4].kaijiaolian,
      S:'',
      T:'',
      U:'',
      V:body_list[5].kaijiaolian,
      W:'',
      X:'',
      Y:'',
    })
    //铰链孔位1
    body_list_end.push({
      A:'铰链孔位1',
      B:body_list[0].jiaolian1_select_left,
      C:body_list[0].jiaolian1_insert_left,
      D:body_list[0].jiaolian1_select_right,
      E:body_list[0].jiaolian1_insert_right,
      F:body_list[1].jiaolian1_select_left,
      G:body_list[1].jiaolian1_insert_left,
      H:body_list[1].jiaolian1_select_right,
      I:body_list[1].jiaolian1_insert_right,
      J:body_list[2].jiaolian1_select_left,
      K:body_list[2].jiaolian1_insert_left,
      L:body_list[2].jiaolian1_select_right,
      M:body_list[2].jiaolian1_insert_right,
      N:body_list[3].jiaolian1_select_left,
      O:body_list[3].jiaolian1_insert_left,
      P:body_list[3].jiaolian1_select_right,
      Q:body_list[3].jiaolian1_insert_right,
      R:body_list[4].jiaolian1_select_left,
      S:body_list[4].jiaolian1_insert_left,
      T:body_list[4].jiaolian1_select_right,
      U:body_list[4].jiaolian1_insert_right,
      V:body_list[5].jiaolian1_select_left,
      W:body_list[5].jiaolian1_insert_left,
      X:body_list[5].jiaolian1_select_right,
      Y:body_list[5].jiaolian1_insert_right,
    })
    //铰链孔位2
    body_list_end.push({
      A:'铰链孔位2',
      B:body_list[0].jiaolian2_select_left,
      C:body_list[0].jiaolian2_insert_left,
      D:body_list[0].jiaolian2_select_right,
      E:body_list[0].jiaolian2_insert_right,
      F:body_list[1].jiaolian2_select_left,
      G:body_list[1].jiaolian2_insert_left,
      H:body_list[1].jiaolian2_select_right,
      I:body_list[1].jiaolian2_insert_right,
      J:body_list[2].jiaolian2_select_left,
      K:body_list[2].jiaolian2_insert_left,
      L:body_list[2].jiaolian2_select_right,
      M:body_list[2].jiaolian2_insert_right,
      N:body_list[3].jiaolian2_select_left,
      O:body_list[3].jiaolian2_insert_left,
      P:body_list[3].jiaolian2_select_right,
      Q:body_list[3].jiaolian2_insert_right,
      R:body_list[4].jiaolian2_select_left,
      S:body_list[4].jiaolian2_insert_left,
      T:body_list[4].jiaolian2_select_right,
      U:body_list[4].jiaolian2_insert_right,
      V:body_list[5].jiaolian2_select_left,
      W:body_list[5].jiaolian2_insert_left,
      X:body_list[5].jiaolian2_select_right,
      Y:body_list[5].jiaolian2_insert_right,
    })
    //铰链孔位3
    body_list_end.push({
      A:'铰链孔位3',
      B:body_list[0].jiaolian3_select_left,
      C:body_list[0].jiaolian3_insert_left,
      D:body_list[0].jiaolian3_select_right,
      E:body_list[0].jiaolian3_insert_right,
      F:body_list[1].jiaolian3_select_left,
      G:body_list[1].jiaolian3_insert_left,
      H:body_list[1].jiaolian3_select_right,
      I:body_list[1].jiaolian3_insert_right,
      J:body_list[2].jiaolian3_select_left,
      K:body_list[2].jiaolian3_insert_left,
      L:body_list[2].jiaolian3_select_right,
      M:body_list[2].jiaolian3_insert_right,
      N:body_list[3].jiaolian3_select_left,
      O:body_list[3].jiaolian3_insert_left,
      P:body_list[3].jiaolian3_select_right,
      Q:body_list[3].jiaolian3_insert_right,
      R:body_list[4].jiaolian3_select_left,
      S:body_list[4].jiaolian3_insert_left,
      T:body_list[4].jiaolian3_select_right,
      U:body_list[4].jiaolian3_insert_right,
      V:body_list[5].jiaolian3_select_left,
      W:body_list[5].jiaolian3_insert_left,
      X:body_list[5].jiaolian3_select_right,
      Y:body_list[5].jiaolian3_insert_right,
    })
    //铰链孔位4
    body_list_end.push({
      A:'铰链孔位4',
      B:body_list[0].jiaolian4_select_left,
      C:body_list[0].jiaolian4_insert_left,
      D:body_list[0].jiaolian4_select_right,
      E:body_list[0].jiaolian4_insert_right,
      F:body_list[1].jiaolian4_select_left,
      G:body_list[1].jiaolian4_insert_left,
      H:body_list[1].jiaolian4_select_right,
      I:body_list[1].jiaolian4_insert_right,
      J:body_list[2].jiaolian4_select_left,
      K:body_list[2].jiaolian4_insert_left,
      L:body_list[2].jiaolian4_select_right,
      M:body_list[2].jiaolian4_insert_right,
      N:body_list[3].jiaolian4_select_left,
      O:body_list[3].jiaolian4_insert_left,
      P:body_list[3].jiaolian4_select_right,
      Q:body_list[3].jiaolian4_insert_right,
      R:body_list[4].jiaolian4_select_left,
      S:body_list[4].jiaolian4_insert_left,
      T:body_list[4].jiaolian4_select_right,
      U:body_list[4].jiaolian4_insert_right,
      V:body_list[5].jiaolian4_select_left,
      W:body_list[5].jiaolian4_insert_left,
      X:body_list[5].jiaolian4_select_right,
      Y:body_list[5].jiaolian4_insert_right,
    })
    //铰链孔位5
    body_list_end.push({
      A:'铰链孔位5',
      B:body_list[0].jiaolian5_select_left,
      C:body_list[0].jiaolian5_insert_left,
      D:body_list[0].jiaolian5_select_right,
      E:body_list[0].jiaolian5_insert_right,
      F:body_list[1].jiaolian5_select_left,
      G:body_list[1].jiaolian5_insert_left,
      H:body_list[1].jiaolian5_select_right,
      I:body_list[1].jiaolian5_insert_right,
      J:body_list[2].jiaolian5_select_left,
      K:body_list[2].jiaolian5_insert_left,
      L:body_list[2].jiaolian5_select_right,
      M:body_list[2].jiaolian5_insert_right,
      N:body_list[3].jiaolian5_select_left,
      O:body_list[3].jiaolian5_insert_left,
      P:body_list[3].jiaolian5_select_right,
      Q:body_list[3].jiaolian5_insert_right,
      R:body_list[4].jiaolian5_select_left,
      S:body_list[4].jiaolian5_insert_left,
      T:body_list[4].jiaolian5_select_right,
      U:body_list[4].jiaolian5_insert_right,
      V:body_list[5].jiaolian5_select_left,
      W:body_list[5].jiaolian5_insert_left,
      X:body_list[5].jiaolian5_select_right,
      Y:body_list[5].jiaolian5_insert_right,
    })
    //铰链孔位6
    body_list_end.push({
      A:'铰链孔位6',
      B:body_list[0].jiaolian6_select_left,
      C:body_list[0].jiaolian6_insert_left,
      D:body_list[0].jiaolian6_select_right,
      E:body_list[0].jiaolian6_insert_right,
      F:body_list[1].jiaolian6_select_left,
      G:body_list[1].jiaolian6_insert_left,
      H:body_list[1].jiaolian6_select_right,
      I:body_list[1].jiaolian6_insert_right,
      J:body_list[2].jiaolian6_select_left,
      K:body_list[2].jiaolian6_insert_left,
      L:body_list[2].jiaolian6_select_right,
      M:body_list[2].jiaolian6_insert_right,
      N:body_list[3].jiaolian6_select_left,
      O:body_list[3].jiaolian6_insert_left,
      P:body_list[3].jiaolian6_select_right,
      Q:body_list[3].jiaolian6_insert_right,
      R:body_list[4].jiaolian6_select_left,
      S:body_list[4].jiaolian6_insert_left,
      T:body_list[4].jiaolian6_select_right,
      U:body_list[4].jiaolian6_insert_right,
      V:body_list[5].jiaolian6_select_left,
      W:body_list[5].jiaolian6_insert_left,
      X:body_list[5].jiaolian6_select_right,
      Y:body_list[5].jiaolian6_insert_right,
    })
    //其他项目（说明）
    body_list_end.push({
      A:'其他项目（说明）',
      B:body_list[0].qita,
      C:'',
      D:'',
      E:'',
      F:body_list[1].qita,
      G:'',
      H:'',
      I:'',
      J:body_list[2].qita,
      K:'',
      L:'',
      M:'',
      N:body_list[3].qita,
      O:'',
      P:'',
      Q:'',
      R:body_list[4].qita,
      S:'',
      T:'',
      U:'',
      V:body_list[5].qita,
      W:'',
      X:'',
      Y:'',
    })
    //金额
    body_list_end.push({
      A:'金额',
      B:body_list[0].money,
      C:'',
      D:'',
      E:'',
      F:body_list[1].money,
      G:'',
      H:'',
      I:'',
      J:body_list[2].money,
      K:'',
      L:'',
      M:'',
      N:body_list[3].money,
      O:'',
      P:'',
      Q:'',
      R:body_list[4].money,
      S:'',
      T:'',
      U:'',
      V:body_list[5].money,
      W:'',
      X:'',
      Y:'',
    })

    cloudList.items = body_list_end
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})