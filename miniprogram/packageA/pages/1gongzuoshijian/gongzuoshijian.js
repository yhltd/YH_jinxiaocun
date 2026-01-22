var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 日历相关
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    currentDay: new Date().getDate(),
    calendarDays: [],
    selectedDates: [], // 多选日期
    selectedDate: '',  // 单选日期

       // 时间编辑相关
  showTimeEditModal: false,
  timeEditData: null, // 当前编辑的时间数据
  timeEditField: '',  // 编辑的字段类型：gongzuoshijian或wuxiushijian
  timeEditStart: '',  // 编辑开始时间
  timeEditEnd: '',    // 编辑结束时间
  
  // 时间选择器数据（用于编辑）
  editTimeRanges: [
    ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
  ],
  editTimeIndex: [0, 8], // 默认 08:00-17:00
    
    // 时间安排相关
    timeRanges: [
      ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
      ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
    ],
    timeIndex: [0, 8], // 默认 08:00-17:00
    breakStart: '12:00',
    breakEnd: '13:00',
    startTime: '08:00',
    endTime: '17:00',
    
    // 重复选项
    repeatOptions: [
      { value: 'none', label: '不重复' },
      { value: 'daily', label: '每天' },
      { value: 'weekly', label: '每周' },
      { value: 'monthly', label: '每月' },
      { value: 'weekdays', label: '工作日（周一至周五）' },
      { value: 'custom', label: '自定义' }
    ],
    selectedRepeat: 'none',
    repeatEndDate: '',

    // 日历编辑弹窗相关数据
    showCalendarEditModal: false,
    editScheduleData: null, // 当前编辑的工作安排数据
    editCalendarDays: [],   // 弹窗中的日历数据
    editSelectedDates: [],  // 弹窗中选中的日期
    editCalendarYear: new Date().getFullYear(),
    editCalendarMonth: new Date().getMonth() + 1,
    editOriginalDates: [],  // 原始日期，用于比较

    // 日期范围选择相关数据
    showDateRangeModal: false,
    rangeStartDate: '',  // 格式：YYYY-MM-DD
    rangeEndDate: '',    // 格式：YYYY-MM-DD
    filterOption: 'all', // 筛选选项
    filteredDates: [],   // 筛选后的日期数组
    
    // 工作安排列表
    scheduleList: [],
    scheduleTitle: '',
    scheduleRemarks: '',
    isAllDay: false,
    showTimePicker: false,
    
    // 页面控制
    companyName: "",
    page: 1,
    maxpagenumber: 1,
    IsLastPage: false,
    showEditModal: false,
    editData: {},
    editField: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      companyName: options.companyName || 'default'
    });
    
    wx.setNavigationBarTitle({
      title: '工作安排日历'
    });
    
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1890ff',
    });

    // 初始化日期范围
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    this.setData({
      rangeStartDate: this.formatDate(today),
      rangeEndDate: this.formatDate(nextMonth)
    });
    
    // 生成当月日历
    this.generateCalendar(this.data.currentYear, this.data.currentMonth);
    
    // 加载工作安排数据
    this.loadSchedules();
  },

  /**
   * 生成日历
   */
  generateCalendar: function(year, month) {
    const days = [];
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayWeek = firstDay.getDay() || 7; // 周一到周日 1-7
    
    // 添加上个月的最后几天
    const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
    for (let i = firstDayWeek - 1; i > 0; i--) {
      const date = new Date(year, month - 2, prevMonthLastDay - i + 1);
      const dateStr = this.formatDate(date);
      
      days.push({
        date: date,
        day: date.getDate(),
        month: month - 1,
        year: date.getFullYear(),
        isCurrentMonth: false,
        isToday: false,
        hasSchedule: false,
        dateStr: dateStr
      });
    }
    
    // 添加当前月
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month - 1, i);
      const dateStr = this.formatDate(date);
      
      // 检查是否有工作安排
      const hasSchedule = this.checkHasSchedule(dateStr);
      
      days.push({
        date: date,
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        hasSchedule: hasSchedule.has,
        scheduleCount: hasSchedule.count,
        dateStr: dateStr
      });
    }
    
    // 添加下个月的前几天
    const totalCells = 42; // 6行×7列
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month, i);
      const dateStr = this.formatDate(date);
      
      days.push({
        date: date,
        day: i,
        month: month + 1,
        year: date.getFullYear(),
        isCurrentMonth: false,
        isToday: false,
        hasSchedule: false,
        dateStr: dateStr
      });
    }
    
    this.setData({
      calendarDays: days,
      currentYear: year,
      currentMonth: month
    });
  },

  /**
   * 检查日期是否有工作安排
   */
  checkHasSchedule: function(dateStr) {
    const schedules = this.data.scheduleList;
    let hasSchedule = false;
    let count = 0;
    
    schedules.forEach(schedule => {
      if (schedule.work_days && Array.isArray(schedule.work_days) && schedule.work_days.includes(dateStr)) {
        hasSchedule = true;
        count++;
      }
    });
    
    return { has: hasSchedule, count: count };
  },

  /**
   * 选择日期
   */
  selectDate: function(e) {
    const dateStr = e.currentTarget.dataset.datestr;
    const index = e.currentTarget.dataset.index;
    const days = this.data.calendarDays;
    
    // 切换选中状态
    days[index].isSelected = !days[index].isSelected;
    
    // 更新选中日期数组
    let selectedDates = this.data.selectedDates;
    if (days[index].isSelected) {
      selectedDates.push(dateStr);
    } else {
      selectedDates = selectedDates.filter(date => date !== dateStr);
    }
    
    this.setData({
      calendarDays: days,
      selectedDates: selectedDates,
      selectedDate: dateStr
    });
    
    // 如果有选中日期，显示时间设置面板
    if (selectedDates.length > 0 && !this.data.showTimePicker) {
      this.setData({
        showTimePicker: true
      });
    }
  },

  /**
   * 上个月
   */
  prevMonth: function() {
    let year = this.data.currentYear;
    let month = this.data.currentMonth - 1;
    
    if (month < 1) {
      year -= 1;
      month = 12;
    }
    
    this.generateCalendar(year, month);
  },

  /**
   * 下个月
   */
  nextMonth: function() {
    let year = this.data.currentYear;
    let month = this.data.currentMonth + 1;
    
    if (month > 12) {
      year += 1;
      month = 1;
    }
    
    this.generateCalendar(year, month);
  },

  /**
   * 时间选择变化
   */
  onTimeChange: function(e) {
    const value = e.detail.value;
    const startTime = this.data.timeRanges[0][value[0]];
    const endTime = this.data.timeRanges[1][value[1]];
    
    this.setData({
      timeIndex: value,
      startTime: startTime,
      endTime: endTime
    });
  },

  /**
   * 午休时间变化
   */
  onBreakChange: function(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    
    this.setData({
      [field]: value
    });
  },

  /**
   * 保存工作安排
   */
  saveSchedule: function() {
    console.log("进入保存工作时间界面")
    const _this = this;
    
    // 验证数据
    if (_this.data.selectedDates.length === 0) {
        wx.showToast({
            title: '请选择日期',
            icon: 'none'
        });
        return;
    }
    
    if (!_this.data.scheduleTitle) {
        wx.showToast({
            title: '请输入排班标题',
            icon: 'none'
        });
        return;
    }
    
    // 获取年月（从第一个选中日期）
    const firstDate = _this.data.selectedDates[0];
    const dateObj = new Date(firstDate);
    const yearMonth = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
    const riqi = firstDate;
    
    // 准备插入数据
    const scheduleData = {
        gongzuoshijianks: _this.data.startTime,
        gongzuoshijianjs: _this.data.endTime,
        wuxiushijianks: _this.data.breakStart,
        wuxiushijianjs: _this.data.breakEnd,
        year_month: yearMonth,
        riqi: riqi,
        gongsi: _this.data.companyName,
        work_days: JSON.stringify(_this.data.selectedDates),
        repeat_type: _this.data.selectedRepeat,
        repeat_end_date: _this.data.repeatEndDate || null,
        schedule_title: _this.data.scheduleTitle,
        schedule_color: '#1890ff',
        is_all_day: _this.data.isAllDay ? 1 : 0,
        remarks: _this.data.scheduleRemarks || '',
        schedule_status: 'active'
    };

    console.log("收集数据保存", scheduleData);
    
    wx.showLoading({
        title: '保存中...',
    });

    const repeatEndDateSQL = scheduleData.repeat_end_date ? 
        `'${scheduleData.repeat_end_date}'` : 'NULL';

    // 插入数据
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "INSERT INTO gongzi_gongzuoshijian (gongzuoshijianks, gongzuoshijianjs, wuxiushijianks, wuxiushijianjs, year_month, riqi, gongsi, work_days, repeat_type, repeat_end_date, schedule_title, schedule_status) VALUES ('" + 
            (scheduleData.gongzuoshijianks || '') + "', '" + 
            (scheduleData.gongzuoshijianjs || '') + "', '" + 
            (scheduleData.wuxiushijianks || '') + "', '" + 
            (scheduleData.wuxiushijianjs || '') + "', '" + 
            (scheduleData.year_month || '') + "', '" + 
            (scheduleData.riqi || '') + "', '" + 
            (scheduleData.gongsi || '') + "', '" + 
            (scheduleData.work_days || '[]') + "', '" + 
            (scheduleData.repeat_type || 'none') + "', " + 
            repeatEndDateSQL + ", '" + 
            (scheduleData.schedule_title || '') + "', '" + 
            (scheduleData.schedule_status || 'active') + "')"
      },
      success: res => {
          wx.hideLoading();
          if (res.result && res.result.rowsAffected && res.result.rowsAffected[0] > 0) {
              wx.showToast({
                  title: '保存成功',
                  icon: 'success'
              });
              
              // 重置表单
              _this.resetForm();
              
              // 重新加载数据
              _this.loadSchedules();
          } else {
              wx.showToast({
                  title: '保存失败：无数据插入',
                  icon: 'none'
              });
          }
      },
      fail: res => {
        wx.hideLoading();
        console.error('保存失败完整信息:', JSON.stringify(res, null, 2));
        wx.showToast({
            title: `保存失败: ${res.errMsg || '数据库错误'}`,
            icon: 'none',
            duration: 3000
        });
      }
    });
  },

  /**
   * 加载工作安排
   */
  loadSchedules: function() {
    console.log("调用工作安排内容")
    const _this = this;
    const company = _this.data.companyName;
    
    wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
            query: `SELECT * FROM gongzi_gongzuoshijian 
                    WHERE gongsi = '${company}' 
                    AND schedule_status = 'active'
                    ORDER BY id DESC`
        },
        success: res => {
          console.log("工作安排返回结果",res.result.recordset)
          console.log("查询语句",`SELECT * FROM gongzi_gongzuoshijian 
          WHERE gongsi = '${company}' 
          AND schedule_status = 'active'
          ORDER BY id DESC`)
            if (res.result && res.result.recordset) {
                // 解析work_days字段
                const schedules = res.result.recordset.map(schedule => {
                    try {
                        if (schedule.work_days && schedule.work_days !== '') {
                            schedule.work_days = JSON.parse(schedule.work_days);
                        } else {
                            schedule.work_days = [];
                        }
                    } catch (e) {
                        console.error('解析work_days失败:', e);
                        schedule.work_days = [];
                    }
                    return schedule;
                });
                
                _this.setData({
                    scheduleList: schedules
                });
                
                // 重新生成日历以显示工作安排
                _this.generateCalendar(_this.data.currentYear, _this.data.currentMonth);
            }
        },
        fail: res => {
            console.error('加载工作安排失败:', res);
        }
    });
  },

  /**
   * 删除工作安排
   */
  deleteSchedule: function(e) {
    const _this = this;
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
        title: '确认删除',
        content: '确定要删除这个工作安排吗？',
        success: function(res) {
            if (res.confirm) {
                wx.cloud.callFunction({
                    name: 'sqlServer_117',
                    data: {
                        query: `DELETE FROM gongzi_gongzuoshijian WHERE id = ${id}`
                    },
                    success: res => {
                        wx.showToast({
                            title: '删除成功',
                            icon: 'success'
                        });
                        _this.loadSchedules();
                    },
                    fail: res => {
                        wx.showToast({
                            title: '删除失败',
                            icon: 'none'
                        });
                    }
                });
            }
        }
    });
  },

  /**
   * 编辑工作安排（日历弹窗）
   */
  editSchedule: function(e) {
    const schedule = e.currentTarget.dataset.schedule;
    const field = e.currentTarget.dataset.field;
    
    // 如果编辑的是work_days字段，显示日历弹窗
    if (field === 'work_days') {
      const workDays = Array.isArray(schedule.work_days) ? schedule.work_days : [];
      
      // 设置编辑数据
      this.setData({
        editScheduleData: schedule,
        editSelectedDates: [...workDays], // 深拷贝
        editOriginalDates: [...workDays], // 保存原始数据用于比较
        editCalendarYear: new Date().getFullYear(),
        editCalendarMonth: new Date().getMonth() + 1,
        showCalendarEditModal: true
      });
      
      // 生成弹窗中的日历
      this.generateEditCalendar(this.data.editCalendarYear, this.data.editCalendarMonth);
      
    } 
    // 如果编辑的是工作时间
    else if (field === 'gongzuoshijian') {
      this.setData({
        showTimeEditModal: true,
        timeEditData: schedule,
        timeEditField: 'gongzuoshijian',
        timeEditStart: schedule.gongzuoshijianks,
        timeEditEnd: schedule.gongzuoshijianjs
      });
      
      // 计算时间选择器的索引
      this.calculateEditTimeIndex(schedule.gongzuoshijianks, schedule.gongzuoshijianjs);
    }
    // 如果编辑的是午休时间
    else if (field === 'wuxiushijian') {
      this.setData({
        showTimeEditModal: true,
        timeEditData: schedule,
        timeEditField: 'wuxiushijian',
        timeEditStart: schedule.wuxiushijianks,
        timeEditEnd: schedule.wuxiushijianjs
      });
    }
    // 其他字段使用原来的编辑方式
    else {
      this.setData({
        showEditModal: true,
        editData: schedule,
        editField: field || 'schedule_title'
      });
    }
  },

  /**
 * 计算时间选择器的索引
 */
