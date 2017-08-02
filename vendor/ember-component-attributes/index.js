/* globals Ember */
(function() {
  const { Component, computed } = Ember;

  Component.reopen({
    __HTML_ATTRIBUTES__: computed({
      set: function(key, value) {
        let attributes = Object.keys(value);
        let customBindings = [];

        for (let i = 0; i < attributes.length; i++) {
          let attribute = attributes[i];
          customBindings.push(`__HTML_ATTRIBUTES__.${attribute}:${attribute}`);
        }

        if (this.attributeBindings) {
          this.attributeBindings = this.attributeBindings.concat(customBindings);
        } else {
          this.attributeBindings = customBindings;
        }

        return value;
      }
    })
  });

})();
