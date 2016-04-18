/**
 * Codez for the bottom date selector widget. Also displays weather data.
 */
import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import d3 from 'd3'
import moment from 'moment'
import * as DateUtil from '../model/date-util.js'

import 'react-datepicker/dist/react-datepicker.css'
import './date-selection-bar.css'

export default class DateSelectionBar extends Component {
  // The range for `x_time_scale` is determined by the document width, which is
  // set via `componentDidUpdate`.
  constructor(props) {
    super(props)
    this.x_time_scale = d3.time.scale.utc()
  }

  /**
   * Uses d3.svg.area() to generate a polygon, representing the space between
   * two sets of 'y' coordinates. The bottom line (y0) is uncomplicated because
   * we aren't stacking multiple sets of data.
   *
   * NOTE: The DOM update after this method takes 100ms, and is executed a few
   * more times than it should be. So maybe it could be an optimization win in
   * the future.
   */
  get_area_points = (data) => {
    const height = 130;  // constant via css
    let x_scale = this.x_time_scale;
    // TODO(jetpack): hack: hard-coded domain for fake weather.
    let y_scale = d3.scale.linear().domain([0, 80])
      .range([height - 30, 0]);

    let make_area_graph = d3.svg.area()
      .x(function(d) {
        return x_scale(d.x);
      })
      .y0(height - 30)
      .y1(function(d) {
        return y_scale(d.y);
      });

    return make_area_graph(data);
  }

  get_weather_graph = () => {
    const selected_admins = this.props.selected_admins.get_admin_codes();
    if (selected_admins.length === 1) {
      let weather_data = this.props.weather_data_store.weather_data_by_date_for_admin(
        selected_admins[0]);
      let points_data = [];
      _.forEach(weather_data, function(weather_data, date_string) {
        if (weather_data && weather_data.temp_mean) {
          points_data.push({x: new Date(date_string), y: weather_data.temp_mean});
        }
      });
      return this.get_area_points(_.sortBy(points_data, 'x'));
    }
  }

  initialize_x_axis = (elt) => {
    this.reset_x_axis = function() {
      this.x_time_scale.range([0, document.body.offsetWidth - 100]);
      let xAxis = d3.svg.axis()
        .ticks(d3.time.week.utc)
        .tickFormat(d3.time.format.utc("%b %d"))  // e.g. 'Mar 31'
        .scale(this.x_time_scale)
        .orient("bottom");
      xAxis(d3.select(elt));
    };
    this.reset_x_axis();
  }

  // Note: DatePicker works with moment objects, but we use plain old Dates in
  // `selected_date`. So we convert from moment to Date here, and from Date to
  // moment in `render`.
  on_date_change = (moment) => {
    let date = new Date(moment._d);
    date.setUTCHours(0, 0, 0);
    console.log('date input and converted date:', moment._d, date);
    this.props.selected_date.set_date(date);
  }

  get_date_picker = () => {
    if (this.props.selected_date.current_day) {
      return <DatePicker selected={moment(this.props.selected_date.current_day).utcOffset(0)}
                         onChange={this.on_date_change}
                         dateFormat="YYYY-MM-DD" />;
    } else {
      return <DatePicker placeholderText="loading.."
                         onChange={this.on_date_change}
                         dateFormat="YYYY-MM-DD" />;
    }
  }

  /** Update on resize events */
  componentDidUpdate() {
    if (this.reset_x_axis !== undefined) {
      this.reset_x_axis();
    }
  }

  render() {
    // TODO(jetpack): what extent should we show? all available data? selected
    // date +/- N days? currently just current date - N days.
    // TODO(jetpack): if no admins selected, display help text (e.g. "yo, click an admin")
    const num_days = 120
    let today = new Date()
    this.x_time_scale.domain([DateUtil.subtract_days(today, num_days), today]);

      return <div className="date-selection-bar" id="date-selection-bar">
      <svg>
        <path id="time-series" transform="translate(30, 0)" d={this.get_weather_graph()}/>
        <g
          className="axis"
          ref={this.initialize_x_axis}
          transform="translate(30, 100)"
        />
      </svg>
      <div className="floating-header">
        Select date:
        {this.get_date_picker()}
      </div>
    </div>;
  }
}