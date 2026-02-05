const app = getApp();
Page({
  data: {
    // 表格标题
    title: [
      { text: "序号", width: "80rpx", columnName: "rownum" },
      { text: "订单号", width: "160rpx", columnName: "order_id" },
      { text: "排产数量", width: "120rpx", columnName: "work_num" },
      { text: "开始日期", width: "250rpx", columnName: "work_start_date" },
      { text: "订单截止日期", width: "250rpx", columnName: "jiezhishijian" },
      { text: "排产后截止日期", width: "250rpx", columnName: "paichanEndTime" },
      { text: "类型", width: "120rpx", columnName: "type" },
      { text: "是否插入", width: "120rpx", columnName: "is_insert" },
      { text: "操作", width: "150rpx", columnName: "action" }
    ],
    
    // 排产结果表格标题
    resultTitle: [
      { text: "订单号", width: "160rpx", columnName: "orderId" },
      { text: "优先级", width: "100rpx", columnName: "priority" },
      { text: "工序", width: "120rpx", columnName: "processName" },
      { text: "数量", width: "100rpx", columnName: "quantity" },
      { text: "效率", width: "120rpx", columnName: "processEfficiency" },
      { text: "生产线", width: "220rpx", columnName: "productionLine" },
      { text: "所需时间", width: "100rpx", columnName: "requiredHours" },
      { text: "开始时间", width: "250rpx", columnName: "startTime" },
      { text: "结束时间", width: "250rpx", columnName: "endTime" },
      { text: "状态", width: "100rpx", columnName: "status" },
      { text: "类型", width: "100rpx", columnName: "type" }
    ],
    
    // 查询条件
    orderIndex: -1,
    orderList: [],
    queryOrderId: '',
    
    // 分页参数
    pageNow: 1,
    pageSize: 20,
    pageSizeIndex: 1,
    total: 0,
    
    // 数据列表
    list: [],
    loading: false,
    
    // 新增对话框
    addDialogVisible: false,
    newItem: {
      orderIndex: 0,
      work_num: '',
      typeIndex: 0,
      insertIndex: 0,
      work_start_date: ''
    },
    deadlineDate: '',
    selectedOrderNum: 0,
    typeOptions: ['正常', '优先'],
    insertOptions: ['否', '是'],
    
    // 删除确认
    deleteConfirmVisible: false,
    deleteId: null,
    
    // 排产相关数据
    allWorkList: [],
    chanXianList: [],
    paichanResult: [],
    timeList: [],
    isCalculating: false,
    
    // 超期提醒
    overdueVisible: false,
    overdueMessage: '',
    
    // 权限控制
    hasAddPermission: true,
    hasUpdatePermission: true,
    hasDeletePermission: true,
    hasQueryPermission: true
  },

  onLoad: function(options) {
    this.initData();
  },

  onShow: function() {
    this.checkPermissions();
  },

  // 初始化数据
  initData: function() {
    this.getOrderList();
    this.getList();
    this.getAllChanXianList();
    this.getTimeList().then(() => {
      console.log('工作时间配置加载完成');
    }).catch(err => {
      console.error('加载工作时间配置失败:', err);
    });
  },

  // 检查权限
  checkPermissions: function() {
    const department_list = wx.getStorageSync('department_list');
    const userDepartment = wx.getStorageSync('paibanbiao_renyuan_bumen');
    
    const permissions = department_list.find(item => 
      item.department_name === userDepartment && item.view_name === "排产"
    ) || {};
    
    this.setData({
      hasAddPermission: permissions.add === "是",
      hasUpdatePermission: permissions.upd === "是",
      hasDeletePermission: permissions.del === "是",
      hasQueryPermission: permissions.sel === "是"
    });
  },

  // 获取订单列表
  // getOrderList: function() {
  //   const _this = this;
  //   wx.showLoading({ title: '加载中...' });
    
  //   wx.cloud.callFunction({
  //     name: 'sqlServer_PC',
  //     data: {
  //       query: `SELECT oi.id, oi.order_id, oi.product_name, oi.set_num, 
  //                      oi.order_date, oi.code, oi.norms
  //               FROM order_info oi
  //               WHERE oi.company = '${app.globalData.gongsi}'
  //               AND (oi.set_num - ISNULL((
  //                 SELECT SUM(wd.work_num) 
  //                 FROM work_detail wd 
  //                 WHERE wd.order_id = oi.id
  //               ), 0)) > 0
  //               ORDER BY oi.order_date DESC`
  //     },
  //     success: res => {
  //       console.log('订单列表:', res.result.recordset);
  //       _this.setData({
  //         orderList: res.result.recordset || []
  //       });
  //     },
  //     fail: err => {
  //       console.error('获取订单列表失败:', err);
  //       wx.showToast({
  //         title: '获取订单失败',
  //         icon: 'none'
  //       });
  //     },
  //     complete: () => {
  //       wx.hideLoading();
  //     }
  //   });
  // },
  getOrderList: function() {
    const _this = this;
    wx.showLoading({ title: '加载中...' });
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: `SELECT oi.id, oi.order_id, oi.product_name, oi.set_num, 
                       oi.set_date, oi.code, oi.norms
                FROM order_info oi
                WHERE oi.company = '${app.globalData.gongsi}'
                AND (oi.set_num - ISNULL((
                  SELECT SUM(wd.work_num) 
                  FROM work_detail wd 
                  WHERE wd.order_id = oi.id
                ), 0)) > 0
                ORDER BY oi.set_date DESC`
      },
      success: res => {
        console.log('订单列表:', res);
        // 修复：正确处理返回结果
        let orderList = [];
        if (res.result && res.result.success) {
          orderList = res.result.data || [];
        } else if (res.result && res.result.recordset) {
          orderList = res.result.recordset || [];
        } else if (Array.isArray(res.result)) {
          orderList = res.result;
        }
        
        _this.setData({
          orderList: orderList
        });
        console.log('处理后的订单列表:', orderList);
      },
      fail: err => {
        console.error('获取订单列表失败:', err);
        wx.showToast({
          title: '获取订单失败',
          icon: 'none'
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },
  
  // 获取主列表
  getList: function() {
    const _this = this;
    if (!this.data.hasQueryPermission) {
      wx.showToast({
        title: '无查询权限',
        icon: 'none'
      });
      return;
    }

    this.setData({ loading: true });
    
    const pageSize = this.data.pageSize;
    const pageNow = this.data.pageNow;
    const queryOrderId = this.data.queryOrderId;
    
    // 构建查询参数
    const skip = (pageNow - 1) * pageSize;
    const take = pageSize;
    
    // 借鉴PC端的分页SQL语句
    let sql = '';
    let params = {};
    
    if (queryOrderId && queryOrderId !== '') {
      // 如果有订单ID筛选
      sql = `
        SELECT * FROM (
          SELECT 
            ROW_NUMBER() OVER(ORDER BY wd.work_start_date, wd.row_num, wd.is_insert ASC) as rownum,
            wd.id,
            wd.order_id,
            wd.work_num,
            wd.work_start_date,
            wd.row_num,
            wd.type,
            wd.is_insert,
            wd.jiezhishijian,
            wd.company,
            oi.order_id as order_number,
            oi.product_name,
            oi.set_date
          FROM work_detail wd
          LEFT JOIN order_info oi ON wd.order_id = oi.id
          WHERE wd.company = '${app.globalData.gongsi}'
          AND wd.order_id = ${queryOrderId}
        ) AS temp
        WHERE rownum > ${skip} AND rownum <= ${skip + take}
        ORDER BY work_start_date, row_num, is_insert ASC
      `;
    } else {
      // 没有筛选条件，查询所有
      sql = `
        SELECT * FROM (
          SELECT 
            ROW_NUMBER() OVER(ORDER BY wd.work_start_date, wd.row_num, wd.is_insert ASC) as rownum,
            wd.id,
            wd.order_id,
            wd.work_num,
            wd.work_start_date,
            wd.row_num,
            wd.type,
            wd.is_insert,
            wd.jiezhishijian,
            wd.company,
            oi.order_id as order_number,
            oi.product_name,
            oi.set_date
          FROM work_detail wd
          LEFT JOIN order_info oi ON wd.order_id = oi.id
          WHERE wd.company = '${app.globalData.gongsi}'
        ) AS temp
        WHERE rownum > ${skip} AND rownum <= ${skip + take}
        ORDER BY work_start_date, row_num, is_insert ASC
      `;
    }

    console.log('查询SQL:', sql);

    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: sql
      },
      success: res => {
        console.log('查询结果:', res);
        
        let list = [];
        
        // 获取数据
        if (res.result && res.result.recordset) {
          list = res.result.recordset || [];
        } else if (res.result && res.result.recordsets && res.result.recordsets.length > 0) {
          list = res.result.recordsets[0] || [];
        }
        
        console.log('获取的数据列表:', list);
        
        // 处理数据，确保字段正确
        list = list.map(item => {
          // 处理空值
          if (!item.jiezhishijian && item.set_date) {
            item.jiezhishijian = item.set_date;
          }
          
          return {
            id: item.id || 0,
            rownum: item.rownum || 0,
            order_id: item.order_id || 0,
            work_num: item.work_num || 0,
            work_start_date: this.formatISOTime(item.work_start_date),
            type: item.type || 'normal',
            is_insert: item.is_insert || 0,
            jiezhishijian: this.formatISOTime(item.jiezhishijian),
            row_num: item.row_num || 0,
            company: item.company,
            order_number: item.order_number || '',
            product_name: item.product_name || '',
            paichanEndTime: this.formatISOTime(item.jiezhishijian) // 初始值
          };
        });
        
        // 获取总数
        _this.getTotalCount();
        
        _this.setData({
          list: list,
          loading: false
        });
        
        if (list.length > 0) {
          console.log('成功加载数据条数:', list.length);
          
          // 关联排产结束时间
          setTimeout(() => {
            _this.associatePaichanEndTime();
          }, 100);
          
        } else {
          wx.showToast({
            title: queryOrderId ? '该订单暂无排产数据' : '暂无数据',
            icon: 'none'
          });
        }
      },
      fail: err => {
        console.error('获取列表失败:', err);
        _this.setData({ 
          list: [],
          loading: false 
        });
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        });
      }
    });
  },
  

// 安全解析日期函数（兼容iOS）
safeParseDate: function(dateString) {
  console.log('safeParseDate输入:', dateString);
  
  if (!dateString) return null;
  
  try {
    // 处理特殊空日期
    if (typeof dateString === 'string' && dateString.includes('0001-01-01')) {
      console.log('跳过0001-01-01日期');
      return null;
    }
    
    // 如果是ISO格式: "2026-01-29T14:00:00.000Z"
    if (typeof dateString === 'string' && dateString.includes('T')) {
      // 方法1: 使用正则提取
      const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
      if (match) {
        const [, year, month, day, hour, minute, second] = match;
        // 使用兼容iOS的格式
        const compatibleDate = new Date(`${year}/${month}/${day} ${hour}:${minute}:${second}`);
        if (!isNaN(compatibleDate.getTime())) {
          console.log('解析成功:', compatibleDate);
          return compatibleDate;
        }
      }
      
      // 方法2: 直接分割
      const datePart = dateString.split('T')[0]; // "2026-01-29"
      const timePart = dateString.split('T')[1]; // "14:00:00.000Z"
      const timeWithoutMs = timePart.split('.')[0]; // "14:00:00"
      const compatibleStr = `${datePart.replace(/-/g, '/')} ${timeWithoutMs}`;
      const date = new Date(compatibleStr);
      
      if (!isNaN(date.getTime())) {
        console.log('方法2解析成功:', date);
        return date;
      }
    }
    
    // 其他格式尝试直接解析
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date;
    }
    
    console.warn('无法解析的日期:', dateString);
    return null;
  } catch (error) {
    console.error('safeParseDate错误:', error, dateString);
    return null;
  }
},
  // 获取总数