calculateEditTimeIndex: function(startTime, endTime) {
  const { editTimeRanges } = this.data;
  
  let startIndex = 0;
  let endIndex = 8; // 默认值
  
  // 查找开始时间的索引
  for (let i = 0; i < editTimeRanges[0].length; i++) {
    if (editTimeRanges[0][i] === startTime) {
      startIndex = i;
      break;
    }
  }
  
  // 查找结束时间的索引
  for (let i = 0; i < editTimeRanges[1].length; i++) {
    if (editTimeRanges[1][i] === endTime) {
      endIndex = i;
      break;
    }
  }
  
  this.setData({
    editTimeIndex: [startIndex, endIndex]
  });
},

/**
 * 编辑弹窗时间选择变化（用于工作时间编辑）
 */
onEditTimeChange: function(e) {
  const value = e.detail.value;
  const startTime = this.data.editTimeRanges[0][value[0]];
  const endTime = this.data.editTimeRanges[1][value[1]];
  
  this.setData({
    editTimeIndex: value,
    timeEditStart: startTime,
    timeEditEnd: endTime
  });
},

/**
 * 编辑弹窗午休时间变化
 */
onEditBreakChange: function(e) {
  const field = e.currentTarget.dataset.field;
  const value = e.detail.value;
  
  const newField = field === 'breakStart' ? 'timeEditStart' : 'timeEditEnd';
  this.setData({
    [newField]: value
  });
},

