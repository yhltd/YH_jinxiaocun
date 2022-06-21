// //获取应用实例
// // const app = getApp()
// // 持导出为图片和清空的功能。为了提供用户体验，在性能优化上做了很大提升。最后的保存图片是先保存为本地临时文件，然后上传服务器，从服务器请求预览

// /*code是指图片base64格式数据*/
// //声明文件系统
// const fs = wx.getFileSystemManager();
// //随机定义路径名称
// var times = new Date().getTime();
// var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
// Page({
//   data: { 
//     canvasWidth:'',
//     canvasHeight:'',
//     picture_id:'',
//     this_picture:'',
//     qianzi_pitcurenew:'',
//     context: null,
//     index: 0,
//     height: 0,
//     width: 0,
//     context1: null,
//     hasDraw: false, //默认没有画
//     src: null,
//     canvasName: 'handWriting',
//     ctx: '',
//     canvasWidth: 0,
//     canvasHeight: 0,
//     transparent: 1, // 透明度
//     selectColor: 'black',
//     lineColor: '#1A1A1A', // 颜色
//     lineSize: 1.5, // 笔记倍数
//     lineMin: 0.5, // 最小笔画半径
//     lineMax: 4, // 最大笔画半径
//     pressure: 1, // 默认压力
//     smoothness: 60, //顺滑度，用60的距离来计算速度
//     currentPoint: {},
//     currentLine: [], // 当前线条
//     firstTouch: true, // 第一次触发
//     radius: 1, //画圆的半径
//     cutArea: {
//       top: 0,
//       right: 0,
//       bottom: 0,
//       left: 0 }, //裁剪区域
//       bethelPoint: [], //保存所有线条 生成的贝塞尔点；
//       lastPoint: 0,
//       chirography: [], //笔迹
//       currentChirography: {}, //当前笔迹
//       linePrack: [] //划线轨迹 , 生成线条的实际点
//   },
//   /**记录开始点 */
//   bindtouchstart: function(e) {
//     this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y)
//   },
//   /**记录移动点，刷新绘制 */
//   bindtouchmove: function(e) {
   
//     this.data.context.lineTo(e.changedTouches[0].x, e.changedTouches[0].y);
//     this.data.context.stroke();
//     this.data.context.draw(true);
//     this.data.context.moveTo(e.changedTouches[0].x, e.changedTouches[0].y);
//   },
  
//   /**清空画布 */
//   clear: function() {
//     this.data.context.clearRect(0, 0, this.data.width, this.data.height);
//     this.data.context.draw();
//     this.data.context.setStrokeStyle('#061A06')
//     this.data.context.setLineWidth(2)
//     this.data.context.setFontSize(20)
//     let str = "签名区域";
//     this.data.context.fillText(str, Math.ceil((this.data.width - this.data.context.measureText(str).width) / 2), Math.ceil(this.data.height / 2) - 20)
//     this.data.context.draw()
//   },
//   /**导出图片 */
//   export: function() {
//     console.log('点击了提交。。。。。。');
 
//     const that=this;
//     this.data.context.draw(false, wx.canvasToTempFilePath({
//       x: 0,
//       y: 0,
//       width: that.data.width,
//       height: that.data.height,
//       destWidth: that.data.width,
//       destHeight: that.data.height,
//       fileType: 'jpg',
//       canvasId: 'firstCanvas',
//       success(res) {
//         wx.uploadFile({
//           url: '', 
//           filePath: res.tempFilePath,
//           name: 'file',
//           success(res) {
//             var url = "" + res.data
//             wx.previewImage({
//               // current: url, // 当前显示图片的http链接
//               urls: [url], // 需要预览的图片http链接列表
//               fail(f) {
//                 console.log(2)
//                 console.error(f)
//               },
//               success(s) {
//                 console.log(1)
//                 console.log(s)
//               }
//             })
//           },
//           fail(err) {
//             wx.showToast({
//               title: '上传失败',
//               icon: 'none',
//               duration: 2000
//             })
//           }
//         })
 
//       },
//       fail() {
//         wx.showToast({
//           title: '导出失败',
//           icon: 'none',
//           duration: 2000
//         })
//       }
//     }))
 
//   },
//   //合成图片
//   hechengimge: function () {
//     var _this = this
//     // 给个小提示，正在执行
//     wx.showLoading({
//       title: '合成中',
//       mask: true
//     })
//     console.log(this, '123');
//     // 绘制合成图片到canvas
//     let that = this
//     that.setData({
//       show: false
//     })
//     const ctx = wx.createCanvasContext('handWriting') //让这个先执行
//     ctx.drawImage(that.data.this_picture, 0, 0, 640 ,905) //1、背景图
//     console.log(this, '1、背景图'+that.data.this_picture);
//     console.log(_this.data.qianzi_type)
//     if(_this.data.qianzi_type =='甲'){
//       ctx.drawImage(that.data.qianzi_pitcurenew, 120, 700, 64, 90) //2、签名图
//     }else{
//       ctx.drawImage(that.data.qianzi_pitcurenew, 300, 700, 64, 90) //2、签名图
//     }
    
//      console.log(this, '1、背景图'+that.data.qianzi_pitcurenew);
//     console.log(this, '345');
//     ctx.draw(true, () => {
//       //获取临时缓存合成照片路径，存入data中
//       wx.canvasToTempFilePath({
//         canvasId: 'handWriting',
//         success: function (res) {
//           var tempFilePath = res.tempFilePath;
//           console.log("jieguo:"+tempFilePath)
//           wx.getFileSystemManager().readFile({
//             filePath: tempFilePath, //选择图片返回的相对路径
//             encoding: 'base64', //编码格式
//             success: res => { //成功的回调
//               var out_picture = res.data
//               console.log(out_picture)
//               console.log(_this.data.this_id)
//               wx.cloud.callFunction({
//                 name: 'sqlServer_cw',
//                 data: {
//                   query: "update contract_picture set picture = '" + out_picture+ "' where id =" + _this.data.this_id
//                 },
//                 success: res => {
//                   wx.showToast({
//                     title: '保存成功！',
//                     icon: 'none'
//                   })
//                   wx.hideLoading();
//                 },
//                 err: res => {
//                   console.log("错误!")
//                   wx.hideLoading();
//                 },
//                 fail: res => {
//                   wx.showToast({
//                     title: '请求失败！',
//                     icon: 'none'
//                   })
//                   console.log("请求失败！")
//                   wx.hideLoading();
//                 }
//               })
//             }
//           })
//           // wx.showToast({
//           //   title: '成功',
//           //   icon: 'success',
//           //   duration: 2000
//           // })
//         },
//         fail: function (res) {
//           console.log(res);
//           // wx.showToast({
//           //   title: '失败',
//           //   icon: 'error',
//           //   duration: 2000
//           // })
//         }
//       }, this)
//     }
    
//     )
//   },

//   onLoad: function(options) {
//     var _this = this
//     var userInfo = JSON.parse(options.userInfo)
//     var this_id = userInfo.id
//     console.log(this_id)
//     var myCanvasWidth = ''
//     var myCanvasHeight = ''
//     wx.getSystemInfo({
//       success: function(res) {
//         myCanvasWidth = res.windowWidth - 100
//         myCanvasHeight = res.windowHeight - 300
//       },
//     })
//     this.setData({
//       canvasWidth: myCanvasWidth,
//       canvasHeight: myCanvasHeight
//     })

