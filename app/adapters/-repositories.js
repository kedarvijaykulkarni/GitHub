import ApllicationAdapter from './application';
// import fetchJsonp from 'fetch-jsonp';

export default ApllicationAdapter.extend({

    // urlForFindAll(...args) {
    //     return 'https://api.github.com/user/repos/'
    // }

    // urlForQuery(store, modelName, query) {
    //     // return fetchJsonp( 'https://api.github.com/user/repos/', query);
    //     const url = this.buildURL ('user/repos/', null, null, 'query', query);

    //     console.log('URL ', url)
    //     return this.ajax(url)
    // }

    query(store, type, query) {
        const url = this.buildURL ('user/repos/', null, null, 'query', query);
        return this.ajax(url)
    }
})