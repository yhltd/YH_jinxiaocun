// miniprogram/pages/login/login.js
// const requestUrl = require('../../config').requestUrl
const app = getApp();

//==================数据库空间获取============

/**
 * 查询分权系统数据库表空间大小
 */
function getDatabaseSpace(companyName, callback) {
  console.log('开始查询数据库空间，公司:', companyName);
  
  // 定义表和公司字段的映射关系
  const tables = {
    "baitaoquanxian": "公司",
    "baitaoquanxian_copy1": "quanxian",
    "baitaoquanxian_copy2": "公司",
    "baitaoquanxian_department": "company",
    "baitaoquanxian_gongsi": "B",
    "baitaoquanxian_jisuan": "company",
    "baitaoquanxian_renyun": "B"
  };
  
  const results = [];
  let completedQueries = 0;
  const totalTables = Object.keys(tables).length;
  
  // 遍历所有表
  for (const [tableName, companyColumn] of Object.entries(tables)) {
    // 先检查表是否存在
    const checkTableSql = `
      SELECT COUNT(*) as cnt 
      FROM sysobjects 
      WHERE xtype='U' AND name='${tableName}'
    `;
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: { query: checkTableSql },
      success: checkRes => {
        const tableExists = checkRes.result?.recordset?.[0]?.cnt === 1;
        
        if (!tableExists) {
          console.log(`表 ${tableName} 不存在，跳过`);
          results.push({
            tableName: tableName,
            companyRowCount: 0,
            totalSpaceKB: 0,
            companySpaceKB: 0
          });
          completedQueries++;
          if (completedQueries === totalTables) {
            calculateTotalSpace(results, callback);
          }
          return;
        }
        
        // 查询该公司的数据行数（使用模糊匹配）
        // const countSql = `SELECT COUNT(*) as rowCount FROM ${tableName} WHERE ${companyColumn} = '${companyName}'`;
        const countSql = `SELECT id FROM ${tableName} WHERE ${companyColumn} = '${companyName}'`;
        
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: { query: countSql },
          success: countRes => {
            console.log("执行语句",countSql)
            console.log("返回的数据",countRes)
            const rowCount = countRes.result?.recordset?.length || 0;
            console.log(`表 ${tableName} 中公司 ${companyName} 的数据行数: ${rowCount}`);
            
            if (rowCount > 0) {
              // 使用 sp_spaceused 获取表总大小
              const spaceSql = `EXEC sp_spaceused '${tableName}'`;
              
              wx.cloud.callFunction({
                name: 'sqlServer_117',
                data: { query: spaceSql },
                success: spaceRes => {
                  const spaceData = spaceRes.result?.recordset?.[0];
                  if (spaceData) {
                    // 解析 sp_spaceused 返回的数据
                    const totalSizeKB = parseSizeToKB(spaceData.data);
                    const totalRows = parseInt(spaceData.rows.replace(/,/g, '')) || 1;
                    const ratio = Math.min(rowCount / totalRows, 1);
                    const companySpaceKB = totalSizeKB * ratio;
                    
                    results.push({
                      tableName: tableName,
                      companyRowCount: rowCount,
                      totalRows: totalRows,
                      totalSpaceKB: totalSizeKB,
                      companySpaceKB: companySpaceKB,
                      ratio: ratio
                    });
                    console.log(`表 ${tableName} 空间统计完成，公司占用: ${companySpaceKB.toFixed(2)} KB`);
                  } else {
                    results.push({
                      tableName: tableName,
                      companyRowCount: rowCount,
                      totalSpaceKB: 0,
                      companySpaceKB: 0
                    });
                  }
                  completedQueries++;
                  if (completedQueries === totalTables) {
                    calculateTotalSpace(results, callback);
                  }
                },
                fail: err => {
                  console.error(`查询表 ${tableName} 空间失败:`, err);
                  results.push({
                    tableName: tableName,
                    companyRowCount: rowCount,
                    totalSpaceKB: 0,
                    companySpaceKB: 0
                  });
                  completedQueries++;
                  if (completedQueries === totalTables) {
                    calculateTotalSpace(results, callback);
                  }
                }
              });
            } else {
              results.push({
                tableName: tableName,
                companyRowCount: 0,
                totalSpaceKB: 0,
                companySpaceKB: 0
              });
              completedQueries++;
              if (completedQueries === totalTables) {
                calculateTotalSpace(results, callback);
              }
            }
          },
          fail: err => {
            console.error(`查询表 ${tableName} 行数失败:`, err);
            results.push({
              tableName: tableName,
              companyRowCount: 0,
              totalSpaceKB: 0,
              companySpaceKB: 0
            });
            completedQueries++;
            if (completedQueries === totalTables) {
              calculateTotalSpace(results, callback);
            }
          }
        });
      },
      fail: err => {
        console.error(`检查表 ${tableName} 是否存在失败:`, err);
        results.push({
          tableName: tableName,
          companyRowCount: 0,
          totalSpaceKB: 0,
          companySpaceKB: 0
        });
        completedQueries++;
        if (completedQueries === totalTables) {
          calculateTotalSpace(results, callback);
        }
      }
    });
  }
}

/**
 * 计算总空间并回调
 */
function calculateTotalSpace(results, callback) {
  let totalSpaceKB = 0;
  const tableDetails = [];
  
  results.forEach(item => {
    totalSpaceKB += (item.companySpaceKB || 0);
    if (item.companyRowCount > 0) {
      tableDetails.push({
        tableName: item.tableName,
        spaceKB: (item.companySpaceKB || 0).toFixed(2),
        spaceMB: ((item.companySpaceKB || 0) / 1024).toFixed(2),
        rowCount: item.companyRowCount,
        ratio: ((item.ratio || 0) * 100).toFixed(2) + '%'
      });
    }
  });
  
  const result = {
    totalSpaceKB: totalSpaceKB,
    totalSpaceMB: (totalSpaceKB / 1024).toFixed(2),
    totalSpaceGB: (totalSpaceKB / (1024 * 1024)).toFixed(2),
    tableDetails: tableDetails
  };
  
  console.log('数据库空间统计结果:', result);
  
  if (callback) {
    callback(result);
  }
}

/**
 * 获取门店系统数据库空间大小
 * @param {string} companyName 公司名称
 * @param {function} callback 回调函数
 */
function getMendianDatabaseSpace(companyName, callback) {
  console.log('开始查询门店系统数据库空间（MySQL），公司:', companyName);
  
  // 🆕 处理公司名称（如果需要）
  let processedCompanyName = companyName;
  
  // 定义门店系统的表和公司字段的映射关系
  const tables = {
    "customer": "gongsi",
    "day_trading": "gongsi",
    "member_info": "company",
    "member_jibie": "company",
    "order_table": "company",
    "orders": "company",
    "orders_details": "company",
    "product": "company",
    "users": "company"
  };
  
  const results = [];
  let completedQueries = 0;
  const totalTables = Object.keys(tables).length;
  
  // 遍历所有表
  for (const [tableName, companyColumn] of Object.entries(tables)) {
    // 🆕 MySQL 检查表是否存在
    const checkTableSql = `
      SELECT COUNT(*) as cnt 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name = '${tableName}'
    `;
    
    // 门店系统使用 sqlserver_xinyongka 云函数（MySQL）
    wx.cloud.callFunction({
      name: 'sqlserver_xinyongka',
      data: { sql: checkTableSql },
      success: checkRes => {
        // 🆕 MySQL 返回的数据结构
        const resultData = checkRes.result?.recordset || checkRes.result;
        const tableExists = resultData && resultData[0]?.cnt === 1;
        
        if (!tableExists) {
          console.log(`门店系统表 ${tableName} 不存在，跳过`);
          results.push({
            tableName: tableName,
            companyRowCount: 0,
            totalSpaceKB: 0,
            companySpaceKB: 0
          });
          completedQueries++;
          if (completedQueries === totalTables) {
            calculateMendianTotalSpace(results, callback);
          }
          return;
        }
        
        // 🆕 MySQL 查询该公司的数据行数
        const countSql = `SELECT COUNT(*) as rowCount FROM ${tableName} WHERE ${companyColumn} = '${processedCompanyName}'`;
        
        wx.cloud.callFunction({
          name: 'sqlserver_xinyongka',
          data: { sql: countSql },
          success: countRes => {
            console.log(`门店系统执行语句: ${countSql}`);
            const resultData = countRes.result?.recordset || countRes.result;
            const rowCount = resultData?.[0]?.rowCount || 0;
            console.log(`门店系统表 ${tableName} 中公司 ${processedCompanyName} 的数据行数: ${rowCount}`);
            
            if (rowCount > 0) {
              // 🆕 MySQL 获取表总大小
              const spaceSql = `
                SELECT 
                  table_name AS TableName,
                  table_rows AS RowCounts,
                  ROUND(((data_length + index_length) / 1024), 2) AS TotalSpaceKB
                FROM information_schema.tables 
                WHERE table_schema = DATABASE() 
                AND table_name = '${tableName}'
              `;
              
              wx.cloud.callFunction({
                name: 'sqlserver_xinyongka',
                data: { sql: spaceSql },
                success: spaceRes => {
                  const resultData = spaceRes.result?.recordset || spaceRes.result;
                  const spaceData = resultData?.[0];
                  if (spaceData) {
                    const totalSizeKB = parseFloat(spaceData.TotalSpaceKB) || 0;
                    const totalRows = parseInt(spaceData.RowCounts) || 1;
                    const ratio = Math.min(rowCount / totalRows, 1);
                    const companySpaceKB = totalSizeKB * ratio;
                    
                    results.push({
                      tableName: tableName,
                      companyRowCount: rowCount,
                      totalRows: totalRows,
                      totalSpaceKB: totalSizeKB,
                      companySpaceKB: companySpaceKB,
                      ratio: ratio
                    });
                    console.log(`门店系统表 ${tableName} 空间统计完成，公司占用: ${companySpaceKB.toFixed(2)} KB`);
                  } else {
                    results.push({
                      tableName: tableName,
                      companyRowCount: rowCount,
                      totalSpaceKB: 0,
                      companySpaceKB: 0
                    });
                  }
                  completedQueries++;
                  if (completedQueries === totalTables) {
                    calculateMendianTotalSpace(results, callback);
                  }
                },
                fail: err => {
                  console.error(`门店系统查询表 ${tableName} 空间失败:`, err);
                  results.push({
                    tableName: tableName,
                    companyRowCount: rowCount,
                    totalSpaceKB: 0,
                    companySpaceKB: 0
                  });
                  completedQueries++;
                  if (completedQueries === totalTables) {
                    calculateMendianTotalSpace(results, callback);
                  }
                }
              });
            } else {
              results.push({
                tableName: tableName,
                companyRowCount: 0,
                totalSpaceKB: 0,
                companySpaceKB: 0
              });
              completedQueries++;
              if (completedQueries === totalTables) {
                calculateMendianTotalSpace(results, callback);
              }
            }
          },
          fail: err => {
            console.error(`门店系统查询表 ${tableName} 行数失败:`, err);
            results.push({
              tableName: tableName,
              companyRowCount: 0,
              totalSpaceKB: 0,
              companySpaceKB: 0
            });
            completedQueries++;
            if (completedQueries === totalTables) {
              calculateMendianTotalSpace(results, callback);
            }
          }
        });
      },
      fail: err => {
        console.error(`门店系统检查表 ${tableName} 是否存在失败:`, err);
        results.push({
          tableName: tableName,
          companyRowCount: 0,
          totalSpaceKB: 0,
          companySpaceKB: 0
        });
        completedQueries++;
        if (completedQueries === totalTables) {
          calculateMendianTotalSpace(results, callback);
        }
      }
    });
  }
}

