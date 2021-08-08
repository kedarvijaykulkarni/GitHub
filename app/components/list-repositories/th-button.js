import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'th',
  attributeBindings: ['dataTest:data-test'],
  classNameBindings: ['myclass'],

  myclass: computed(function () {
    return this.className;
  }),

  dataTest: computed(function () {
    return `th-${this.sortField}`;
  }),

  actions: {
    sortData(sortfield) {
      if (this.sortData) {
        this.sortData(sortfield);
      }
    },
  },
});
