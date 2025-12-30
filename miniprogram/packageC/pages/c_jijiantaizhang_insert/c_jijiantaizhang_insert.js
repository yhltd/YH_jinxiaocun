Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : [],
    initHidView : false,
    hid_view : false,
    empty : "",
    insert_date :"",
    
    // 表单字段
    accounting : "选择科目",
    project: "",        // 项目名称
    receivable: "",     // 应收
    receipts: "",       // 实收
    cope: "",          // 应付
    payment: "",       // 实付
    tax_amount: "",    // 纳税金额 - 新增
    paid_tax: "",      // 已交税金额 - 新增
    zhaiyao: "",       // 摘要
    huilvMap: {}, // 新增：存储币种->汇率的映射，如 {USD: 6.5, EUR: 7.2}
// 添加定时器，用于延迟计算
calculationTimer: null,
    getAccountingItems : [
      {
        text : "科目名称",
        list : []
      }
    ],
    // 税率配置数据（数组形式）
    shuilvList: [],  // 改为数组形式，存储所有税率阶梯
     // 添加计算选项配置
   // 添加计算选项配置
   calculateOptions: [
    { value: "receivable", label: "应收金额" },
    { value: "receipts", label: "实收金额" },
    { value: "profit", label: "利润" }
  ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      userInfo : JSON.parse(options.userInfo)
    })
    var userInfo = JSON.parse(options.userInfo)

    // 修改SQL查询，获取所有税率配置
    var sql = "select invoice_type from InvoicePeizhi where company ='" + userInfo.company + "';select kehu from KehuPeizhi where company ='" + userInfo.company + "';select shuilv, linjiezhi from shuilvPeizhi where company ='" + userInfo.company + "' ;select huilv, bizhong from waibiPeizhi where company ='" + userInfo.company + "' "
    console.log(sql)
    wx.cloud.callFunction({
      name : 'sqlServer_cw',
      data : {
        query : sql
      },
      success: res => {
        var this_list = res.result.recordsets
        console.log(res.result)
        console.log(this_list)
        var kehu_select = res.result.recordsets[1]
        var zhonglei_select = res.result.recordsets[0]
        var shuilv_select = res.result.recordsets[2]
        var bizhong_select = res.result.recordsets[3]
        var kehu = []
        var zhonglei = []
        var bizhong = []
      
        // 构建汇率映射
        var huilvMap = {};
        for(var i = 0; i < bizhong_select.length; i++) {
          var item = bizhong_select[i];
          if (item.bizhong && item.huilv) {
            huilvMap[item.bizhong] = parseFloat(item.huilv);
          }
        }
      
        for(var i=0; i< kehu_select.length; i++){
          kehu.push(kehu_select[i].kehu)
        }
        for(var i=0; i< zhonglei_select.length; i++){
          zhonglei.push(zhonglei_select[i].invoice_type)
        }
        for(var i=0; i< bizhong_select.length; i++){
          bizhong.push(bizhong_select[i].bizhong)
        }
        
        // 在币种列表的开头添加一个空值选项
        bizhong.unshift('');  // 添加空值选项
        
        // 保存税率配置数据
        _this.setData({
          kehu_list : kehu,
          zhonglei_list : zhonglei,
          bizhong_list : bizhong,  // 现在包含空值选项
          shuilvList: shuilv_select || [],
          huilvMap: huilvMap
        })
        
        console.log('税率配置数据：', _this.data.shuilvList)
      }
    })
    
    _this.getAccountingItems()
  },
 


  bindPickerChange1: function(e) {
    var _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    _this.setData({
      kehu: _this.data.kehu_list[e.detail.value]
    })
  },




  reset: function() {
    var _this = this;
    _this.setData({
      project: "",
      kehu: "",
      bizhong: "",  // 清空币种
      insert_date: "",
      receivable: "",
      receipts: "",
      cope: "",
      payment: "",
      tax_amount: "",
      paid_tax: "",
      zhaiyao: "",
      accounting: '选择科目',
    })
  },


  save : function(e){
    wx.showLoading({
      title : '加载中',
      mask : 'true'
    })
    var _this = this;
    
    var form = e.detail.value;
    var result = _this.checkFrom(form)

    if(_this.data.accounting != "选择科目"){
      if(result==""){
        // 修改SQL，添加纳税金额字段
        var sql = "insert into SimpleData(accounting,project,insert_date,receivable,receipts,cope,payment,kehu,zhaiyao,nashuijine,yijiaoshuijine,company) values('"+_this.data.accounting+"','"+form.project+"','"+form.insert_date+"','"+form.receivable+"','"+form.receipts+"','"+form.cope+"','"+form.payment+"','"+form.kehu+"','"+form.zhaiyao+"','"+form.tax_amount+"','"+form.paid_tax+"','"+_this.data.userInfo.company+"')"

        wx.cloud.callFunction({
          name : 'sqlServer_cw',
          data : {
            query : sql
          },
          success : res => {
            wx.hideLoading({
              complete: (res) => {
                wx.showToast({
                  title: '保存成功',
                  icon : 'success',
                  complete: res => { 
                    if(e.detail.target.dataset.type == 'submitAndReset'){
                      _this.reset();
                    }
                  }
                })
              },
            })
          }
        })
      }else{
        wx.showToast({
          title: result,
          icon : 'none'
        })
      }
    }else{
      wx.showToast({
        title: '请选择科目代码',
        icon : 'none'
      })
    }
  },

  checkFrom: function(form) {
    var formValidation = require("../../../components/utils/formValidation.js")
    var rules = [{
      name: "project",
      rule: ["required"],
      msg: ["请输入项目名称"]
    }, {
      name: "insert_date",
      rule: ["required"],
      msg: ["请输入日期"]
    }, {
      name: "kehu",
      rule: ["required"],
      msg: ["请输入客户/供应商"]
    }, {
      // 移除 isNum 验证，只检查必填
      name: "receivable",
      rule: ["required"],
      msg: ["请输入应收"]
    }, {
      name: "receipts",
      rule: ["required"],
      msg: ["请输入实收"]
    }, {
      name: "cope",
      rule: ["required"],
      msg: ["请输入应付"]
    }, {
      name: "payment",
      rule: ["required"],
      msg: ["请输入实付"]
    }, {
      name: "tax_amount",
      rule: [],  // 不验证
      msg: [""]
    }, {
      name: "paid_tax",
      rule: [],  // 不验证
      msg: [""]
    }, {
      name: "zhaiyao",
      rule: ["required"],
      msg: ["请输入摘要"]
    }]
    
    var validation = formValidation.validation(form, rules);
    
    // 手动验证数字格式
    if (validation === "") {
      var numFields = ["receivable", "receipts", "cope", "payment"];
      for (var i = 0; i < numFields.length; i++) {
        var field = numFields[i];
        var value = form[field];
        
        // 检查是否是有效数字（包括小数）
        if (value && !/^\d+(\.\d+)?$/.test(value.trim())) {
          return "请输入正确的" + this.getFieldLabel(field) + "金额";
        }
      }
    }
    
    return validation;
  },
  
  // 辅助函数：获取字段中文名
  getFieldLabel: function(fieldName) {
    var labels = {
      "receivable": "应收",
      "receipts": "实收",
      "cope": "应付",
      "payment": "实付",
      "tax_amount": "纳税金额",
      "paid_tax": "已交税金额"
    };
    return labels[fieldName] || fieldName;
  },










  /**
   * 
   * 验证项目代码
   */

  showGetCode : function(){
    var _this = this;
    _this.showView(_this,"getCode")
  },

  changeClass : function(e){
    var _this = this;
    var itemsIndex = e.detail.currentItemId;
    var itemIndex = e.detail.current;
    var class_id = _this.data.getAccountingItems[itemsIndex].list[itemIndex].className

    _this.setData({
      accounting : class_id
    })
  },

  getAccountingItems : function(){
    var _this = this;
    var sql = "select accounting from SimpleAccounting where company = '"+_this.data.userInfo.company+"'"

    wx.cloud.callFunction({
      name : 'sqlServer_cw',
      data : {
        query : sql
      },
      success : res => {
        var getAccountingItems = _this.data.getAccountingItems
        for(let i=1;i<=res.result.recordset.length;i++){
          getAccountingItems[0].list.push({class:i,className:res.result.recordset[i-1].accounting})
        }
        console.log(getAccountingItems)
        _this.setData({
          getAccountingItems
        })
      }
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
    var _this = this;
    _this.hid_view();
  },

  //动画效果
  
  hidView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })

    switch(type){
      case "getCode":
        animation.translateY(-300).step()
        _this.setData({
          animationData_getCode : animation.export(),
          hid_view : false
        })
        break;
      case "getParentCode":
        animation.translateY(-300).step()
        _this.setData({
          animationData_getParentCode : animation.export()
        })
        break;
    }
  },

  showView : function(_this,type){
    var animation = wx.createAnimation({
      duration : 300
    })
    _this.setData({
      initHidView : false,
      hid_view : true
    })

    wx.nextTick(()=>{
      switch(type){
        case "getCode":
          animation.translateX(0).step()
          _this.setData({
            animationData_getCode : animation.export()
          })
          if(_this.data.accounting == '选择科目'){
            _this.setData({
              accounting: _this.data.getAccountingItems[0].list[0].className
            })
          }
          break;
        case "getParentCode":
          animation.translateX(0).step()
          _this.setData({
            animationData_getParentCode : animation.export()
          })
          break;
      }
    })
  },

  hid_view : function(){
    var _this = this;
    _this.hidView(_this,"getCode")
    _this.hidView(_this,"getParentCode")
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      insert_date: e.detail.value
    })
  },

