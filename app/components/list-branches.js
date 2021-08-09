import Component from '@ember/component';
import { set, computed } from '@ember/object';
export default Component.extend({
  tagName: '',

  icon: computed('isShow', function () {
    return this.isShow ? 'expand_less' : 'expand_more';
  }),

  isShow: false,

  actions: {
    showHide() {
      set(this, 'isShow', !this.isShow);
    }
  }
});
