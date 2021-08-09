import Component from '@ember/component';
import { set, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  apiGithub: service(),

  accessToken: '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',

  repositories: null,

  filterRepositories: computed('isPrivate', 'repositories', function() {
    return this.isPrivate
      ? this.repositories.filter((repo) => repo.private)
      : this.repositories;
  }),

  isOrg: false,

  orgName: 'google',

  isPrivate: false,

  isRunning: false,

  isDisable: true,

  page: 1,

  perPage: 10,

  isNextDisable: false,

  isPreviousDisable: true,

  async getRepositories() {
    set(this, 'isRunning', true);
    set(this, 'isDisable', true);

    const repositories = this.isOrg
     ? await this.apiGithub.getRepositories(this.perPage, this.page, this.accessToken, this.isOrg, this.orgName)
     : await this.apiGithub.getRepositories(this.perPage, this.page, this.accessToken);

    // for next previous page enable disable
    if (repositories && repositories.meta && repositories.meta.Link) {
      const next = repositories.meta.Link.filter((data) => {
        return data[1].rel === 'next';
      });
      set(this, 'isNextDisable', next.length ? false : true);

      const previous = repositories.meta.Link.filter((data) => {
        return data[1].rel === 'prev';
      });
      set(this, 'isPreviousDisable', previous.length ? false : true);

    } else {
      set(this, 'isNextDisable', true);
    }
    set(this, 'repositories', repositories.data)
    set(this, 'isRunning', false);
    set(this, 'isDisable', false);
  },

  actions: {
    submitToken() {
      if (!this.accessToken) return;
      this.getRepositories();
    },
    next() {
      this.page += 1;
      if(this.accessToken) this.getRepositories();
    },
    previous() {
      if(this.page > 1 ) this.page -= 1;
      if(this.accessToken) this.getRepositories();
    },
    resetResults() {
      set(this, 'repositories' , null);
    }
  }
});