// 应收计算
calculateReceivable: function() {
  var _this = this;
  var project = _this.data.project; // 从project字段获取项目名称
  
  if (!project) {
    wx.showToast({
      title: '请先输入项目名称',
      icon: 'none'
    })
    return;
  }
  
  wx.showLoading({
    title: '计算中...',
    mask: true
  })
  
  // 查询应收数据
  var sql = "SELECT jine FROM ysyfpeizhi WHERE xiangmumingcheng = '" + project + "' AND ysyf = '应收' AND company = '" + _this.data.userInfo.company + "'";
  
  wx.cloud.callFunction({
    name: 'sqlServer_cw',
    data: {
      query: sql
    },
    success: res => {
      wx.hideLoading();
      var list = res.result.recordset;
      var total = 0;
      
      if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          var jine = list[i].jine;
          if (jine) {
            // 分割逗号分隔的数字并求和
            var numbers = jine.split(',').map(num => parseFloat(num.trim()) || 0);
            for (var j = 0; j < numbers.length; j++) {
              total += numbers[j];
            }
          }
        }
        
        // 将结果设置到应收输入框
        _this.setData({
          receivable: total.toString()
        });
        
        wx.showToast({
          title: '计算完成：' + total,
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: '未找到相关应收数据',
          icon: 'none'
        })
      }
    },
    fail: err => {
      wx.hideLoading();
      wx.showToast({
        title: '计算失败',
        icon: 'none'
      })
      console.error('计算失败:', err);
    }
  })
},