//     wx.cloud.callFunction({
//       name: 'sqlServer_cw',
//       data: {
//         query: "select * from contract_picture where id = " + this_id 
//       }, 
//       success: res => {
//         console.log(res.result.recordset)
//         var list = res.result.recordset[0].picture
//         var that = this;
//         fs.writeFile({
//           filePath: codeimg,
//           data: list,
//           encoding: 'base64',
//           success: (res) => {
//             //写入成功了的话，新的图片路径就能用了
//             console.log(res)
//             console.log(codeimg)
//             _this.setData({
//               this_picture: codeimg,
//               this_id:this_id
//             })
//           }
//         });
//       },
//       err: res => {
//         console.log("错误!")
//       },
//       fail: res => {
//         wx.showToast({
//           title: '请求失败！',
//           icon: 'none',
//           duration: 3000
//         })
//         console.log("请求失败！")
//       }
//     })
//     _this.setData({
//       picture_id : userInfo.id,
//       qianzi_type : userInfo.qianzi_type
//     })
//     // lewis
//     var context1 = wx.createCanvasContext('handWriting1');
//     context1.setStrokeStyle("#000000")
//     context1.setLineWidth(3);
   
//     this.setData({
//       context1: context1
//     })
//     //new lewis
//     let canvasName = this.data.canvasName
//     let ctx = wx.createCanvasContext(canvasName)
//     this.setData({
//       ctx: ctx
//     })
//     var query = wx.createSelectorQuery();
//     query.select('.handCenter').boundingClientRect(rect => {

//       this.setData({
//         canvasWidth: rect.width,
//         canvasHeight: rect.height
//       })

//       /* 将canvas背景设置为 白底，不设置  导出的canvas的背景为透明 */
//       // console.log(this, 'hahah');
//       // this.setCanvasBg('#fff');


//     }).exec();
//     console.log('onload_stop')
//     // _this.retDraw() 
//     console.log('13')
//   },
//   onShow: function() {

//     if (wx.canIUse('hideHomeButton')) {
//       wx.hideHomeButton();
//     }

//     // let query = wx.createSelectorQuery();
//     // const that = this;
//     // query.select('#firstCanvas').boundingClientRect();
//     // query.exec(function(rect) {
//     //   let width = rect[0].width;
//     //   let height = rect[0].height;
//     //   that.setData({
//     //     width,
//     //     height
//     //   });
//     //   const context = wx.createCanvasContext('firstCanvas')
//     //   that.setData({
//     //     context: context
//     //   })
//     //   context.setStrokeStyle('#061A06')
//     //   context.setLineWidth(2)
//     //   context.setFontSize(20)
//     //   let str = "签名区域";
//     //   context.fillText(str, Math.ceil((width - context.measureText(str).width) / 2), Math.ceil(height / 2) - 20)
//     //   context.draw()
//     // });
//   },
//   onShareAppMessage: (res) => {
//     if (res.from === 'button') {
//       console.log("来自页面内转发按钮");
//       console.log(res.target);
//     } else {
//       console.log("来自右上角转发菜单")
//     }
//     return {
//       title: '手动签名',
//       path: '/pages/index/index?id=测试',
//       // imageUrl: "/images/1.jpg",
//       success: (res) => {
//         console.log("转发成功", res);
//       },
//       fail: (res) => {
//         console.log("转发失败", res);
//       }
//     }
//   },
//   //完成绘画并保存到本地
//   finish: function() {
//     var that = this;
//     console.log("finish1")
//     wx.canvasToTempFilePath({
//       canvasId: 'firstCanvas',
//       success: function(res) {
//         console.log("finish2")
//         console.log(res)
//         wx.showToast({
//           'title': '签名成功'
//         })
//         let path = res.tempFilePath;
        
//         that.imgUpload(path)
//       },
//       fail: function(res) {
//         console.log("finish3")
//         console.log(res)

//       },
//     },that)
//   },

// 	imgUpload(tempFilePaths) {
//     const that=this;
//     console.log("finish6")
//     new Promise((resolve, reject) => {
//       const uploadTask = wx.uploadFile({
     
//         url: this.action, 
//         filePath: tempFilePaths,
//         name: 'file',
//         fileType: 'image',
        
//         header: {
//           'Token': wx.getStorageSync('token'),
//         },
//         success: (uploadFileRes) => {
//           console.log("finish5")
//           if (typeof this.uploadSuccess == 'function') {
//             if (this.uploadSuccess(uploadFileRes).success) {
          
//               this.value.push(this.uploadSuccess(uploadFileRes)
//                 .url)
//             }
//           }
//           resolve(uploadFileRes);
//           this.$emit("uploadSuccess", uploadFileRes);
//         },
//         fail: (err) => {
          
//           reject(err);
//           this.$emit("uploadFail", err);
//         },
        
//       });
//     })
//   },

// //new test

// touchstart1: function (e) {
//   var context1 = this.data.context1;
//   context1.moveTo(e.touches[0].x, e.touches[0].y);
//   this.setData({
//     context1: context1,
//     hasDraw: true, //要签字了
//   });
// },
// touchmove1: function (e) {
//   var x = e.touches[0].x;
//   var y = e.touches[0].y;
//   var context1 = this.data.context1;
//   context1.setLineWidth(3);
//   context1.lineTo(x, y);
//   context1.stroke();
//   context1.setLineCap('round');
//   context1.draw(true);
//   context1.moveTo(x, y);
// },
// reSign1: function () { //重新画
//   var that = this;
//   var context1 = that.data.context1;
//   context1.draw(); //清空画布
//   var context2 = that.data.context2;
//   // context2.draw(); //清空画布
//   that.setData({
//     hasDraw: false, //没有画
//     src: null,
//     // hasDraw2: false, //没有画
//     src2: null
//   });
//   // this.backew();
// },
// sign1ok: function () {
//   var that = this;
//   if (!that.data.hasDraw) {
//     // console.log("签字是空白的 没有签字")
//     wx.showToast({
//       title: "未签字！",
//       icon: "error"
//     })
//     return
//   }
//   // if (!that.data.hasDraw2) {
//   //   wx.showToast({
//   //     title: "未签时间！",
//   //     icon: "error"
//   //   })
//   //   return
//   // } else 
//   {
//     that.uploadSign()
//   }
//   console.log("ok")
// },
// // 上传签名
// uploadSign() {
//   var that = this;
//   var context1 = that.data.context1;
 
//   const cloudPath = 'SY_LHDataAnalysis/txt/1.jpg' 

//   context1.draw(true, wx.canvasToTempFilePath({
//     canvasId: 'handWriting1',
//     destWidth: 180,
//     destHeight: 100,
//     success(res) {
//       that.setData({
//         src: res.tempFilePath  
        
//       });
//       wx.cloud.uploadFile({
//         cloudPath,
//         filePath: res.tempFilePath,
//         name: 'file',
       
//         // url: cloudPath,// 这里写上传图片的地址
//         formData: {
//          signName: "a.jpg"
//           // signName: that.data.optionDe.signName
//         },
//         header: {
//           "Content-Type": "multipart/form-data"
//         },
//         timeout: 0,
//         success: (result) => {
//           console.log(result, 'file');
//         },
//         fail: (res) => { console.log("323失败", res);},
//         complete: (res) => {},
        
//       })

//     }
//   }))
// },
//    /*======new lewis 所有自定义函数======*/

//   // 笔迹开始
//   uploadScaleStart(e) {
//     if (e.type != 'touchstart') return false;
//     let ctx = this.data.ctx;
//     ctx.setFillStyle(this.data.lineColor); // 初始线条设置颜色
//     ctx.setGlobalAlpha(this.data.transparent); // 设置半透明
//     let currentPoint = {
//       x: e.touches[0].x,
//       y: e.touches[0].y
//     }
//     let currentLine = this.data.currentLine;
//     currentLine.unshift({
//       time: new Date().getTime(),
//       dis: 0,
//       x: currentPoint.x,
//       y: currentPoint.y
//     })
//     this.setData({
//       currentPoint,
//       // currentLine
//     })
//     if (this.data.firstTouch) {
//       this.setData({
//         cutArea: {
//           top: currentPoint.y,
//           right: currentPoint.x,
//           bottom: currentPoint.y,
//           left: currentPoint.x
//         },
//         firstTouch: false
//       })
//     }
//     this.pointToLine(currentLine);
//   },
//   // 笔迹移动
//   uploadScaleMove(e) {
//     if (e.type != 'touchmove') return false;
//     if (e.cancelable) {
//       // 判断默认行为是否已经被禁用
//       if (!e.defaultPrevented) {
//         e.preventDefault();
//       }
//     }
//     let point = {
//       x: e.touches[0].x,
//       y: e.touches[0].y
//     }

