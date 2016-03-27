/**
 * Represents whether the file is loading.
 */

var P = require('pjs').P;

var LoadingStatusModel = P({
  init: function(on_update) {
    this.on_update = on_update;
    this.status = 'loading base map';
    this.is_initializing = true;
  },

  set_initialized_topojson: function() {
    this.is_initializing = false;
    this.on_update();
  }
});

module.exports = LoadingStatusModel;