// 获取总数
getTotalCount: function() {
  const queryOrderId = this.data.queryOrderId;
  
  let sql = '';
  
  if (queryOrderId && queryOrderId !== '') {
    sql = `SELECT COUNT(*) as total 
           FROM work_detail wd
           LEFT JOIN order_info oi ON wd.order_id = oi.id
           WHERE wd.company = '${app.globalData.gongsi}'
           AND wd.order_id = ${queryOrderId}`;
  } else {
    sql = `SELECT COUNT(*) as total 
           FROM work_detail wd
           WHERE wd.company = '${app.globalData.gongsi}'`;
  }

  console.log('总数SQL:', sql);

  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: {
      query: sql
    },
    success: res => {
      console.log('总数查询结果:', res);
      
      let total = 0;
      
      if (res.result && res.result.recordset && res.result.recordset.length > 0) {
        total = res.result.recordset[0].total || 0;
      } 
      
      console.log('总数:', total);
      const totalPages = Math.max(1, Math.ceil(total / this.data.pageSize));
      this.setData({
        total: total,
        totalPages: totalPages
      });
    },
    fail: err => {
      console.error('获取总数失败:', err);
      this.setData({
        total: 0
      });
    }
  });
},

  // 获取所有工作数据用于排产计算
  // getAllWorkList: function() {
  //   const _this = this;
  //   return new Promise((resolve, reject) => {
  //     // 修复SQL，添加缺失的字段
  //     const sql = `SELECT 
  //     wd.id,
  //     wd.order_id,
  //     wd.work_num,
  //     wd.work_start_date,
  //     wd.type as dingdanleixing,
  //     wd.is_insert as charu,
  //     wd.jiezhishijian,
  //     wd.row_num,
  //     wd.company,
      
  //     -- order_info 表的字段
  //     oi.order_id as dingdanhao,
  //     oi.product_name as dingdanmingcheng,
      
  //     -- order_gongxu 表的字段
  //     og.module_id,
  //     og.module_num,
  //     (og.module_num * wd.work_num) as gongxushuliang,
      
  //     -- module_info 表的字段
  //     mi.name as gongxumingcheng,
      
  //     -- shengchanxian 表的字段 - 修正这里！
  //     sx.gongxu as shengchanxian_gongxu,
      
  //     mi.num as gongxuxiaolv
      
  //   FROM work_detail wd
  //   LEFT JOIN order_info oi ON wd.order_id = oi.id
  //   LEFT JOIN order_gongxu og ON wd.order_id = og.order_id
  //   LEFT JOIN module_info mi ON og.module_id = mi.id
  //   -- 修正关联条件：使用 gongsi 而不是 company
  //   LEFT JOIN shengchanxian sx ON mi.name = sx.gongxu AND sx.gongsi = wd.company
     
  //   WHERE wd.company = '${app.globalData.gongsi}'
  //   ORDER BY wd.work_start_date DESC, wd.row_num ASC`;
  
  //     console.log('排产查询SQL:', sql);
  
  //     wx.cloud.callFunction({
  //       name: 'sqlServer_PC',
  //       data: {
  //         query: sql
  //       },
  //       success: res => {
  //         console.log('所有工作数据查询结果:', res);
          
  //         let workData = [];
  //         if (res.result && res.result.recordset) {
  //           workData = res.result.recordset || [];
  //         }
          
  //         console.log('处理后工作数据数量:', workData.length);
  //         if (workData.length > 0) {
  //           console.log('第一条工作数据完整信息:', workData[0]);
  //           console.log('关键字段检查:');
  //           console.log('- dingdanhao:', workData[0].dingdanhao);
  //           console.log('- gongxumingcheng:', workData[0].gongxumingcheng);
  //           console.log('- gongxuxiaolv:', workData[0].gongxuxiaolv);
  //           console.log('- gongxushuliang:', workData[0].gongxushuliang);
  //         } else {
  //           console.warn('⚠️ 没有获取到工作数据！');
  //           console.log('检查: 公司名称是否正确?', app.globalData.gongsi);
  //         }
          
  //         _this.setData({
  //           allWorkList: workData
  //         });
  //         resolve(workData);
  //       },
  //       fail: err => {
  //         console.error('获取工作数据失败详情:', err);
  //         reject(err);
  //       }
  //     });
  //   });
  // },
  getAllWorkList: function() {
    const _this = this;
    return new Promise((resolve, reject) => {
      // 修改为与C#代码相同的SQL结构
      const sql = `SELECT 
      wd.id,
      wd.order_id,
      wd.work_num,
      wd.work_start_date as kaishishijian,
      wd.type as dingdanleixing,
      wd.is_insert as charu,
      wd.jiezhishijian,
      oi.order_id as dingdanhao,
      oi.product_name as dingdanmingcheng,
      (og.module_num * wd.work_num) as gongxushuliang,
      mi.name as gongxumingcheng,
      mi.num as gongxuxiaolv
    FROM work_detail wd
    INNER JOIN order_info oi ON wd.order_id = oi.id
    INNER JOIN order_gongxu og ON wd.order_id = og.order_id
    INNER JOIN module_info mi ON og.module_id = mi.id
    WHERE wd.company = '${app.globalData.gongsi}'
      AND mi.name IS NOT NULL 
      AND mi.name != ''  
    ORDER BY wd.work_start_date DESC, wd.row_num ASC`;
  
      console.log('修改后的排产查询SQL）:', sql);
  
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: sql
        },
        success: res => {
          console.log('所有工作数据查询结果:', res);
          
          let workData = [];
          if (res.result && res.result.recordset) {
            workData = res.result.recordset || [];
          }
          
          console.log('处理后工作数据数量:', workData.length);
          if (workData.length > 0) {
            console.log('第一条工作数据完整信息（与C#一致）:', workData[0]);
            console.log('关键字段检查:');
            console.log('- id:', workData[0].id);
            console.log('- dingdanhao:', workData[0].dingdanhao);
            console.log('- kaishishijian:', workData[0].kaishishijian);
            console.log('- dingdanleixing:', workData[0].dingdanleixing);
            console.log('- charu:', workData[0].charu);
            console.log('- jiezhishijian:', workData[0].jiezhishijian);
            console.log('- dingdanmingcheng:', workData[0].dingdanmingcheng);
            console.log('- gongxumingcheng:', workData[0].gongxumingcheng);
            console.log('- gongxuxiaolv:', workData[0].gongxuxiaolv);
            console.log('- gongxushuliang:', workData[0].gongxushuliang);
          } else {
            console.warn('⚠️ 没有获取到工作数据！');
          }
          
          _this.setData({
            allWorkList: workData
          });
          resolve(workData);
        },
        fail: err => {
          console.error('获取工作数据失败详情:', err);
          reject(err);
        }
      });
    });
  },

  // 订单选择变化
  onOrderChange: function(e) {
    const index = e.detail.value;
    const order = this.data.orderList[index];
    this.setData({
      orderIndex: index,
      queryOrderId: order?.id || ''
    });
  },

  // 重置查询
  resetQuery: function() {
    this.setData({
      queryOrderId: '',
      orderIndex: 0,
      pageNow: 1
    });
    this.getList();
  },

  // 打开新增对话框
  openAddDialog: function() {
    if (!this.data.hasAddPermission) {
      wx.showToast({
        title: '无添加权限',
        icon: 'none'
      });
      return;
    }

    this.setData({
      addDialogVisible: true,
      newItem: {
        orderIndex: -1,
        work_num: '',
        typeIndex: 0,
        insertIndex: 0,
        work_start_date: ''
      },
      deadlineDate: '',
      selectedOrderNum: 0
    });
  },

  // 关闭新增对话框
  closeAddDialog: function() {
    this.setData({ addDialogVisible: false });
  },

  // 新增订单选择
  onNewOrderChange: function(e) {
    const index = e.detail.value;
    const order = this.data.orderList[index];
    this.setData({
      'newItem.orderIndex': index,
      selectedOrderNum: order?.set_num || 0,
      deadlineDate: this.formatDate(order?.set_date  || '')
    });
  },
  openWorkNumEdit: function() {
    wx.showModal({
      title: '输入排产数量',
      editable: true,
      placeholderText: '请输入数字',
      maxLength: 10,
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm && res.content) {
          const value = res.content.replace(/[^0-9]/g, '');
          if (value) {
            this.setData({
              'newItem.work_num': value
            });
          }
        }
      }
    });
  },
  onInput: function(e) {
    const column = e.currentTarget.dataset.column;
    const value = e.detail.value;
    
    console.log('输入字段:', column, '值:', value);
    
    // 处理排产数量
    if (column === 'work_num') {
      this.setData({
        'newItem.work_num': value
      });
    }
    // 可以添加其他字段的处理
  },

  // 类型选择
  onTypeChange: function(e) {
    this.setData({
      'newItem.typeIndex': e.detail.value
    });
  },

  // 是否插入选择
  onInsertChange: function(e) {
    this.setData({
      'newItem.insertIndex': e.detail.value
    });
  },

  // 开始日期选择
  onStartDateChange: function(e) {
    this.setData({
      'newItem.work_start_date': e.detail.value
    });
  },

  // 截止日期选择
  onDeadlineDateChange: function(e) {
    this.setData({
      deadlineDate: e.detail.value
    });
  },

  // 新增排产记录
  addItem: function() {
    const _this = this;
    const newItem = this.data.newItem;
    const order = this.data.orderList[newItem.orderIndex];
    
    // 验证
    if (!order) {
      wx.showToast({
        title: '请选择订单',
        icon: 'none'
      });
      return;
    }
    
    if (!newItem.work_num || newItem.work_num <= 0) {
      wx.showToast({
        title: '请填写排产数量',
        icon: 'none'
      });
      return;
    }
    
    if (parseInt(newItem.work_num) > this.data.selectedOrderNum) {
      wx.showToast({
        title: `排产数量不能超过${this.data.selectedOrderNum}`,
        icon: 'none'
      });
      return;
    }
    
    if (!newItem.work_start_date) {
      wx.showToast({
        title: '请选择开始日期',
        icon: 'none'
      });
      return;
    }
  
    // 获取当前最大row_num
    const getMaxRowNumSQL = `SELECT ISNULL(MAX(row_num), 0) as max_row_num 
                             FROM work_detail 
                             WHERE company = '${app.globalData.gongsi}'`;
    
    wx.showLoading({ title: '保存中...' });
    
    // 先获取最大行号
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: getMaxRowNumSQL
      },
      success: maxRes => {
        let maxRowNum = 0;
        if (maxRes.result && maxRes.result.recordset && maxRes.result.recordset.length > 0) {
          maxRowNum = maxRes.result.recordset[0].max_row_num || 0;
        }
        
        const rowNum = maxRowNum + 1;
        
        const workDetail = {
          order_id: order.id,
          work_num: parseInt(newItem.work_num),
          work_start_date: newItem.work_start_date + ':00',
          type: newItem.typeIndex === 1 ? 'urgent' : 'normal',
          is_insert: newItem.insertIndex,
          jiezhishijian: this.data.deadlineDate ? this.data.deadlineDate + ':00' : null,
          row_num: rowNum,
          company: app.globalData.gongsi
        };
  
        const insertSQL = `INSERT INTO work_detail 
                           (order_id, work_num, work_start_date, type, is_insert, jiezhishijian, row_num, company)
                           VALUES 
                           (${workDetail.order_id}, ${workDetail.work_num}, 
                            '${workDetail.work_start_date}', '${workDetail.type}', 
                            ${workDetail.is_insert}, ${workDetail.jiezhishijian ? `'${workDetail.jiezhishijian}'` : 'NULL'}, 
                            ${workDetail.row_num}, '${workDetail.company}');
                           SELECT SCOPE_IDENTITY() as new_id;`;
  
        wx.cloud.callFunction({
          name: 'sqlServer_PC',
          data: {
            query: insertSQL
          },
          success: res => {
            wx.hideLoading();
            console.log('新增结果:', res);
            wx.showToast({
              title: '新增成功',
              icon: 'success'
            });
            _this.closeAddDialog();
            _this.getList();
            // 重新计算排产
            setTimeout(() => {
              _this.calculatePaichan();
            }, 500);
          },
          fail: err => {
            wx.hideLoading();
            console.error('新增失败:', err);
            wx.showToast({
              title: '新增失败',
              icon: 'none'
            });
          }
        });
      },
      fail: err => {
        wx.hideLoading();
        console.error('获取最大行号失败:', err);
        wx.showToast({
          title: '获取行号失败',
          icon: 'none'
        });
      }
    });
  },
// 添加获取单元格文本的方法
getCellText: function(columnName, item, index) {
  switch(columnName) {
    case 'rownum':
      return item.rownum || index + 1;
    case 'order_id':
      return item.order_number || this.formatOrderId(item.order_id);
      case 'work_start_date':
        return this.formatISOTime(item.work_start_date);
      case 'jiezhishijian':
        return this.formatISOTime(item.jiezhishijian);
      case 'paichanEndTime':
        return this.formatISOTime(item.paichanEndTime);
    case 'type':
      return  item.type;
    case 'is_insert':
      return item.is_insert == 1 ? '是' : '否';
    default:
      return item[columnName] || '';
  }
},
  // 表格点击事件
  // clickView: function(e) {
  //   const column = e.currentTarget.dataset.column;
  //   const index = e.currentTarget.dataset.index;
  //   const item = this.data.list[index];
    
  //   console.log('点击列:', column, '数据:', item);
    
  //   if (column === 'action' && this.data.hasDeletePermission) {
  //     if (item.id) {
  //       this.setData({
  //         deleteConfirmVisible: true,
  //         deleteId: item.id
  //       });
  //     } else {
  //       wx.showToast({
  //         title: '无法删除，缺少ID',
  //         icon: 'none'
  //       });
  //     }
  //   }
  // },
  clickView: function(e) {
    const column = e.currentTarget.dataset.column;
    const index = e.currentTarget.dataset.index;
    const item = this.data.list[index];
    
    console.log('点击列:', column, '数据:', item);
    
    // 根据列名执行不同操作
    switch(column) {
      case 'type':
        // 编辑类型
        this.editTypeInPlace(index, item);
        break;
        
      case 'is_insert':
        // 编辑是否插入
        this.editInsertStatusInPlace(index, item);
        break;
        
      case 'work_num':
        // 编辑排产数量
        this.editNumberInPlace(index, item, 'work_num', '排产数量', true);
        break;
        
      case 'work_start_date':
        // 编辑开始日期
        this.editDateTimeInPlace(index, item, 'work_start_date', '开始日期');
        break;
        
      case 'jiezhishijian':
        // 编辑订单截止日期
        this.editDateTimeInPlace(index, item, 'jiezhishijian', '订单截止日期');
        break;
        
      case 'paichanEndTime':
        // 编辑排产后截止日期
        this.editDateTimeInPlace(index, item, 'paichanEndTime', '排产后截止日期');
        break;
        
      case 'action':
        // 操作列（删除）
        if (this.data.hasDeletePermission && item.id) {
          this.setData({
            deleteConfirmVisible: true,
            deleteId: item.id
          });
        } else {
          wx.showToast({
            title: '无法删除，缺少ID或无权限',
            icon: 'none'
          });
        }
        break;
        
      default:
        // 其他列不处理（包括订单号）
        if (column !== 'order_id' && column !== 'rownum') {
          // 通用的文本编辑
          this.editTextInPlace(index, item, column);
        }
        break;
    }
  },
  editTextInPlace: function(index, item, columnName) {
    if (!this.data.hasUpdatePermission) {
      wx.showToast({
        title: '无编辑权限',
        icon: 'none'
      });
      return;
    }
    
    const columnTitles = {
      'product_name': '产品名称',
      'order_number': '订单号（显示）',
      // 添加其他需要显示的字段
    };
    
    const title = columnTitles[columnName] || columnName;
    const currentValue = item[columnName] || '';
    
    wx.showModal({
      title: `修改${title}`,
      content: '',
      editable: true,
      placeholderText: currentValue,
      maxLength: 200,
      success: (res) => {
        if (res.confirm && res.content !== undefined) {
          const newValue = res.content.trim();
          if (newValue !== currentValue) {
            this.updateTextValue(index, item.id, columnName, newValue, currentValue);
          }
        }
      }
    });
  },
  
  // 通用的数字编辑
  editNumberInPlace: function(index, item, columnName, displayName, mustBePositive = true) {
    if (!this.data.hasUpdatePermission) {
      wx.showToast({
        title: '无编辑权限',
        icon: 'none'
      });
      return;
    }
    
    const currentValue = item[columnName] || 0;
    
    wx.showModal({
      title: `修改${displayName}`,
      editable: true,
      placeholderText: currentValue.toString(),
      success: (res) => {
        if (res.confirm && res.content) {
          const newNum = parseFloat(res.content);
          
          // 验证
          if (isNaN(newNum)) {
            wx.showToast({
              title: '请输入有效的数字',
              icon: 'none'
            });
            return;
          }
          
          if (mustBePositive && newNum <= 0) {
            wx.showToast({
              title: '请输入正数',
              icon: 'none'
            });
            return;
          }
          
          if (columnName === 'work_num') {
            // 对于排产数量，需要检查是否超过订单总数
            this.checkAndUpdateWorkNum(index, item, newNum);
          } else {
            this.updateNumberValue(index, item.id, columnName, newNum, currentValue);
          }
        }
      }
    });
  },
  
  // 检查和更新排产数量
  checkAndUpdateWorkNum: function(index, item, newNum) {
    const _this = this;
    
    // 首先获取订单信息以检查数量限制
    const getOrderSQL = `SELECT set_num FROM order_info WHERE id = ${item.order_id}`;
    
    wx.showLoading({ title: '检查中...' });
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: getOrderSQL
      },
      success: res => {
        wx.hideLoading();
        
        let maxNum = Infinity;
        if (res.result && res.result.recordset && res.result.recordset.length > 0) {
          maxNum = res.result.recordset[0].set_num || Infinity;
        }
        
        if (newNum > maxNum) {
          wx.showModal({
            title: '警告',
            content: `排产数量不能超过订单总数(${maxNum})，是否继续？`,
            success: (modalRes) => {
              if (modalRes.confirm) {
                _this.updateNumberValue(index, item.id, 'work_num', newNum, item.work_num);
              }
            }
          });
        } else {
          _this.updateNumberValue(index, item.id, 'work_num', newNum, item.work_num);
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error('获取订单信息失败:', err);
        // 如果获取失败，直接更新
        _this.updateNumberValue(index, item.id, 'work_num', newNum, item.work_num);
      }
    });
  },
  
  // 编辑日期时间
// 编辑日期时间
editDateTimeInPlace: function(index, item, columnName, displayName) {
  if (!this.data.hasUpdatePermission) {
    wx.showToast({
      title: '无编辑权限',
      icon: 'none'
    });
    return;
  }
  
  const currentValue = item[columnName] || '';
  const currentDate = this.formatDateOnly(currentValue);
  const currentTime = this.formatTimeOnly(currentValue);
  
  wx.showActionSheet({
    itemList: ['修改日期', '修改时间', '修改日期和时间'],
    success: (res) => {
      if (res.tapIndex === 0) {
        // 修改日期 - 使用picker模式
        this.showDatePicker(index, item, columnName, currentDate, currentTime, 'date');
      } else if (res.tapIndex === 1) {
        // 修改时间 - 使用picker模式
        this.showTimePicker(index, item, columnName, currentDate, currentTime);
      } else if (res.tapIndex === 2) {
        // 修改日期和时间 - 使用picker模式
        this.showDateTimePicker(index, item, columnName, currentDate, currentTime);
      }
    }
  });
},

// 显示日期选择器
showDatePicker: function(index, item, columnName, currentDate, currentTime, mode = 'date') {
  const _this = this;
  
  wx.showModal({
    title: '选择日期',
    editable: true,
    placeholderText: '请使用格式：YYYY-MM-DD',
    content: currentDate,
    success: (modalRes) => {
      if (modalRes.confirm && modalRes.content) {
        // 验证日期格式
        const newDate = modalRes.content.trim();
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        
        if (!dateRegex.test(newDate)) {
          wx.showToast({
            title: '日期格式错误，请使用YYYY-MM-DD格式',
            icon: 'none'
          });
          return;
        }
        
        // 验证日期有效性
        const dateObj = new Date(newDate);
        if (isNaN(dateObj.getTime())) {
          wx.showToast({
            title: '无效的日期',
            icon: 'none'
          });
          return;
        }
        
        const newDateTime = currentTime ? `${newDate} ${currentTime}` : `${newDate} 00:00`;
        this.updateDateTimeValue(index, item.id, columnName, newDateTime, item[columnName]);
      }
    }
  });
},

// 显示时间选择器
showTimePicker: function(index, item, columnName, currentDate, currentTime) {
  const _this = this;
  
  wx.showModal({
    title: '选择时间',
    editable: true,
    placeholderText: '请使用格式：HH:MM',
    content: currentTime || '09:00',
    success: (modalRes) => {
      if (modalRes.confirm && modalRes.content) {
        // 验证时间格式
        const newTime = modalRes.content.trim();
        const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
        
        if (!timeRegex.test(newTime)) {
          wx.showToast({
            title: '时间格式错误，请使用HH:MM格式',
            icon: 'none'
          });
          return;
        }
        
        const newDateTime = currentDate ? `${currentDate} ${newTime}` : `2026-01-01 ${newTime}`;
        this.updateDateTimeValue(index, item.id, columnName, newDateTime, item[columnName]);
      }
    }
  });
},

