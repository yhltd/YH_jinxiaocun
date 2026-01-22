// pages/punch/punch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    department: '',
    userName: '',
    userId: '',
    
    // 当前时间
    currentDate: '',
    currentTime: '',
    currentYear: '',
    currentMonth: '',
    currentDay: '',
    
    // 打卡状态
    signInDisabled: false,
    signOutDisabled: true,
    signInTime: '',
    signOutTime: '',
    
    // 今日状态
    todayStatus: {
      text: '未签到',
      color: 'red'
    },

    // 新增：请假申请相关数据
  leaveApplication: {
    visible: false,  // 请假申请弹窗是否可见
    startDate: '',   // 请假开始日期
    endDate: '',     // 请假结束日期
    reason: '',      // 请假原因
    submitting: false // 是否正在提交
  },
  
  // 新增：我的请假记录
  myLeaveRecords: [],
  
  // 新增：最近一次请假申请结果
  latestLeaveResult: null,
    
    // 工作安排
    workSchedule: null,
    
    // 打卡记录
    todayRecords: [],
    
    // 统计信息
    stats: {
      todaySignInCount: 0,
      todaySignOutCount: 0,
      monthValidDays: 0
    },
    
    // 消息提示
    message: null,
    
    // 公司名称
    companyName: '',
    
    // 字段映射（日期1-31对应数据库字段E-AI）
    dayFieldMap: {
      1: 'E', 2: 'F', 3: 'G', 4: 'H', 5: 'I', 6: 'J', 7: 'K', 8: 'L', 9: 'M', 10: 'N',
      11: 'O', 12: 'P', 13: 'Q', 14: 'R', 15: 'S', 16: 'T', 17: 'U', 18: 'V', 19: 'W', 20: 'X',
      21: 'Y', 22: 'Z', 23: 'AA', 24: 'AB', 25: 'AC', 26: 'AD', 27: 'AE', 28: 'AF', 29: 'AG', 30: 'AH', 31: 'AI'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      companyName: options.companyName || 'default'
    });

    // 初始化当前日期
    const now = new Date();
    _this.setData({
      currentYear: now.getFullYear().toString(),
      currentMonth: (now.getMonth() + 1).toString().padStart(2, '0'),
      currentDay: now.getDate(),
      currentDate: `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
    });

    this.loadUserInfo();
    this.startTimeUpdate();
    this.loadWorkSchedule();
    this.loadTodayRecords();
    this.updateStats();
    this.loadPunchState();
    this.checkTodayAttendance(); // 检查今日考勤记录

    // 新增：加载我的请假记录
  this.loadMyLeaveRecords();
  // 新增：检查最近的请假审批结果
  this.checkLatestLeaveResult();
  },

  /**
   * 获取work_days数组配置的天数
   */
  getWorkDaysCount: function(workSchedule) {
    if (!workSchedule || !workSchedule.work_days) {
      return 0;
    }
    
    try {
      let workDays = workSchedule.work_days;
      if (typeof workDays === 'string') {
        workDays = JSON.parse(workDays);
      }
      
      if (Array.isArray(workDays)) {
        // 过滤出当前年月的日期
        const currentYearMonth = `${this.data.currentYear}-${this.data.currentMonth}`;
        const filteredDays = workDays.filter(day => {
          return day.startsWith(currentYearMonth);
        });
        return filteredDays.length;
      }
    } catch (e) {
      console.error('解析work_days失败:', e);
    }
    
    return 0;
  },

  /**
   * 更新考勤统计到数据库
   */
  updateAttendanceStatistics: function() {
    const _this = this;
    const { userName, currentYear, currentMonth, companyName, dayFieldMap } = this.data;
    
    if (!userName || !currentYear || !currentMonth || !companyName) {
      console.log('❌ 缺少必要参数，无法更新统计');
      return;
    }
    
    // 查询当前用户的考勤记录
    const query = `SELECT * FROM gongzi_kaoqinjilu 
                   WHERE name = '${userName}' 
                   AND year = '${currentYear}' 
                   AND moth = '${currentMonth}' 
                   AND AO = '${companyName}'`;
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: { query: query },
      success: res => {
        if (res.result && res.result.recordset && res.result.recordset.length > 0) {
          const record = res.result.recordset[0];
          
          // 统计出勤天数（AJ字段）
          let attendanceCount = 0;
          // 统计迟到早退天数（AN字段）
          let lateEarlyCount = 0;
          
          // 遍历1-31天的字段
          for (let day = 1; day <= 31; day++) {
            const fieldName = dayFieldMap[day];
            const value = record[fieldName];
            
            if (value) {
              // 判断是否出勤：出勤、早签、迟到（但不算旷勤）
              if (value === '出勤' || value === '早签' || value === '迟到'|| value === '早退') {
                attendanceCount++;
              }
              
              // 判断是否迟到或早退
              if (value === '迟到' || value === '早退') {
                lateEarlyCount++;
              }
            }
          }
          
          console.log(`📊 统计结果 - 出勤天数: ${attendanceCount}, 迟到早退天数: ${lateEarlyCount}`);
          
          // 更新数据库中的统计字段
          _this.updateStatisticsToDB(attendanceCount, lateEarlyCount);
        }
      },
      fail: err => {
        console.error('❌ 查询考勤记录失败，无法统计:', err);
      }
    });
  },

  /**
   * 更新统计到数据库
   */
  updateStatisticsToDB: function(attendanceCount, lateEarlyCount) {
    const _this = this;
    const { userName, currentYear, currentMonth, companyName } = this.data;
    
    const updateQuery = `UPDATE gongzi_kaoqinjilu 
                         SET AK = ${attendanceCount}, AN = ${lateEarlyCount}
                         WHERE name = '${userName}' 
                         AND year = '${currentYear}' 
                         AND moth = '${currentMonth}' 
                         AND AO = '${companyName}'`;
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: { query: updateQuery },
      success: res => {
        console.log('✅ 统计信息更新成功');
      },
      fail: err => {
        console.error('❌ 更新统计信息失败:', err);
      }
    });
  },

  /**
   * 初始化时更新AJ字段为work_days配置的天数
   */
  updateWorkDaysToAJ: function() {
    const _this = this;
    const { userName, currentYear, currentMonth, companyName, workSchedule } = this.data;
    
    if (!userName || !workSchedule) {
      return;
    }
    
    // 获取work_days配置的天数
    const workDaysCount = this.getWorkDaysCount(workSchedule);
    
    if (workDaysCount === 0) {
      console.log('⚠️ work_days配置天数为0，不更新AJ字段');
      return;
    }
    
    console.log(`📅 work_days配置天数: ${workDaysCount}`);
    
    // 先检查记录是否存在
    const checkQuery = `SELECT id FROM gongzi_kaoqinjilu 
                        WHERE name = '${userName}' 
                        AND year = '${currentYear}' 
                        AND moth = '${currentMonth}' 
                        AND AO = '${companyName}'`;
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: { query: checkQuery },
      success: checkRes => {
        if (checkRes.result && checkRes.result.recordset && checkRes.result.recordset.length > 0) {
          // 记录存在，更新AJ字段
          const updateQuery = `UPDATE gongzi_kaoqinjilu 
                               SET AJ = ${workDaysCount}
                               WHERE name = '${userName}' 
                               AND year = '${currentYear}' 
                               AND moth = '${currentMonth}' 
                               AND AO = '${companyName}'`;

                               console.log("更新Ajsql",updateQuery);
          
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: { query: updateQuery },
            success: updateRes => {
              console.log(`✅ AJ字段已更新为work_days配置的天数: ${workDaysCount}`);
            },
            fail: updateErr => {
              console.error('❌ 更新AJ字段失败:', updateErr);
            }
          });
        } else {
          // 记录不存在，插入新记录并设置AJ字段
          const insertQuery = `INSERT INTO gongzi_kaoqinjilu (
            name, year, moth, AJ, AO
          ) VALUES (
            '${userName}', '${currentYear}', '${currentMonth}', ${workDaysCount}, '${companyName}'
          )`;
          
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: { query: insertQuery },
            success: insertRes => {
              console.log(`✅ 插入记录并设置AJ字段为: ${workDaysCount}`);
            },
            fail: insertErr => {
              console.error('❌ 插入记录失败:', insertErr);
            }
          });
        }
      },
      fail: checkErr => {
        console.error('❌ 检查记录失败:', checkErr);
      }
    });
  },

  /**
 * 检查今日考勤记录
 */
checkTodayAttendance: function() {
  const _this = this;
  const { userName, currentYear, currentMonth, companyName } = this.data;
  
  if (!userName) return;
  
  const query = `SELECT * FROM gongzi_kaoqinjilu 
                 WHERE name = '${userName}' 
                 AND year = '${currentYear}' 
                 AND moth = '${currentMonth}' 
                 AND AO = '${companyName}'`;
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: { query: query },
    success: res => {
      if (res.result && res.result.recordset && res.result.recordset.length > 0) {
        const record = res.result.recordset[0];
        const dayField = this.data.dayFieldMap[this.data.currentDay];
        const todayStatus = record[dayField];
        
        console.log('今日考勤状态:', todayStatus);
        
        // 新增：检查当天字段是否为"休"
        if (todayStatus === '休') {
          console.log('⚠️ 今天是休息日，禁止打卡');
          _this.setData({
            signInDisabled: true,
            signOutDisabled: true,
            signInTime: '休息日',
            signOutTime: '休息日',
            todayStatus: {
              text: '休息日',
              color: 'blue'
            }
          });
          _this.showMessage('今天是休息日，无需打卡', 'info');
          return;
        }
        
        // 根据数据库中的状态更新按钮
        if (todayStatus === '早签' || todayStatus === '迟到') {
          _this.setData({
            signInTime: '已签到',
            signInDisabled: true,
            signOutDisabled: false
          });
        }
        
        if (todayStatus === '出勤' || todayStatus === '早退' || todayStatus === '旷勤') {
          _this.setData({
            signInTime: '已签到',
            signOutTime: '已签退',
            signInDisabled: true,
            signOutDisabled: true
          });
        }
        
        // 如果今天既不是休息日也没有其他状态，检查是否有工作安排
        if (!todayStatus || todayStatus === '') {
          // 如果没有工作安排，也禁用打卡按钮
          if (!_this.data.workSchedule) {
            _this.setData({
              signInDisabled: true,
              todayStatus: {
                text: '无工作安排',
                color: 'gray'
              }
            });
            _this.showMessage('今日无工作安排，无需打卡', 'info');
          }
        }
      }
    },
    fail: err => {
      console.error('查询考勤记录失败:', err);
    }
  });
},

  /**
   * 签到功能 - 更新到数据库
   */
  signIn: function() {
    console.log('🔄 开始签到流程...');
    
    // 检查用户信息
    if (!this.checkUserInfo()) {
      return;
    }
    
    // 检查今日是否有工作安排
    if (!this.data.workSchedule) {
      this.showMessage('今日无工作安排，无需打卡', 'error');
      return;
    }
    
    // 新增：检查今天是否为休息日
    this.getTodayAttendanceStatus((attendanceStatus) => {
      if (attendanceStatus === '休') {
        this.showMessage('今天是休息日，禁止打卡', 'error');
        return;
      }
      
      // 继续原有的签到流程
      const now = new Date();
      const currentTimeStr = this.formatTime(now);
      const currentDateTime = now;
      
      console.log('🕒 当前时间:', currentTimeStr);
      
      // 检查是否已经签到
      if (this.data.signInTime && this.data.signInTime !== '') {
        this.showMessage('今日已签到，不能重复签到', 'error');
        return;
      }
      
      // 获取工作时间配置
      const workSchedule = this.data.workSchedule;
      const workStartTime = this.parseTimeString(workSchedule.gongzuoshijianks);
      
      // 判断签到状态
      let isNormal = true;
      let statusText = '早签';
      let message = '签到成功';
      
      // 判断是否迟到（晚于上班时间）
      if (currentDateTime > workStartTime) {
        const minutesLate = Math.floor((currentDateTime - workStartTime) / (1000 * 60));
        console.log(`⌛ 迟到签到：迟到 ${minutesLate} 分钟`);
        
        if (minutesLate > 5 && minutesLate <= 30) {
          // 迟到5-30分钟
          isNormal = false;
          statusText = '迟到';
          message = `迟到${minutesLate}分钟`;
          console.log('❌ 签到失败：迟到');
        } else if (minutesLate > 30) {
          // 迟到超过30分钟，视为旷勤
          isNormal = false;
          statusText = '旷勤';
          message = `旷勤（迟到${minutesLate}分钟）`;
          console.log('❌ 签到失败：旷勤');
        } else {
          message = `正常签到（迟到${minutesLate}分钟）`;
          console.log('✅ 签到成功：轻微迟到');
        }
      }
  
      this.updateWorkDaysToAJ();
      
      // 保存签到记录到数据库
      this.saveAttendanceToDB('signIn', statusText, currentTimeStr, isNormal, message);
    });
  },

  /**
   * 签退功能 - 更新到数据库
   */
  signOut: function() {
    console.log('🔄 开始签退流程...');
    
    // 检查用户信息
    if (!this.checkUserInfo()) {
      return;
    }
    
    // 检查是否已签到
    if (!this.data.signInTime || this.data.signInTime === '') {
      this.showMessage('请先进行签到', 'error');
      return;
    }
    
    // 检查是否已签退
    if (this.data.signOutTime && this.data.signOutTime !== '') {
      this.showMessage('今日已签退，不能重复签退', 'error');
      return;
    }
    
    // 新增：检查今天是否为休息日
    this.getTodayAttendanceStatus((attendanceStatus) => {
      if (attendanceStatus === '休') {
        this.showMessage('今天是休息日，禁止打卡', 'error');
        return;
      }
      
      const now = new Date();
      const currentTimeStr = this.formatTime(now);
      const currentDateTime = now;
      
      console.log('🕒 当前时间:', currentTimeStr);
      
      // 获取工作时间配置
      const workSchedule = this.data.workSchedule;
      const workEndTime = this.parseTimeString(workSchedule.gongzuoshijianjs);
      
      console.log('当前考勤状态为:', attendanceStatus);
      
      // 如果签到状态已经是旷勤，签退不做任何修改
      if (attendanceStatus === '旷勤') {
        this.showMessage('签到状态为旷勤，签退不做更新', 'info');
        this.setData({
          signOutTime: currentTimeStr,
          signOutDisabled: true
        });
        this.savePunchRecord({
          type: 'signOut',
          time: currentTimeStr,
          status: '旷勤（不变）',
          isValid: false,
          message: '签退不做更新（签到已旷勤）'
        });
        return;
      }
      
      let statusText = '出勤';
      let isNormal = true;
      let message = '签退成功';
      
      // 判断签退时间
      if (currentDateTime < workEndTime) {
        const minutesEarly = Math.floor((workEndTime - currentDateTime) / (1000 * 60));
        console.log(`⏰ 提前签退：提前 ${minutesEarly} 分钟`);
        
        if (minutesEarly > 5 && minutesEarly <= 30) {
          // 早退5-30分钟
          isNormal = false;
          
          // 根据签到状态决定签退状态
          if (attendanceStatus === '早签') {
            statusText = '早退';
            message = `早退${minutesEarly}分钟`;
          } else if (attendanceStatus === '迟到') {
            // 迟到情况下早退5-30分钟，保持迟到状态
            statusText = attendanceStatus;
            message = `早退${minutesEarly}分钟（保持迟到状态）`;
          }
          console.log('❌ 签退失败：早退');
        } else if (minutesEarly > 30) {
          // 早退超过30分钟，无论签到状态如何都视为旷勤
          isNormal = false;
          statusText = '旷勤';
          message = `旷勤（早退${minutesEarly}分钟）`;
          console.log('❌ 签退失败：严重早退视为旷勤');
        } else {
          // 早退5分钟内
          message = `正常签退（提前${minutesEarly}分钟）`;
          console.log('✅ 签退成功：轻微提前');
        }
      } else if (currentDateTime > workEndTime) {
        // 超时工作
        const minutesLate = Math.floor((currentDateTime - workEndTime) / (1000 * 60));
        console.log(`⌛ 超时工作：超时 ${minutesLate} 分钟`);
        
        // 如果超时超过30分钟，视为异常
        if (minutesLate > 30) {
          isNormal = false;
          // 根据签到状态决定
          if (attendanceStatus === '早签') {
            statusText = '出勤'; // 超时过长但算正常出勤
            message = `超时签退（超时${minutesLate}分钟）`;
          } else if (attendanceStatus === '迟到') {
            // 迟到情况下，超时过长仍保持迟到状态
            statusText = attendanceStatus;
            message = `超时签退（超时${minutesLate}分钟，保持迟到）`;
          }
          console.log('⚠️ 签退警告：超时过长');
        } else {
          // 正常超时
          if (attendanceStatus === '早签') {
            statusText = '出勤';
          } else if (attendanceStatus === '迟到') {
            // 迟到情况下，正常签退不做更新
            statusText = attendanceStatus;
          }
          message = `正常签退（超时${minutesLate}分钟）`;
          console.log('✅ 签退成功：超时工作');
        }
      } else {
        // 准时签退
        message = '准时签退';
        console.log('✅ 签退成功：准时');
        
        // 根据签到状态决定
        if (attendanceStatus === '早签') {
          statusText = '出勤';
        } else if (attendanceStatus === '迟到') {
          // 迟到情况下，准时签退不做更新
          statusText = attendanceStatus;
        }
      }
      
      // 保存签退记录到数据库
      this.saveAttendanceToDB('signOut', statusText, currentTimeStr, isNormal, message);
    });
  },

  /**
   * 获取今日考勤状态
   */
  getTodayAttendanceStatus: function(callback) {
    const _this = this;
    const { userName, currentYear, currentMonth, companyName, currentDay } = this.data;
    
    const query = `SELECT ${_this.data.dayFieldMap[currentDay]} as todayStatus 
                   FROM gongzi_kaoqinjilu 
                   WHERE name = '${userName}' 
                   AND year = '${currentYear}' 
                   AND moth = '${currentMonth}' 
                   AND AO = '${companyName}'`;
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: { query: query },
      success: res => {
        if (res.result && res.result.recordset && res.result.recordset.length > 0) {
          const todayStatus = res.result.recordset[0].todayStatus || '';
          console.log('当前考勤状态:', todayStatus);
          
          // 如果是"休"状态，禁用打卡按钮
          if (todayStatus === '休') {
            _this.setData({
              signInDisabled: true,
              signOutDisabled: true,
              todayStatus: {
                text: '休息日',
                color: 'blue'
              }
            });
          }
          
          callback(todayStatus);
        } else {
          callback('');
        }
      },
      fail: err => {
        console.error('查询考勤状态失败:', err);
        callback('');
      }
    });
  },

  /**
   * 保存考勤记录到数据库
   */
  saveAttendanceToDB: function(type, status, time, isNormal, message) {
    const _this = this;
    const { userName, currentYear, currentMonth, companyName, currentDay } = this.data;
    const dayField = this.data.dayFieldMap[currentDay];
    
    // 先检查记录是否存在
    const checkQuery = `SELECT id FROM gongzi_kaoqinjilu 
                        WHERE name = '${userName}' 
                        AND year = '${currentYear}' 
                        AND moth = '${currentMonth}' 
                        AND AO = '${companyName}'`;

    console.log('检查记录sql:', checkQuery);
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: { query: checkQuery },
      success: checkRes => {
        console.log('返回数据:', checkRes);
        if (checkRes.result && checkRes.result.recordset && checkRes.result.recordset.length > 0) {
          // 记录存在，更新当天字段
          const updateQuery = `UPDATE gongzi_kaoqinjilu 
                               SET ${dayField} = '${status}' 
                               WHERE name = '${userName}' 
                               AND year = '${currentYear}' 
                               AND moth = '${currentMonth}' 
                               AND AO = '${companyName}'`;
          
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: { query: updateQuery },
            success: updateRes => {
              console.log('✅ 考勤记录更新成功');
              _this.updateLocalState(type, time, status, isNormal, message);
              
              // 考勤记录更新成功后，更新统计信息
              _this.updateAttendanceStatistics();
            },
            fail: updateErr => {
              console.error('❌ 更新考勤记录失败:', updateErr);
              _this.showMessage('更新考勤记录失败', 'error');
            }
          });
        } else {
          // 记录不存在，插入新记录（只设置必要字段）
          const insertQuery = `INSERT INTO gongzi_kaoqinjilu (
            name, year, moth, ${dayField}, AO
          ) VALUES (
            '${userName}', '${currentYear}', '${currentMonth}', '${status}', '${companyName}'
          )`;
          
          console.log('插入SQL:', insertQuery);
          
          wx.cloud.callFunction({
            name: 'sqlServer_117',
            data: { query: insertQuery },
            success: insertRes => {
              console.log('✅ 考勤记录插入成功');
              _this.updateLocalState(type, time, status, isNormal, message);
              
              // 考勤记录插入成功后，更新统计信息
              _this.updateAttendanceStatistics();
            },
            fail: insertErr => {
              console.error('❌ 插入考勤记录失败:', insertErr);
              _this.showMessage('插入考勤记录失败', 'error');
            }
          });
        }
      },
      fail: checkErr => {
        console.error('❌ 检查考勤记录失败:', checkErr);
        _this.showMessage('检查考勤记录失败', 'error');
      }
    });
  },

  /**
   * 更新本地状态
   */
  updateLocalState: function(type, time, status, isNormal, message) {
    // 保存到本地缓存
    this.savePunchRecord({
      type: type,
      time: time,
      status: status,
      isValid: isNormal,
      message: message
    });
    
    // 更新界面状态
    if (type === 'signIn') {
      this.setData({
        signInTime: time,
        signInDisabled: true,
        signOutDisabled: false
      });
    } else if (type === 'signOut') {
      this.setData({
        signOutTime: time,
        signOutDisabled: true
      });
    }
    
    // 更新今日状态
    this.updateTodayStatus();
    
    // 显示结果
    if (isNormal) {
      this.showMessage(`${message}`, 'success');
    } else {
      this.showMessage(`${message}`, 'error');
    }
    
    // 刷新记录列表
    this.loadTodayRecords();
    this.updateStats();
    this.savePunchState();
    
    console.log('📝 打卡流程完成');
    console.log('类型:', type);
    console.log('时间:', time);
    console.log('状态:', status);
    console.log('有效性:', isNormal ? '正常' : '异常');
  },

  /**
   * 加载用户信息
   */
  loadUserInfo: function() {
    const department = wx.getStorageSync('punch_department') || '';
    const userName = wx.getStorageSync('punch_userName') || '';
    const userId = wx.getStorageSync('punch_userId') || '';
    
    this.setData({
      department,
      userName,
      userId
    });
  },

  /**
   * 保存用户信息
   */
  saveUserInfo: function() {
    const { department, userName } = this.data;
    
    if (!department || !userName) {
      this.showMessage('请填写完整的部门和个人信息', 'error');
      return;
    }
    
    // 生成用户ID
    const userId = this.generateUserId(department, userName);
    
    wx.setStorageSync('punch_department', department);
    wx.setStorageSync('punch_userName', userName);
    wx.setStorageSync('punch_userId', userId);
    
    this.setData({ userId });
    this.showMessage('个人信息保存成功', 'success');
    
    // 重新加载工作安排
    this.loadWorkSchedule();
    this.checkTodayAttendance(); // 重新检查考勤记录
  },

  /**
   * 生成用户ID
   */
  generateUserId: function(department, userName) {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 4);
    return `${department}_${userName}_${timestamp}_${randomStr}`;
  },

  /**
   * 开始更新时间显示
   */
  startTimeUpdate: function() {
    const updateTime = () => {
      const now = new Date();
      const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      this.setData({
        currentDate: dateStr,
        currentTime: timeStr
      });
    };
    
    // 立即更新一次
    updateTime();
    
    // 每秒更新
    this.timeInterval = setInterval(updateTime, 1000);
  },

  /**
   * 加载今日工作安排
   */
  loadWorkSchedule: function() {
    const today = new Date();
    const dateStr = this.formatDate(today);
    const department = this.data.department;
    const gongsi = this.data.companyName;
    
    console.log('📅 开始查询今日工作安排...');
    
    if (!department) {
      console.log('⚠️ 未填写部门，无法查询工作安排');
      this.showMessage('请先填写并保存部门信息', 'error');
      this.setData({ workSchedule: null });
      return;
    }
    
    if (!gongsi) {
      console.log('⚠️ 未找到公司信息，无法查询工作安排');
      this.showMessage('未找到公司信息，请检查缓存', 'error');
      this.setData({ workSchedule: null });
      return;
    }
    
    const query = `SELECT * FROM gongzi_gongzuoshijian 
                   WHERE schedule_status = 'active' 
                   AND work_days LIKE '%"${dateStr}"%' 
                   AND (schedule_title LIKE '%${department}%' OR schedule_title LIKE '%${this.data.userName}%')
                   AND gongsi = '${gongsi}'
                   ORDER BY id DESC`;
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: { query: query },
      success: res => {
        if (res.result && res.result.recordset && res.result.recordset.length > 0) {
          const schedule = res.result.recordset[0];
          
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
          
          this.setData({
            workSchedule: schedule
          });
          
          this.showMessage(`已找到排班：${schedule.schedule_title}`, 'success');
          
          // 加载工作安排成功后，重新检查考勤状态
          this.checkTodayAttendance();
          this.updatePunchButtons();
          
        } else {
          this.setData({
            workSchedule: null
          });
          this.showMessage('今日无工作安排', 'error');
          
          // 没有工作安排时也检查是否休息日
          this.checkTodayAttendance();
          this.updatePunchButtons();
        }
      },
      fail: err => {
        console.error('❌ 查询工作安排失败:', err);
        this.showMessage('查询工作安排失败', 'error');
        this.setData({
          workSchedule: null
        });
      }
    });
  },

  /**
   * 加载打卡状态
   */
  loadPunchState: function() {
    const today = this.formatDate(new Date());
    const stateKey = `punch_state_${today}`;
    const savedState = wx.getStorageSync(stateKey);
    
    if (savedState) {
      this.setData({
        signInTime: savedState.signInTime || '',
        signOutTime: savedState.signOutTime || '',
        signInDisabled: savedState.signInDisabled || false,
        signOutDisabled: savedState.signOutDisabled || true
      });
    }
  },

  /**
   * 保存打卡状态
   */
  savePunchState: function() {
    const today = this.formatDate(new Date());
    const stateKey = `punch_state_${today}`;
    
    const punchState = {
      signInTime: this.data.signInTime,
      signOutTime: this.data.signOutTime,
      signInDisabled: this.data.signInDisabled,
      signOutDisabled: this.data.signOutDisabled,
      lastUpdate: new Date().getTime()
    };
    
    wx.setStorageSync(stateKey, punchState);
  },

  /**
   * 清空今日所有数据
   */
  clearTodayData: function() {
    const _this = this;
    
    wx.showModal({
      title: '确认清空',
      content: '确定要清空今日所有打卡数据吗？此操作不可恢复！',
      success: function(res) {
        if (res.confirm) {
          const today = _this.formatDate(new Date());
          
          // 清空今日记录
          const recordsKey = `punch_records_${today}`;
          wx.removeStorageSync(recordsKey);
          
          // 清空今日状态
          const stateKey = `punch_state_${today}`;
          wx.removeStorageSync(stateKey);
          
          // 重置界面状态
          _this.setData({
            signInTime: '',
            signOutTime: '',
            signInDisabled: false,
            signOutDisabled: true,
            todayRecords: [],
            todayStatus: {
              text: '未签到',
              color: 'red'
            },
            stats: {
              todaySignInCount: 0,
              todaySignOutCount: 0,
              monthValidDays: _this.data.stats.monthValidDays
            }
          });
          
          _this.showMessage('今日数据已清空', 'success');
        }
      }
    });
  },

  /**
   * 保存打卡记录到本地缓存
   */
  savePunchRecord: function(record) {
    const today = this.formatDate(new Date());
    const key = `punch_records_${today}`;
    
    let todayRecords = wx.getStorageSync(key) || [];
    record.id = Date.now();
    todayRecords.push(record);
    
    wx.setStorageSync(key, todayRecords);
  },

  /**
   * 加载今日打卡记录
   */
  loadTodayRecords: function() {
    const today = this.formatDate(new Date());
    const key = `punch_records_${today}`;
    const todayRecords = wx.getStorageSync(key) || [];
    
    todayRecords.sort((a, b) => {
      const timeA = this.parseTimeString(a.time).getTime();
      const timeB = this.parseTimeString(b.time).getTime();
      return timeA - timeB;
    });
    
    this.setData({
      todayRecords: todayRecords
    });
    
    const signInRecord = todayRecords.find(record => record.type === 'signIn');
    const signOutRecord = todayRecords.find(record => record.type === 'signOut');
    
    this.setData({
      signInTime: signInRecord ? signInRecord.time : '',
      signOutTime: signOutRecord ? signOutRecord.time : ''
    });
    
    this.updatePunchButtons();
  },

  /**
   * 更新打卡按钮状态
   */
  updatePunchButtons: function() {
    const hasWorkSchedule = !!this.data.workSchedule;
    const hasSignedIn = !!this.data.signInTime;
    const hasSignedOut = !!this.data.signOutTime;
    
    this.setData({
      signInDisabled: !hasWorkSchedule || hasSignedIn || hasSignedOut,
      signOutDisabled: !hasSignedIn || hasSignedOut
    });
  },

  /**
   * 更新今日状态
   */
  updateTodayStatus: function() {
    const hasSignedIn = !!this.data.signInTime;
    const hasSignedOut = !!this.data.signOutTime;
    
    let status = {
      text: '未签到',
      color: 'red'
    };
    
    if (hasSignedIn && hasSignedOut) {
      const todayRecords = this.data.todayRecords;
      const hasInvalidRecord = todayRecords.some(record => !record.isValid);
      
      if (hasInvalidRecord) {
        status = {
          text: '已完成（有异常）',
          color: 'orange'
        };
      } else {
        status = {
          text: '已完成',
          color: 'green'
        };
      }
    } else if (hasSignedIn) {
      const signInRecord = this.data.todayRecords.find(record => record.type === 'signIn');
      if (signInRecord && !signInRecord.isValid) {
        status = {
          text: '已签到（异常）',
          color: 'orange'
        };
      } else {
        status = {
          text: '已签到',
          color: 'green'
        };
      }
    }
    
    this.setData({
      todayStatus: status
    });
  },

  /**
   * 更新统计信息
   */
  updateStats: function() {
    const today = this.formatDate(new Date());
    const key = `punch_records_${today}`;
    const todayRecords = wx.getStorageSync(key) || [];
    
    const signInCount = todayRecords.filter(record => record.type === 'signIn').length;
    const signOutCount = todayRecords.filter(record => record.type === 'signOut').length;
    
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${now.getMonth() + 1}`;
    const monthValidDays = this.calculateMonthValidDays(monthKey);
    
    this.setData({
      stats: {
        todaySignInCount: signInCount,
        todaySignOutCount: signOutCount,
        monthValidDays: monthValidDays
      }
    });
  },

  /**
   * 计算本月有效天数
   */
  calculateMonthValidDays: function(monthKey) {
    let validDays = 0;
    
    for (let day = 1; day <= 31; day++) {
      const dateStr = `${monthKey}-${day.toString().padStart(2, '0')}`;
      const key = `punch_records_${dateStr}`;
      const dayRecords = wx.getStorageSync(key);
      
      if (dayRecords && dayRecords.length >= 2) {
        const signInValid = dayRecords.find(r => r.type === 'signIn')?.isValid || false;
        const signOutValid = dayRecords.find(r => r.type === 'signOut')?.isValid || false;
        
        if (signInValid && signOutValid) {
          validDays++;
        }
      }
    }
    
    return validDays;
  },

  /**
   * 刷新数据
   */
  refreshData: function() {
    this.loadWorkSchedule();
    this.loadTodayRecords();
    this.updateStats();
    this.checkTodayAttendance();
  },

  /**
   * 刷新记录
   */
  refreshRecords: function() {
    this.showMessage('正在刷新数据...', 'info');
    this.refreshData();
    setTimeout(() => {
      this.showMessage('数据刷新完成', 'success');
    }, 500);
  },

  /**
   * 检查用户信息
   */
  checkUserInfo: function() {
    const { department, userName } = this.data;
    
    if (!department || !userName) {
      this.showMessage('请先保存部门和个人信息', 'error');
      return false;
    }
    
    return true;
  },

  /**
   * 显示消息提示
   */
  showMessage: function(text, type = 'info') {
    this.setData({
      message: {
        text: text,
        type: type
      }
    });
    
    setTimeout(() => {
      this.setData({
        message: null
      });
    }, 3000);
  },

  /**
   * 工具方法：格式化日期为 YYYY-MM-DD
   */
  formatDate: function(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  },

  /**
   * 工具方法：格式化时间为 HH:mm
   */
  formatTime: function(date) {
    const d = new Date(date);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  },

  /**
   * 工具方法：解析时间字符串为Date对象
   */
  parseTimeString: function(timeStr) {
    const now = new Date();
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
  },

  /**
   * 输入框事件处理
   */
  onDepartmentInput: function(e) {
    this.setData({
      department: e.detail.value
    });
  },

  onUserNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  },
  /**
 * 显示请假申请弹窗
 */