/**
 * 解析大小字符串为 KB（门店系统专用）
 */
function parseMendianSizeToKB(sizeStr) {
  if (!sizeStr) return 0;
  
  sizeStr = sizeStr.trim();
  // "8 KB" 是空表的最小空间，按0处理
  if ("8 KB" === sizeStr) return 0;
  
  const parts = sizeStr.split(' ');
  if (parts.length === 2) {
    const value = parseFloat(parts[0]);
    const unit = parts[1].toUpperCase();
    
    switch (unit) {
      case 'KB': return value;
      case 'MB': return value * 1024;
      case 'GB': return value * 1024 * 1024;
      case 'TB': return value * 1024 * 1024 * 1024;
      default: return value;
    }
  }
  return 0;
}

/**
 * 计算门店系统总空间并回调
 */
function calculateMendianTotalSpace(results, callback) {
  let totalSpaceKB = 0;
  const tableDetails = [];
  
  results.forEach(item => {
    totalSpaceKB += (item.companySpaceKB || 0);
    if (item.companyRowCount > 0) {
      tableDetails.push({
        tableName: item.tableName,
        spaceKB: (item.companySpaceKB || 0).toFixed(2),
        spaceMB: ((item.companySpaceKB || 0) / 1024).toFixed(2),
        rowCount: item.companyRowCount,
        ratio: ((item.ratio || 0) * 100).toFixed(2) + '%'
      });
    }
  });
  
  const result = {
    totalSpaceKB: totalSpaceKB,
    totalSpaceMB: (totalSpaceKB / 1024).toFixed(2),
    totalSpaceGB: (totalSpaceKB / (1024 * 1024)).toFixed(2),
    tableDetails: tableDetails
  };
  
  console.log('门店系统数据库空间统计结果:', result);
  
  if (callback) {
    callback(result);
  }
}


// ==================== 教务系统空间查询 ====================
function getJiaowuDatabaseSpace(companyName, callback) {
  console.log('开始查询教务系统数据库空间（MySQL），公司:', companyName);
  
  // 🆕 处理公司名称
  let processedCompanyName = companyName;
  // 如果公司名有 _hr 后缀，去掉（根据实际情况调整）
  if (companyName && companyName.endsWith('_hr')) {
    processedCompanyName = companyName.substring(0, companyName.length - 3);
    console.log(`原始公司名: ${companyName}, 处理后公司名: ${processedCompanyName}`);
  }
  
  const tables = {
    "course": "company",
    "income": "Company",
    "kaoqin": "company",
    "keshi_detail": "Company",
    "payment": "Company",
    "power": "company",
    "shezhi": "Company",
    "student": "Company",
    "teacher": "Company",
    "teacherinfo": "company"
  };
  
  const results = [];
  let completedQueries = 0;
  const totalTables = Object.keys(tables).length;
  
  for (const [tableName, companyColumn] of Object.entries(tables)) {
    // 🆕 MySQL 检查表是否存在
    const checkTableSql = `
      SELECT COUNT(*) as cnt 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name = '${tableName}'
    `;
    
    wx.cloud.callFunction({
      name: 'sql_jiaowu',
      data: { sql: checkTableSql },
      success: checkRes => {
        // 🆕 MySQL 返回的是数组，recordset 或直接 result
        const resultData = checkRes.result?.recordset || checkRes.result;
        const tableExists = resultData && resultData[0]?.cnt === 1;
        
        if (!tableExists) {
          console.log(`教务系统表 ${tableName} 不存在，跳过`);
          results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
          completedQueries++;
          if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
          return;
        }
        
        // 🆕 MySQL 查询行数
        const countSql = `SELECT COUNT(*) as rowCount FROM ${tableName} WHERE ${companyColumn} = '${processedCompanyName}'`;
        
        wx.cloud.callFunction({
          name: 'sql_jiaowu',
          data: { sql: countSql },
          success: countRes => {
            const resultData = countRes.result?.recordset || countRes.result;
            const rowCount = resultData?.[0]?.rowCount || 0;
            console.log(`教务系统表 ${tableName} 中公司数据行数: ${rowCount}`);
            
            if (rowCount > 0) {
              // 🆕 MySQL 获取表大小
              const spaceSql = `
                SELECT 
                  table_name AS TableName,
                  table_rows AS RowCounts,
                  ROUND(((data_length + index_length) / 1024), 2) AS TotalSpaceKB
                FROM information_schema.tables 
                WHERE table_schema = DATABASE() 
                AND table_name = '${tableName}'
              `;
              
              wx.cloud.callFunction({
                name: 'sql_jiaowu',
                data: { sql: spaceSql },
                success: spaceRes => {
                  const resultData = spaceRes.result?.recordset || spaceRes.result;
                  const spaceData = resultData?.[0];
                  if (spaceData) {
                    const totalSizeKB = parseFloat(spaceData.TotalSpaceKB) || 0;
                    const totalRows = parseInt(spaceData.RowCounts) || 1;
                    const ratio = Math.min(rowCount / totalRows, 1);
                    const companySpaceKB = totalSizeKB * ratio;
                    
                    results.push({ 
                      tableName, 
                      companyRowCount: rowCount, 
                      totalRows, 
                      totalSpaceKB: totalSizeKB, 
                      companySpaceKB, 
                      ratio 
                    });
                    console.log(`教务系统表 ${tableName} 空间统计完成，公司占用: ${companySpaceKB.toFixed(2)} KB`);
                  } else {
                    results.push({ tableName, companyRowCount: rowCount, totalSpaceKB: 0, companySpaceKB: 0 });
                  }
                  completedQueries++;
                  if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
                },
                fail: err => {
                  console.error(`教务系统查询表 ${tableName} 空间失败:`, err);
                  results.push({ tableName, companyRowCount: rowCount, totalSpaceKB: 0, companySpaceKB: 0 });
                  completedQueries++;
                  if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
                }
              });
            } else {
              results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
              completedQueries++;
              if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
            }
          },
          fail: err => {
            console.error(`教务系统查询表 ${tableName} 行数失败:`, err);
            results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
            completedQueries++;
            if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
          }
        });
      },
      fail: err => {
        console.error(`教务系统检查表 ${tableName} 是否存在失败:`, err);
        results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
        completedQueries++;
        if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
      }
    });
  }
}

// ==================== 排产系统空间查询 ====================
function getPaichanDatabaseSpace(companyName, callback) {
  console.log('开始查询排产系统数据库空间，公司:', companyName);
  
  const tables = {
    "bom_info": "company",
    "department": "company",
    "holiday_config": "company",
    "module_type": "company",
    "order_check": "company",
    "order_info": "company",
    "paibanbiao_info": "remarks1",
    "paibanbiao_renyuan": "company",
    "paibanbiao_detail": "company",
    "shengchanxian": "gongsi",
    "time_config": "company",
    "user_info": "company",
    "work_detail": "company"
  };
  
  const results = [];
  let completedQueries = 0;
  const totalTables = Object.keys(tables).length;
  
  for (const [tableName, companyColumn] of Object.entries(tables)) {
    const checkTableSql = `SELECT COUNT(*) as cnt FROM sysobjects WHERE xtype='U' AND name='${tableName}'`;
    
    // 🆕 排产系统使用 sqlServer_PC 云函数
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: { query: checkTableSql },
      success: checkRes => {
        const tableExists = checkRes.result?.recordset?.[0]?.cnt === 1;
        
        if (!tableExists) {
          console.log(`排产系统表 ${tableName} 不存在，跳过`);
          results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
          completedQueries++;
          if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
          return;
        }
        
        const countSql = `SELECT id FROM ${tableName} WHERE ${companyColumn} = '${companyName}'`;
        
        wx.cloud.callFunction({
          name: 'sqlServer_PC',
          data: { query: countSql },
          success: countRes => {
            const rowCount = countRes.result?.recordset?.length || 0;
            console.log(`排产系统表 ${tableName} 中公司数据行数: ${rowCount}`);
            
            if (rowCount > 0) {
              const spaceSql = `EXEC sp_spaceused '${tableName}'`;
              
              wx.cloud.callFunction({
                name: 'sqlServer_PC',
                data: { query: spaceSql },
                success: spaceRes => {
                  const spaceData = spaceRes.result?.recordset?.[0];
                  if (spaceData) {
                    const totalSizeKB = parseSizeToKB(spaceData.data);
                    const totalRows = parseInt(spaceData.rows.replace(/,/g, '')) || 1;
                    const ratio = Math.min(rowCount / totalRows, 1);
                    const companySpaceKB = totalSizeKB * ratio;
                    
                    results.push({ tableName, companyRowCount: rowCount, totalRows, totalSpaceKB: totalSizeKB, companySpaceKB, ratio });
                    console.log(`排产系统表 ${tableName} 空间统计完成，公司占用: ${companySpaceKB.toFixed(2)} KB`);
                  } else {
                    results.push({ tableName, companyRowCount: rowCount, totalSpaceKB: 0, companySpaceKB: 0 });
                  }
                  completedQueries++;
                  if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
                },
                fail: err => {
                  console.error(`排产系统查询表 ${tableName} 空间失败:`, err);
                  results.push({ tableName, companyRowCount: rowCount, totalSpaceKB: 0, companySpaceKB: 0 });
                  completedQueries++;
                  if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
                }
              });
            } else {
              results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
              completedQueries++;
              if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
            }
          },
          fail: err => {
            console.error(`排产系统查询表 ${tableName} 行数失败:`, err);
            results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
            completedQueries++;
            if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
          }
        });
      },
      fail: err => {
        console.error(`排产系统检查表 ${tableName} 是否存在失败:`, err);
        results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
        completedQueries++;
        if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
      }
    });
  }
}

