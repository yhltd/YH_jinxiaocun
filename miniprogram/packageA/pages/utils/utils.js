const utils = {
  getComponent: function(selector) {
    const pages = getCurrentPages();
    const current = pages[pages.length - 1];
    //const component = current.selectAllComponents(selector);
    const component = current.selectComponent(selector);
    if (!component) {
      return null;
    }
    return component;
  },
  toast: function(options) {
    const {
      //selector = '.tui-tips-ctx'
      selector = '#tui-tips-ctx'
    } = options;
    const component = utils.getComponent(selector);
    if (component) {
      component.showTips(options);
    }
  },
  dateTime:function(options){
    const component = utils.getComponent('#tui-dateTime-ctx');
    if (component) {
      component.show();
    }
  },
  getDate: function(){
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    let formatNumber = function(n){
      n = parseInt(n);
      return n > 10 ? n : "0" + n;
    }

    return [year, month, day].map(formatNumber).join('-');
  }
};
module.exports = {
  toast: utils.toast,
  dateTime: utils.dateTime,
  getDate: utils.getDate
};