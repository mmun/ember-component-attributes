import { moduleForComponent, test } from 'ember-qunit';
import Component from '@ember/component';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('attributes', 'Integration | Component | attributes', {
  integration: true,
});

test('it works when component has no existing attribute bindings', function(assert) {
  this.register('component:x-foo', Component.extend());

  this.render(hbs`{{x-foo (attributes data-foo="bar")}} {{x-foo}}`);

  assert.equal(this._element.querySelectorAll('[data-foo="bar"]').length, 1);
});

test('it works when component has existing attribute bindings', function(assert) {
  this.register('component:x-foo', Component.extend({ attributeBindings: ['dataDerp:data-derp'] }));

  this.render(hbs`{{x-foo (attributes data-foo="bar") dataDerp="lol"}} {{x-foo dataDerp="hehe"}}`);

  assert.equal(this._element.querySelectorAll('[data-foo="bar"]').length, 1);
  assert.equal(this._element.querySelectorAll('[data-derp]').length, 2);
});