// ==================== 财务系统空间查询 ====================
function getCaiwuDatabaseSpace(companyName, callback) {
  console.log('开始查询财务系统数据库空间，公司:', companyName);
  
  const tables = {
    "Account": "company",
    "Accounting": "company",
    "Department": "company",
    "FinancingExpenditure": "company",
    "FinancingIncome": "company",
    "gongzimingxi": "company",
    "InvestmentExpenditure": "company",
    "InvestmentIncome": "company",
    "Invoice": "company",
    "InvoicePeizhi": "company",
    "KehuPeizhi": "company",
    "ManagementExpenditure": "company",
    "ManagementIncome": "company",
    "shuilvPeizhi": "company",
    "SimpleAccounting": "company",
    "SimpleData": "company",
    "VoucherSummary": "company",
    "VoucherWord": "company",
    "waibiPeizhi": "company",
    "ysyfpeizhi": "company"
  };
  
  const results = [];
  let completedQueries = 0;
  const totalTables = Object.keys(tables).length;
  
  for (const [tableName, companyColumn] of Object.entries(tables)) {
    const checkTableSql = `SELECT COUNT(*) as cnt FROM sysobjects WHERE xtype='U' AND name='${tableName}'`;
    
    // 🆕 财务系统使用 sqlServer_cw 云函数
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: { query: checkTableSql },
      success: checkRes => {
        const tableExists = checkRes.result?.recordset?.[0]?.cnt === 1;
        
        if (!tableExists) {
          console.log(`财务系统表 ${tableName} 不存在，跳过`);
          results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
          completedQueries++;
          if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
          return;
        }
        
        const countSql = `SELECT id FROM ${tableName} WHERE ${companyColumn} = '${companyName}'`;
        
        wx.cloud.callFunction({
          name: 'sqlServer_cw',
          data: { query: countSql },
          success: countRes => {
            const rowCount = countRes.result?.recordset?.length || 0;
            console.log(`财务系统表 ${tableName} 中公司数据行数: ${rowCount}`);
            
            if (rowCount > 0) {
              const spaceSql = `EXEC sp_spaceused '${tableName}'`;
              
              wx.cloud.callFunction({
                name: 'sqlServer_cw',
                data: { query: spaceSql },
                success: spaceRes => {
                  const spaceData = spaceRes.result?.recordset?.[0];
                  if (spaceData) {
                    const totalSizeKB = parseSizeToKB(spaceData.data);
                    const totalRows = parseInt(spaceData.rows.replace(/,/g, '')) || 1;
                    const ratio = Math.min(rowCount / totalRows, 1);
                    const companySpaceKB = totalSizeKB * ratio;
                    
                    results.push({ tableName, companyRowCount: rowCount, totalRows, totalSpaceKB: totalSizeKB, companySpaceKB, ratio });
                    console.log(`财务系统表 ${tableName} 空间统计完成，公司占用: ${companySpaceKB.toFixed(2)} KB`);
                  } else {
                    results.push({ tableName, companyRowCount: rowCount, totalSpaceKB: 0, companySpaceKB: 0 });
                  }
                  completedQueries++;
                  if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
                },
                fail: err => {
                  console.error(`财务系统查询表 ${tableName} 空间失败:`, err);
                  results.push({ tableName, companyRowCount: rowCount, totalSpaceKB: 0, companySpaceKB: 0 });
                  completedQueries++;
                  if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
                }
              });
            } else {
              results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
              completedQueries++;
              if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
            }
          },
          fail: err => {
            console.error(`财务系统查询表 ${tableName} 行数失败:`, err);
            results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
            completedQueries++;
            if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
          }
        });
      },
      fail: err => {
        console.error(`财务系统检查表 ${tableName} 是否存在失败:`, err);
        results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
        completedQueries++;
        if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
      }
    });
  }
}

// ==================== 进销存系统空间查询 ====================
function getJinxiaocunDatabaseSpace(companyName, callback) {
  console.log('开始查询进销存系统数据库空间（MySQL），公司:', companyName);
  
  // 🆕 处理公司名称
  let processedCompanyName = companyName;
  // 如果公司名有特殊后缀，在这里处理
  // if (companyName && companyName.endsWith('_jxc')) {
  //   processedCompanyName = companyName.substring(0, companyName.length - 4);
  // }
  
  const tables = {
    "yh_jinxiaocun_cangku": "gongsi",
    "yh_jinxiaocun_chuhuofang": "gongsi",
    "yh_jinxiaocun_jichuziliao": "gs_name",
    "yh_jinxiaocun_jinhuofang": "gongsi",
    "yh_jinxiaocun_mingxi": "gs_name",
    "yh_jinxiaocun_qichushu": "gs_name",
    "yh_jinxiaocun_tuihuomingxi": "gs_name",
    "yh_jinxiaocun_user": "gongsi",
    "yh_jinxiaocun_zhengli": "gs_name"
  };
  
  const results = [];
  let completedQueries = 0;
  const totalTables = Object.keys(tables).length;
  
  for (const [tableName, companyColumn] of Object.entries(tables)) {
    // 🆕 MySQL 检查表是否存在
    const checkTableSql = `
      SELECT COUNT(*) as cnt 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name = '${tableName}'
    `;
    
    // 进销存系统使用 sqlConnection 云函数（MySQL）
    wx.cloud.callFunction({
      name: 'sqlConnection',
      data: { sql: checkTableSql },
      success: checkRes => {
        // 🆕 MySQL 返回的数据结构
        const resultData = checkRes.result?.recordset || checkRes.result;
        const tableExists = resultData && resultData[0]?.cnt === 1;
        
        if (!tableExists) {
          console.log(`进销存系统表 ${tableName} 不存在，跳过`);
          results.push({ 
            tableName, 
            companyRowCount: 0, 
            totalSpaceKB: 0, 
            companySpaceKB: 0 
          });
          completedQueries++;
          if (completedQueries === totalTables) calculateJinxiaocunTotalSpace(results, callback);
          return;
        }
        
        // 🆕 MySQL 查询该公司的数据行数
        const countSql = `SELECT COUNT(*) as rowCount FROM ${tableName} WHERE ${companyColumn} = '${processedCompanyName}'`;
        
        wx.cloud.callFunction({
          name: 'sqlConnection',
          data: { sql: countSql },
          success: countRes => {
            const resultData = countRes.result?.recordset || countRes.result;
            const rowCount = resultData?.[0]?.rowCount || 0;
            console.log(`进销存系统表 ${tableName} 中公司数据行数: ${rowCount}`);
            
            if (rowCount > 0) {
              // 🆕 MySQL 获取表总大小
              const spaceSql = `
                SELECT 
                  table_name AS TableName,
                  table_rows AS RowCounts,
                  ROUND(((data_length + index_length) / 1024), 2) AS TotalSpaceKB
                FROM information_schema.tables 
                WHERE table_schema = DATABASE() 
                AND table_name = '${tableName}'
              `;
              
              wx.cloud.callFunction({
                name: 'sqlConnection',
                data: { sql: spaceSql },
                success: spaceRes => {
                  const resultData = spaceRes.result?.recordset || spaceRes.result;
                  const spaceData = resultData?.[0];
                  if (spaceData) {
                    const totalSizeKB = parseFloat(spaceData.TotalSpaceKB) || 0;
                    const totalRows = parseInt(spaceData.RowCounts) || 1;
                    const ratio = Math.min(rowCount / totalRows, 1);
                    const companySpaceKB = totalSizeKB * ratio;
                    
                    results.push({ 
                      tableName, 
                      companyRowCount: rowCount, 
                      totalRows, 
                      totalSpaceKB: totalSizeKB, 
                      companySpaceKB, 
                      ratio 
                    });
                    console.log(`进销存系统表 ${tableName} 空间统计完成，公司占用: ${companySpaceKB.toFixed(2)} KB`);
                  } else {
                    results.push({ 
                      tableName, 
                      companyRowCount: rowCount, 
                      totalSpaceKB: 0, 
                      companySpaceKB: 0 
                    });
                  }
                  completedQueries++;
                  if (completedQueries === totalTables) calculateJinxiaocunTotalSpace(results, callback);
                },
                fail: err => {
                  console.error(`进销存系统查询表 ${tableName} 空间失败:`, err);
                  results.push({ 
                    tableName, 
                    companyRowCount: rowCount, 
                    totalSpaceKB: 0, 
                    companySpaceKB: 0 
                  });
                  completedQueries++;
                  if (completedQueries === totalTables) calculateJinxiaocunTotalSpace(results, callback);
                }
              });
            } else {
              results.push({ 
                tableName, 
                companyRowCount: 0, 
                totalSpaceKB: 0, 
                companySpaceKB: 0 
              });
              completedQueries++;
              if (completedQueries === totalTables) calculateJinxiaocunTotalSpace(results, callback);
            }
          },
          fail: err => {
            console.error(`进销存系统查询表 ${tableName} 行数失败:`, err);
            results.push({ 
              tableName, 
              companyRowCount: 0, 
              totalSpaceKB: 0, 
              companySpaceKB: 0 
            });
            completedQueries++;
            if (completedQueries === totalTables) calculateJinxiaocunTotalSpace(results, callback);
          }
        });
      },
      fail: err => {
        console.error(`进销存系统检查表 ${tableName} 是否存在失败:`, err);
        results.push({ 
          tableName, 
          companyRowCount: 0, 
          totalSpaceKB: 0, 
          companySpaceKB: 0 
        });
        completedQueries++;
        if (completedQueries === totalTables) calculateJinxiaocunTotalSpace(results, callback);
      }
    });
  }
}
/**
 * 计算进销存系统总空间并回调
 */
function calculateJinxiaocunTotalSpace(results, callback) {
  let totalSpaceKB = 0;
  const tableDetails = [];
  
  results.forEach(item => {
    totalSpaceKB += (item.companySpaceKB || 0);
    if (item.companyRowCount > 0) {
      tableDetails.push({
        tableName: item.tableName,
        spaceKB: (item.companySpaceKB || 0).toFixed(2),
        spaceMB: ((item.companySpaceKB || 0) / 1024).toFixed(2),
        rowCount: item.companyRowCount,
        ratio: ((item.ratio || 0) * 100).toFixed(2) + '%'
      });
    }
  });
  
  const result = {
    totalSpaceKB: totalSpaceKB,
    totalSpaceMB: (totalSpaceKB / 1024).toFixed(2),
    totalSpaceGB: (totalSpaceKB / (1024 * 1024)).toFixed(2),
    tableDetails: tableDetails
  };
  
  console.log('进销存系统数据库空间统计结果:', result);
  
  if (callback) {
    callback(result);
  }
}

