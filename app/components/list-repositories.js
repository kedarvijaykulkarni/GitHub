import Component from '@ember/component';
import { computed, set } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  tagName: 'table',
  classNames: ['list-repositories-table', 'table'],
  attributeBindings: ['dataTest:data-test'],

  dataTest: 'test-list-repositories-table',

  orderBy: null,

  order: 'dsc',

  dataSorted: computed('data', 'orderBy', 'isSortedAsc', function () {
    if (isEmpty(this.orderBy)) {
      return this.data;
    }

    return this.isSortedAsc
      ? this.data.sortBy(this.orderBy)
      : this.data.sortBy(this.orderBy).reverse();
  }),

  isSortedAsc: computed('order', function () {
    return this.order === 'asc';
  }),

  headers: computed(function () {
    return [
      {
        title: 'Name',
        sortfield: 'name',
        isSortable: true,
        isShow: true,
        className: ['p-a-0 tl'],
      },
      {
        title: 'Number of Branches',
        sortfield: 'branches',
        isSortable: true,
        isShow: true,
        className: ['p-a-0'],
      },
      {
        title: 'Programming language',
        sortfield: 'tags',
        isSortable: false,
        isShow: true,
        className: ['p-a-0 tl'],
      },
      {
        title: 'Last update',
        sortfield: 'updated_at',
        isSortable: true,
        isShow: true,
        className: ['p-a-0 tl'],
      }
    ];
  }),

  actions: {
    sortData(sortOn) {
      if (this.orderBy != sortOn) {
        set(this, 'isSortedAsc', true);
        set(this, 'order', 'asc');
      } else {
        set(this, 'isSortedAsc', !this.isSortedAsc);
        set(this, 'order', this.isSortedAsc ? 'asc' : 'dsc');
      }
      set(this, 'orderBy', sortOn);
    }
  },
});