//     //测试裁剪
//     if (point.y < this.data.cutArea.top) {
//       this.data.cutArea.top = point.y;
//     }
//     if (point.y < 0) this.data.cutArea.top = 0;

//     if (point.x > this.data.cutArea.right) {
//       this.data.cutArea.right = point.x;
//     }
//     if (this.data.canvasWidth - point.x <= 0) {
//       this.data.cutArea.right = this.data.canvasWidth;
//     }
//     if (point.y > this.data.cutArea.bottom) {
//       this.data.cutArea.bottom = point.y;
//     }
//     if (this.data.canvasHeight - point.y <= 0) {
//       this.data.cutArea.bottom = this.data.canvasHeight;
//     }
//     if (point.x < this.data.cutArea.left) {
//       this.data.cutArea.left = point.x;
//     }
//     if (point.x < 0) this.data.cutArea.left = 0;

//     this.setData({
//       lastPoint: this.data.currentPoint,
//       currentPoint: point
//     })
//     let currentLine = this.data.currentLine
//     currentLine.unshift({
//       time: new Date().getTime(),
//       dis: this.distance(this.data.currentPoint, this.data.lastPoint),
//       x: point.x,
//       y: point.y
//     })
//     // this.setData({
//     //   currentLine
//     // })
//     this.pointToLine(currentLine);
//   },
//   // 笔迹结束
//   uploadScaleEnd(e) {
//     if (e.type != 'touchend') return 0;
//     let point = {
//       x: e.changedTouches[0].x,
//       y: e.changedTouches[0].y
//     }
//     this.setData({
//       lastPoint: this.data.currentPoint,
//       currentPoint: point
//     })
//     let currentLine = this.data.currentLine
//     currentLine.unshift({
//       time: new Date().getTime(),
//       dis: this.distance(this.data.currentPoint, this.data.lastPoint),
//       x: point.x,
//       y: point.y
//     })
//     // this.setData({
//     //   currentLine
//     // })
//     if (currentLine.length > 2) {
//       var info = (currentLine[0].time - currentLine[currentLine.length - 1].time) / currentLine.length;
//       //$("#info").text(info.toFixed(2));
//     }
//     //一笔结束，保存笔迹的坐标点，清空，当前笔迹
//     //增加判断是否在手写区域；
//     this.pointToLine(currentLine);
//     var currentChirography = {
//       lineSize: this.data.lineSize,
//       lineColor: this.data.lineColor
//     };
//     var chirography = this.data.chirography
//     chirography.unshift(currentChirography);
//     this.setData({
//       chirography
//     })
//     var linePrack = this.data.linePrack
//     linePrack.unshift(this.data.currentLine);
//     this.setData({
//       linePrack,
//       currentLine: []
//     })
//   },

//   retDraw() {
//     this.data.ctx.clearRect(0, 0, 700, 730)
//     this.data.ctx.draw();

//     //设置canvas背景
//     // this.setCanvasBg("#11119b");
//     // this.setCanvasBg("#fff");
//     this.backew();
//     //lewis 
//     // const canvasDom = document.getElementById('handWriting');
//     // let ctx = canvasDom.getContext("2d");
//     // this.fixedImage(ctx, this.dataInfo.banner, 600, 354, 20, 148);
//   },

//   //画两点之间的线条；参数为:line，会绘制最近的开始的两个点；
//   pointToLine(line) {
//     this.calcBethelLine(line);
//     return;
//   },
//   //计算插值的方式；
//   calcBethelLine(line) {
//     if (line.length <= 1) {
//       line[0].r = this.data.radius;
//       return;
//     }
//     let x0, x1, x2, y0, y1, y2, r0, r1, r2, len, lastRadius, dis = 0,
//       time = 0,
//       curveValue = 0.5;
//     if (line.length <= 2) {
//       x0 = line[1].x
//       y0 = line[1].y
//       x2 = line[1].x + (line[0].x - line[1].x) * curveValue;
//       y2 = line[1].y + (line[0].y - line[1].y) * curveValue;
//       //x2 = line[1].x;
//       //y2 = line[1].y;
//       x1 = x0 + (x2 - x0) * curveValue;
//       y1 = y0 + (y2 - y0) * curveValue;;

//     } else {
//       x0 = line[2].x + (line[1].x - line[2].x) * curveValue;
//       y0 = line[2].y + (line[1].y - line[2].y) * curveValue;
//       x1 = line[1].x;
//       y1 = line[1].y;
//       x2 = x1 + (line[0].x - x1) * curveValue;
//       y2 = y1 + (line[0].y - y1) * curveValue;
//     }
//     //从计算公式看，三个点分别是(x0,y0),(x1,y1),(x2,y2) ；(x1,y1)这个是控制点，控制点不会落在曲线上；实际上，这个点还会手写获取的实际点，却落在曲线上
//     len = this.distance({
//       x: x2,
//       y: y2
//     }, {
//       x: x0,
//       y: y0
//     });
//     lastRadius = this.data.radius;
//     for (let n = 0; n < line.length - 1; n++) {
//       dis += line[n].dis;
//       time += line[n].time - line[n + 1].time;
//       if (dis > this.data.smoothness) break;
//     }
//     this.setData({
//       radius: Math.min(time / len * this.data.pressure + this.data.lineMin, this.data.lineMax) * this.data.lineSize
//     });
//     line[0].r = this.data.radius;
//     //计算笔迹半径；
//     if (line.length <= 2) {
//       r0 = (lastRadius + this.data.radius) / 2;
//       r1 = r0;
//       r2 = r1;
//       //return;
//     } else {
//       r0 = (line[2].r + line[1].r) / 2;
//       r1 = line[1].r;
//       r2 = (line[1].r + line[0].r) / 2;
//     }
//     let n = 5;
//     let point = [];
//     for (let i = 0; i < n; i++) {
//       let t = i / (n - 1);
//       let x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * x1 + t * t * x2;
//       let y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * y1 + t * t * y2;
//       let r = lastRadius + (this.data.radius - lastRadius) / n * i;
//       point.push({
//         x: x,
//         y: y,
//         r: r
//       });
//       if (point.length == 3) {
//         let a = this.ctaCalc(point[0].x, point[0].y, point[0].r, point[1].x, point[1].y, point[1].r, point[2].x, point[2].y, point[2].r);
//         a[0].color = this.data.lineColor;
//         // let bethelPoint = this.data.bethelPoint;
//         // console.log(a)
//         // console.log(this.data.bethelPoint)
//         // bethelPoint = bethelPoint.push(a);
//         this.bethelDraw(a, 1);
//         point = [{
//           x: x,
//           y: y,
//           r: r
//         }];
//       }
//     }
//     this.setData({
//       currentLine: line
//     })
//   },
//   //求两点之间距离
//   distance(a, b) {
//     let x = b.x - a.x;
//     let y = b.y - a.y;
//     return Math.sqrt(x * x + y * y);
//   },
//   ctaCalc(x0, y0, r0, x1, y1, r1, x2, y2, r2) {
//     let a = [],
//       vx01, vy01, norm, n_x0, n_y0, vx21, vy21, n_x2, n_y2;
//     vx01 = x1 - x0;
//     vy01 = y1 - y0;
//     norm = Math.sqrt(vx01 * vx01 + vy01 * vy01 + 0.0001) * 2;
//     vx01 = vx01 / norm * r0;
//     vy01 = vy01 / norm * r0;
//     n_x0 = vy01;
//     n_y0 = -vx01;
//     vx21 = x1 - x2;
//     vy21 = y1 - y2;
//     norm = Math.sqrt(vx21 * vx21 + vy21 * vy21 + 0.0001) * 2;
//     vx21 = vx21 / norm * r2;
//     vy21 = vy21 / norm * r2;
//     n_x2 = -vy21;
//     n_y2 = vx21;
//     a.push({
//       mx: x0 + n_x0,
//       my: y0 + n_y0,
//       color: "#1A1A1A"
//     });
//     a.push({
//       c1x: x1 + n_x0,
//       c1y: y1 + n_y0,
//       c2x: x1 + n_x2,
//       c2y: y1 + n_y2,
//       ex: x2 + n_x2,
//       ey: y2 + n_y2
//     });
//     a.push({
//       c1x: x2 + n_x2 - vx21,
//       c1y: y2 + n_y2 - vy21,
//       c2x: x2 - n_x2 - vx21,
//       c2y: y2 - n_y2 - vy21,
//       ex: x2 - n_x2,
//       ey: y2 - n_y2
//     });
//     a.push({
//       c1x: x1 - n_x2,
//       c1y: y1 - n_y2,
//       c2x: x1 - n_x0,
//       c2y: y1 - n_y0,
//       ex: x0 - n_x0,
//       ey: y0 - n_y0
//     });
//     a.push({
//       c1x: x0 - n_x0 - vx01,
//       c1y: y0 - n_y0 - vy01,
//       c2x: x0 + n_x0 - vx01,
//       c2y: y0 + n_y0 - vy01,
//       ex: x0 + n_x0,
//       ey: y0 + n_y0
//     });
//     a[0].mx = a[0].mx.toFixed(1);
//     a[0].mx = parseFloat(a[0].mx);
//     a[0].my = a[0].my.toFixed(1);
//     a[0].my = parseFloat(a[0].my);
//     for (let i = 1; i < a.length; i++) {
//       a[i].c1x = a[i].c1x.toFixed(1);
//       a[i].c1x = parseFloat(a[i].c1x);
//       a[i].c1y = a[i].c1y.toFixed(1);
//       a[i].c1y = parseFloat(a[i].c1y);
//       a[i].c2x = a[i].c2x.toFixed(1);
//       a[i].c2x = parseFloat(a[i].c2x);
//       a[i].c2y = a[i].c2y.toFixed(1);
//       a[i].c2y = parseFloat(a[i].c2y);
//       a[i].ex = a[i].ex.toFixed(1);
//       a[i].ex = parseFloat(a[i].ex);
//       a[i].ey = a[i].ey.toFixed(1);
//       a[i].ey = parseFloat(a[i].ey);
//     }
//     return a;
//   },
//   bethelDraw(point, is_fill, color) {
//     let ctx = this.data.ctx;
//     ctx.beginPath();
//     ctx.moveTo(point[0].mx, point[0].my);
//     if (undefined != color) {
//       ctx.setFillStyle(color);
//       ctx.setStrokeStyle(color);
//     } else {
//       ctx.setFillStyle(point[0].color);
//       ctx.setStrokeStyle(point[0].color);
//     }
//     for (let i = 1; i < point.length; i++) {
//       ctx.bezierCurveTo(point[i].c1x, point[i].c1y, point[i].c2x, point[i].c2y, point[i].ex, point[i].ey);
//     }
//     ctx.stroke();
//     if (undefined != is_fill) {
//       ctx.fill(); //填充图形 ( 后绘制的图形会覆盖前面的图形, 绘制时注意先后顺序 )
//     }
//     ctx.draw(true)
//   },
//   selectColorEvent(event) {
//     console.log(event)
//     var color = event.currentTarget.dataset.colorValue;
//     var colorSelected = event.currentTarget.dataset.color;
//     this.setData({
//       selectColor: colorSelected,
//       lineColor: color
//     })
//   },

