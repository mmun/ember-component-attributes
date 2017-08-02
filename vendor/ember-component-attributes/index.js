/* globals Ember */
(function() {
  const { Component, computed } = Ember;

  Component.reopen({
    __HTML_ATTRIBUTES__: computed({
      set(key, value) {
        let attributes = Object.keys(value);
        let attributeBindingsOverride = [];

        for (let i = 0; i < attributes.length; i++) {
          let attribute = attributes[i];

          if (attribute === "class") {
            debugger;
          } else {
            attributeBindingsOverride.push(`__HTML_ATTRIBUTES__.${attribute}:${attribute}`);
          }
        }

        if (this.attributeBindings) {
          this.attributeBindings = attributeBindingsOverride.concat(this.attributeBindings);
        } else {
          this.attributeBindings = attributeBindingsOverride;
        }

        return value;
      }
    })
  });
})();
