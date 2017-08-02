import { moduleForComponent, test } from 'ember-qunit';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('attributes', 'Integration | Component | attributes', {
  integration: true,

  beforeEach() {
    this.register('component:x-foo', Component.extend());
  }
});

test('it works!', function(assert) {

  this.render(hbs`{{x-foo (attributes data-foo="bar")}}`);

  assert.equal(this._element.querySelectorAll('[data-foo="bar"]').length, 1);
});