// 显示日期时间选择器
showDateTimePicker: function(index, item, columnName, currentDate, currentTime) {
  const _this = this;
  
  // 先选择日期
  wx.showModal({
    title: '选择日期',
    editable: true,
    placeholderText: '请使用格式：YYYY-MM-DD',
    content: currentDate,
    success: (modalRes) => {
      if (modalRes.confirm && modalRes.content) {
        const newDate = modalRes.content.trim();
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        
        if (!dateRegex.test(newDate)) {
          wx.showToast({
            title: '日期格式错误，请使用YYYY-MM-DD格式',
            icon: 'none'
          });
          return;
        }
        
        // 再选择时间
        wx.showModal({
          title: '选择时间',
          editable: true,
          placeholderText: '请使用格式：HH:MM',
          content: currentTime || '09:00',
          success: (timeModalRes) => {
            if (timeModalRes.confirm && timeModalRes.content) {
              const newTime = timeModalRes.content.trim();
              const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
              
              if (!timeRegex.test(newTime)) {
                wx.showToast({
                  title: '时间格式错误，请使用HH:MM格式',
                  icon: 'none'
                });
                return;
              }
              
              const newDateTime = `${newDate} ${newTime}`;
              this.updateDateTimeValue(index, item.id, columnName, newDateTime, item[columnName]);
            }
          }
        });
      }
    }
  });
},
  
  // 更新文本值
  updateTextValue: function(index, id, columnName, newValue, oldValue) {
    const _this = this;
    
    // 构建SQL
    const sql = `UPDATE work_detail SET ${columnName} = '${newValue}' WHERE id = ${id}`;
    
    wx.showLoading({ title: '更新中...' });
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: sql
      },
      success: res => {
        wx.hideLoading();
        console.log(`更新${columnName}结果:`, res);
        
        if (res.result && (res.result.rowsAffected || res.result.affectedRows)) {
          // 更新本地数据
          const updatedList = [..._this.data.list];
          updatedList[index][columnName] = newValue;
          
          _this.setData({
            list: updatedList
          });
          
          wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 1500
          });
          
          // 如果是重要字段，重新计算排产
          const importantFields = ['work_num', 'type', 'is_insert', 'work_start_date', 'jiezhishijian'];
          if (importantFields.includes(columnName)) {
            setTimeout(() => {
              _this.calculatePaichan();
            }, 500);
          }
        } else {
          wx.showToast({
            title: '更新失败',
            icon: 'none'
          });
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error(`更新${columnName}失败:`, err);
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 更新数字值
  updateNumberValue: function(index, id, columnName, newValue, oldValue) {
    const _this = this;
    
    // 构建SQL
    const sql = `UPDATE work_detail SET ${columnName} = ${newValue} WHERE id = ${id}`;
    
    wx.showLoading({ title: '更新中...' });
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: sql
      },
      success: res => {
        wx.hideLoading();
        console.log(`更新${columnName}结果:`, res);
        
        if (res.result && (res.result.rowsAffected || res.result.affectedRows)) {
          // 更新本地数据
          const updatedList = [..._this.data.list];
          updatedList[index][columnName] = newValue;
          
          _this.setData({
            list: updatedList
          });
          
          wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 1500
          });
          
          // 如果是重要字段，重新计算排产
          const importantFields = ['work_num', 'type', 'is_insert', 'work_start_date', 'jiezhishijian'];
          if (importantFields.includes(columnName)) {
            setTimeout(() => {
              _this.calculatePaichan();
            }, 500);
          }
        } else {
          wx.showToast({
            title: '更新失败',
            icon: 'none'
          });
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error(`更新${columnName}失败:`, err);
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 更新日期时间值
  updateDateTimeValue: function(index, id, columnName, newValue, oldValue) {
    const _this = this;
    
    // 格式化为数据库格式
    const dbValue = newValue + ':00';
    
    // 构建SQL
    const sql = `UPDATE work_detail SET ${columnName} = '${dbValue}' WHERE id = ${id}`;
    
    wx.showLoading({ title: '更新中...' });
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: sql
      },
      success: res => {
        wx.hideLoading();
        console.log(`更新${columnName}结果:`, res);
        
        if (res.result && (res.result.rowsAffected || res.result.affectedRows)) {
          // 更新本地数据
          const updatedList = [..._this.data.list];
          updatedList[index][columnName] = newValue;
          
          _this.setData({
            list: updatedList
          });
          
          wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 1500
          });
          
          // 重新计算排产
          setTimeout(() => {
            _this.calculatePaichan();
          }, 500);
        } else {
          wx.showToast({
            title: '更新失败',
            icon: 'none'
          });
        }
      },
      fail: err => {
        wx.hideLoading();
        console.error(`更新${columnName}失败:`, err);
        wx.showToast({
          title: '更新失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 修改类型和是否插入的更新函数
  updateType: function(index, id, newType) {
    const typeValue = newType === '优先' ? 'urgent' : 'normal';
    this.updateTextValue(index, id, 'type', typeValue, '');
    
    // 同时更新本地显示值
    const updatedList = [...this.data.list];
    updatedList[index].type = newType;
    this.setData({ list: updatedList });
  },
  
  updateInsertStatus: function(index, id, isInsert) {
    this.updateNumberValue(index, id, 'is_insert', isInsert, '');
    
    // 同时更新本地显示值
    const updatedList = [...this.data.list];
    updatedList[index].is_insert = isInsert;
    this.setData({ list: updatedList });
  },
  
  // 添加时间格式化函数
  formatTimeOnly: function(dateTime) {
    if (!dateTime) return '';
    
    try {
      // 如果是字符串，提取时间部分
      if (typeof dateTime === 'string') {
        const parts = dateTime.split(' ');
        if (parts.length > 1) {
          return parts[1];
        }
        return dateTime.includes(':') ? dateTime : '00:00';
      }
      
      // 如果是 Date 对象
      if (dateTime instanceof Date) {
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
      }
      
      return '00:00';
    } catch (error) {
      console.error('formatTimeOnly错误:', error, dateTime);
      return '00:00';
    }
  },
  editTypeInPlace: function(index, item) {
    if (!this.data.hasUpdatePermission) {
      wx.showToast({
        title: '无编辑权限',
        icon: 'none'
      });
      return;
    }
    
    const typeOptions = ['正常', '优先'];
    wx.showActionSheet({
      itemList: typeOptions,
      success: (res) => {
        const selectedType = typeOptions[res.tapIndex];
        this.updateType(index, item.id, selectedType);
      },
      fail: (err) => {
        console.log('取消选择类型', err);
      }
    });
  },
  
  // 内联编辑是否插入
  editInsertStatusInPlace: function(index, item) {
    if (!this.data.hasUpdatePermission) {
      wx.showToast({
        title: '无编辑权限',
        icon: 'none'
      });
      return;
    }
    
    const insertOptions = ['否', '是'];
    wx.showActionSheet({
      itemList: insertOptions,
      success: (res) => {
        const selectedStatus = insertOptions[res.tapIndex];
        const isInsert = selectedStatus === '是' ? 1 : 0;
        this.updateInsertStatus(index, item.id, isInsert);
      },
      fail: (err) => {
        console.log('取消选择插入状态', err);
      }
    });
  },
  // 关闭删除确认
  closeDeleteConfirm: function() {
    this.setData({
      deleteConfirmVisible: false,
      deleteId: null
    });
  },

  // 确认删除
  confirmDelete: function() {
    const _this = this;
    const id = this.data.deleteId;
    
    if (!id) return;
    
    wx.showLoading({ title: '删除中...' });
    
    // 借鉴PC端的删除逻辑，使用内部ID删除
    const sql = `DELETE FROM work_detail WHERE id = ${id}`;
    
    console.log('删除SQL:', sql);
    
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: sql
      },
      success: res => {
        wx.hideLoading();
        console.log('删除结果:', res);
        
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        });
        
        _this.closeDeleteConfirm();
        
        // 重新加载数据
        setTimeout(() => {
          _this.getList();
          // 重新计算排产
          _this.calculatePaichan();
        }, 500);
      },
      fail: err => {
        wx.hideLoading();
        console.error('删除失败:', err);
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        });
      }
    });
  },

  // 获取生产线列表
  getAllChanXianList: function() {
    const _this = this;
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: `SELECT * FROM shengchanxian 
                WHERE gongsi = '${app.globalData.gongsi}'
                ORDER BY gongxu, xiaolv DESC`
      },
      success: res => {
        _this.setData({
          chanXianList: res.result.recordset || []
        });
      },
      fail: err => {
        console.error('获取生产线失败:', err);
      }
    });
  },

  // 获取工作时间配置
  getTimeList: function() {
    const _this = this;
    
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: `SELECT * FROM time_config 
                  WHERE company = '${app.globalData.gongsi}'
                  ORDER BY week`
        },
        success: res => {
          let timeList = [];
          if (res.result && res.result.recordset) {
            timeList = res.result.recordset || [];
          }
          
          _this.setData({
            timeList: timeList
          });
          
          console.log('工作时间配置:', timeList);
          resolve(timeList);
        },
        fail: err => {
          console.error('获取时间配置失败:', err);
          reject(err);
        }
      });
    });
  },
  // getTimeList: function() {
  //   const _this = this;
  //   wx.cloud.callFunction({
  //     name: 'sqlServer_PC',
  //     data: {
  //       query: `SELECT * FROM time_config 
  //               WHERE company = '${app.globalData.gongsi}'
  //               ORDER BY week`
  //     },
  //     success: res => {
  //       _this.setData({
  //         timeList: res.result.recordset || []
  //       });
  //     },
  //     fail: err => {
  //       console.error('获取时间配置失败:', err);
  //     }
  //   });
  // },

  // 计算排产
  calculatePaichan: function() {
    const _this = this;
    
    if (this.data.isCalculating) return;
    
    this.setData({ isCalculating: true });
    
    console.log('=== 开始排产计算 ===');
    
    // 检查工作时间配置是否已加载
    if (this.data.timeList.length === 0) {
      console.log('工作时间配置为空，尝试重新加载');
      this.getTimeList().then(() => {
        // 继续排产计算
        _this.continuePaichanCalculation();
      }).catch(err => {
        console.error('加载工作时间配置失败:', err);
        wx.showToast({
          title: '工作时间配置加载失败',
          icon: 'none'
        });
        _this.setData({ isCalculating: false });
      });
    } else {
      _this.continuePaichanCalculation();
    }
  },
  
  // 新增：继续排产计算
  continuePaichanCalculation: function() {
    const _this = this;
    
    // 先获取所有工作数据
    _this.getAllWorkList().then(allWorkList => {
      console.log('获取到的工作数据数量:', allWorkList.length);
      
      if (allWorkList.length === 0) {
        _this.setData({ 
          paichanResult: [],
          isCalculating: false 
        });
        wx.showToast({
          title: '没有工作数据',
          icon: 'none'
        });
        return;
      }
      
      // 使用完整的排产计算
      _this.performCompletePaichanCalculation(allWorkList);
      
    }).catch(err => {
      console.error('获取工作数据失败:', err);
      _this.setData({ isCalculating: false });
      wx.showToast({
        title: '获取数据失败',
        icon: 'none'
      });
    });
  },

  // 关联排产结束时间到主列表
  associatePaichanEndTime: function() {
    const _this = this;
    const paichanResult = this.data.paichanResult;
    
    if (!paichanResult.length) return;
    
    // 建立订单号到最晚结束时间的映射
    const orderEndTimes = {};
    paichanResult.forEach(item => {
      if (!orderEndTimes[item.orderId] || 
          new Date(item.endTime) > new Date(orderEndTimes[item.orderId])) {
        orderEndTimes[item.orderId] = item.endTime;
      }
    });
    
    // 更新主列表
    const updatedList = this.data.list.map(item => {
      const orderId = this.formatOrderId(item.order_id);
      if (orderEndTimes[orderId]) {
        item.paichanEndTime = orderEndTimes[orderId];
      } else {
        item.paichanEndTime = item.jiezhishijian;
      }
      return item;
    });
    
    this.setData({ list: updatedList });
    
    // 检查超期订单
    this.checkOverdueOrders();
  },

  // 检查超期订单
  checkOverdueOrders: function() {
    const overdueOrders = [];
    
    this.data.list.forEach(item => {
      if (item.paichanEndTime && item.jiezhishijian) {
        const paichanEndTime = new Date(item.paichanEndTime);
        const orderDeadline = new Date(item.jiezhishijian);
        
        if (paichanEndTime > orderDeadline) {
          overdueOrders.push({
            orderId: this.formatOrderId(item.order_id),
            orderDeadline: this.formatDateTime(orderDeadline),
            paichanEndTime: this.formatDateTime(paichanEndTime)
          });
        }
      }
    });
    
    if (overdueOrders.length > 0) {
      let message = `发现 ${overdueOrders.length} 个订单无法按期完成：\n\n`;
      
      overdueOrders.forEach((order, index) => {
        message += `${index + 1}. 订单号：${order.orderId}\n`;
        message += `   订单截止日期：${order.orderDeadline}\n`;
        message += `   排产后截止日期：${order.paichanEndTime}\n\n`;
      });
      
      message += '该排产存在无法按期完成订单的内容，请添加设备或者重新配置工作时间！';
      
      this.setData({
        overdueVisible: true,
        overdueMessage: message
      });
    }
  },

  // 关闭超期提醒
  closeOverdueDialog: function() {
    this.setData({ overdueVisible: false });
  },

  // 分页相关方法
  onPageSizeChange: function(e) {
    const sizes = [10, 20, 50, 100];
    const index = e.detail.value;
    this.setData({
      pageSize: sizes[index],
      pageSizeIndex: index,
      pageNow: 1
    });
    this.getList();
  },

  prevPage: function() {
    if (this.data.pageNow > 1) {
      this.setData({
        pageNow: this.data.pageNow - 1
      });
      this.getList();
    }
  },

  nextPage: function() {
    const totalPages = Math.ceil(this.data.total / this.data.pageSize);
    if (this.data.pageNow < totalPages) {
      this.setData({
        pageNow: this.data.pageNow + 1
      });
      this.getList();
    }
  },

  // 工具方法
  formatOrderId: function(orderId) {
    if (!orderId) return '';
    const order = this.data.orderList.find(item => item.id == orderId);
    return order ? order.order_id : orderId;
  },

  formatDate: function(date) {
    console.log('formatDate输入:', date);
    if (!date) return '';
    
    // 如果是ISO格式，提取日期部分
    if (typeof date === 'string' && date.includes('T')) {
      return date.split('T')[0];
    }
    return date;
  },
  
  
  // 专门处理ISO格式时间（UTC时间转换为本地时间）
  formatISOTime: function(dateString) {
    console.log('formatISOTime输入:', dateString, '类型:', typeof dateString);
    
    if (!dateString) return '';
    
    try {
      // 如果已经是格式化的字符串（来自数据库查询时的转换）
      if (typeof dateString === 'string') {
        // 情况1: ISO 格式 '2026-01-30T14:00:00.000Z'
        if (dateString.includes('T') && dateString.includes('Z')) {
          // 创建Date对象（会自动处理UTC时间）
          const date = new Date(dateString);
          if (isNaN(date.getTime())) {
            console.warn('无法解析的日期:', dateString);
            return dateString;
          }
          
          // 获取本地时间的各个部分
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          
          return `${year}-${month}-${day} ${hours}:${minutes}`;
        }
        
        // 情况2: 数据库直接返回的 datetime2 格式 '2026-02-04 10:00:00.0000000'
        if (dateString.includes(' ') && dateString.includes('.')) {
          // 直接提取日期和时间部分
          const [datePart, timePart] = dateString.split(' ');
          if (datePart && timePart) {
            // 去掉毫秒部分
            const timeWithoutMs = timePart.split('.')[0];
            // 只取到分钟
            return `${datePart} ${timeWithoutMs.substring(0, 5)}`;
          }
        }
        
        // 情况3: 已经是正常的格式
        return dateString;
      }
      
      // 如果是 Date 对象
      if (dateString instanceof Date) {
        if (isNaN(dateString.getTime())) return '';
        const year = dateString.getFullYear();
        const month = String(dateString.getMonth() + 1).padStart(2, '0');
        const day = String(dateString.getDate()).padStart(2, '0');
        const hours = String(dateString.getHours()).padStart(2, '0');
        const minutes = String(dateString.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      }
      
      return String(dateString);
    } catch (error) {
      console.error('formatISOTime 错误:', error, dateString);
      return dateString || '';
    }
  },
  // 获取类型文本
  getTypeText: function(item) {
    console.log('getTypeText输入:', item, 'type值:', item.type);
    
    if (!item) return '';
    
    const type = item.type || 'normal';
    
    // 调试输出
    console.log('解析type:', type, '类型:', typeof type);
    
    // 根据你的数据，type可能是中文"正常"，也可能是英文"normal"
    switch(type) {
      case 'urgent':
      case '优先':
        return '优先';
      case 'normal':
      case '正常':
        return '正常';
      default:
        // 如果type值就是"正常"，直接返回
        if (type === '正常' || type === '正常') {
          return '正常';
        }
        return type || '正常';
    }
  },
  // 添加调试函数
debugData: function() {
  console.log('=== 数据调试 ===');
  console.log('当前列表数据:', this.data.list);
  console.log('列表长度:', this.data.list.length);
  console.log('第一条数据:', this.data.list[0]);
  console.log('公司名称:', app.globalData.gongsi);
  
  // 测试简单查询
  const testSQL = `SELECT TOP 1 * FROM work_detail WHERE company = '${app.globalData.gongsi}'`;
  
  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: { query: testSQL },
    success: res => {
      console.log('测试查询结果:', res);
      if (res.result && res.result.recordset && res.result.recordset.length > 0) {
        console.log('测试数据字段:', Object.keys(res.result.recordset[0]));
      }
    }
  });
},
debugDataFormat: function() {
  console.log('=== 调试数据格式 ===');
  
  if (this.data.list && this.data.list.length > 0) {
    const item = this.data.list[0];
    console.log('第一条完整数据:', item);
    console.log('work_start_date:', item.work_start_date, '类型:', typeof item.work_start_date);
    console.log('jiezhishijian:', item.jiezhishijian, '类型:', typeof item.jiezhishijian);
    console.log('type字段:', item.type, '类型:', typeof item.type);
    
    // 测试格式化
    console.log('formatISOTime测试:', this.formatISOTime(item.work_start_date));
    console.log('getTypeText测试:', this.getTypeText(item));
  } else {
    console.log('列表数据为空');
  }
},