//   //将Canvas内容转成 临时图片 --> cb 为回调函数 形参 tempImgPath 为 生成的图片临时路径
//   canvasToImg(cb) { //这种写法移动端 出不来

//     this.data.ctx.draw(true, () => {
//       wx.canvasToTempFilePath({
//         canvasId: 'handWriting',
//         fileType: 'png',
//         quality: 1, //图片质量
//         success(res) {
//           // console.log(res.tempFilePath, 'canvas生成图片地址');

//           wx.showToast({
//             title: '执行了吗？',
//           })

//           cb(res.tempFilePath);
//         }

//       })
//     });


//   },

//   //完成
//   subCanvas() {
//     // console.log(121);
//     /*		
//         this.data.ctx.draw( true, ()=>{
//           wx.canvasToTempFilePath({
//             canvasId: 'handWriting',
//             fileType: 'png',
//             quality: 1, //图片质量
//             success(res){
//     */

//     // console.log(res.tempFilePath, 'canvas生成图片地址');
//     /*
//     					wx.showModal({
//     						title: '哈哈啊',
//     						content: '这是什么',
//     					})
//     */
//     /*
//     					wx.showToast({
//     						title: '以保存',
//     					})
//     */
//     //保存到系统相册
//     /*					
//     					wx.saveImageToPhotosAlbum({
//     						filePath: res.tempFilePath,
//     						success(res) { 

//     							console.log(res,'保存res');

//     							wx.showToast( {
//     								title: '已成功保存到相册',
//     								duration: 2000
//     							} );

//     						}
//     					})
//     */



//     /*

//             }
//           })
//         } );
//     */





//   },

//   //保存到相册
//   saveCanvasAsImg() {
//     var _this = this
//     wx.showLoading({  // 显示加载中loading效果 
//       title: "加载中",
//       mask: true  //开启蒙版遮罩
//     });
//     wx.canvasToTempFilePath({
//       canvasId: 'handWriting',
//       success: function (res) {
//         var tempFilePath = res.tempFilePath;
//         console.log(res.tempFilePath)
//         wx.getFileSystemManager().readFile({
//           filePath: tempFilePath, //选择图片返回的相对路径
//           encoding: 'base64', //编码格式
//           success: res => { //成功的回调
//             var out_picture = res.data
//             console.log(out_picture)
//             console.log(_this.data.this_id)
//             wx.cloud.callFunction({
//               name: 'sqlServer_cw',
//               data: {
//                 query: "update contract_picture set picture = '" + out_picture+ "' where id =" + _this.data.this_id
//               },
//               success: res => {
//                 wx.showToast({
//                   title: '保存成功！',
//                   icon: 'none'
//                 })
//                 wx.hideLoading();
//               },
//               err: res => {
//                 console.log("错误!")
//                 wx.hideLoading();
//               },
//               fail: res => {
//                 wx.showToast({
//                   title: '请求失败！',
//                   icon: 'none'
//                 })
//                 console.log("请求失败！")
//                 wx.hideLoading();
//               }
//             })
//           }
//         })
//       },
//       fail: function (res) {
//         console.log(res);
//         wx.hideLoading();
//       }
//     });
    
//     /*
//     		this.canvasToImg( tempImgPath=>{
//     			// console.log(tempImgPath, '临时路径');

//     			wx.saveImageToPhotosAlbum({
//     				filePath: tempImgPath,
//     				success(res) {

//     					wx.showToast({
//     						title: '已保存到相册',
//     						duration: 2000
//     					});

//     				}
//     			})

//     		} );
//     */

//     // wx.canvasToTempFilePath({
//     //   canvasId: 'handWriting',
//     //   fileType: 'png',
//     //   quality: 1, //图片质量
//     //   success(res) {
//     //     // console.log(res.tempFilePath, 'canvas生成图片地址');
//     //     wx.saveImageToPhotosAlbum({
//     //       filePath: res.tempFilePath,
//     //       success(res) {

//     //         wx.showToast({
//     //           title: '已保存到相册',
//     //           duration: 2000
//     //         });

//     //       }
//     //     })
//     //   }
//     // })



//   },

//   saveCanvasAsImg1() {
//     var _this = this
//     wx.showLoading({  // 显示加载中loading效果 
//       title: "加载中",
//       mask: true  //开启蒙版遮罩
//     });
//     wx.canvasToTempFilePath({
//       canvasId: 'handWriting',
//       success: function (res) {
//         var tempFilePath = res.tempFilePath;
//         console.log(res.tempFilePath)
//         let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
//             let prevPage = pages[ pages.length - 2 ]; 
//             prevPage.setData({
//               qianzi_pitcure : res.tempFilePath,
              
