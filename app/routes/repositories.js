import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import fetchJsonp from 'fetch-jsonp';


export default Route.extend({
  queryParams: {
    accessToken: {
      refreshModel: true,
    }
  },
  async model(param) {
    /*
      // Following is not working giving me a CORS error
      // https://api.emberjs.com/ember-data/3.14/classes/JSONAPIAdapter/methods/query?anchor=query
        const query = {
          per_page: 10,
          page: 1,
          access_token: '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'
        }
        return this.store.query('repositories', query);
    */
    const accessToken = param.accessToken;

    return RSVP.hash({
      query: param, // just added if we use server side sorting
      repositories: this.query(accessToken),
    });
  },

  async getRepo(accessToken) {
    //const accessToken = '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';
    console.log('accessToken :::', accessToken)
    const urlString = `https://api.github.com/user/repos?per_page=10&page=2&access_token=${accessToken}`;
    const headers = {
      method: 'GET',
      referrerPolicy: 'no-referrer',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    };
    const response = await fetchJsonp( urlString, headers)
      .then(response => response.json());

    response.data.forEach(async (data) => {
      data['branches'] = await fetchJsonp(`https://api.github.com/repos/${data['full_name']}/branches?access_token=${accessToken}`, headers)
        .then((response) => response.json()).then((branches) => branches.data);
      data['languages'] = await fetchJsonp(`https://api.github.com/repos/${data['full_name']}/languages?access_token=${accessToken}`, headers)
        .then((response) => response.json()).then((branches) => branches.data);
    })
    return response.data
  },

  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
  },
});