// 应付计算
calculatePayable: function() {
  var _this = this;
  var project = _this.data.project; // 从project字段获取项目名称
  
  if (!project) {
    wx.showToast({
      title: '请先输入项目名称',
      icon: 'none'
    })
    return;
  }
  
  wx.showLoading({
    title: '计算中...',
    mask: true
  })
  
  // 查询应付数据
  var sql = "SELECT jine FROM ysyfpeizhi WHERE xiangmumingcheng = '" + project + "' AND ysyf = '应付' AND company = '" + _this.data.userInfo.company + "'";
  
  wx.cloud.callFunction({
    name: 'sqlServer_cw',
    data: {
      query: sql
    },
    success: res => {
      wx.hideLoading();
      var list = res.result.recordset;
      var total = 0;
      
      if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          var jine = list[i].jine;
          if (jine) {
            // 分割逗号分隔的数字并求和
            var numbers = jine.split(',').map(num => parseFloat(num.trim()) || 0);
            for (var j = 0; j < numbers.length; j++) {
              total += numbers[j];
            }
          }
        }
        
        // 将结果设置到应付输入框
        _this.setData({
          cope: total.toString()
        });
        
        wx.showToast({
          title: '计算完成：' + total,
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: '未找到相关应付数据',
          icon: 'none'
        })
      }
    },
    fail: err => {
      wx.hideLoading();
      wx.showToast({
        title: '计算失败',
        icon: 'none'
      })
      console.error('计算失败:', err);
    }
  })
},

