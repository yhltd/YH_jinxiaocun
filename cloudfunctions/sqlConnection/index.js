// 云函数入口文件
const cloud = require('wx-server-sdk')
//引入mysql操作模块
const mysql = require('mysql2/promise')
cloud.init()
// 云函数入口函数
exports.main = async(event, context) => {
  

  //链接mysql数据库的test库，这里你可以链接你mysql中的任意库
  try {
    const connection = await mysql.createConnection({
      host: 'yhocn.cn',
      database: 'YH_jinxiaocun_PC',
      user: 'root',
      password: 'Lyh07910',
      port:'3306'
    })

    const [rows, fields] = await connection.execute('SELECT * from yh_jinxiaocun_mingxi')
    return rows;
  } catch (err) {
    console.log("链接错误", err)
    return err
  }

}