showLeaveApplication: function() {
  if (!this.checkUserInfo()) {
    return;
  }
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  this.setData({
    'leaveApplication.visible': true,
    'leaveApplication.startDate': this.formatDate(today),
    'leaveApplication.endDate': this.formatDate(tomorrow),
    'leaveApplication.reason': '',
    'leaveApplication.submitting': false
  });
},

/**
 * 隐藏请假申请弹窗
 */
hideLeaveApplication: function() {
  this.setData({
    'leaveApplication.visible': false
  });
},

/**
 * 请假开始日期变更
 */
onLeaveStartDateChange: function(e) {
  this.setData({
    'leaveApplication.startDate': e.detail.value
  });
  
  // 如果结束日期早于开始日期，自动调整结束日期
  const startDate = new Date(e.detail.value);
  const endDate = new Date(this.data.leaveApplication.endDate);
  
  if (endDate < startDate) {
    this.setData({
      'leaveApplication.endDate': e.detail.value
    });
  }
},

/**
 * 请假结束日期变更
 */
onLeaveEndDateChange: function(e) {
  this.setData({
    'leaveApplication.endDate': e.detail.value
  });
},

/**
 * 请假原因输入
 */
onLeaveReasonInput: function(e) {
  this.setData({
    'leaveApplication.reason': e.detail.value
  });
},