// 处理项目名称输入
bindProjectInput: function(e) {
  var value = e.detail.value;
  this.setData({
    project: value
  });
},
// 处理应收金额输入
bindReceivableInput: function(e) {
  var value = e.detail.value;
  var _this = this;
  
  // 1. 先更新显示值
  _this.setData({
    receivable: value
  });
  
  // 2. 清除之前的定时器
  clearTimeout(_this.data.calculationTimer);
  
  // 3. 设置新的延迟计算（500ms后执行）
  _this.data.calculationTimer = setTimeout(function() {
    _this.calculateAndUpdateCNY('receivable');
  }, 1000);
},
// 处理实收金额输入
bindshishouInput: function(e) {
  var value = e.detail.value;
  var _this = this;
  
  _this.setData({
    receipts: value
  });
  
  clearTimeout(_this.data.calculationTimer);
  
  _this.data.calculationTimer = setTimeout(function() {
    _this.calculateAndUpdateCNY('receipts');
  }, 1000);
},
// 处理实付金额输入
bindshifuInput: function(e) {
  var value = e.detail.value;
  var _this = this;
  
  _this.setData({
    payment: value
  });
  
  clearTimeout(_this.data.calculationTimer);
  
  _this.data.calculationTimer = setTimeout(function() {
    _this.calculateAndUpdateCNY('payment');
  }, 1000);
},

// 处理应付金额输入
bindyingfuInput: function(e) {
  var value = e.detail.value;
  var _this = this;
  
  _this.setData({
    cope: value
  });
  
  clearTimeout(_this.data.calculationTimer);
  
  _this.data.calculationTimer = setTimeout(function() {
    _this.calculateAndUpdateCNY('cope');
  }, 1000);
},

// 纳税计算函数（改为调用选择器）
calculateTax: function() {
  this.showCalculateTaxOptions();
},

// 核心计算函数
calculateTaxAmount: function(receivable, shuilvList) {
  // 1. 按临界值升序排序
  var sortedList = shuilvList.slice().sort(function(a, b) {
    return parseFloat(a.linjiezhi) - parseFloat(b.linjiezhi);
  });
  
  // 2. 如果应收金额小于最小临界值，直接返回0（免税）
  var minThreshold = parseFloat(sortedList[0].linjiezhi) || 0;
  if (receivable <= minThreshold) {
    return 0;
  }
  
  var totalTax = 0;
  
  // 3. 阶梯计算
  for (var i = 0; i < sortedList.length; i++) {
    var current = sortedList[i];
    var currentRate = parseFloat(current.shuilv) || 0;
    var currentThreshold = parseFloat(current.linjiezhi) || 0;
    
    // 获取下一级临界值
    var nextThreshold = Infinity;
    if (i < sortedList.length - 1) {
      nextThreshold = parseFloat(sortedList[i + 1].linjiezhi);
    }
    
    // 如果金额大于当前临界值
    if (receivable > currentThreshold) {
      // 计算当前阶梯的金额
      var amountInThisStep = Math.min(receivable, nextThreshold) - currentThreshold;
      
      if (amountInThisStep > 0) {
        var taxInThisStep = amountInThisStep * (currentRate / 100);
        totalTax += taxInThisStep;
      }
    } else {
      // 金额小于等于当前临界值，结束计算
      break;
    }
  }
  
  return totalTax;
},

