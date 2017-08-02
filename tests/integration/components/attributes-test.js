import { moduleForComponent, test } from "ember-qunit";
import Component from "@ember/component";
import hbs from "htmlbars-inline-precompile";

moduleForComponent("attributes", "Integration | Component | attributes", {
  integration: true
});

test("it works when component has no attributeBindings", function(assert) {
  this.register("component:x-foo", Component.extend());

  this.render(hbs`{{x-foo (attributes data-foo="bar")}} {{x-foo}}`);

  assert.equal(this._element.querySelectorAll('[data-foo="bar"]').length, 1);
});

test("it works with multiple attribute bindings", function(assert) {
  this.register("component:x-foo", Component.extend());

  this.render(hbs`{{x-foo (attributes data-foo="bar" role="button" aria-pressed="true")}}`);

  assert.equal(this._element.querySelectorAll('[data-foo="bar"]').length, 1);
  assert.equal(this._element.querySelectorAll('[role="button"]').length, 1);
  assert.equal(this._element.querySelectorAll('[aria-pressed="true"]').length, 1);
});

test("it works when component has existing attributeBindings", function(assert) {
  this.register("component:x-foo", Component.extend({ attributeBindings: ["dataDerp:data-derp"] }));

  this.render(hbs`{{x-foo (attributes data-foo="bar") dataDerp="lol"}} {{x-foo dataDerp="hehe"}}`);

  assert.equal(this._element.querySelectorAll('[data-foo="bar"]').length, 1);
  assert.equal(this._element.querySelectorAll("[data-derp]").length, 2);
});

test("it wins over attributeBindings", function(assert) {
  this.register("component:x-foo", Component.extend({ attributeBindings: ["dataFoo:data-foo"] }));

  this.render(hbs`{{x-foo (attributes data-foo="expression") dataFoo="class"}}`);

  assert.equal(this._element.querySelectorAll('[data-foo="expression"]').length, 1);
  assert.equal(this._element.querySelectorAll('[data-foo="class"]').length, 0);
});

test("class attribute works when component has no classNames/classNameBindings", function(assert) {
  this.register("component:x-foo", Component.extend());

  this.render(hbs`{{x-foo (attributes class="lol")}}`);

  assert.equal(this._element.querySelectorAll(".lol").length, 1);
});

test("class attribute wins over class property", function(assert) {
  this.register("component:x-foo", Component.extend());

  this.render(hbs`{{x-foo (attributes class="lol") class="wut"}}`);

  assert.equal(this._element.querySelectorAll(".lol").length, 1);
  assert.equal(this._element.querySelectorAll(".wut").length, 0);
});

test("id attribute works", function(assert) {
  this.register("component:x-foo", Component.extend());

  this.render(hbs`{{x-foo (attributes id="lol")}}`);

  assert.equal(this._element.querySelectorAll("#lol").length, 1);
});

test("id attribute wins over id property", function(assert) {
  this.register("component:x-foo", Component.extend());

  this.render(hbs`{{x-foo (attributes id="lol") id="wut"}}`);

  assert.equal(this._element.querySelectorAll("#lol").length, 1);
  assert.equal(this._element.querySelectorAll("#wut").length, 0);
});

test("style attribute works", function(assert) {
  this.register("component:x-foo", Component.extend());

  this.render(hbs`{{x-foo (attributes style="color: tomato" class="x-foo")}} {{x-foo}}`);

  assert.ok(this._element.querySelector(".x-foo").getAttribute("style").length > 0);
});