/**
 * 提交请假申请
 */
submitLeaveApplication: function() {
  const _this = this;
  const { department, userName, companyName } = this.data;
  const { startDate, endDate, reason } = this.data.leaveApplication;
  
  if (!startDate || !endDate) {
    this.showMessage('请选择请假日期', 'error');
    return;
  }
  
  if (!reason || reason.trim() === '') {
    this.showMessage('请输入请假原因', 'error');
    return;
  }
  
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  
  if (endDateObj < startDateObj) {
    this.showMessage('结束日期不能早于开始日期', 'error');
    return;
  }
  
  // 计算请假天数
  const diffTime = Math.abs(endDateObj - startDateObj);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  // 显示确认对话框
  wx.showModal({
    title: '确认提交请假申请',
    content: `请假时间：${startDate} 至 ${endDate}\n共计：${diffDays}天\n请假原因：${reason}`,
    confirmText: '提交',
    cancelText: '取消',
    success: function(res) {
      if (res.confirm) {
        _this.setData({
          'leaveApplication.submitting': true
        });
        
        // 获取当前时间作为提交时间
        const submitTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        // 插入请假申请记录到数据库
        const sql = `INSERT INTO gongzi_qingjiashenpi (
          bumen, xingming, gongsi, 
          tijiaoshijian, qsqingjiashijian, jzqingjiashijan, 
          qingjiayuanyin, zhuangtai, shenpiyuanyin
        ) VALUES (
          '${department}', '${userName}', '${companyName}',
          '${submitTime}', '${startDate}', '${endDate}',
          '${reason}', '待审批', ''
        )`;
        
        console.log('提交请假申请SQL:', sql);
        
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: {
            query: sql
          },
          success: function(res) {
            console.log('请假申请提交成功', res);
            
            _this.setData({
              'leaveApplication.visible': false,
              'leaveApplication.submitting': false,
              latestLeaveResult: {
                success: true,
                message: `请假申请已提交，请假${diffDays}天，等待审批`,
                startDate: startDate,
                endDate: endDate,
                reason: reason
              }
            });
            
            _this.showMessage('请假申请提交成功', 'success');
            
            // 刷新请假记录
            setTimeout(() => {
              _this.loadMyLeaveRecords();
            }, 1000);
            
            // 3秒后清除结果提示
            setTimeout(() => {
              _this.setData({
                latestLeaveResult: null
              });
            }, 3000);
          },
          fail: function(err) {
            console.error('请假申请提交失败:', err);
            
            _this.setData({
              'leaveApplication.submitting': false,
              latestLeaveResult: {
                success: false,
                message: '请假申请提交失败，请稍后重试'
              }
            });
            
            _this.showMessage('提交失败，请重试', 'error');
          }
        });
      }
    }
  });
},

