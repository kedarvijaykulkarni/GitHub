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

  selectedLang: 'all',

  languages: computed('data', function() {
    return [...new Set(this.data.map(l => l.language).filter(d => d != null))];
  }),

  dataSorted: computed('data', 'orderBy', 'isSortedAsc', 'selectedLang', function () {
    if (isEmpty(this.orderBy)) {
      return this.data;
    }

    let data = this.data;

    if(this.selectedLang !== 'all')
      data = data.filter((d) => d.language == this.selectedLang)

    return this.isSortedAsc
      ? data.sortBy(this.orderBy)
      : data.sortBy(this.orderBy).reverse();
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
      if (!this.data) return;

      if (this.orderBy != sortOn) {
        set(this, 'isSortedAsc', true);
        set(this, 'order', 'asc');
      } else {
        set(this, 'isSortedAsc', !this.isSortedAsc);
        set(this, 'order', this.isSortedAsc ? 'asc' : 'dsc');
      }
      set(this, 'orderBy', sortOn);
    },
    selectLanguage (target) {
      set(this, 'selectedLang', target);
      this.send('sortData', 'name')
    },
    previous() {
      if(this.previous) {
        this.previous();
      }
    },
    next() {
      if(this.next) {
        this.next();
      }
    }
  },
});
