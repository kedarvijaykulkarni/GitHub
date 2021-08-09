import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | list-repositories', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('repo', [
      {
        name: 'Hades',
        branches: ['repo-name'],
        language: 'JavaScript',
      },
    ]);

    this.set('clicked', false);

    this.set('test', () => {
      this.set('clicked', true);
    });
  });

  test('it renders and table row set the values', async function (assert) {
    await render(hbs`<ListRepositories
        @data={{repo}}
      />`);
      // more specific public tag and launch link need to implement yet
      assert.equal(
        find('td[data-test="td-name"]').innerText,
        this.repo[0].name + ' Public launch',
        'Title is set correctly'
      );

    // more specific expand more need to implement yet
    assert.equal(
      find('td[data-test="td-num-branches"]').innerText,
      this.repo[0].branches.length + ' expand_more',
      'Genre is set correctly'
    );

    assert.equal(
      find('td[data-test="td-language"]').innerText,
      this.repo[0].language,
      'Tags is set correctly'
    );
  });
});
