# git-hub

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd git-hub`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Github API
  * for Organisation https://api.github.com/orgs/google/repos?per_page=10&page=1
  * for user https://api.github.com/users/google/repos?per_page=10&page=1

## List repos
   `/user/repos/?access_token=XXX`
   Example - https://api.github.com/user/repos?per_page=10&page=2&access_token=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

### List branches 
    Documentation URL - https://docs.github.com/en/rest/reference/repos#list-branches
    `/repos/{owner}/{repo}/branches`
    Example - https://api.github.com/repos/google/truth/branches

### List repository languages
    Documentation URL - https://docs.github.com/en/rest/reference/repos#list-repository-languages
    `/repos/{owner}/{repo}/languages`
    Example - https://api.github.com/repos/google/truth/languages

### Get a branch
    Documentation URL - https://docs.github.com/en/rest/reference/repos#get-a-branch
    `/repos/{owner}/{repo}/branches/{branch}`
    Example - https://api.github.com/repos/google/truth/branches/master

### private repo
    // https://stackoverflow.com/questions/21907278/github-api-using-repo-scope-but-still-cant-see-private-repos

### fetchjsonp
    // https://stackoverflow.com/questions/43471288/how-to-use-jsonp-on-fetch-axios-cross-site-requests
