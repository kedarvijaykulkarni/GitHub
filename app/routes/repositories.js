import Route from '@ember/routing/route';
import fetchJsonp from 'fetch-jsonp';


export default Route.extend({
  async model() {

    // const urlString = 'https://api.github.com/orgs/google/repos?per_page=10&page=1';

    const urlString = 'https://api.github.com/user/repos?per_page=10&page=2&access_token=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';

    const response = await fetchJsonp( urlString, {
      method: 'GET',
      referrerPolicy: 'no-referrer',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });
    return await response.json();
  }
});