// ==================== 人事系统空间查询 ====================
function getRenshiDatabaseSpace(companyName, callback) {
  console.log('开始查询人事系统数据库空间，公司:', companyName);

  if (companyName && companyName.endsWith('_hr')) {
    companyName = companyName.substring(0, companyName.length - 3);
  }
  
  const tables = {
    "gongzi_dongtaimingxi": "gongsi",
    "gongzi_gongzimingxi": "BD",
    "gongzi_jianliguanli": "gongsi",
    "gongzi_kaoqinjilu": "AO",
    "gongzi_kaoqinmingxi": "K",
    "gongzi_lizhishenpi": "gongsi",
    "gongzi_shenpi": "gongsi",
    "gongzi_shezhi": "gongsi",
    "gongzi_renyuan": "L",
    "gongzi_qingjiashenpi": "gongsi"
  };
  
  const results = [];
  let completedQueries = 0;
  const totalTables = Object.keys(tables).length;
  
  for (const [tableName, companyColumn] of Object.entries(tables)) {
    const checkTableSql = `SELECT COUNT(*) as cnt FROM sysobjects WHERE xtype='U' AND name='${tableName}'`;
    
    // 🆕 人事系统使用 sqlServer_117 云函数
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: { query: checkTableSql },
      success: checkRes => {
        const tableExists = checkRes.result?.recordset?.[0]?.cnt === 1;
        
        if (!tableExists) {
          console.log(`人事系统表 ${tableName} 不存在，跳过`);
          results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
          completedQueries++;
          if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
          return;
        }
        
        const countSql = `SELECT id FROM ${tableName} WHERE ${companyColumn} = '${companyName}'`;
        
        wx.cloud.callFunction({
          name: 'sqlServer_117',
          data: { query: countSql },
          success: countRes => {
            const rowCount = countRes.result?.recordset?.length || 0;
            console.log(`人事系统表 ${tableName} 中公司数据行数: ${rowCount}`);
            
            if (rowCount > 0) {
              const spaceSql = `EXEC sp_spaceused '${tableName}'`;
              
              wx.cloud.callFunction({
                name: 'sqlServer_117',
                data: { query: spaceSql },
                success: spaceRes => {
                  const spaceData = spaceRes.result?.recordset?.[0];
                  if (spaceData) {
                    const totalSizeKB = parseSizeToKB(spaceData.data);
                    const totalRows = parseInt(spaceData.rows.replace(/,/g, '')) || 1;
                    const ratio = Math.min(rowCount / totalRows, 1);
                    const companySpaceKB = totalSizeKB * ratio;
                    
                    results.push({ tableName, companyRowCount: rowCount, totalRows, totalSpaceKB: totalSizeKB, companySpaceKB, ratio });
                    console.log(`人事系统表 ${tableName} 空间统计完成，公司占用: ${companySpaceKB.toFixed(2)} KB`);
                  } else {
                    results.push({ tableName, companyRowCount: rowCount, totalSpaceKB: 0, companySpaceKB: 0 });
                  }
                  completedQueries++;
                  if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
                },
                fail: err => {
                  console.error(`人事系统查询表 ${tableName} 空间失败:`, err);
                  results.push({ tableName, companyRowCount: rowCount, totalSpaceKB: 0, companySpaceKB: 0 });
                  completedQueries++;
                  if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
                }
              });
            } else {
              results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
              completedQueries++;
              if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
            }
          },
          fail: err => {
            console.error(`人事系统查询表 ${tableName} 行数失败:`, err);
            results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
            completedQueries++;
            if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
          }
        });
      },
      fail: err => {
        console.error(`人事系统检查表 ${tableName} 是否存在失败:`, err);
        results.push({ tableName, companyRowCount: 0, totalSpaceKB: 0, companySpaceKB: 0 });
        completedQueries++;
        if (completedQueries === totalTables) calculateSystemTotalSpace(results, callback);
      }
    });
  }
}

// ==================== 通用解析和计算函数 ====================
/**
 * 解析大小字符串为 KB
 */
function parseSizeToKB(sizeStr) {
  if (!sizeStr) return 0;
  sizeStr = sizeStr.trim();
  if ("8 KB" === sizeStr) return 0;
  
  const parts = sizeStr.split(' ');
  if (parts.length === 2) {
    const value = parseFloat(parts[0]);
    const unit = parts[1].toUpperCase();
    switch (unit) {
      case 'KB': return value;
      case 'MB': return value * 1024;
      case 'GB': return value * 1024 * 1024;
      case 'TB': return value * 1024 * 1024 * 1024;
      default: return value;
    }
  }
  return 0;
}

/**
 * 计算系统总空间并回调
 */
function calculateSystemTotalSpace(results, callback) {
  let totalSpaceKB = 0;
  const tableDetails = [];
  
  results.forEach(item => {
    totalSpaceKB += (item.companySpaceKB || 0);
    if (item.companyRowCount > 0) {
      tableDetails.push({
        tableName: item.tableName,
        spaceKB: (item.companySpaceKB || 0).toFixed(2),
        spaceMB: ((item.companySpaceKB || 0) / 1024).toFixed(2),
        rowCount: item.companyRowCount,
        ratio: ((item.ratio || 0) * 100).toFixed(2) + '%'
      });
    }
  });
  
  const result = {
    totalSpaceKB: totalSpaceKB,
    totalSpaceMB: (totalSpaceKB / 1024).toFixed(2),
    totalSpaceGB: (totalSpaceKB / (1024 * 1024)).toFixed(2),
    tableDetails: tableDetails
  };
  
  console.log('数据库空间统计结果:', result);
  
  if (callback) {
    callback(result);
  }
}