// 获取排产状态文本
getPaichanStatus: function(item) {
  if (!item) return '正常';
  if (item.warning) {
    return '异常';
  } else if (item.isPartial) {
    return '部分完成';
  } else if (item.isResumed) {
    return '恢复完成';
  } else {
    return '正常';
  }
},

// 获取优先级文本
getPriorityText: function(item) {
  if (!item) return '正常';
  if (item.isInsert) {
    return '插单';
  } else if (item.isUrgent) {
    return '优先';
  } else {
    return '正常';
  }
},

// 获取任务类型文本
getTaskTypeText: function(item) {
  if (!item) return '完整执行';
  if (item.isPartial) {
    return '部分执行';
  } else if (item.isResumed) {
    return '恢复执行';
  } else if (item.isInsert) {
    return '插单执行';
  } else {
    return '完整执行';
  }
},

// 获取插单任务数量
getInsertCount: function() {
  return this.data.paichanResult.filter(item => item.isInsert).length;
},

// 获取优先任务数量
getUrgentCount: function() {
  return this.data.paichanResult.filter(item => item.isUrgent && !item.isInsert).length;
},

// 获取普通任务数量
getNormalCount: function() {
  return this.data.paichanResult.filter(item => !item.isUrgent && !item.isInsert).length;
},

