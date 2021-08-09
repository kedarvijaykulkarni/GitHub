import Component from '@ember/component';
import { set, computed } from '@ember/object';
import { task } from 'ember-concurrency';
import fetchJsonp from 'fetch-jsonp';

export default Component.extend({

  accessToken: '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',

  repositories: null,

  filterRepositories: computed('isPrivate', 'repositories', function() {
    return this.isPrivate
      ? this.repositories.filter((repo) => repo.private)
      : this.repositories;
  }),

  isPrivate: false,

  isRunning: false,

  isDisable: true,

  page: 1,

  perPage: 10,

  isNextDisable: false,

  isPreviousDisable: true,

  getRepositories: task(function * () {
    set(this, 'isRunning', true);
    set(this, 'isDisable', true);
    const urlString = `https://api.github.com/user/repos?per_page=${this.perPage}&page=${this.page}&access_token=${this.accessToken}`;
    const headers = {
      method: 'GET',
      referrerPolicy: 'no-referrer',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    };
    const repositories = yield fetchJsonp( urlString, headers)
      .then(response => response.json())
      .then((result) => {
        if(result && result.data) {
          result.data.forEach( async (repo) => {
            let branches = await fetchJsonp(`https://api.github.com/repos/${repo['full_name']}/branches?per_page=100&access_token=${this.accessToken}`, headers)
              .then((response) => response.json()).then((branches) => branches.data);
            set(repo, 'branches', branches);
            let languages = await fetchJsonp(`https://api.github.com/repos/${repo['full_name']}/languages?per_page=100&access_token=${this.accessToken}`, headers)
              .then((response) => response.json()).then((branches) => branches.data);
              set(repo, 'languages', languages);
          });
          return result
        }
      });

    // for next previous page enable disable
    if(repositories && repositories.meta && repositories.meta.Link) {
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
  }).drop(),

  actions: {
    submitToken() {
      if (!this.accessToken) return;
      this.getRepositories.perform();
    },
    next() {
      this.page += 1;
      if(this.accessToken) this.getRepositories.perform();
    },
    previous() {
      if(this.page > 1 ) this.page -= 1;
      if(this.accessToken) this.getRepositories.perform();
    }
  }
});