//==================数据库空间获取============
var login = function(that,info) {
  var lock = that.data.lock;
  if(!lock){
    return;
  }else{
    that.setData({
      lock : false
    })
  }
  
  var finduser, passwod, adminis, gongsi;
  var listAll = [];
  const db = wx.cloud.database();
  var gongsi = app.globalData.gongsi
  console.log("1212",that.data.gongsi)
  //财务
  var system = that.data.system
  if (system=="云合人事管理系统") {
    console.log("1")
    var login = false;
    //人资管理系统
    console.log("ligng")
    var sql = "select id,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,AA,AB,AC,AD,wechart_user from gongzi_renyuan where L = '" + that.data.gongsi + "' and J = '" + info.inputPwd + "' and I ='" + info.inputName + "'"
    console.log(sql)
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: sql
      },
      success: res => {
        console.log("小程序连接数据库成功,返回res为: ", res.result.recordset)

        if (res.result.recordset && res.result.recordset.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.recordset.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result.recordset);
        }

        if (res.result.recordset.length > 0) {
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url: '../home/home?id='+res.result.recordset[0].id + '&userInfo=' + JSON.stringify(res.result.recordset[0])
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
          app.globalData.gongsi = that.data.gongsi;
          app.globalData.userNum = that.data.userNum;
        } else {
          console.log("数据库返回为空！返回res长度为：", res.result.recordset.length)
          wx.showToast({
            title: '输入有误 请重试',
            icon: 'none',
          })
        }
      },
      err: res => {
        console.log("错误!", res)
      },
      complete : function(){
        that.setData({
          lock : true
        })
      }
    })
  } else if(system=="云合未来财务系统"){
    console.log("财务管理")
    //财务管理
    var sql = "select id,company,pwd,do,name,salt,bianhao,wechart_user,xingming from Account where name = '"+info.inputName+"' and pwd = '"+info.inputPwd+"' and company = '"+that.data.gongsi+"'"
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {

        if (res.result.recordset && res.result.recordset.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.recordset.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result.recordset);
        }

        if (res.result.recordset.length > 0) {
          var userInfo = res.result.recordset[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url: '../c_home/c_home?userInfo='+ JSON.stringify(userInfo)
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
          app.globalData.userInfo = userInfo
          app.globalData.userNum = that.data.userNum;
          console.log(app.globalData.userInfo)
        } else {
          console.log("数据库返回为空！返回res长度为：", res.result.recordset.length)
          wx.showToast({
            title: '输入有误 请重试',
            icon: 'none',
          })
        }
      },
      fail: res => {
        console.log("小程序连接数据库失败")
        wx.showToast({
          title: '连接数据库出错',
          image: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/icon-no.png",
          mask: true,
          duration: 1000
        })
      },
      complete : function(){
        that.setData({
          lock : true
        })
      }
    })
  }else if(system=="云合未来进销存系统"){
    //进销存
    console.log("2")
    wx.cloud.callFunction({
      name: "sqlConnection",
      data: {
        sql: "select _id,AdminIS,Btype,Createdate,_openid,gongsi,jigoudaima,name,password,mi_bao,C_id,wechart_user from yh_jinxiaocun_user where gongsi = '" + that.data.gongsi + "' and `password` = '" + that.data.pwd + "' and `name` ='" + that.data.name + "'"
      },
      success(res) {
        console.log("成功", res)

        if (res.result && res.result.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result);
        }

        if (res.result.length > 0) {
          listAll.push(res.result)
          gongsi = listAll[0][0].gongsi,
            finduser = listAll[0][0].name,
            passwod = listAll[0][0].password,

            adminis = listAll[0][0].AdminIS,
            // openid = listAll[0]._openid,          
            // app.globalData.openid = openid,
            app.globalData.finduser = finduser,
            app.globalData.passwod = passwod,
            app.globalData.adminis = adminis,
            app.globalData.gongsi = gongsi
            app.globalData.userNum = that.data.userNum;
            app.globalData.shujuku = 0,
          console.log("密码对")
          //登录状态写入缓存
          wx.setStorage({
            key: "IsLogin",
            data: true
          })
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.switchTab({
            url: '../shouye/shouye'
          })
        } else {
          wx.cloud.callFunction({
            name: "sqlServer_117",
            data: {
              query: "select _id,AdminIS,Btype,Createdate,_openid,gongsi,jigoudaima,name,password,mi_bao,C_id,wechart_user from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_user_mssql where gongsi = '" + that.data.gongsi + "' and [password] = '" + that.data.pwd + "' and [name] = '" + that.data.name + "'"
            },
            success(res) {
              console.log("成功", res.result.recordset)
      
              var recordset = res.result.recordset || [];

            if (recordset && recordset.length > 0) {
              // 遍历所有记录，删除touxiang字段
              recordset.forEach(function(row) {
                delete row.touxiang;
              });
              console.log("处理后数据（已删除touxiang字段）: ", recordset);
            }

            if (recordset.length > 0) {
              listAll.push(recordset)
              gongsi = listAll[0][0].gongsi,
                finduser = listAll[0][0].name,
                passwod = listAll[0][0].password,

                adminis = listAll[0][0].AdminIS,
                // openid = listAll[0]._openid,          
                // app.globalData.openid = openid,
                app.globalData.finduser = finduser,
                app.globalData.passwod = passwod,
                app.globalData.adminis = adminis,
                app.globalData.gongsi = gongsi
                app.globalData.userNum = that.data.userNum;
                app.globalData.shujuku = 1,
              console.log("密码对")
                //登录状态写入缓存
                wx.setStorage({
                  key: "IsLogin",
                  data: true
                })
                if(that.data.jizhu_panduan){
                  that.remember_user(info.inputName,info.inputPwd)
                }else{
                  that.remove_user()
                }
                wx.switchTab({
                  url: '../shouye/shouye'
                })
              } else {
                console.log("密码错误")
                wx.showToast({
                  title: '密码错误',
                  image: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/icon-no.png",
                  mask: true,
                  duration: 1000
                })
              }
              wx.hideNavigationBarLoading(); //隐藏加载
              wx.stopPullDownRefresh();
            },
            fail(res) {
              console.log("失败", res)
            },
            complete : function(){
              that.setData({
                lock : true
              })
            }
          })
        }
        wx.hideNavigationBarLoading(); //隐藏加载
        wx.stopPullDownRefresh();
      },
      fail(res) {
        console.log("失败", res)
      },
      complete : function(){
        that.setData({
          lock : true
        })
      }
    })
  }else if(system=="云合教务管理系统"){
    //进销存
    console.log("2")
    wx.cloud.callFunction({
      name: "sql_jiaowu",
      data: {
        sql: "select ID,UserName,Password,RealName,UseType,Age,Phone,Home,photo,Education,Company,state,wechart_user from teacher where Company = '" + that.data.gongsi + "' and `Password` = '" + that.data.pwd + "' and `UserName` ='" + that.data.name + "'"
      },
      success(res) {
        console.log("成功", res)

        if (res.result && res.result.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result);
        }

 

        if (res.result.length > 0) {
          
          var userInfo = res.result[0]
          console.log(userInfo)
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url: '../../package_jiaowu/pages/shows/shows?userInfo='+JSON.stringify(userInfo)
          })
          app.globalData.userNum = that.data.userNum;
          app.globalData.shujuku = 0;
        } else {
          wx.cloud.callFunction({
            name: "sqlServer_117",
            data: {
              query: "select ID,UserName,Password,RealName,UseType,Age,Phone,Home,photo,Education,Company,state,wechart_user from xueshengguanlixitong_excel.dbo.teacher where Company = '" + that.data.gongsi + "' and [Password] = '" + that.data.pwd + "' and [UserName] = '" + that.data.name + "'"
            },
            success(res) {
              console.log("成功", res)
              if (res.result.recordset.length > 0) {
                var userInfo = res.result.recordset[0]
                console.log(userInfo)
                if(that.data.jizhu_panduan){
                  that.remember_user(info.inputName,info.inputPwd)
                }else{
                  that.remove_user()
                }
                wx.navigateTo({
                  url: '../../package_jiaowu/pages/shows/shows?userInfo='+JSON.stringify(userInfo)
                })
                app.globalData.userNum = that.data.userNum;
                app.globalData.shujuku = 1;
              } else {
                console.log("密码错误")
                wx.showToast({
                  title: '密码错误',
                  image: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/icon-no.png",
                  mask: true,
                  duration: 1000
                })
              }
              wx.hideNavigationBarLoading(); //隐藏加载
              wx.stopPullDownRefresh();
            },
            fail(res) {
              console.log("失败", res)
            },
            complete : function(){
              that.setData({
                lock : true
              })
            }
          })
        }
        wx.hideNavigationBarLoading(); //隐藏加载
        wx.stopPullDownRefresh();
      },
      fail(res) {
        console.log("失败", res)
      },
      complete : function(){
        that.setData({
          lock : true
        })
      }
    })
  }
  
  else if(system=="零售管理系统"){
    wx.showLoading({
      title: '正在登录',
      mask: true
    })
    //零售管理系统
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select id,userName,password,power,shop from zeng_user where userName = '"+info.inputName+"' and password = '"+info.inputPwd+"' and shop = '"+that.data.gongsi+"'"
      },
      success: res => {
        wx.hideLoading({
          success: (res) => {},
        })
        if (res.result.recordset.length > 0) {
          var userInfo = res.result.recordset[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url: '../z_home/z_home?userInfo='+ JSON.stringify(userInfo)
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
        } else {
          wx.showToast({
            title: '用户名密码错误',
            icon: 'none',
          })
        }
      },
      fail: res => {
        console.log("小程序连接数据库失败")
        wx.showToast({
          title: '连接数据库出错，请联系我公司',
          mask: true,
        })
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  }else if(system=="云合分权编辑系统"){
    var ssql = "select B,C,D,E,renyuan_id,zhuangtai,email,phone,bianhao,quanxian_id,bumen,wechart_user from baitaoquanxian_renyun where B = '" + that.data.gongsi + "' and E = '" + info.inputPwd + "' and D ='" + info.inputName + "'"
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data:{
        query : ssql
      },
      success(res){       

        if (res.result.recordset && res.result.recordset.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.recordset.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result.recordset);
        }
        
        if(res.result.recordset.length > 0){
          let user = res.result.recordset[0]
          if(user.zhuangtai != '正常'){
            wx.showToast({
              title: '此账号已被锁定',
              icon:"none"
            })
            return;
          }
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url: '../../100lie_page/pages/shows/shows?userInfo='+JSON.stringify(user)
          })
          app.globalData.userNum = that.data.userNum;
          wx.showToast({
            title: '登录成功',
          })
        }else{
          wx.showToast({
            title: '用户名或密码错误',
            icon:"none"
          })
        }
      },
      fail(res) {
        console.log("失败", res)
      },
      complete : function(){
        that.setData({
          lock : true
        })
      }
    })
  } else if(system=="零售管理系统"){
    wx.showLoading({
      title: '正在登录',
      mask: true
    })
    //零售管理系统
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "select id,userName,password,power,shop from zeng_user where userName = '"+info.inputName+"' and password = '"+info.inputPwd+"' and shop = '"+that.data.gongsi+"'"
      },
      success: res => {
        if (res.result.recordset.length > 0) {
          var userInfo = res.result.recordset[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url: '../z_home/z_home?userInfo='+ JSON.stringify(userInfo)
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
        } else {
          wx.showToast({
            title: '用户名密码错误',
            icon: 'none',
          })
        }
      },
      fail: res => {
        console.log("小程序连接数据库失败")
        wx.showToast({
          title: '连接数据库出错，请联系我公司',
          mask: true,
        })
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  }else if(system=="云合智慧门店收银系统") {
    var xsql = "select id,company,position,uname,account,password,wechart_user from users where company = '" + that.data.gongsi + "' and password = '" + info.inputPwd + "' and account ='" + info.inputName + "'"
    wx.cloud.callFunction({
      
      name: 'sqlserver_xinyongka',
      data: {
        sql: xsql
      },
      success(res) {

        if (res.result && res.result.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result);
          console.log("处理mima: ", res.result[0].password);
        }

        if (res.result.length > 0) {
          if (info.inputName == "bbb") {
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            
            wx.navigateTo({
              url: '../x_home/x_home?company=' + that.data.gongsi + '&uname=' + info.inputName + '&id=' + res.result[0].id + '&position=' + res.result[0].position + '&zname=' + res.result[0].uname + '&password=' + res.result[0].password
            })
            wx.showToast({
              title: '登录成功',
            })
          } else {
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            wx.navigateTo({
              url: '../x_home/x_home?company=' + that.data.gongsi + '&uname=' + info.inputName + '&id=' + res.result[0].id + '&position=' + res.result[0].position + '&zname=' + res.result[0].uname + '&password=' + res.result[0].password
            })
            wx.showToast({
              title: '登录成功',
            })

          }
          app.globalData.userNum = that.data.userNum;

        } else {
          wx.showToast({
            title: '用户名密码不对',
            icon: "none"
          })

        }

      },
      fail(res) {
        console.log("失败", res)
      },
      complete: function () {
        that.setData({
          lock: true
        })
      }
    })

  } else if (system == "云合排产管理系统") {
    wx.showLoading({
      title: '正在登录',
      mask: true
    })
    //零售管理系统
    wx.cloud.callFunction({
      name: 'sqlServer_PC',
      data: {
        query: "select id,user_code,password,company,department_name,state,wechart_user from user_info where user_code = '" + info.inputName + "' and password = '" + info.inputPwd + "' and company = '" + that.data.gongsi + "'"
      },
      success: res => {
        wx.hideLoading({
          success: (res) => { },
        })

        if (res.result.recordset && res.result.recordset.length > 0) {
          // 遍历所有记录，删除touxiang字段
          res.result.recordset.forEach(function(row) {
            delete row.touxiang;
          });
          console.log("处理后数据（已删除touxiang字段）: ", res.result.recordset);
        }

        //app.paichan_user.gongsi = that.data.gongsi
        if (res.result.recordset.length > 0) {
          var userInfo = res.result.recordset[0]
          console.log("denglu",userInfo)
          if(userInfo.state != '正常'){
            wx.showToast({
              title: '此账号已被锁定',
              icon: 'none'
            })
            return;
          }
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            // url: '../../packageP/page/PeiZhiBiao/PeiZhiBiao'
            url: '../../packageP/page/PeiZhiBiao/PeiZhiBiao?userInfo='+JSON.stringify(userInfo)
          })
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })
          console.log("paichan"+info.inputName)
          app.globalData.gongsi = that.data.gongsi
          app.globalData.finduser = info.inputName
          app.globalData.userNum = that.data.userNum;
        } else {
          wx.showToast({
            title: '用户名密码错误',
            icon: 'none',
          })
        }
      },
      fail: res => {
        console.log("小程序连接数据库失败")
        wx.showToast({
          title: '连接数据库出错，请联系我公司',
          mask: true,
        })
      },
      complete: () => {
        that.setData({
          lock: true
        })
      }
    })

    //803登录  20210709  胡超
  }else if(system =="智居生产平台"){
    console.log("803登录")
    wx.showLoading({
      title:'正在登录...'
    })
    var sql = "select * from user_info where username = '" + info.inputName + "' and password = '" + info.inputPwd + "';select customerName as name,zhanghao as username,mima as password,'客户' as quanxian,khpower from customerInformation where zhanghao = '" + info.inputName + "' and mima = '" + info.inputPwd + "' and zhanghao != '' and mima != ''";
    
    wx.cloud.callFunction({
      
      name: 'sqlServer_tb3999803',
      data: {
        query: sql
      },
      success(res) {
        console.log(res)
        if(res.result.recordsets[0].length == 0 && res.result.recordsets[1].length == 0 && info.inputName == '' && info.inputPwd == ''){
          wx.hideLoading()
          
          wx.showModal({
            title: "提示",
            content: '是否以游客身份登录?',
            cancelColor: '#282B33',
            confirmColor: '#BC4A4A',
            success: res => {
              if (res.confirm) {
                var userInfo = {
                  name: '游客',
                  username: '',
                  password: '',
                  quanxian: '游客',
                }
                wx.navigateTo({
                  url: '../../package_tb3999803/pages/chanpin/chanpin?userInfo=' + JSON.stringify(userInfo)
                })
              } else if (res.cancel) {
                wx.showToast({
                  title: '已取消',
                  icon: 'none',
                  duration: 3000
                })
              }
            }
          })
          // wx.showToast({
          //   title: '用户密码错误',
          //   icon: 'none'
          // })
        }
        else if(res.result.recordsets[0].length == 0 && res.result.recordsets[1].length == 0){
          wx.hideLoading()
          wx.showToast({
            title: '用户密码错误',
            icon: 'none'
          })
        }else{
          if (res.result.recordsets[0].length > 0) {
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            console.log("跳转")
            wx.navigateTo({
              url: '../../package_tb3999803/pages/wode/wode?userInfo=' + JSON.stringify(res.result.recordsets[0][0])
            })
            wx.hideLoading()
            wx.showToast({
              title: '登录成功',
            })
          }else if (res.result.recordsets[1].length > 0) {
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            console.log("跳转")
            wx.navigateTo({
              url: '../../package_tb3999803/pages/wode/wode?userInfo=' + JSON.stringify(res.result.recordsets[1][0])
            })
            wx.hideLoading()
            wx.showToast({
              title: '登录成功',
            })
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '用户名密码错误',
              icon: "none"
            })
          }
        }
      },
      fail(res) {
        wx.hideLoading()
        console.log("失败", res)
      },
      complete: function () {
        that.setData({
          lock: true
        })
      }
    })
  //结束
  
  }else if(system =="合同管理系统"){
    console.log("合同管理系统")
    //合同管理系统
    var sql = "select * from contract_personnel where user_name = '"+info.inputName+"' and password = '"+info.inputPwd+"' and company = '"+that.data.gongsi+"'"
    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: sql
      },
      success: res => {
        if (res.result.recordset.length > 0) {
          var userInfo = res.result.recordset[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url: '../../packageH/page/index/index?userInfo='+ JSON.stringify(userInfo)
          })
          wx.showToast({
            title: '登录成功',
            icon:'success'
          })
          app.globalData.userInfo = userInfo
          console.log(app.globalData.userInfo)
        } else {
          console.log("数据库返回为空！返回res长度为：", res.result.recordset.length)
          wx.showToast({
            title: '输入有误 请重试',
            icon: 'none',
          })
        }
      },
      fail: res => {
        console.log("小程序连接数据库失败")
        wx.showToast({
          title: '连接数据库出错',
          image: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/icon-no.png",
          mask: true,
          duration: 1000
        })
      },
      complete : function(){
        that.setData({
          lock : true
        })
      }
    })
  }else if(system =="浙江省磐安外贸药业"){
    console.log(system)
    var sql = "select * from userInfo where username ='" + info.inputName + "' and password = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_zhejiang',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          var sql = "select * from userPower where user_id=" + user_list.id
          wx.cloud.callFunction({
            name: 'sqlserver_zhejiang',
            data:{
              query : sql
            },
            success : res =>{
              var list = res.result.recordset
              console.log(user_list)
              console.log(list)
              if(that.data.jizhu_panduan){
                that.remember_user(info.inputName,info.inputPwd)
              }else{
                that.remove_user()
              }
              wx.navigateTo({
                url:'../../miniprogram/pages/peizhi/peizhi?userInfo='+JSON.stringify(user_list) + "&userPower=" + JSON.stringify(list)
              })
            },
            err: res => {
              console.log("错误!")
            },
            fail: res => {
              console.log(res)
              wx.showToast({
                title: '请求失败！',
                icon: 'none',
                duration: 3000
              })
              console.log("请求失败！")
            }
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else if(system =="霸州市智科启达自动化"){
    console.log(system)
    var sql = "select * from userInfo where username ='" + info.inputName + "' and password = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_bazhou',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          if(user_list.power != '制造商'){
            wx.showToast({
              title: '非制造商账号，不能登录',
              icon:'none',
            })
          }else{
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            wx.navigateTo({
              url:'../../package_bazhou/pages/index/index?userInfo='+JSON.stringify(user_list)
            })
          }
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else if(system =="华群家具材料" && that.data.gongsi == '订单管理系统'){
    console.log(system)
    var sql = "select * from userInfo where username ='" + info.inputName + "' and password = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url:'../../package_huaqun/page/shows/shows?userInfo='+JSON.stringify(user_list)
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else if(system =="瑞利达物资贸易" ){
    console.log(system)
    var sql = "select * from userInfo where username ='" + info.inputName + "' and password = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_ruilida',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url:'../../package_ruilida/page/shows/shows?userInfo='+JSON.stringify(user_list)
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else if(system =="华群家具材料" && that.data.gongsi == '配送管理系统'){
    console.log(system)
    var sql = "select * from erqi_userInfo where username ='" + info.inputName + "' and password = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_huaqun',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url:'../../package_huaqun_erqi/page/shows/shows?userInfo='+JSON.stringify(user_list)
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else if(system =="幻尘萌"){
    console.log(system)
    var sql = "select * from login where E ='" + info.inputName + "' and F = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_huanchenmeng',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          if(that.data.jizhu_panduan){
            that.remember_user(info.inputName,info.inputPwd)
          }else{
            that.remove_user()
          }
          wx.navigateTo({
            url:'../../package_huanchenmeng/pages/shows/shows?userInfo='+JSON.stringify(user_list)
          })
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else if(system =="销售管理系统"){
    console.log(system)
    var sql = "select * from userInfo where username ='" + info.inputName + "' and password = '" + info.inputPwd + "'"
    wx.cloud.callFunction({
      name: 'sqlserver_yiwa',
      data:{
        query : sql
      },
      success : res =>{
        var list = res.result.recordset
        console.log(list)
        if(list.length == 0){
          wx.showToast({
            title: '用户名或密码错误',
            icon:'none',
          })
        }else{
          var user_list = list[0]
          if(user_list.power == '客户'){
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            wx.navigateTo({
              url:'../../package_yiwa/pages/shows_kehu/shows_kehu?userInfo='+JSON.stringify(user_list)
            })
          }else{
            if(that.data.jizhu_panduan){
              that.remember_user(info.inputName,info.inputPwd)
            }else{
              that.remove_user()
            }
            wx.navigateTo({
              url:'../../package_yiwa/pages/shows/shows?userInfo='+JSON.stringify(user_list)
            })
          }
          
        }
      },
      err: res => {
        console.log("错误!")
      },
      fail: res => {
        console.log(res)
        wx.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 3000
        })
        console.log("请求失败！")
      },
      complete: () => {
        that.setData({
          lock : true
        })
      }
    })
  //结束
  
  }else{
    wx.showToast({
      title: '请选择系统',
      icon : 'none'   
    })
    that.setData({
      lock : true
    })
  }
}



function getCompanyTime(that,info,sort_name){
  var date = new Date()
  var nowTime = date.getFullYear()+"/"+(parseInt(date.getMonth())+1)+"/"+date.getDate()
  var sql = "select CASE WHEN endtime < '"+nowTime+"' THEN 1 ELSE 0 END as endtime,CASE WHEN mark2<'"+nowTime+"' THEN 1 ELSE 0 END as mark2,mark1,isnull(mark3,'') as mark3,isnull(mark5,'') as mark5,isnull(mark4,'') as mark4 from control_soft_time where soft_name ='"+sort_name+"'"

  if(sort_name=='财务' || sort_name=='排产' || sort_name=='人事' || sort_name=='进销存' || sort_name=='分权' || sort_name=='门店' || sort_name=='教务'){
    sql += " and name = '"+that.data.gongsi+"'"
  }
  console.log(sql)
  wx.cloud.callFunction({
    name : 'sqlServer_system',
    data : {
      query : sql
    },
    success : res=> {
      var list = res.result.recordset
      var result = ""
      console.log(list)

      if(list[0].mark5 == null || !list[0].mark5.includes("小程序")){
        result = "您没有当前使用端权限，请联系我公司续费或者购买系统"
    }

      if(list[0].endtime == 1){
        result = "工具到期，请联系我公司续费"
      }else if(list[0].mark2 == 1){
        result = "服务器到期，请联系我公司续费"
      }
      if(list[0].mark3 != null && list[0].mark3 != undefined){
        list[0].mark3 = list[0].mark3.trim()
        if(list[0].mark3 != ""){
          list[0].mark3 = list[0].mark3.split(":")[1]
          list[0].mark3 = list[0].mark3.replace("(","")
          list[0].mark3 = list[0].mark3.replace(")","")
        }
        that.setData({
          userNum: list[0].mark3
        })
      }

      if (list[0].mark4 != null && list[0].mark4 != undefined) {
        let mark4Value = list[0].mark4.trim();
        if (mark4Value != "") {
          // 直接保存字符串值（已经是KB单位）
          const app = getApp();
          app.globalData.mark4 = mark4Value;
          console.log("mark4已保存到globalData:", mark4Value);
        }
      }

       // 🆕 如果是分权系统，查询数据库空间大小
       if (sort_name == '分权') {
        console.log('检测到分权系统登录，开始查询数据库空间...');
        
        // 查询数据库空间
        getDatabaseSpace(that.data.gongsi, function(spaceResult) {
          
          // 保存到 globalData
          const app = getApp();
          app.globalData.dbSpace = spaceResult.totalSpaceKB;
          console.log('分权使用大小:', spaceResult.totalSpaceKB);
          
          // 继续登录流程
          if (result == "") {
            login(that, info);
          } else {
            wx.showModal({
              title: '提示',
              content: result,
              showCancel: false,
            });
          }
        });
        return; // 等待空间查询完成后再登录
      }else if (sort_name == '门店') {
        console.log('检测到门店系统登录，开始查询数据库空间...');
        getMendianDatabaseSpace(that.data.gongsi, function(spaceResult) {
          const app = getApp();
          app.globalData.mendianDbSpace = spaceResult.totalSpaceKB;
          console.log('门店系统使用大小:', spaceResult.totalSpaceKB);
          if (result == "") {
            login(that, info);
          } else {
            wx.showModal({
              title: '提示',
              content: result,
              showCancel: false,
            });
          }
        });
        return;
      }
    
      if (sort_name == '分权') {
        getFenquanDatabaseSpace(that.data.gongsi, function(spaceResult) {
          const app = getApp();
          app.globalData.fenquanDbSpace = spaceResult.totalSpaceKB;
          console.log('分权系统使用大小:', spaceResult.totalSpaceKB);
          if (result == "") login(that, info);
          else showModal(result);
        });
        return;
      } else if (sort_name == '门店') {
        getMendianDatabaseSpace(that.data.gongsi, function(spaceResult) {
          const app = getApp();
          app.globalData.mendianDbSpace = spaceResult.totalSpaceKB;
          console.log('门店系统使用大小:', spaceResult.totalSpaceKB);
          if (result == "") login(that, info);
          else showModal(result);
        });
        return;
      } else if (sort_name == '教务') {
        getJiaowuDatabaseSpace(that.data.gongsi, function(spaceResult) {
          const app = getApp();
          app.globalData.jiaowuDbSpace = spaceResult.totalSpaceKB;
          console.log('教务系统使用大小:', spaceResult.totalSpaceKB);
          if (result == "") login(that, info);
          else showModal(result);
        });
        return;
      } else if (sort_name == '排产') {
        getPaichanDatabaseSpace(that.data.gongsi, function(spaceResult) {
          const app = getApp();
          app.globalData.paichanDbSpace = spaceResult.totalSpaceKB;
          console.log('排产系统使用大小:', spaceResult.totalSpaceKB);
          if (result == "") login(that, info);
          else showModal(result);
        });
        return;
      } else if (sort_name == '财务') {
        getCaiwuDatabaseSpace(that.data.gongsi, function(spaceResult) {
          const app = getApp();
          app.globalData.caiwuDbSpace = spaceResult.totalSpaceKB;
          console.log('财务系统使用大小:', spaceResult.totalSpaceKB);
          if (result == "") login(that, info);
          else showModal(result);
        });
        return;
      } else if (sort_name == '进销存') {
        getJinxiaocunDatabaseSpace(that.data.gongsi, function(spaceResult) {
          const app = getApp();
          app.globalData.jinxiaocunDbSpace = spaceResult.totalSpaceKB;
          console.log('进销存系统使用大小:', spaceResult.totalSpaceKB);
          if (result == "") login(that, info);
          else showModal(result);
        });
        return;
      } else if (sort_name == '人事') {
        getRenshiDatabaseSpace(that.data.gongsi, function(spaceResult) {
          const app = getApp();
          app.globalData.renshiDbSpace = spaceResult.totalSpaceKB;
          console.log('人事系统使用大小:', spaceResult.totalSpaceKB);
          if (result == "") login(that, info);
          else showModal(result);
        });
        return;
      }

    
      console.log(list[0].mark3)
      if(result==""){
        login(that,info)
      }else{
        wx.showModal({
          title : '提示',
          content : result,
          showCancel: false,
        })
        return;
      }
    }
  })
} 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lock : true,
    system : "选择系统",
    systemArray :[],
    pickerArray : [],
    input_text: "",
    name: '',
    pwd: '',
    gongsi: "选择公司",
    jizhu_panduan:false,
  },

  getCompanyName : function(arr){
    wx.showLoading({
      title: '获取公司信息中',
      mask : 'true'
    })
    var _this = this;

    wx.cloud.callFunction({
      name: arr[0],
      data: {
        query: arr[1]
      },
      success: res => {
        console.log(res);
        var list = []
        for(var i=0;i<res.result.recordset.length;i++){
          list.push(res.result.recordset[i][arr[2]])
        }
        
        _this.setData({
          pickerArray : list
        })
        wx.hideLoading({
          success: (res) => {},
        })
      },
      err: res => {
        console.log("错误!", res)
      },
    })
  },

  checkboxChange(e){
    var _this = this
    _this.setData({
      jizhu_panduan: !_this.data.jizhu_panduan
    })
    console.log(_this.data.jizhu_panduan)
  },

  remember_user(username,password){
    var _this = this
    wx.setStorage({
      key:"user",
      data:username
    })
    wx.setStorage({
      key:"pass",
      data:password
    })
    wx.setStorage({
      key:"system",
      data:_this.data.system
    })
    wx.setStorage({
      key:"gongsi",
      data:_this.data.gongsi
    })
  },

  remove_user(){
    wx.removeStorage({
      key: 'user',
      success (res) {
          console.log(res.errMsg)
      }
    })
    wx.removeStorage({
      key: 'pass',
      success (res) {
          console.log(res.errMsg)
      }
    })
    wx.removeStorage({
      key: 'system',
      success (res) {
          console.log(res.errMsg)
      }
    })
    wx.removeStorage({
      key: 'gongsi',
      success (res) {
          console.log(res.errMsg)
      }
    })
  },

  getSystemName : function(){
    var _this = this;
    wx.showLoading({
      title: '获取系统信息中',
      mask : 'true'
    })
    wx.cloud.callFunction({
      name: 'sqlServer_system',
      data: {
        query: "select systemName from all_systems"
      },
      success: res => {
        var list = []
        for(var i=0;i<res.result.recordset.length;i++){
          list.push(res.result.recordset[i].systemName)
        }
        _this.setData({
          systemArray : list
        })
      },
      err: res => {
        console.log("错误!"+ res)
      },
      complete : function(){
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
  },

  choice: function(e){
    var _this = this;
    var input_text = _this.data.pickerArray[e.detail.value]
    _this.setData({
      gongsi : input_text
    })
  },

  choice_system : function(e){
    var _this = this;
    var system = _this.data.systemArray[e.detail.value];
    var arr = "";

    //803登录  20210709  胡超
    if (system == '智居生产平台'){
      _this.setData({
        system,
        gongsi : '智居生产平台',
        pickerArray: ['智居生产平台']
      })
      return;
    //结束

    }else if(system == '浙江省磐安外贸药业'){
      _this.setData({
        system,
        gongsi : '浙江省磐安外贸药业',
        pickerArray: ['浙江省磐安外贸药业']
      })
      return;
    }else if(system == '霸州市智科启达自动化'){
      _this.setData({
        system,
        gongsi : '霸州市智科启达自动化',
        pickerArray: ['霸州市智科启达自动化']
      })
      return;
    }else if(system == '华群家具材料'){
      // _this.setData({
      //   system,
      //   gongsi : '订单管理系统',
      //   pickerArray: ['订单管理系统','配送管理系统']
      // })
      _this.setData({
        system,
        gongsi : '订单管理系统',
        pickerArray: ['订单管理系统']
      })
      return;
    }else if(system == '瑞利达物资贸易'){
      // _this.setData({
      //   system,
      //   gongsi : '订单管理系统',
      //   pickerArray: ['订单管理系统','配送管理系统']
      // })
      _this.setData({
        system,
        gongsi : '瑞利达物资贸易',
        pickerArray: ['瑞利达物资贸易']
      })
      return;
    }else if(system == '幻尘萌'){
      _this.setData({
        system,
        gongsi : '幻尘萌',
        pickerArray: ['幻尘萌']
      })
      return;
    }else if(system == '销售管理系统'){
      _this.setData({
        system,
        gongsi : '销售管理系统',
        pickerArray: ['销售管理系统']
      })
      return;
    }else{
      _this.setData({
        gongsi : "选择公司",
        pickerArray: []
      })
    }
    if(system=="零售管理系统"){
      _this.setData({
        gongsi : "选择店铺"
      })
    }else{
      _this.setData({
        gongsi : "选择公司"
      })
    }
    // if(system=="云合未来进销存系统"){
    //   _this.setData({
    //     system,
    //   })
    //   wx.showLoading({
    //     title: '获取公司信息中',
    //     mask : 'true'
    //   })
    //   var _this = this;
    //   wx.cloud.callFunction({
    //     name: "sqlConnection",
    //     data: {
    //       sql: "select gongsi from yh_jinxiaocun_user GROUP BY gongsi"
    //     },
    //     success: res => {
    //       console.log(res);
    //       var list = []
    //       for(var i=0;i<res.result.length;i++){
    //         list.push(res.result[i].gongsi)
    //       }
    //       _this.setData({
    //         pickerArray : list
    //       })
    //       wx.hideLoading({
    //         success: (res) => {},
    //       })
    //       return;
    //     },
    //     err: res => {
    //       console.log("错误!", res)
    //     },
    //     fail:res=>{
    //       console.log(res)
    //     }
    //   })
    // }
    if(system=="云合未来进销存系统"){
      _this.setData({
        system,
      })
      wx.showLoading({
        title: '获取公司信息中',
        mask : 'true'
      })
      var _this = this;
      
      // 第一个请求
      wx.cloud.callFunction({
        name: "sqlConnection",
        data: {
          sql: "select gongsi from yh_jinxiaocun_user GROUP BY gongsi"
        },
        success: res => {
          console.log("第一个请求结果:", res);
          var list1 = []
          for(var i=0;i<res.result.length;i++){
            list1.push(res.result[i].gongsi)
          }
          
          // 第二个请求
          wx.cloud.callFunction({
            name: "sqlServer_117", // 如果第二个请求使用不同的云函数，请修改这里
            data: {
              query: "select gongsi from yh_jinxiaocun_excel.dbo.yh_jinxiaocun_user_mssql GROUP BY gongsi" // 修改为您的第二个SQL查询
            },
            success: res2 => {
              console.log("第二个请求结果:", res2.result.recordset);
              var list2 = []
              for(var i=0;i<res2.result.recordset.length;i++){
                list2.push(res2.result.recordset[i].gongsi) // 根据实际字段名修改
              }
              
              // 合并两个数组并去重
              var combinedList = [...new Set([...list1, ...list2])];
              
              _this.setData({
                pickerArray : combinedList
              })
              wx.hideLoading({
                success: (res) => {},
              })
            },
            err: res2 => {
              console.log("第二个请求错误!", res2)
              // 如果第二个请求失败，只使用第一个请求的结果
              _this.setData({
                pickerArray : list1
              })
              wx.hideLoading({
                success: (res) => {},
              })
            },
            fail: res2 => {
              console.log("第二个请求失败", res2)
              // 如果第二个请求失败，只使用第一个请求的结果
              _this.setData({
                pickerArray : list1
              })
              wx.hideLoading({
                success: (res) => {},
              })
            }
          })
        },
        err: res => {
          console.log("第一个请求错误!", res)
          wx.hideLoading({
            success: (res) => {},
          })
        },
        fail: res => {
          console.log("第一个请求失败", res)
          wx.hideLoading({
            success: (res) => {},
          })
        }
      })
    }
    // if(system=="云合教务管理系统"){
    //   _this.setData({
    //     system,
    //   })
    //   wx.showLoading({
    //     title: '获取公司信息中',
    //     mask : 'true'
    //   })
    //   var _this = this;
    //   wx.cloud.callFunction({
    //     name: "sql_jiaowu",
    //     data: {
    //       sql: "select Company from teacher GROUP BY Company"
    //     },
    //     success: res => {
    //       console.log(res);
    //       var list = []
    //       for(var i=0;i<res.result.length;i++){
    //         list.push(res.result[i].Company)
    //       }
    //       _this.setData({
    //         pickerArray : list
    //       })
    //       wx.hideLoading({
    //         success: (res) => {},
    //       })
    //       return;
    //     },
    //     err: res => {
    //       console.log("错误!", res)
    //     },
    //     fail:res=>{
    //       console.log(res)
    //     }
    //   })
    // }
    if(system=="云合教务管理系统"){
      _this.setData({
        system,
      })
      wx.showLoading({
        title: '获取公司信息中',
        mask : 'true'
      })
      var _this = this;
      
      // 第一个请求
      wx.cloud.callFunction({
        name: "sql_jiaowu",
        data: {
          sql: "select Company from teacher GROUP BY Company"
        },
        success: res => {
          console.log("第一个请求结果:", res);
          var list1 = []
          for(var i=0;i<res.result.length;i++){
            list1.push(res.result[i].Company)
          }
          
          // 第二个请求
          wx.cloud.callFunction({
            name: "sqlServer_117", // 如果第二个请求使用不同的云函数，请修改这里
            data: {
              query: "select Company from xueshengguanlixitong_excel.dbo.teacher GROUP BY Company"
            },
            success: res2 => {
              console.log("第二个请求结果:", res2.result.recordset);
              var list2 = []
              for(var i=0;i<res2.result.recordset.length;i++){
                list2.push(res2.result.recordset[i].Company) 
              }
              
              // 合并两个数组并去重
              var combinedList = [...new Set([...list1, ...list2])];
              
              _this.setData({
                pickerArray : combinedList
              })
              wx.hideLoading({
                success: (res) => {},
              })
            },
            err: res2 => {
              console.log("第二个请求错误!", res2)
              // 如果第二个请求失败，只使用第一个请求的结果
              _this.setData({
                pickerArray : list1
              })
              wx.hideLoading({
                success: (res) => {},
              })
            },
            fail: res2 => {
              console.log("第二个请求失败", res2)
              // 如果第二个请求失败，只使用第一个请求的结果
              _this.setData({
                pickerArray : list1
              })
              wx.hideLoading({
                success: (res) => {},
              })
            }
          })
        },
        err: res => {
          console.log("第一个请求错误!", res)
          wx.hideLoading({
            success: (res) => {},
          })
        },
        fail: res => {
          console.log("第一个请求失败", res)
          wx.hideLoading({
            success: (res) => {},
          })
        }
      })
    }
    else if(system=="云合人事管理系统"){
      _this.setData({
        system
      })
      arr = ["sqlServer_117","select L from gongzi_renyuan GROUP BY L","L"]
    }else if(system=="云合未来财务系统"){
      _this.setData({
        system
      })
      arr = ["sqlServer_cw","select company from Account GROUP BY company","company"]
    }else if(system=="零售管理系统"){
      _this.setData({
        system
      })
      arr = ["sqlServer_117","select shop from zeng_user GROUP BY shop","shop"]
    }else if(system == "云合分权编辑系统"){
      _this.setData({
        system
      })
      arr = ["sqlServer_117","select B from baitaoquanxian_renyun GROUP BY B","B"]
    } else if (system == "云合智慧门店收银系统") {
      _this.setData({
        system,
      }) 
      wx.showLoading({
        title: '获取公司信息中',
        mask: 'true'
      })
      var _this = this;
      wx.cloud.callFunction({
        name: "sqlserver_xinyongka",
        data: {
          sql: "select company from users group by company"
        },
        success: res => {
          console.log(res);
          var list = []
          for (var i = 0; i < res.result.length; i++) {
            list.push(res.result[i].company)
          }
          _this.setData({
            pickerArray: list
          })
          wx.hideLoading({
            success: (res) => { },
          })
          return;
        },
        err: res => {
          console.log("错误!", res)
        },
      })
    } else if (system == "云合排产管理系统") {
      _this.setData({
        system
      })
      arr = ["sqlServer_PC", "select company from user_info GROUP BY company", "company"]
    } else if (system == "合同管理系统"){
      _this.setData({
        system,
      })
      arr = ["sqlServer_cw","select company from contract_personnel GROUP BY company","company"]
    } 
    _this.getCompanyName(arr)
  },
  out_choice_system : function(){
  },

  out_choice : function(){
  },
  
  bindNameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindPwdInput: function(e) {
    this.setData({
      pwd: e.detail.value
    })
  },

  formLogin: function(e) {
    var _this = this

    if(this.data.system=="云合未来财务系统"){
      getCompanyTime(this,e.detail.value,'财务')
    }else if(this.data.system=="云合排产管理系统"){
      getCompanyTime(this,e.detail.value,'排产')
    }else if(this.data.system=="云合人事管理系统"){
      getCompanyTime(this,e.detail.value,'人事')
    }else if(this.data.system=="云合未来进销存系统"){
      getCompanyTime(this,e.detail.value,'进销存')
    }else if(this.data.system=="云合分权编辑系统"){
      getCompanyTime(this,e.detail.value,'分权')
    }else if(this.data.system=="云合智慧门店收银系统"){
      getCompanyTime(this,e.detail.value,'门店')
    }else if(this.data.system=="云合教务管理系统"){
      getCompanyTime(this,e.detail.value,'教务')
    }else if(this.data.system=="零售管理系统" || this.data.system == "销售管理系统" || this.data.system == "浙江省磐安外贸药业" || this.data.system == "华群家具材料"){
      getCompanyTime(this,e.detail.value,this.data.system)
    }else{
      login(this,e.detail.value)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function(e) {
    
  //   var that = this;
  //   app.globalData.finduser = 'name1'
  //   if (app.globalData.finduser != null && app.globalData.gongsi != null) {
  //     /*
  //     wx.switchTab({
  //       url: '../shouye/shouye'
  //     })
  //     */
  //   }
  //   // wx.getStorage({
  //   //   key: 'IsLogin',
  //   //   success: function (res) {
  //   //     if (res.data) {

  //   //       wx.switchTab({
  //   //         url: '../shouye/shouye'
  //   //       })
  //   //       // wx.navigateTo({
  //   //       //   url: '../shouye/shouye',
  //   //       // })
  //   //     }
  //   //   }
  //   // })
  //   wx.getStorage({
  //     key: 'system',
  //     success (res) {
  //       console.log(res.data)
  //       that.setData({
  //         system:res.data,
  //         jizhu_panduan:true
  //       })
  //     }
  //   })
  //   wx.getStorage({
  //     key: 'gongsi',
  //     success (res) {
  //       console.log(res.data)
  //       that.setData({
  //         gongsi:res.data,
  //         jizhu_panduan:true
  //       })
  //     }
  //   })
  //   wx.getStorage({
  //     key: 'user',
  //     success (res) {
  //       console.log(res.data)
  //       that.setData({
  //         name:res.data,
  //         jizhu_panduan:true
  //       })
  //     }
  //   })
  //   wx.getStorage({
  //     key: 'pass',
  //     success (res) {
  //       console.log(res.data)
  //       that.setData({
  //         pwd:res.data,
  //         jizhu_panduan:true
  //       })
  //     }
  //   })
  // },

  onLoad: function(e) {
    var that = this;
    app.globalData.finduser = 'name1'
    
    // 定义变量来存储公司名和系统名
    let companyName = '';
    let systemName = '';
    
    // 从缓存获取系统名称
    wx.getStorage({
      key: 'system',
      success: function(res) {
        console.log('获取系统名称:', res.data)
        systemName = res.data;
        that.setData({
          system: res.data,
          jizhu_panduan: true
        })
        
        // 检查是否两个值都有了，然后发送请求
        if (companyName && systemName && companyName !== '选择公司' && systemName !== '选择系统') {
          that.queryUserPermissions(companyName, systemName);
        }
      }
    })
    
    // 从缓存获取公司名称
    wx.getStorage({
      key: 'gongsi',
      success: function(res) {
        console.log('获取公司名称:', res.data)
        companyName = res.data;
        that.setData({
          gongsi: res.data,
          jizhu_panduan: true
        })
        
        // 检查是否两个值都有了，然后发送请求
        if (companyName && systemName && companyName !== '选择公司' && systemName !== '选择系统') {
          that.queryUserPermissions(companyName, systemName);
        }else{
          this.setData({
            logoImage: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/companyLogo.png",
            pageTitle: "欢迎使用云合一体化系统"
        });

        }
      }
    })
    
    // 获取用户名
    wx.getStorage({
      key: 'user',
      success: function(res) {
        console.log('获取用户名:', res.data)
        that.setData({
          name: res.data,
          jizhu_panduan: true
        })
      }
    })
    
    // 获取密码
    wx.getStorage({
      key: 'pass',
      success: function(res) {
        console.log('获取密码:', res.data)
        that.setData({
          pwd: res.data,
          jizhu_panduan: true
        })
      }
    })
  },
  
  /**
   * 查询用户权限和推送数据
   */
  queryUserPermissions: function(companyName, systemName) {
    console.log('=== 开始调用云函数 ===')
    console.log('公司名称:', companyName)
    console.log('系统名称:', systemName)

    if(systemName=="云合分权编辑系统"){
      systemName="分权编辑系统"
    }
    if(systemName=="云合未来进销存系统"){
      systemName="云合未来进销存系统"
    }
    if(systemName=="云合人事管理系统"){
      systemName="云合人事管理系统"
    }
    if(systemName=="云合排产管理系统"){
      systemName="云合排产管理系统"
    }
    if(systemName=="云合未来财务系统"){
      systemName="云合未来财务系统"
    }
    if(systemName=="云合教务管理系统"){
      systemName="教务管理系统"
    }
    if(systemName=="云合智慧门店收银系统"){
      systemName="云合智慧门店收银系统"
    }
    
    wx.cloud.callFunction({
      name: 'sqlServer_117',
      data: {
        query: "SELECT beizhu1, beizhu2, beizhu3 FROM yh_notice.dbo.product_pushnews WHERE gsname = '" + companyName + "' AND xtname = '" + systemName + "'"
      },
      success: res => {
        console.log('云函数返回结果:', res)
        var pushdata = res.result.recordset
        if (pushdata && pushdata.length > 0) {
          const firstItem = pushdata[0]
          
  
          // 处理beizhu2（图片数据）
          if (firstItem.beizhu2 ) {
            console.log("beizhu2成功调用")
            this.processBeizhu2(firstItem.beizhu2);
        } else {
          console.log("beizhu2没成功调用")
            this.setData({
                logoImage: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/companyLogo.png"
            });
        }
        if(firstItem.beizhu3 && firstItem.beizhu3.trim() !== ""){
          console.log("beizhu3成功调用")
          this.processBeizhu3(firstItem.beizhu3);
        }else{
          console.log("beizhu3没成功调用")
          this.setData({
            pageTitle: "欢迎使用云合一体化系统"
          });
        }
            
          
        } else {
          console.log('未查询到相关数据')
        }
      },
      fail: err => {
        console.error('云函数调用失败:', err)
      }
    })
  },
  
  /**
   * 处理beizhu2（图片数据）
   */
 /**
 * 处理beizhu2（图片数据）
 */
processBeizhu2: function(beizhu2) {
    console.log('beizhu2原始数据:', beizhu2);
    
    // 🆕 使用更严格的判断条件
    const isValidBeizhu2 = beizhu2 && 
                          typeof beizhu2 === 'string' && 
                          beizhu2.trim().length > 0;
    
    if (isValidBeizhu2) {
        const cleanedData = beizhu2.replace(/\r?\n|\r/g, '').replace(/\s/g, '').trim();
        
        // 🆕 再次验证清理后的数据
        if (cleanedData && cleanedData.length > 10) { // 假设base64数据至少10个字符
            let mimeType = 'image/jpeg';
            if (cleanedData.startsWith('iVBORw0KGgo')) {
                mimeType = 'image/png';
            }
            const logoImage = `data:${mimeType};base64,${cleanedData}`;
            
            this.setData({
                logoImage: logoImage
            });
            console.log('beizhu2图片已设置，使用返回的图片');
            return; // 🆕 提前返回
        }
    }
    
    // 🆕 所有其他情况都使用默认图片
    this.setData({
        logoImage: "cloud://yhltd-hsxl2.7968-yhltd-hsxl2-1259412419/images/companyLogo.png"
    });
    console.log('beizhu2无效，使用默认图片');
},
  
  /**
   * 处理beizhu3（文本数据）
   */
  processBeizhu3: function(beizhu3) {
    if (beizhu3 && beizhu3.trim() !== '') {
      // 更新页面标题为返回的内容
      this.setData({
        pageTitle: beizhu3.trim()
      });
      console.log('beizhu3文本已设置:', beizhu3.trim());
    } else {
      // 没有内容时保留默认文本
      this.setData({
        pageTitle: "欢迎使用云合一体化系统"
      });
      console.log('beizhu3无内容，使用默认文本');
    }
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this =this
    _this.getSystemName();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    wx.hideToast({
      success: (res) => {
        console.log("隐藏消息提示框")
      },
    })
    this.setData({
      lock : true
    })
  },

  goyh: function(e){
    var _this = this
    wx.navigateTo({
      url:'../../package_yunhe/pages/shouye/shouye'
    })
  },  

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})