// 增强的格式化日期时间函数
formatDateTime: function(date) {
  console.log('formatDateTime输入:', date, '类型:', typeof date);
  
  if (!date) return '';
  
  try {
    // 如果是字符串，使用 formatISOTime
    if (typeof date === 'string') {
      return this.formatISOTime(date);
    }
    
    // 如果是 Date 对象
    if (date instanceof Date) {
      if (isNaN(date.getTime())) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
    
    return date;
  } catch (error) {
    console.error('formatDateTime错误:', error, date);
    return date || '';
  }
},

// 只显示日期的格式化
formatDateOnly: function(date) {
  const formatted = this.formatISOTime(date);
  return formatted ? formatted.split(' ')[0] : '';
},

// 新增：完整的排产计算方法
performCompletePaichanCalculation: function(allWorkList) {
  const _this = this;
  
  try {
    // 1. 首先过滤掉工序名称为空的数据
    const validWorkList = allWorkList.filter(work => {
      const hasProcessName = work.gongxumingcheng && work.gongxumingcheng.trim() !== '';
      if (!hasProcessName) {
        console.log(`过滤掉工序名称为空的工作数据: 订单 ${work.dingdanhao}`);
      }
      return hasProcessName;
    });
    
    console.log('原始工作数据数量:', allWorkList.length);
    console.log('有效工作数据数量（有工序名称）:', validWorkList.length);
    
    if (validWorkList.length === 0) {
      console.log('没有有效的工作数据（所有工序名称为空）');
      _this.setData({ 
        paichanResult: [],
        isCalculating: false 
      });
      wx.showToast({
        title: '没有有效的工作数据（工序名称为空）',
        icon: 'none'
      });
      return;
    }
    
    // 2. 准备生产线数据，只处理有工序名称的生产线
    const productionLinesByProcess = {};
    this.data.chanXianList.forEach(line => {
      const processName = line.gongxu;
      if (!processName || processName.trim() === '') return; // 跳过空工序名称
      
      if (!productionLinesByProcess[processName]) {
        productionLinesByProcess[processName] = [];
      }
      
      productionLinesByProcess[processName].push({
        id: line.id,
        name: line.mingcheng,
        efficiency: parseFloat(line.xiaolv) || 0,
        processName: processName,
        availableFrom: null,
        schedule: [],
        pausedTasks: [],
        activeTask: null,
        isPaused: false,
        pausedAt: null
      });
    });

    console.log('有效的生产线工序:', Object.keys(productionLinesByProcess));
    
    // 3. 按订单号分组（只使用有效数据）
    const orderGroups = {};
    validWorkList.forEach(work => {
      const orderId = work.dingdanhao;
      if (!orderId || orderId.trim() === '') return;
      
      if (!orderGroups[orderId]) {
        orderGroups[orderId] = [];
      }
      orderGroups[orderId].push(work);
    });

    // 4. 分离插单和普通订单
    const insertOrders = [];
    const normalOrders = [];
    
    Object.keys(orderGroups).forEach(orderId => {
      const works = orderGroups[orderId];
      if (!works || works.length === 0) return;
      
      // 判断是否为插单订单
      const isInsertOrder = works.some(work => 
        work.charu == 1 || work.is_insert == 1
      );
      
      const orderItem = {
        orderId: orderId,
        works: works,
        isInsert: isInsertOrder,
        insertStartTime: works.reduce((earliest, work) => {
          if (work.charu == 1 || work.is_insert == 1) {
            const workStartTime = this.safeParseDate(work.work_start_date);
            return !earliest || (workStartTime && workStartTime < earliest) ? workStartTime : earliest;
          }
          return earliest;
        }, null)
      };
      
      if (isInsertOrder) {
        insertOrders.push(orderItem);
      } else {
        normalOrders.push(orderItem);
      }
    });

    console.log('=== 订单分组统计 ===');
    console.log('有效插单订单数量:', insertOrders.length);
    console.log('有效普通订单数量:', normalOrders.length);
    console.log('总有效订单数量:', insertOrders.length + normalOrders.length);

    // 5. 根据是否有有效插单选择执行不同的排产逻辑
    if (insertOrders.length > 0) {
      console.log('=== 执行插单排产逻辑 ===');
      // 执行插单排产逻辑
      this.executeInsertPaichanLogic(insertOrders, normalOrders, productionLinesByProcess);
    } else {
      console.log('=== 执行普通排产逻辑（无有效插单）===');
      // 执行普通排产逻辑
      this.executeNormalPaichanLogic(normalOrders, productionLinesByProcess);
    }

  } catch (error) {
    console.error('完整排产计算错误:', error);
    _this.setData({ isCalculating: false });
    wx.showToast({
      title: '排产计算失败',
      icon: 'none'
    });
  }
},
// 新增：普通排产逻辑（无插单）
// 新增：普通排产逻辑（无插单）
executeNormalPaichanLogic: function(normalOrders, productionLinesByProcess) {
  const _this = this;
  const paichanResult = [];
  
  try {
    console.log('=== 执行普通排产逻辑 ===');
    
    // 1. 对订单排序：按开始时间和优先级（只有开始时间完全一致时才按优先级排序）
    const sortedOrders = normalOrders.map(orderItem => {
      const orderId = orderItem.orderId;
      const works = orderItem.works;
      
      // 找到订单的最早起始日期
      const earliestStartTime = works.reduce((earliest, work) => {
        const workStartTime = this.safeParseDate(work.work_start_date || work.kaishishijian);
        return !earliest || (workStartTime && workStartTime < earliest) ? workStartTime : earliest;
      }, null);
      
      // 判断是否为紧急订单
      const isUrgentOrder = works.some(work => 
        work.dingdanleixing === "urgent" || work.type === "urgent"
      );
      
      // 判断是否为插入订单
      const isInsertOrder = works.some(work => 
        work.charu == 1 || work.is_insert == 1
      );
      
      // 格式化开始时间用于精确比较是否"完全一致"
      const startTimeFormatted = earliestStartTime ? 
        this.formatISOTime(earliestStartTime) : '';
      
      return {
        orderId: orderId,
        works: works,
        earliestStartTime: earliestStartTime,
        startTimeFormatted: startTimeFormatted, // 新增：格式化后的时间字符串
        isUrgent: isUrgentOrder,
        isInsert: isInsertOrder,
        priority: isInsertOrder ? 0 : (isUrgentOrder ? 1 : 2)
      };
    });

    // 排序：先按开始时间，只有开始时间完全一致时才按优先级
    sortedOrders.sort((a, b) => {
      // 都有开始时间的情况
      if (a.startTimeFormatted && b.startTimeFormatted) {
        // 比较格式化后的时间字符串
        const timeCompare = a.startTimeFormatted.localeCompare(b.startTimeFormatted);
        
        if (timeCompare === 0) {
          // 开始时间完全一致，按优先级排序
          console.log(`订单 ${a.orderId} 和 ${b.orderId} 开始时间完全一致: ${a.startTimeFormatted}`);
          console.log(`- ${a.orderId} 优先级: ${a.priority} (${a.isUrgent ? '优先' : '普通'})`);
          console.log(`- ${b.orderId} 优先级: ${b.priority} (${b.isUrgent ? '优先' : '普通'})`);
          
          if (a.priority !== b.priority) {
            return a.priority - b.priority; // 优先级高的先执行
          }
        } else {
          // 开始时间不同，按时间先后排序
          return timeCompare;
        }
      }
      
      // 只有一个有开始时间的情况
      if (a.startTimeFormatted && !b.startTimeFormatted) return -1;
      if (!a.startTimeFormatted && b.startTimeFormatted) return 1;
      
      // 都没有开始时间，按优先级排序
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      
      // 开始时间和优先级都相同
      return 0;
    });

    console.log('=== 排序后的订单 ===');
    sortedOrders.forEach((order, index) => {
      console.log(`${index + 1}. 订单 ${order.orderId}: 开始=${order.startTimeFormatted || '无时间'}, 优先级=${order.priority} (${order.isUrgent ? '优先' : '普通'})`);
    });
    
    // 2. 处理每个订单
    sortedOrders.forEach(orderItem => {
      const orderId = orderItem.orderId;
      const works = orderItem.works;
      const isUrgentOrder = orderItem.isUrgent;
      
      // 对工序排序
      works.sort((a, b) => {
        const timeA = this.safeParseDate(a.work_start_date || a.kaishishijian);
        const timeB = this.safeParseDate(b.work_start_date || b.kaishishijian);
        return (timeA || 0) - (timeB || 0);
      });
      
      works.forEach(work => {
        const processName = work.gongxumingcheng;
        const processEfficiency = parseFloat(work.gongxuxiaolv) || 1;
        const quantity = parseFloat(work.gongxushuliang || work.work_num) || 0;
        const plannedStartTime = this.safeParseDate(work.work_start_date || work.kaishishijian);
        const deadline = this.safeParseDate(work.jiezhishijian);
        
        if (productionLinesByProcess[processName]) {
          // 找到匹配的生产线
          const suitableLines = productionLinesByProcess[processName].filter(line => 
            Math.abs(line.efficiency - processEfficiency) < 0.1
          );
          
          if (suitableLines.length > 0) {
            // 按效率从高到低排序
            suitableLines.sort((a, b) => b.efficiency - a.efficiency);
            
            // 选择最早可用的生产线
            suitableLines.sort((a, b) => {
              const timeA = a.availableFrom ? this.safeParseDate(a.availableFrom) : plannedStartTime;
              const timeB = b.availableFrom ? this.safeParseDate(b.availableFrom) : plannedStartTime;
              return (timeA || 0) - (timeB || 0);
            });
            
            const selectedLine = suitableLines[0];
            let actualStartTime = selectedLine.availableFrom ? 
              this.safeParseDate(selectedLine.availableFrom) : plannedStartTime;
            
            // 确保不会早于计划开始时间
            if (actualStartTime && plannedStartTime && actualStartTime < plannedStartTime) {
              actualStartTime = plannedStartTime;
            }
            
            // 计算所需时间
            const requiredHours = quantity / processEfficiency;
            
            // 计算实际结束时间（考虑工作时间段）
            const workTimeResult = this.calculateWorkTime(actualStartTime || new Date(), requiredHours);
            const endTime = workTimeResult.actualEndTime;
            
            // 更新生产线状态
            selectedLine.availableFrom = endTime;
            selectedLine.activeTask = {
              orderId: orderId,
              processName: processName,
              startTime: actualStartTime,
              endTime: endTime,
              quantity: quantity,
              efficiency: processEfficiency
            };
            
            // 检查是否超期
            const isOverdue = deadline && endTime > deadline;
            
            // 添加到结果
            paichanResult.push({
              orderId: orderId,
              processName: processName,
              processEfficiency: processEfficiency,
              quantity: quantity,
              productionLine: selectedLine.name,
              lineEfficiency: selectedLine.efficiency,
              startTime: this.formatISOTime(actualStartTime),
              endTime: this.formatISOTime(endTime),
              requiredHours: requiredHours.toFixed(2),
              deadline: this.formatISOTime(deadline),
              warning: isOverdue,
              isInsert: false,
              isUrgent: isUrgentOrder,
              priority: isUrgentOrder ? '优先' : '正常',
              status: isOverdue ? '超期' : '正常'
            });
            
          } else {
            // 没有匹配的生产线
            paichanResult.push({
              orderId: orderId,
              processName: processName,
              processEfficiency: processEfficiency,
              quantity: quantity,
              productionLine: '未分配',
              lineEfficiency: 0,
              startTime: this.formatISOTime(plannedStartTime),
              endTime: this.formatISOTime(deadline),
              requiredHours: 'N/A',
              deadline: this.formatISOTime(deadline),
              warning: true,
              isInsert: false,
              isUrgent: isUrgentOrder,
              priority: isUrgentOrder ? '优先' : '正常',
              status: '无匹配生产线'
            });
          }
        } else {
          // 没有对应的生产线类型
          paichanResult.push({
            orderId: orderId,
            processName: processName,
            processEfficiency: processEfficiency,
            quantity: quantity,
            productionLine: '无生产线',
            lineEfficiency: 0,
            startTime: this.formatISOTime(plannedStartTime),
            endTime: this.formatISOTime(deadline),
            requiredHours: 'N/A',
            deadline: this.formatISOTime(deadline),
            warning: true,
            isInsert: false,
            isUrgent: isUrgentOrder,
            priority: isUrgentOrder ? '优先' : '正常',
            status: '无生产线类型'
          });
        }
      });
    });
    
    // 3. 按开始时间排序结果
    paichanResult.sort((a, b) => {
      const timeA = this.safeParseDate(a.startTime);
      const timeB = this.safeParseDate(b.startTime);
      return (timeA || 0) - (timeB || 0);
    });
    
    _this.setData({
      paichanResult: paichanResult,
      isCalculating: false
    });
    
    // 关联排产结束时间
    _this.associatePaichanEndTime();
    
    wx.showToast({
      title: `排产完成，共${paichanResult.length}条结果`,
      icon: 'success'
    });
    
  } catch (error) {
    console.error('普通排产逻辑错误:', error);
    _this.setData({ isCalculating: false });
    wx.showToast({
      title: '排产计算失败',
      icon: 'none'
    });
  }
},
// executeNormalPaichanLogic: function(normalOrders, productionLinesByProcess) {
//   const _this = this;
//   const paichanResult = [];
  
//   try {
//     console.log('=== 执行普通排产逻辑 ===');
    
//   // 1. 对订单排序：按起始日期和优先级
// const sortedOrders = normalOrders.map(orderItem => {
//   const orderId = orderItem.orderId;
//   const works = orderItem.works;
  
//   // 找到订单的最早起始日期
//   const earliestStartTime = works.reduce((earliest, work) => {
//     const workStartTime = this.safeParseDate(work.work_start_date);
//     return !earliest || (workStartTime && workStartTime < earliest) ? workStartTime : earliest;
//   }, null);
  
//   // 判断是否为紧急订单
//   const isUrgentOrder = works.some(work => 
//     work.dingdanleixing === "urgent" || work.type === "urgent"
//   );
  
//   // 判断是否为插入订单
//   const isInsertOrder = works.some(work => 
//     work.charu == 1 || work.is_insert == 1
//   );
  
//   return {
//     orderId: orderId,
//     works: works,
//     earliestStartTime: earliestStartTime,
//     isUrgent: isUrgentOrder,
//     isInsert: isInsertOrder,
//     priority: isInsertOrder ? 0 : (isUrgentOrder ? 1 : 2) // 插单最高，紧急次之，普通最低
//   };
// });

// // 排序：先按优先级，同优先级按日期
// sortedOrders.sort((a, b) => {
//   // 先按优先级排序
//   if (a.priority !== b.priority) {
//     return a.priority - b.priority;
//   }
  
//   // 优先级相同，按日期排序
//   if (a.earliestStartTime && b.earliestStartTime) {
//     return a.earliestStartTime - b.earliestStartTime;
//   }
  
//   // 如果一个有日期一个没有
//   if (a.earliestStartTime && !b.earliestStartTime) return -1;
//   if (!a.earliestStartTime && b.earliestStartTime) return 1;
  
//   return 0;
// });
//     // 2. 处理每个订单
//     sortedOrders.forEach(orderItem => {
//       const orderId = orderItem.orderId;
//       const works = orderItem.works;
//       const isUrgentOrder = orderItem.isUrgent;
      
//       // 对工序排序
//       works.sort((a, b) => {
//         const timeA = this.safeParseDate(a.work_start_date || a.kaishishijian);
//         const timeB = this.safeParseDate(b.work_start_date || b.kaishishijian);
//         return (timeA || 0) - (timeB || 0);
//       });
      
//       works.forEach(work => {
//         const processName = work.gongxumingcheng;
//         const processEfficiency = parseFloat(work.gongxuxiaolv) || 1;
//         const quantity = parseFloat(work.gongxushuliang || work.work_num) || 0;
//         const plannedStartTime = this.safeParseDate(work.work_start_date || work.kaishishijian);
//         const deadline = this.safeParseDate(work.jiezhishijian);
        
//         if (productionLinesByProcess[processName]) {
//           // 找到匹配的生产线
//           const suitableLines = productionLinesByProcess[processName].filter(line => 
//             Math.abs(line.efficiency - processEfficiency) < 0.1
//           );
          
//           if (suitableLines.length > 0) {
//             // 按效率从高到低排序
//             suitableLines.sort((a, b) => b.efficiency - a.efficiency);
            
//             // 选择最早可用的生产线
//             suitableLines.sort((a, b) => {
//               const timeA = a.availableFrom ? this.safeParseDate(a.availableFrom) : plannedStartTime;
//               const timeB = b.availableFrom ? this.safeParseDate(b.availableFrom) : plannedStartTime;
//               return (timeA || 0) - (timeB || 0);
//             });
            
//             const selectedLine = suitableLines[0];
//             let actualStartTime = selectedLine.availableFrom ? 
//               this.safeParseDate(selectedLine.availableFrom) : plannedStartTime;
            
//             // 确保不会早于计划开始时间
//             if (actualStartTime && plannedStartTime && actualStartTime < plannedStartTime) {
//               actualStartTime = plannedStartTime;
//             }
            
//             // 计算所需时间
//             const requiredHours = quantity / processEfficiency;
            
//             // 计算实际结束时间（考虑工作时间段）
//             const workTimeResult = this.calculateWorkTime(actualStartTime || new Date(), requiredHours);
//             const endTime = workTimeResult.actualEndTime;
            
//             // 更新生产线状态
//             selectedLine.availableFrom = endTime;
//             selectedLine.activeTask = {
//               orderId: orderId,
//               processName: processName,
//               startTime: actualStartTime,
//               endTime: endTime,
//               quantity: quantity,
//               efficiency: processEfficiency
//             };
            
//             // 检查是否超期
//             const isOverdue = deadline && endTime > deadline;
            
//             // 添加到结果
//             paichanResult.push({
//               orderId: orderId,
//               processName: processName,
//               processEfficiency: processEfficiency,
//               quantity: quantity,
//               productionLine: selectedLine.name,
//               lineEfficiency: selectedLine.efficiency,
//               startTime: this.formatISOTime(actualStartTime),
//               endTime: this.formatISOTime(endTime),
//               requiredHours: requiredHours.toFixed(2),
//               deadline: this.formatISOTime(deadline),
//               warning: isOverdue,
//               isInsert: false,
//               isUrgent: isUrgentOrder,
//               priority: isUrgentOrder ? '优先' : '正常',
//               status: isOverdue ? '超期' : '正常'
//             });
            
//           } else {
//             // 没有匹配的生产线
//             paichanResult.push({
//               orderId: orderId,
//               processName: processName,
//               processEfficiency: processEfficiency,
//               quantity: quantity,
//               productionLine: '未分配',
//               lineEfficiency: 0,
//               startTime: this.formatISOTime(plannedStartTime),
//               endTime: this.formatISOTime(deadline),
//               requiredHours: 'N/A',
//               deadline: this.formatISOTime(deadline),
//               warning: true,
//               isInsert: false,
//               isUrgent: isUrgentOrder,
//               priority: isUrgentOrder ? '优先' : '正常',
//               status: '无匹配生产线'
//             });
//           }
//         } else {
//           // 没有对应的生产线类型
//           paichanResult.push({
//             orderId: orderId,
//             processName: processName,
//             processEfficiency: processEfficiency,
//             quantity: quantity,
//             productionLine: '无生产线',
//             lineEfficiency: 0,
//             startTime: this.formatISOTime(plannedStartTime),
//             endTime: this.formatISOTime(deadline),
//             requiredHours: 'N/A',
//             deadline: this.formatISOTime(deadline),
//             warning: true,
//             isInsert: false,
//             isUrgent: isUrgentOrder,
//             priority: isUrgentOrder ? '优先' : '正常',
//             status: '无生产线类型'
//           });
//         }
//       });
//     });
    
//     // 3. 按开始时间排序结果
//     paichanResult.sort((a, b) => {
//       const timeA = this.safeParseDate(a.startTime);
//       const timeB = this.safeParseDate(b.startTime);
//       return (timeA || 0) - (timeB || 0);
//     });
    
//     _this.setData({
//       paichanResult: paichanResult,
//       isCalculating: false
//     });
    
//     // 关联排产结束时间
//     _this.associatePaichanEndTime();
    
//     wx.showToast({
//       title: `排产完成，共${paichanResult.length}条结果`,
//       icon: 'success'
//     });
    
//   } catch (error) {
//     console.error('普通排产逻辑错误:', error);
//     _this.setData({ isCalculating: false });
//     wx.showToast({
//       title: '排产计算失败',
//       icon: 'none'
//     });
//   }
// },
// 新增：插单排产逻辑
// 新增：插单排产逻辑（按照PC端逻辑改写）
executeInsertPaichanLogic: function(insertOrders, normalOrders, productionLinesByProcess) {
  const _this = this;
  
  // 如果插入订单数组为空，直接执行普通排产逻辑
  if (!insertOrders || insertOrders.length === 0) {
    console.log('插单订单数组为空，执行普通排产逻辑');
    return _this.executeNormalPaichanLogic(normalOrders, productionLinesByProcess);
  }
  
  const paichanResult = [];
  
  try {
    console.log('=== 执行插单排产逻辑（PC端逻辑）===');
    console.log('插单订单数量:', insertOrders.length);
    console.log('普通订单数量:', normalOrders.length);
    
    // 1. 按插单开始时间排序（与PC端一致）
    insertOrders.sort((a, b) => {
      const timeA = a.insertStartTime;
      const timeB = b.insertStartTime;
      return (timeA || 0) - (timeB || 0);
    });
    
    // 2. 找到最早的插单开始时间
    const globalInsertStartTime = insertOrders.length > 0 ? 
      insertOrders[0].insertStartTime : null;
    
    // 创建全局的工作数据映射（与PC端一致）
    const workDataMap = {};
    [...insertOrders, ...normalOrders].forEach(orderItem => {
      orderItem.works.forEach(work => {
        const key = work.dingdanhao + "_" + (work.gongxumingcheng || '');
        workDataMap[key] = work;
      });
    });
    
    // 3. 处理普通订单的部分执行（在插单开始前）
console.log('\n=== 第一步：处理插单前的普通订单执行 ===');

// 首先，明确插单包含哪些工序（这部分在后续代码中会用到）
const insertProcesses = new Set();
insertOrders.forEach(orderItem => {
  orderItem.works.forEach(work => {
    const processName = work.gongxumingcheng;
    if (processName && processName.trim() !== '') {
      insertProcesses.add(processName);
    }
  });
});

console.log('插单包含的工序:', Array.from(insertProcesses));

// 对普通订单排序（按开始时间和优先级）
const sortedNormalOrders = normalOrders.map(orderItem => {
  const orderId = orderItem.orderId;
  const works = orderItem.works;
  
  // 找到订单的最早起始日期
  const earliestStartTime = works.reduce((earliest, work) => {
    const workStartTime = this.safeParseDate(work.work_start_date || work.kaishishijian);
    return !earliest || (workStartTime && workStartTime < earliest) ? workStartTime : earliest;
  }, null);
  
  // 判断是否为优先订单
  const isUrgentOrder = works.some(work => 
    work.dingdanleixing === "urgent" || work.type === "urgent"
  );
  
  return {
    orderId: orderId,
    works: works,
    earliestStartTime: earliestStartTime,
    isUrgent: isUrgentOrder,
    priority: isUrgentOrder ? 1 : 2
  };
});

// 排序：先按开始时间，然后按优先级
sortedNormalOrders.sort((a, b) => {
  if (a.earliestStartTime && b.earliestStartTime) {
    const timeDiff = a.earliestStartTime - b.earliestStartTime;
    if (timeDiff !== 0) return timeDiff;
  }
  return a.priority - b.priority;
});

// 处理普通订单（插单开始前部分）
sortedNormalOrders.forEach(orderItem => {
  const orderId = orderItem.orderId;
  const works = orderItem.works;
  const isUrgentOrder = orderItem.isUrgent;
  
  // 对工序排序
  works.sort((a, b) => {
    const timeA = this.safeParseDate(a.work_start_date || a.kaishishijian);
    const timeB = this.safeParseDate(b.work_start_date || b.kaishishijian);
    return (timeA || 0) - (timeB || 0);
  });
  
  works.forEach(work => {
    const processName = work.gongxumingcheng;
    const processEfficiency = parseFloat(work.gongxuxiaolv) || 1;
    const quantity = parseFloat(work.gongxushuliang || work.work_num) || 0;
    const plannedStartTime = this.safeParseDate(work.work_start_date || work.kaishishijian);
    const deadline = this.safeParseDate(work.jiezhishijian);
    
    if (!processName || processName.trim() === '') {
      console.log(`订单 ${orderId} 有工序但名称为空，跳过`);
      return;
    }
    
    if (productionLinesByProcess[processName]) {
      // 找到符合条件且可用的生产线（与PC端一致）
      const suitableLines = productionLinesByProcess[processName].filter(line => {
        const efficiencyMatch = Math.abs(line.efficiency - processEfficiency) < 0.01;
        const isAvailable = !line.activeTask;
        return efficiencyMatch && isAvailable;
      });
      
      if (suitableLines.length > 0) {
        // 选择最早可用的生产线（与PC端一致）
        suitableLines.sort((a, b) => {
          const timeA = a.availableFrom ? this.safeParseDate(a.availableFrom) : plannedStartTime;
          const timeB = b.availableFrom ? this.safeParseDate(b.availableFrom) : plannedStartTime;
          return (timeA || 0) - (timeB || 0);
        });
        
        const selectedLine = suitableLines[0];
        let actualStartTime = selectedLine.availableFrom ? 
          this.safeParseDate(selectedLine.availableFrom) : plannedStartTime;
        
        if (actualStartTime < plannedStartTime) {
          actualStartTime = plannedStartTime;
        }
        
        // 如果订单计划开始时间晚于插单开始时间，或者没有插单，完整执行
        if (!globalInsertStartTime || actualStartTime >= globalInsertStartTime) {
          // 完整执行整个任务（与PC端一致）
          const requiredHours = quantity / processEfficiency;
          const workTimeResult = this.calculateWorkTime(actualStartTime, requiredHours);
          const endTime = workTimeResult.actualEndTime;
          
          // 更新生产线状态
          selectedLine.availableFrom = endTime;
          selectedLine.activeTask = {
            orderId: orderId,
            processName: processName,
            startTime: actualStartTime,
            endTime: endTime,
            plannedQuantity: quantity,
            efficiency: processEfficiency,
            isUrgent: isUrgentOrder
          };
          
          // 记录到排产结果
          paichanResult.push({
            orderId: orderId,
            orderType: work.dingdanleixing,
            processName: processName,
            processEfficiency: processEfficiency,
            quantity: quantity,
            productionLine: selectedLine.name,
            lineEfficiency: selectedLine.efficiency,
            startTime: this.formatISOTime(actualStartTime),
            endTime: this.formatISOTime(endTime),
            requiredHours: requiredHours.toFixed(2),
            actualWorkHours: workTimeResult.workingHours.toFixed(2),
            totalDays: workTimeResult.totalDays,
            deadline: this.formatISOTime(deadline),
            isInsertOrder: false,
            note: "正常执行（无插单影响）",
            priorityColor: "success",
            warning: deadline && endTime > deadline,
            isUrgent: isUrgentOrder,
            priority: isUrgentOrder ? '优先' : '正常',
            status: '正常执行'
          });
          
          console.log(`✓ 完整执行: ${selectedLine.name}, 开始: ${this.formatISOTime(actualStartTime)}`);
          
        } else {
          // 部分执行（会被插单中断）- 与PC端逻辑一致
          // ============ 关键修改：只有与插单相同工序的任务才暂停 ============
          if (insertProcesses.has(processName)) {
            // 这个工序与插单工序相同，需要暂停
            const workableResult = this.calculateWorkableQuantity(actualStartTime, globalInsertStartTime, processEfficiency);
            const completedQuantity = Math.min(workableResult.workableQuantity, quantity);
            const remainingQuantity = quantity - completedQuantity;
            
            if (completedQuantity > 0) {
              // 记录部分执行
              paichanResult.push({
                orderId: orderId,
                orderType: work.dingdanleixing,
                processName: processName,
                processEfficiency: processEfficiency,
                quantity: completedQuantity,
                productionLine: selectedLine.name,
                lineEfficiency: selectedLine.efficiency,
                startTime: this.formatISOTime(actualStartTime),
                endTime: this.formatISOTime(globalInsertStartTime),
                requiredHours: workableResult.workableHours.toFixed(2),
                deadline: this.formatISOTime(deadline),
                isInsertOrder: false,
                note: "部分执行（插单前）",
                priorityColor: "info",
                isPartial: true,
                isUrgent: isUrgentOrder,
                priority: isUrgentOrder ? '优先' : '正常',
                status: '插单前部分完成',
                partialNote: `完成${Math.round(completedQuantity)}/${quantity}`,
                remainingQuantity: remainingQuantity
              });
              
              // 暂停生产线任务（与PC端一致）
              selectedLine.isPaused = true;
              selectedLine.pausedAt = globalInsertStartTime;
              selectedLine.activeTask = {
                orderId: orderId,
                processName: processName,
                startTime: actualStartTime,
                pausedAt: globalInsertStartTime,
                plannedQuantity: quantity,
                completedQuantity: completedQuantity,
                remainingQuantity: remainingQuantity,
                efficiency: processEfficiency,
                isUrgent: isUrgentOrder
              };
              
              console.log(`✓ 部分执行（与插单工序相同）: ${selectedLine.name}, 开始: ${this.formatISOTime(actualStartTime)}, 暂停: ${this.formatISOTime(globalInsertStartTime)}`);
              console.log(`  完成数量: ${Math.round(completedQuantity)}/${quantity}`);
              
            } else {
              // 在插单开始前还没开始，需要延后
              console.log(`订单 ${orderId} 工序 ${processName}（与插单工序相同）延后到插单后执行`);
              selectedLine.pausedTasks.push({
                task: {
                  orderId: orderId,
                  processName: processName,
                  plannedQuantity: quantity,
                  efficiency: processEfficiency,
                  plannedStartTime: globalInsertStartTime,
                  deadline: deadline,
                  isUrgent: isUrgentOrder
                },
                pauseTime: globalInsertStartTime,
                insertOrderId: null,
                isUrgent: isUrgentOrder
              });
            }
          } else {
            // ============ 关键：工序与插单不同，完整执行到插单开始时间之后 ============
            console.log(`订单 ${orderId} 工序 ${processName} 与插单工序不同，完整执行`);
            
            // 计算完整执行所需时间
            const requiredHours = quantity / processEfficiency;
            const workTimeResult = this.calculateWorkTime(actualStartTime, requiredHours);
            const endTime = workTimeResult.actualEndTime;
            
            // 更新生产线状态
            selectedLine.availableFrom = endTime;
            selectedLine.activeTask = {
              orderId: orderId,
              processName: processName,
              startTime: actualStartTime,
              endTime: endTime,
              plannedQuantity: quantity,
              efficiency: processEfficiency,
              isUrgent: isUrgentOrder
            };
            
            // 记录到排产结果（完整执行）
            paichanResult.push({
              orderId: orderId,
              orderType: work.dingdanleixing,
              processName: processName,
              processEfficiency: processEfficiency,
              quantity: quantity,
              productionLine: selectedLine.name,
              lineEfficiency: selectedLine.efficiency,
              startTime: this.formatISOTime(actualStartTime),
              endTime: this.formatISOTime(endTime),
              requiredHours: requiredHours.toFixed(2),
              actualWorkHours: workTimeResult.workingHours.toFixed(2),
              totalDays: workTimeResult.totalDays,
              deadline: this.formatISOTime(deadline),
              isInsertOrder: false,
              note: "完整执行（工序与插单不同）",
              priorityColor: "success",
              warning: deadline && endTime > deadline,
              isUrgent: isUrgentOrder,
              priority: isUrgentOrder ? '优先' : '正常',
              status: '正常执行'
            });
            
            console.log(`✓ 完整执行（工序与插单不同）: ${selectedLine.name}, 开始: ${this.formatISOTime(actualStartTime)}, 结束: ${this.formatISOTime(endTime)}`);
          }
        }
      }
    }
  });
  
});
    
   // 4. 处理插单订单（核心逻辑，修复暂停逻辑）
console.log('\n=== 第二步：处理插单订单 ===');

// 存储插单订单的结束时间
const insertOrderEndTimes = {};

// 首先，明确插单包含哪些工序
// const insertProcesses = new Set(); // 存储所有插单工序名称
insertOrders.forEach(orderItem => {
  orderItem.works.forEach(work => {
    const processName = work.gongxumingcheng;
    if (processName && processName.trim() !== '') {
      insertProcesses.add(processName);
    }
  });
});

console.log('插单包含的工序:', Array.from(insertProcesses));

insertOrders.forEach(orderItem => {
  const orderId = orderItem.orderId;
  const works = orderItem.works;
  const insertStartTime = orderItem.insertStartTime;
  
  console.log(`\n处理插单订单 ${orderId}, 插单开始时间: ${this.formatISOTime(insertStartTime)}`);
  
  // 对插单工序排序
  works.sort((a, b) => {
    const timeA = this.safeParseDate(a.work_start_date || a.kaishishijian);
    const timeB = this.safeParseDate(b.work_start_date || b.kaishishijian);
    return (timeA || 0) - (timeB || 0);
  });
  
  let lastInsertEndTime = null;
  
  // 处理每个插单工序
  works.forEach(work => {
    const processName = work.gongxumingcheng;
    const processEfficiency = parseFloat(work.gongxuxiaolv) || 1;
    const quantity = parseFloat(work.gongxushuliang || work.work_num) || 0;
    const deadline = this.safeParseDate(work.jiezhishijian);
    
    console.log(`\n执行插单工序 ${processName}:`);
    console.log(`  数量: ${quantity}, 效率: ${processEfficiency}/小时`);
    
    if (!processName || processName.trim() === '') {
      console.log(`插单订单 ${orderId} 有工序但名称为空，跳过`);
      return;
    }
    
    if (productionLinesByProcess[processName]) {
      // 找到所有匹配的生产线（只处理匹配效率的）
      const suitableLines = productionLinesByProcess[processName].filter(line => 
        Math.abs(line.efficiency - processEfficiency) < 0.01
      );
      
      if (suitableLines.length > 0) {
        // 计算并行总效率
        const totalEfficiency = suitableLines.reduce((sum, line) => sum + line.efficiency, 0);
        
        console.log(`  使用 ${suitableLines.length} 条生产线，总效率: ${totalEfficiency.toFixed(2)}/小时`);
        
        // 确定开始时间
        const actualStartTime = insertStartTime;
        
        // 计算所需时间
        const parallelRequiredHours = quantity / totalEfficiency;
        
        // 计算实际结束时间
        const workTimeResult = this.calculateWorkTime(actualStartTime, parallelRequiredHours);
        const endTime = workTimeResult.actualEndTime;
        
        console.log(`  开始: ${this.formatISOTime(actualStartTime)}`);
        console.log(`  结束: ${this.formatISOTime(endTime)}`);
        
        // 更新最后插单结束时间
        if (!lastInsertEndTime || endTime > lastInsertEndTime) {
          lastInsertEndTime = endTime;
        }
        
        // 按效率比例分配数量
        const allocatedQuantities = [];
        let allocatedTotal = 0;
        
        suitableLines.forEach((line, index) => {
          const proportion = line.efficiency / totalEfficiency;
          const allocatedQty = Math.round(quantity * proportion);
          allocatedQuantities[index] = allocatedQty;
          allocatedTotal += allocatedQty;
        });
        
        // 调整数量
        const quantityDiff = quantity - allocatedTotal;
        if (quantityDiff !== 0) {
          allocatedQuantities[0] += quantityDiff;
        }
        
        // ==================== 关键修复：只暂停相关工序 ====================
        suitableLines.forEach((line, index) => {
          // 关键修复：只暂停该工序生产线上的任务
          // 如果生产线有活跃任务，且不是插单任务，才暂停
          if (line.activeTask && !line.activeTask.isInsert) {
            // 检查这个活跃任务是否与插单工序相关
            // 只有相同工序的生产线才需要暂停
            if (line.activeTask.processName === processName) {
              console.log(`生产线 ${line.name} 的任务（${line.activeTask.orderId}-${line.activeTask.processName}）被插单 ${orderId} 暂停`);
              
              line.pausedTasks.push({
                task: {
                  ...line.activeTask,
                  pauseTime: line.activeTask.pausedAt || actualStartTime,
                  insertOrderId: orderId
                },
                pauseTime: actualStartTime,
                insertOrderId: orderId,
                isUrgent: line.activeTask.isUrgent || false
              });
            } else {
              // 不同工序的任务不需要暂停
              console.log(`生产线 ${line.name} 的任务（${line.activeTask.processName}）与插单工序（${processName}）不同，不需要暂停`);
            }
          } else if (line.activeTask && line.activeTask.isInsert) {
            // 如果已经是插单任务，不需要处理
            console.log(`生产线 ${line.name} 已经是插单任务，不需要暂停`);
          }
          
          // 执行插单任务
          line.activeTask = {
            orderId: orderId,
            processName: processName,
            startTime: actualStartTime,
            endTime: endTime,
            plannedQuantity: allocatedQuantities[index],
            efficiency: line.efficiency,
            isInsert: true
          };
          
          line.isPaused = false;
          line.pausedAt = null;
          line.availableFrom = endTime;
        });
        
        // 添加插单记录
        paichanResult.push({
          orderId: orderId,
          orderType: work.dingdanleixing,
          processName: processName,
          processEfficiency: processEfficiency,
          quantity: quantity,
          productionLine: suitableLines.map(line => `${line.name}(${line.efficiency}/h)`).join('、'),
          lineEfficiency: totalEfficiency.toFixed(2),
          startTime: this.formatISOTime(actualStartTime),
          endTime: this.formatISOTime(endTime),
          requiredHours: parallelRequiredHours.toFixed(2),
          actualWorkHours: workTimeResult.workingHours.toFixed(2),
          totalDays: workTimeResult.totalDays,
          deadline: this.formatISOTime(deadline),
          isInsert: true,
          parallelCount: suitableLines.length,
          note: "插单执行",
          priority: '插单',
          status: deadline && endTime > deadline ? '超期' : '正常',
          warning: deadline && endTime > deadline
        });
        
        console.log(`✓ 插单工序 ${processName} 执行完成`);
      }
    }
  });
  
  // 存储插单订单的结束时间
  if (lastInsertEndTime) {
    insertOrderEndTimes[orderId] = lastInsertEndTime;
  }
});
    
    // 5. 插单完成后，恢复被暂停的任务（修复版）
console.log('\n=== 第五步：恢复被暂停的任务 ===');

// 修复：为每个工序找到对应的插单结束时间
const processInsertEndTimes = {}; // 按工序名称存储插单结束时间

// 首先，收集所有插单工序的结束时间
insertOrders.forEach(orderItem => {
  const orderId = orderItem.orderId;
  const works = orderItem.works;
  
  works.forEach(work => {
    const processName = work.gongxumingcheng;
    if (!processName || processName.trim() === '') return;
    
    // 找到这个工序对应的生产线
    if (productionLinesByProcess[processName]) {
      const lines = productionLinesByProcess[processName];
      
      // 找到执行这个插单工序的生产线
      lines.forEach(line => {
        if (line.activeTask && line.activeTask.orderId === orderId && line.activeTask.isInsert) {
          const endTime = line.activeTask.endTime;
          
          // 更新该工序的插单结束时间（取最晚的时间）
          if (!processInsertEndTimes[processName] || endTime > processInsertEndTimes[processName]) {
            processInsertEndTimes[processName] = endTime;
            console.log(`工序 ${processName} 插单结束时间: ${endTime.toLocaleString()}`);
          }
        }
      });
    }
  });
});

console.log('\n各工序的插单结束时间:', Object.keys(processInsertEndTimes).length);
Object.keys(processInsertEndTimes).forEach(processName => {
  console.log(`- ${processName}: ${processInsertEndTimes[processName].toLocaleString()}`);
});

// 现在恢复被暂停的任务
Object.keys(productionLinesByProcess).forEach(processName => {
  const lines = productionLinesByProcess[processName];
  const lastInsertEndTime = processInsertEndTimes[processName];
  
  if (lastInsertEndTime) {
    console.log(`\n恢复工序 ${processName} 的被暂停任务，插单结束时间: ${lastInsertEndTime.toLocaleString()}`);
    
    lines.forEach(line => {
      // 收集所有需要恢复的任务（避免在循环中直接修改数组）
      const tasksToResume = [];
      
      for (let i = 0; i < line.pausedTasks.length; i++) {
        const pausedTask = line.pausedTasks[i];
        
        // 检查这个暂停任务是否与该插单相关
        if (pausedTask.insertOrderId) {
          // 这是一个被插单暂停的任务，需要恢复
          tasksToResume.push({
            index: i,
            pausedTask: pausedTask
          });
        } else if (!pausedTask.insertOrderId && pausedTask.task.processName === processName) {
          // 这是一个在插单开始前还没开始的任务，也需要恢复
          tasksToResume.push({
            index: i,
            pausedTask: pausedTask
          });
        }
      }
      
      // 按暂停时间排序（先暂停的先恢复）
      tasksToResume.sort((a, b) => {
        const timeA = a.pausedTask.pauseTime || 0;
        const timeB = b.pausedTask.pauseTime || 0;
        return timeA - timeB;
      });
      
      // 处理需要恢复的任务
      tasksToResume.forEach((taskInfo, resumeIndex) => {
        const originalIndex = taskInfo.index - resumeIndex; // 因为之前的任务被移除了，索引需要调整
        const pausedTask = taskInfo.pausedTask;
        const task = pausedTask.task;
        
        console.log(`恢复生产线 ${line.name} 的任务: 订单 ${task.orderId} 工序 ${task.processName}`);
        console.log(`  原始计划数量: ${task.plannedQuantity}`);
        console.log(`  剩余数量: ${task.remainingQuantity || task.plannedQuantity}`);
        
        // 计算恢复开始时间
        let resumeStartTime = lastInsertEndTime;
        
        // 如果是第一个恢复的任务，从插单结束后开始
        // 如果不是第一个，从上个恢复任务结束后开始
        if (resumeIndex > 0) {
          // 这里需要从上个任务的结束时间开始，但我们需要知道上个任务的结束时间
          // 简化处理：从插单结束后依次排列
          resumeStartTime = lastInsertEndTime;
        }
        
        // 计算需要完成的数量
        const quantityToComplete = task.remainingQuantity || task.plannedQuantity;
        
        // 计算所需时间
        const requiredHours = quantityToComplete / task.efficiency;
        
        // 计算实际结束时间
        const workTimeResult = this.calculateWorkTime(resumeStartTime, requiredHours);
        const resumeEndTime = workTimeResult.actualEndTime;
        
        console.log(`  恢复开始: ${resumeStartTime.toLocaleString()}`);
        console.log(`  恢复结束: ${resumeEndTime.toLocaleString()}`);
        console.log(`  完成数量: ${quantityToComplete}, 所需小时: ${requiredHours.toFixed(2)}`);
        
        // 从映射中获取原始工作数据
        const workKey = task.orderId + "_" + task.processName;
        const originalWorkData = workDataMap[workKey];
        
        // 更新生产线状态
        line.activeTask = {
          orderId: task.orderId,
          processName: task.processName,
          startTime: resumeStartTime,
          endTime: resumeEndTime,
          plannedQuantity: quantityToComplete,
          efficiency: task.efficiency,
          isResumed: true,
          isUrgent: task.isUrgent
        };
        
        line.availableFrom = resumeEndTime;
        line.isPaused = false;
        
        // 确定任务描述
        let note = "恢复执行（插单后）";
        let status = "恢复执行";
        
        if (task.completedQuantity && task.completedQuantity > 0) {
          // 这是部分执行后的恢复
          const totalQuantity = task.plannedQuantity + task.completedQuantity;
          const completionRate = Math.round((task.completedQuantity / totalQuantity) * 100);
          note = `恢复执行（已完成${completionRate}%）`;
          status = "插单后续执行";
        } else if (pausedTask.waitForInsert) {
          // 这是等待插单完成的任务
          note = "插单后执行";
          status = "插单后执行";
        }
        
        // 添加恢复执行记录
        paichanResult.push({
          orderId: task.orderId,
          orderType: originalWorkData ? originalWorkData.dingdanleixing : 'normal',
          processName: task.processName,
          processEfficiency: task.efficiency,
          quantity: quantityToComplete,
          productionLine: line.name,
          lineEfficiency: line.efficiency,
          startTime: this.formatISOTime(resumeStartTime),
          endTime: this.formatISOTime(resumeEndTime),
          requiredHours: requiredHours.toFixed(2),
          actualWorkHours: workTimeResult.workingHours.toFixed(2),
          totalDays: workTimeResult.totalDays,
          deadline: originalWorkData ? this.formatISOTime(originalWorkData.jiezhishijian) : '',
          isInsertOrder: false,
          note: note,
          priorityColor: "success",
          isResumed: true,
          isUrgent: task.isUrgent,
          priority: task.isUrgent ? '优先' : '正常',
          status: status,
          warning: originalWorkData && originalWorkData.jiezhishijian && 
                   resumeEndTime > this.safeParseDate(originalWorkData.jiezhishijian),
          totalNote: task.completedQuantity ? 
            `总计${task.plannedQuantity + task.completedQuantity}个（插单前完成${task.completedQuantity}）` :
            `总计${task.plannedQuantity}个`
        });
        
        // 从暂停列表中移除（使用调整后的索引）
        line.pausedTasks.splice(originalIndex, 1);
        
        console.log(`✓ 任务恢复完成，从暂停列表中移除`);
      });
    });
  } else {
    console.log(`工序 ${processName} 没有找到插单结束时间，跳过恢复`);
  }
});
    
    // 6. 处理剩余的普通订单（没有被打断的）
    console.log('\n=== 第三步：处理剩余普通订单 ===');
    
    // 检查哪些工序已经处理过
    const processedTasks = {};
    paichanResult.forEach(item => {
      const key = item.orderId + "_" + item.processName;
      if (!processedTasks[key]) {
        processedTasks[key] = [];
      }
      processedTasks[key].push(item);
    });
    
    sortedNormalOrders.forEach(orderItem => {
      const orderId = orderItem.orderId;
      const works = orderItem.works;
      const isUrgentOrder = orderItem.isUrgent;
      
      works.forEach(work => {
        const processName = work.gongxumingcheng;
        const key = orderId + "_" + processName;
        
        // 检查这个工序是否已经完整处理
        const taskRecords = processedTasks[key];
        let totalProcessed = 0;
        let isComplete = false;
        
        if (taskRecords) {
          taskRecords.forEach(record => {
            if (record.quantity && typeof record.quantity === 'number') {
              totalProcessed += record.quantity;
            }
            if (record.isPartial || record.isResumed) {
              isComplete = false;
            }
          });
          
          // 如果总处理数量等于计划数量，说明已经完成
          if (totalProcessed >= parseFloat(work.gongxushuliang || 0)) {
            isComplete = true;
          }
        }
        
        if (!isComplete) {
          // 这个工序还没有处理或未完成
          console.log(`处理未完成订单工序: ${orderId} - ${processName}`);
          
          const processEfficiency = parseFloat(work.gongxuxiaolv) || 1;
          const quantity = parseFloat(work.gongxushuliang || work.work_num) || 0;
          const plannedStartTime = this.safeParseDate(work.work_start_date || work.kaishishijian);
          const deadline = this.safeParseDate(work.jiezhishijian);
          
          if (productionLinesByProcess[processName]) {
            const suitableLines = productionLinesByProcess[processName].filter(line => {
              const efficiencyMatch = Math.abs(line.efficiency - processEfficiency) < 0.1;
              const isAvailable = !line.activeTask || line.isPaused;
              return efficiencyMatch && isAvailable;
            });
            
            if (suitableLines.length > 0) {
              suitableLines.sort((a, b) => {
                const timeA = a.availableFrom ? this.safeParseDate(a.availableFrom) : plannedStartTime;
                const timeB = b.availableFrom ? this.safeParseDate(b.availableFrom) : plannedStartTime;
                return (timeA || 0) - (timeB || 0);
              });
              
              const selectedLine = suitableLines[0];
              let actualStartTime = selectedLine.availableFrom ? 
                this.safeParseDate(selectedLine.availableFrom) : plannedStartTime;
              
              if (actualStartTime < plannedStartTime) {
                actualStartTime = plannedStartTime;
              }
              
              const requiredHours = quantity / processEfficiency;
              const workTimeResult = this.calculateWorkTime(actualStartTime, requiredHours);
              const endTime = workTimeResult.actualEndTime;
              
              selectedLine.availableFrom = endTime;
              selectedLine.activeTask = {
                orderId: orderId,
                processName: processName,
                startTime: actualStartTime,
                endTime: endTime,
                plannedQuantity: quantity,
                efficiency: processEfficiency,
                isUrgent: isUrgentOrder
              };
              
              paichanResult.push({
                orderId: orderId,
                processName: processName,
                processEfficiency: processEfficiency,
                quantity: quantity,
                productionLine: selectedLine.name,
                lineEfficiency: selectedLine.efficiency,
                startTime: this.formatISOTime(actualStartTime),
                endTime: this.formatISOTime(endTime),
                requiredHours: requiredHours.toFixed(2),
                actualWorkHours: workTimeResult.workingHours.toFixed(2),
                totalDays: workTimeResult.totalDays,
                deadline: this.formatISOTime(deadline),
                isInsertOrder: false,
                note: "延迟执行（插单后）",
                priorityColor: "success",
                isUrgent: isUrgentOrder,
                priority: isUrgentOrder ? '优先' : '正常',
                status: '延迟执行'
              });
              
              console.log(`✓ 新增执行: ${selectedLine.name}`);
            }
          }
        }
      });
    });
    
    // 7. 按开始时间排序结果
    paichanResult.sort((a, b) => {
      const timeA = this.safeParseDate(a.startTime);
      const timeB = this.safeParseDate(b.startTime);
      return (timeA || 0) - (timeB || 0);
    });
    
    // 8. 统计信息
    const partialCount = paichanResult.filter(item => item.isPartial).length;
    const resumedCount = paichanResult.filter(item => item.isResumed).length;
    const insertCount = paichanResult.filter(item => item.isInsertOrder).length;
    const normalCount = paichanResult.filter(item => !item.isInsertOrder).length;
    
    console.log('\n=== 排产统计（PC端逻辑）===');
    console.log('总工序数:', paichanResult.length);
    console.log('插单工序:', insertCount);
    console.log('普通工序:', normalCount);
    console.log('部分执行:', partialCount);
    console.log('恢复执行:', resumedCount);
    
    _this.setData({
      paichanResult: paichanResult,
      isCalculating: false
    });
    
    // 关联排产结束时间
    _this.associatePaichanEndTime();
    
    wx.showToast({
      title: `排产完成：${paichanResult.length}条（插单${insertCount}，部分${partialCount}，恢复${resumedCount}）`,
      icon: 'success'
    });
    
  } catch (error) {
    console.error('插单排产逻辑错误:', error);
    _this.setData({ isCalculating: false });
    wx.showToast({
      title: '插单排产失败',
      icon: 'none'
    });
  }
},

// 新增：计算实际工作时间（考虑工作时间配置）
calculateWorkTime: function(startTime, requiredHours) {
  console.log('=== calculateWorkTime 开始 ===');
  console.log('输入参数:', {
    startTime: startTime instanceof Date ? startTime.toLocaleString() : startTime,
    requiredHours: requiredHours
  });
  
  try {
    // 参数验证
    if (!startTime) {
      console.error('开始时间无效');
      return {
        actualEndTime: new Date(),
        workingHours: 0,
        totalDays: 0
      };
    }
    
    if (!requiredHours || requiredHours <= 0) {
      console.error('所需小时数无效:', requiredHours);
      return {
        actualEndTime: startTime instanceof Date ? startTime : new Date(startTime),
        workingHours: 0,
        totalDays: 0
      };
    }
    
    // 确保 startTime 是 Date 对象
    const startDate = startTime instanceof Date ? new Date(startTime.getTime()) : new Date(startTime);
    if (isNaN(startDate.getTime())) {
      console.error('开始时间解析失败:', startTime);
      return {
        actualEndTime: new Date(),
        workingHours: 0,
        totalDays: 0
      };
    }
    
    let currentTime = new Date(startDate.getTime());
    let remainingHours = parseFloat(requiredHours);
    let totalWorkingHours = 0;
    let totalDays = 0;
    const maxDays = 365; // 安全限制
    
    console.log('开始时间:', currentTime.toLocaleString());
    console.log('需要完成的小时数:', remainingHours);
    
    // 将时间字符串转换为分钟数
    const timeToMinutes = (timeStr) => {
      if (!timeStr || typeof timeStr !== 'string') return 0;
      const parts = timeStr.split(':');
      const hours = parseInt(parts[0]) || 0;
      const minutes = parseInt(parts[1]) || 0;
      return hours * 60 + minutes;
    };
    
    // 获取某天的工作时间配置
    const getDayConfig = (date) => {
      if (!this.data.timeList || this.data.timeList.length === 0) {
        console.log('工作时间配置为空，使用默认8小时工作制');
        return null; // 如果没有配置，返回null
      }
      
      // 获取星期几 (0=周日, 1=周一, ..., 6=周六)
      const dayOfWeek = date.getDay();
      // 转换为中国的星期表示 (1=周一, 2=周二, ..., 7=周日)
      const weekNum = dayOfWeek === 0 ? 7 : dayOfWeek;
      
      return this.data.timeList.find(item => item.week == weekNum);
    };
    
    // 检查给定时间是否在工作时间内
    const isWithinWorkHours = (date, dayConfig) => {
      if (!dayConfig) return false;
      
      const currentMinutes = date.getHours() * 60 + date.getMinutes();
      
      // 上午工作时间段
      const morningStart = timeToMinutes(dayConfig.morning_start);
      const morningEnd = timeToMinutes(dayConfig.morning_end);
      if (morningEnd > morningStart && currentMinutes >= morningStart && currentMinutes < morningEnd) {
        return true;
      }
      
      // 中午工作时间段
      const noonStart = timeToMinutes(dayConfig.noon_start);
      const noonEnd = timeToMinutes(dayConfig.noon_end);
      if (noonEnd > noonStart && currentMinutes >= noonStart && currentMinutes < noonEnd) {
        return true;
      }
      
      // 晚上工作时间段
      const eveningStart = timeToMinutes(dayConfig.night_start);
      const eveningEnd = timeToMinutes(dayConfig.night_end);
      if (eveningEnd > eveningStart && currentMinutes >= eveningStart && currentMinutes < eveningEnd) {
        return true;
      }
      
      return false;
    };
    
    // 获取当前时间的下一个工作时间开始点
    const getNextWorkStart = (date) => {
      let nextDate = new Date(date);
      const dayConfig = getDayConfig(nextDate);
      
      // 如果没有配置工作时间，默认第二天8点开始
      if (!dayConfig) {
        nextDate.setDate(nextDate.getDate() + 1);
        nextDate.setHours(8, 0, 0, 0);
        return nextDate;
      }
      
      const currentMinutes = nextDate.getHours() * 60 + nextDate.getMinutes();
      const morningStart = timeToMinutes(dayConfig.morning_start);
      const noonStart = timeToMinutes(dayConfig.noon_start);
      const eveningStart = timeToMinutes(dayConfig.night_start);
      const eveningEnd = timeToMinutes(dayConfig.night_end);
      
      // 检查当前时间在哪个时间段
      const morningEnd = timeToMinutes(dayConfig.morning_end);
      const noonEnd = timeToMinutes(dayConfig.noon_end);
      
      // 如果当前时间在非工作时间
      if (currentMinutes < morningStart) {
        // 还没到上午工作时间，调整到上午开始
        nextDate.setHours(Math.floor(morningStart / 60), morningStart % 60, 0, 0);
      } else if (currentMinutes >= morningEnd && currentMinutes < noonStart) {
        // 上午工作结束，午休时间，调整到中午开始
        nextDate.setHours(Math.floor(noonStart / 60), noonStart % 60, 0, 0);
      } else if (currentMinutes >= noonEnd && currentMinutes < eveningStart) {
        // 中午工作结束，调整到晚上开始
        nextDate.setHours(Math.floor(eveningStart / 60), eveningStart % 60, 0, 0);
      } else if (currentMinutes >= eveningEnd) {
        // 今天工作时间已过，跳到下一天
        nextDate.setDate(nextDate.getDate() + 1);
        nextDate.setHours(0, 0, 0, 0);
        return getNextWorkStart(nextDate);
      }
      
      return nextDate;
    };
    
    // 计算今天剩余的工作时间（小时）
    const calculateTodayRemainingHours = (date, dayConfig) => {
      if (!dayConfig) return 0;
      
      const currentMinutes = date.getHours() * 60 + date.getMinutes();
      let remainingMinutes = 0;
      
      // 上午时间段
      const morningStart = timeToMinutes(dayConfig.morning_start);
      const morningEnd = timeToMinutes(dayConfig.morning_end);
      if (morningEnd > morningStart) {
        if (currentMinutes >= morningStart && currentMinutes < morningEnd) {
          remainingMinutes += (morningEnd - currentMinutes);
        } else if (currentMinutes < morningStart) {
          remainingMinutes += (morningEnd - morningStart);
        }
      }
      
      // 中午时间段
      const noonStart = timeToMinutes(dayConfig.noon_start);
      const noonEnd = timeToMinutes(dayConfig.noon_end);
      if (noonEnd > noonStart) {
        if (currentMinutes >= noonStart && currentMinutes < noonEnd) {
          remainingMinutes += (noonEnd - currentMinutes);
        } else if (currentMinutes < noonStart) {
          remainingMinutes += (noonEnd - noonStart);
        }
      }
      
      // 晚上时间段
      const eveningStart = timeToMinutes(dayConfig.night_start);
      const eveningEnd = timeToMinutes(dayConfig.night_end);
      if (eveningEnd > eveningStart) {
        if (currentMinutes >= eveningStart && currentMinutes < eveningEnd) {
          remainingMinutes += (eveningEnd - currentMinutes);
        } else if (currentMinutes < eveningStart) {
          remainingMinutes += (eveningEnd - eveningStart);
        }
      }
      
      return remainingMinutes / 60; // 转换为小时
    };
    
    // 如果当前时间不在工作时间内，调整到下一个工作开始时间
    const dayConfig = getDayConfig(currentTime);
    if (dayConfig && !isWithinWorkHours(currentTime, dayConfig)) {
      console.log('当前时间不在工作时间内，调整到下一个工作开始时间');
      currentTime = getNextWorkStart(currentTime);
    }
    
    // 主循环：计算完成所需工作量的时间
    while (remainingHours > 0 && totalDays < maxDays) {
      const dayConfig = getDayConfig(currentTime);
      
      if (dayConfig) {
        // 今天有工作时间配置
        const todayRemainingHours = calculateTodayRemainingHours(currentTime, dayConfig);
        
        console.log(`第${totalDays + 1}天:`, {
          日期: currentTime.toLocaleDateString(),
          当前时间: currentTime.toLocaleTimeString(),
          今天剩余工作时间: todayRemainingHours.toFixed(2) + '小时',
          还需工作时间: remainingHours.toFixed(2) + '小时'
        });
        
        if (todayRemainingHours > 0) {
          const canWorkToday = Math.min(todayRemainingHours, remainingHours);
          
          // 计算今天的工作结束时间
          const workedMinutes = canWorkToday * 60;
          const endTime = new Date(currentTime.getTime() + workedMinutes * 60 * 1000);
          
          // 更新状态
          remainingHours -= canWorkToday;
          totalWorkingHours += canWorkToday;
          
          // 如果今天能完成全部工作
          if (remainingHours <= 0) {
            currentTime = endTime;
            totalDays++;
            break;
          } else {
            // 今天没完成，跳到下一天的开始工作时间
            currentTime.setDate(currentTime.getDate() + 1);
            currentTime.setHours(0, 0, 0, 0);
            currentTime = getNextWorkStart(currentTime);
          }
        } else {
          // 今天没有工作时间，跳到下一天
          currentTime.setDate(currentTime.getDate() + 1);
          currentTime.setHours(0, 0, 0, 0);
          currentTime = getNextWorkStart(currentTime);
        }
      } else {
        // 今天没有工作时间配置（休息日）
        console.log(`第${totalDays + 1}天（休息）:`, currentTime.toLocaleDateString());
        currentTime.setDate(currentTime.getDate() + 1);
        currentTime.setHours(8, 0, 0, 0); // 假设第二天8点开始
      }
      
      totalDays++;
      
      // 安全限制
      if (totalDays >= maxDays) {
        console.error('计算超时，达到最大天数限制');
        break;
      }
    }
    
    const result = {
      actualEndTime: currentTime,
      workingHours: totalWorkingHours,
      totalDays: totalDays
    };
    
    console.log('=== calculateWorkTime 结束 ===');
    console.log('计算结果:', {
      实际结束时间: currentTime.toLocaleString(),
      总工作时间: totalWorkingHours.toFixed(2) + '小时',
      总天数: totalDays + '天',
      剩余未完成小时: remainingHours
    });
    
    return result;
    
  } catch (error) {
    console.error('calculateWorkTime 函数错误:', error);
    return {
      actualEndTime: startTime instanceof Date ? startTime : new Date(startTime),
      workingHours: 0,
      totalDays: 0
    };
  }
},
// 计算在工作时间段内能完成的数量
calculateWorkableQuantity: function(startTime, endTime, efficiency) {
  var _this = this;
  
  console.log("计算可完成工作量:", {
    开始时间: startTime.toLocaleString(),
    结束时间: endTime.toLocaleString(),
    生产效率: efficiency + "/小时"
  });
  
  // 参数验证
  if (!startTime || !endTime) {
    console.error("时间参数无效");
    return { workableQuantity: 0, workableHours: 0, totalWorkingDays: 0 };
  }
  
  if (startTime >= endTime) {
    console.log("开始时间不早于结束时间，无可工作时间");
    return { workableQuantity: 0, workableHours: 0, totalWorkingDays: 0 };
  }
  
  if (efficiency <= 0) {
    console.error("生产效率必须大于0");
    return { workableQuantity: 0, workableHours: 0, totalWorkingDays: 0 };
  }
  
  // ✅ 关键修复：使用工作时间配置来判断
  var totalHours = 0;
  var currentTime = new Date(startTime);
  var targetEndTime = new Date(endTime);
  var dayCount = 0;
  
  console.log("开始计算时间段内可用工作时间...");
  
  // 如果有工作时间配置，使用配置
  if (_this.data.timeList && _this.data.timeList.length > 0) {
    console.log("使用工作时间配置");
    
    while (currentTime < targetEndTime && dayCount < 365) {
      // 获取当天的星期几
      var dayOfWeek = currentTime.getDay(); // 0=周日, 1=周一, ..., 6=周六
      var weekNum = dayOfWeek === 0 ? 7 : dayOfWeek; // 转换为中国星期
      
      // 查找当天的配置
      var dayConfig = _this.data.timeList.find(function(item) {
        return item.week == weekNum;
      });
      
      if (dayConfig) {
        console.log(`第${dayCount + 1}天（工作）: ${currentTime.toLocaleDateString()}`);
        
        // 计算当天的工作时间
        var dayHours = _this.calculateDailyWorkHours(currentTime, dayConfig, targetEndTime);
        totalHours += dayHours;
        
        console.log(`- 当天工作小时: ${dayHours.toFixed(2)}`);
        
        // 移动到下一天
        currentTime.setDate(currentTime.getDate() + 1);
        currentTime.setHours(0, 0, 0, 0);
      } else {
        console.log(`第${dayCount + 1}天（休息）: ${currentTime.toLocaleDateString()}`);
        // 休息日，直接跳到下一天
        currentTime.setDate(currentTime.getDate() + 1);
        currentTime.setHours(0, 0, 0, 0);
      }
      
      dayCount++;
      
      if (dayCount >= 365) {
        console.error("计算超时");
        break;
      }
    }
  } else {
    // 没有工作时间配置，使用默认8小时工作日
    console.log("没有工作时间配置，使用默认8小时工作日");
    
    while (currentTime < targetEndTime && dayCount < 365) {
      var dayOfWeek = currentTime.getDay();
      
      // 默认：周一到周五为工作日
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        console.log(`第${dayCount + 1}天（工作）: ${currentTime.toLocaleDateString()}`);
        
        // 计算当天的工作时间（8小时）
        var dayStart = new Date(currentTime);
        dayStart.setHours(8, 0, 0, 0);  // 8:00开始
        
        var dayEnd = new Date(currentTime);
        dayEnd.setHours(17, 0, 0, 0);   // 17:00结束
        
        // 计算今天能工作的时间
        var dayHours = 0;
        if (currentTime < dayEnd) {
          var workStart = currentTime < dayStart ? dayStart : currentTime;
          var workEnd = new Date(Math.min(dayEnd, targetEndTime));
          
          dayHours = (workEnd - workStart) / (1000 * 60 * 60);
          totalHours += dayHours;
          
          console.log(`- 当天工作小时: ${dayHours.toFixed(2)}`);
        }
      } else {
        console.log(`第${dayCount + 1}天（休息）: ${currentTime.toLocaleDateString()}`);
      }
      
      // 移动到下一天
      currentTime.setDate(currentTime.getDate() + 1);
      currentTime.setHours(0, 0, 0, 0);
      dayCount++;
      
      if (dayCount >= 365) {
        console.error("计算超时");
        break;
      }
    }
  }
  
  // 计算可完成的数量
  var workableQuantity = totalHours * efficiency;
  
  console.log("计算结果:", {
    总可用小时: totalHours.toFixed(2),
    可完成产量: workableQuantity.toFixed(2),
    计算天数: dayCount
  });
  
  return {
    workableQuantity: workableQuantity,
    workableHours: totalHours,
    totalWorkingDays: Math.ceil(totalHours / 8)  // 估算工作天数
  };
},

