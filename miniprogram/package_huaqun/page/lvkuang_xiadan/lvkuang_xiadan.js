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
  rqxzShow2: false,
  data: {
    minDate: new Date(2000, 1, 1).getTime(),
    maxDate: new Date(2099, 12, 31).getTime(),
    currentDate: new Date().getTime(),
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
        num:'',
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
        qita:'',
        sum_shuliang1:'',
        danjia1:'',
        sum_jine1:'',
        sum_shuliang2:'',
        danjia2:'',
        sum_jine2:'',
      },{ 
        height:'',
        width:'',
        num:'',
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
        qita:'',
        sum_shuliang1:'',
        danjia1:'',
        sum_jine1:'',
        sum_shuliang2:'',
        danjia2:'',
        sum_jine2:'',
      },{ 
        height:'',
        width:'',
        num:'',
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
        qita:'',
        sum_shuliang1:'',
        danjia1:'',
        sum_jine1:'',
        sum_shuliang2:'',
        danjia2:'',
        sum_jine2:'',
      },{ 
        height:'',
        width:'',
        num:'',
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
        qita:'',
        sum_shuliang1:'',
        danjia1:'',
        sum_jine1:'',
        sum_shuliang2:'',
        danjia2:'',
        sum_jine2:'',
      },{ 
        height:'',
        width:'',
        num:'',
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
        qita:'',
        sum_shuliang1:'',
        danjia1:'',
        sum_jine1:'',
        sum_shuliang2:'',
        danjia2:'',
        sum_jine2:'',
      },{ 
        height:'',
        width:'',
        num:'',
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
        qita:'',
        sum_shuliang1:'',
        danjia1:'',
        sum_jine1:'',
        sum_shuliang2:'',
        danjia2:'',
        sum_jine2:'',
      },
    ],
    body_list_refresh:[
      {
        height:'',
        width:'',
        num:'',
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
        qita:'',
        sum_shuliang1:'',
        danjia1:'',
        sum_jine1:'',
        sum_shuliang2:'',
        danjia2:'',
        sum_jine2:'',
      },{ 
        height:'',
        width:'',
        num:'',
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
        qita:'',
        sum_shuliang1:'',
        danjia1:'',
        sum_jine1:'',
        sum_shuliang2:'',
        danjia2:'',
        sum_jine2:'',
      },{ 
        height:'',
        width:'',
        num:'',
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
        qita:'',
        sum_shuliang1:'',
        danjia1:'',
        sum_jine1:'',
        sum_shuliang2:'',
        danjia2:'',
        sum_jine2:'',
      },{ 
        height:'',
        width:'',
        num:'',
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
        qita:'',
        sum_shuliang1:'',
        danjia1:'',
        sum_jine1:'',
        sum_shuliang2:'',
        danjia2:'',
        sum_jine2:'',
      },{ 
        height:'',
        width:'',
        num:'',
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
        qita:'',
        sum_shuliang1:'',
        danjia1:'',
        sum_jine1:'',
        sum_shuliang2:'',
        danjia2:'',
        sum_jine2:'',
      },{ 
        height:'',
        width:'',
        num:'',
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
        qita:'',
        sum_shuliang1:'',
        danjia1:'',
        sum_jine1:'',
        sum_shuliang2:'',
        danjia2:'',
        sum_jine2:'',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    console.log(_this.data.minDate)
    console.log(_this.data.maxDate)
    console.log(_this.data.currentDate)
    if(_this.data.onload_panduan != 1){
      var userInfo = JSON.parse(options.userInfo)
      _this.setData({
        userInfo:userInfo,
        onload_panduan:1
      })
    }
    var insert_date = getNowDate()
    var header_list = _this.data.header_list
    header_list.insert_date = insert_date
    if(_this.data.userInfo.power == '客户'){
      header_list.customer_name = _this.data.userInfo.name
      header_list.pinyin = _this.data.userInfo.pinyin
    }
    _this.setData({
      header_list,
    })
    var sql = "select * from userInfo where power = '客户'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var user_list = res.result.recordset
        var customer_name = []
        for(var i=0; i<user_list.length; i++){
          if(user_list[i].name != '' && user_list[i].name != null && user_list[i].name != undefined){
            customer_name.push({
              name:user_list[i].name,
              pinyin:user_list[i].pinyin
            })
          }
        }
        _this.setData({
          customer_name
        })
      },
      err: res => {
        wx.showToast({
          title: '读取下拉列表错误！',
          icon: 'none'
        })
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })

    var bianhao_left = getBianHao()
    console.log(bianhao_left)
    var sql = "select order_number from lvkuang_xiadan where order_number like '" + bianhao_left + "%'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var bianhao_list = res.result.recordset
        var new_bianhao = "001" 
        for(var i=0; i<bianhao_list.length; i++){
          if(bianhao_list[i].order_number != '' && bianhao_list[i].order_number != null && bianhao_list[i].order_number != undefined){
            var this_bianhao = bianhao_list[i].order_number.slice(10)
            console.log(this_bianhao)
            if(this_bianhao >= new_bianhao){
              new_bianhao = (this_bianhao * 1 + 1).toString()
              if(new_bianhao.length == 1){
                new_bianhao = "00" + new_bianhao.toString()
              }else if(new_bianhao.length == 2){
                new_bianhao = "0" + new_bianhao.toString()
              }
              console.log(new_bianhao)
            }
          }
        }
        new_bianhao = bianhao_left.toString() + new_bianhao.toString()
        var header_list = _this.data.header_list
        header_list.order_number = new_bianhao
        _this.setData({
          header_list
        })
      },
      err: res => {
        wx.showToast({
          title: '读取下拉列表错误！',
          icon: 'none'
        })
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
    
    var sql = "select * from dropdowntable"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: sql
      },
      success: res => {
        var list = res.result.recordset
        var shipping_type = [{name:''}]
        var lvxingcai = [{name:''}]
        var lvcai_yanse = [{name:''}]
        var boli_shenjiagong = [{name:''}]
        var boli_yanse = [{name:''}]
        var lashou_xinghao = [{name:''}]
        var lashouwei_select_left = [{name:''}]
        var lashouwei_select_right = [{name:''}]
        var kaijiaolian = [{name:''}]
        var jiaolian1_select_left = [{name:''}]
        var jiaolian1_select_right = [{name:''}]
        var jiaolian2_select_left = [{name:''}]
        var jiaolian2_select_right = [{name:''}]
        var jiaolian3_select_left = [{name:''}]
        var jiaolian3_select_right = [{name:''}]
        var jiaolian4_select_left = [{name:''}]
        var jiaolian4_select_right = [{name:''}]
        var jiaolian5_select_left = [{name:''}]
        var jiaolian5_select_right = [{name:''}]
        var jiaolian6_select_left = [{name:''}]
        var jiaolian6_select_right = [{name:''}]
        var zhuangsuofangxiang_select_left = [{name:''}]
        var zhuangsuofangxiang_select_right = [{name:''}]
        for(var i=0; i<list.length; i++){
          if(list[i].shfs != '' && list[i].shfs != null && list[i].shfs != undefined){
            shipping_type.push({
              name:list[i].shfs,
            })
          }
          if(list[i].lxc_lk != '' && list[i].lxc_lk != null && list[i].lxc_lk != undefined){
            lvxingcai.push({
              name:list[i].lxc_lk,
            })
          }
          if(list[i].lcys_lk != '' && list[i].lcys_lk != null && list[i].lcys_lk != undefined){
            lvcai_yanse.push({
              name:list[i].lcys_lk,
            })
          }
          if(list[i].blsjg != '' && list[i].blsjg != null && list[i].blsjg != undefined){
            boli_shenjiagong.push({
              name:list[i].blsjg,
            })
          }
          if(list[i].blys != '' && list[i].blys != null && list[i].blys != undefined){
            boli_yanse.push({
              name:list[i].blys,
            })
          }
          if(list[i].lsxh != '' && list[i].lsxh != null && list[i].lsxh != undefined){
            lashou_xinghao.push({
              name:list[i].lsxh,
            })
          }
          if(list[i].lsw != '' && list[i].lsw != null && list[i].lsw != undefined){
            lashouwei_select_left.push({
              name:list[i].lsw,
            })
            lashouwei_select_right.push({
              name:list[i].lsw,
            })
          }
          if(list[i].kjlk != '' && list[i].kjlk != null && list[i].kjlk != undefined){
            kaijiaolian.push({
              name:list[i].kjlk,
            })
          }
          if(list[i].jlkw != '' && list[i].jlkw != null && list[i].jlkw != undefined){
            jiaolian1_select_left.push({
              name:list[i].jlkw,
            })
            jiaolian1_select_right.push({
              name:list[i].jlkw,
            })
            jiaolian2_select_left.push({
              name:list[i].jlkw,
            })
            jiaolian2_select_right.push({
              name:list[i].jlkw,
            })
            jiaolian3_select_left.push({
              name:list[i].jlkw,
            })
            jiaolian3_select_right.push({
              name:list[i].jlkw,
            })
            jiaolian4_select_left.push({
              name:list[i].jlkw,
            })
            jiaolian4_select_right.push({
              name:list[i].jlkw,
            })
            jiaolian5_select_left.push({
              name:list[i].jlkw,
            })
            jiaolian5_select_right.push({
              name:list[i].jlkw,
            })
            jiaolian6_select_left.push({
              name:list[i].jlkw,
            })
            jiaolian6_select_right.push({
              name:list[i].jlkw,
            })
            zhuangsuofangxiang_select_left.push({
              name:list[i].jlkw,
            })
            zhuangsuofangxiang_select_right.push({
              name:list[i].jlkw,
            })
          }
        }
        _this.setData({
          shipping_type,
          lvxingcai,
          lvcai_yanse,
          boli_shenjiagong,
          boli_yanse,
          lashou_xinghao,
          lashouwei_select_left,
          lashouwei_select_right,
          kaijiaolian,
          jiaolian1_select_left,
          jiaolian1_select_right,
          jiaolian2_select_left,
          jiaolian2_select_right,
          jiaolian3_select_left,
          jiaolian3_select_right,
          jiaolian4_select_left,
          jiaolian4_select_right,
          jiaolian5_select_left,
          jiaolian5_select_right,
          jiaolian6_select_left,
          jiaolian6_select_right,
          zhuangsuofangxiang_select_left,
          zhuangsuofangxiang_select_right,
        })
      },
      err: res => {
        wx.showToast({
          title: '读取下拉列表错误！',
          icon: 'none'
        })
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
        })
        console.log("请求失败！")
      }
    })
  },

  qxShow22: function () {
    var _this = this
    _this.setData({
      rqxzShow2: false,
    })
  },

  selRIQI2: function () {
    var _this = this
    _this.setData({
      rqxzShow2: true,
    })
  },

  choiceDate: function (e) {
    //e.preventDefault(); 
    var _this = this
    var header_list = _this.data.header_list
    header_list[e.target.dataset.column_name] = e.detail.value 
    _this.setData({ 
      header_list
    })
    console.log(e.detail.value)
  },

  sel_xiala: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    console.log('index：', e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    var list = _this.data[column]

    if((column == 'jiaolian1_select_left' || column == 'jiaolian2_select_left' || column == 'jiaolian3_select_left' || column == 'jiaolian4_select_left' || column == 'jiaolian5_select_left' || column == 'jiaolian6_select_left') && _this.data.body_list[index].jiaoliankong_fangxiang_left == ''){
      wx.showToast({
        title: '未填写左开铰链孔方向及数量！',
        icon: 'none'
      })
      return;
    }

    if((column == 'jiaolian1_select_right' || column == 'jiaolian2_select_right' || column == 'jiaolian3_select_right' || column == 'jiaolian4_select_right' || column == 'jiaolian5_select_right' || column == 'jiaolian6_select_right') && _this.data.body_list[index].jiaoliankong_fangxiang_right == ''){
      wx.showToast({
        title: '未填写右开铰链孔方向及数量！',
        icon: 'none'
      })
      return;
    }

    if(column == 'jiaolian1_select_left' || column == 'jiaolian2_select_left'){
      if(_this.data.body_list[index].kaijiaolian == ''){
        wx.showToast({
          title: '开铰链孔不符合要求！',
          icon: 'none'
        })
        return;
      }
    }
    if(column == 'jiaolian1_select_right' || column == 'jiaolian2_select_right'){
      if(_this.data.body_list[index].kaijiaolian == ''){
        wx.showToast({
          title: '开铰链孔不符合要求！',
          icon: 'none'
        })
        return;
      }
    }
    if(column == 'jiaolian3_select_left'){
      if(_this.data.body_list[index].kaijiaolian == '' || _this.data.body_list[index].kaijiaolian == '开二孔'){
        wx.showToast({
          title: '开铰链孔不符合要求！',
          icon: 'none'
        })
        return;
      }
    }
    if(column == 'jiaolian3_select_right'){
      if(_this.data.body_list[index].kaijiaolian == '' || _this.data.body_list[index].kaijiaolian == '开二孔'){
        wx.showToast({
          title: '开铰链孔不符合要求！',
          icon: 'none'
        })
        return;
      }
    }
    if(column == 'jiaolian4_select_left'){
      if(_this.data.body_list[index].kaijiaolian == '' || _this.data.body_list[index].kaijiaolian == '开二孔' || _this.data.body_list[index].kaijiaolian == '开三孔'){
        wx.showToast({
          title: '开铰链孔不符合要求！',
          icon: 'none'
        })
        return;
      }
    }
    if(column == 'jiaolian4_select_right'){
      if(_this.data.body_list[index].kaijiaolian == '' || _this.data.body_list[index].kaijiaolian == '开二孔' || _this.data.body_list[index].kaijiaolian == '开三孔'){
        wx.showToast({
          title: '开铰链孔不符合要求！',
          icon: 'none'
        })
        return;
      }
    }
    if(column == 'jiaolian5_select_left'){
      if(_this.data.body_list[index].kaijiaolian == '' || _this.data.body_list[index].kaijiaolian == '开二孔' || _this.data.body_list[index].kaijiaolian == '开三孔' || _this.data.body_list[index].kaijiaolian == '开四孔'){
        wx.showToast({
          title: '开铰链孔不符合要求！',
          icon: 'none'
        })
        return;
      }
    }
    if(column == 'jiaolian5_select_right'){
      if(_this.data.body_list[index].kaijiaolian == '' || _this.data.body_list[index].kaijiaolian == '开二孔' || _this.data.body_list[index].kaijiaolian == '开三孔' || _this.data.body_list[index].kaijiaolian == '开四孔'){
        wx.showToast({
          title: '开铰链孔不符合要求！',
          icon: 'none'
        })
        return;
      }
    }
    if(column == 'jiaolian6_select_left'){
      if(_this.data.body_list[index].kaijiaolian == '' || _this.data.body_list[index].kaijiaolian == '开二孔' || _this.data.body_list[index].kaijiaolian == '开三孔' || _this.data.body_list[index].kaijiaolian == '开四孔' || _this.data.body_list[index].kaijiaolian == '开五孔'){
        wx.showToast({
          title: '开铰链孔不符合要求！',
          icon: 'none'
        })
        return;
      }
    }
    if(column == 'jiaolian6_select_right'){
      if(_this.data.body_list[index].kaijiaolian == '' || _this.data.body_list[index].kaijiaolian == '开二孔' || _this.data.body_list[index].kaijiaolian == '开三孔' || _this.data.body_list[index].kaijiaolian == '开四孔' || _this.data.body_list[index].kaijiaolian == '开五孔'){
        wx.showToast({
          title: '开铰链孔不符合要求！',
          icon: 'none'
        })
        return;
      }
    }

    _this.setData({
      list_xiala: list,
      click_index:index,
      click_column:column,
    })
    console.log(list)
    _this.setData({
      xlShow: true
    })
  },

  header_xiala: function (e) {
    var _this = this
    console.log('列名：', e.currentTarget.dataset.column)
    var column = e.currentTarget.dataset.column
    var list = _this.data[column]
    if(_this.data.userInfo.power == '客户' && column == 'customer_name'){
      return;
    }
    _this.setData({
      list_xiala: list,
      click_column:column,
    })
    console.log(list)
    _this.setData({
      xlShow2: true
    })
  },

  select1: function (e) {
    var _this = this
    if (e.type == "select") {
      var body_list = _this.data.body_list
      var new_val = e.detail.name
      var click_index = _this.data.click_index
      var click_column = _this.data.click_column
      body_list[click_index][click_column] = new_val
      _this.setData({
        xlShow: false,
        body_list
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow: false,
      })
    }
  },

  select2: function (e) {
    var _this = this
    if (e.type == "select") {
      var header_list = _this.data.header_list
      var new_val = e.detail.name
      var click_column = _this.data.click_column
      if(click_column == 'customer_name'){
        header_list.pinyin = e.detail.pinyin
      }
      header_list[click_column] = new_val
      _this.setData({
        xlShow2: false,
        header_list
      })
    } else if (e.type == "close") {
      _this.setData({
        xlShow2:false,
      })
    }
  },


  bindPickerChange: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为：', e.detail.value)
    console.log('列名：', e.currentTarget.dataset.column)
    console.log('index：', e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var column = e.currentTarget.dataset.column
    var body_list = _this.data.body_list
    body_list[index][column] = _this.data[column][e.detail.value] 
    _this.setData({
      body_list 
    })
  },

  save:function(){
    var _this = this
    var header_list = _this.data.header_list
    var body_list = _this.data.body_list
    if(header_list.customer_name == ''){
      wx.showToast({
        title: '未填写客户名称！',
        icon: 'none'
      })
      return;
    }
    if(header_list.insert_date == ''){
      wx.showToast({
        title: '未填写下单日期！',
        icon: 'none'
      })
      return;
    }
    if(header_list.order_number == ''){
      wx.showToast({
        title: '未填写单据编号！',
        icon: 'none'
      })
      return;
    }
    if(header_list.pinyin == ''){
      wx.showToast({
        title: '未填写简码！',
        icon: 'none'
      })
      return;
    }
    if(header_list.shipping_address == ''){
      wx.showToast({
        title: '未填写送货地址！',
        icon: 'none'
      })
      return;
    }
    if(header_list.phone == ''){
      wx.showToast({
        title: '未填写联系电话！',
        icon: 'none'
      })
      return;
    }
    if(header_list.shipping_type == ''){
      wx.showToast({
        title: '未填写送货方式！',
        icon: 'none'
      })
      return;
    }
    if(header_list.install_address == ''){
      wx.showToast({
        title: '未填写安装地址！',
        icon: 'none'
      })
      return;
    }

    var insert_sql = "insert into lvkuang_xiadan(customer_name,insert_date,order_number,pinyin,shipping_address,phone,shipping_type,install_address,customer_number,height,width,lvxingcai,lvcai_yanse,boli_shenjiagong,boli_yanse,lashou_xinghao,lashou_shuliang_right,lashou_shuliang_left,lashouwei_select_left,lashouwei_insert_left,lashouwei_select_right,lashouwei_insert_right,jiaoliankong_fangxiang_left,jiaoliankong_fangxiang_right,kaijiaolian,jiaolian1_select_left,jiaolian1_insert_left,jiaolian1_select_right,jiaolian1_insert_right,jiaolian2_select_left,jiaolian2_insert_left,jiaolian2_select_right,jiaolian2_insert_right,jiaolian3_select_left,jiaolian3_insert_left,jiaolian3_select_right,jiaolian3_insert_right,jiaolian4_select_left,jiaolian4_insert_left,jiaolian4_select_right,jiaolian4_insert_right,jiaolian5_select_left,jiaolian5_insert_left,jiaolian5_select_right,jiaolian5_insert_right,jiaolian6_select_left,jiaolian6_insert_left,jiaolian6_select_right,jiaolian6_insert_right,qita,zhuangsuofangxiang_select_left,zhuangsuofangxiang_select_right,zhuangsuofangwei_insert_left1,zhuangsuofangwei_insert_left2,zhuangsuofangwei_insert_right1,zhuangsuofangwei_insert_right2,zhuangsuoshuliang_insert_left1,zhuangsuoshuliang_insert_left2,zhuangsuoshuliang_insert_right1,zhuangsuoshuliang_insert_right2,num,sum_shuliang1,danjia1,sum_jine1,sum_shuliang2,danjia2,sum_jine2) values "
    var sql_foot = ""
    for(var i=0; i<body_list.length; i++){
      if(sql_foot == ''){
        sql_foot = "('" + header_list.customer_name + "','" + header_list.insert_date + "','" + header_list.order_number + "','" + header_list.pinyin + "','" + header_list.shipping_address + "','" + header_list.phone + "','" + header_list.shipping_type + "','" + header_list.install_address + "','" + header_list.customer_number + "','" + body_list[i].height + "','" + body_list[i].width + "','" + body_list[i].lvxingcai + "','" + body_list[i].lvcai_yanse + "','" + body_list[i].boli_shenjiagong + "','" + body_list[i].boli_yanse + "','" + body_list[i].lashou_xinghao + "','" + body_list[i].lashou_shuliang_right + "','" + body_list[i].lashou_shuliang_left + "','" + body_list[i].lashouwei_select_left + "','" + body_list[i].lashouwei_insert_left + "','" + body_list[i].lashouwei_select_right + "','" + body_list[i].lashouwei_insert_right + "','" + body_list[i].jiaoliankong_fangxiang_left + "','" + body_list[i].jiaoliankong_fangxiang_right + "','" + body_list[i].kaijiaolian + "','" + body_list[i].jiaolian1_select_left + "','" + body_list[i].jiaolian1_insert_left + "','" + body_list[i].jiaolian1_select_right + "','" + body_list[i].jiaolian1_insert_right + "','" + body_list[i].jiaolian2_select_left + "','" + body_list[i].jiaolian2_insert_left + "','" + body_list[i].jiaolian2_select_right + "','" + body_list[i].jiaolian2_insert_right + "','" + body_list[i].jiaolian3_select_left + "','" + body_list[i].jiaolian3_insert_left + "','" + body_list[i].jiaolian3_select_right + "','" + body_list[i].jiaolian3_insert_right + "','" + body_list[i].jiaolian4_select_left + "','" + body_list[i].jiaolian4_insert_left + "','" + body_list[i].jiaolian4_select_right + "','" + body_list[i].jiaolian4_insert_right + "','" + body_list[i].jiaolian5_select_left + "','" + body_list[i].jiaolian5_insert_left + "','" + body_list[i].jiaolian5_select_right + "','" + body_list[i].jiaolian5_insert_right + "','" + body_list[i].jiaolian6_select_left + "','" + body_list[i].jiaolian6_insert_left + "','" + body_list[i].jiaolian6_select_right + "','" + body_list[i].jiaolian6_insert_right + "','" + body_list[i].qita + "','" + body_list[i].zhuangsuofangxiang_select_left + "','" + body_list[i].zhuangsuofangxiang_select_right + "','" + body_list[i].zhuangsuofangwei_insert_left1 + "','" + body_list[i].zhuangsuofangwei_insert_left2 + "','" + body_list[i].zhuangsuofangwei_insert_right1 + "','" + body_list[i].zhuangsuofangwei_insert_right2 + "','" + body_list[i].zhuangsuoshuliang_insert_left1 + "','" + body_list[i].zhuangsuoshuliang_insert_left2 + "','" + body_list[i].zhuangsuoshuliang_insert_right1 + "','" + body_list[i].zhuangsuoshuliang_insert_right2 + "','" + body_list[i].num + "','" + body_list[i].sum_shuliang1 + "','" + body_list[i].danjia1 + "','" + body_list[i].sum_jine1 + "','" + body_list[i].sum_shuliang2 + "','" + body_list[i].danjia2 + "','" + body_list[i].sum_jine2 + "')"
      }else{
        sql_foot = sql_foot + ",('" + header_list.customer_name + "','" + header_list.insert_date + "','" + header_list.order_number + "','" + header_list.pinyin + "','" + header_list.shipping_address + "','" + header_list.phone + "','" + header_list.shipping_type + "','" + header_list.install_address + "','" + header_list.customer_number + "','" + body_list[i].height + "','" + body_list[i].width + "','" + body_list[i].lvxingcai + "','" + body_list[i].lvcai_yanse + "','" + body_list[i].boli_shenjiagong + "','" + body_list[i].boli_yanse + "','" + body_list[i].lashou_xinghao + "','" + body_list[i].lashou_shuliang_right + "','" + body_list[i].lashou_shuliang_left + "','" + body_list[i].lashouwei_select_left + "','" + body_list[i].lashouwei_insert_left + "','" + body_list[i].lashouwei_select_right + "','" + body_list[i].lashouwei_insert_right + "','" + body_list[i].jiaoliankong_fangxiang_left + "','" + body_list[i].jiaoliankong_fangxiang_right + "','" + body_list[i].kaijiaolian + "','" + body_list[i].jiaolian1_select_left + "','" + body_list[i].jiaolian1_insert_left + "','" + body_list[i].jiaolian1_select_right + "','" + body_list[i].jiaolian1_insert_right + "','" + body_list[i].jiaolian2_select_left + "','" + body_list[i].jiaolian2_insert_left + "','" + body_list[i].jiaolian2_select_right + "','" + body_list[i].jiaolian2_insert_right + "','" + body_list[i].jiaolian3_select_left + "','" + body_list[i].jiaolian3_insert_left + "','" + body_list[i].jiaolian3_select_right + "','" + body_list[i].jiaolian3_insert_right + "','" + body_list[i].jiaolian4_select_left + "','" + body_list[i].jiaolian4_insert_left + "','" + body_list[i].jiaolian4_select_right + "','" + body_list[i].jiaolian4_insert_right + "','" + body_list[i].jiaolian5_select_left + "','" + body_list[i].jiaolian5_insert_left + "','" + body_list[i].jiaolian5_select_right + "','" + body_list[i].jiaolian5_insert_right + "','" + body_list[i].jiaolian6_select_left + "','" + body_list[i].jiaolian6_insert_left + "','" + body_list[i].jiaolian6_select_right + "','" + body_list[i].jiaolian6_insert_right + "','" + body_list[i].qita + "','" + body_list[i].zhuangsuofangxiang_select_left + "','" + body_list[i].zhuangsuofangxiang_select_right + "','" + body_list[i].zhuangsuofangwei_insert_left1 + "','" + body_list[i].zhuangsuofangwei_insert_left2 + "','" + body_list[i].zhuangsuofangwei_insert_right1 + "','" + body_list[i].zhuangsuofangwei_insert_right2 + "','" + body_list[i].zhuangsuoshuliang_insert_left1 + "','" + body_list[i].zhuangsuoshuliang_insert_left2 + "','" + body_list[i].zhuangsuoshuliang_insert_right1 + "','" + body_list[i].zhuangsuoshuliang_insert_right2 + "','" + body_list[i].num + "','" + body_list[i].sum_shuliang1 + "','" + body_list[i].danjia1 + "','" + body_list[i].sum_jine1 + "','" + body_list[i].sum_shuliang2 + "','" + body_list[i].danjia2 + "','" + body_list[i].sum_jine2 + "')"
      }
    }
    insert_sql = insert_sql + sql_foot + ";"
    console.log(insert_sql)

    var select_sql_head = "select * from refertable "
    var select_sql_foot = ""

    for(var i=0; i<body_list.length; i++){
      if(body_list[i].lvxingcai != ''){
        if(select_sql_foot == ""){
          select_sql_foot = "where lkxh ='" + body_list[i].lvxingcai + "' "
        }else{
          select_sql_foot = select_sql_foot + "or lkxh ='" + body_list[i].lvxingcai + "' "
        }
      }
    }
    var select_sql = select_sql_head + select_sql_foot + ";"
    console.log(select_sql)
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data: {
        query: select_sql
      },
      success: res => {
        console.log(res)
        var list = res.result.recordsets
        var xuhao = ""

        var canzhao_list = res.result.recordsets[0]
        console.log(canzhao_list)
        var boli_insert_sql_head = "insert into boli_xiadan(order_number,pinyin,boli_yanse,boli_shenjiagong,num,height,width) values "
        var boli_insert_sql_foot = ""
        
        for(var i=0; i<body_list.length; i++){
          if(body_list[i].boli_yanse != '' &&  body_list[i].boli_shenjiagong != '' &&body_list[i].width != '' && body_list[i].height != '' && body_list[i].lvxingcai != '' && body_list[i].boli_yanse != '' && body_list[i].boli_shenjiagong != '' && (body_list[i].jiaoliankong_fangxiang_left != '' || body_list[i].jiaoliankong_fangxiang_right != '')){
            for(var j=0; j<canzhao_list.length; j++){
              var width = parseFloat(body_list[i].width)
              var height = parseFloat(body_list[i].height)
              var num = 0
              var num_left = parseFloat(body_list[i].jiaoliankong_fangxiang_left)
              if(num_left == NaN){
                num_left = 0
              }
              var num_right = parseFloat(body_list[i].jiaoliankong_fangxiang_right)
              if(num_right == NaN){
                num_right = 0
              }
              num = num_left + num_right
              if(width == NaN){
                width = 0
              }
              if(height == NaN){
                height = 0
              }
              if(canzhao_list[j].lkxh == body_list[i].lvxingcai && canzhao_list[j].yanse == body_list[i].lvcai_yanse){
                var this_width = parseFloat(canzhao_list[j].kuan)
                var this_height = parseFloat(canzhao_list[j].chang)
                if(this_width == NaN){
                  this_width = 0
                }
                if(this_height == NaN){
                  this_height = 0
                }
                width = width - this_width
                height = height - this_height
                if(boli_insert_sql_foot == ""){
                  boli_insert_sql_foot = "('" + header_list.order_number + "','" + header_list.pinyin + "','" + body_list[i].boli_yanse + "','" + body_list[i].boli_shenjiagong + "','" + num + "','" + height + "','" + width + "')"
                }else{
                  boli_insert_sql_foot = boli_insert_sql_foot + ",('" + header_list.order_number + "','" + header_list.pinyin + "','" + body_list[i].boli_yanse + "','" + body_list[i].boli_shenjiagong + "','" + num + "','" + height + "','" + width + "')"
                }
                break;
              }
            }
          }
        }

        if(boli_insert_sql_foot != ''){
          insert_sql = insert_sql + boli_insert_sql_head + boli_insert_sql_foot + ";"
        }
        console.log(insert_sql)
        wx.cloud.callFunction({
          name: 'sqlserver_huaqun',
          data: {
            query: insert_sql
          },
          success: res => {
            console.log(res)
            wx.showToast({
              title: '下单成功！',
              icon: 'none'
            })
            var common_Interval = setInterval(()=>
            {
              wx.navigateBack({ 
                delta: 1
              });
              clearInterval(common_Interval);
            }, 2000)
          },
          err: res => {
            console.log("错误!")
          },
          fail: res => {
            wx.showToast({
              title: '请求失败！',
              icon: 'none'
            })
            console.log("请求失败！")
          }
        })
        
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        wx.showToast({
          title: '请求失败！',
          icon: 'none'
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

  onInputDate(event) {
    var _this = this
    _this.setData({
      currentDate: event.detail,
    });
  },

  onInput22: function () {
    var _this = this
    var date = new Date(_this.data.currentDate)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())

    var riqi = Y + M + D
    var header_list = _this.data.header_list
    header_list.insert_date = riqi
    _this.setData({
      header_list
    });
    _this.qxShow22()
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
    if(_this.data.body_list[index].jiaolian1_select_left == '' && column == 'jiaolian1_insert_left' ){
      wx.showToast({
        title: '未选择铰链孔1左开方向！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.body_list[index].jiaolian2_select_left == '' && column == 'jiaolian2_insert_left' ){
      wx.showToast({
        title: '未选择铰链孔2左开方向！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.body_list[index].jiaolian3_select_left == '' && column == 'jiaolian3_insert_left' ){
      wx.showToast({
        title: '未选择铰链孔3左开方向！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.body_list[index].jiaolian4_select_left == '' && column == 'jiaolian4_insert_left' ){
      wx.showToast({
        title: '未选择铰链孔4左开方向！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.body_list[index].jiaolian5_select_left == '' && column == 'jiaolian5_insert_left' ){
      wx.showToast({
        title: '未选择铰链孔5左开方向！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.body_list[index].jiaolian6_select_left == '' && column == 'jiaolian6_insert_left' ){
      wx.showToast({
        title: '未选择铰链孔6左开方向！',
        icon: 'none'
      })
      return;
    }

    if(_this.data.body_list[index].jiaolian1_select_right == '' && column == 'jiaolian1_insert_right' ){
      wx.showToast({
        title: '未选择铰链孔1右开方向！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.body_list[index].jiaolian2_select_right == '' && column == 'jiaolian2_insert_right' ){
      wx.showToast({
        title: '未选择铰链孔2右开方向！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.body_list[index].jiaolian3_select_right == '' && column == 'jiaolian3_insert_right' ){
      wx.showToast({
        title: '未选择铰链孔3右开方向！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.body_list[index].jiaolian4_select_right == '' && column == 'jiaolian4_insert_right' ){
      wx.showToast({
        title: '未选择铰链孔4右开方向！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.body_list[index].jiaolian5_select_right == '' && column == 'jiaolian5_insert_right' ){
      wx.showToast({
        title: '未选择铰链孔5右开方向！',
        icon: 'none'
      })
      return;
    }
    if(_this.data.body_list[index].jiaolian6_select_right == '' && column == 'jiaolian6_insert_right' ){
      wx.showToast({
        title: '未选择铰链孔6右开方向！',
        icon: 'none'
      })
      return;
    }

    var column = e.currentTarget.dataset.column
    var this_type = "text"
    if(column == 'height' || column == 'width' || column == 'lashou_shuliang_right' || column == 'lashou_shuliang_left' || column == 'lashou_shuliang_left' || column == 'jiaoliankong_fangxiang_left' || column == 'jiaoliankong_fangxiang_right'){
      this_type = 'digit'
    }

    _this.setData({
      this_column:e.currentTarget.dataset.column,
      this_value:e.currentTarget.dataset.value,
      this_index:e.currentTarget.dataset.index,
      this_type:this_type,
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

    if(list[index * 1].height != '' && list[index * 1].width != '' && list[index * 1].num != ''){
      list[index].sum_shuliang1 = Math.round(list[index * 1].height * list[index * 1].width / 1000000 * list[index * 1].num * 1000) / 1000 
    }else{
      list[index].sum_shuliang1 = ''
    }

    if(list[index * 1].sum_shuliang1 != '' && list[index * 1].danjia1 != ''){
      list[index * 1].sum_jine1 = Math.round(list[index * 1].sum_shuliang1 * list[index * 1].danjia1 * 100) / 100
    }else{
      list[index].sum_jine1 = ''
    }

    if(list[index * 1].height != '' && list[index * 1].width != '' && list[index * 1].num != ''){
      list[index].sum_shuliang2 = Math.round((list[index * 1].height * 1 + list[index * 1].width * 1) / 1000 * 2 * list[index * 1].num * 1000) / 1000 
    }else{
      list[index].sum_shuliang2 = ''
    }

    if(list[index * 1].sum_shuliang2 != '' && list[index * 1].danjia2 != ''){
      list[index * 1].sum_jine2 = Math.round(list[index * 1].sum_shuliang2 * list[index * 1].danjia2 * 100) / 100
    }else{
      list[index].sum_jine2 = ''
    }

    console.log(list[index * 1])
    _this.setData({
      body_list:list,
      xgShow:false,
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

  refresh:function(){
    var _this = this 
    wx.showModal({
      title: '提示',
      content: '确认清空表单？',
      success (res) {
        if (res.confirm) {
          var body_list = _this.data.body_list_refresh
          var header_list = _this.data.header_list
          header_list.shipping_address = ''
          header_list.phone = ''
          header_list.shipping_type = ''
          header_list.install_address = ''
          header_list.customer_number = ''
          _this.setData({
            body_list:body_list,
            header_list:header_list
          })
          wx.showToast({
            title: '已清空！',
            icon: 'none'
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '已取消！',
            icon: 'none'
          })
        }
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

function getNowDate() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = year + sign1 + month + sign1 + day ;
  return currentdate;
 }

 function getBianHao() {
  var date = new Date();
  var sign1 = "-";
  var sign2 = ":";
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1; // 月
  var day  = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
  var week = weekArr[date.getDay()];
  // 给一位数数据前面加 “0”
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
   day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
   hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
   minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
   seconds = "0" + seconds;
  }
  // var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds + " " + week;
  var currentdate = "LK"+ year.toString() + month.toString() + day.toString() ;
  return currentdate;
 }