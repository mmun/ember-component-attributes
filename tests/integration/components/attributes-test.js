import { moduleForComponent, test } from "ember-qunit";
import Component from "@ember/component";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("attributes", "Integration | Component | attributes", {
  integration: true
});

test("it works when component has no attribute class bindings", function(assert) {
  this.register("component:x-foo", Component.extend());

  this.render(hbs`{{x-foo (attributes data-foo="bar")}} {{x-foo}}`);

  assert.equal(this._element.querySelectorAll('[data-foo="bar"]').length, 1);
});

test("it works with multiple attribute bindings", function(assert) {
  this.register("component:x-foo", Component.extend());

  this.render(hbs`{{x-foo (attributes data-foo="bar" role="button" aria-pressed="true")}}`);

  assert.equal(this._element.querySelectorAll('[data-foo="bar"]').length, 1);
  assert.equal(this._element.querySelectorAll('[role="button"]').length, 1);
  assert.equal(this._element.querySelectorAll('[aria-pressed="bar"]').length, 1);
});

test("it works when component has existing attribute class bindings", function(assert) {
  this.register("component:x-foo", Component.extend({ attributeBindings: ["dataDerp:data-derp"] }));

  this.render(hbs`{{x-foo (attributes data-foo="bar") dataDerp="lol"}} {{x-foo dataDerp="hehe"}}`);

  assert.equal(this._element.querySelectorAll('[data-foo="bar"]').length, 1);
  assert.equal(this._element.querySelectorAll("[data-derp]").length, 2);
});

test("attribute expression bindings win over attribute class bindings", function(assert) {
  this.register("component:x-foo", Component.extend({ attributeBindings: ["dataFoo:data-Foo"] }));

  this.render(hbs`{{x-foo (attributes data-foo="expression") dataFoo="class"}}`);

  assert.equal(this._element.querySelectorAll('[data-foo="expression"]').length, 1);
  assert.equal(this._element.querySelectorAll('[data-foo="class"]').length, 0);
});
