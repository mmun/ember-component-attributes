/* eslint-env node */
"use strict";

module.exports = {
  name: "ember-component-attributes",

  setupPreprocessorRegistry(type, registry) {
    registry.add("htmlbars-ast-plugin", {
      name: "component-attributes",
      plugin: require("./lib/component-attributes-transform"),
      baseDir: function() {
        return __dirname;
      }
    });
  },

  included() {
    this.import("vendor/ember-component-attributes/index.js");
  },

  treeForVendor(rawVendorTree) {
    let babelAddon = this.addons.find(addon => addon.name === "ember-cli-babel");

    let transpiledVendorTree = babelAddon.transpileTree(rawVendorTree, {
      "ember-cli-babel": {
        compileModules: false
      }
    });

    return transpiledVendorTree;
  }
};