/**
 * 加载我的请假记录
 */
loadMyLeaveRecords: function() {
  const _this = this;
  const { userName, companyName } = this.data;
  
  if (!userName) {
    return;
  }
  
  const query = `SELECT TOP 10 * FROM gongzi_qingjiashenpi 
                 WHERE xingming = '${userName}' 
                 AND gongsi = '${companyName}'
                 ORDER BY id DESC`;
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: { query: query },
    success: function(res) {
      if (res.result && res.result.recordset) {
        const records = res.result.recordset.map(record => {
          // 计算请假天数
          if (record.qsqingjiashijian && record.jzqingjiashijan) {
            const startDate = new Date(record.qsqingjiashijian);
            const endDate = new Date(record.jzqingjiashijan);
            const diffTime = Math.abs(endDate - startDate);
            record.daysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          } else {
            record.daysCount = 0;
          }
          
          // 格式化状态颜色
          record.statusColor = _this.getStatusColor(record.zhuangtai);
          
          return record;
        });
        
        _this.setData({
          myLeaveRecords: records
        });
      }
    },
    fail: function(err) {
      console.error('加载请假记录失败:', err);
    }
  });
},

/**
 * 根据状态获取颜色
 */
getStatusColor: function(status) {
  switch(status) {
    case '待审批':
      return 'orange';
    case '通过':
      return 'green';
    case '驳回':
      return 'red';
    default:
      return 'gray';
  }
},