/**
 * 保存时间编辑
 */
saveTimeEdit: function() {
  const _this = this;
  const { timeEditData, timeEditField, timeEditStart, timeEditEnd } = this.data;
  
  if (!timeEditStart || !timeEditEnd) {
    wx.showToast({
      title: '请选择完整的时间范围',
      icon: 'none'
    });
    return;
  }
  
  // 验证时间合理性
  if (this.compareTime(timeEditStart, timeEditEnd) >= 0) {
    wx.showToast({
      title: '开始时间必须早于结束时间',
      icon: 'none'
    });
    return;
  }
  
  wx.showLoading({
    title: '保存中...',
  });
  
  let fieldName = '';
  let fieldValue = '';
  
  if (timeEditField === 'gongzuoshijian') {
    // 更新工作时间
    fieldName = 'gongzuoshijianks = ?, gongzuoshijianjs = ?';
    fieldValue = `${timeEditStart}', '${timeEditEnd}`;
    
    const query = `UPDATE gongzi_gongzuoshijian 
                   SET gongzuoshijianks = '${timeEditStart}', 
                       gongzuoshijianjs = '${timeEditEnd}'
                   WHERE id = ${timeEditData.id}`;
    
    this.executeTimeUpdate(query, timeEditData, 'gongzuoshijianks', 'gongzuoshijianjs', timeEditStart, timeEditEnd);
    
  } else if (timeEditField === 'wuxiushijian') {
    // 更新午休时间
    const query = `UPDATE gongzi_gongzuoshijian 
                   SET wuxiushijianks = '${timeEditStart}', 
                       wuxiushijianjs = '${timeEditEnd}'
                   WHERE id = ${timeEditData.id}`;
    
    this.executeTimeUpdate(query, timeEditData, 'wuxiushijianks', 'wuxiushijianjs', timeEditStart, timeEditEnd);
  }
},

