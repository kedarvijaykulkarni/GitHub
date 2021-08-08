import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';

export default JSONAPIAdapter.extend({
  host: 'https://api.github.com',
  headers: computed(function () {
    return {
      dataType: 'json',
      // contentType: 'application/vnd.api+json',
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/vnd.github.v3+json',
      'access_token': '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'
    };
  }),
  urlForQuery (query, modelName) {
    switch(modelName) {
      case 'repositories':
        return this.buildURL('user/repo', null, null, 'query', query);
      default:
        return this._super(...arguments);
    }
  }
});