//               qianzi_id : _this.data.this_id
//             }),
//             _this.setData({
//               qianzi_pitcurenew: res.tempFilePath  
//             });
//             wx.hideLoading();
//             console.log("hechengimge");
//             _this.hechengimge();
//             console.log("hechengimgeend");
//       },
//       fail: function (res) {
//         console.log(res);
//         wx.hideLoading();
//       }
//     });
    
//     /*
//     		this.canvasToImg( tempImgPath=>{
//     			// console.log(tempImgPath, '临时路径');

//     			wx.saveImageToPhotosAlbum({
//     				filePath: tempImgPath,
//     				success(res) {

//     					wx.showToast({
//     						title: '已保存到相册',
//     						duration: 2000
//     					});

//     				}
//     			})

//     		} );
//     */

//     // wx.canvasToTempFilePath({
//     //   canvasId: 'handWriting',
//     //   fileType: 'png',
//     //   quality: 1, //图片质量
//     //   success(res) {
//     //     // console.log(res.tempFilePath, 'canvas生成图片地址');
//     //     wx.saveImageToPhotosAlbum({
//     //       filePath: res.tempFilePath,
//     //       success(res) {

//     //         wx.showToast({
//     //           title: '已保存到相册',
//     //           duration: 2000
//     //         });

//     //       }
//     //     })
//     //   }
//     // })



//   },
// //本地
// savelocal() {
//   var _this = this
//   wx.canvasToTempFilePath({
//     canvasId: 'handWriting',
//     fileType: 'jpg',
//     quality: 1, //图片质量
//     success(res) {
//       // console.log(res.tempFilePath, 'canvas生成图片地址');
//       wx.saveImageToPhotosAlbum({
//         filePath: res.tempFilePath,
//         success(res) {

//           wx.showToast({
//             title: '已保存到相册',
//             duration: 2000
//           });

//         }
//       })
//     }

//   })


 
// },
 
//   //预览
//   previewCanvasImg() {

//     wx.canvasToTempFilePath({
//       canvasId: 'handWriting',
//       fileType: 'jpg',
//       quality: 1, //图片质量
//       success(res) {
//         // console.log(res.tempFilePath, 'canvas生成图片地址');


//         wx.previewImage({
//           urls: [res.tempFilePath], //预览图片 数组
//         })

//       }

//     })

//     /*	//移动端出不来  ^~^！！

//     		this.canvasToImg( tempImgPath=>{

//     			wx.previewImage({
//     				urls: [tempImgPath], //预览图片 数组
//     			})


//     		} );

//     */

//   },

//   //上传
//   uploadCanvasImg() {
//     // console.log(999);

//     wx.canvasToTempFilePath({
//       canvasId: 'handWriting',
//       fileType: 'png',
//       quality: 1, //图片质量
//       success(res) {
//         // console.log(res.tempFilePath, 'canvas生成图片地址');

//         //上传
//         wx.uploadFile({
//           url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
//           filePath: res.tempFilePath,
//           name: 'file_signature',
//           formData: {
//             user: 'test'
//           },
//           success(res) {
//             const data = res.data
//             // do something
//           }
//         })

//       }

//     })


//   },

//   //设置canvas背景色  不设置  导出的canvas的背景为透明 
//   //@params：字符串  color
//   setCanvasBg(color) {
//     var _this = this
//     console.log(999);
//     /* 将canvas背景设置为 白底，不设置  导出的canvas的背景为透明 */
//     //rect() 参数说明  矩形路径左上角的横坐标，左上角的纵坐标, 矩形路径的宽度, 矩形路径的高度
//     //这里是 canvasHeight - 4 是因为下边盖住边框了，所以手动减了写
//     this.data.ctx.rect(0, 0, this.data.canvasWidth, this.data.canvasHeight - 4);
//     // ctx.setFillStyle('red')
//     this.data.ctx.setFillStyle(color)
//     // this.data.ctx.drawImage('http://yhocn.cn/images/up_images/20129519303.jpg', 100, 100, 300, 500); 
//     // this.data.ctx.drawImage('../../resources/images/baomixieyi.png', 100, 100, 300, 500); 
//     // this.data.ctx.drawImage('../../resources/images/baomixieyi.png', 0, 0, 150, 100)
//     this.data.ctx.fill() //设置填充
//     this.data.ctx.draw() //开画


//   },

//     //设置canvas背景色  不设置  导出的canvas的背景为透明 
//   //@params：字符串  color
//   setCanvasBg1(color) {

//     console.log(999);
//     /* 将canvas背景设置为 白底，不设置  导出的canvas的背景为透明 */
//     //rect() 参数说明  矩形路径左上角的横坐标，左上角的纵坐标, 矩形路径的宽度, 矩形路径的高度
//     //这里是 canvasHeight - 4 是因为下边盖住边框了，所以手动减了写
//     this.data.ctx.rect(0, 0, this.data.canvasWidth, this.data.canvasHeight - 4);
//     // ctx.setFillStyle('red')
//     this.data.ctx.setFillStyle(color)
//     // this.data.ctx.drawImage('http://yhocn.cn/images/up_images/20129519303.jpg', 100, 100, 300, 500); 
//     // this.data.ctx.drawImage('../../resources/images/baomixieyi.png', 100, 100, 300, 500); 
//     // this.data.ctx.drawImage('../../resources/images/baomixieyi.png', 0, 0, 150, 100)
//     this.data.ctx.fill() //设置填充
//     this.data.ctx.draw() //开画


//   },

//   //lewis 
//   fixedImage(ctx, url, width, height, startX, startY, isCrossOrigin = true) {
//     let img = new Image()
//     if (isCrossOrigin) img.crossOrigin = '*'
//     img.onload = function () {
//       const oldWidth = this.width //图片实际宽度
//       const oldHeight = this.height //图片实际高度
//       const dw = width / oldWidth //容器宽度 /图片实际宽度
//       const dh = height / oldHeight //容器高度/ 图片实际高度

//       if (oldWidth > width && oldHeight > height || oldWidth < width && oldHeight < height) { //图片宽高都偏大&宽高都偏小
//         if (dw > dh) { //偏宽
//           ctx.drawImage(img, 0, (oldHeight - height / dw) / 2, oldWidth, height / dw, startX, startY, width, height)
//         } else {
//           ctx.drawImage(img, (oldWidth - width / dh) / 2, 0, width / dh, oldHeight, startX, startY, width, height)
//         }
//       } else { //拉伸图片
//         if (oldWidth < width) {
//           ctx.drawImage(img, 0, (oldHeight - height / dw) / 2, oldWidth, height / dw, startX, startY, width, height)
//         } else {
//           ctx.drawImage(img, (oldWidth - width / dh) / 2, 0, width / dh, oldHeight, startX, startY, width, height)
//         }
//       }
//     }
//   },
//   backew() {
//     var _this = this
//     const ctx = wx.createCanvasContext('handWriting')
//     console.log(_this.data.this_picture)
//     // this.data.ctx.rect(0, 0, 640 ,905);
    
//     // var oldWidth = "" //图片实际宽度
//     // var oldHeight = "" //图片实际高度
//     // var startX =  0
//     // var startY = 0
//     // var width = _this.data.canvasWidth
//     // var height = _this.data.canvasHeight
//     // var img = _this.data.this_picture
//     // wx.getImageInfo({
//     //   src: _this.data.this_picture,
//     //   success:function(res){
//     //     oldWidth = res.width,
//     //     oldHeight = res.height
//     //     console.log(res.width)
//     //     console.log(res.height)
//     //   }
//     // })
//     // console.log("width:" +oldWidth)
//     // console.log("height:" +oldHeight)
//     // const dw = _this.data.canvasWidth / oldWidth //容器宽度 /图片实际宽度
//     // const dh = _this.data.canvasHeight / oldHeight //容器高度/ 图片实际高度
    
