const base = require('./base64gb2312');

/**
 * 初始化纸张
 * 0 整个标签的横向偏移量
 * 200 横向分辨率
 * 200 纵向分辨率
 * @param height 150 标签的高度
 * @param number 1 要打印的标签数量
 */
const printUtil = function (height, number) {
  let h = 800;
  let n = 1;
  if (height) {
    h = height;
  }
  if (number) {
    n = number
  }
  this.str = "! 0 200 200 " + h + " " + n + "\r\n";
};

/**
 * 设置字体放大背数
 *  @param w : 1~10倍
 *  @param h : 1~10倍
 */
printUtil.prototype.setFontWidthAndHeight = function (w, h) {
  return this.str = this.str.concat('SETMAG ' + w + ' ' + h + '\r\n');
};

/**
 * 打印文本且换行
 * @param {*} fontSize 字体大小 取值 1 : 8*12大小 ; 55 : 16*16大小 ; 4 : 32*32大小 其他默认 24*24大小
 * @param {*} x 横向起始位置
 * @param {*} y 纵向起始位置
 * @param {*} text 要打印的文本
 */
printUtil.prototype.printlnText = function (fontSize, x, y, text) {
  let t = 8;
  if (t) {
    t = fontSize;
  }
  return this.str = this.str.concat('TEXT ' + t + ' 7 ' + x + ' ' + y + ' ' + text + '\r\n');
};
/**
 * 打印文本且换行 逆时针旋转270度，纵向打印文本
 * @param {*} fontSize 字体大小 取值 1 : 8*12大小 ; 55 : 16*16大小 ; 4 : 32*32大小 其他默认 24*24大小
 * @param {*} x 横向起始位置
 * @param {*} y 纵向起始位置
 * @param {*} text 要打印的文本
 */
printUtil.prototype.printlnText270 = function (fontSize, x, y, text) {
  let t = 8;
  if (t) {
    t = fontSize;
  }
  return this.str = this.str.concat('TEXT270 ' + t + ' 0 ' + x + ' ' + y + ' ' + text + '\r\n');
};
/**
 * 
 * @param {} x0 起点的x坐标
 * @param {} y0 起点的y坐标
 * @param {} x1 终点的x坐标
 * @param {} y1 终点的y坐标
 * @param {} width 线宽
 */
printUtil.prototype.printLine = function (x0, y0, x1, y1, width) {
  return this.str = this.str.concat('LINE ' + x0 + ' ' + y0 + ' ' + x1 + ' ' + y1 + ' ' + width + '\r\n');
};
/**
 * 打印横向条码和文字
 * @param {} x 横向起始位置
 * @param {} y 纵向起始位置
 * @param {} height 条码的高度
 * @param {} data 条码数据
 * 参数解释：BARCODE 横向，128 条码类型，2 窄条的单位宽度 ，1 宽条和窄条的比率 0：1.5:1  1：2.0:1  2：2.5:1  3：3.0:1  ...
 */
printUtil.prototype.printSweepCodeAndText = function (x, y, height, data) {
  this.setSweepCodeText();
  this.str = this.str.concat('BARCODE 128 2 1 ' + height + ' ' + x + ' ' + y + ' ' + data + '\r\n');
  this.setSweepCodeTextEnd();
  return this.str;
};
/**
 * 打印横向条码
 * @param {} x 横向起始位置
 * @param {} y 纵向起始位置
 * @param {} height 条码的高度
 * @param {} data 条码数据
 * 参数解释：BARCODE 横向，128 条码类型，2 窄条的单位宽度 ，1 宽条和窄条的比率 0：1.5:1  1：2.0:1  2：2.5:1  3：3.0:1  ...
 */
printUtil.prototype.printSweepCode = function (x, y, height, data) {
  return this.str = this.str.concat('BARCODE 128 3 1 ' + height + ' ' + x + ' ' + y + ' ' + data + '\r\n');
};

/**
 * 设置横向条码文本起始
 */
printUtil.prototype.setSweepCodeText = function () {
  return this.str = this.str.concat('BARCODE-TEXT 7 0 5\r\n');
};
/**
 * 设置横向条码文本结束
 */
printUtil.prototype.setSweepCodeTextEnd = function () {
  return this.str = this.str.concat('BARCODE-TEXT OFF\r\n');
};

/**
 * 设置纵向条码文本起始
 */
printUtil.prototype.setSweepCodeTextVertical = function () {
  return this.str = this.str.concat('VBARCODE-TEXT 7 0 5\r\n');
};
/**
 * 设置纵向条码文本结束
 */
printUtil.prototype.setSweepCodeTextEndVertical = function () {
  return this.str = this.str.concat('VBARCODE-TEXT OFF\r\n');
};

/**
 * 纵向打印条码和文字
 * @param {} x 横向起始位置
 * @param {} y 纵向终点位置
 * @param {} height 条码的高度
 * @param {} data 条码数据
 * VBARCODE 纵向，128 条码类型，4 窄条的单位宽度 ，2 宽条和窄条的比率 0：1.5:1  1：2.0:1  2：2.5:1  3：3.0:1  ...
 */
printUtil.prototype.printSweepCodeAndTextVertical = function (x, y, height, data) {
  this.setSweepCodeTextVertical();
  this.str = this.str.concat('VBARCODE 128 4 2 ' + height + ' ' + x + ' ' + y + ' ' + data + '\r\n');
  this.setSweepCodeTextEndVertical();
  return this.str;
};

/**
 * 纵向打印条码
 * @param {} x 横向起始位置
 * @param {} y 纵向终点位置
 * @param {} height 条码的高度
 * @param {} data 条码数据
 * VBARCODE 纵向，128 条码类型，3 窄条的单位宽度 ，2 宽条和窄条的比率 0：1.5:1  1：2.0:1  2：2.5:1  3：3.0:1  ...
 */
printUtil.prototype.printSweepCodeVertical = function (x, y, height, data) {
  return this.str = this.str.concat('VBARCODE 128 3 2 ' + height + ' ' + x + ' ' + y + ' ' + data + '\r\n');
};

/**
 * 二维码
 * @param {} x 横向起始位置
 * @param {} y 纵向起始位置
 * @param {} WAndH 二维码宽高,范围:1~32
 * @param {} data 填入二维码的数据
 */
printUtil.prototype.printQRCode = function (x, y, wAndH, data) {
  return this.str = this.str.concat('BARCODE QR ' + x + ' ' + y + ' M 2 U ' + wAndH + '\r\nMA,' + data + '\r\nENDQR\r\n');
};

/**
 * 对齐方式  center right left
 * @param {*} alignMethod 
 */
printUtil.prototype.setAlign = function (alignMethod) {
  return this.str = this.str.concat(alignMethod.toUpperCase() + '\r\n');
};

/**
 * 打印矩形框
 * @param {} x0 左上角x坐标 
 * @param {*} y0 左上角y坐标
 * @param {*} x1 右下角X坐标
 * @param {*} y1 右下角y坐标
 */
printUtil.prototype.printBox = function (x0, y0, x1, y1) {
  return this.str = this.str.concat('BOX ' + x0 + ' ' + y0 + ' ' + x1 + ' ' + y1 + ' 2' + '\r\n');
};

/**
 * 获取数据数组
 */
printUtil.prototype.getData = function () {
  this.str = this.str.concat('FORM\r\nPRINT\r\n');
  let t = this.str;
  let a = [],
    n = 0;
  for (; n < Math.ceil(t.length / 10); n++) {
    a[n] = wx.base64ToArrayBuffer(base.encode64gb2312(t.substr(n * 10, 10)));
  }
  return a;
};

module.exports = printUtil;