// ✅ 新增：计算一天内的工作小时数
calculateDailyWorkHours: function(date, dayConfig, targetEndTime) {
  var totalMinutes = 0;
  
  // 将时间字符串转换为分钟数
  function timeToMinutes(timeStr) {
    if (!timeStr || typeof timeStr !== 'string') return 0;
    var parts = timeStr.split(':');
    var hours = parseInt(parts[0]) || 0;
    var minutes = parseInt(parts[1]) || 0;
    return hours * 60 + minutes;
  }
  
  var morningStart = timeToMinutes(dayConfig.morning_start);
  var morningEnd = timeToMinutes(dayConfig.morning_end);
  var noonStart = timeToMinutes(dayConfig.noon_start);
  var noonEnd = timeToMinutes(dayConfig.noon_end);
  var eveningStart = timeToMinutes(dayConfig.night_start);
  var eveningEnd = timeToMinutes(dayConfig.night_end);
  
  var currentMinutes = date.getHours() * 60 + date.getMinutes();
  var endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  var targetMinutes = targetEndTime <= endOfDay ? 
    targetEndTime.getHours() * 60 + targetEndTime.getMinutes() : 
    24 * 60;
  
  // 上午时间段
  if (morningEnd > morningStart) {
    var workStart = Math.max(morningStart, currentMinutes);
    var workEnd = Math.min(morningEnd, targetMinutes);
    if (workEnd > workStart) {
      totalMinutes += (workEnd - workStart);
    }
  }
  
  // 中午时间段
  if (noonEnd > noonStart) {
    var workStart = Math.max(noonStart, currentMinutes);
    var workEnd = Math.min(noonEnd, targetMinutes);
    if (workEnd > workStart) {
      totalMinutes += (workEnd - workStart);
    }
  }
  
  // 晚上时间段
  if (eveningEnd > eveningStart) {
    var workStart = Math.max(eveningStart, currentMinutes);
    var workEnd = Math.min(eveningEnd, targetMinutes);
    if (workEnd > workStart) {
      totalMinutes += (workEnd - workStart);
    }
  }
  
  return totalMinutes / 60; // 转换为小时
},
choiceDate: function(e) {
  const value = e.detail.value;
  const type = e.currentTarget.dataset.type; // 'start' 或 'deadline'
  
  if (type === 'start') {
    this.setData({
      'newItem.work_start_date': value
    });
  } else {
    this.setData({
      deadlineDate: value
    });
  }
  console.log(`${type}日期选择:`, value);
},