//     // if (oldWidth > width && oldHeight > height || oldWidth < width && oldHeight < height) { //图片宽高都偏大&宽高都偏小
//     //   if (dw > dh) { //偏宽
//     //     ctx.drawImage(img, 0, (oldHeight - height / dw) / 2, oldWidth, height / dw, startX, startY, width, height)
//     //   } else {
//     //     ctx.drawImage(img, (oldWidth - width / dh) / 2, 0, width / dh, oldHeight, startX, startY, width, height)
//     //   }
//     // } else { //拉伸图片
//     //   if (oldWidth < width) {
//     //     ctx.drawImage(img, 0, (oldHeight - height / dw) / 2, oldWidth, height / dw, startX, startY, width, height)
//     //   } else {
//     //     ctx.drawImage(img, (oldWidth - width / dh) / 2, 0, width / dh, oldHeight, startX, startY, width, height)
//     //   }
//     // }


//     // ctx.drawImage(_this.data.this_picture, 0, 0, 640 ,905 )
//     // ctx.draw()
//     console.log('backew');
    
//   },

//   backew1() {
//     const ctx = wx.createCanvasContext('handWriting')
//       ctx.drawImage('../../../images/baopan.png', 0, 0, 250, 300)
//     //  ctx.drawImage('http://yhocn.cn/images/up_images/20129519303.jpg', 0, 0, 250, 300)
//     ctx.draw()
//     console.log('backew');
//     // wx.chooseImage({
//     //   success: function (res) {
//     //     ctx.drawImage('../../resources/images/baomixieyi.png', 0, 0, 150, 100)
//     //     ctx.draw()
//     //   }
//     // })
//   },

//   retDraw1() {
//     this.data.ctx.clearRect(0, 0, 700, 730)
//     this.data.ctx.draw();

//     //设置canvas背景
//     // this.setCanvasBg("#11119b");
//     this.setCanvasBg1("#fff");
//     this.backew1();
//     //lewis 
//     // const canvasDom = document.getElementById('handWriting');
//     // let ctx = canvasDom.getContext("2d");
//     // this.fixedImage(ctx, this.dataInfo.banner, 600, 354, 20, 148);
//   },

//   uploadSign_yunhanshu() {
//     var that = this;
//     var context1 = that.data.context1;   
//     const cloudPath = 'SY_LHDataAnalysis/txt/1.jpg'   
//     context1.draw(true, wx.canvasToTempFilePath({
//       canvasId: 'handWriting',
//       destWidth: 180,
//       destHeight: 100,
//       success(res) {
//         that.setData({
//           src: res.tempFilePath  
          
//         });
//         wx.cloud.uploadFile({
//           cloudPath,
//           filePath: res.tempFilePath,
//           name: 'file',
         
//           // url: cloudPath,// 这里写上传图片的地址
//           formData: {
//            signName: "a.jpg"
//             // signName: that.data.optionDe.signName
//           },
//           header: {
//             "Content-Type": "multipart/form-data"
//           },
//           timeout: 0,
//           success: (result) => {
//             console.log(result, 'file');
//             wx.showToast( {
//               title: '已成功上传云端',
//               duration: 2000
//             } );
//           },
//           fail: (res) => { console.log("323失败", res);},
//           complete: (res) => {},
          
//         })
  
//       }
//     }))
//   }


// })

//声明文件系统
const fs = wx.getFileSystemManager();
//随机定义路径名称
var times = new Date().getTime();
var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';

// Page({
//   data: {
//     // Cimg: "../../images/1.png",
//     pen: 3, //画笔粗细默认值
//     color: '#cc0033', //画笔颜色默认值
//     canvas: null,
//     ctx: null,
//     ImgWidth: '',
//     ImgHeight: '',
//     text: "null",
//     text1: "null",
//     canvas_width:'',
//     canvas_height:'',
//     TEW:'',
//     TEH:'',
//   },
//   startX: 0, //保存X坐标轴变量
//   startY: 0, //保存y坐标轴变量
//   startX_2: 0, //保存第二X坐标轴变量
//   startY_2: 0, //保存第二y坐标轴变量
//   isClear: false, //是否启用橡皮擦标记
//   ini_distance: null, //两点距离
//   dustance: null,
//   tempFilePath: null, //临时图片保存路径
//   // 在页面初次渲染完成生命周期获取操作canvas的上下文对象
//   onLoad : function(options){
//     var _this = this
//     var canvas_height = ''
//     var canvas_width = ''
//     var userInfo = JSON.parse(options.userInfo)
//     var this_id = userInfo.id
//     console.log(this_id)

//     wx.cloud.callFunction({
//       name: 'sqlServer_cw',
//       data: {
//         query: "select * from contract_picture where id = " + this_id 
//       }, 
//       success: res => {
//         console.log(res.result.recordset)
//         var list = res.result.recordset[0].picture
//         fs.writeFile({
//           filePath: codeimg,
//           data: list,
//           encoding: 'base64',
//           success: (res) => {
//             //写入成功了的话，新的图片路径就能用了
//             console.log(res)
//             console.log(codeimg)
//             wx.getImageInfo({
//               src: codeimg,
//               success:function(res){
//                 canvas_width = res.width,
//                 canvas_height = res.height
//                 _this.setData({
//                   canvas_width : canvas_width,
//                   canvas_height : canvas_height,
//                   ImgWidth : canvas_width,
//                   ImgHeight : canvas_height,
//                   TW:canvas_width,
//                   TH:canvas_height,
//                   TEW:canvas_width,
//                   TEH:canvas_height,
//                   Cimg: codeimg,
//                   Cimg_old:codeimg,
//                   this_id:this_id,
//                   picture_id : userInfo.id,
//                   qianzi_type : userInfo.qianzi_type,
//                   image : codeimg
//                 })
//                 console.log(res.width)
//                 console.log(res.height)
//                 _this.onReady()
//               }
//             })
//           }
//         });
//       },
//       err: res => {
//         console.log("错误!")
//       },
//       fail: res => {
//         wx.showToast({
//           title: '请求失败！',
//           icon: 'none',
//           duration: 3000
//         })
//         console.log("请求失败！")
//       }
//     })

//   },
//   onReady() {
//     var _this = this
//     console.log('onReady_start')
//     const query = wx.createSelectorQuery()
//     query.select('#Canvas')
//       .fields({ node: true, size: true })
//       .exec((res) => {
//         const canvas = res[0].node
//         const ctx = canvas.getContext('2d')
//         canvas.width = _this.data.canvas_width
//         canvas.height = _this.data.canvas_height
//         ctx.clearRect(0,0,canvas._width,canvas._height);
//         ctx.beginPath();
//       const bg = canvas.createImage()
//       bg.src = this.data.Cimg_old
//       _this.setData({
//         Cimg : this.data.Cimg_old,
//         image : this.data.Cimg_old
//       })
//       bg.onload = () => {
//         ctx.drawImage(bg, 0, 0, _this.data.canvas_width, _this.data.canvas_height)
//       }
//         this.setData({ canvas, ctx })
//       })
//   },

//   // settest: function (){
//   //   var _this = this;
//   //   wx.canvasToTempFilePath({
//   //     //这里写canvas为获取或者创建的canvas对象 不要按照文档里写canvasId ，否则会有fail canvas is empty 的报错
//   //       canvas:this.data.canvas, 
//   //       width: this.data.TEW,
//   //       height: this.data.TEH,
//   //       destWidth: this.data.TEW,
//   //       destHeight: this.data.TEH,
//   //       quality:1,
//   //       success: function (res) {
//   //         const image = _this.data.canvas.createImage();
//   //         image.src = res.tempFilePath;
//   //         _this.setData({
//   //           Cimg: res.tempFilePath,
//   //         })
//   //       },
//   //       fail:function(res){
//   //           console.log(res)    
//   //       }
//   //   })
//   // },

