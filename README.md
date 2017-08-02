# ember-component-attributes
[![Build Status](https://travis-ci.org/mmun/ember-component-attributes.svg?branch=master)](https://travis-ci.org/mmun/ember-component-attributes)

This addon lets you easily bind attributes to your ember components.
It was inspired by the discussion in [this rfc](https://github.com/emberjs/rfcs/pull/242).

## Installation

```
ember install ember-component-attributes
```

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
{{my-component (if foo (attributes data-foo="true") (attributes data-bar="true"))}}
```

If this feature is accepted into the Ember core then we will consider removing this limitation.
