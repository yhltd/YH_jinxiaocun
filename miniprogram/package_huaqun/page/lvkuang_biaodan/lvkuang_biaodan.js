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
    }]

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
    body_list_end.push({
      A:'客户名称：' + _this.data.body_list[0].customer_name,
      B:'下单日期：' + _this.data.body_list[0].insert_date,
      C:'单据编号：' + _this.data.body_list[0].order_number,
      D:'简码：' + _this.data.body_list[0].pinyin,
      E:'送货地址：' + _this.data.body_list[0].shipping_address,
    })
    body_list_end.push({
      A:'联系电话：' + _this.data.body_list[0].phone,
      B:'送货方式：' + _this.data.body_list[0].shipping_type,
      C:'安装地址：' + _this.data.body_list[0].install_address,
      D:'订单号：' + _this.data.body_list[0].customer_number,
      E:'',
    })
    for(var i=0; i<body_list.length; i++){
      body_list_end.push({
        A:'',
        B:'',
        C:'',
        D:'',
        E:'',
      })
      //序号
      body_list_end.push({
        A:'序号',
        B:(i+1) + "",
        C:'',
        D:'',
        E:'',
      })
      //第二行标题
      body_list_end.push({
        A:'',
        B:'H&高',
        C:'',
        D:'W&宽',
        E:'',
      })
      //尺寸
      body_list_end.push({
        A:'尺寸',
        B:body_list[i].height,
        C:'',
        D:body_list[i].width,
        E:'',
      })
      //下单数量
      body_list_end.push({
        A:'下单数量',
        B:body_list[i].num,
        C:'',
        D:'',
        E:'',
      })
      //铝型材
      body_list_end.push({
        A:'铝型材',
        B:body_list[i].lvxingcai,
        C:'',
        D:'',
        E:'',
      })
      //铝材颜色
      body_list_end.push({
        A:'铝材颜色',
        B:body_list[i].lvcai_yanse,
        C:'',
        D:'',
        E:'',
      })
      //玻璃深加工
      body_list_end.push({
        A:'玻璃深加工',
        B:body_list[i].boli_shenjiagong,
        C:'',
        D:'',
        E:'',
      })
      //玻璃颜色
      body_list_end.push({
        A:'玻璃颜色',
        B:body_list[i].boli_yanse,
        C:'',
        D:'',
        E:'',
      })
      //拉手型号
      body_list_end.push({
        A:'拉手型号',
        B:body_list[i].lashou_xinghao,
        C:'',
        D:'',
        E:'',
      })
      //铰链孔方向
      body_list_end.push({
        A:'铰链孔方向',
        B:'左开门',
        C:'',
        D:'右开门',
        E:'',
      })
      //开门方向数量
      body_list_end.push({
        A:'开门方向数量',
        B:body_list[i].jiaoliankong_fangxiang_left,
        C:'',
        D:body_list[i].jiaoliankong_fangxiang_right,
        E:'',
      })
      //有拉手数量（个）
      body_list_end.push({
        A:'有拉手数量（个）',
        B:body_list[i].lashou_shuliang_right,
        C:'',
        D:body_list[i].lashou_shuliang_left,
        E:'',
      })
      //拉手位方向
      body_list_end.push({
        A:'拉手位方向',
        B:'从下向上',
        C:'从右向左',
        D:'从下向上',
        E:'从左向右',
      })
      //拉手位
      body_list_end.push({
        A:'拉手位',
        B:body_list[i].lashouwei_select_left,
        C:body_list[i].lashouwei_insert_left,
        D:body_list[i].lashouwei_select_right,
        E:body_list[i].lashouwei_insert_right,
      })
      //装锁数量
      body_list_end.push({
        A:'装锁数量',
        B:body_list[i].zhuangsuoshuliang_insert_left1,
        C:'',
        D:body_list[i].zhuangsuoshuliang_insert_right1,
        E:'',
      })
      //锁孔位方向
      body_list_end.push({
        A:'锁孔位方向',
        B:'从下向上',
        C:'从右向左',
        D:'从下向上',
        E:'从左向右',
      })
      //锁孔位
      body_list_end.push({
        A:'锁孔位',
        B:body_list[i].zhuangsuofangwei_insert_left1,
        C:body_list[i].zhuangsuofangwei_insert_left2,
        D:body_list[i].zhuangsuofangwei_insert_right1,
        E:body_list[i].zhuangsuofangwei_insert_right2,
      })
      //开铰链孔
      body_list_end.push({
        A:'开铰链孔',
        B:body_list[i].kaijiaolian,
        C:'',
        D:'',
        E:'',
      })
      //铰链孔位1
      body_list_end.push({
        A:'铰链孔位1',
        B:body_list[i].jiaolian1_select_left,
        C:body_list[i].jiaolian1_insert_left,
        D:body_list[i].jiaolian1_select_right,
        E:body_list[i].jiaolian1_insert_right,
      })
      //铰链孔位2
      body_list_end.push({
        A:'铰链孔位2',
        B:body_list[i].jiaolian2_select_left,
        C:body_list[i].jiaolian2_insert_left,
        D:body_list[i].jiaolian2_select_right,
        E:body_list[i].jiaolian2_insert_right,
      })
      //铰链孔位3
      body_list_end.push({
        A:'铰链孔位3',
        B:body_list[i].jiaolian3_select_left,
        C:body_list[i].jiaolian3_insert_left,
        D:body_list[i].jiaolian3_select_right,
        E:body_list[i].jiaolian3_insert_right,
      })
      //铰链孔位4
      body_list_end.push({
        A:'铰链孔位4',
        B:body_list[i].jiaolian4_select_left,
        C:body_list[i].jiaolian4_insert_left,
        D:body_list[i].jiaolian4_select_right,
        E:body_list[i].jiaolian4_insert_right,
      })
      //铰链孔位5
      body_list_end.push({
        A:'铰链孔位5',
        B:body_list[i].jiaolian5_select_left,
        C:body_list[i].jiaolian5_insert_left,
        D:body_list[i].jiaolian5_select_right,
        E:body_list[i].jiaolian5_insert_right,
      })
      //铰链孔位2
      body_list_end.push({
        A:'铰链孔位6',
        B:body_list[i].jiaolian6_select_left,
        C:body_list[i].jiaolian6_insert_left,
        D:body_list[i].jiaolian6_select_right,
        E:body_list[i].jiaolian6_insert_right,
      })
      //附件配置
      body_list_end.push({
        A:'附件配置',
        B:body_list[i].fujian_select1,
        C:body_list[i].fujian_select2,
        D:body_list[i].fujian_select3,
        E:body_list[i].fujian_select4,
      })
      //铰链品牌
      body_list_end.push({
        A:'铰链品牌',
        B:body_list[i].pinpai_select1,
        C:body_list[i].pinpai_select2,
        D:body_list[i].pinpai_select3,
        E:body_list[i].pinpai_select4,
      })
      //数量
      body_list_end.push({
        A:'数量',
        B:body_list[i].fujian_shuliang1,
        C:body_list[i].fujian_shuliang2,
        D:body_list[i].fujian_shuliang3,
        E:body_list[i].fujian_shuliang4,
      })
      //其他项目（说明）
      body_list_end.push({
        A:'其他项目（说明）',
        B:body_list[i].qita,
        C:'',
        D:'',
        E:'',
      })
      //
      body_list_end.push({
        A:'',
        B:'数量',
        C:'单价',
        D:'金额',
        E:'',
      })
      //平方
      body_list_end.push({
        A:'平方',
        B:body_list[i].sum_shuliang1,
        C:body_list[i].danjia1,
        D:body_list[i].sum_jine1,
        E:'',
      })
      //周长
      body_list_end.push({
        A:'周长',
        B:body_list[i].sum_shuliang2,
        C:body_list[i].danjia2,
        D:body_list[i].sum_jine2,
        E:'',
      })
    }

    cloudList.items = body_list_end
    console.log(cloudList)

    wx.cloud.callFunction({
      name:'getExcel',
      data:{
        list : cloudList
      },
      success: function(res){
        console.log("获取云储存id")
        var this_name = new Date().getTime() + ".xlsx"
        var fileId = res.result.fileID
        wx.cloud.downloadFile({
          fileID : res.result.fileID,
          success : res=> {
            console.log("获得临时路径",res.tempFilePath)
            wx.getFileSystemManager().saveFile({
              tempFilePath: res.tempFilePath,
              filePath : wx.env.USER_DATA_PATH + "/" + getTime() + ".xlsx",
              success : res=> {
                let path_downLoad = res.savedFilePath
                console.log("下载完成",res)
                delCloudFile(fileId)
                wx.openDocument({
                  filePath: path_downLoad,
                  fileType : 'xlsx',
                  showMenu : true,
                  success : res=> {
                    wx.hideLoading({
                      success: (res) => {},
                    })
                    console.log("用户打开文件")
                  }
                })
              },
              fail: res=>{
                console.log(res)
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
  print: function(){
    var _this = this
    var list = _this.list
    var list2 = _this.list2
        wx.navigateTo({
          url: "../lkdayin/lkdayin?order1=" + JSON.stringify(_this.data.list[0]) +"&order2=" + JSON.stringify(_this.data.list2) 
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
function getTime(){
  var myDate = new Date();
  var year = myDate.getFullYear();
  var month = myDate.getMonth()+1 > 10 ? myDate.getMonth() + 1 : "0" + (myDate.getMonth()+1);
  var day = myDate.getDate() > 10 ? myDate.getDate() : "0" + myDate.getDate();
  return year+"-"+month+"-"+day
}

function delCloudFile(fileId){
  var fileIds = [];
  fileIds.push(fileId);
  wx.cloud.deleteFile({
    fileList: fileIds,
    success: res => {
      console.log(res.fileList);
    },
    fail : console.error
  })
}