//   settest: function (){
//     var _this = this;
//     wx.canvasToTempFilePath({
//         canvas:this.data.canvas, 
//         width: this.data.TEW,
//       height: this.data.TEH,
//       destWidth: this.data.TEW,
//       destHeight: this.data.TEH,
//       quality:1,
//         success: function (res) {
//           const image = _this.data.canvas.createImage();
//           image.src = res.tempFilePath;
//           _this.setData({
//               image: image,
//               Cimg: res.tempFilePath,
//           })
//         },
//         fail:function(res){
//             console.log(res)    
//         }
//     })
//   },

//   //手指触摸动作开始
//   touchStart: function (e) {
//     //得到触摸点的坐标
//     this.startX = e.touches[0].x
//     this.startY = e.touches[0].y
//     this.context = this.data.ctx;
//     if (e.touches.length == 1) {
//       this.context.fillStyle = this.data.color
//       this.context.lineWidth = this.data.pen
//       this.context.lineCap = 'round' // 让线条圆润 
//       this.context.beginPath()
//     }
//     if(e.touches.length == 2){
//       let xMove = e.touches[1].x - e.touches[0].x;
//       let yMove = e.touches[1].y - e.touches[0].y;
//       console.log("touchStart" + xMove,yMove)
//       this.setData({
//         distance: Math.sqrt(xMove * xMove + yMove * yMove),
//       })
//     }
//   },

//   // touchStart(e) {
//   //           //得到触摸点的坐标
//   //           this.startX = e.touches[0].x
//   //           this.startY = e.touches[0].y
//   //           this.context = this.data.ctx;
//   //           if (e.touches.length == 1) {
//   //               this.context.fillStyle = this.data.color
//   //               this.context.lineWidth = this.data.pen
//   //               this.context.lineCap = 'round' // 让线条圆润 
//   //               this.context.beginPath()
//   //           }
  
//   //     if(e.touches.length == 2){
//   //       let xMove = e.touches[1].x - e.touches[0].x;
//   //       let yMove = e.touches[1].y - e.touches[0].y;
//   //       this.setData({
//   //         distance: Math.sqrt(xMove * xMove + yMove * yMove),
//   //      })
//   //     }
//   //   },

//   touchMove(e) {
//     this.context = this.data.ctx;
//     if (e.touches.length == 1) {
//         var startX1 = e.touches[0].x
//         var startY1 = e.touches[0].y
//           this.context.moveTo(this.startX, this.startY)
//           this.context.lineTo(startX1, startY1)
//           this.context.stroke()
//           this.startX = startX1;
//           this.startY = startY1;
//     }
//     if(e.touches.length == 2){
//      //this.data.ctx.clearRect(0, 0, 10000, 10000)
//       let xMove = e.touches[1].x - e.touches[0].x;
//       let yMove = e.touches[1].y - e.touches[0].y;
//       console.log("touchMove" + xMove,yMove)
//       let distance = Math.sqrt(xMove * xMove + yMove * yMove);
//       let distanceDiff = distance - this.data.distance;
      
//       this.imgsize(distanceDiff);
//     }
//   },

//   imgsize:function (distance){
//     return new Promise( async (resolve, reject) => {
//       const image = this.data.canvas.createImage();
//       image.src = this.data.Cimg
//       //image.src =  this.data.imgsrc ;
//       //
//       // 创建一个图片对象
//      let distanceDiff = parseInt(distance);
//      if((this.data.TW + (distanceDiff)) >this.data.canvas_width || (this.data.TH + (distanceDiff)) >this.data.canvas_height){

//         this.setData({
//             TW: (this.data.TEW  + (distanceDiff)),
//             TH: (this.data.TEH  + (distanceDiff)),
//             text:distanceDiff,
//         })
//         this.data.canvas.width = this.data.TW
//         this.data.canvas.height = this.data.TH
//         console.log(this.data.image)
//         this.data.ctx.drawImage(this.data.image, 0, 0, (this.data.TW ), (this.data.TH ))
//      }
//   })
//   },

//   //手指触摸动作结束
//   touchEnd(e) {
//     console.log("touchEnd" + this.data.TW,this.data.TH)
//     this.setData({
//       TEW:(this.data.TW),
//       TEH:(this.data.TH)
//     })
//     this.settest();
//   },

//     //预览
//   previewCanvasImg() {
//     wx.canvasToTempFilePath({
//       canvas:this.data.canvas, 
//       width: this.data.TEW,
//       height: this.data.TEH,
//       destWidth: this.data.TEW,
//       destHeight: this.data.TEH,
//       fileType: 'jpg',
//       quality: 1, //图片质量
//       success(res) {
//         // console.log(res.tempFilePath, 'canvas生成图片地址');
//         wx.previewImage({
//           urls: [res.tempFilePath], //预览图片 数组
//         })
//       }
//     })
//   },

//   //本地
// savelocal() {
//   var _this = this
//   wx.canvasToTempFilePath({
//     canvas:this.data.canvas, 
//     width: this.data.TEW,
//     height: this.data.TEH,
//     destWidth: this.data.TEW,
//     destHeight: this.data.TEH,
//     fileType: 'jpg',
//     quality: 1, //图片质量
//     success(res) {
//       // console.log(res.tempFilePath, 'canvas生成图片地址');
//       wx.saveImageToPhotosAlbum({
//         filePath: res.tempFilePath,
//         success(res) {
//           wx.showToast({
//             title: '已保存到相册',
//             duration: 2000
//           });
//         }
//       })
//     }
//   })
// },

//   saveCanvasAsImg1() {
//     var _this = this
//     wx.canvasToTempFilePath({
//       canvas:this.data.canvas, 
//       width: this.data.TEW,
//       height: this.data.TEH,
//       destWidth: this.data.TEW,
//       destHeight: this.data.TEH,
//       success: function (res) {
//         var tempFilePath = res.tempFilePath;
//         console.log("jieguo:"+tempFilePath)
//         wx.getFileSystemManager().readFile({
//           filePath: tempFilePath, //选择图片返回的相对路径
//           encoding: 'base64', //编码格式
//           success: res => { //成功的回调
//             var out_picture = res.data
//             console.log(out_picture)
//             console.log(_this.data.this_id)
//             wx.cloud.callFunction({
//               name: 'sqlServer_cw',
//               data: {
//                 query: "update contract_picture set picture = '" + out_picture+ "' where id =" + _this.data.this_id
//               },
//               success: res => {
//                 wx.showToast({
//                   title: '保存成功！',
//                   icon: 'none'
//                 })
//                 wx.hideLoading();
//               },
//               err: res => {
//                 console.log("错误!")
//                 wx.hideLoading();
//               },
//               fail: res => {
//                 wx.showToast({
//                   title: '请求失败！',
//                   icon: 'none'
//                 })
//                 console.log("请求失败！")
//                 wx.hideLoading();
//               }
//             })
//           }
//         })
//       }
//     })
//   },

// })

