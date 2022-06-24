// component/signature/index.js

//index.js
import CanvasDrag from '../../components/canvas-drag/canvas-drag';
const app = getApp();
Page({
    data: {
        graph: {},
        qianzi_path:'',
        phone_width:'',
        this_bili:'',
        this_json:[]
    },

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
                  canvas_width = res.width * (750 / wx.getSystemInfoSync().windowWidth);
                  canvas_height = res.height * (750 / wx.getSystemInfoSync().windowWidth);
                  console.log(canvas_width + ' ' + canvas_height)
                  wx.getSystemInfo({
                    success: (res) => {
                      var this_width = res.safeArea.width * (750 / wx.getSystemInfoSync().windowWidth);
                      console.log(this_width)
                      var this_bili = canvas_width / this_width
                      console.log('宽度比例' + this_bili)
                      var this_height =parseInt(canvas_height / this_bili) 
                      console.log(this_height)
                      _this.setData({
                        height: this_height,
                        width:this_width,
                        this_bili: this_bili,
                        canvas_width:canvas_width,
                        canvas_height:canvas_height,
                        image:tempfilepath,
                        this_id:this_id,
                        picture_id : userInfo.id,
                        qianzi_type : userInfo.qianzi_type,
                      });
                      
                    },
                  })
                  CanvasDrag.changeBgImage(tempfilepath);
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

    onReady(){
      this.signature = this.selectComponent("#signature");
    },

    onShow(){

    },

    qianzi_show(){
      this.signature.show();
      console.log('已打开画板')
    },

    saveToImage:function(event){
      this.signature.closeModal();
      this.onAddTest();
    },

    /**
     * 添加测试图片
     */
    onAddTest() {
        console.log(app.globalData.file_path_linshi)
        this.setData({
            graph: {
                w: 120,
                h: 120,
                type: 'image',
                url: app.globalData.file_path_linshi,
            }
        });
    },

    /**
     * 添加图片
     */
    onAddImage() {
        wx.chooseImage({
            success: (res) => {
                this.setData({
                    graph: {
                        w: 200,
                        h: 200,
                        type: 'image',
                        url: res.tempFilePaths[0],
                    }
                });
            }
        })
    },

    /**
     * 添加文本
     */
    onAddText() {
        this.setData({
            graph: {
                type: 'text',
                text: 'helloworld',
            }
        });
    },

    /**
     * 导出图片
     */
    onExport() {
        CanvasDrag.export()
            .then((filePath) => {
                console.log(filePath);
                const name = Math.random() * 1000000;
                const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
                wx.cloud.uploadFile({
                  cloudPath: "contract_pitcure/" + cloudPath, //云存储图片名字
                  filePath:filePath, //临时路径
                  success: res => {
                    console.log('[上传图片] 成功：', res)
                    let fileID = res.fileID;
                    console.log(fileID)
                    // console.log(_this.data.this_id)
                    _this.setData({
                      fileID:fileID
                    })
                    console.log(_this.data.fileID)
                    _this.yunhanshu()
                    // wx.cloud.callFunction({
                    //   name: 'sqlServer_cw',
                    //   data: {
                    //     query: "update contract_picture set picture = '" + fileID + "' where id =" + _this.data.this_id
                    //   },
                    //   success: res => {
                    //     console.log('数据库已更新')
                    //     wx.showToast({
                    //       title: '保存成功！',
                    //       icon: 'none'
                    //     })
                    //     wx.hideLoading();
                    //   },
                    //   err: res => {
                    //     console.log("错误!"+res)
                    //     wx.hideLoading();
                    //   },
                    //   fail: res => {
                    //     console.log('失败'+res)
                    //     wx.showToast({
                    //       title: '请求失败！',
                    //       icon: 'none'
                    //     })
                    //     console.log("请求失败！" + res)
                    //     wx.hideLoading();
                    //   }
                    // })
                    //把图片存到users集合表
                  },
                  fail: e => {
                    console.error('[上传图片] 失败：', e)
                  }
                });
                // wx.saveImageToPhotosAlbum({
                //   filePath: filePath,
                //   success(res) {
                //     wx.showToast({
                //       title: '已保存到相册',
                //       duration: 2000
                //     });
                //   }
                // })
                // wx.previewImage({
                //     urls: [filePath]
                // })
            })
            .catch((e) => {
                console.error(e);
            })
            console.log('end')
    },


        //本地


    /**
     * 改变文字颜色
     */
    onChangeColor() {
        CanvasDrag.changFontColor('blue');
    },

    yunhanshu(){
      console.log('云函数')
      var _this = this
      wx.cloud.callFunction({
        name: 'sqlServer_cw',
        data: {
          query: "update contract_picture set picture = '" + _this.data.fileID + "' where id =" + _this.data.this_id
        },
        success: res => {
          console.log('数据库已更新')
          wx.showToast({
            title: '保存成功！',
            icon: 'none'
          })
          wx.hideLoading();
        },
        err: res => {
          console.log("错误!"+res)
          wx.hideLoading();
        },
        fail: res => {
          console.log('失败'+res)
          wx.showToast({
            title: '请求失败！',
            icon: 'none'
          })
          console.log("请求失败！" + res)
          wx.hideLoading();
        }
      })
    },

    /**
     * 改变背景颜色
     */
    onChangeBgColor() {
        CanvasDrag.changeBgColor('yellow');
    },

    /**
     * 改变背景照片
     */
    onChangeBgImage() {
        var _this = this
        CanvasDrag.changeBgImage(_this.data.image);
    },

    saveAs(){
      var _this = this
      _this.onExportJSON()
      _this.onExport()
    },

    /**
     * 导出当前画布为模板
     */
    onExportJSON(){
        var _this = this
        CanvasDrag.exportJson()
          .then((imgArr) => {
            console.log(JSON.stringify(imgArr));
            if(imgArr.length > 1){
              for(var i=1;i<imgArr.length;i++){
                imgArr[i].x = imgArr[i].x * _this.data.this_bili
                imgArr[i].y = imgArr[i].y * _this.data.this_bili
                imgArr[i].w = imgArr[i].w * _this.data.this_bili
                imgArr[i].h = imgArr[i].h * _this.data.this_bili
              }
            }
            console.log(JSON.stringify(imgArr));
            _this.setData({
              this_json:imgArr,
              width:_this.data.canvas_width,
              height:_this.data.canvas_height
            })
            console.log(imgArr.length)
            _this.onClearCanvas()
            _this.onImport()
        })
          .catch((e) => {
              console.error(e);
          });
    },

    onImport(){
        var _this = this
        // 有背景
        // let temp_theme = [{"type":"bgColor","color":"yellow"},{"type":"image","url":"../../assets/images/test.jpg","y":98.78423143832424,"x":143.78423143832424,"w":104.43153712335152,"h":104.43153712335152,"rotate":-12.58027482265038,"sourceId":null},{"type":"text","text":"helloworld","color":"blue","fontSize":24.875030530031438,"y":242.56248473498428,"x":119.57012176513672,"w":116.73966979980469,"h":34.87503053003144,"rotate":8.873370699754087}];
        // 无背景
        let temp_theme = [{"type":"image","url":"../../assets/images/test.jpg","y":103,"x":91,"w":120,"h":120,"rotate":0,"sourceId":null},{"type":"text","text":"helloworld","color":"blue","fontSize":20,"y":243,"x":97,"rotate":0}];
        console.log(_this.data.this_json)
        CanvasDrag.initByArr(_this.data.this_json);
    },

     onClearCanvas:function(event){
        let _this = this;
        _this.setData({canvasBg:null});
        CanvasDrag.clearCanvas();
        CanvasDrag.changeBgImage(_this.data.image);
    },

    onUndo:function(event){
        CanvasDrag.undo();
    },
});