/**
 * 执行时间更新
 */
executeTimeUpdate: function(query, scheduleData, startField, endField, newStart, newEnd) {
  const _this = this;
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: {
      query: query
    },
    success: res => {
      wx.hideLoading();
      if (res.result && res.result.rowsAffected && res.result.rowsAffected[0] > 0) {
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        });
        
        // 更新本地数据
        const updatedSchedule = {
          ...scheduleData,
          [startField]: newStart,
          [endField]: newEnd
        };
        
        // 更新scheduleList
        const scheduleList = _this.data.scheduleList.map(schedule => 
          schedule.id === scheduleData.id ? updatedSchedule : schedule
        );
        
        _this.setData({
          scheduleList: scheduleList
        });
        
        // 重新生成日历以更新显示
        _this.generateCalendar(_this.data.currentYear, _this.data.currentMonth);
        
        // 关闭弹窗
        _this.hideTimeEditModal();
      } else {
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
      }
    },
    fail: res => {
      wx.hideLoading();
      wx.showToast({
        title: '保存失败',
        icon: 'none'
      });
      console.error('保存失败:', res);
    }
  });
},

/**
 * 隐藏时间编辑弹窗
 */
hideTimeEditModal: function() {
  this.setData({
    showTimeEditModal: false,
    timeEditData: null,
    timeEditField: '',
    timeEditStart: '',
    timeEditEnd: ''
  });
},