// 输入框事件（不需要修改数据，只是占位）
onInputDate: function(e) {
  // 这个函数可以留空，因为input是disabled的
  console.log('日期输入框点击:', e.detail.value);
},

// 修改打开弹窗的方法，确保picker能正常工作
openAddDialog: function() {
  if (!this.data.hasAddPermission) {
    wx.showToast({
      title: '无添加权限',
      icon: 'none'
    });
    return;
  }

  this.setData({
    addDialogVisible: true,
    newItem: {
      orderIndex: 0,
      work_num: '',
      typeIndex: 0,
      insertIndex: 0,
      work_start_date: ''
    },
    deadlineDate: '',
    selectedOrderNum: 0
  });
  
  // 关键：延迟一小会儿，确保picker组件完全加载
  setTimeout(() => {
    console.log('新增弹窗已完全打开');
  }, 100);
},
// 在您现有的代码基础上，添加和修改以下函数：

// 新增：获取插单订单信息的函数
getInsertOrderInfo: function() {
  const _this = this;
  
  // 首先找出所有标记为插单的订单
  const insertOrders = [];
  
  this.data.list.forEach(item => {
    if (item.is_insert == 1) {
      insertOrders.push({
        orderId: item.order_id,
        startDate: item.work_start_date,
        endDate: item.jiezhishijian || item.paichanEndTime,
        workNum: item.work_num,
        type: item.type
      });
    }
  });
  
  // 如果有多个插单，按开始时间排序，取最早的插单
  if (insertOrders.length > 0) {
    insertOrders.sort((a, b) => {
      const dateA = _this.safeParseDate(a.startDate);
      const dateB = _this.safeParseDate(b.startDate);
      return (dateA || 0) - (dateB || 0);
    });
    
    // 返回最早的插单信息
    return insertOrders[0];
  }
  
  return null;
},

