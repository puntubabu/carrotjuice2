import React, { Component } from 'react'
import { Typeahead } from 'react-typeahead'
import './admin-search.css'

export default class AdminSearch extends Component {

  constructor(props) {
    super(props)
    this.search_key_to_admin = {}
  }

  admins = () => {
    const admin_objs = this.props.admin_details.admin_data_by_code;
    let search_key_to_admin = this.search_key_to_admin;
    // Maintain array of selected country iso codes
    let available_countries = Object.keys(
      this.props.selected_countries.selected_country_codes
    );

    // Maintain list of admins that belong to selected countries
    let admins = Object.keys(this.props.admin_details.admin_data_by_code)
    .filter( key => {
      let admin_code = admin_objs[key].admin_code.split('-')[0];
      return available_countries.find( e => {
        return e === admin_code;
      });
    // Return array of admin names
    }).map( key => {
      const admin_code = admin_objs[key].admin_code;
      const name_code = admin_objs[key].name + ' ' + admin_code;
      search_key_to_admin[name_code] = admin_code;
      return name_code;
    }).sort();
    return admins;
  }

  optionSelected = (admin_name_code) => {
    const admin_code = this.search_key_to_admin[admin_name_code];
    this.props.admin_details.selected_admins.search_admin(admin_code);
  }

  render() {
    return <div className="admin-search" id="scrollable-dropdown-menu">
                Search: <Typeahead
                options={this.admins()}
                onOptionSelected={this.optionSelected}
                maxVisible={100}
                />
            </div>;
  }
};