/**
 * 比较两个时间字符串（HH:mm格式）
 * @return {number} -1: time1 < time2, 0: time1 = time2, 1: time1 > time2
 */
compareTime: function(time1, time2) {
  const [h1, m1] = time1.split(':').map(Number);
  const [h2, m2] = time2.split(':').map(Number);
  
  if (h1 < h2) return -1;
  if (h1 > h2) return 1;
  if (m1 < m2) return -1;
  if (m1 > m2) return 1;
  return 0;
},

  /**
   * 生成编辑弹窗中的日历
   */
  generateEditCalendar: function(year, month) {
    const days = [];
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayWeek = firstDay.getDay() || 7; // 周一到周日 1-7
    
    // 获取编辑中选中的日期
    const editSelectedDates = this.data.editSelectedDates || [];
    
    // 添加上个月的最后几天
    const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
    for (let i = firstDayWeek - 1; i > 0; i--) {
      const date = new Date(year, month - 2, prevMonthLastDay - i + 1);
      const dateStr = this.formatDate(date);
      const isSelected = editSelectedDates.includes(dateStr);
      
      days.push({
        date: date,
        day: date.getDate(),
        month: month - 1,
        year: date.getFullYear(),
        isCurrentMonth: false,
        isToday: false,
        isSelected: isSelected,
        dateStr: dateStr
      });
    }
    
    // 添加当前月
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month - 1, i);
      const dateStr = this.formatDate(date);
      const isSelected = editSelectedDates.includes(dateStr);
      
      days.push({
        date: date,
        day: i,
        month: month,
        year: year,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: isSelected,
        dateStr: dateStr
      });
    }
    
    // 添加下个月的前几天
    const totalCells = 42; // 6行×7列
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month, i);
      const dateStr = this.formatDate(date);
      const isSelected = editSelectedDates.includes(dateStr);
      
      days.push({
        date: date,
        day: i,
        month: month + 1,
        year: date.getFullYear(),
        isCurrentMonth: false,
        isToday: false,
        isSelected: isSelected,
        dateStr: dateStr
      });
    }
    
    this.setData({
      editCalendarDays: days,
      editCalendarYear: year,
      editCalendarMonth: month
    });
  },

  /**
   * 在编辑弹窗中选择日期
   */
  selectEditDate: function(e) {
    const dateStr = e.currentTarget.dataset.datestr;
    const index = e.currentTarget.dataset.index;
    const days = this.data.editCalendarDays;
    
    // 切换选中状态
    days[index].isSelected = !days[index].isSelected;
    
    // 更新选中日期数组
    let editSelectedDates = this.data.editSelectedDates;
    if (days[index].isSelected) {
      editSelectedDates.push(dateStr);
    } else {
      editSelectedDates = editSelectedDates.filter(date => date !== dateStr);
    }
    
    // 去重
    editSelectedDates = [...new Set(editSelectedDates)];
    
    this.setData({
      editCalendarDays: days,
      editSelectedDates: editSelectedDates
    });
  },

  /**
   * 编辑弹窗上个月
   */
  prevEditMonth: function() {
    let year = this.data.editCalendarYear;
    let month = this.data.editCalendarMonth - 1;
    
    if (month < 1) {
      year -= 1;
      month = 12;
    }
    
    this.generateEditCalendar(year, month);
  },

  /**
   * 编辑弹窗下个月
   */
  nextEditMonth: function() {
    let year = this.data.editCalendarYear;
    let month = this.data.editCalendarMonth + 1;
    
    if (month > 12) {
      year += 1;
      month = 1;
    }
    
    this.generateEditCalendar(year, month);
  },

  /**
   * 保存编辑日历的修改
   */
  saveCalendarEdit: function() {
    const _this = this;
    const { editScheduleData, editSelectedDates, editOriginalDates } = this.data;
    
    // 检查是否有修改
    const originalSet = new Set(editOriginalDates);
    const newSet = new Set(editSelectedDates);
    
    let hasChanged = false;
    if (originalSet.size !== newSet.size) {
      hasChanged = true;
    } else {
      for (const date of originalSet) {
        if (!newSet.has(date)) {
          hasChanged = true;
          break;
        }
      }
    }
    
    if (!hasChanged) {
      wx.showToast({
        title: '没有修改',
        icon: 'none'
      });
      this.hideCalendarEditModal();
      return;
    }
    
    wx.showLoading({
      title: '保存中...',
    });
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: `UPDATE gongzi_gongzuoshijian 
                SET work_days = '${JSON.stringify(editSelectedDates).replace(/'/g, "''")}'
                WHERE id = ${editScheduleData.id}`
      },
      success: res => {
        wx.hideLoading();
        if (res.result && res.result.rowsAffected && res.result.rowsAffected[0] > 0) {
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          });
          
          // 更新本地数据
          const updatedSchedule = {
            ...editScheduleData,
            work_days: editSelectedDates
          };
          
          // 更新scheduleList
          const scheduleList = _this.data.scheduleList.map(schedule => 
            schedule.id === editScheduleData.id ? updatedSchedule : schedule
          );
          
          _this.setData({
            scheduleList: scheduleList
          });
          
          // 重新生成主日历以更新显示
          _this.generateCalendar(_this.data.currentYear, _this.data.currentMonth);
          
          // 关闭弹窗
          _this.hideCalendarEditModal();
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          });
        }
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        });
        console.error('保存失败:', res);
      }
    });
  },

  /**
   * 隐藏日历编辑弹窗
   */
  hideCalendarEditModal: function() {
    this.setData({
      showCalendarEditModal: false,
      editScheduleData: null,
      editCalendarDays: [],
      editSelectedDates: [],
      editOriginalDates: [],
      editCalendarYear: new Date().getFullYear(),
      editCalendarMonth: new Date().getMonth() + 1
    });
  },

  /**
   * 在编辑日历弹窗中快速选择所有日期
   */
  selectAllInEditCalendar: function() {
    const { editCalendarDays } = this.data;
    const selectedDates = [];
    
    editCalendarDays.forEach(day => {
      if (day.isCurrentMonth) {
        selectedDates.push(day.dateStr);
      }
    });
    
    // 更新日历显示状态
    const updatedDays = editCalendarDays.map(day => ({
      ...day,
      isSelected: day.isCurrentMonth ? true : day.isSelected
    }));
    
    this.setData({
      editCalendarDays: updatedDays,
      editSelectedDates: [...new Set([...this.data.editSelectedDates, ...selectedDates])]
    });
  },

  /**
   * 在编辑日历弹窗中清空所有选择
   */
  clearAllInEditCalendar: function() {
    const { editCalendarDays } = this.data;
    
    const updatedDays = editCalendarDays.map(day => ({
      ...day,
      isSelected: false
    }));
    
    this.setData({
      editCalendarDays: updatedDays,
      editSelectedDates: []
    });
  },

  /**
   * 显示日期范围选择弹窗
   */
  showDateRangeModal: function() {
    const today = new Date();
    const defaultEnd = new Date();
    defaultEnd.setMonth(defaultEnd.getMonth() + 1);
    
    this.setData({
      showDateRangeModal: true,
      rangeStartDate: this.formatDate(today),
      rangeEndDate: this.formatDate(defaultEnd),
      filterOption: 'all'
    });
    
    // 默认计算一次日期范围
    this.calculateDateRange();
  },

  /**
   * 隐藏日期范围选择弹窗
   */
  hideDateRangeModal: function() {
    this.setData({
      showDateRangeModal: false
    });
  },

  /**
   * 起始日期变化
   */
  onRangeStartChange: function(e) {
    this.setData({
      rangeStartDate: e.detail.value
    });
    this.calculateDateRange();
  },

  /**
   * 截止日期变化
   */
  onRangeEndChange: function(e) {
    this.setData({
      rangeEndDate: e.detail.value
    });
    this.calculateDateRange();
  },

  /**
   * 筛选选项变化
   */
  onFilterOptionChange: function(e) {
    this.setData({
      filterOption: e.detail.value
    });
    this.calculateDateRange();
  },

  /**
   * 计算日期范围
   */
  calculateDateRange: function() {
    const { rangeStartDate, rangeEndDate, filterOption } = this.data;
    
    if (!rangeStartDate || !rangeEndDate) return;
    
    const start = new Date(rangeStartDate);
    const end = new Date(rangeEndDate);
    
    if (start > end) {
      wx.showToast({
        title: '起始日期不能晚于截止日期',
        icon: 'none'
      });
      return;
    }
    
    // 生成日期范围
    let dates = [];
    let current = new Date(start);
    
    while (current <= end) {
      const dateStr = this.formatDate(current);
      const dayOfWeek = current.getDay(); // 0-周日, 1-周一, ..., 6-周六
      
      // 根据筛选选项过滤
      let shouldInclude = true;
      
      switch (filterOption) {
        case 'excludeSat':
          shouldInclude = dayOfWeek !== 6; // 排除周六
          break;
        case 'excludeSun':
          shouldInclude = dayOfWeek !== 0; // 排除周日
          break;
        case 'weekends':
          shouldInclude = dayOfWeek === 0 || dayOfWeek === 6; // 仅双休日
          break;
        case 'weekdays':
          shouldInclude = dayOfWeek >= 1 && dayOfWeek <= 5; // 仅工作日
          break;
        case 'all':
        default:
          shouldInclude = true;
          break;
      }
      
      if (shouldInclude) {
        dates.push(dateStr);
      }
      
      current.setDate(current.getDate() + 1);
    }
    
    this.setData({
      filteredDates: dates
    });
  },

  /**
   * 应用日期范围选择
   */
  applyDateRange: function() {
    const { filteredDates } = this.data;
    
    if (filteredDates.length === 0) {
      wx.showToast({
        title: '请选择有效日期范围',
        icon: 'none'
      });
      return;
    }
    
    // 更新选中日期
    this.setData({
      selectedDates: filteredDates,
      showDateRangeModal: false
    });
    
    // 更新日历网格的选中状态
    this.updateCalendarSelection();
    
    // 显示时间设置面板
    if (filteredDates.length > 0) {
      this.setData({
        showTimePicker: true
      });
    }
    
    wx.showToast({
      title: `已选择${filteredDates.length}天`,
      icon: 'success'
    });
  },

  /**
   * 更新日历网格的选中状态
   */
  updateCalendarSelection: function() {
    const { selectedDates, calendarDays } = this.data;
    
    const updatedDays = calendarDays.map(day => {
      const newDay = {...day};
      if (selectedDates.includes(day.dateStr)) {
        newDay.isSelected = true;
      }
      return newDay;
    });
    
    this.setData({
      calendarDays: updatedDays
    });
  },

  /**
   * 保存编辑
   */
  saveEdit: function(e) {
    const _this = this;
    const value = e.detail.value.value;
    const field = _this.data.editField;
    const id = _this.data.editData.id;
    
    wx.cloud.callFunction({
        name: 'sqlServer_117',
        data: {
            query: `UPDATE gongzi_gongzuoshijian 
                    SET ${field} = '${value.replace(/'/g, "''")}'
                    WHERE id = ${id}`
        },
        success: res => {
            wx.showToast({
                title: '修改成功',
                icon: 'success'
            });
            _this.hideEditModal();
            _this.loadSchedules();
        },
        fail: res => {
            wx.showToast({
                title: '修改失败',
                icon: 'none'
            });
        }
    });
  },

  /**
   * 隐藏编辑弹窗
   */
  hideEditModal: function() {
    this.setData({
      showEditModal: false,
      editData: {},
      editField: ''
    });
  },

  /**
   * 切换时间设置面板
   */
  toggleTimePicker: function() {
    this.setData({
      showTimePicker: !this.data.showTimePicker
    });
  },

  onScheduleTitleInput: function(e) {
    this.setData({
      scheduleTitle: e.detail.value
    });
  },

  onRemarksInput: function(e) {
    this.setData({
      scheduleRemarks: e.detail.value
    });
  },

  /**
   * 重置表单
   */
  resetForm: function() {
    this.setData({
      selectedDates: [],
      scheduleTitle: '',
      startTime: '08:00',
      endTime: '17:00',
      breakStart: '12:00',
      breakEnd: '13:00',
      selectedRepeat: 'none',
      scheduleRemarks: '',
      showTimePicker: false
    });
  },

  /**
   * 格式化日期为 YYYY-MM-DD
   */
  formatDate: function(date) {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  },

  /**
   * 导出Excel
   */
  exportExcel: function() {
    const _this = this;
    wx.showLoading({
      title: '生成Excel中...',
    });
    
    // 准备数据
    const schedules = _this.data.scheduleList;
    const excelData = schedules.map(schedule => ({
      排班标题: schedule.schedule_title || '',
      工作开始时间: schedule.gongzuoshijianks || '',
      工作结束时间: schedule.gongzuoshijianjs || '',
      午休开始时间: schedule.wuxiushijianks || '',
      午休结束时间: schedule.wuxiushijianjs || '',
      工作年月: schedule.year_month || '',
      具体日期: schedule.riqi || '',
      工作日数组: Array.isArray(schedule.work_days) ? schedule.work_days.join('、') : schedule.work_days || '',
      重复类型: _this.getRepeatLabel(schedule.repeat_type),
      日历颜色: schedule.schedule_color || '',
      是否全天: schedule.is_all_day ? '是' : '否',
      备注: schedule.remarks || '',
      状态: schedule.schedule_status === 'active' ? '有效' : '已取消'
    }));

  
    
    const cloudList = {
      name: '工作安排日历',
      items: excelData,
      header: [
        { item: '排班标题', type: 'text', width: 20, columnName: '排班标题' },
        { item: '工作开始时间', type: 'text', width: 15, columnName: '工作开始时间' },
        { item: '工作结束时间', type: 'text', width: 15, columnName: '工作结束时间' },
        { item: '午休开始时间', type: 'text', width: 15, columnName: '午休开始时间' },
        { item: '午休结束时间', type: 'text', width: 15, columnName: '午休结束时间' },
        { item: '工作年月', type: 'text', width: 15, columnName: '工作年月' },
        { item: '具体日期', type: 'text', width: 15, columnName: '具体日期' },
        { item: '工作日数组', type: 'text', width: 40, columnName: '工作日数组' },
        { item: '重复类型', type: 'text', width: 15, columnName: '重复类型' },
        { item: '日历颜色', type: 'text', width: 15, columnName: '日历颜色' },
        { item: '是否全天', type: 'text', width: 10, columnName: '是否全天' },
        { item: '备注', type: 'text', width: 20, columnName: '备注' },
        { item: '状态', type: 'text', width: 10, columnName: '状态' }
      ]
    };
    
    // 调用云函数生成Excel
    wx.cloud.callFunction({
      name: 'getExcel',
      data: { list: cloudList },
      success: function(res) {
        wx.hideLoading();
        wx.cloud.downloadFile({
          fileID: res.result.fileID,
          success: res => {
            wx.openDocument({
              filePath: res.tempFilePath,
              showMenu: true,
              fileType: 'xlsx',
              success: res => {
                console.log("打开Excel成功");
              }
            });
          }
        });
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: '导出失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 获取重复类型标签
   */
  getRepeatLabel: function(value) {
    const option = this.data.repeatOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  },

  /**
   * 页面相关事件处理函数
   */
  onPullDownRefresh: function() {
    this.loadSchedules();
    wx.stopPullDownRefresh();
  }
});