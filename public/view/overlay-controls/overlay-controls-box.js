import React, { Component } from 'react'
import AdminSearch from './admin-search.js'
import CountrySelector from './country-selector'
import DataSourceSelector from './data-source-selector'
import SelectedAdminsInfo from './selected-admins-info'
import './overlay-controls-box.css'

export default class OverlayControlsBox extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <div className="overlay-controls">
      <div className="overlay-controls-section">
        <CountrySelector
            selected_countries={this.props.selected_countries}
        />
      </div>
      <div className="overlay-controls-section">
        <SelectedAdminsInfo
            selected_date={this.props.selected_date}
            admin_details={this.props.admin_details}
        />
      </div>
      <div className="overlay-controls-section">
        <DataSourceSelector
          selected_layers={this.props.selected_layers}
        />
      </div>
      <br/>
      <br/>
      <div className="overlay-controls-section">
        <AdminSearch
          admin_details={this.props.admin_details}
          selected_countries={this.props.selected_countries}
        />
      </div>
    </div>;
  }
}
