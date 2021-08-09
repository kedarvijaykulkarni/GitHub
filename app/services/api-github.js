import Service from '@ember/service';
import fetchJsonp from 'fetch-jsonp';
import { set, computed } from '@ember/object';

export default Service.extend({

  headers: computed(function() {
    return {
      method: 'GET',
      referrerPolicy: 'no-referrer',
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      },
    }
  }),

  async getRepositories(perPage, page, accessToken, isOrg = false, orgName = 'google') {
    let api = !isOrg ? '/user/repos' : `/orgs/${orgName}/repos`;

    const repositories = fetchJsonp( `https://api.github.com${api}?per_page=${perPage}&page=${page}&access_token=${accessToken}`, this.headers)
      .then(response => response.json())
      .then((result) => {
        if(result && result.data) {
          result.data.forEach( async (repo) => {
            let branches = await fetchJsonp(`https://api.github.com/repos/${repo['full_name']}/branches?per_page=100&access_token=${accessToken}`, this.headers)
              .then((response) => response.json()).then((branches) => branches.data);
            set(repo, 'branches', branches);
            let languages = await fetchJsonp(`https://api.github.com/repos/${repo['full_name']}/languages?per_page=100&access_token=${accessToken}`, this.headers)
              .then((response) => response.json()).then((branches) => branches.data);
              set(repo, 'languages', languages);
          });
          return result;
        }
      });
    return repositories;
  },

});