// 显示计算选项（带当前数值预览）
showCalculateTaxOptions: function() {
  var _this = this;
  
  // 计算利润
  var receipts = parseFloat(_this.data.receipts) || 0;
  var payment = parseFloat(_this.data.payment) || 0;
  var profit = receipts - payment;
  
  // 生成带数值的选项文本
  var itemList = [
    `应收金额: ${(parseFloat(_this.data.receivable) || 0).toFixed(2)}元`,
    `实收金额: ${receipts.toFixed(2)}元`,
    `利润: ${profit.toFixed(2)}元`
  ];
  
  wx.showActionSheet({
    itemList: itemList,
    success: function(res) {
      var selectedIndex = res.tapIndex;
      var selectedOption = _this.data.calculateOptions[selectedIndex];
      
      // 获取计算基准值和标签
      var baseValue, baseLabel;
      
      switch(selectedOption.value) {
        case "receivable":
          baseValue = parseFloat(_this.data.receivable) || 0;
          baseLabel = "应收金额";
          break;
        case "receipts":
          baseValue = parseFloat(_this.data.receipts) || 0;
          baseLabel = "实收金额";
          break;
        case "profit":
          var receiptsVal = parseFloat(_this.data.receipts) || 0;
          var paymentVal = parseFloat(_this.data.payment) || 0;
          baseValue = receiptsVal - paymentVal;
          baseLabel = "利润";
          break;
      }
      
      // 执行计算
      _this.performTaxCalculation(selectedOption.value, baseLabel, baseValue);
    },
    fail: function(res) {
      console.log('用户取消选择');
    }
  });
},

// 执行实际的纳税计算
performTaxCalculation: function(baseField, baseLabel, baseValue) {
  var _this = this;
  
  if (baseValue <= 0) {
    if (baseValue < 0) {
      wx.showToast({
        title: `${baseLabel}为负数，无法计算`,
        icon: 'none'
      });
      return;
    }
    // 如果为0，询问是否继续
    wx.showModal({
      title: '提示',
      content: `${baseLabel}为0，是否继续计算？`,
      success: function(res) {
        if (res.confirm) {
          _this.continueTaxCalculation(baseField, baseLabel, baseValue);
        }
      }
    });
    return;
  }

  this.continueTaxCalculation(baseField, baseLabel, baseValue);
},

// 继续计算函数
continueTaxCalculation: function(baseField, baseLabel, baseValue) {
  var _this = this;
  
  // 检查是否有税率配置数据
  if (!_this.data.shuilvList || _this.data.shuilvList.length === 0) {
    wx.showToast({
      title: '未配置税率信息',
      icon: 'none'
    });
    return;
  }

  wx.showLoading({
    title: `基于${baseLabel}计算中...`,
    mask: true
  });

  // 计算税额
  var taxAmount = _this.calculateTaxAmount(baseValue, _this.data.shuilvList);
  
  // 延迟显示结果
  setTimeout(function() {
    _this.setData({
      tax_amount: taxAmount.toFixed(2)
    });
    
    wx.hideLoading();
    
    // 显示计算详情
    _this.showCalculationDetail(baseField, baseLabel, baseValue, taxAmount);
  }, 800);
},

// 显示计算详情
showCalculationDetail: function(baseField, baseLabel, baseValue, taxAmount) {
  var _this = this;
  var detailContent = '';
  
  // 如果是利润，显示计算过程
  if (baseField === "profit") {
    var receipts = parseFloat(_this.data.receipts) || 0;
    var payment = parseFloat(_this.data.payment) || 0;
    detailContent += `利润计算过程：\n`;
    detailContent += `实收金额：${receipts.toFixed(2)}元\n`;
    detailContent += `实付金额：${payment.toFixed(2)}元\n`;
    detailContent += `利润 = ${receipts.toFixed(2)} - ${payment.toFixed(2)} = ${baseValue.toFixed(2)}元\n\n`;
  }
  
  detailContent += `计算基准：${baseLabel}\n`;
  detailContent += `基准金额：${baseValue.toFixed(2)}元\n\n`;
  
  // 获取税率阶梯详情
  var rateDetail = _this.getTaxRateDetail(baseValue, _this.data.shuilvList);
  detailContent += rateDetail;
  
  wx.showModal({
    title: '纳税计算详情',
    content: detailContent,
    showCancel: false,
    confirmText: '确定'
  });
},

