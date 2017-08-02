# ember-component-attributes

This addon lets you easily bind attributes to your ember components.
It was inspired by the discussion in [this rfc](https://github.com/emberjs/rfcs/pull/242).

## Usage

To bind an attribute `foo` to the value of `bar`, pass `(attributes foo=bar)` as the last positional argument to your component:

```hbs
{{#x-foo (attributes style="margin-top: 10px") stuff=someStuff}}
  Sorry about the inline styles.
{{/x-foo}}
```

This helper also works with `class` and `id` attributes if you prefer to keep all your attributes together.

```hbs
{{x-bar (attributes id="main-bar" class="large" data-foo="123")}}
```

Attribute bindings defined with the `attributes` helper will always win over attribute bindings that are defined on the class.

```hbs
{{!-- The role will be "foo" --}}

{{x-bar (attributes role="foo") ariaRole="bar"}}
```

## Limitations

This addon is implemented with a naive Glimmer AST transform so you can't do fancy things like

```hbs
{{my-component (if foo (attributes data-foo="true") {attributes data-bar="true"})}}
```

If this feature is accepted into the Ember core then we will consider removing this limitation.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-component-attributes`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
