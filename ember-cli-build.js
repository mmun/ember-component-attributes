/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    trees: {
      // this is dumb, but there is a bug in lib/broccoli/ember-addon.js
      // which makes the `vendor/` tree used _twice_ during local development
      // of the addon. once for the dummy app (which isn't getting our custom
      // treeForVendor treatment) and once for the actual addon which is transpiled
      // unfortunately, the dummy app's raw/untranspiled version wins
      vendor: null
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
