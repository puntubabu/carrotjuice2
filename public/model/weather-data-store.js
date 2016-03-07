/**
 * Stores all weather data.
 */

var _ = require('lodash');
var P = require('pjs').P;
var d3 = require('d3');

var subtract_days = function(date, num_days) {
  var result = new Date(date);
  result.setDate(result.getDate() - num_days);
  return result;
};

var FakeOvipositionDataStore = P({
  init: function(weather_data_store) {
    this.weather_data_store = weather_data_store;
  },

  data_for_date: function(date_string) {
    // TODO(jetpack): Use real science and stuff.
    var temp_to_oviposition = d3.scale.sqrt().domain([1, 50])
      .range(['white', 'purple', 'red']);

    return _.mapValues(
      this.weather_data_store.data_by_date[date_string],
      function(data_obj) {
        return temp_to_oviposition(data_obj.temp_mean);
      }
    );
  }
});

var WeatherDataStore = P({
  init: function(api_client) {
    // `data_by_date` format is ISO date string -> region code -> weather data.
    // Currently weather data is just has a single field, `temp_mean`.
    this.data_by_date = {};
    this.last_date = null;
    this.api_client = api_client;
    this.initial_load_promise = api_client.get_weather_data()
      .then((function(data) {
        this.last_date = new Date(_.keys(data)[0]);
        _.assign(this.data_by_date, data);
      }).bind(this)).then(this.get_historical_data.bind(this));
  },

  get_historical_data: function() {
    _.range(1, 3).map((function(i) {
      var previous = subtract_days(this.last_date, i);
      this.api_client.get_weather_data(previous).then((function(data) {
        _.assign(this.data_by_date, data);
      }).bind(this));
    }).bind(this));
  },

  data_for_date: function(date_string) {
    // TODO(jetpack): Use real science and stuff.
    var temp_to_prevalence = d3.scale.log().domain([1, 50])
      .range(['green', 'yellow', 'red']);

    return _.mapValues(
      this.data_by_date[date_string],
      function(data_obj) {
        return temp_to_prevalence(data_obj.temp_mean);
      }
    );
  },

  fake_oviposition_model: function() {
    return FakeOvipositionDataStore(this);
  }
});

module.exports = WeatherDataStore;
