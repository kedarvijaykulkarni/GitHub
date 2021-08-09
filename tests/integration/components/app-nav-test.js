import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
// import { pauseTest } from '@ember/test-helpers';
// await pauseTest()

module('Integration | Component | app-nav', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    await render(hbs`<AppNav />`);
    assert.equal(this.element.querySelector('span[data-link="index"]').textContent.trim(), 'Home');
    assert.equal(this.element.querySelector('span[data-link="repositories"]').textContent.trim(), 'Repositories');
  });

  test('Component have link home', async function(assert) {
    await render(hbs`<AppNav />`);
    // await pauseTest()
    assert.ok(find('[data-link="index"]'), 'link to Home is present');
  });

  test('Component have link Repositories', async function(assert) {
    await render(hbs`<AppNav />`);
    assert.ok(find('[data-link="repositories"]'), 'link to Repositories is present');
  });
});