Page({
  data: {
    imgsrc: '',
    canvas: null,
    ctx: null,
    image:null,
    distance:null,
    tempImg:null,
    text:"null",
    pen: 3, //画笔粗细默认值
    color: '#cc0033', //画笔颜色默认值
    TW:400,
    TH:400,
    TEW:400,
    TEH:400,
  },

  startX: 0, //保存X坐标轴变量
  startY: 0, //保存y坐标轴变量
  startX_2: 0, //保存第二X坐标轴变量
  startY_2: 0, //保存第二y坐标轴变量
  ini_distance: null, //两点距离
  dustance: null,
  tempFilePath: null, //临时图片保存路径
  context:null,
  onLoad : function(options){
    var _this = this
    var canvas_height = ''
    var canvas_width = ''
    var userInfo = JSON.parse(options.userInfo)
    var this_id = userInfo.id
    console.log(this_id)

    wx.cloud.callFunction({
      name: 'sqlServer_cw',
      data: {
        query: "select * from contract_picture where id = " + this_id 
      }, 
      success: res => {
        console.log(res.result.recordset)
        var list = res.result.recordset[0].picture
        wx.cloud.downloadFile({
          fileID: list, // 文件 ID
          success: res => {
            //写入成功了的话，新的图片路径就能用了
            console.log(res)
            console.log(res.tempFilePath)
            var tempfilepath = res.tempFilePath
            wx.getImageInfo({
              src: res.tempFilePath,
              success:function(res){
                console.log(res)
                canvas_width = res.width,
                canvas_height = res.height
                _this.setData({
                  TW:res.width,
                  TH:res.height,
                  TEW:res.width,
                  TEH:res.height,
                  canvas_width:canvas_width,
                  canvas_height:canvas_height,
                  image:tempfilepath,
                  image_old:tempfilepath,
                  this_id:this_id,
                  picture_id : userInfo.id,
                  qianzi_type : userInfo.qianzi_type,
                  image : tempfilepath
                })
                console.log(res.width)
                console.log(res.height)
                _this.onReady()
              }
            })
          }
        });
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

  // 在页面初次渲染完成生命周期获取操作canvas的上下文对象
  onReady() {
    var _this = this
    const query = wx.createSelectorQuery()
    query.select('#Canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        this.setData({ canvas, ctx })
      })
      _this.chooseImages()
  },

  imgsize:function (distance){
    var _this = this
    return new Promise( async (resolve, reject) => {
      // const imgInfo = await wx.getImageInfo({ src: _this.data.image })

      // 创建一个图片对象
     let distanceDiff = parseInt(distance);
     if((this.data.TW + (distanceDiff)) > this.data.canvas_width || (this.data.TH + (distanceDiff)) > this.data.canvas_height){
        this.setData({
            TW: (this.data.TEW  + (distanceDiff)),
            TH: (this.data.TEH  + (distanceDiff)),
        })
        this.data.canvas.width = this.data.TW
        this.data.canvas.height = this.data.TH
        this.data.ctx.drawImage(this.data.image, 0, 0, (this.data.TW ), (this.data.TH ))
     }
  })
  },

    // else{
  //     this.setData({
  //         TEW: (this.data.TEW + (distanceDiff)),
  //         TEH: (this.data.TEH + (distanceDiff)),
  //         text:2,

  //     })
  //       this.data.ctx.drawImage(this.data.image, 0, 0, (this.data.TEW ), (this.data.TEH))
  //    }


  //存储为图片型
  settest: function (){
    var _this = this;
    wx.canvasToTempFilePath({
      canvas:this.data.canvas, 
      width: this.data.TEW,
      height: this.data.TEH,
      destWidth: this.data.TEW,
      destHeight: this.data.TEH,
      quality:1,
        success: function (res) {
          const image = _this.data.canvas.createImage();
          image.src = res.tempFilePath;
          _this.setData({
              image: image,
          })
        },
        fail:function(res){
            console.log(res)    
        }
    })
  },

  touchStart(e) {
          //得到触摸点的坐标
          this.startX = e.touches[0].x
          this.startY = e.touches[0].y
          this.context = this.data.ctx;
          if (e.touches.length == 1) {
              this.context.fillStyle = this.data.color
              this.context.lineWidth = this.data.pen
              this.context.lineCap = 'round' // 让线条圆润 
              this.context.beginPath()
          }

    if(e.touches.length == 2){
      let xMove = e.touches[1].x - e.touches[0].x;
      let yMove = e.touches[1].y - e.touches[0].y;
      this.setData({
        distance: Math.sqrt(xMove * xMove + yMove * yMove),
     })
    }
  },
  
  touchMove(e) {
    this.context = this.data.ctx;
    if (e.touches.length == 1) {
        var startX1 = e.touches[0].x
        var startY1 = e.touches[0].y
          this.context.moveTo(this.startX, this.startY)
          this.context.lineTo(startX1, startY1)
          this.context.stroke()
          this.startX = startX1;
          this.startY = startY1;
    }
    if(e.touches.length == 2){
     //this.data.ctx.clearRect(0, 0, 10000, 10000)
      let xMove = e.touches[1].x - e.touches[0].x;
      let yMove = e.touches[1].y - e.touches[0].y;
      let distance = Math.sqrt(xMove * xMove + yMove * yMove);
      let distanceDiff = distance - this.data.distance;
      
      this.imgsize(distanceDiff);
    }
  },
  touchEnd(e) {
  
    this.setData({
      TEW:(this.data.TW),
        TEH:(this.data.TH)
    })
    this.settest();
  },

  async chooseImages() {
    await this.addWatermark()
  },
  addWatermark(tempFilePath) {
    var _this = this
    return new Promise( async (resolve, reject) => {
        // 获取图片信息
        // const imgInfo = await wx.getImageInfo({ src: "../../images/1.png" })
        // 设置canvas宽高
        this.data.canvas.width = this.data.TW
        this.data.canvas.height = this.data.TH
        // 创建一个图片对象
        console.log('dd ' + _this.data.image_old)
        const image = this.data.canvas.createImage();
        image.src = _this.data.image_old
        this.setData({
          image: image,
       })
        this.data.image = image;
        image.onload = () => {
          this.data.ctx.drawImage(image, 0, 0, _this.data.canvas_width,  _this.data.canvas_height)
        }
    })
  },

    saveCanvasAsImg1() {
    var _this = this
    wx.canvasToTempFilePath({
      canvas:this.data.canvas, 
      width: this.data.TEW,
      height: this.data.TEH,
      destWidth: this.data.TEW,
      destHeight: this.data.TEH,
      quality:1,
      fileType:'png',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log("jieguo:"+tempFilePath)
        const name = Math.random() * 1000000;
        const cloudPath = name + tempFilePath.match(/\.[^.]+?$/)[0]
        // wx.getFileSystemManager().readFile({
        //   filePath: tempFilePath, //选择图片返回的相对路径
        //   encoding: 'base64', //编码格式
        //   success: res => { //成功的回调
        //     var out_picture = res.data
        //     console.log(out_picture)
        //     console.log(_this.data.this_id)
        wx.cloud.uploadFile({
          cloudPath: "contract_pitcure/" + cloudPath, //云存储图片名字
          filePath:tempFilePath, //临时路径
          success: res => {
            console.log('[上传图片] 成功：', res)
            let fileID = res.fileID;
            wx.cloud.callFunction({
              name: 'sqlServer_cw',
              data: {
                query: "update contract_picture set picture = '" + fileID + "' where id =" + _this.data.this_id
              },
              success: res => {
                wx.showToast({
                  title: '保存成功！',
                  icon: 'none'
                })
                wx.hideLoading();
              },
              err: res => {
                console.log("错误!")
                wx.hideLoading();
              },
              fail: res => {
                wx.showToast({
                  title: '请求失败！',
                  icon: 'none'
                })
                console.log("请求失败！" + res)
                wx.hideLoading();
              }
            })
            //把图片存到users集合表
          },
          fail: e => {
            console.error('[上传图片] 失败：', e)
          }
        });
        //   }
        // })
      }
    })
  },

    //本地
savelocal() {
  var _this = this
  wx.canvasToTempFilePath({
    canvas:this.data.canvas, 
    width: this.data.TEW,
    height: this.data.TEH,
    destWidth: this.data.TEW,
    destHeight: this.data.TEH,
    fileType: 'jpg',
    quality: 1, //图片质量
    success(res) {
      // console.log(res.tempFilePath, 'canvas生成图片地址');
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) {
          wx.showToast({
            title: '已保存到相册',
            duration: 2000
          });
        }
      })
    }
  })
},

    //预览
  previewCanvasImg() {
    wx.canvasToTempFilePath({
      canvas:this.data.canvas, 
      width: this.data.TEW,
      height: this.data.TEH,
      destWidth: this.data.TEW,
      destHeight: this.data.TEH,
      fileType: 'jpg',
      quality: 1, //图片质量
      success(res) {
        // console.log(res.tempFilePath, 'canvas生成图片地址');
        wx.previewImage({
          urls: [res.tempFilePath], //预览图片 数组
        })
      }
    })
  },

})
