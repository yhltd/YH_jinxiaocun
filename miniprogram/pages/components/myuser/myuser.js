// pages/components/myuser/myuser.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    beizhu: {
      type: String,
      value: ''
    },
    lianxifangshi: {
      type: String,
      value: ''
    },
    lianxidizhi: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    save: function(e){
      this.triggerEvent('save', {
        beizhu: e.detail.value.beizhu,
        lianxifangshi: e.detail.value.lianxifangshi,
        lianxidizhi: e.detail.value.lianxidizhi
      });
    },
    back: function(){
      this.triggerEvent('back');
    }
  }
})