// 获取税率阶梯详情
getTaxRateDetail: function(amount, shuilvList) {
  var sortedList = shuilvList.slice().sort(function(a, b) {
    return parseFloat(a.linjiezhi) - parseFloat(b.linjiezhi);
  });
  
  var text = "税率阶梯计算：\n";
  var totalTax = 0;
  
  // 如果金额小于最小临界值，免税
  var minThreshold = parseFloat(sortedList[0].linjiezhi) || 0;
  if (amount <= minThreshold) {
    return `金额${amount.toFixed(2)}元 ≤ ${minThreshold.toFixed(2)}元（起征点），免税\n\n应纳税额：0.00元`;
  }
  
  for (var i = 0; i < sortedList.length; i++) {
    var current = sortedList[i];
    var currentRate = parseFloat(current.shuilv) || 0;
    var currentThreshold = parseFloat(current.linjiezhi) || 0;
    
    // 获取下一级临界值
    var nextThreshold = Infinity;
    if (i < sortedList.length - 1) {
      nextThreshold = parseFloat(sortedList[i + 1].linjiezhi);
    }
    
    // 如果金额大于当前临界值
    if (amount > currentThreshold) {
      // 计算当前阶梯的金额
      var amountInThisStep = Math.min(amount, nextThreshold) - currentThreshold;
      
      if (amountInThisStep > 0) {
        var taxInThisStep = amountInThisStep * (currentRate / 100);
        totalTax += taxInThisStep;
        
        text += `${i+1}. ${currentThreshold.toFixed(2)}-${Math.min(amount, nextThreshold).toFixed(2)}元，税率${currentRate}%\n`;
        text += `   税额：${amountInThisStep.toFixed(2)} × ${currentRate}% = ${taxInThisStep.toFixed(2)}元\n`;
      }
    } else {
      break;
    }
  }
  
  text += `\n合计应纳税额：${totalTax.toFixed(2)}元\n`;
  text += `实际税率：${(totalTax / amount * 100).toFixed(2)}%`;
  
  return text;
},

// 核心：根据币种计算人民币金额，只计算指定的字段
calculateAndUpdateCNY: function(fieldName) {
  var _this = this;
  var bizhong = _this.data.bizhong;
  var huilvMap = _this.data.huilvMap;
  
  // 如果没有选择币种，直接返回
  if (!bizhong || !huilvMap[bizhong]) {
    console.log('未选择币种或无对应汇率');
    return;
  }

  var exchangeRate = huilvMap[bizhong];
  
  // 只获取当前字段的值
  var originalValue = _this.data[fieldName];
  
  // 仅当有值且为有效数字时进行转换
  if (originalValue && !isNaN(parseFloat(originalValue))) {
    var cnyValue = (parseFloat(originalValue) * exchangeRate).toFixed(2);
    
    // 只更新当前字段
    var updateData = {};
    updateData[fieldName] = cnyValue;
    
    console.log(`${fieldName}: ${originalValue} ${bizhong} -> ${cnyValue} CNY`);
    
    _this.setData(updateData);
  }
},

// 币种选择变更时调用
bindPickerChange2: function(e) {
  var _this = this;
  console.log('picker发送选择改变，携带值为', e.detail.value);
  
  var selectedIndex = e.detail.value;
  var selectedBizhong = _this.data.bizhong_list[selectedIndex];
  
  // 1. 更新币种
  _this.setData({
    bizhong: selectedBizhong
  }, function() {
    // 2. 如果选择了空值，不进行汇率计算
    if (selectedBizhong === '') {
      console.log('用户选择了空值（不选择币种），不进行汇率计算');
      return;
    }
    
    // 3. 币种变更后，重新计算所有四个字段
    if (_this.data.huilvMap[selectedBizhong]) {
      // 延迟一小段时间确保数据更新完成
      setTimeout(function() {
        _this.calculateAndUpdateCNY('receivable');
        _this.calculateAndUpdateCNY('receipts');
        _this.calculateAndUpdateCNY('cope');
        _this.calculateAndUpdateCNY('payment');
      }, 100);
    } else {
      console.log('选择的币种没有对应的汇率');
    }
  });
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