/**
 * 检查最近的请假审批结果
 */
checkLatestLeaveResult: function() {
  const _this = this;
  const { userName, companyName } = this.data;
  
  if (!userName) {
    return;
  }
  
  const query = `SELECT TOP 1 * FROM gongzi_qingjiashenpi 
                 WHERE xingming = '${userName}' 
                 AND gongsi = '${companyName}'
                 ORDER BY id DESC`;
  
  wx.cloud.callFunction({
    name: 'sqlServer_117',
    data: { query: query },
    success: function(res) {
      if (res.result && res.result.recordset && res.result.recordset.length > 0) {
        const latestRecord = res.result.recordset[0];
        
        // 如果是最近1小时内提交的申请，显示提示
        const submitTime = new Date(latestRecord.tijiaoshijian);
        const now = new Date();
        const hoursDiff = Math.abs(now - submitTime) / (1000 * 60 * 60);
        
        if (hoursDiff < 24 && latestRecord.zhuangtai === '待审批') {
          _this.setData({
            latestLeaveResult: {
              show: true,
              status: 'pending',
              message: `您最近的请假申请正在等待审批\n请假时间：${latestRecord.qsqingjiashijian} 至 ${latestRecord.jzqingjiashijan}`
            }
          });
        } else if (hoursDiff < 24 && (latestRecord.zhuangtai === '通过' || latestRecord.zhuangtai === '驳回')) {
          _this.setData({
            latestLeaveResult: {
              show: true,
              status: latestRecord.zhuangtai === '通过' ? 'approved' : 'rejected',
              message: `您的请假申请${latestRecord.zhuangtai === '通过' ? '已通过' : '被驳回'}\n审批意见：${latestRecord.shenpiyuanyin || '无'}`
            }
          });
          
          // 5秒后自动隐藏
          setTimeout(() => {
            _this.setData({
              latestLeaveResult: null
            });
          }, 5000);
        }
      }
    },
    fail: function(err) {
      console.error('检查请假结果失败:', err);
    }
  });
},

});