// 新增：调整排产日期的核心逻辑函数
adjustPaichanDates: function(originalList) {
  const _this = this;
  const insertOrder = this.getInsertOrderInfo();
  
  // 如果没有插单订单，直接返回原列表
  if (!insertOrder) {
    console.log('没有找到插单订单，无需调整');
    return originalList;
  }
  
  const insertStartDate = insertOrder.startDate;
  const insertEndDate = insertOrder.endDate;
  
  console.log('找到插单订单:', insertOrder);
  console.log('插单开始日期:', insertStartDate);
  console.log('插单结束日期:', insertEndDate);
  
  if (!insertStartDate || !insertEndDate) {
    console.log('插单日期信息不完整，无法调整');
    return originalList;
  }
  
  const adjustedList = [];
  let hasProcessedBeforeInsert = false;
  const insertStartDateTime = _this.safeParseDate(insertStartDate);
  const insertEndDateTime = _this.safeParseDate(insertEndDate);
  
  if (!insertStartDateTime || !insertEndDateTime) {
    console.log('插单日期解析失败');
    return originalList;
  }
  
  // 先处理插单之前的订单
  for (let i = 0; i < originalList.length; i++) {
    const item = {...originalList[i]};
    const itemStartDate = item.work_start_date;
    const itemEndDate = item.jiezhishijian || item.paichanEndTime;
    
    const itemStartDateTime = _this.safeParseDate(itemStartDate);
    const itemEndDateTime = _this.safeParseDate(itemEndDate);
    
    // 跳过插单订单本身
    if (item.is_insert == 1 && item.order_id == insertOrder.orderId) {
      console.log('跳过插单订单本身:', item.order_id);
      adjustedList.push(item);
      continue;
    }
    
    // 判断当前订单的开始日期是否早于插单开始日期
    if (itemStartDateTime && itemStartDateTime < insertStartDateTime) {
      console.log(`订单 ${item.order_id} 开始日期 ${itemStartDate} 早于插单日期 ${insertStartDate}`);
      
      // 开始日期早于插单日期，开始日期不变
      item.work_start_date = itemStartDate;
      
      // 结束日期调整到插单开始日期之前（如果原结束日期在插单开始之后）
      if (itemEndDateTime && itemEndDateTime > insertStartDateTime) {
        // 需要调整结束日期
        // 计算插单开始前一天的日期
        const adjustedEndDate = new Date(insertStartDateTime);
        adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);
        
        const adjustedEndDateStr = _this.formatDateOnly(adjustedEndDate);
        
        // 如果原结束时间有时间部分，保留时间部分
        if (itemEndDate.includes(' ')) {
          const timePart = itemEndDate.split(' ')[1];
          item.jiezhishijian = adjustedEndDateStr + ' ' + timePart;
        } else {
          item.jiezhishijian = adjustedEndDateStr;
        }
        
        // 同样更新 paichanEndTime
        item.paichanEndTime = item.jiezhishijian;
        
        console.log(`订单 ${item.order_id} 结束日期调整到: ${item.jiezhishijian}`);
        
        // 标记这个订单在插单之前结束
        hasProcessedBeforeInsert = true;
      }
    } else {
      // 开始日期不早于插单日期
      console.log(`订单 ${item.order_id} 开始日期 ${itemStartDate} 不早于插单日期 ${insertStartDate}`);
      
      // 检查是否已经有订单在插单前结束
      if (hasProcessedBeforeInsert) {
        // 从插单结束日期之后开始
        const newStartDate = new Date(insertEndDateTime);
        newStartDate.setDate(newStartDate.getDate() + 1);
        
        const newStartDateStr = _this.formatDateOnly(newStartDate);
        
        // 如果原开始时间有时间部分，保留时间部分
        if (itemStartDate.includes(' ')) {
          const timePart = itemStartDate.split(' ')[1];
          item.work_start_date = newStartDateStr + ' ' + timePart;
        } else {
          item.work_start_date = newStartDateStr;
        }
        
        console.log(`订单 ${item.order_id} 开始日期调整到: ${item.work_start_date}`);
        
        // 重新计算结束日期（基于所需工时等）
        // 这里假设您有计算所需工时的逻辑
        if (item.requiredHours && item.processEfficiency) {
          const daysNeeded = Math.ceil(item.requiredHours / (item.processEfficiency * 8)); // 假设每天8小时
          const newEndDate = new Date(newStartDate);
          newEndDate.setDate(newEndDate.getDate() + daysNeeded - 1);
          
          const newEndDateStr = _this.formatDateOnly(newEndDate);
          
          if (item.jiezhishijian && item.jiezhishijian.includes(' ')) {
            const timePart = item.jiezhishijian.split(' ')[1];
            item.jiezhishijian = newEndDateStr + ' ' + timePart;
          } else {
            item.jiezhishijian = newEndDateStr;
          }
          
          item.paichanEndTime = item.jiezhishijian;
        }
      }
    }
    
    adjustedList.push(item);
  }
  
  console.log('调整后的订单列表:', adjustedList);
  return adjustedList;
},

// 修改 calculatePaichan 函数，添加插单调整逻辑
calculatePaichan: function() {
  const _this = this;
  
  if (this.data.isCalculating) return;
  
  this.setData({ isCalculating: true });
  
  console.log('=== 开始排产计算（包含插单调整）===');
  
  // 1. 首先获取原始列表
  const originalList = this.data.list;
  
  // 2. 应用插单逻辑调整日期
  const adjustedList = this.adjustPaichanDates(originalList);
  
  // 3. 使用调整后的列表进行排产计算
  // 检查工作时间配置是否已加载
  if (this.data.timeList.length === 0) {
    console.log('工作时间配置为空，尝试重新加载');
    this.getTimeList().then(() => {
      // 继续排产计算
      _this.continuePaichanCalculation(adjustedList);
    }).catch(err => {
      console.error('加载工作时间配置失败:', err);
      wx.showToast({
        title: '工作时间配置加载失败',
        icon: 'none'
      });
      _this.setData({ isCalculating: false });
    });
  } else {
    _this.continuePaichanCalculation(adjustedList);
  }
},

// 修改 continuePaichanCalculation 函数，接收参数
continuePaichanCalculation: function(workList) {
  const _this = this;
  
  // 先获取所有工作数据
  _this.getAllWorkList().then(allWorkList => {
    console.log('获取到的工作数据数量:', allWorkList.length);
    
    if (allWorkList.length === 0) {
      _this.setData({ 
        paichanResult: [],
        isCalculating: false 
      });
      wx.showToast({
        title: '没有工作数据',
        icon: 'none'
      });
      return;
    }
    
    // 根据传入的 workList 调整工作数据
    const adjustedWorkList = this.adjustWorkDataWithInsertLogic(allWorkList, workList);
    
    // 使用调整后的工作数据
    _this.performCompletePaichanCalculation(adjustedWorkList);
    
  }).catch(err => {
    console.error('获取工作数据失败:', err);
    _this.setData({ isCalculating: false });
    wx.showToast({
      title: '获取数据失败',
      icon: 'none'
    });
  });
},

// 新增：根据调整后的排产列表调整工作数据
adjustWorkDataWithInsertLogic: function(allWorkList, adjustedWorkList) {
  const _this = this;
  const adjustedMap = {};
  
  // 创建调整后列表的映射，方便查找
  adjustedWorkList.forEach(item => {
    adjustedMap[item.order_id] = {
      work_start_date: item.work_start_date,
      jiezhishijian: item.jiezhishijian,
      paichanEndTime: item.paichanEndTime
    };
  });
  
  // 调整工作数据中的日期
  return allWorkList.map(work => {
    const adjustedInfo = adjustedMap[work.order_id];
    if (adjustedInfo) {
      return {
        ...work,
        work_start_date: adjustedInfo.work_start_date,
        jiezhishijian: adjustedInfo.jiezhishijian || adjustedInfo.paichanEndTime
      };
    }
    return work;
  });
},

// 在新增排产项时也需要考虑插单逻辑
addItem: function() {
  const _this = this;
  const newItem = this.data.newItem;
  const order = this.data.orderList[newItem.orderIndex];
  
  // 验证
  if (!order) {
    wx.showToast({
      title: '请选择订单',
      icon: 'none'
    });
    return;
  }
  
  if (!newItem.work_num || newItem.work_num <= 0) {
    wx.showToast({
      title: '请填写排产数量',
      icon: 'none'
    });
    return;
  }
  
  if (parseInt(newItem.work_num) > this.data.selectedOrderNum) {
    wx.showToast({
      title: `排产数量不能超过${this.data.selectedOrderNum}`,
      icon: 'none'
    });
    return;
  }
  
  if (!newItem.work_start_date) {
    wx.showToast({
      title: '请选择开始日期',
      icon: 'none'
    });
    return;
  }
  
  // 检查是否插入订单
  const isInsert = newItem.insertIndex === 1;
  
  // 如果是插入订单，需要检查与其他订单的时间冲突
  if (isInsert) {
    const insertStartDate = this.safeParseDate(newItem.work_start_date);
    const insertEndDate = this.safeParseDate(this.data.deadlineDate);
    
    if (!insertStartDate || !insertEndDate) {
      wx.showToast({
        title: '插入订单需要完整的开始和截止日期',
        icon: 'none'
      });
      return;
    }
    
    // 检查是否有订单的排产时间与插入订单冲突
    const conflictingOrders = this.data.list.filter(item => {
      if (item.is_insert == 1) return false; // 跳过其他插入订单
      
      const itemStartDate = this.safeParseDate(item.work_start_date);
      const itemEndDate = this.safeParseDate(item.jiezhishijian || item.paichanEndTime);
      
      if (!itemStartDate || !itemEndDate) return false;
      
      // 检查时间是否重叠
      return !(insertEndDate < itemStartDate || insertStartDate > itemEndDate);
    });
    
    if (conflictingOrders.length > 0) {
      wx.showModal({
        title: '插入订单时间冲突',
        content: `插入订单时间与 ${conflictingOrders.length} 个现有订单冲突。\n继续添加将调整这些订单的排产时间。`,
        success: (res) => {
          if (res.confirm) {
            _this.saveNewItem();
          }
        }
      });
      return;
    }
  }
  
  _this.saveNewItem();
},

// 保存新项目的独立函数
saveNewItem: function() {
  const _this = this;
  const newItem = this.data.newItem;
  const order = this.data.orderList[newItem.orderIndex];
  
  // 获取当前最大row_num
  const getMaxRowNumSQL = `SELECT ISNULL(MAX(row_num), 0) as max_row_num 
                           FROM work_detail 
                           WHERE company = '${app.globalData.gongsi}'`;
  
  wx.showLoading({ title: '保存中...' });
  
  // 先获取最大行号
  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: {
      query: getMaxRowNumSQL
    },
    success: maxRes => {
      let maxRowNum = 0;
      if (maxRes.result && maxRes.result.recordset && maxRes.result.recordset.length > 0) {
        maxRowNum = maxRes.result.recordset[0].max_row_num || 0;
      }
      
      const rowNum = maxRowNum + 1;
      
      const workDetail = {
        order_id: order.id,
        work_num: parseInt(newItem.work_num),
        work_start_date: newItem.work_start_date + ':00',
        type: newItem.typeIndex === 1 ? 'urgent' : 'normal',
        is_insert: newItem.insertIndex,
        jiezhishijian: _this.data.deadlineDate ? _this.data.deadlineDate + ':00' : null,
        row_num: rowNum,
        company: app.globalData.gongsi
      };

      const insertSQL = `INSERT INTO work_detail 
                         (order_id, work_num, work_start_date, type, is_insert, jiezhishijian, row_num, company)
                         VALUES 
                         (${workDetail.order_id}, ${workDetail.work_num}, 
                          '${workDetail.work_start_date}', '${workDetail.type}', 
                          ${workDetail.is_insert}, ${workDetail.jiezhishijian ? `'${workDetail.jiezhishijian}'` : 'NULL'}, 
                          ${workDetail.row_num}, '${workDetail.company}');
                         SELECT SCOPE_IDENTITY() as new_id;`;

      wx.cloud.callFunction({
        name: 'sqlServer_PC',
        data: {
          query: insertSQL
        },
        success: res => {
          wx.hideLoading();
          console.log('新增结果:', res);
          wx.showToast({
            title: '新增成功',
            icon: 'success'
          });
          _this.closeAddDialog();
          
          // 重新加载数据
          setTimeout(() => {
            _this.getList();
            // 重新计算排产（包含插单调整逻辑）
            _this.calculatePaichan();
          }, 500);
        },
        fail: err => {
          wx.hideLoading();
          console.error('新增失败:', err);
          wx.showToast({
            title: '新增失败',
            icon: 'none'
          });
        }
      });
    },
    fail: err => {
      wx.hideLoading();
      console.error('获取最大行号失败:', err);
      wx.showToast({
        title: '获取行号失败',
        icon: 'none'
      });
    }
  });
},

// 在删除后也需要重新计算
confirmDelete: function() {
  const _this = this;
  const id = this.data.deleteId;
  
  if (!id) return;
  
  wx.showLoading({ title: '删除中...' });
  
  const sql = `DELETE FROM work_detail WHERE id = ${id}`;
  
  wx.cloud.callFunction({
    name: 'sqlServer_PC',
    data: {
      query: sql
    },
    success: res => {
      wx.hideLoading();
      console.log('删除结果:', res);
      
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      });
      
      _this.closeDeleteConfirm();
      
      // 重新加载数据
      setTimeout(() => {
        _this.getList();
        // 重新计算排产（包含插单调整逻辑）
        _this.calculatePaichan();
      }, 500);
    },
    fail: err => {
      wx.hideLoading();
      console.error('删除失败:', err);
      wx.showToast({
        title: '删除失败',
        icon: 'none'
      });
    }
  });
},

// 新增：重算按钮点击事件（调用插单调整逻辑）
recalculateWithInsertLogic: function() {
  this.calculatePaichan();
},
// 新增：计算实际结束时间（考虑工作时间段）
calculateActualEndTime: function(startTime, requiredHours) {
  const workTimeResult = this.calculateWorkTime(startTime, requiredHours);
  return workTimeResult.actualEndTime;
}
});