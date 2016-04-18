import React, { Component } from 'react'
import './country-selector.css'

export default class CountrySelector extends Component {
  // TODO(jetpack): library.

  constructor(props) {
    super(props)
  }

  display_name = (country_code) => {
    switch (country_code) {
      case 'br': return 'Brazil';
      case 'co': return 'Colombia';
      case 'pa': return 'Panama';
      case 'us': return 'USA';
      default: return country_code;
    }
  }

  create_country_toggle = (country_code) => {
    return <label key={country_code} className="country-selector-label btn btn-primary active"
                  onClick={(function() {
                    this.props.selected_countries.toggle_country(country_code);
                  }).bind(this)}>
      <input type="checkbox" defaultChecked/>
      {this.display_name(country_code)}
    </label>;
  }

  render() {
    return <div className="btn-group" data-toggle="buttons" >
      {this.props.selected_countries.available_options.map(this.create_country_toggle)}
    </div>;
  }
}
