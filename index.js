/* eslint-env node */
"use strict";

module.exports = {
  name: "ember-component-attributes",

  setupPreprocessorRegistry: function(type, registry) {
    registry.add("htmlbars-ast-plugin", {
      name: "attributes-expression",
      plugin: require("./lib/attributes-expression-transform"),
      baseDir: function() {
        return __dirname;
      }
    });
  }
};
