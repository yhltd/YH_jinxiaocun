const app = getApp();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
  
    },
  
    /**
     * 组件的初始数据
     */
    data: {
      tempFilePath:'',
      hideModal: true,
      hasDraw: false,
      canvasName: '#handWriting',
      ctx: '',
      canvasWidth: 0,
      canvasHeight: 0,
      startPoint: {
        x: 0,
        y: 0,
      },
      selectColor: 'black',
      lineColor: '#1A1A1A', // 颜色
      lineSize: 1, // 笔记倍数
      radius: 5, //画圆的半径
    },
    lifetimes: {
      ready() {
        let that = this
        let query = wx.createSelectorQuery().in(this); //获取自定义组件的SelectQuery对象
        this.canvasCtx = wx.createCanvasContext('signature', that)
  
        // 设置线的样式
        this.canvasCtx.setLineCap("round");
        this.canvasCtx.setLineJoin("round");
        // 初始化颜色
        this.canvasCtx.setStrokeStyle(that.data.selectColor);
        // 初始化粗细
  
        query.select('.modal-canvas').boundingClientRect(rect => {
    
          this.setData({
            canvasWidth: rect.width,
            canvasHeight: rect.height,
          });
        }).exec();
      }
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
      show() {
        this.setData({
          hideModal: false
        })
      },
      closeModal() {
        this.clearCanvas()
        this.setData({
          hideModal: true
        })
        this.triggerEvent('closeSignature')
      },
      scaleStart(event) {
        if (event.type != 'touchstart') return false;
        let currentPoint = {
          x: event.touches[0].x,
          y: event.touches[0].y
        }
        // this.data.ctx.moveTo(currentPoint.x, currentPoint.y)
        this.drawCircle(currentPoint);
        this.setData({
          startPoint: currentPoint,
          hasDraw: true, //签字了
        });
      },
      mouseDown() {},
      scaleEnd(e) {
        this.setData({
          isStart: true
        })
      },
      scaleMove(event) {
        if (event.type != "touchmove") return false;
  
        let {
          startPoint
        } = this.data
        let currentPoint = {
          x: event.touches[0].x,
          y: event.touches[0].y
        }
  
        this.drawLine(startPoint, currentPoint)
        this.setData({
          startPoint: currentPoint
        })
      },
      drawCircle(point) { //这里负责点
        let ctx = this.canvasCtx;
        ctx.beginPath();
        // ctx.fillStyle = this.data.lineColor;
        ctx.setFillStyle(this.data.lineColor)
        //笔迹粗细由圆的大小决定
        ctx.arc(point.x, point.y, this.data.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.draw(true)
      },
      drawLine(sourcePoint, targetPoint) {
        let ctx = this.canvasCtx;
        this.drawCircle(targetPoint);
        ctx.beginPath();
        // ctx.strokeStyle = this.data.lineColor;
        ctx.setStrokeStyle(this.data.lineColor)
        // ctx.lineWidth = this.data.radius * 2; //这里乘2是因为线条的粗细要和圆的直径相等
        ctx.setLineWidth(this.data.radius*2)
        ctx.moveTo(sourcePoint.x, sourcePoint.y);
        ctx.lineTo(targetPoint.x, targetPoint.y);
        ctx.stroke();
        ctx.closePath();
        // ctx.draw()
      },
      clearCanvas() { //清空画布
        let ctx = this.canvasCtx;
        ctx.clearRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
        ctx.fillStyle = 'rgba(0, 0, 0, .1)';
        ctx.draw()
        this.setData({
          hasDraw: false //未签字
        })
      },
      getTempFile(){
        return {
          tempFilePath:this.data.tempFilePath
        }
      },
      saveToImage() {
        let {
          hasDraw,
          canvasHeight,
          canvasWidth
        } = this.data
        let that=this
        if (!hasDraw) {
          wx.showToast({
            title: '还未签字哟！',
            icon: 'none',
            mask: true
          })
          return
        }
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: canvasWidth,
          height: canvasHeight,
          canvasId: 'signature',
          success(res) {
            if(res.tempFilePath){
              that.setData({
                tempFilePath:res.tempFilePath,
              })
              app.globalData.file_path_linshi = res.tempFilePath
              console.log(app.globalData.file_path_linshi)
              that.triggerEvent('saveToImage')
              
            }
            console.log(res.tempFilePath)
          },
          fail(err) {
            console.log(err);
          }
        },that)
      }
    }
  })