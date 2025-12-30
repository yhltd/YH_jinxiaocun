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
    cangku: {
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
        cangku: e.detail.value.cangku,
       
      });
    },
    back: function(){
      this.triggerEvent('back');
    }
  }
})
